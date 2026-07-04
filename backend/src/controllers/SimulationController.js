const SimulationService = require("../services/SimulationService");
const createSampleScenario = require("../data/sampleScenario");
const createCustomScenario = require("../data/customScenario");
const SimulationRepository = require("../repositories/SimulationRepository");

class SimulationController {
  static async runSampleSimulation(req, res) {
    try {
      const simulationService = new SimulationService();
      const sampleInput = createSampleScenario();
      const result = simulationService.runSimulation(sampleInput);

      const saveInfo = await SimulationController.saveHistorySafely({
        source: "sample",
        requestPayload: {},
        result,
      });

      return res.status(200).json({
        success: true,
        message: "Simulation completed successfully.",
        history: saveInfo,
        data: {
          ...result,
          historyId: saveInfo.id || null,
        },
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Simulation failed.",
        error: error.message,
      });
    }
  }

  static async runSampleSimulationSummary(req, res) {
    try {
      const simulationService = new SimulationService();
      const sampleInput = createSampleScenario();
      const result = simulationService.runSimulation(sampleInput);

      return res.status(200).json({
        success: true,
        message: "Simulation summary generated successfully.",
        data: {
          scenarioName: result.scenario.name,
          totalMissions: result.statistics.totalMissions,
          completedSorties: result.statistics.completedSorties,
          abortedMissions: result.statistics.abortedMissions,
          groundAborts: result.statistics.groundAborts,
          airAborts: result.statistics.airAborts,
          weatherAborts: result.statistics.weatherAborts,
          successRate: result.statistics.successRate,
        },
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Simulation summary failed.",
        error: error.message,
      });
    }
  }

  static async runCustomSimulation(req, res) {
    try {
      const simulationService = new SimulationService();
      const customInput = createCustomScenario(req.body);
      const result = simulationService.runSimulation(customInput);

      const saveInfo = await SimulationController.saveHistorySafely({
        source: "custom",
        requestPayload: req.body,
        result,
      });

      return res.status(200).json({
        success: true,
        message: "Custom simulation completed successfully.",
        history: saveInfo,
        data: {
          ...result,
          historyId: saveInfo.id || null,
        },
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Custom simulation failed.",
        error: error.message,
      });
    }
  }

  static async runCustomSimulationSummary(req, res) {
    try {
      const simulationService = new SimulationService();
      const customInput = createCustomScenario(req.body);
      const result = simulationService.runSimulation(customInput);

      return res.status(200).json({
        success: true,
        message: "Custom simulation summary generated successfully.",
        data: {
          scenarioName: result.scenario.name,
          totalMissions: result.statistics.totalMissions,
          completedSorties: result.statistics.completedSorties,
          abortedMissions: result.statistics.abortedMissions,
          groundAborts: result.statistics.groundAborts,
          airAborts: result.statistics.airAborts,
          weatherAborts: result.statistics.weatherAborts,
          successRate: result.statistics.successRate,
        },
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Custom simulation summary failed.",
        error: error.message,
      });
    }
  }

  static async saveHistorySafely({ source, requestPayload, result }) {
    try {
      const saved = await SimulationRepository.saveSimulation({
        source,
        requestPayload,
        result,
      });

      return {
        saved: true,
        id: saved._id,
        simulationNumber: saved.simulationNumber,
        createdAt: saved.createdAt,
      };
    } catch (error) {
      return {
        saved: false,
        id: null,
        warning: error.message,
      };
    }
  }
}

module.exports = SimulationController;
