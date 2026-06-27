/**
 * Aircraft operational states.
 * These states are managed by the Simulation Engine.
 */

const AircraftStatus = Object.freeze({
    AVAILABLE: "AVAILABLE",
    ASSIGNED: "ASSIGNED",
    MISSION_PLANNING: "MISSION_PLANNING",
    PRE_FLIGHT: "PRE_FLIGHT",
    TAXIING: "TAXIING",
    AIRBORNE: "AIRBORNE",
    LANDING: "LANDING",
    POST_FLIGHT: "POST_FLIGHT",
    MAINTENANCE: "MAINTENANCE",
    UNAVAILABLE: "UNAVAILABLE"
});

module.exports = AircraftStatus;