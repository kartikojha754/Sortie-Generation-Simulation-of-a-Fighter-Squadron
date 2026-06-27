/**
 * Pilot operational states.
 */

const PilotStatus = Object.freeze({
    AVAILABLE: "AVAILABLE",
    MISSION_PLANNING: "MISSION_PLANNING",
    BRIEFING: "BRIEFING",
    FLYING: "FLYING",
    DEBRIEFING: "DEBRIEFING",
    RESTING: "RESTING",
    TRAINING: "TRAINING",
    UNAVAILABLE: "UNAVAILABLE"
});

module.exports = PilotStatus;