const {
  MissionStatus,
  MissionPriority,
  MissionType,
  PilotRating,
} = require("../enums");

/**
 * Represents a mission assigned to one or more
 * aircraft and pilots.
 */
class Mission {
  constructor(data = {}) {
    this.id = data.id || null;
    this.name = data.name || "";

    this.type = data.type || MissionType.TRAINING;

    this.priority = data.priority || MissionPriority.MEDIUM;

    this.status = data.status || MissionStatus.SCHEDULED;

    this.aircraftIds = data.aircraftIds || [];

    this.pilotIds = data.pilotIds || [];

    this.groundCrewIds = data.groundCrewIds || [];

    this.runwayId = data.runwayId || null;

    this.incomingTime = data.incomingTime ?? data.scheduledStartTime ?? 0;

    this.scheduledStartTime = data.scheduledStartTime ?? this.incomingTime;

    this.actualStartTime = data.actualStartTime ?? null;

    this.endTime = data.endTime ?? null;

    this.requiredPilotRating = data.requiredPilotRating || PilotRating.WINGMAN;

    this.duration = Number(data.duration || 90);

    /*
     * AIR_TO_GROUND planning fields
     */
    this.targetId = data.targetId || null;

    this.targetType = data.targetType || null;

    this.maximumAllowedTime = Number(
      data.maximumAllowedTime || data.duration || 90,
    );

    this.aircraftSpeedKmph = Number(data.aircraftSpeedKmph || 900);

    /*
     * Planning result may recommend more than
     * one aircraft.
     *
     * Current simulation still executes using
     * one representative aircraft.
     */
    this.requiredAircraftCount = Number(data.requiredAircraftCount || 1);

    this.strikePlan = data.strikePlan || null;

    this.strikePlanningSummary = data.strikePlanningSummary || null;

    this.abortReason = data.abortReason || null;

    this.isCompleted = data.isCompleted || false;

    this.queueEnteredTime = data.queueEnteredTime ?? null;
  }

  assignAircraft(aircraftId) {
    if (!this.aircraftIds.includes(aircraftId)) {
      this.aircraftIds.push(aircraftId);
    }
  }

  assignPilot(pilotId) {
    if (!this.pilotIds.includes(pilotId)) {
      this.pilotIds.push(pilotId);
    }
  }

  assignGroundCrew(crewId) {
    if (!this.groundCrewIds.includes(crewId)) {
      this.groundCrewIds.push(crewId);
    }
  }

  assignRunway(runwayId) {
    this.runwayId = runwayId;
  }

  applyStrikePlan(planningResult) {
    if (
      !planningResult ||
      !planningResult.success ||
      !planningResult.bestPlan
    ) {
      return false;
    }

    const bestPlan = planningResult.bestPlan;

    this.targetId = planningResult.target.id;

    this.targetType = planningResult.target.type;

    this.requiredAircraftCount = bestPlan.aircraftCount;

    this.duration = Math.ceil(bestPlan.sortieDuration);

    this.strikePlan = bestPlan;

    this.strikePlanningSummary = {
      generatedPlanCount: planningResult.generatedPlanCount,

      validPlanCount: planningResult.validPlanCount,

      fastestPlan: planningResult.fastestPlan,

      lowestResourcePlan: planningResult.lowestResourcePlan,
    };

    return true;
  }

  markReady() {
    this.status = MissionStatus.READY;
  }

  start(startTime = new Date()) {
    this.status = MissionStatus.IN_PROGRESS;

    this.actualStartTime = startTime;
  }

  complete(endTime = new Date()) {
    this.status = MissionStatus.COMPLETED;

    this.endTime = endTime;
    this.isCompleted = true;
  }

  abort(reason) {
    this.status = MissionStatus.ABORTED;

    this.abortReason = reason;
  }

  isInProgress() {
    return this.status === MissionStatus.IN_PROGRESS;
  }

  hasCompleted() {
    return this.isCompleted;
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      type: this.type,
      priority: this.priority,
      status: this.status,

      aircraftIds: this.aircraftIds,
      pilotIds: this.pilotIds,
      groundCrewIds: this.groundCrewIds,
      runwayId: this.runwayId,

      incomingTime: this.incomingTime,

      scheduledStartTime: this.scheduledStartTime,

      actualStartTime: this.actualStartTime,

      endTime: this.endTime,

      requiredPilotRating: this.requiredPilotRating,

      duration: this.duration,

      targetId: this.targetId,
      targetType: this.targetType,

      maximumAllowedTime: this.maximumAllowedTime,

      aircraftSpeedKmph: this.aircraftSpeedKmph,

      requiredAircraftCount: this.requiredAircraftCount,

      strikePlan: this.strikePlan,

      strikePlanningSummary: this.strikePlanningSummary,

      abortReason: this.abortReason,
      isCompleted: this.isCompleted,
    };
  }
}

module.exports = Mission;
