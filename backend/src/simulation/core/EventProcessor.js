/**
 * EventProcessor
 *
 * Processes simulation events by calling the correct handler
 * based on the event type.
 */

class EventProcessor {
    constructor() {
        this.handlers = {};
    }

    /**
     * Registers a handler function for an event type.
     *
     * @param {string} eventType
     * @param {Function} handler
     */
    registerHandler(eventType, handler) {
        if (!eventType) {
            throw new Error("Event type is required.");
        }

        if (typeof handler !== "function") {
            throw new Error("Handler must be a function.");
        }

        this.handlers[eventType] = handler;
    }

    /**
     * Processes a simulation event.
     *
     * @param {SimulationEvent} event
     * @param {Object} context
     */
    process(event, context = {}) {
        if (!event || !event.type) {
            throw new Error("Invalid event.");
        }

        const handler = this.handlers[event.type];

        if (!handler) {
            return null;
        }

        return handler(event, context);
    }

    /**
     * Checks whether a handler exists for an event type.
     *
     * @param {string} eventType
     * @returns {boolean}
     */
    hasHandler(eventType) {
        return Boolean(this.handlers[eventType]);
    }

    /**
     * Clears all registered handlers.
     */
    clearHandlers() {
        this.handlers = {};
    }
}

module.exports = EventProcessor;