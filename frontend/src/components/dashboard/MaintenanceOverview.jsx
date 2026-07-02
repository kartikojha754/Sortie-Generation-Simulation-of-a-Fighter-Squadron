import { FiCheckCircle, FiClock, FiTool } from "react-icons/fi";

import Card from "../common/Card";
import { useSimulation } from "../../context/SimulationContext";

const countByKeyword = (records, keywords) => {
  if (!Array.isArray(records)) return 0;

  return records.filter((record) => {
    const text = `${record?.type || ""} ${record?.maintenanceType || ""} ${
      record?.status || ""
    }`.toLowerCase();

    return keywords.some((keyword) => text.includes(keyword));
  }).length;
};

const getAircraft = (record) => {
  return (
    record?.aircraftId ||
    record?.aircraft?.tailNumber ||
    record?.aircraft?.id ||
    record?.tailNumber ||
    "Unknown Aircraft"
  );
};

const getMaintenanceType = (record) => {
  return record?.type || record?.maintenanceType || "Maintenance";
};

const getMaintenanceStatus = (record) => {
  return String(record?.status || "Recorded").toUpperCase();
};

const getStatusStyle = (status) => {
  const value = String(status || "").toUpperCase();

  if (value.includes("COMPLETED")) {
    return "border-emerald-500/30 bg-emerald-500/10 text-emerald-400";
  }

  if (value.includes("IN_PROGRESS") || value.includes("ACTIVE")) {
    return "border-sky-500/30 bg-sky-500/10 text-sky-400";
  }

  if (value.includes("FAILED") || value.includes("FAULT")) {
    return "border-red-500/30 bg-red-500/10 text-red-400";
  }

  return "border-amber-500/30 bg-amber-500/10 text-amber-400";
};

const MaintenanceOverview = () => {
  const { simulationResult } = useSimulation();

  const records =
    simulationResult?.maintenanceRecords ||
    simulationResult?.finalSquadronState?.maintenanceRecords ||
    [];

  const total = records.length;

  const routine = countByKeyword(records, ["routine", "inspection"]);
  const repairs = countByKeyword(records, ["repair", "fault", "damage"]);
  const completed = countByKeyword(records, ["completed", "complete", "done"]);

  const latestRecords = records.slice(-4).reverse();

  const items = [
    {
      label: "Total Records",
      value: total,
      icon: <FiTool />,
      tone: "text-sky-400",
    },
    {
      label: "Routine Inspections",
      value: routine,
      icon: <FiClock />,
      tone: "text-amber-400",
    },
    {
      label: "Repairs / Faults",
      value: repairs,
      icon: <FiTool />,
      tone: "text-red-400",
    },
    {
      label: "Completed",
      value: completed,
      icon: <FiCheckCircle />,
      tone: "text-emerald-400",
    },
  ];

  return (
    <Card>
      <div className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-sky-400">
          Maintenance
        </p>

        <h2 className="mt-2 text-xl font-semibold text-white">
          Maintenance Overview
        </h2>

        <p className="mt-1 text-sm text-slate-400">
          Summary and latest maintenance activity from the simulation.
        </p>
      </div>

      {total === 0 ? (
        <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4 text-sm text-slate-400">
          No maintenance records available for the latest simulation.
        </div>
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-2">
            {items.map((item) => (
              <div
                key={item.label}
                className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950/60 p-4"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-lg border border-slate-700 bg-slate-900 text-lg ${item.tone}`}
                  >
                    {item.icon}
                  </div>

                  <p className="text-sm font-semibold text-white">
                    {item.label}
                  </p>
                </div>

                <span className={`text-lg font-bold ${item.tone}`}>
                  {item.value}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <h3 className="mb-3 text-sm font-semibold text-white">
              Latest Maintenance Records
            </h3>

            <div className="space-y-3">
              {latestRecords.map((record, index) => {
                const status = getMaintenanceStatus(record);

                return (
                  <div
                    key={record?.id || index}
                    className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-800 bg-slate-950/60 px-4 py-3"
                  >
                    <div>
                      <p className="text-sm font-semibold text-white">
                        {getAircraft(record)}
                      </p>

                      <p className="mt-1 text-xs text-slate-500">
                        {getMaintenanceType(record)}
                      </p>
                    </div>

                    <span
                      className={`rounded-full border px-3 py-1 text-xs font-semibold ${getStatusStyle(
                        status,
                      )}`}
                    >
                      {status}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
    </Card>
  );
};

export default MaintenanceOverview;
