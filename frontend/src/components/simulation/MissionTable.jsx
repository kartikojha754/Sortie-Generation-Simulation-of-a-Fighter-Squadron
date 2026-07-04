import Card from "../common/Card";

function formatList(list) {
  if (!list || list.length === 0) return "-";
  return list.join(", ");
}

function formatTime(value) {
  if (value === undefined || value === null) return "-";

  const mins = Math.round(Number(value));
  const h = Math.floor(mins / 60);
  const m = mins % 60;

  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

function formatDuration(value) {
  if (value === undefined || value === null) return "-";
  return `${value} min`;
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

export default function MissionTable({ missions = [] }) {
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
          Mission-level planning, assignment, and completion output returned by
          the backend.
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
                  <div>
                    <p className="font-medium text-slate-100">
                      {mission.name || mission.id}
                    </p>
                    <p className="text-xs text-slate-500">{mission.id}</p>
                  </div>
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
    </Card>
  );
}
