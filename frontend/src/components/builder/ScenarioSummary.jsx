import {
  FiActivity,
  FiCloud,
  FiMap,
  FiUsers,
  FiTruck,
  FiShield,
} from "react-icons/fi";

import ConfigurationPanel from "../configuration/ConfigurationPanel";

import { useScenario } from "../../context/ScenarioContext";

const formatLabel = (value) => {
  if (!value) return "Not selected";

  return value
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const ScenarioSummary = () => {
  const { scenario } = useScenario();

  const summaryItems = [
    {
      icon: <FiActivity />,
      label: "Mission Configuration",
      value: `${scenario.missionCount} Missions • ${formatLabel(
        scenario.scenario.mission.missionPriority,
      )}`,
    },
    {
      icon: <FiMap />,
      label: "Aircraft & Runways",
      value: `${scenario.squadron.aircraft.totalAircraft} Aircraft • ${scenario.squadron.runways.operationalRunways} Operational Runways`,
    },
    {
      icon: <FiUsers />,
      label: "Personnel",
      value: `${scenario.squadron.pilots.totalPilots} Pilots • ${scenario.squadron.groundCrew.totalTeams} Ground Crew Teams`,
    },
    {
      icon: <FiCloud />,
      label: "Environment",
      value: `${formatLabel(
        scenario.scenario.environment.weatherCondition,
      )} Weather • ${formatLabel(
        scenario.scenario.environment.timeOfDay,
      )} Operations`,
    },
    {
      icon: <FiTruck />,
      label: "Resources",
      value: `${scenario.scenario.constraints.availableFuelUnits} Fuel Units • ${scenario.scenario.constraints.availableWeaponPackages} Weapon Packages`,
    },
    {
      icon: <FiShield />,
      label: "Simulation Rules",
      value: `${formatLabel(
        scenario.scenario.scheduling.missionSchedulingStrategy,
      )} Scheduling • ${formatLabel(
        scenario.scenario.constraints.constraintEnforcement,
      )} Constraints`,
    },
  ];

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
