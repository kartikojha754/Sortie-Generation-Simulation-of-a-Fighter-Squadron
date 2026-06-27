/**
 * Default military-related constants.
 * These represent the baseline squadron configuration.
 */

const MilitaryConstants = Object.freeze({

    // Squadron
    DEFAULT_SQUADRON_NAME: "Fighter Squadron",

    // Resources
    DEFAULT_AIRCRAFT_COUNT: 20,
    DEFAULT_PILOT_COUNT: 24,
    DEFAULT_GROUND_CREW_COUNT: 40,
    DEFAULT_RUNWAY_COUNT: 2,

    // Mission Limits
    MIN_AIRCRAFT_PER_MISSION: 1,
    MAX_AIRCRAFT_PER_MISSION: 4,

    MIN_PILOTS_PER_MISSION: 1,
    MAX_PILOTS_PER_MISSION: 4

});

module.exports = MilitaryConstants;