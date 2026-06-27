/**
 * Types of missions.
 * Extend this list as needed.
 */

const MissionType = Object.freeze({
    TRAINING: "TRAINING",
    AIR_TO_AIR: "AIR_TO_AIR",
    AIR_TO_GROUND: "AIR_TO_GROUND",
    RECONNAISSANCE: "RECONNAISSANCE",
    DEFENSIVE_PATROL: "DEFENSIVE_PATROL",
    OFFENSIVE_PATROL: "OFFENSIVE_PATROL",
    ESCORT: "ESCORT",
    INTERCEPTION: "INTERCEPTION"
});

module.exports = MissionType;