import Card from "../common/Card";

function formatSimTime(minutes) {
  if (minutes === undefined || minutes === null) return "-";

  const totalMinutes = Math.round(Number(minutes));
  const hours = Math.floor(totalMinutes / 60);
  const mins = totalMinutes % 60;

  return `${String(hours).padStart(2, "0")}:${String(mins).padStart(2, "0")}`;
}

function formatDuration(startTime, endTime) {
  if (startTime === undefined || endTime === undefined) return "-";

  const duration = Math.max(0, Math.round(Number(endTime) - Number(startTime)));
  const hours = Math.floor(duration / 60);
  const mins = duration % 60;

  if (hours === 0) return `${mins} min`;
  if (mins === 0) return `${hours}h`;
  return `${hours}h ${mins}m`;
}

export default function MaintenanceRecordsTable({ records = [] }) {
  return (
    <Card>
      <div className="mb-5">
        <p className="text-xs uppercase tracking-[0.25em] text-green-400">
          Maintenance
        </p>

        <h3 className="mt-1 text-lg font-semibold text-slate-100">
          Maintenance Records
        </h3>

        <p className="mt-1 text-sm text-slate-500">
          Maintenance timeline formatted from backend simulation minutes.
        </p>
      </div>

      {records.length === 0 ? (
        <p className="text-sm text-slate-400">
          No maintenance records returned.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[850px] text-left text-sm">
            <thead className="border-b border-green-900/40 text-slate-400">
              <tr>
                <th className="py-3 pr-4">Aircraft ID</th>
                <th className="py-3 pr-4">Type</th>
                <th className="py-3 pr-4">Start</th>
                <th className="py-3 pr-4">End</th>
                <th className="py-3 pr-4">Duration</th>
                <th className="py-3 pr-4">Completed</th>
                <th className="py-3 pr-4">Remarks</th>
              </tr>
            </thead>

            <tbody>
              {records.map((record) => (
                <tr
                  key={record.id}
                  className="border-b border-green-900/20 text-slate-300"
                >
                  <td className="py-3 pr-4">{record.aircraftId || "-"}</td>
                  <td className="py-3 pr-4">{record.maintenanceType || "-"}</td>
                  <td className="py-3 pr-4">
                    {formatSimTime(record.startTime)}
                  </td>
                  <td className="py-3 pr-4">{formatSimTime(record.endTime)}</td>
                  <td className="py-3 pr-4">
                    {formatDuration(record.startTime, record.endTime)}
                  </td>
                  <td className="py-3 pr-4">
                    {record.isCompleted ? "YES" : "NO"}
                  </td>
                  <td className="py-3 pr-4">{record.remarks || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Card>
  );
}
