const { WeatherCondition } = require("../../domain").enums;

const BASE_WEATHER_RISK = {
  [WeatherCondition.CLEAR]: 0.02,
  [WeatherCondition.CLOUDY]: 0.05,
  [WeatherCondition.RAIN]: 0.12,
  [WeatherCondition.FOG]: 0.18,
  [WeatherCondition.SNOW]: 0.25,
  [WeatherCondition.HIGH_WIND]: 0.3,
  [WeatherCondition.STORM]: 0.4,
};

class WeatherRiskEvaluator {
  evaluate(weatherInput = {}, manualWeatherAbortRate = 0) {
    const condition = weatherInput.condition || WeatherCondition.CLEAR;
    const visibility = Number(weatherInput.visibility ?? 10);
    const windSpeed = Number(weatherInput.windSpeed ?? 5);

    const baseRisk = BASE_WEATHER_RISK[condition] ?? 0.05;
    const visibilityRisk = this.getVisibilityRisk(visibility);
    const windRisk = this.getWindRisk(windSpeed);

    const derivedWeatherAbortRate = this.clamp(
      baseRisk + visibilityRisk + windRisk,
      0,
      0.85,
    );

    const effectiveWeatherAbortRate = this.clamp(
      derivedWeatherAbortRate + Number(manualWeatherAbortRate || 0),
      0,
      0.95,
    );

    return {
      condition,
      visibility,
      windSpeed,
      baseRisk,
      visibilityRisk,
      windRisk,
      manualWeatherAbortRate: Number(manualWeatherAbortRate || 0),
      derivedWeatherAbortRate,
      effectiveWeatherAbortRate,
      riskLevel: this.getRiskLevel(effectiveWeatherAbortRate),
      riskReason: this.getRiskReason(
        condition,
        visibility,
        windSpeed,
        effectiveWeatherAbortRate,
      ),
      isFlyable: effectiveWeatherAbortRate < 0.85,
    };
  }

  getVisibilityRisk(visibility) {
    if (visibility >= 8) return 0;
    if (visibility >= 5) return 0.05;
    if (visibility >= 2) return 0.15;
    return 0.3;
  }

  getWindRisk(windSpeed) {
    if (windSpeed <= 10) return 0;
    if (windSpeed <= 20) return 0.05;
    if (windSpeed <= 35) return 0.15;
    return 0.3;
  }

  getRiskLevel(rate) {
    if (rate < 0.15) return "LOW";
    if (rate < 0.35) return "MODERATE";
    if (rate < 0.6) return "HIGH";
    return "SEVERE";
  }

  getRiskReason(condition, visibility, windSpeed, rate) {
    return `${condition} conditions with ${visibility} km visibility and ${windSpeed} wind speed produce a ${Math.round(
      rate * 100,
    )}% effective weather abort risk.`;
  }

  clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
  }
}

module.exports = WeatherRiskEvaluator;
