const SimulationHistory = require("../models/SimulationHistory");
const { isDBConnected } = require("../database/mongodb");

class SimulationRepository {
  static async saveSimulation({
    source = "custom",
    requestPayload = {},
    result,
  }) {
    if (!isDBConnected()) {
      throw new Error("Database is not connected.");
    }

    const simulationNumber = (await SimulationHistory.countDocuments()) + 1;

    const document = await SimulationHistory.create({
      simulationNumber,
      source,
      scenarioName: result.scenario?.name || "Unnamed Scenario",
      requestPayload,
      summary: this.buildSummary(result),
      result,
    });

    return document;
  }

  static async getAllSimulations() {
    if (!isDBConnected()) {
      throw new Error("Database is not connected.");
    }

    return SimulationHistory.find({})
      .select(
        "simulationNumber source scenarioName summary createdAt updatedAt",
      )
      .sort({ createdAt: -1 })
      .lean();
  }

  static async getSimulationById(id) {
    if (!isDBConnected()) {
      throw new Error("Database is not connected.");
    }

    return SimulationHistory.findById(id).lean();
  }

  static async deleteSimulationById(id) {
    if (!isDBConnected()) {
      throw new Error("Database is not connected.");
    }

    return SimulationHistory.findByIdAndDelete(id).lean();
  }

  static buildSummary(result) {
    const statistics = result.statistics || {};
    const scenario = result.scenario || {};
    const weather = result.finalSquadronState?.weather || {};

    return {
      totalMissions: statistics.totalMissions || 0,
      completedSorties: statistics.completedSorties || 0,
      abortedMissions: statistics.abortedMissions || 0,
      groundAborts: statistics.groundAborts || 0,
      airAborts: statistics.airAborts || 0,
      weatherAborts: statistics.weatherAborts || 0,
      successRate: statistics.successRate || 0,

      aircraftCount: scenario.availableAircraft || 0,
      pilotCount: scenario.availablePilots || 0,
      groundCrewCount: scenario.availableGroundCrew || 0,
      runwayCount: scenario.availableRunways || 0,

      weatherCondition: weather.condition || null,
      visibility: weather.visibility ?? null,
      windSpeed: weather.windSpeed ?? null,
      weatherRiskLevel: scenario.weatherRiskLevel || null,
      weatherAbortRate: scenario.weatherAbortRate || 0,

      missionCount: result.missions?.length || 0,
      sortieCount: result.sorties?.length || 0,
      maintenanceCount: result.maintenanceRecords?.length || 0,
      schedulerEventCount: result.schedulerLog?.length || 0,
    };
  }
}

module.exports = SimulationRepository;
