/**
 * Represents a simulation scenario.
 * A scenario defines the conditions under which the simulation runs.
 */

class Scenario {

    /**
     * @param {Object} data
     */
    constructor(data = {}) {

        this.id = data.id || null;

        this.name = data.name || "";

        this.description = data.description || "";

        // Abort probabilities (0.0 - 1.0)
        this.groundAbortRate =
            data.groundAbortRate || 0;

        this.airAbortRate =
            data.airAbortRate || 0;

        this.weatherAbortRate =
            data.weatherAbortRate || 0;

        // Available resources
        this.availableAircraft =
            data.availableAircraft || 0;

        this.availablePilots =
            data.availablePilots || 0;

        this.availableGroundCrew =
            data.availableGroundCrew || 0;

        this.availableRunways =
            data.availableRunways || 0;

        // Scheduling options
        this.randomScheduling =
            data.randomScheduling || false;

        this.missionPlanningEnabled =
            data.missionPlanningEnabled !== undefined
                ? data.missionPlanningEnabled
                : true;

        // Simulation duration (minutes)
        this.simulationDuration =
            data.simulationDuration || 1440;
    }

    /**
     * Enables random scheduling.
     */
    enableRandomScheduling() {
        this.randomScheduling = true;
    }

    /**
     * Disables random scheduling.
     */
    disableRandomScheduling() {
        this.randomScheduling = false;
    }

    /**
     * Enables mission planning.
     */
    enableMissionPlanning() {
        this.missionPlanningEnabled = true;
    }

    /**
     * Disables mission planning.
     */
    disableMissionPlanning() {
        this.missionPlanningEnabled = false;
    }

    /**
     * JSON representation.
     */
    toJSON() {
        return {
            id: this.id,
            name: this.name,
            description: this.description,
            groundAbortRate: this.groundAbortRate,
            airAbortRate: this.airAbortRate,
            weatherAbortRate: this.weatherAbortRate,
            availableAircraft: this.availableAircraft,
            availablePilots: this.availablePilots,
            availableGroundCrew: this.availableGroundCrew,
            availableRunways: this.availableRunways,
            randomScheduling: this.randomScheduling,
            missionPlanningEnabled: this.missionPlanningEnabled,
            simulationDuration: this.simulationDuration
        };
    }
}

module.exports = Scenario;