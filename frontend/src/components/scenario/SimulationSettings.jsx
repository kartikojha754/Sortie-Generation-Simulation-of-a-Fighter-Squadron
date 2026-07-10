import Card from "../common/Card";
import Input from "../common/Input";
import Toggle from "../common/Toggle";
import { useScenario } from "../../context/ScenarioContext";

export default function SimulationSettings() {
  const { scenario, updateScenarioField } = useScenario();

  function handleDurationChange(value) {
    const minutes = Number(value);
    if (Number.isNaN(minutes)) return;

    updateScenarioField("simulationDuration", Math.max(1, minutes));
  }

  return (
    <Card>
      <div className="mb-5">
        <p className="text-xs uppercase tracking-[0.25em] text-green-400">
          Behaviour
        </p>

        <h3 className="mt-1 text-lg font-semibold text-slate-100">
          Simulation Behaviour
        </h3>

        <p className="mt-1 text-sm text-slate-500">
          Configure how the backend simulation should generate and process
          missions.
        </p>
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        <Input
          type="number"
          min="1"
          label="Simulation Duration (minutes)"
          helperText="Currently stored in scenario. Full engine cutoff can be added later."
          value={scenario.simulationDuration}
          onChange={(e) => handleDurationChange(e.target.value)}
        />

        <Toggle
          label="Mission Assignment Strategy"
          description="Fixed uses your custom queue or default training missions. Random generates mission type, priority, arrival time, pilot rating, and duration."
          checked={scenario.randomScheduling}
          activeLabel="FULL RANDOM"
          inactiveLabel="FIXED / CUSTOM"
          onChange={(value) => updateScenarioField("randomScheduling", value)}
        />

        <Toggle
          label="Mission Planning Phase"
          description="Controls whether mission planning phase is enabled."
          checked={scenario.missionPlanningEnabled}
          activeLabel="ENABLED"
          inactiveLabel="DISABLED"
          onChange={(value) =>
            updateScenarioField("missionPlanningEnabled", value)
          }
        />
      </div>
    </Card>
  );
}
