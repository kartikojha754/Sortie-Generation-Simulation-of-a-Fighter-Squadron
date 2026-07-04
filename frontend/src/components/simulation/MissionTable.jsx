import Card from "../common/Card";

function formatList(list) {
  if (!list || list.length === 0) return "-";
  return list.join(", ");
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
          Mission-level output returned by the backend simulation.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[1000px] text-left text-sm">
          <thead className="border-b border-green-900/40 text-slate-400">
            <tr>
              <th className="py-3 pr-4">Mission</th>
              <th className="py-3 pr-4">Type</th>
              <th className="py-3 pr-4">Priority</th>
              <th className="py-3 pr-4">Status</th>
              <th className="py-3 pr-4">Aircraft</th>
              <th className="py-3 pr-4">Pilots</th>
              <th className="py-3 pr-4">Runway</th>
              <th className="py-3 pr-4">Abort Reason</th>
              <th className="py-3 pr-4">Completed</th>
            </tr>
          </thead>

          <tbody>
            {missions.map((mission) => (
              <tr
                key={mission.id}
                className="border-b border-green-900/20 text-slate-300"
              >
                <td className="py-3 pr-4">{mission.name || mission.id}</td>
                <td className="py-3 pr-4">{mission.type}</td>
                <td className="py-3 pr-4">{mission.priority}</td>
                <td className="py-3 pr-4">{mission.status}</td>
                <td className="py-3 pr-4">{formatList(mission.aircraftIds)}</td>
                <td className="py-3 pr-4">{formatList(mission.pilotIds)}</td>
                <td className="py-3 pr-4">{mission.runwayId || "-"}</td>
                <td className="py-3 pr-4">{mission.abortReason || "-"}</td>
                <td className="py-3 pr-4">
                  {mission.isCompleted ? "YES" : "NO"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
