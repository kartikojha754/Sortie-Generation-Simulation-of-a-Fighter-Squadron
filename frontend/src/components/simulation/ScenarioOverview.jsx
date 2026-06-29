import {
  MdCloud,
  MdTimer,
  MdRule,
  MdShuffle,
  MdWarning,
  MdFlight,
} from "react-icons/md";

import Card from "../common/Card";

function ScenarioOverview({ result }) {
  const scenario = result?.scenario;
  const weather = result?.finalSquadronState?.weather;

  const scenarioItems = [
    {
      label: "Weather",
      value: weather?.condition || "—",
      icon: <MdCloud />,
      tone: "primary",
    },
    {
      label: "Ground Abort Rate",
      value:
        scenario?.groundAbortRate !== undefined
          ? `${scenario.groundAbortRate * 100}%`
          : "—",
      icon: <MdWarning />,
      tone: "danger",
    },
    {
      label: "Air Abort Rate",
      value:
        scenario?.airAbortRate !== undefined
          ? `${scenario.airAbortRate * 100}%`
          : "—",
      icon: <MdFlight />,
      tone: "warning",
    },
    {
      label: "Weather Abort Rate",
      value:
        scenario?.weatherAbortRate !== undefined
          ? `${scenario.weatherAbortRate * 100}%`
          : "—",
      icon: <MdCloud />,
      tone: "primary",
    },
    {
      label: "Mission Planning",
      value:
        scenario?.missionPlanningEnabled !== undefined
          ? scenario.missionPlanningEnabled
            ? "Enabled"
            : "Disabled"
          : "—",
      icon: <MdRule />,
      tone: "success",
    },
    {
      label: "Random Scheduling",
      value:
        scenario?.randomScheduling !== undefined
          ? scenario.randomScheduling
            ? "Enabled"
            : "Disabled"
          : "—",
      icon: <MdShuffle />,
      tone: "warning",
    },
    {
      label: "Simulation Duration",
      value:
        scenario?.simulationDuration !== undefined
          ? `${scenario.simulationDuration} min`
          : "—",
      icon: <MdTimer />,
      tone: "primary",
    },
  ];

  return (
    <Card className="h-full">
      <div className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-sky-400">
          Scenario
        </p>
        <h3 className="mt-1 text-xl font-bold text-white">
          Scenario Configuration
        </h3>
        <p className="mt-1 text-sm text-slate-400">
          Active rules and environmental settings.
        </p>
      </div>

      <div className="space-y-3">
        {scenarioItems.map((item) => (
          <ScenarioRow
            key={item.label}
            label={item.label}
            value={item.value}
            icon={item.icon}
            tone={item.tone}
          />
        ))}
      </div>
    </Card>
  );
}

function ScenarioRow({ label, value, icon, tone }) {
  const tones = {
    primary: "text-sky-400 bg-sky-500/10 border-sky-500/30",
    success: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30",
    warning: "text-amber-400 bg-amber-500/10 border-amber-500/30",
    danger: "text-red-400 bg-red-500/10 border-red-500/30",
  };

  return (
    <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950/60 px-4 py-3 transition hover:border-slate-700">
      <div className="flex items-center gap-3">
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-xl border text-lg ${
            tones[tone] || tones.primary
          }`}
        >
          {icon}
        </div>

        <p className="text-sm font-medium text-slate-300">{label}</p>
      </div>

      <p className="text-sm font-semibold text-white">{value}</p>
    </div>
  );
}

export default ScenarioOverview;
