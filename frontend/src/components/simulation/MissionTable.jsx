import Card from "../common/Card";

function formatList(list) {
  if (!list || list.length === 0) return "-";
  return list.join(", ");
}

function formatTime(value) {
  if (value === undefined || value === null) {
    return "-";
  }

  const mins = Math.round(Number(value));
  const h = Math.floor(mins / 60);
  const m = mins % 60;

  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

function formatDuration(value) {
  if (value === undefined || value === null) {
    return "-";
  }

  return `${value} min`;
}

function formatWeaponName(value = "") {
  return value
    .toLowerCase()
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function statusBadge(status) {
  switch (status) {
    case "COMPLETED":
      return "bg-green-500/10 text-green-300 border-green-500/40";

    case "ABORTED":
      return "bg-red-500/10 text-red-300 border-red-500/40";

    case "IN_PROGRESS":
      return "bg-sky-500/10 text-sky-300 border-sky-500/40";

    case "READY":
      return "bg-amber-500/10 text-amber-300 border-amber-500/40";

    default:
      return "bg-slate-500/10 text-slate-300 border-slate-500/40";
  }
}

function InventoryList({ inventory = {}, emptyText = "No inventory data" }) {
  const entries = Object.entries(inventory);

  if (entries.length === 0) {
    return <p className="text-xs text-slate-500">{emptyText}</p>;
  }

  return (
    <div className="space-y-1">
      {entries.map(([weaponType, quantity]) => (
        <div
          key={weaponType}
          className="flex items-center justify-between gap-4 text-xs"
        >
          <span className="text-slate-400">{formatWeaponName(weaponType)}</span>

          <span className="font-medium text-slate-200">{quantity}</span>
        </div>
      ))}
    </div>
  );
}

function StrikePlanCard({ mission }) {
  const plan = mission.strikePlan;

  return (
    <div className="rounded-xl border border-green-800/40 bg-green-950/10 p-4">
      <div className="mb-4 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-green-400">
            Air-To-Ground Optimization
          </p>

          <h4 className="mt-1 font-semibold text-slate-100">{mission.name}</h4>
        </div>

        <span className="rounded-full border border-green-600/40 bg-green-500/10 px-3 py-1 text-xs font-semibold text-green-300">
          {mission.targetType
            ? formatWeaponName(mission.targetType)
            : "Strike Mission"}
        </span>
      </div>

      {!plan ? (
        <div className="rounded-lg border border-red-900/40 bg-red-950/10 p-3">
          <p className="text-sm text-red-300">
            No valid strike plan was generated.
          </p>

          <p className="mt-1 text-xs text-slate-500">
            {mission.abortReason ||
              mission.strikePlanningSummary?.failureReason ||
              "Check weapon inventory and maximum mission time."}
          </p>
        </div>
      ) : (
        <>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-lg border border-green-900/30 bg-black/20 p-3">
              <p className="text-xs text-slate-500">Aircraft Required</p>
              <p className="mt-1 text-lg font-semibold text-slate-100">
                {mission.requiredAircraftCount}
              </p>
            </div>

            <div className="rounded-lg border border-green-900/30 bg-black/20 p-3">
              <p className="text-xs text-slate-500">Attack Power</p>
              <p className="mt-1 text-lg font-semibold text-slate-100">
                {plan.totalAttackPower}
              </p>
            </div>

            <div className="rounded-lg border border-green-900/30 bg-black/20 p-3">
              <p className="text-xs text-slate-500">Attack Time</p>
              <p className="mt-1 text-lg font-semibold text-slate-100">
                {plan.attackTimeMinutes} min
              </p>
            </div>

            <div className="rounded-lg border border-green-900/30 bg-black/20 p-3">
              <p className="text-xs text-slate-500">Sortie Duration</p>
              <p className="mt-1 text-lg font-semibold text-slate-100">
                {plan.sortieDuration} min
              </p>
            </div>
          </div>

          <div className="mt-4 grid gap-4 lg:grid-cols-4">
            <div className="rounded-lg border border-green-900/30 p-3">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-green-400">
                Selected Loadout
              </p>

              <div className="space-y-2">
                {(plan.loadout || []).map((weapon) => (
                  <div key={weapon.weaponId} className="text-xs text-slate-300">
                    {formatWeaponName(weapon.weaponType)} ×{" "}
                    {weapon.quantityPerAircraft}
                    {plan.aircraftCount > 1 ? " per aircraft" : ""}
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-lg border border-green-900/30 p-3">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-green-400">
                Inventory Before
              </p>

              <InventoryList inventory={mission.weaponInventory} />
            </div>

            <div className="rounded-lg border border-green-900/30 p-3">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-amber-400">
                Weapons Used
              </p>

              <InventoryList
                inventory={mission.weaponUsage}
                emptyText="No weapons used"
              />
            </div>

            <div className="rounded-lg border border-green-900/30 p-3">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-sky-400">
                Inventory Remaining
              </p>

              <InventoryList inventory={mission.remainingWeaponInventory} />
            </div>
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <div className="rounded-lg bg-black/20 p-3 text-xs">
              <span className="text-slate-500">Travel time:</span>{" "}
              <span className="text-slate-200">
                {plan.roundTripTravelTimeMinutes} min
              </span>
            </div>

            <div className="rounded-lg bg-black/20 p-3 text-xs">
              <span className="text-slate-500">Maximum time:</span>{" "}
              <span className="text-slate-200">
                {mission.maximumAllowedTime} min
              </span>
            </div>

            <div className="rounded-lg bg-black/20 p-3 text-xs">
              <span className="text-slate-500">Remaining time:</span>{" "}
              <span className="text-slate-200">{plan.remainingTime} min</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default function MissionTable({ missions = [] }) {
  const strikeMissions = missions.filter(
    (mission) => mission.type === "AIR_TO_GROUND",
  );

  return (
    <Card>
      <div className="mb-5">
        <p className="text-xs uppercase tracking-[0.25em] text-green-400">
          Missions
        </p>

        <h3 className="mt-1 text-lg font-semibold text-slate-100">
          Mission Execution Table
        </h3>

        <p className="mt-1 text-sm text-slate-500">
          Mission-level planning, assignment and completion output.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[1300px] text-left text-sm">
          <thead className="border-b border-green-900/40 text-slate-400">
            <tr>
              <th className="py-3 pr-4">Mission</th>
              <th className="py-3 pr-4">Type</th>
              <th className="py-3 pr-4">Priority</th>
              <th className="py-3 pr-4">Status</th>
              <th className="py-3 pr-4">Incoming</th>
              <th className="py-3 pr-4">Actual Start</th>
              <th className="py-3 pr-4">End</th>
              <th className="py-3 pr-4">Duration</th>
              <th className="py-3 pr-4">Req. Rating</th>
              <th className="py-3 pr-4">Aircraft</th>
              <th className="py-3 pr-4">Pilots</th>
              <th className="py-3 pr-4">Runway</th>
              <th className="py-3 pr-4">Abort Reason</th>
            </tr>
          </thead>

          <tbody>
            {missions.map((mission) => (
              <tr
                key={mission.id}
                className="border-b border-green-900/20 text-slate-300"
              >
                <td className="py-3 pr-4">
                  <p className="font-medium text-slate-100">
                    {mission.name || mission.id}
                  </p>
                  <p className="text-xs text-slate-500">{mission.id}</p>
                </td>

                <td className="py-3 pr-4">{mission.type}</td>

                <td className="py-3 pr-4">{mission.priority}</td>

                <td className="py-3 pr-4">
                  <span
                    className={`rounded-full border px-3 py-1 text-xs font-semibold ${statusBadge(
                      mission.status,
                    )}`}
                  >
                    {mission.status}
                  </span>
                </td>

                <td className="py-3 pr-4">
                  {formatTime(mission.incomingTime)}
                </td>

                <td className="py-3 pr-4">
                  {formatTime(mission.actualStartTime)}
                </td>

                <td className="py-3 pr-4">{formatTime(mission.endTime)}</td>

                <td className="py-3 pr-4">
                  {formatDuration(mission.duration)}
                </td>

                <td className="py-3 pr-4">
                  {mission.requiredPilotRating || "-"}
                </td>

                <td className="py-3 pr-4">{formatList(mission.aircraftIds)}</td>

                <td className="py-3 pr-4">{formatList(mission.pilotIds)}</td>

                <td className="py-3 pr-4">{mission.runwayId || "-"}</td>

                <td className="py-3 pr-4">{mission.abortReason || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {strikeMissions.length > 0 && (
        <div className="mt-6 space-y-4 border-t border-green-900/30 pt-6">
          {strikeMissions.map((mission) => (
            <StrikePlanCard key={mission.id} mission={mission} />
          ))}
        </div>
      )}
    </Card>
  );
}
