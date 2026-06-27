const { EventType } = require("../enums");

/**
 * Represents a sortie generated from a mission.
 * A sortie records the execution details of a mission.
 */
class Sortie {

    /**
     * @param {Object} data
     */
    constructor(data = {}) {

        this.id = data.id || null;

        // Mission associated with this sortie
        this.missionId = data.missionId || null;

        // Aircraft flown
        this.aircraftId = data.aircraftId || null;

        // Pilot flying
        this.pilotId = data.pilotId || null;

        // Actual timings
        this.takeoffTime = data.takeoffTime || null;

        this.landingTime = data.landingTime || null;

        // Events generated during sortie
        this.events = data.events || [];

        // Final outcome
        this.successful =
            data.successful !== undefined
                ? data.successful
                : false;
    }

    /**
     * Record takeoff.
     */
    recordTakeoff(time = new Date()) {
        this.takeoffTime = time;

        this.events.push({
            type: EventType.TAKEOFF,
            time
        });
    }

    /**
     * Record landing.
     */
    recordLanding(time = new Date()) {
        this.landingTime = time;

        this.events.push({
            type: EventType.LANDING,
            time
        });
    }

    /**
     * Record any simulation event.
     */
    addEvent(type, details = {}) {

        this.events.push({
            type,
            time: new Date(),
            details
        });
    }

    /**
     * Mark sortie successful.
     */
    markSuccessful() {
        this.successful = true;
    }

    /**
     * Returns sortie duration in minutes.
     */
    getDuration() {

        if (!this.takeoffTime || !this.landingTime)
            return null;

        return (
            (this.landingTime - this.takeoffTime) /
            (1000 * 60)
        );
    }

    /**
     * JSON representation.
     */
    toJSON() {
        return {
            id: this.id,
            missionId: this.missionId,
            aircraftId: this.aircraftId,
            pilotId: this.pilotId,
            takeoffTime: this.takeoffTime,
            landingTime: this.landingTime,
            successful: this.successful,
            duration: this.getDuration(),
            events: this.events
        };
    }
}

module.exports = Sortie;