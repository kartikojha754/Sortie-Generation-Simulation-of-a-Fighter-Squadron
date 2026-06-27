const { PilotStatus, PilotRating } = require("../enums");
const SimulationConstants = require("../constants/SimulationConstants");

/**
 * Represents a fighter pilot within the squadron.
 * Stores pilot information and current operational state.
 */
class Pilot {
    /**
     * @param {Object} data
     */
    constructor(data = {}) {
        this.id = data.id || null;

        this.name = data.name || "";

        this.rank = data.rank || "";

        this.rating = data.rating || PilotRating.TRAINEE;

        this.status = data.status || PilotStatus.AVAILABLE;

        // Total accumulated flight hours
        this.flightHours = data.flightHours || 0;

        // Mission currently assigned
        this.assignedMissionId = data.assignedMissionId || null;

        // Aircraft currently assigned
        this.assignedAircraftId = data.assignedAircraftId || null;

        // Time remaining before pilot becomes available again
        this.restTimeRemaining = data.restTimeRemaining || 0;
    }

    /**
     * Returns whether the pilot is available.
     */
    isAvailable() {
        return (
            this.status === PilotStatus.AVAILABLE &&
            this.restTimeRemaining === 0
        );
    }

    /**
     * Assign pilot to a mission.
     */
    assignMission(missionId) {
        if (!this.isAvailable()) {
            throw new Error("Pilot is not available.");
        }

        this.assignedMissionId = missionId;
        this.status = PilotStatus.MISSION_PLANNING;
    }

    /**
     * Assign aircraft.
     */
    assignAircraft(aircraftId) {
        this.assignedAircraftId = aircraftId;
    }

    /**
     * Pilot starts flying.
     */
    startFlight() {
        this.status = PilotStatus.FLYING;
    }

    /**
     * Flight completed.
     */
    completeFlight(hours) {

        if (hours < 0) {
            throw new Error("Flight hours cannot be negative.");
        }

        this.flightHours += hours;

        this.status = PilotStatus.RESTING;

        this.restTimeRemaining =
            SimulationConstants.MIN_REST_TIME_AFTER_SORTIE;
    }

    /**
     * Reduce remaining rest time.
     */
    reduceRestTime(minutes) {

        this.restTimeRemaining = Math.max(
            0,
            this.restTimeRemaining - minutes
        );

        if (this.restTimeRemaining === 0) {
            this.status = PilotStatus.AVAILABLE;
        }
    }

    /**
     * Release pilot after mission.
     */
    release() {

        this.assignedMissionId = null;
        this.assignedAircraftId = null;

        if (this.restTimeRemaining === 0) {
            this.status = PilotStatus.AVAILABLE;
        }
    }

    /**
     * JSON representation.
     */
    toJSON() {
        return {
            id: this.id,
            name: this.name,
            rank: this.rank,
            rating: this.rating,
            status: this.status,
            flightHours: this.flightHours,
            assignedMissionId: this.assignedMissionId,
            assignedAircraftId: this.assignedAircraftId,
            restTimeRemaining: this.restTimeRemaining
        };
    }
}

module.exports = Pilot;