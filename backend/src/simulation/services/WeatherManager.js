/**
 * Handles weather checks during simulation.
 */
class WeatherManager {
    isWeatherFlyable(weather) {
        if (!weather) return true;

        return weather.canFly();
    }

    updateWeather(weather, condition, visibility, windSpeed) {
        if (!weather) {
            throw new Error("Weather object is required.");
        }

        if (condition) {
            weather.updateCondition(condition);
        }

        if (visibility !== undefined) {
            weather.updateVisibility(visibility);
        }

        if (windSpeed !== undefined) {
            weather.updateWindSpeed(windSpeed);
        }

        return weather;
    }
}

module.exports = WeatherManager;