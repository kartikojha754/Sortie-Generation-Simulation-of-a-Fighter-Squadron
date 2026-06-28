const SimulationEvent = require("./SimulationEvent");

/**
 * EventFactory
 *
 * Responsible for creating SimulationEvent objects.
 * This avoids manually creating event objects throughout the simulation code.
 */
class EventFactory {

    /**
     * Creates a generic simulation event.
     *
     * @param {Object} data
     * @returns {SimulationEvent}
     */
    static createEvent(data = {}) {
        return new SimulationEvent({
            id: data.id || EventFactory.generateEventId(),
            type: data.type,
            time: data.time,
            entityId: data.entityId || null,
            payload: data.payload || {}
        });
    }

    /**
     * Generates a simple event ID.
     *
     * @returns {string}
     */
    static generateEventId() {
        return `EVT-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
    }
}

module.exports = EventFactory;