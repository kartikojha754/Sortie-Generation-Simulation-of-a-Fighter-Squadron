import { useState } from "react";
import Card from "../common/Card";
import Button from "../common/Button";
import { useScenario } from "../../context/ScenarioContext";

function formatPercent(value) {
  return `${Math.round(value * 100)}%`;
}

function formatDuration(minutes) {
  if (minutes < 60) return `${minutes} min`;
  return `${Math.round((minutes / 60) * 10) / 10} hrs`;
}

export default function ScenarioPreview() {
  const { scenario } = useScenario();
  const [showJson, setShowJson] = useState(false);

  return (
    <Card>
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-green-400">
            Mission Brief
          </p>
          <h3 className="mt-1 text-lg font-semibold text-slate-100">
            Scenario Preview
          </h3>
          <p className="mt-1 text-sm text-slate-500">
            Review the backend-ready scenario before execution.
          </p>
        </div>

        <Button variant="secondary" onClick={() => setShowJson(!showJson)}>
          {showJson ? "Hide JSON" : "View JSON"}
        </Button>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <div>
          <p className="mb-3 text-sm font-semibold text-slate-200">Resources</p>
          <div className="space-y-2 text-sm text-slate-400">
            <p>Aircraft: {scenario.aircraftCount}</p>
            <p>Pilots: {scenario.pilotCount}</p>
            <p>Ground Crew: {scenario.groundCrewCount}</p>
            <p>Runways: {scenario.runwayCount}</p>
            <p>Missions: {scenario.missionCount}</p>
          </div>
        </div>

        <div>
          <p className="mb-3 text-sm font-semibold text-slate-200">
            Environment
          </p>
          <div className="space-y-2 text-sm text-slate-400">
            <p>Condition: {scenario.weatherCondition}</p>
            <p>Visibility: {scenario.visibility}</p>
            <p>Wind Speed: {scenario.windSpeed}</p>
          </div>
        </div>

        <div>
          <p className="mb-3 text-sm font-semibold text-slate-200">
            Risk Profile
          </p>
          <div className="space-y-2 text-sm text-slate-400">
            <p>Ground: {formatPercent(scenario.groundAbortRate)}</p>
            <p>Air: {formatPercent(scenario.airAbortRate)}</p>
            <p>Weather: {formatPercent(scenario.weatherAbortRate)}</p>
          </div>
        </div>

        <div>
          <p className="mb-3 text-sm font-semibold text-slate-200">Behaviour</p>
          <div className="space-y-2 text-sm text-slate-400">
            <p>Duration: {formatDuration(scenario.simulationDuration)}</p>
            <p>
              Mission Type Mode:{" "}
              {scenario.randomScheduling ? "Random" : "Fixed Training"}
            </p>
            <p>
              Planning Phase:{" "}
              {scenario.missionPlanningEnabled ? "Enabled" : "Disabled"}
            </p>
            <p className="text-green-400">Payload: backend-ready</p>
          </div>
        </div>
      </div>

      {showJson && (
        <pre className="mt-6 max-h-96 overflow-auto rounded-xl border border-green-900/40 bg-[#0B0F0D] p-4 text-xs text-green-300">
          {JSON.stringify(scenario, null, 2)}
        </pre>
      )}
    </Card>
  );
}
