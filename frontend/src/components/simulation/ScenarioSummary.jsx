import Card from "../common/Card";

function percent(value) {
  return `${Math.round((value ?? 0) * 100)}%`;
}

function duration(minutes) {
  if (!minutes) return "-";
  if (minutes < 60) return `${minutes} min`;

  const hrs = Math.floor(minutes / 60);
  const mins = minutes % 60;

  return mins === 0 ? `${hrs}h` : `${hrs}h ${mins}m`;
}

function Row({ label, value }) {
  return (
    <div className="flex justify-between gap-4 border-b border-green-900/20 py-2 text-sm">
      <span className="text-slate-500">{label}</span>
      <span className="text-right text-slate-200">{value ?? "-"}</span>
    </div>
  );
}

export default function ScenarioSummary({ scenario }) {
  if (!scenario) return null;

  return (
    <Card>
      <div className="mb-5">
        <p className="text-xs uppercase tracking-[0.25em] text-green-400">
          Scenario
        </p>

        <h3 className="mt-1 text-lg font-semibold text-slate-100">
          Scenario Summary
        </h3>

        <p className="mt-1 text-sm text-slate-500">
          Input configuration that produced this simulation result.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <div>
          <p className="mb-3 text-sm font-semibold text-slate-200">Resources</p>

          <Row label="Aircraft" value={scenario.availableAircraft} />
          <Row label="Pilots" value={scenario.availablePilots} />
          <Row label="Ground Crew" value={scenario.availableGroundCrew} />
          <Row label="Runways" value={scenario.availableRunways} />
          <Row label="Missions" value={scenario.missionCount} />
        </div>

        <div>
          <p className="mb-3 text-sm font-semibold text-slate-200">
            Environment
          </p>

          <Row label="Condition" value={scenario.weatherCondition} />
          <Row label="Visibility" value={scenario.visibility} />
          <Row label="Wind Speed" value={scenario.windSpeed} />
        </div>

        <div>
          <p className="mb-3 text-sm font-semibold text-slate-200">
            Risk Profile
          </p>

          <Row label="Ground Abort" value={percent(scenario.groundAbortRate)} />
          <Row label="Air Abort" value={percent(scenario.airAbortRate)} />
          <Row
            label="Weather Abort"
            value={percent(scenario.weatherAbortRate)}
          />
        </div>

        <div>
          <p className="mb-3 text-sm font-semibold text-slate-200">Behaviour</p>

          <Row label="Duration" value={duration(scenario.simulationDuration)} />
          <Row
            label="Mission Type Mode"
            value={scenario.randomScheduling ? "Random" : "Fixed Training"}
          />
          <Row
            label="Planning Phase"
            value={scenario.missionPlanningEnabled ? "Enabled" : "Disabled"}
          />
        </div>
      </div>
    </Card>
  );
}
