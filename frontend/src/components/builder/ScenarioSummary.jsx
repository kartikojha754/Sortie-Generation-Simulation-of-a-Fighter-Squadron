import {
  FiActivity,
  FiCloud,
  FiMap,
  FiUsers,
  FiTruck,
  FiShield,
} from "react-icons/fi";

import ConfigurationPanel from "../configuration/ConfigurationPanel";

const summaryItems = [
  {
    icon: <FiActivity />,
    label: "Mission Configuration",
    value: "18 Missions • High Priority",
  },
  {
    icon: <FiMap />,
    label: "Aircraft & Runways",
    value: "16 Aircraft • 2 Runways",
  },
  {
    icon: <FiUsers />,
    label: "Personnel",
    value: "24 Pilots • 6 Ground Crew Teams",
  },
  {
    icon: <FiCloud />,
    label: "Environment",
    value: "Clear Weather • Day Operations",
  },
  {
    icon: <FiTruck />,
    label: "Resources",
    value: "Fuel & Weapons Available",
  },
  {
    icon: <FiShield />,
    label: "Simulation Rules",
    value: "Balanced Scheduling • Strict Constraints",
  },
];

const ScenarioSummary = () => {
  return (
    <ConfigurationPanel
      eyebrow="Scenario"
      title="Scenario Summary"
      description="Review the overall scenario configuration before saving or executing the simulation."
    >
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {summaryItems.map((item) => (
          <div
            key={item.label}
            className="rounded-xl border border-slate-800 bg-slate-950/60 p-5"
          >
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-sky-500/30 bg-sky-500/10 text-sky-400">
              {item.icon}
            </div>

            <p className="text-sm font-medium text-slate-400">{item.label}</p>

            <p className="mt-2 text-base font-semibold text-white">
              {item.value}
            </p>
          </div>
        ))}
      </div>
    </ConfigurationPanel>
  );
};

export default ScenarioSummary;
