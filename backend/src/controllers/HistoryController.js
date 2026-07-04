const SimulationRepository = require("../repositories/SimulationRepository");

class HistoryController {
  static async getSimulationHistory(req, res) {
    try {
      const simulations = await SimulationRepository.getAllSimulations();

      return res.status(200).json({
        success: true,
        message: "Simulation history fetched successfully.",
        data: simulations,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Failed to fetch simulation history.",
        error: error.message,
      });
    }
  }

  static async getSimulationById(req, res) {
    try {
      const simulation = await SimulationRepository.getSimulationById(
        req.params.id,
      );

      if (!simulation) {
        return res.status(404).json({
          success: false,
          message: "Simulation history record not found.",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Simulation history record fetched successfully.",
        data: simulation,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Failed to fetch simulation history record.",
        error: error.message,
      });
    }
  }

  static async deleteSimulationById(req, res) {
    try {
      const deleted = await SimulationRepository.deleteSimulationById(
        req.params.id,
      );

      if (!deleted) {
        return res.status(404).json({
          success: false,
          message: "Simulation history record not found.",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Simulation history record deleted successfully.",
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Failed to delete simulation history record.",
        error: error.message,
      });
    }
  }
}

module.exports = HistoryController;
