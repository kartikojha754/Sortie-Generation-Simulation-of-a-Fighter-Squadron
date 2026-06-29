import {
  MdCloud,
  MdTimer,
  MdRule,
  MdShuffle,
  MdSettings,
  MdWarning,
} from "react-icons/md";

import Card from "../common/Card";
import SectionHeader from "../common/SectionHeader";

function ScenarioOverview({ result }) {
  const scenario = result?.scenario;

  const scenarioItems = [
    {
      label: "Weather",
      value:
        scenario?.weatherCondition ||
        result?.finalSquadronState?.weather?.condition ||
        "—",
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
      icon: <MdWarning />,
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
    <section className="space-y-6">
      <SectionHeader
        eyebrow="Scenario"
        title="Scenario Configuration"
        subtitle="Rules and environmental conditions that control how the simulation behaves."
        icon={<MdSettings />}
      />

      <Card>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {scenarioItems.map((item) => (
            <ScenarioItem
              key={item.label}
              label={item.label}
              value={item.value}
              icon={item.icon}
              tone={item.tone}
            />
          ))}
        </div>
      </Card>
    </section>
  );
}

function ScenarioItem({ label, value, icon, tone }) {
  const tones = {
    primary: "text-sky-400 bg-sky-500/10 border-sky-500/30",
    success: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30",
    warning: "text-amber-400 bg-amber-500/10 border-amber-500/30",
    danger: "text-red-400 bg-red-500/10 border-red-500/30",
  };

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4 transition hover:border-slate-700">
      <div className="mb-4 flex items-center justify-between">
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-xl border text-xl ${
            tones[tone] || tones.primary
          }`}
        >
          {icon}
        </div>
      </div>

      <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-500">
        {label}
      </p>

      <p className="mt-2 text-lg font-semibold text-white">{value}</p>
    </div>
  );
}

export default ScenarioOverview;
