import { MdPlayArrow, MdTune } from "react-icons/md";

import Button from "../common/Button";
import Card from "../common/Card";
import Input from "../common/Input";
import Select from "../common/Select";
import Toggle from "../common/Toggle";

function ScenarioBuilderPanel({
  formData,
  onChange,
  onRunSimulation,
  isLoading,
}) {
  const weatherOptions = [
    { label: "Clear", value: "CLEAR" },
    { label: "Cloudy", value: "CLOUDY" },
    { label: "Rainy", value: "RAINY" },
    { label: "Stormy", value: "STORMY" },
  ];

  return (
    <Card className="space-y-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-sky-400">
          Builder
        </p>
        <h3 className="mt-1 text-xl font-bold text-white">Scenario Builder</h3>
        <p className="mt-1 text-sm text-slate-400">
          Configure the squadron, environment, and simulation rules before
          running.
        </p>
      </div>

      <BuilderSection title="Mission Configuration">
        <Input
          label="Mission Count"
          name="missionCount"
          type="number"
          min="1"
          value={formData.missionCount}
          onChange={onChange}
        />

        <Input
          label="Simulation Duration"
          name="simulationDuration"
          type="number"
          min="60"
          step="60"
          value={formData.simulationDuration}
          onChange={onChange}
        />
      </BuilderSection>

      <BuilderSection title="Squadron Resources">
        <Input
          label="Aircraft Count"
          name="aircraftCount"
          type="number"
          min="1"
          value={formData.aircraftCount}
          onChange={onChange}
        />

        <Input
          label="Pilot Count"
          name="pilotCount"
          type="number"
          min="1"
          value={formData.pilotCount}
          onChange={onChange}
        />

        <Input
          label="Ground Crew Count"
          name="groundCrewCount"
          type="number"
          min="1"
          value={formData.groundCrewCount}
          onChange={onChange}
        />

        <Input
          label="Runway Count"
          name="runwayCount"
          type="number"
          min="1"
          value={formData.runwayCount}
          onChange={onChange}
        />
      </BuilderSection>

      <BuilderSection title="Environment & Abort Rates">
        <Select
          label="Weather Condition"
          name="weatherCondition"
          value={formData.weatherCondition}
          onChange={onChange}
          options={weatherOptions}
        />

        <Input
          label="Ground Abort Rate"
          name="groundAbortRate"
          type="number"
          min="0"
          max="1"
          step="0.01"
          value={formData.groundAbortRate}
          onChange={onChange}
        />

        <Input
          label="Air Abort Rate"
          name="airAbortRate"
          type="number"
          min="0"
          max="1"
          step="0.01"
          value={formData.airAbortRate}
          onChange={onChange}
        />

        <Input
          label="Weather Abort Rate"
          name="weatherAbortRate"
          type="number"
          min="0"
          max="1"
          step="0.01"
          value={formData.weatherAbortRate}
          onChange={onChange}
        />
      </BuilderSection>

      <BuilderSection title="Simulation Rules">
        <Toggle
          label="Mission Planning"
          name="missionPlanningEnabled"
          checked={formData.missionPlanningEnabled}
          onChange={onChange}
          description="Include mission planning time before takeoff."
        />

        <Toggle
          label="Random Scheduling"
          name="randomScheduling"
          checked={formData.randomScheduling}
          onChange={onChange}
          description="Allow mission timing to vary during simulation."
        />
      </BuilderSection>

      <div className="flex justify-end border-t border-slate-800 pt-6">
        <Button
          size="lg"
          icon={<MdPlayArrow />}
          onClick={onRunSimulation}
          disabled={isLoading}
        >
          {isLoading ? "Running Simulation..." : "Run Simulation"}
        </Button>
      </div>
    </Card>
  );
}

function BuilderSection({ title, children }) {
  return (
    <div>
      <div className="mb-4 flex items-center gap-2">
        <MdTune className="text-sky-400" />
        <h4 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-300">
          {title}
        </h4>
      </div>

      <div className="grid gap-4 md:grid-cols-2">{children}</div>
    </div>
  );
}

export default ScenarioBuilderPanel;
