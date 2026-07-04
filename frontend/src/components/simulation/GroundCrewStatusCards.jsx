import Card from "../common/Card";

function badge(isAvailable) {
  return isAvailable
    ? "border-green-500/40 bg-green-500/10 text-green-300"
    : "border-amber-500/40 bg-amber-500/10 text-amber-300";
}

export default function GroundCrewStatusCards({
  groundCrew = [],
  missions = [],
}) {
  return (
    <Card>
      <div className="mb-6">
        <p className="text-xs uppercase tracking-[0.25em] text-green-400">
          Ground Crew
        </p>

        <h3 className="mt-1 text-lg font-semibold text-slate-100">
          Ground Crew Operational Summary
        </h3>

        <p className="mt-1 text-sm text-slate-500">
          Crew availability and mission support derived from simulation output.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {groundCrew.map((crew) => {
          const crewMissions = missions.filter((mission) =>
            (mission.groundCrewIds || []).includes(crew.id),
          );

          const lastMission =
            crewMissions.length > 0
              ? crewMissions[crewMissions.length - 1]
              : null;

          return (
            <div
              key={crew.id}
              className="rounded-xl border border-green-900/40 bg-[#0B0F0D] p-5"
            >
              <div className="mb-5 flex items-start justify-between">
                <div>
                  <h4 className="text-xl font-bold text-slate-100">
                    {crew.name || crew.id}
                  </h4>
                  <p className="text-xs text-slate-500">
                    {crew.role || "Ground Crew"}
                  </p>
                </div>

                <span
                  className={`rounded-full border px-3 py-1 text-xs font-semibold ${badge(
                    crew.isAvailable,
                  )}`}
                >
                  {crew.isAvailable ? "AVAILABLE" : "ASSIGNED"}
                </span>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-500">Missions Supported</span>
                  <span>{crewMissions.length}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-500">Last Mission</span>
                  <span>{lastMission?.name || "-"}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-500">Assigned Aircraft</span>
                  <span>{crew.assignedAircraftId || "-"}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-500">Assigned Mission</span>
                  <span>{crew.assignedMissionId || "-"}</span>
                </div>
              </div>

              {crewMissions.length > 0 && (
                <>
                  <div className="my-4 border-t border-green-900/40" />

                  <p className="mb-2 text-xs uppercase tracking-wide text-slate-500">
                    Support History
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {crewMissions.map((mission) => (
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
