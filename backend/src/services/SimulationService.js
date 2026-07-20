const {
  SimulationEngine,
  EventFactory,
  MissionPlanner,
  ResourceAllocator,
  AbortHandler,
  MaintenanceScheduler,
  StatisticsCollector,
  WeaponInventoryManager,
  PendingMissionQueue,
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
    this.pendingMissions = new PendingMissionQueue();
    this.schedulerLog = [];
  }

  runSimulation(input) {
    const { squadron, scenario, missionCount } = input;

    this.sorties = [];
    this.maintenanceRecords = [];
    this.pendingMissions = new PendingMissionQueue();
    this.schedulerLog = [];
    this.statisticsCollector = new StatisticsCollector();

    const engine = new SimulationEngine();

    const missions = this.missionPlanner.createMissions(missionCount, scenario);
    const weaponInventoryManager = new WeaponInventoryManager(
      scenario.weaponInventory || squadron.weaponInventory || {},
    );
    squadron.weaponInventory = weaponInventoryManager.getRemaining();

    const context = {
      engine,
      squadron,
      scenario,
      missions,
      sorties: this.sorties,
      maintenanceRecords: this.maintenanceRecords,
      pendingMissionQueue: this.pendingMissions,
      schedulerLog: this.schedulerLog,
      statisticsCollector: this.statisticsCollector,
      weaponInventoryManager,
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
    squadron.weaponInventory = weaponInventoryManager.getRemaining();
    squadron.weaponInventorySummary = weaponInventoryManager.getReport();

    return {
      scenario: scenario.toJSON(),
      statistics: this.statisticsCollector.getReport(),
      missions: missions.map((m) => m.toJSON()),
      sorties: this.sorties
        .sort((a, b) => (a.takeoffTime ?? 0) - (b.takeoffTime ?? 0))
        .map((s) => s.toJSON()),
      maintenanceRecords: this.maintenanceRecords.map((m) => m.toJSON()),
      schedulerLog: this.schedulerLog,
      pendingMissionQueue: this.pendingMissions.toJSON(),
      weaponInventorySummary: weaponInventoryManager.getReport(),
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

      context.pendingMissionQueue.enqueue(mission, event.time);

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

      const aircraftList = mission.aircraftIds
        .map((id) => this.findById(context.squadron.aircraft, id))
        .filter(Boolean);
      const pilotList = mission.pilotIds
        .map((id) => this.findById(context.squadron.pilots, id))
        .filter(Boolean);
      const runway = this.findById(context.squadron.runways, mission.runwayId);

      aircraftList.forEach((aircraft) => aircraft.startFlight());
      pilotList.forEach((pilot) => pilot.startFlight());
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

      const aircraftList = mission.aircraftIds
        .map((id) => this.findById(context.squadron.aircraft, id))
        .filter(Boolean);
      const pilotList = mission.pilotIds
        .map((id) => this.findById(context.squadron.pilots, id))
        .filter(Boolean);

      const sortie = this.findById(context.sorties, event.payload.sortieId);

      const missionDuration =
        mission.duration || SimulationConstants.DEFAULT_SORTIE_DURATION;

      aircraftList.forEach((aircraft) => {
        aircraft.land();
        aircraft.addFlightHours(missionDuration / 60);
      });

      pilotList.forEach((pilot) => {
        pilot.completeFlight(missionDuration / 60);
        pilot.release();
        engine.scheduleEvent(
          EventFactory.createEvent({
            type: EventType.PILOT_REST_COMPLETED,
            time: event.time + SimulationConstants.MIN_REST_TIME_AFTER_SORTIE,
            entityId: pilot.id,
            payload: { pilotId: pilot.id },
          }),
        );
      });

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

      aircraftList.forEach((aircraft) => {
        const maintenanceResult = this.maintenanceScheduler.scheduleMaintenance(
          aircraft,
          event.time,
        );
        context.maintenanceRecords.push(maintenanceResult.maintenance);
        engine.scheduleEvent(maintenanceResult.completionEvent);
      });

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
      const pendingMissions = context.pendingMissionQueue.getAll();

      for (const mission of pendingMissions) {
        if (mission.type === "AIR_TO_GROUND") {
          const availableAircraftCount = Math.min(
            context.squadron.getAvailableAircraft().length,
            Number(
              context.scenario.maxStrikeAircraft ||
                context.squadron.aircraft.length ||
                1,
            ),
          );

          if (availableAircraftCount < 1) {
            this.markMissionWaiting(
              mission,
              context,
              currentTime,
              "WAITING_FOR_AIRCRAFT",
            );
            continue;
          }

          const planningResult = this.missionPlanner.planAirToGroundMission(
            mission,
            context.scenario,
            context.weaponInventoryManager.getRemaining(),
            availableAircraftCount,
          );

          if (!planningResult.success || !planningResult.bestPlan) {
            mission.strikePlanningSummary = {
              failureReason:
                planningResult.failureReason || "NO_VALID_WEAPON_COMBINATION",
              generatedPlanCount: planningResult.generatedPlanCount || 0,
              validPlanCount: planningResult.validPlanCount || 0,
              results: planningResult.results || [],
            };

            this.markMissionWaiting(
              mission,
              context,
              currentTime,
              "WAITING_FOR_WEAPON_INVENTORY",
              {
                remainingWeaponInventory:
                  context.weaponInventoryManager.getRemaining(),
              },
            );
            continue;
          }

          mission.weaponInventory =
            context.weaponInventoryManager.getRemaining();
          mission.applyStrikePlan(planningResult);
          mission.weaponUsage = {
            ...(planningResult.bestPlan.weaponUsage || {}),
          };
        }

        if (
          !this.resourceAllocator.canEverAssignMission(
            mission,
            context.squadron,
          )
        ) {
          mission.abort("RESOURCE_UNAVAILABLE");
          context.statisticsCollector.recordAbort("RESOURCE_UNAVAILABLE");
          context.pendingMissionQueue.remove(mission.id);

          this.log(context, {
            time: currentTime,
            type: "MISSION_ABORTED_PERMANENT_RESOURCE_GAP",
            missionId: mission.id,
          });
          continue;
        }

        const availability = this.resourceAllocator.getAvailability(
          mission,
          context.squadron,
        );

        if (!availability.success) {
          this.markMissionWaiting(
            mission,
            context,
            currentTime,
            availability.reason,
            { availability: availability.available },
          );
          continue;
        }

        const allocation = this.resourceAllocator.allocateResources(
          mission,
          context.squadron,
        );

        if (!allocation.success) {
          this.markMissionWaiting(
            mission,
            context,
            currentTime,
            allocation.reason || "WAITING_FOR_RESOURCES",
          );
          continue;
        }

        if (mission.type === "AIR_TO_GROUND") {
          const consumed = context.weaponInventoryManager.consume(
            mission.id,
            mission.weaponUsage,
            currentTime,
          );

          if (!consumed) {
            this.releaseMissionResources(mission, context.squadron);
            this.clearMissionAssignments(mission);
            this.markMissionWaiting(
              mission,
              context,
              currentTime,
              "WAITING_FOR_WEAPON_INVENTORY",
            );
            continue;
          }

          mission.remainingWeaponInventory =
            context.weaponInventoryManager.getRemaining();
          context.squadron.weaponInventory =
            mission.remainingWeaponInventory;
          context.squadron.weaponInventorySummary =
            context.weaponInventoryManager.getReport();

          this.log(context, {
            time: currentTime,
            type: "WEAPONS_CONSUMED",
            missionId: mission.id,
            weaponUsage: mission.weaponUsage,
            remainingWeaponInventory: mission.remainingWeaponInventory,
          });
        }

        context.pendingMissionQueue.remove(mission.id);

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
        mission.dispatchedTime = currentTime;
        mission.totalWaitingTime = waitingTime;
        mission.waitingReason = null;
        context.statisticsCollector.recordDispatch(
          waitingTime,
          mission.retryCount,
        );

        this.log(context, {
          time: currentTime,
          type: "MISSION_DISPATCHED",
          missionId: mission.id,
          priority: mission.priority,
          waitingTime,
          retryCount: mission.retryCount,
          aircraftIds: mission.aircraftIds,
          pilotIds: mission.pilotIds,
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

  markMissionWaiting(
    mission,
    context,
    currentTime,
    reason,
    extraLogData = {},
  ) {
    const repeatedAtSameTime = mission.lastRetryTime === currentTime;
    if (!repeatedAtSameTime || mission.waitingReason !== reason) {
      mission.markWaiting(reason, currentTime);
      context.statisticsCollector.recordWait(reason);
    }

    this.log(context, {
      time: currentTime,
      type: "MISSION_WAITING_FOR_RESOURCES",
      missionId: mission.id,
      priority: mission.priority,
      reason,
      retryCount: mission.retryCount,
      ...extraLogData,
    });
  }

  abortUnscheduledMissions(context) {
    context.pendingMissionQueue.getAll().forEach((mission) => {
      mission.abort("SIMULATION_ENDED_BEFORE_RESOURCES_AVAILABLE");
      context.statisticsCollector.recordAbort(
        "SIMULATION_ENDED_BEFORE_RESOURCES_AVAILABLE",
      );

      this.log(context, {
        time: context.engine.getCurrentTime(),
        type: "MISSION_ABORTED_SIMULATION_ENDED",
        missionId: mission.id,
        waitingReason: mission.waitingReason,
        retryCount: mission.retryCount,
      });
    });

    context.pendingMissionQueue.clear();
  }

  clearMissionAssignments(mission) {
    mission.aircraftIds = [];
    mission.pilotIds = [];
    mission.groundCrewIds = [];
    mission.runwayId = null;
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

      requiredDamagePercentage: mission.requiredDamagePercentage,

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
