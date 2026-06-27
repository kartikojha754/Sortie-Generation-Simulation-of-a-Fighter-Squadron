/**
 * Represents a ground crew member responsible for preparing
 * and maintaining aircraft before and after sorties.
 */

class GroundCrew {
    /**
     * @param {Object} data
     */
    constructor(data = {}) {

        this.id = data.id || null;

        this.name = data.name || "";

        // Examples:
        // Technician
        // Engineer
        // Fuel Crew
        // Weapons Crew
        this.role = data.role || "";

        this.isAvailable =
            data.isAvailable !== undefined
                ? data.isAvailable
                : true;

        this.assignedAircraftId =
            data.assignedAircraftId || null;

        this.assignedMissionId =
            data.assignedMissionId || null;
    }

    /**
     * Returns availability.
     */
    available() {
        return this.isAvailable;
    }

    /**
     * Assign crew to an aircraft.
     */
    assignAircraft(aircraftId) {

        if (!this.isAvailable) {
            throw new Error("Ground crew is not available.");
        }

        this.assignedAircraftId = aircraftId;
        this.isAvailable = false;
    }

    /**
     * Assign crew to a mission.
     */
    assignMission(missionId) {
        this.assignedMissionId = missionId;
    }

    /**
     * Release crew after work completion.
     */
    release() {

        this.isAvailable = true;
        this.assignedAircraftId = null;
        this.assignedMissionId = null;
    }

    /**
     * JSON representation.
     */
    toJSON() {
        return {
            id: this.id,
            name: this.name,
            role: this.role,
            isAvailable: this.isAvailable,
            assignedAircraftId: this.assignedAircraftId,
            assignedMissionId: this.assignedMissionId
        };
    }
}

module.exports = GroundCrew;