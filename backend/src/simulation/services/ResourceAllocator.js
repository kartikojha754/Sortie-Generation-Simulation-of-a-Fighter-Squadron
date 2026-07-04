const { enums } = require("../../domain");

const { PilotRating } = enums;

const RATING_WEIGHT = {
  [PilotRating.TRAINEE]: 1,
  [PilotRating.WINGMAN]: 2,
  [PilotRating.FLIGHT_LEAD]: 3,
  [PilotRating.FOUR_SHIP_LEAD]: 4,
  [PilotRating.INSTRUCTOR]: 5,
};

/**
 * Allocates squadron resources to missions.
 */
class ResourceAllocator {
  allocateResources(mission, squadron) {
    const aircraft = squadron.getAvailableAircraft()[0];

    const pilot = this.findQualifiedPilot(
      mission,
      squadron.getAvailablePilots(),
    );

    const runway = squadron.getAvailableRunways()[0];
    const groundCrew = squadron.getAvailableGroundCrew()[0];

    if (!aircraft || !pilot || !runway || !groundCrew) {
      return false;
    }

    aircraft.assignMission(mission.id);
    aircraft.assignPilot(pilot.id);

    pilot.assignMission(mission.id);
    pilot.assignAircraft(aircraft.id);

    runway.occupy(mission.id, aircraft.id);

    groundCrew.assignAircraft(aircraft.id);
    groundCrew.assignMission(mission.id);

    mission.assignAircraft(aircraft.id);
    mission.assignPilot(pilot.id);
    mission.assignRunway(runway.id);
    mission.assignGroundCrew(groundCrew.id);
    mission.markReady();

    return true;
  }

  canEverAssignMission(mission, squadron) {
    const hasAircraft = squadron.aircraft.length > 0;
    const hasRunway = squadron.runways.length > 0;
    const hasGroundCrew = squadron.groundCrew.length > 0;

    const requiredRating = mission.requiredPilotRating || PilotRating.WINGMAN;
    const requiredWeight = RATING_WEIGHT[requiredRating] || 1;

    const hasQualifiedPilot = squadron.pilots.some((pilot) => {
      const pilotWeight = RATING_WEIGHT[pilot.rating] || 1;
      return pilotWeight >= requiredWeight;
    });

    return hasAircraft && hasRunway && hasGroundCrew && hasQualifiedPilot;
  }

  canAssignNow(mission, squadron) {
    const aircraft = squadron.getAvailableAircraft()[0];

    const pilot = this.findQualifiedPilot(
      mission,
      squadron.getAvailablePilots(),
    );

    const runway = squadron.getAvailableRunways()[0];
    const groundCrew = squadron.getAvailableGroundCrew()[0];

    return Boolean(aircraft && pilot && runway && groundCrew);
  }

  findQualifiedPilot(mission, availablePilots) {
    const requiredRating = mission.requiredPilotRating || PilotRating.WINGMAN;
    const requiredWeight = RATING_WEIGHT[requiredRating] || 1;

    return availablePilots
      .filter((pilot) => {
        const pilotWeight = RATING_WEIGHT[pilot.rating] || 1;
        return pilotWeight >= requiredWeight;
      })
      .sort((a, b) => {
        return (RATING_WEIGHT[a.rating] || 1) - (RATING_WEIGHT[b.rating] || 1);
      })[0];
  }
}

module.exports = ResourceAllocator;
