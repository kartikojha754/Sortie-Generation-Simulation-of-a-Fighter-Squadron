const {
    MissionStatus,
    MissionPriority,
    MissionType
} = require("../enums");

/**
 * Represents a mission assigned to one or more aircraft and pilots.
 * A mission is the core operational unit of the simulation.
 */
class Mission {

    /**
     * @param {Object} data
     */
    constructor(data = {}) {

        this.id = data.id || null;

        this.name = data.name || "";

        this.type =
            data.type || MissionType.TRAINING;

        this.priority =
            data.priority || MissionPriority.MEDIUM;

        this.status =
            data.status || MissionStatus.SCHEDULED;

        // Resources assigned
        this.aircraftIds =
            data.aircraftIds || [];

        this.pilotIds =
            data.pilotIds || [];

        this.groundCrewIds =
            data.groundCrewIds || [];

        this.runwayId =
            data.runwayId || null;

        // Mission timing
        this.scheduledStartTime =
            data.scheduledStartTime || null;

        this.actualStartTime =
            data.actualStartTime || null;

        this.endTime =
            data.endTime || null;

        // Mission outcome
        this.abortReason =
            data.abortReason || null;

        this.isCompleted =
            data.isCompleted || false;
    }

    /**
     * Assign an aircraft.
     */
    assignAircraft(aircraftId) {

        if (!this.aircraftIds.includes(aircraftId)) {
            this.aircraftIds.push(aircraftId);
        }
    }

    /**
     * Assign a pilot.
     */
    assignPilot(pilotId) {

        if (!this.pilotIds.includes(pilotId)) {
            this.pilotIds.push(pilotId);
        }
    }

    /**
     * Assign a ground crew member.
     */
    assignGroundCrew(crewId) {

        if (!this.groundCrewIds.includes(crewId)) {
            this.groundCrewIds.push(crewId);
        }
    }

    /**
     * Assign runway.
     */
    assignRunway(runwayId) {
        this.runwayId = runwayId;
    }

    /**
     * Mission becomes ready.
     */
    markReady() {
        this.status = MissionStatus.READY;
    }

    /**
     * Mission starts.
     */
    start(startTime = new Date()) {

        this.status = MissionStatus.IN_PROGRESS;
        this.actualStartTime = startTime;
    }

    /**
     * Mission completes.
     */
    complete(endTime = new Date()) {

        this.status = MissionStatus.COMPLETED;
        this.endTime = endTime;
        this.isCompleted = true;
    }

    /**
     * Abort mission.
     */
    abort(reason) {

        this.status = MissionStatus.ABORTED;
        this.abortReason = reason;
    }

    /**
     * Returns true if mission has started.
     */
    isInProgress() {
        return this.status === MissionStatus.IN_PROGRESS;
    }

    /**
     * Returns true if mission is completed.
     */
    hasCompleted() {
        return this.isCompleted;
    }

    /**
     * Returns JSON representation.
     */
    toJSON() {

        return {
            id: this.id,
            name: this.name,
            type: this.type,
            priority: this.priority,
            status: this.status,

            aircraftIds: this.aircraftIds,
            pilotIds: this.pilotIds,
            groundCrewIds: this.groundCrewIds,

            runwayId: this.runwayId,

            scheduledStartTime: this.scheduledStartTime,
            actualStartTime: this.actualStartTime,
            endTime: this.endTime,

            abortReason: this.abortReason,
            isCompleted: this.isCompleted
        };
    }
}

module.exports = Mission;