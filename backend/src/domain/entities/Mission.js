const {
  MissionStatus,
  MissionPriority,
  MissionType,
  PilotRating,
} = require("../enums");

/**
 * Represents a mission assigned to one or more aircraft and pilots.
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

    this.actualStartTime = data.actualStartTime || null;
    this.endTime = data.endTime || null;

    this.requiredPilotRating = data.requiredPilotRating || PilotRating.WINGMAN;

    this.duration = data.duration || 90;

    this.abortReason = data.abortReason || null;
    this.isCompleted = data.isCompleted || false;
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

      abortReason: this.abortReason,
      isCompleted: this.isCompleted,
    };
  }
}

module.exports = Mission;
