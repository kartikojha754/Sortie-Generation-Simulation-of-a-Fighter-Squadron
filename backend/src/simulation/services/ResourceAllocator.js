const { enums } = require("../../domain");

const { PilotRating } = enums;

const RATING_WEIGHT = {
  [PilotRating.TRAINEE]: 1,
  [PilotRating.WINGMAN]: 2,
  [PilotRating.FLIGHT_LEAD]: 3,
  [PilotRating.FOUR_SHIP_LEAD]: 4,
  [PilotRating.INSTRUCTOR]: 5,
};

class ResourceAllocator {
  getAvailability(mission, squadron) {
    const requiredCount = Math.max(1, Number(mission.requiredAircraftCount || 1));
    const availableAircraft = squadron.getAvailableAircraft();
    const qualifiedPilots = this.findQualifiedPilots(
      mission,
      squadron.getAvailablePilots(),
      requiredCount,
    );
    const availableGroundCrew = squadron.getAvailableGroundCrew();
    const availableRunways = squadron.getAvailableRunways();

    const missing = [];

    if (availableAircraft.length < requiredCount) missing.push("AIRCRAFT");
    if (qualifiedPilots.length < requiredCount) missing.push("QUALIFIED_PILOT");
    if (availableGroundCrew.length < requiredCount) missing.push("GROUND_CREW");
    if (availableRunways.length < 1) missing.push("RUNWAY");

    return {
      success: missing.length === 0,
      reason: missing.length ? `WAITING_FOR_${missing.join("_AND_")}` : null,
      missing,
      requiredCount,
      available: {
        aircraft: availableAircraft.length,
        qualifiedPilots: qualifiedPilots.length,
        groundCrew: availableGroundCrew.length,
        runways: availableRunways.length,
      },
    };
  }

  allocateResources(mission, squadron) {
    const availability = this.getAvailability(mission, squadron);
    if (!availability.success) return availability;

    const requiredCount = availability.requiredCount;
    const aircraft = squadron.getAvailableAircraft().slice(0, requiredCount);
    const pilots = this.findQualifiedPilots(
      mission,
      squadron.getAvailablePilots(),
      requiredCount,
    );
    const groundCrew = squadron.getAvailableGroundCrew().slice(0, requiredCount);
    const runway = squadron.getAvailableRunways()[0];

    aircraft.forEach((item, index) => {
      const pilot = pilots[index];
      const crew = groundCrew[index];

      item.assignMission(mission.id);
      item.assignPilot(pilot.id);
      pilot.assignMission(mission.id);
      pilot.assignAircraft(item.id);
      crew.assignAircraft(item.id);
      crew.assignMission(mission.id);

      mission.assignAircraft(item.id);
      mission.assignPilot(pilot.id);
      mission.assignGroundCrew(crew.id);
    });

    runway.occupy(mission.id, aircraft[0].id);
    mission.assignRunway(runway.id);
    mission.markReady();

    return {
      success: true,
      reason: null,
      aircraftIds: aircraft.map((item) => item.id),
      pilotIds: pilots.map((item) => item.id),
      groundCrewIds: groundCrew.map((item) => item.id),
      runwayId: runway.id,
    };
  }

  canEverAssignMission(mission, squadron) {
    const requiredCount = Math.max(1, Number(mission.requiredAircraftCount || 1));
    const hasAircraft = squadron.aircraft.length >= requiredCount;
    const hasRunway = squadron.runways.length > 0;
    const hasGroundCrew = squadron.groundCrew.length >= requiredCount;
    const hasQualifiedPilots =
      this.findQualifiedPilots(mission, squadron.pilots, requiredCount).length >=
      requiredCount;

    return hasAircraft && hasRunway && hasGroundCrew && hasQualifiedPilots;
  }

  canAssignNow(mission, squadron) {
    return this.getAvailability(mission, squadron).success;
  }

  findQualifiedPilots(mission, pilots, count) {
    const requiredRating = mission.requiredPilotRating || PilotRating.WINGMAN;
    const requiredWeight = RATING_WEIGHT[requiredRating] || 1;

    return pilots
      .filter((pilot) => (RATING_WEIGHT[pilot.rating] || 1) >= requiredWeight)
      .sort(
        (a, b) =>
          (RATING_WEIGHT[a.rating] || 1) - (RATING_WEIGHT[b.rating] || 1),
      )
      .slice(0, count);
  }
}

module.exports = ResourceAllocator;
