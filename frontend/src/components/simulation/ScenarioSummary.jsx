import Card from "../common/Card";

function formatPercent(value) {
  if (value === undefined || value === null) return "-";
  return `${Math.round(Number(value) * 100)}%`;
}

function formatDuration(minutes) {
  if (minutes === undefined || minutes === null) return "-";

  const totalMinutes = Number(minutes);

  if (totalMinutes >= 1440) {
    return `${Math.round((totalMinutes / 1440) * 10) / 10}d`;
  }

  if (totalMinutes >= 60) {
    return `${Math.round((totalMinutes / 60) * 10) / 10}h`;
  }

  return `${totalMinutes}m`;
}

function formatValue(value) {
  if (value === undefined || value === null || value === "") return "-";
  return value;
}

function Row({ label, value }) {
  return (
    <div className="flex items-center justify-between border-b border-green-900/20 py-3">
      <span className="text-slate-400">{label}</span>
      <span className="font-mono text-sm font-normal text-slate-300">
        {value}
      </span>
    </div>
  );
}

function SectionTitle({ children }) {
  return (
    <h4 className="mb-4 text-sm font-medium tracking-wide text-slate-200">
      {children}
    </h4>
  );
}

export default function ScenarioSummary({ scenario = {}, weather = null }) {
  const weatherData = weather || scenario.weather || {};

  const missionCount =
    scenario.missionRequests?.length || scenario.missionCount || "-";

  return (
    <Card>
      <div className="mb-6">
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

      <div className="grid gap-7 md:grid-cols-2 xl:grid-cols-4">
        <div>
          <SectionTitle>Resources</SectionTitle>

          <Row
            label="Aircraft"
            value={formatValue(scenario.availableAircraft)}
          />
          <Row label="Pilots" value={formatValue(scenario.availablePilots)} />
          <Row
            label="Ground Crew"
            value={formatValue(scenario.availableGroundCrew)}
          />
          <Row label="Runways" value={formatValue(scenario.availableRunways)} />
          <Row label="Missions" value={missionCount} />
        </div>

        <div>
          <SectionTitle>Environment</SectionTitle>

          <Row label="Condition" value={formatValue(weatherData.condition)} />

          <Row
            label="Visibility"
            value={
              weatherData.visibility !== undefined
                ? `${weatherData.visibility} km`
                : "-"
            }
          />

          <Row
            label="Wind Speed"
            value={
              weatherData.windSpeed !== undefined
                ? `${weatherData.windSpeed}`
                : "-"
            }
          />

          <Row
            label="Flyable"
            value={
              weatherData.isFlyable === undefined
                ? "-"
                : weatherData.isFlyable
                  ? "Yes"
                  : "No"
            }
          />
        </div>

        <div>
          <SectionTitle>Risk Profile</SectionTitle>

          <Row
            label="Ground Abort"
            value={formatPercent(scenario.groundAbortRate)}
          />

          <Row label="Air Abort" value={formatPercent(scenario.airAbortRate)} />

          <Row
            label="Weather Abort"
            value={formatPercent(scenario.weatherAbortRate)}
          />

          <Row
            label="Derived Weather"
            value={formatPercent(scenario.derivedWeatherAbortRate)}
          />

          <Row
            label="Risk Level"
            value={formatValue(scenario.weatherRiskLevel)}
          />
        </div>

        <div>
          <SectionTitle>Behaviour</SectionTitle>

          <Row
            label="Duration"
            value={formatDuration(scenario.simulationDuration)}
          />

          <Row
            label="Mission Type Mode"
            value={scenario.randomScheduling ? "Random" : "Fixed Training"}
          />

          <Row
            label="Planning Phase"
            value={scenario.missionPlanningEnabled ? "Enabled" : "Disabled"}
          />

          <Row
            label="Custom Missions"
            value={scenario.missionRequests?.length || 0}
          />
        </div>
      </div>

      {scenario.weatherRiskReason && (
        <div className="mt-6 rounded-xl border border-amber-500/30 bg-amber-500/10 p-4">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-amber-300">
            Weather Risk Explanation
          </p>

          <p className="mt-2 text-sm leading-relaxed text-slate-300">
            {scenario.weatherRiskReason}
          </p>
        </div>
      )}
    </Card>
  );
}
