import Card from "../common/Card";

function formatFlightHours(value) {
  if (value === undefined || value === null) return "0.00 hrs";

  const hours = Number(value);
  if (Number.isNaN(hours)) return "0.00 hrs";

  return `${hours.toFixed(2)} hrs`;
}

function getAircraftMissionHistory(aircraftId, missions = []) {
  return missions.filter((mission) =>
    mission.aircraftIds?.includes(aircraftId),
  );
}

function getMaintenanceCount(aircraftId, maintenanceRecords = []) {
  return maintenanceRecords.filter((record) => record.aircraftId === aircraftId)
    .length;
}

function getStatusClass(status) {
  switch (status) {
    case "AVAILABLE":
      return "border-green-500/40 bg-green-500/10 text-green-300";
    case "IN_FLIGHT":
      return "border-sky-500/40 bg-sky-500/10 text-sky-300";
    case "MAINTENANCE":
      return "border-amber-500/40 bg-amber-500/10 text-amber-300";
    default:
      return "border-slate-500/40 bg-slate-500/10 text-slate-300";
  }
}

function Row({ label, value }) {
  return (
    <div className="flex items-center justify-between gap-4 py-1.5">
      <span className="text-sm text-slate-400">{label}</span>
      <span className="font-mono text-sm text-slate-200">{value}</span>
    </div>
  );
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
          Aircraft Operational Cards
        </h3>

        <p className="mt-1 text-sm text-slate-500">
          Final aircraft state enriched with mission and maintenance history.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {aircraft.map((item) => {
          const missionHistory = getAircraftMissionHistory(item.id, missions);
          const lastMission = missionHistory[missionHistory.length - 1];
          const maintenanceCount = getMaintenanceCount(
            item.id,
            maintenanceRecords,
          );

          return (
            <div
              key={item.id}
              className="group rounded-2xl border border-green-500/15 bg-[#07100B] p-5 transition duration-200 hover:-translate-y-0.5 hover:border-green-500/30 hover:shadow-[0_0_28px_rgba(34,197,94,0.1)]"
            >
              <div className="mb-5 flex items-start justify-between gap-4">
                <div>
                  <h4 className="text-2xl font-bold text-slate-100">
                    {item.tailNumber || item.id}
                  </h4>
                  <p className="mt-1 text-sm text-slate-500">
                    {item.aircraftType}
                  </p>
                </div>

                <span
                  className={`rounded-full border px-3 py-1 text-xs font-semibold ${getStatusClass(
                    item.status,
                  )}`}
                >
                  {item.status}
                </span>
              </div>

              <div className="rounded-xl border border-green-900/25 bg-[#050A07]/70 p-4">
                <Row
                  label="Flight Hours"
                  value={formatFlightHours(item.flightHours)}
                />
                <Row label="Missions Flown" value={missionHistory.length} />
                <Row
                  label="Last Mission"
                  value={lastMission?.name || lastMission?.id || "-"}
                />
                <Row
                  label="Last Pilot"
                  value={lastMission?.pilotIds?.[0] || "-"}
                />
                <Row label="Maintenance Events" value={maintenanceCount} />
                <Row label="Current State" value={item.status || "-"} />
              </div>

              {missionHistory.length > 0 && (
                <div className="mt-5 border-t border-green-900/30 pt-4">
                  <p className="mb-3 text-xs uppercase tracking-[0.18em] text-slate-500">
                    Mission History
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {missionHistory.map((mission) => (
                      <span
                        key={mission.id}
                        className="rounded-lg border border-green-500/20 bg-green-500/10 px-3 py-1.5 text-xs text-green-200"
                      >
                        {mission.name || mission.id}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </Card>
  );
}
