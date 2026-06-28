const SimulationClock = require("./SimulationClock");
const EventQueue = require("./EventQueue");
const EventProcessor = require("./EventProcessor");

/**
 * SimulationEngine
 *
 * Coordinates the entire simulation.
 */
class SimulationEngine {

    constructor() {

        this.clock = new SimulationClock();

        this.eventQueue = new EventQueue();

        this.eventProcessor = new EventProcessor();

        this.isRunning = false;
    }

    /**
     * Adds an event to the simulation.
     *
     * @param {SimulationEvent} event
     */
    scheduleEvent(event) {
        this.eventQueue.enqueue(event);
    }

    /**
     * Registers an event handler.
     */
    registerHandler(type, handler) {
        this.eventProcessor.registerHandler(type, handler);
    }

    /**
     * Runs the simulation.
     */
    run(context = {}) {

        this.isRunning = true;

        while (
            this.isRunning &&
            !this.eventQueue.isEmpty()
        ) {

            const event =
                this.eventQueue.dequeue();

            this.clock.advanceTo(event.time);

            this.eventProcessor.process(
                event,
                context
            );
        }
    }

    /**
     * Stops simulation.
     */
    stop() {
        this.isRunning = false;
    }

    /**
     * Resets simulation.
     */
    reset() {

        this.clock.reset();

        this.eventQueue.clear();

        this.eventProcessor.clearHandlers();

        this.isRunning = false;
    }

    /**
     * Current simulation time.
     */
    getCurrentTime() {
        return this.clock.getCurrentTime();
    }
}

module.exports = SimulationEngine;