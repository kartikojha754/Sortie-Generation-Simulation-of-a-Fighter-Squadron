import {
  FiAlertTriangle,
  FiCheckCircle,
  FiClock,
  FiShuffle,
  FiXCircle,
} from "react-icons/fi";

import Card from "../common/Card";
import { useSimulation } from "../../context/SimulationContext";

const formatDuration = (minutes) => {
  if (!minutes) return "—";
  return `${Math.round(minutes / 60)}h`;
};

const getBooleanLabel = (value) => {
  return value ? "Enabled" : "Disabled";
};

const getAbortShare = (value, totalAborts) => {
  if (!totalAborts) return "0%";
  return `${Math.round((value / totalAborts) * 100)}%`;
};

const RecentSimulationSummary = () => {
  const { simulationResult } = useSimulation();

  const scenario = simulationResult?.scenario;
  const statistics = simulationResult?.statistics;

  const totalAborts = statistics?.abortedMissions || 0;

  const groundAborts =
    statistics?.groundAborts ||
    statistics?.groundAbortCount ||
    statistics?.groundAbortedMissions ||
    0;

  const airAborts =
    statistics?.airAborts ||
    statistics?.airAbortCount ||
    statistics?.airAbortedMissions ||
    0;

  const weatherAborts =
    statistics?.weatherAborts ||
    statistics?.weatherAbortCount ||
    statistics?.weatherAbortedMissions ||
    0;

  const summary = [
    {
      label: "Simulation Duration",
      value: formatDuration(scenario?.simulationDuration),
      icon: <FiClock />,
      tone: "text-amber-400",
    },
    {
      label: "Mission Planning",
      value: getBooleanLabel(scenario?.missionPlanningEnabled),
      icon: scenario?.missionPlanningEnabled ? (
        <FiCheckCircle />
      ) : (
        <FiXCircle />
      ),
      tone: scenario?.missionPlanningEnabled
        ? "text-emerald-400"
        : "text-red-400",
    },
    {
      label: "Random Scheduling",
      value: getBooleanLabel(scenario?.randomScheduling),
      icon: <FiShuffle />,
      tone: scenario?.randomScheduling ? "text-emerald-400" : "text-slate-400",
    },
  ];

  return (
    <Card>
      <div className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-sky-400">
          Latest Run
        </p>

        <h2 className="mt-2 text-xl font-semibold text-white">
          Simulation Configuration
        </h2>

        <p className="mt-1 text-sm text-slate-400">
          Core setup rules and actual abort distribution from the latest
          simulation run.
        </p>
      </div>

      {!scenario ? (
        <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4 text-sm text-slate-400">
          No simulation configuration available. Run a simulation to view setup
          details.
        </div>
      ) : (
        <div className="grid gap-4 lg:grid-cols-4">
          {summary.map((item) => (
            <div
              key={item.label}
              className="rounded-xl border border-slate-800 bg-slate-950/60 p-4"
            >
              <div className={`mb-3 text-xl ${item.tone}`}>{item.icon}</div>

              <p className="text-2xl font-bold text-white">{item.value}</p>

              <p className="mt-1 text-sm text-slate-500">{item.label}</p>
            </div>
          ))}

          <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4">
            <div
              className={`mb-3 text-xl ${
                totalAborts > 0 ? "text-red-400" : "text-emerald-400"
              }`}
            >
              <FiAlertTriangle />
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between gap-4">
                <span className="text-slate-500">Ground Abort</span>
                <span className="font-semibold text-white">
                  {getAbortShare(groundAborts, totalAborts)}
                </span>
              </div>

              <div className="flex items-center justify-between gap-4">
                <span className="text-slate-500">Air Abort</span>
                <span className="font-semibold text-white">
                  {getAbortShare(airAborts, totalAborts)}
                </span>
              </div>

              <div className="flex items-center justify-between gap-4">
                <span className="text-slate-500">Weather Abort</span>
                <span className="font-semibold text-white">
                  {getAbortShare(weatherAborts, totalAborts)}
                </span>
              </div>
            </div>

            <p className="mt-3 text-sm text-slate-500">
              Abort Distribution ({totalAborts} total)
            </p>
          </div>
        </div>
      )}
    </Card>
  );
};

export default RecentSimulationSummary;
