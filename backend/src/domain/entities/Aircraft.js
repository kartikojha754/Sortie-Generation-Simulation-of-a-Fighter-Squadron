const { AircraftStatus } = require("../enums");
const SimulationConstants = require("../constants/SimulationConstants");

/**
 * Represents a fighter aircraft within the squadron.
 * This class stores aircraft information and current operational state.
 * It DOES NOT contain simulation logic.
 */
class Aircraft {
    /**
     * @param {Object} data
     */
    constructor(data = {}) {
        this.id = data.id || null;

        // Example: F-16-001
        this.tailNumber = data.tailNumber || "";

        // Example: F-16C Block 50
        this.aircraftType = data.aircraftType || "F-16";

        this.status = data.status || AircraftStatus.AVAILABLE;

        // Total accumulated flight hours
        this.flightHours = data.flightHours || 0;

        // Mission currently assigned
        this.assignedMissionId = data.assignedMissionId || null;

        // Pilot currently flying it
        this.assignedPilotId = data.assignedPilotId || null;

        // Indicates whether maintenance is required
        this.maintenanceRequired =
            data.maintenanceRequired || false;
    }

    /**
     * Returns true if aircraft can be assigned.
     */
    isAvailable() {
        return (
            this.status === AircraftStatus.AVAILABLE &&
            !this.maintenanceRequired
        );
    }

    /**
     * Assign aircraft to a mission.
     */
    assignMission(missionId) {
        if (!this.isAvailable()) {
            throw new Error("Aircraft is not available.");
        }

        this.assignedMissionId = missionId;
        this.status = AircraftStatus.ASSIGNED;
    }

    /**
     * Assign a pilot.
     */
    assignPilot(pilotId) {
        this.assignedPilotId = pilotId;
    }

    /**
     * Aircraft begins flying.
     */
    startFlight() {
        this.status = AircraftStatus.AIRBORNE;
    }

    /**
     * Aircraft lands.
     */
    land() {
        this.status = AircraftStatus.POST_FLIGHT;
    }

    /**
     * Adds completed flight hours.
     */
    addFlightHours(hours) {
        if (hours < 0) {
            throw new Error("Flight hours cannot be negative.");
        }

        this.flightHours += hours;

        if (
            this.flightHours >=
            SimulationConstants.MAX_FLIGHT_HOURS_BEFORE_MAINTENANCE
        ) {
            this.maintenanceRequired = true;
        }
    }

    /**
     * Starts maintenance.
     */
    startMaintenance() {
        this.status = AircraftStatus.MAINTENANCE;
    }

    /**
     * Completes maintenance.
     */
    completeMaintenance() {
        this.status = AircraftStatus.AVAILABLE;
        this.maintenanceRequired = false;
        this.assignedMissionId = null;
        this.assignedPilotId = null;
    }

    /**
     * Releases aircraft after mission completion.
     */
    release() {
        this.status = AircraftStatus.AVAILABLE;
        this.assignedMissionId = null;
        this.assignedPilotId = null;
    }

    /**
     * Returns plain JSON representation.
     */
    toJSON() {
        return {
            id: this.id,
            tailNumber: this.tailNumber,
            aircraftType: this.aircraftType,
            status: this.status,
            flightHours: this.flightHours,
            assignedMissionId: this.assignedMissionId,
            assignedPilotId: this.assignedPilotId,
            maintenanceRequired: this.maintenanceRequired
        };
    }
}

module.exports = Aircraft;