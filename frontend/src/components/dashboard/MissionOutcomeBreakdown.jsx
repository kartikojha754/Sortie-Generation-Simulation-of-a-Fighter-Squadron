import { FiCheckCircle, FiClock, FiXCircle } from "react-icons/fi";

import Card from "../common/Card";
import { useSimulation } from "../../context/SimulationContext";

const getPercentage = (value, total) => {
  if (!total) return 0;
  return Math.round((value / total) * 100);
};

const OutcomeRow = ({ label, value, total, icon, tone }) => {
  const percentage = getPercentage(value, total);

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className={`flex h-10 w-10 items-center justify-center rounded-lg border border-slate-700 bg-slate-900 text-lg ${tone}`}
          >
            {icon}
          </div>

          <p className="text-sm font-semibold text-white">{label}</p>
        </div>

        <span className={`text-sm font-semibold ${tone}`}>{value}</span>
      </div>

      <div className="h-2 overflow-hidden rounded-full bg-slate-800">
        <div
          className="h-full rounded-full bg-sky-400"
          style={{ width: `${percentage}%` }}
        />
      </div>

      <p className="mt-2 text-xs text-slate-500">{percentage}% of missions</p>
    </div>
  );
};

const MissionOutcomeBreakdown = () => {
  const { simulationResult } = useSimulation();

  const statistics = simulationResult?.statistics;

  const totalMissions = statistics?.totalMissions || 0;
  const completed = statistics?.completedSorties || 0;
  const aborted = statistics?.abortedMissions || 0;

  const pending = Math.max(totalMissions - completed - aborted, 0);

  const outcomes = [
    {
      label: "Completed Missions",
      value: completed,
      total: totalMissions,
      icon: <FiCheckCircle />,
      tone: "text-emerald-400",
    },
    {
      label: "Aborted Missions",
      value: aborted,
      total: totalMissions,
      icon: <FiXCircle />,
      tone: "text-red-400",
    },
    {
      label: "Pending / Other",
      value: pending,
      total: totalMissions,
      icon: <FiClock />,
      tone: "text-amber-400",
    },
  ];

  return (
    <Card>
      <div className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-sky-400">
          Mission Results
        </p>

        <h2 className="mt-2 text-xl font-semibold text-white">
          Mission Outcome Breakdown
        </h2>

        <p className="mt-1 text-sm text-slate-400">
          Distribution of completed, aborted, and remaining missions.
        </p>
      </div>

      {!statistics ? (
        <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4 text-sm text-slate-400">
          No mission outcome data available. Run a simulation to view results.
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-3">
          {outcomes.map((outcome) => (
            <OutcomeRow key={outcome.label} {...outcome} />
          ))}
        </div>
      )}
    </Card>
  );
};

export default MissionOutcomeBreakdown;
