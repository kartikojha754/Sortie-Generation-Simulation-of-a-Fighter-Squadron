import { useNavigate } from "react-router-dom";
import Card from "../common/Card";
import Button from "../common/Button";
import { useScenario } from "../../context/ScenarioContext";
import { useSimulation } from "../../context/SimulationContext";
import { prepareSimulationPayload } from "../../services/simulationService";

export default function RunSimulationPanel() {
  const navigate = useNavigate();
  const { scenario, resetScenario } = useScenario();
  const { executeSimulation, loading, error } = useSimulation();

  const payload = prepareSimulationPayload(scenario);
  const customMissionCount = payload.missionRequests?.length || 0;
  const totalPilots = payload.pilotCount || 0;

  async function handleRunSimulation() {
    try {
      await executeSimulation(scenario);
      navigate("/simulation");
    } catch (err) {
      console.error(err.message);
    }
  }

  return (
    <Card className="border-green-500/30 bg-green-500/5">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-green-400">
            Execute
          </p>

          <h3 className="mt-1 text-xl font-semibold text-slate-100">
            Scenario Ready for Simulation
          </h3>

          <p className="mt-2 text-sm text-slate-400">
            {totalPilots} pilots, {payload.aircraftCount} aircraft,{" "}
            {payload.groundCrewCount} ground crew, {payload.runwayCount} runways
            configured.
          </p>

          <p className="mt-1 text-xs text-slate-500">
            {customMissionCount > 0
              ? `${customMissionCount} custom mission request(s) will be sent to backend.`
              : `${payload.missionCount} auto-generated mission(s) will be requested.`}
          </p>

          {error && <p className="mt-2 text-sm text-red-400">{error}</p>}
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Button
            variant="secondary"
            onClick={resetScenario}
            disabled={loading}
          >
            Reset Scenario
          </Button>

          <Button onClick={handleRunSimulation} disabled={loading}>
            {loading ? "Running..." : "Run Simulation"}
          </Button>
        </div>
      </div>
    </Card>
  );
}
