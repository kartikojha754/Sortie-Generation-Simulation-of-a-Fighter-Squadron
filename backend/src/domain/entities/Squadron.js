/**
 * Represents a fighter squadron.
 * A squadron owns all resources required for sortie generation.
 */

class Squadron {

    /**
     * @param {Object} data
     */
    constructor(data = {}) {

        this.id = data.id || null;

        this.name =
            data.name || "Fighter Squadron";

        this.aircraft =
            data.aircraft || [];

        this.pilots =
            data.pilots || [];

        this.groundCrew =
            data.groundCrew || [];

        this.runways =
            data.runways || [];

        this.maintenanceRecords =
            data.maintenanceRecords || [];

        this.weather =
            data.weather || null;

        this.weaponInventory = data.weaponInventory || {};
        this.weaponInventorySummary = data.weaponInventorySummary || null;
    }

    /**
     * Add aircraft.
     */
    addAircraft(aircraft) {
        this.aircraft.push(aircraft);
    }

    /**
     * Add pilot.
     */
    addPilot(pilot) {
        this.pilots.push(pilot);
    }

    /**
     * Add ground crew.
     */
    addGroundCrew(member) {
        this.groundCrew.push(member);
    }

    /**
     * Add runway.
     */
    addRunway(runway) {
        this.runways.push(runway);
    }

    /**
     * Add maintenance record.
     */
    addMaintenanceRecord(record) {
        this.maintenanceRecords.push(record);
    }

    /**
     * Update weather.
     */
    setWeather(weather) {
        this.weather = weather;
    }

    /**
     * Returns all available aircraft.
     */
    getAvailableAircraft() {
        return this.aircraft.filter(a => a.isAvailable());
    }

    /**
     * Returns all available pilots.
     */
    getAvailablePilots() {
        return this.pilots.filter(p => p.isAvailable());
    }

    /**
     * Returns all available ground crew.
     */
    getAvailableGroundCrew() {
        return this.groundCrew.filter(c => c.available());
    }

    /**
     * Returns all available runways.
     */
    getAvailableRunways() {
        return this.runways.filter(r => r.isRunwayAvailable());
    }

    /**
     * JSON representation.
     */
    toJSON() {
        return {
            id: this.id,
            name: this.name,
            aircraft: this.aircraft,
            pilots: this.pilots,
            groundCrew: this.groundCrew,
            runways: this.runways,
            maintenanceRecords: this.maintenanceRecords,
            weather: this.weather,
            weaponInventory: this.weaponInventory,
            weaponInventorySummary: this.weaponInventorySummary
        };
    }
}

module.exports = Squadron;