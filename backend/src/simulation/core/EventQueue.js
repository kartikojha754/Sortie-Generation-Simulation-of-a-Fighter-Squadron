/**
 * EventQueue
 *
 * Stores simulation events in chronological order.
 * The earliest event is always processed first.
 */

class EventQueue {
    constructor() {
        this.events = [];
    }

    /**
     * Adds a new event and keeps the queue sorted by time.
     *
     * @param {SimulationEvent} event
     */
    enqueue(event) {
        if (!event || typeof event.time !== "number") {
            throw new Error("Invalid simulation event.");
        }

        this.events.push(event);

        this.events.sort((a, b) => a.time - b.time);
    }

    /**
     * Removes and returns the earliest event.
     *
     * @returns {SimulationEvent|null}
     */
    dequeue() {
        if (this.isEmpty()) {
            return null;
        }

        return this.events.shift();
    }

    /**
     * Returns the earliest event without removing it.
     *
     * @returns {SimulationEvent|null}
     */
    peek() {
        if (this.isEmpty()) {
            return null;
        }

        return this.events[0];
    }

    /**
     * Returns true if no events remain.
     *
     * @returns {boolean}
     */
    isEmpty() {
        return this.events.length === 0;
    }

    /**
     * Returns number of pending events.
     *
     * @returns {number}
     */
    size() {
        return this.events.length;
    }

    /**
     * Clears all events.
     */
    clear() {
        this.events = [];
    }

    /**
     * JSON representation.
     */
    toJSON() {
        return {
            size: this.size(),
            events: this.events
        };
    }
}

module.exports = EventQueue;