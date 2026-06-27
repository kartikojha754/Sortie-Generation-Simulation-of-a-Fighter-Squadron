/**
 * Simulation-wide configurable constants.
 * These values control the behavior of the simulation and can
 * be modified later without changing the core logic.
 */

const SimulationConstants = Object.freeze({

    // Time (Minutes)
    DEFAULT_SIMULATION_DURATION: 1440,      // 24 Hours
    DEFAULT_SORTIE_DURATION: 90,
    DEFAULT_MISSION_PLANNING_TIME: 30,
    DEFAULT_BRIEFING_TIME: 20,
    DEFAULT_AIRCRAFT_PREPARATION_TIME: 25,
    DEFAULT_DEBRIEFING_TIME: 20,
    DEFAULT_MAINTENANCE_TIME: 120,

    // Aircraft
    MAX_FLIGHT_HOURS_BEFORE_MAINTENANCE: 50,

    // Pilot
    MIN_REST_TIME_AFTER_SORTIE: 720,        // 12 Hours

    // Simulation
    DEFAULT_TIME_STEP: 1                    // Minute

});

module.exports = SimulationConstants;