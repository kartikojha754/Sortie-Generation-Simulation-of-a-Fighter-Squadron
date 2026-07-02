import {
  FiActivity,
  FiCheckCircle,
  FiClock,
  FiTool,
  FiXCircle,
} from "react-icons/fi";

import Card from "../common/Card";
import { useSimulation } from "../../context/SimulationContext";

const getMissionTitle = (mission) => {
  return mission?.name || mission?.missionName || mission?.id || "Mission";
};

const getMissionStatus = (mission) => {
  return String(mission?.status || "Generated").toUpperCase();
};

const getMissionType = (mission) => {
  return mission?.type || mission?.missionType || "TRAINING";
};

const getAircraft = (mission) => {
  return (
    mission?.aircraft?.tailNumber ||
    mission?.aircraft?.id ||
    mission?.assignedAircraft?.tailNumber ||
    mission?.assignedAircraft?.id ||
    mission?.assignedAircraftId ||
    mission?.aircraftId ||
    "Not Assigned"
  );
};

const getPilot = (mission) => {
  return (
    mission?.pilot?.name ||
    mission?.pilot?.id ||
    mission?.assignedPilot?.name ||
    mission?.assignedPilot?.id ||
    mission?.assignedPilotId ||
    mission?.pilotId ||
    "Not Assigned"
  );
};

const getMissionIcon = (mission) => {
  const status = getMissionStatus(mission);

  if (status.includes("COMPLETED") || status.includes("SUCCESS")) {
    return <FiCheckCircle />;
  }

  if (status.includes("ABORTED") || status.includes("FAILED")) {
    return <FiXCircle />;
  }

  return <FiActivity />;
};

const getMissionTone = (mission) => {
  const status = getMissionStatus(mission);

  if (status.includes("COMPLETED") || status.includes("SUCCESS")) {
    return "text-emerald-400";
  }

  if (status.includes("ABORTED") || status.includes("FAILED")) {
    return "text-red-400";
  }

  return "text-sky-400";
};

const getMissionBadge = (mission) => {
  const status = getMissionStatus(mission);

  if (status.includes("COMPLETED") || status.includes("SUCCESS")) {
    return "border-emerald-500/30 bg-emerald-500/10 text-emerald-400";
  }

  if (status.includes("ABORTED") || status.includes("FAILED")) {
    return "border-red-500/30 bg-red-500/10 text-red-400";
  }

  return "border-sky-500/30 bg-sky-500/10 text-sky-400";
};

const buildMaintenanceDescription = (record) => {
  const aircraft =
    record?.aircraftId || record?.aircraft || record?.tailNumber || "Aircraft";

  const type = record?.type || record?.maintenanceType || "Maintenance";

  const status = record?.status || "Recorded";

  return `${type} for ${aircraft} marked as ${status}.`;
};

const RecentActivity = () => {
  const { simulationResult } = useSimulation();

  const missions = simulationResult?.missions || [];
  const maintenanceRecords = simulationResult?.maintenanceRecords || [];

  const missionActivities = missions
    .slice(-4)
    .reverse()
    .map((mission, index) => ({
      id: `mission-${mission?.id || index}`,
      type: "mission",
      mission,
      title: getMissionTitle(mission),
      time: "Latest run",
      icon: getMissionIcon(mission),
      tone: getMissionTone(mission),
      badge: getMissionBadge(mission),
    }));

  const maintenanceActivities = maintenanceRecords
    .slice(-2)
    .reverse()
    .map((record, index) => ({
      id: `maintenance-${record?.id || index}`,
      type: "maintenance",
      title: "Maintenance Activity",
      description: buildMaintenanceDescription(record),
      time: "Maintenance",
      icon: <FiTool />,
      tone: "text-amber-400",
      badge: "border-amber-500/30 bg-amber-500/10 text-amber-400",
    }));

  const activities = [...missionActivities, ...maintenanceActivities].slice(
    0,
    6,
  );

  return (
    <Card>
      <div className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-sky-400">
          Activity
        </p>

        <h2 className="mt-2 text-xl font-semibold text-white">
          Recent Activity
        </h2>

        <p className="mt-1 text-sm text-slate-400">
          Latest mission and maintenance events from the simulation output.
        </p>
      </div>

      {activities.length === 0 ? (
        <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4 text-sm text-slate-400">
          No recent activity available. Run a simulation to view mission and
          maintenance events.
        </div>
      ) : (
        <div className="space-y-4">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="rounded-xl border border-slate-800 bg-slate-950/60 p-4"
            >
              <div className="flex gap-4">
                <div
                  className={`mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-slate-700 bg-slate-900 text-lg ${activity.tone}`}
                >
                  {activity.icon}
                </div>

                <div className="w-full">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <h3 className="text-sm font-semibold text-white">
                        {activity.title}
                      </h3>

                      <span className="mt-1 block text-xs text-slate-500">
                        <FiClock className="mr-1 inline" />
                        {activity.time}
                      </span>
                    </div>

                    {activity.type === "mission" && (
                      <span
                        className={`rounded-full border px-3 py-1 text-xs font-semibold ${activity.badge}`}
                      >
                        {getMissionStatus(activity.mission)}
                      </span>
                    )}
                  </div>

                  {activity.type === "mission" ? (
                    <div className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
                      <div>
                        <span className="text-slate-500">Mission Type</span>
                        <p className="font-medium text-slate-300">
                          {getMissionType(activity.mission)}
                        </p>
                      </div>

                      <div>
                        <span className="text-slate-500">Status</span>
                        <p className={`font-medium ${activity.tone}`}>
                          {getMissionStatus(activity.mission)}
                        </p>
                      </div>

                      <div>
                        <span className="text-slate-500">Aircraft</span>
                        <p className="font-medium text-slate-300">
                          {getAircraft(activity.mission)}
                        </p>
                      </div>

                      <div>
                        <span className="text-slate-500">Pilot</span>
                        <p className="font-medium text-slate-300">
                          {getPilot(activity.mission)}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <p className="mt-3 text-sm leading-relaxed text-slate-400">
                      {activity.description}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};

export default RecentActivity;
