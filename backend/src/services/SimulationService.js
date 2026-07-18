const {
  SimulationEngine,
  EventFactory,
  MissionPlanner,
  ResourceAllocator,
  AbortHandler,
  MaintenanceScheduler,
  StatisticsCollector,
} = require("../simulation");

const { entities, enums, constants } = require("../domain");

const { Sortie } = entities;
const { EventType, MissionStatus } = enums;
const { SimulationConstants } = constants;

const PRIORITY_WEIGHT = {
  CRITICAL: 4,
  HIGH: 3,
  MEDIUM: 2,
  LOW: 1,
};

class SimulationService {
  constructor() {
    this.missionPlanner = new MissionPlanner();
    this.resourceAllocator = new ResourceAllocator();
    this.abortHandler = new AbortHandler();
    this.maintenanceScheduler = new MaintenanceScheduler();
    this.statisticsCollector = new StatisticsCollector();

    this.sorties = [];
    this.maintenanceRecords = [];
    this.pendingMissions = [];
    this.schedulerLog = [];
  }

  runSimulation(input) {
    const { squadron, scenario, missionCount } = input;

    this.sorties = [];
    this.maintenanceRecords = [];
    this.pendingMissions = [];
    this.schedulerLog = [];
    this.statisticsCollector = new StatisticsCollector();

    const engine = new SimulationEngine();

    const missions = this.missionPlanner.createMissions(missionCount, scenario);

    const context = {
      engine,
      squadron,
      scenario,
      missions,
      sorties: this.sorties,
      maintenanceRecords: this.maintenanceRecords,
      pendingMissions: this.pendingMissions,
      schedulerLog: this.schedulerLog,
      statisticsCollector: this.statisticsCollector,
    };

    this.registerHandlers(engine, context);

    missions.forEach((mission) => {
      engine.scheduleEvent(
        EventFactory.createEvent({
          type: EventType.MISSION_ARRIVED,
          time: mission.incomingTime || mission.scheduledStartTime || 0,
          entityId: mission.id,
          payload: { missionId: mission.id },
        }),
      );
    });

    engine.run(context);

    this.abortUnscheduledMissions(context);

    return {
      scenario: scenario.toJSON(),
      statistics: this.statisticsCollector.getReport(),
      missions: missions.map((m) => m.toJSON()),
      sorties: this.sorties
        .sort((a, b) => (a.takeoffTime ?? 0) - (b.takeoffTime ?? 0))
        .map((s) => s.toJSON()),
      maintenanceRecords: this.maintenanceRecords.map((m) => m.toJSON()),
      schedulerLog: this.schedulerLog,
      finalSquadronState: squadron.toJSON(),
    };
  }

  registerHandlers(engine, context) {
    engine.registerHandler(EventType.MISSION_ARRIVED, (event) => {
      const mission = this.findMission(context.missions, event.entityId);
      if (!mission) return;

      context.statisticsCollector.recordMission();

      if (
        !this.resourceAllocator.canEverAssignMission(mission, context.squadron)
      ) {
        mission.abort("RESOURCE_UNAVAILABLE");
        context.statisticsCollector.recordAbort("RESOURCE_UNAVAILABLE");

        this.log(context, {
          time: event.time,
          type: "MISSION_ABORTED_PERMANENT_RESOURCE_GAP",
          missionId: mission.id,
          reason: "Required resource or qualified pilot does not exist.",
        });

        return;
      }

      mission.status = MissionStatus.WAITING_FOR_RESOURCES;
      mission.queueEnteredTime = event.time;

      context.pendingMissions.push(mission);

      this.log(context, {
        time: event.time,
        type: "MISSION_ARRIVED",
        missionId: mission.id,
        priority: mission.priority,
        requiredPilotRating: mission.requiredPilotRating,
      });

      this.tryDispatchPendingMissions(context, event.time);
    });

    engine.registerHandler(EventType.MISSION_PLANNING_COMPLETED, (event) => {
      const mission = this.findMission(context.missions, event.entityId);
      if (!mission || mission.status === MissionStatus.ABORTED) return;

      engine.scheduleEvent(
        EventFactory.createEvent({
          type: EventType.TAKEOFF,
          time:
            event.time +
            SimulationConstants.DEFAULT_BRIEFING_TIME +
            SimulationConstants.DEFAULT_AIRCRAFT_PREPARATION_TIME,
          entityId: event.entityId,
          payload: { missionId: event.entityId },
        }),
      );
    });

    engine.registerHandler(EventType.TAKEOFF, (event) => {
      const mission = this.findMission(context.missions, event.entityId);
      if (!mission || mission.status === MissionStatus.ABORTED) return;

      const aircraft = this.findById(
        context.squadron.aircraft,
        mission.aircraftIds[0],
      );

      const pilot = this.findById(context.squadron.pilots, mission.pilotIds[0]);

      const runway = this.findById(context.squadron.runways, mission.runwayId);

      if (aircraft) aircraft.startFlight();
      if (pilot) pilot.startFlight();
      if (runway) runway.release();

      mission.start(event.time);

      const sortie = this.createSortieFromMission(mission, event.time);
      context.sorties.push(sortie);

      const missionDuration =
        mission.duration || SimulationConstants.DEFAULT_SORTIE_DURATION;

      this.log(context, {
        time: event.time,
        type: "SORTIE_TAKEOFF",

        missionId: mission.id,
        sortieId: sortie.id,

        aircraftId: mission.aircraftIds[0],

        pilotId: mission.pilotIds[0],

        requiredAircraftCount: mission.requiredAircraftCount,

        targetId: mission.targetId,

        targetType: mission.targetType,

        strikePlan: mission.strikePlan,
      });

      engine.scheduleEvent(
        EventFactory.createEvent({
          type: EventType.LANDING,
          time: event.time + missionDuration,
          entityId: mission.id,
          payload: {
            missionId: mission.id,
            sortieId: sortie.id,
          },
        }),
      );
    });

    engine.registerHandler(EventType.LANDING, (event) => {
      const mission = this.findMission(context.missions, event.entityId);
      if (!mission) return;

      const aircraft = this.findById(
        context.squadron.aircraft,
        mission.aircraftIds[0],
      );

      const pilot = this.findById(context.squadron.pilots, mission.pilotIds[0]);

      const sortie = this.findById(context.sorties, event.payload.sortieId);

      const missionDuration =
        mission.duration || SimulationConstants.DEFAULT_SORTIE_DURATION;

      if (aircraft) {
        aircraft.land();
        aircraft.addFlightHours(missionDuration / 60);
      }

      if (pilot) {
        pilot.completeFlight(missionDuration / 60);
        pilot.release();

        engine.scheduleEvent(
          EventFactory.createEvent({
            type: EventType.PILOT_REST_COMPLETED,
            time: event.time + SimulationConstants.MIN_REST_TIME_AFTER_SORTIE,
            entityId: pilot.id,
            payload: {
              pilotId: pilot.id,
            },
          }),
        );
      }

      if (sortie) {
        sortie.recordLanding(event.time);
        sortie.markSuccessful();
      }

      mission.complete(event.time);

      context.statisticsCollector.recordCompletedSortie();

      mission.groundCrewIds.forEach((id) => {
        const crew = this.findById(context.squadron.groundCrew, id);
        if (crew) crew.release();
      });

      this.log(context, {
        time: event.time,
        type: "SORTIE_LANDED",
        missionId: mission.id,
        sortieId: sortie?.id,
      });

      if (aircraft) {
        const maintenanceResult = this.maintenanceScheduler.scheduleMaintenance(
          aircraft,
          event.time,
        );

        context.maintenanceRecords.push(maintenanceResult.maintenance);

        engine.scheduleEvent(maintenanceResult.completionEvent);
      }

      this.tryDispatchPendingMissions(context, event.time);
    });

    engine.registerHandler(EventType.MAINTENANCE_COMPLETED, (event) => {
      const aircraft = this.findById(
        context.squadron.aircraft,
        event.payload.aircraftId,
      );

      const maintenance = this.findById(
        context.maintenanceRecords,
        event.payload.maintenanceId,
      );

      if (aircraft && maintenance) {
        this.maintenanceScheduler.completeMaintenance(
          aircraft,
          maintenance,
          event.time,
        );

        this.log(context, {
          time: event.time,
          type: "AIRCRAFT_AVAILABLE_AFTER_MAINTENANCE",
          aircraftId: aircraft.id,
        });
      }

      this.tryDispatchPendingMissions(context, event.time);
    });

    engine.registerHandler(EventType.PILOT_REST_COMPLETED, (event) => {
      const pilot = this.findById(
        context.squadron.pilots,
        event.payload.pilotId,
      );

      if (pilot) {
        pilot.reduceRestTime(SimulationConstants.MIN_REST_TIME_AFTER_SORTIE);
        pilot.release();

        this.log(context, {
          time: event.time,
          type: "PILOT_AVAILABLE_AFTER_REST",
          pilotId: pilot.id,
        });
      }

      this.tryDispatchPendingMissions(context, event.time);
    });
  }

  tryDispatchPendingMissions(context, currentTime) {
    let dispatchedSomething = true;

    while (dispatchedSomething) {
      dispatchedSomething = false;

      this.sortPendingMissions(context.pendingMissions);

      for (let i = 0; i < context.pendingMissions.length; i++) {
        const mission = context.pendingMissions[i];

        if (
          !this.resourceAllocator.canEverAssignMission(
            mission,
            context.squadron,
          )
        ) {
          mission.abort("RESOURCE_UNAVAILABLE");
          context.statisticsCollector.recordAbort("RESOURCE_UNAVAILABLE");

          context.pendingMissions.splice(i, 1);
          i--;

          this.log(context, {
            time: currentTime,
            type: "MISSION_ABORTED_PERMANENT_RESOURCE_GAP",
            missionId: mission.id,
          });

          continue;
        }

        if (!this.resourceAllocator.canAssignNow(mission, context.squadron)) {
          this.log(context, {
            time: currentTime,
            type: "MISSION_WAITING_FOR_RESOURCES",
            missionId: mission.id,
            reason: "Resources are busy, resting, or under maintenance.",
          });

          continue;
        }

        const allocated = this.resourceAllocator.allocateResources(
          mission,
          context.squadron,
        );

        if (!allocated) {
          continue;
        }

        context.pendingMissions.splice(i, 1);

        const abortType = this.abortHandler.checkAbort(context.scenario);

        if (abortType) {
          mission.abort(abortType);
          context.statisticsCollector.recordAbort(abortType);
          this.releaseMissionResources(mission, context.squadron);

          this.log(context, {
            time: currentTime,
            type: "MISSION_ABORTED_AFTER_ALLOCATION",
            missionId: mission.id,
            reason: abortType,
          });

          dispatchedSomething = true;
          break;
        }

        const planningTime = context.scenario.missionPlanningEnabled
          ? SimulationConstants.DEFAULT_MISSION_PLANNING_TIME
          : 0;

        const waitingTime =
          currentTime - (mission.queueEnteredTime ?? mission.incomingTime);

        mission.scheduledStartTime = currentTime;

        this.log(context, {
          time: currentTime,
          type: "MISSION_DISPATCHED",
          missionId: mission.id,
          priority: mission.priority,
          waitingTime,
          aircraftId: mission.aircraftIds[0],
          pilotId: mission.pilotIds[0],
          runwayId: mission.runwayId,
        });

        context.engine.scheduleEvent(
          EventFactory.createEvent({
            type: EventType.MISSION_PLANNING_COMPLETED,
            time: currentTime + planningTime,
            entityId: mission.id,
            payload: { missionId: mission.id },
          }),
        );

        dispatchedSomething = true;
        break;
      }
    }
  }

  sortPendingMissions(pendingMissions) {
    pendingMissions.sort((a, b) => {
      const priorityDifference =
        (PRIORITY_WEIGHT[b.priority] || 0) - (PRIORITY_WEIGHT[a.priority] || 0);

      if (priorityDifference !== 0) return priorityDifference;

      const incomingDifference = (a.incomingTime || 0) - (b.incomingTime || 0);

      if (incomingDifference !== 0) return incomingDifference;

      return (a.duration || 0) - (b.duration || 0);
    });
  }

  abortUnscheduledMissions(context) {
    context.pendingMissions.forEach((mission) => {
      mission.abort("SIMULATION_ENDED_BEFORE_RESOURCES_AVAILABLE");
      context.statisticsCollector.recordAbort(
        "SIMULATION_ENDED_BEFORE_RESOURCES_AVAILABLE",
      );

      this.log(context, {
        time: context.engine.getCurrentTime(),
        type: "MISSION_ABORTED_SIMULATION_ENDED",
        missionId: mission.id,
      });
    });

    context.pendingMissions.length = 0;
  }

  createSortieFromMission(mission, takeoffTime) {
    const sortie = new Sortie({
      id: `SOR-${mission.id}`,

      missionId: mission.id,
      missionName: mission.name,
      missionType: mission.type,
      priority: mission.priority,

      aircraftId: mission.aircraftIds[0],
      pilotId: mission.pilotIds[0],
      groundCrewIds: mission.groundCrewIds,
      runwayId: mission.runwayId,

      requiredPilotRating: mission.requiredPilotRating,

      requiredAircraftCount: mission.requiredAircraftCount,

      targetId: mission.targetId,
      targetType: mission.targetType,

      weaponInventory: mission.weaponInventory,

      weaponUsage: mission.weaponUsage,

      remainingWeaponInventory: mission.remainingWeaponInventory,

      strikePlan: mission.strikePlan,

      plannedDuration:
        mission.duration || SimulationConstants.DEFAULT_SORTIE_DURATION,
    });

    sortie.recordTakeoff(takeoffTime);

    return sortie;
  }

  findMission(missions, missionId) {
    return missions.find((mission) => mission.id === missionId);
  }

  findById(items, id) {
    return items.find((item) => item.id === id);
  }

  releaseMissionResources(mission, squadron) {
    mission.aircraftIds.forEach((id) => {
      const aircraft = this.findById(squadron.aircraft, id);
      if (aircraft) aircraft.release();
    });

    mission.pilotIds.forEach((id) => {
      const pilot = this.findById(squadron.pilots, id);
      if (pilot) pilot.release();
    });

    mission.groundCrewIds.forEach((id) => {
      const crew = this.findById(squadron.groundCrew, id);
      if (crew) crew.release();
    });

    const runway = this.findById(squadron.runways, mission.runwayId);
    if (runway) runway.release();
  }

  log(context, entry) {
    context.schedulerLog.push(entry);
  }
}

module.exports = SimulationService;
