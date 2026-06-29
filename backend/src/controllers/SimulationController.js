const SimulationService = require("../services/SimulationService");
const createSampleScenario = require("../data/sampleScenario");
const createCustomScenario = require("../data/customScenario");

class SimulationController {
  static runSampleSimulation(req, res) {
    try {
      const simulationService = new SimulationService();
      const sampleInput = createSampleScenario();
      const result = simulationService.runSimulation(sampleInput);

      return res.status(200).json({
        success: true,
        message: "Simulation completed successfully.",
        data: result,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Simulation failed.",
        error: error.message,
      });
    }
  }

  static runSampleSimulationSummary(req, res) {
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

  static runCustomSimulation(req, res) {
    try {
      const simulationService = new SimulationService();
      const customInput = createCustomScenario(req.body);
      const result = simulationService.runSimulation(customInput);

      return res.status(200).json({
        success: true,
        message: "Custom simulation completed successfully.",
        data: result,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Custom simulation failed.",
        error: error.message,
      });
    }
  }

  static runCustomSimulationSummary(req, res) {
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
}

module.exports = SimulationController;
