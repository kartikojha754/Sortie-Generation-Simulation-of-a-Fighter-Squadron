const { EventType } = require("../../domain").enums;

/**
 * Handles probabilistic abort decisions.
 */
class AbortHandler {
    checkAbort(scenario = {}) {
        if (this.didAbort(scenario.weatherAbortRate)) {
            return EventType.WEATHER_ABORT;
        }

        if (this.didAbort(scenario.groundAbortRate)) {
            return EventType.GROUND_ABORT;
        }

        if (this.didAbort(scenario.airAbortRate)) {
            return EventType.AIR_ABORT;
        }

        return null;
    }

    didAbort(rate = 0) {
        if (rate <= 0) return false;
        if (rate >= 1) return true;

        return Math.random() < rate;
    }
}

module.exports = AbortHandler;