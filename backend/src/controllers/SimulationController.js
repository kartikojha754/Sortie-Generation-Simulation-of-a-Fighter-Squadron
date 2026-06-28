const SimulationService = require("../services/SimulationService");
const createSampleScenario = require("../data/sampleScenario");

class SimulationController {
    static runSampleSimulation(req, res) {
        try {
            const simulationService = new SimulationService();

            const sampleInput = createSampleScenario();

            const result =
                simulationService.runSimulation(sampleInput);

            return res.status(200).json({
                success: true,
                message: "Simulation completed successfully.",
                data: result
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "Simulation failed.",
                error: error.message
            });
        }
    }
}

module.exports = SimulationController;