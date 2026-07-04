const { WeatherCondition } = require("../enums");

class Weather {
  constructor(data = {}) {
    this.id = data.id || null;
    this.condition = data.condition || WeatherCondition.CLEAR;
    this.visibility = data.visibility ?? 10;
    this.windSpeed = data.windSpeed ?? 5;

    this.isFlyable = data.isFlyable !== undefined ? data.isFlyable : true;

    this.baseRisk = data.baseRisk ?? 0;
    this.visibilityRisk = data.visibilityRisk ?? 0;
    this.windRisk = data.windRisk ?? 0;
    this.manualWeatherAbortRate = data.manualWeatherAbortRate ?? 0;
    this.derivedWeatherAbortRate = data.derivedWeatherAbortRate ?? 0;
    this.effectiveWeatherAbortRate = data.effectiveWeatherAbortRate ?? 0;
    this.riskLevel = data.riskLevel || "LOW";
    this.riskReason = data.riskReason || "";
  }

  canFly() {
    return this.isFlyable;
  }

  updateCondition(condition) {
    this.condition = condition;
  }

  updateVisibility(visibility) {
    if (visibility < 0) {
      throw new Error("Visibility cannot be negative.");
    }

    this.visibility = visibility;
  }

  updateWindSpeed(speed) {
    if (speed < 0) {
      throw new Error("Wind speed cannot be negative.");
    }

    this.windSpeed = speed;
  }

  setFlyable(isFlyable) {
    this.isFlyable = isFlyable;
  }

  toJSON() {
    return {
      id: this.id,
      condition: this.condition,
      visibility: this.visibility,
      windSpeed: this.windSpeed,
      isFlyable: this.isFlyable,

      baseRisk: this.baseRisk,
      visibilityRisk: this.visibilityRisk,
      windRisk: this.windRisk,
      manualWeatherAbortRate: this.manualWeatherAbortRate,
      derivedWeatherAbortRate: this.derivedWeatherAbortRate,
      effectiveWeatherAbortRate: this.effectiveWeatherAbortRate,
      riskLevel: this.riskLevel,
      riskReason: this.riskReason,
    };
  }
}

module.exports = Weather;
