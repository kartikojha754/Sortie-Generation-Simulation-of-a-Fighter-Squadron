import { FiBarChart2, FiCheckCircle, FiClock, FiXCircle } from "react-icons/fi";

import Card from "../common/Card";
import { useSimulation } from "../../context/SimulationContext";

const RecentSimulationSummary = () => {
  const { simulationResult } = useSimulation();

  const statistics = simulationResult?.statistics;
  const scenario = simulationResult?.scenario;

  const summary = [
    {
      label: "Generated Missions",
      value: statistics?.totalMissions ?? "—",
      icon: <FiBarChart2 />,
      tone: "text-sky-400",
    },
    {
      label: "Completed",
      value: statistics?.completedSorties ?? "—",
      icon: <FiCheckCircle />,
      tone: "text-emerald-400",
    },
    {
      label: "Aborted",
      value: statistics?.abortedMissions ?? "—",
      icon: <FiXCircle />,
      tone: "text-red-400",
    },
    {
      label: "Duration",
      value: scenario?.simulationDuration
        ? `${Math.round(scenario.simulationDuration / 60)}h`
        : "—",
      icon: <FiClock />,
      tone: "text-amber-400",
    },
  ];

  return (
    <Card>
      <div className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-sky-400">
          Latest Run
        </p>

        <h2 className="mt-2 text-xl font-semibold text-white">
          Recent Simulation Summary
        </h2>

        <p className="mt-1 text-sm text-slate-400">
          High-level result snapshot from the latest sortie generation run.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
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
      </div>
    </Card>
  );
};

export default RecentSimulationSummary;
