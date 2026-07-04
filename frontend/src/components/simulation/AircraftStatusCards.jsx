import Card from "../common/Card";

function badge(status) {
  switch (status) {
    case "AVAILABLE":
      return "border-green-500/40 bg-green-500/10 text-green-300";

    case "AIRBORNE":
    case "ASSIGNED":
      return "border-sky-500/40 bg-sky-500/10 text-sky-300";

    case "MAINTENANCE":
      return "border-amber-500/40 bg-amber-500/10 text-amber-300";

    default:
      return "border-red-500/40 bg-red-500/10 text-red-300";
  }
}

function pretty(status) {
  return status?.replaceAll("_", " ") ?? "-";
}

function formatFlightHours(value) {
  if (value === undefined || value === null) return "0 hrs";

  const hours = Number(value);

  if (Number.isNaN(hours)) return "0 hrs";

  return `${hours.toFixed(2)} hrs`;
}

export default function AircraftStatusCards({
  aircraft = [],
  missions = [],
  maintenanceRecords = [],
}) {
  return (
    <Card>
      <div className="mb-6">
        <p className="text-xs uppercase tracking-[0.25em] text-green-400">
          Aircraft
        </p>

        <h3 className="mt-1 text-lg font-semibold text-slate-100">
          Aircraft Operational Summary
        </h3>

        <p className="mt-1 text-sm text-slate-500">
          Aircraft performance derived from simulation history.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {aircraft.map((ac) => {
          const aircraftId = ac.id;

          const aircraftMissions = missions.filter((m) =>
            (m.aircraftIds || []).includes(aircraftId),
          );

          const maintenance = maintenanceRecords.filter(
            (m) => m.aircraftId === aircraftId,
          );

          const lastMission =
            aircraftMissions.length > 0
              ? aircraftMissions[aircraftMissions.length - 1]
              : null;

          const lastPilot =
            lastMission?.pilotIds?.length > 0
              ? lastMission.pilotIds.join(", ")
              : "-";

          return (
            <div
              key={aircraftId}
              className="rounded-xl border border-green-900/40 bg-[#0B0F0D] p-5"
            >
              <div className="mb-5 flex items-start justify-between">
                <div>
                  <h4 className="text-xl font-bold text-slate-100">
                    {ac.tailNumber || aircraftId}
                  </h4>

                  <p className="text-xs text-slate-500">{ac.aircraftType}</p>
                </div>

                <span
                  className={`rounded-full border px-3 py-1 text-xs font-semibold ${badge(
                    ac.status,
                  )}`}
                >
                  {pretty(ac.status)}
                </span>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-500">Flight Hours</span>
                  <span>{formatFlightHours(ac.flightHours)}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-500">Missions Flown</span>
                  <span>{aircraftMissions.length}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-500">Last Mission</span>
                  <span>{lastMission?.name || "-"}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-500">Last Pilot</span>
                  <span>{lastPilot}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-500">Maintenance Events</span>
                  <span>{maintenance.length}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-500">Current State</span>
                  <span className="text-green-300">{pretty(ac.status)}</span>
                </div>
              </div>

              {aircraftMissions.length > 0 && (
                <>
                  <div className="my-4 border-t border-green-900/40" />

                  <p className="mb-2 text-xs uppercase tracking-wide text-slate-500">
                    Mission History
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {aircraftMissions.map((mission) => (
                      <span
                        key={mission.id}
                        className="rounded-lg border border-green-900/40 bg-green-500/10 px-2 py-1 text-xs text-green-300"
                      >
                        {mission.name}
                      </span>
                    ))}
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </Card>
  );
}
