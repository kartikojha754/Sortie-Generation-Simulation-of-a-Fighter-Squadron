const { WeatherCondition } = require("../enums");

/**
 * Represents the weather conditions for a simulation.
 * Weather affects whether sorties can be executed safely.
 */
class Weather {
    /**
     * @param {Object} data
     */
    constructor(data = {}) {

        this.id = data.id || null;

        // Current weather condition
        this.condition =
            data.condition || WeatherCondition.CLEAR;

        // Visibility in kilometers
        this.visibility =
            data.visibility ?? 10;

        // Wind speed in km/h
        this.windSpeed =
            data.windSpeed ?? 5;

        // Whether flying is currently allowed
        this.isFlyable =
            data.isFlyable !== undefined
                ? data.isFlyable
                : true;
    }

    /**
     * Returns true if aircraft are allowed to fly.
     */
    canFly() {
        return this.isFlyable;
    }

    /**
     * Updates weather condition.
     */
    updateCondition(condition) {
        this.condition = condition;
    }

    /**
     * Updates visibility.
     */
    updateVisibility(visibility) {

        if (visibility < 0) {
            throw new Error("Visibility cannot be negative.");
        }

        this.visibility = visibility;
    }

    /**
     * Updates wind speed.
     */
    updateWindSpeed(speed) {

        if (speed < 0) {
            throw new Error("Wind speed cannot be negative.");
        }

        this.windSpeed = speed;
    }

    /**
     * Enables or disables flying.
     */
    setFlyable(isFlyable) {
        this.isFlyable = isFlyable;
    }

    /**
     * Returns JSON representation.
     */
    toJSON() {
        return {
            id: this.id,
            condition: this.condition,
            visibility: this.visibility,
            windSpeed: this.windSpeed,
            isFlyable: this.isFlyable
        };
    }
}

module.exports = Weather;