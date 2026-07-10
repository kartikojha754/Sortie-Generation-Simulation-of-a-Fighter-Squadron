import { useState } from "react";
import Card from "../common/Card";
import Button from "../common/Button";
import { useScenario } from "../../context/ScenarioContext";
import { prepareSimulationPayload } from "../../services/simulationService";

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

  const payload = prepareSimulationPayload(scenario);

  const totalPilots = Object.values(scenario.pilotLevels || {}).reduce(
    (sum, count) => sum + Number(count || 0),
    0,
  );

  const customMissionCount = scenario.missionRequests?.length || 0;

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
          {showJson ? "Hide Payload" : "View Payload"}
        </Button>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <div>
          <p className="mb-3 text-sm font-semibold text-slate-200">Resources</p>

          <div className="space-y-2 text-sm text-slate-400">
            <p>Aircraft: {scenario.aircraftCount}</p>
            <p>Pilots: {totalPilots}</p>
            <p>Ground Crew: {scenario.groundCrewCount}</p>
            <p>Runways: {scenario.runwayCount}</p>
            <p>Auto Missions: {scenario.missionCount}</p>
          </div>
        </div>

        <div>
          <p className="mb-3 text-sm font-semibold text-slate-200">
            Pilot Levels
          </p>

          <div className="space-y-2 text-sm text-slate-400">
            {Object.entries(scenario.pilotLevels || {}).map(
              ([level, count]) => (
                <p key={level}>
                  {level}: {count}
                </p>
              ),
            )}
          </div>
        </div>

        <div>
          <p className="mb-3 text-sm font-semibold text-slate-200">Missions</p>

          <div className="space-y-2 text-sm text-slate-400">
            <p>Custom Requests: {customMissionCount}</p>
            <p>
              Mode:{" "}
              {customMissionCount > 0
                ? "Custom mission queue"
                : "Auto-generated missions"}
            </p>
            <p>
              Mission Type Mode:{" "}
              {scenario.randomScheduling
                ? "Fully Randomized"
                : "Fixed / Custom"}
            </p>
            <p>
              Planning Phase:{" "}
              {scenario.missionPlanningEnabled ? "Enabled" : "Disabled"}
            </p>
          </div>
        </div>

        <div>
          <p className="mb-3 text-sm font-semibold text-slate-200">
            Environment / Risk
          </p>

          <div className="space-y-2 text-sm text-slate-400">
            <p>Condition: {scenario.weatherCondition}</p>
            <p>Visibility: {scenario.visibility}</p>
            <p>Wind Speed: {scenario.windSpeed}</p>
            <p>Ground Abort: {formatPercent(scenario.groundAbortRate)}</p>
            <p>Air Abort: {formatPercent(scenario.airAbortRate)}</p>
            <p>Weather Abort: {formatPercent(scenario.weatherAbortRate)}</p>
            <p>Duration: {formatDuration(scenario.simulationDuration)}</p>
          </div>
        </div>
      </div>

      {customMissionCount > 0 && (
        <div className="mt-6 rounded-xl border border-green-900/30 bg-[#0B0F0D] p-4">
          <p className="mb-3 text-sm font-semibold text-slate-200">
            Mission Requests
          </p>

          <div className="space-y-2 text-sm text-slate-400">
            {scenario.missionRequests.map((mission, index) => (
              <div
                key={index}
                className="rounded-lg border border-green-900/20 px-3 py-2"
              >
                <span className="text-slate-200">
                  {mission.name || `Mission ${index + 1}`}
                </span>{" "}
                · {mission.type} · {mission.priority} · T+
                {mission.incomingTime} min · {mission.duration} min · Requires{" "}
                {mission.requiredPilotRating}
              </div>
            ))}
          </div>
        </div>
      )}

      {showJson && (
        <pre className="mt-6 max-h-96 overflow-auto rounded-xl border border-green-900/40 bg-[#0B0F0D] p-4 text-xs text-green-300">
          {JSON.stringify(payload, null, 2)}
        </pre>
      )}
    </Card>
  );
}
