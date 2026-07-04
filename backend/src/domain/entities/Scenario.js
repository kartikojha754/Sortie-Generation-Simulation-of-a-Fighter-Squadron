class Scenario {
  constructor(data = {}) {
    this.id = data.id || null;
    this.name = data.name || "";
    this.description = data.description || "";

    this.groundAbortRate = data.groundAbortRate || 0;
    this.airAbortRate = data.airAbortRate || 0;

    this.weatherAbortRate = data.weatherAbortRate || 0;
    this.manualWeatherAbortRate = data.manualWeatherAbortRate || 0;
    this.derivedWeatherAbortRate = data.derivedWeatherAbortRate || 0;
    this.effectiveWeatherAbortRate =
      data.effectiveWeatherAbortRate ?? this.weatherAbortRate;

    this.weatherRiskLevel = data.weatherRiskLevel || "LOW";
    this.weatherRiskReason = data.weatherRiskReason || "";

    this.availableAircraft = data.availableAircraft || 0;
    this.availablePilots = data.availablePilots || 0;
    this.availableGroundCrew = data.availableGroundCrew || 0;
    this.availableRunways = data.availableRunways || 0;

    this.randomScheduling = data.randomScheduling || false;

    this.missionPlanningEnabled =
      data.missionPlanningEnabled !== undefined
        ? data.missionPlanningEnabled
        : true;

    this.simulationDuration = data.simulationDuration || 1440;

    this.missionRequests = data.missionRequests || [];
    this.pilotLevels = data.pilotLevels || {};
  }

  enableRandomScheduling() {
    this.randomScheduling = true;
  }

  disableRandomScheduling() {
    this.randomScheduling = false;
  }

  enableMissionPlanning() {
    this.missionPlanningEnabled = true;
  }

  disableMissionPlanning() {
    this.missionPlanningEnabled = false;
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      description: this.description,

      groundAbortRate: this.groundAbortRate,
      airAbortRate: this.airAbortRate,

      weatherAbortRate: this.weatherAbortRate,
      manualWeatherAbortRate: this.manualWeatherAbortRate,
      derivedWeatherAbortRate: this.derivedWeatherAbortRate,
      effectiveWeatherAbortRate: this.effectiveWeatherAbortRate,
      weatherRiskLevel: this.weatherRiskLevel,
      weatherRiskReason: this.weatherRiskReason,

      availableAircraft: this.availableAircraft,
      availablePilots: this.availablePilots,
      availableGroundCrew: this.availableGroundCrew,
      availableRunways: this.availableRunways,

      randomScheduling: this.randomScheduling,
      missionPlanningEnabled: this.missionPlanningEnabled,
      simulationDuration: this.simulationDuration,

      missionRequests: this.missionRequests,
      pilotLevels: this.pilotLevels,
    };
  }
}

module.exports = Scenario;
