const { EventType } = require("../../domain").enums;

class AbortHandler {
  checkAbort(scenario = {}) {
    const weatherAbortRate =
      scenario.effectiveWeatherAbortRate ?? scenario.weatherAbortRate ?? 0;

    if (this.didAbort(weatherAbortRate)) {
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
