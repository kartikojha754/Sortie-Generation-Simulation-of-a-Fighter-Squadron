/**
 * SimulationClock
 *
 * Maintains the current simulation time.
 * Used by the Simulation Engine to advance time
 * from one event to another.
 */

class SimulationClock {

    /**
     * @param {number} startTime
     */
    constructor(startTime = 0) {
        this.currentTime = startTime;
    }

    /**
     * Returns current simulation time.
     *
     * @returns {number}
     */
    getCurrentTime() {
        return this.currentTime;
    }

    /**
     * Advances simulation time.
     *
     * @param {number} newTime
     */
    advanceTo(newTime) {

        if (newTime < this.currentTime) {
            throw new Error(
                "Simulation time cannot move backwards."
            );
        }

        this.currentTime = newTime;
    }

    /**
     * Advances simulation by a given amount.
     *
     * @param {number} deltaTime
     */
    tick(deltaTime) {

        if (deltaTime < 0) {
            throw new Error(
                "Delta time cannot be negative."
            );
        }

        this.currentTime += deltaTime;
    }

    /**
     * Reset simulation time.
     *
     * @param {number} startTime
     */
    reset(startTime = 0) {
        this.currentTime = startTime;
    }

    /**
     * Returns current clock state.
     */
    toJSON() {
        return {
            currentTime: this.currentTime
        };
    }
}

module.exports = SimulationClock;