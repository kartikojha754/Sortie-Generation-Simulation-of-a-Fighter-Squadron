import { FiCpu, FiTool, FiUserCheck, FiUsers } from "react-icons/fi";

import Card from "../common/Card";
import { useSimulation } from "../../context/SimulationContext";

const countByStatus = (items, validStatuses) => {
  if (!Array.isArray(items)) return 0;

  return items.filter((item) =>
    validStatuses.includes(String(item?.status || "").toUpperCase()),
  ).length;
};

const countAvailableBoolean = (items) => {
  if (!Array.isArray(items)) return 0;

  return items.filter((item) => item?.isAvailable === true).length;
};

const getPercentage = (value, total) => {
  if (!total) return 0;
  return Math.round((value / total) * 100);
};

const getBarColor = (percentage) => {
  if (percentage >= 100) return "bg-emerald-400";
  if (percentage >= 50) return "bg-amber-400";
  return "bg-red-400";
};

const SnapshotBar = ({ label, value, total, icon }) => {
  const percentage = getPercentage(value, total);

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-sky-500/30 bg-sky-500/10 text-sky-400">
            {icon}
          </div>

          <p className="text-sm font-semibold text-white">{label}</p>
        </div>

        <span className="text-sm font-semibold text-sky-400">
          {value} / {total}
        </span>
      </div>

      <div className="h-2 overflow-hidden rounded-full bg-slate-800">
        <div
          className={`h-full rounded-full ${getBarColor(percentage)}`}
          style={{ width: `${percentage}%` }}
        />
      </div>

      <p className="mt-2 text-xs text-slate-500">{percentage}% ready</p>
    </div>
  );
};

const SquadronSnapshot = () => {
  const { simulationResult } = useSimulation();

  const state = simulationResult?.finalSquadronState;

  const aircraft = state?.aircraft || [];
  const pilots = state?.pilots || [];
  const groundCrew = state?.groundCrew || [];
  const runways = state?.runways || [];

  const aircraftReady = countByStatus(aircraft, ["AVAILABLE"]);
  const pilotsReady = countByStatus(pilots, ["AVAILABLE", "RESTING"]);
  const groundCrewReady = countAvailableBoolean(groundCrew);
  const runwaysReady = countAvailableBoolean(runways);

  const snapshotItems = [
    {
      label: "Aircraft",
      value: aircraftReady,
      total: aircraft.length,
      icon: <FiCpu />,
    },
    {
      label: "Pilots",
      value: pilotsReady,
      total: pilots.length,
      icon: <FiUserCheck />,
    },
    {
      label: "Ground Crew",
      value: groundCrewReady,
      total: groundCrew.length,
      icon: <FiUsers />,
    },
    {
      label: "Runways",
      value: runwaysReady,
      total: runways.length,
      icon: <FiTool />,
    },
  ];

  return (
    <Card>
      <div className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-sky-400">
          Readiness
        </p>

        <h2 className="mt-2 text-xl font-semibold text-white">
          Squadron Snapshot
        </h2>

        <p className="mt-1 text-sm text-slate-400">
          Compact resource readiness overview from the latest simulation state.
        </p>
      </div>

      {!state ? (
        <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4 text-sm text-slate-400">
          No squadron snapshot available. Run a simulation to view readiness.
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {snapshotItems.map((item) => (
            <SnapshotBar key={item.label} {...item} />
          ))}
        </div>
      )}
    </Card>
  );
};

export default SquadronSnapshot;
