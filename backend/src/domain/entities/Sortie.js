const { EventType } = require("../enums");

class Sortie {
  constructor(data = {}) {
    this.id = data.id || null;

    this.missionId = data.missionId || null;
    this.missionName = data.missionName || "";
    this.missionType = data.missionType || null;
    this.priority = data.priority || null;

    this.aircraftId = data.aircraftId || null;
    this.pilotId = data.pilotId || null;
    this.groundCrewIds = data.groundCrewIds || [];
    this.runwayId = data.runwayId || null;

    this.requiredPilotRating = data.requiredPilotRating || null;

    this.requiredAircraftCount = Number(data.requiredAircraftCount || 1);

    this.targetId = data.targetId || null;
    this.targetType = data.targetType || null;

    this.requiredDamagePercentage = Number(
      data.requiredDamagePercentage || 100,
    );

    this.strikePlan = data.strikePlan || null;

    this.takeoffTime = data.takeoffTime ?? null;

    this.landingTime = data.landingTime ?? null;

    this.plannedDuration = data.plannedDuration || 0;

    this.actualDuration = data.actualDuration ?? null;

    this.successful = data.successful !== undefined ? data.successful : false;

    this.events = data.events || [];
  }

  recordTakeoff(time) {
    this.takeoffTime = time;

    this.events.push({
      type: EventType.TAKEOFF,
      time,
    });
  }

  recordLanding(time) {
    this.landingTime = time;

    this.events.push({
      type: EventType.LANDING,
      time,
    });

    if (this.takeoffTime !== null && this.landingTime !== null) {
      this.actualDuration = this.landingTime - this.takeoffTime;
    }
  }

  addEvent(type, time, details = {}) {
    this.events.push({
      type,
      time,
      details,
    });
  }

  markSuccessful() {
    this.successful = true;
  }

  toJSON() {
    return {
      id: this.id,
      missionId: this.missionId,
      missionName: this.missionName,
      missionType: this.missionType,
      priority: this.priority,

      aircraftId: this.aircraftId,
      pilotId: this.pilotId,
      groundCrewIds: this.groundCrewIds,
      runwayId: this.runwayId,

      requiredPilotRating: this.requiredPilotRating,

      requiredAircraftCount: this.requiredAircraftCount,

      targetId: this.targetId,
      targetType: this.targetType,

      requiredDamagePercentage: this.requiredDamagePercentage,

      strikePlan: this.strikePlan,

      takeoffTime: this.takeoffTime,
      landingTime: this.landingTime,

      plannedDuration: this.plannedDuration,

      actualDuration: this.actualDuration,

      successful: this.successful,
      events: this.events,
    };
  }
}

module.exports = Sortie;
