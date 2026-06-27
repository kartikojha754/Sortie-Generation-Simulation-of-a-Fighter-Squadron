/**
 * Represents a runway used for aircraft takeoff and landing.
 * A runway is treated as a shared resource within the simulation.
 */

class Runway {
    /**
     * @param {Object} data
     */
    constructor(data = {}) {

        this.id = data.id || null;

        this.name = data.name || "";

        // Whether the runway is currently occupied
        this.isAvailable =
            data.isAvailable !== undefined
                ? data.isAvailable
                : true;

        // Mission currently using the runway
        this.currentMissionId =
            data.currentMissionId || null;

        // Aircraft currently using the runway
        this.currentAircraftId =
            data.currentAircraftId || null;
    }

    /**
     * Returns whether the runway is available.
     */
    isRunwayAvailable() {
        return this.isAvailable;
    }

    /**
     * Occupy the runway.
     */
    occupy(missionId, aircraftId) {

        if (!this.isAvailable) {
            throw new Error("Runway is already occupied.");
        }

        this.isAvailable = false;
        this.currentMissionId = missionId;
        this.currentAircraftId = aircraftId;
    }

    /**
     * Release the runway.
     */
    release() {

        this.isAvailable = true;
        this.currentMissionId = null;
        this.currentAircraftId = null;
    }

    /**
     * Returns JSON representation.
     */
    toJSON() {
        return {
            id: this.id,
            name: this.name,
            isAvailable: this.isAvailable,
            currentMissionId: this.currentMissionId,
            currentAircraftId: this.currentAircraftId
        };
    }
}

module.exports = Runway;