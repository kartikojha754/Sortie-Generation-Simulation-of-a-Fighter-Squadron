import { useNavigate } from "react-router-dom";
import { FiPlayCircle, FiRotateCcw, FiSave } from "react-icons/fi";

import Button from "../common/Button";

import { useScenario } from "../../context/ScenarioContext";
import { useSimulation } from "../../context/SimulationContext";
import { simulationService } from "../../services/simulationService";

const ScenarioActions = () => {
  const navigate = useNavigate();

  const { scenario, resetScenario } = useScenario();

  const {
    setSimulationResult,
    setLatestSummary,
    setIsSimulationRunning,
    setSimulationError,
  } = useSimulation();

  const handleSaveScenario = () => {
    console.log("Saved scenario:", scenario);
  };

  const handleRunSimulation = async () => {
    try {
      setIsSimulationRunning(true);
      setSimulationError(null);

      const response = await simulationService.runScenario(scenario);

      setSimulationResult(response.data);
      setLatestSummary(response.data?.statistics || null);

      navigate("/");
    } catch (error) {
      setSimulationError(
        error?.response?.data?.message || error.message || "Simulation failed.",
      );
    } finally {
      setIsSimulationRunning(false);
    }
  };

  return (
    <div className="sticky bottom-4 z-20 rounded-2xl border border-slate-800 bg-slate-950/90 p-5 shadow-2xl backdrop-blur">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm font-semibold text-white">
            Scenario configuration ready
          </p>

          <p className="mt-1 text-sm text-slate-400">
            Save this scenario, reset the configuration, or run it in the
            simulation engine.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <Button variant="secondary" onClick={resetScenario}>
            <FiRotateCcw className="mr-2" />
            Reset
          </Button>

          <Button variant="secondary" onClick={handleSaveScenario}>
            <FiSave className="mr-2" />
            Save Scenario
          </Button>

          <Button onClick={handleRunSimulation}>
            <FiPlayCircle className="mr-2" />
            Run Simulation
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ScenarioActions;
