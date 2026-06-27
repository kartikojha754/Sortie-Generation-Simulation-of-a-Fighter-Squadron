/**
 * Mission lifecycle states.
 */

const MissionStatus = Object.freeze({
    SCHEDULED: "SCHEDULED",
    WAITING_FOR_RESOURCES: "WAITING_FOR_RESOURCES",
    READY: "READY",
    IN_PROGRESS: "IN_PROGRESS",
    COMPLETED: "COMPLETED",
    ABORTED: "ABORTED",
    CANCELLED: "CANCELLED"
});

module.exports = MissionStatus;