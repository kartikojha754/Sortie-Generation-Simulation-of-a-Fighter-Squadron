const { EventType } = require("../../domain").enums;

/**
 * Represents a single event in the simulation.
 */
class SimulationEvent {

    /**
     * @param {Object} data
     */
    constructor(data = {}) {

        this.id =
            data.id || null;

        // Event type
        this.type =
            data.type || EventType.MISSION_CREATED;

        // Simulation time when event occurs
        this.time =
            data.time || 0;

        // Entity associated with this event
        // (Mission, Aircraft, Pilot, etc.)
        this.entityId =
            data.entityId || null;

        // Optional payload
        this.payload =
            data.payload || {};
    }

    /**
     * Returns true if event occurs before another.
     *
     * @param {SimulationEvent} event
     */
    occursBefore(event) {
        return this.time < event.time;
    }

    /**
     * Returns true if event occurs after another.
     *
     * @param {SimulationEvent} event
     */
    occursAfter(event) {
        return this.time > event.time;
    }

    /**
     * JSON representation.
     */
    toJSON() {

        return {
            id: this.id,
            type: this.type,
            time: this.time,
            entityId: this.entityId,
            payload: this.payload
        };
    }
}

module.exports = SimulationEvent;