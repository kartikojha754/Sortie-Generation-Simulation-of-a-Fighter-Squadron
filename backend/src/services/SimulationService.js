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
const { EventType } = enums;
const { SimulationConstants } = constants;

class SimulationService {
  constructor() {
    this.missionPlanner = new MissionPlanner();
    this.resourceAllocator = new ResourceAllocator();
    this.abortHandler = new AbortHandler();
    this.maintenanceScheduler = new MaintenanceScheduler();
    this.statisticsCollector = new StatisticsCollector();

    this.sorties = [];
    this.maintenanceRecords = [];
  }

  runSimulation(input) {
    const { squadron, scenario, missionCount } = input;

    this.sorties = [];
    this.maintenanceRecords = [];
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
      statisticsCollector: this.statisticsCollector,
    };

    this.registerHandlers(engine, context);

    missions.forEach((mission) => {
      engine.scheduleEvent(
        EventFactory.createEvent({
          type: EventType.MISSION_CREATED,
          time: mission.scheduledStartTime || 0,
          entityId: mission.id,
          payload: { missionId: mission.id },
        }),
      );
    });

    engine.run(context);

    return {
      scenario: scenario.toJSON(),
      statistics: this.statisticsCollector.getReport(),
      missions: missions.map((m) => m.toJSON()),
      sorties: this.sorties.map((s) => s.toJSON()),
      maintenanceRecords: this.maintenanceRecords.map((m) => m.toJSON()),
      finalSquadronState: squadron.toJSON(),
    };
  }

  registerHandlers(engine, context) {
    engine.registerHandler(EventType.MISSION_CREATED, (event) => {
      const mission = this.findMission(context.missions, event.entityId);

      if (!mission) return;

      context.statisticsCollector.recordMission();

      const allocated = this.resourceAllocator.allocateResources(
        mission,
        context.squadron,
      );

      if (!allocated) {
        mission.abort("RESOURCE_UNAVAILABLE");
        context.statisticsCollector.recordAbort("RESOURCE_UNAVAILABLE");
        return;
      }

      const abortType = this.abortHandler.checkAbort(context.scenario);

      if (abortType) {
        mission.abort(abortType);
        context.statisticsCollector.recordAbort(abortType);
        this.releaseMissionResources(mission, context.squadron);
        return;
      }

      const planningTime = context.scenario.missionPlanningEnabled
        ? SimulationConstants.DEFAULT_MISSION_PLANNING_TIME
        : 0;

      engine.scheduleEvent(
        EventFactory.createEvent({
          type: EventType.MISSION_PLANNING_COMPLETED,
          time: event.time + planningTime,
          entityId: mission.id,
          payload: { missionId: mission.id },
        }),
      );
    });

    engine.registerHandler(EventType.MISSION_PLANNING_COMPLETED, (event) => {
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
      if (!mission) return;

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

      if (aircraft) {
        const maintenanceResult = this.maintenanceScheduler.scheduleMaintenance(
          aircraft,
          event.time,
        );

        context.maintenanceRecords.push(maintenanceResult.maintenance);

        engine.scheduleEvent(maintenanceResult.completionEvent);
      }
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
      }
    });
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
}

module.exports = SimulationService;
