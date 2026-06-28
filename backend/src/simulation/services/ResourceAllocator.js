/**
 * Allocates squadron resources to missions.
 */
class ResourceAllocator {
    allocateResources(mission, squadron) {
        const aircraft = squadron.getAvailableAircraft()[0];
        const pilot = squadron.getAvailablePilots()[0];
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
}

module.exports = ResourceAllocator;