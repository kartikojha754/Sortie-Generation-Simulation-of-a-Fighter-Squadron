import Card from "../common/Card";

function badge(status) {
  switch (status) {
    case "AVAILABLE":
    case "RESTING":
      return "border-green-500/40 bg-green-500/10 text-green-300";

    case "FLYING":
    case "MISSION_PLANNING":
    case "BRIEFING":
    case "DEBRIEFING":
      return "border-sky-500/40 bg-sky-500/10 text-sky-300";

    case "UNAVAILABLE":
      return "border-red-500/40 bg-red-500/10 text-red-300";

    default:
      return "border-amber-500/40 bg-amber-500/10 text-amber-300";
  }
}

function pretty(text) {
  return text?.replaceAll("_", " ") ?? "-";
}

export default function PilotStatusCards({ pilots = [], missions = [] }) {
  return (
    <Card>
      <div className="mb-6">
        <p className="text-xs uppercase tracking-[0.25em] text-green-400">
          Pilots
        </p>

        <h3 className="mt-1 text-lg font-semibold text-slate-100">
          Pilot Operational Summary
        </h3>

        <p className="mt-1 text-sm text-slate-500">
          Pilot activity derived from simulation mission history.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {pilots.map((pilot) => {
          const pilotMissions = missions.filter((mission) =>
            (mission.pilotIds || []).includes(pilot.id),
          );

          const lastMission =
            pilotMissions.length > 0
              ? pilotMissions[pilotMissions.length - 1]
              : null;

          const lastAircraft =
            lastMission?.aircraftIds?.length > 0
              ? lastMission.aircraftIds.join(", ")
              : "-";

          return (
            <div
              key={pilot.id}
              className="rounded-xl border border-green-900/40 bg-[#0B0F0D] p-5"
            >
              <div className="mb-5 flex items-start justify-between">
                <div>
                  <h4 className="text-xl font-bold text-slate-100">
                    {pilot.name || pilot.id}
                  </h4>

                  <p className="text-xs text-slate-500">
                    {pilot.rank || "Pilot"} • {pretty(pilot.rating)}
                  </p>
                </div>

                <span
                  className={`rounded-full border px-3 py-1 text-xs font-semibold ${badge(
                    pilot.status,
                  )}`}
                >
                  {pretty(pilot.status)}
                </span>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-500">Flight Hours</span>
                  <span>{pilot.flightHours ?? 0}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-500">Missions Flown</span>
                  <span>{pilotMissions.length}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-500">Last Mission</span>
                  <span>{lastMission?.name || "-"}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-500">Last Aircraft</span>
                  <span>{lastAircraft}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-500">Rest Time</span>
                  <span>{pilot.restTimeRemaining ?? 0}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-500">Current State</span>
                  <span className="text-green-300">{pretty(pilot.status)}</span>
                </div>
              </div>

              {pilotMissions.length > 0 && (
                <>
                  <div className="my-4 border-t border-green-900/40" />

                  <p className="mb-2 text-xs uppercase tracking-wide text-slate-500">
                    Mission History
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {pilotMissions.map((mission) => (
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
