import Card from "../common/Card";

function formatTime(value) {
  if (value === undefined || value === null) return "-";

  const totalMinutes = Math.round(Number(value));
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
}

function formatValue(value) {
  if (value === undefined || value === null || value === "") return "-";
  return value;
}

export default function SchedulerLogTable({ schedulerLog = [] }) {
  const sortedLog = [...schedulerLog].sort(
    (a, b) => Number(a.time || 0) - Number(b.time || 0),
  );

  return (
    <Card>
      <div className="mb-5">
        <p className="text-xs uppercase tracking-[0.25em] text-green-400">
          Raw Log
        </p>

        <h3 className="mt-1 text-lg font-semibold text-slate-100">
          Scheduler Decision Table
        </h3>

        <p className="mt-1 text-sm text-slate-500">
          Tabular view of backend scheduler events for debugging and
          explanation.
        </p>
      </div>

      {sortedLog.length === 0 ? (
        <p className="text-sm text-slate-400">No scheduler events available.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1200px] text-left text-sm">
            <thead className="border-b border-green-900/40 text-slate-400">
              <tr>
                <th className="py-3 pr-4">Time</th>
                <th className="py-3 pr-4">Event</th>
                <th className="py-3 pr-4">Mission</th>
                <th className="py-3 pr-4">Priority</th>
                <th className="py-3 pr-4">Required Pilot</th>
                <th className="py-3 pr-4">Wait</th>
                <th className="py-3 pr-4">Aircraft</th>
                <th className="py-3 pr-4">Pilot</th>
                <th className="py-3 pr-4">Runway</th>
                <th className="py-3 pr-4">Sortie</th>
                <th className="py-3 pr-4">Reason</th>
              </tr>
            </thead>

            <tbody>
              {sortedLog.map((entry, index) => (
                <tr
                  key={`${entry.type}-${entry.time}-${index}`}
                  className="border-b border-green-900/20 text-slate-300"
                >
                  <td className="py-3 pr-4 font-semibold text-green-300">
                    {formatTime(entry.time)}
                  </td>

                  <td className="py-3 pr-4">
                    <span className="rounded-full border border-green-500/30 bg-green-500/10 px-3 py-1 text-xs font-semibold text-green-300">
                      {entry.type}
                    </span>
                  </td>

                  <td className="py-3 pr-4">{formatValue(entry.missionId)}</td>
                  <td className="py-3 pr-4">{formatValue(entry.priority)}</td>

                  <td className="py-3 pr-4">
                    {formatValue(entry.requiredPilotRating)}
                  </td>

                  <td className="py-3 pr-4">
                    {entry.waitingTime !== undefined
                      ? `${entry.waitingTime} min`
                      : "-"}
                  </td>

                  <td className="py-3 pr-4">{formatValue(entry.aircraftId)}</td>
                  <td className="py-3 pr-4">{formatValue(entry.pilotId)}</td>
                  <td className="py-3 pr-4">{formatValue(entry.runwayId)}</td>
                  <td className="py-3 pr-4">{formatValue(entry.sortieId)}</td>
                  <td className="py-3 pr-4">{formatValue(entry.reason)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Card>
  );
}
