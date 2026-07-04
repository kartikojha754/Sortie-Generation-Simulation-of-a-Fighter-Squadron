import Card from "../common/Card";

function time(minutes) {
  if (minutes === undefined || minutes === null) return "-";

  const total = Math.round(Number(minutes));
  const h = Math.floor(total / 60);
  const m = total % 60;

  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

export default function RecentActivity({
  missions = [],
  maintenanceRecords = [],
}) {
  const missionEvents = missions.slice(-5).map((m) => ({
    id: `mission-${m.id}`,
    label: `${m.name} ${m.status}`,
    detail: m.abortReason || m.type,
    time: time(m.endTime || m.actualStartTime || m.scheduledStartTime),
  }));

  const maintenanceEvents = maintenanceRecords.slice(-3).map((r) => ({
    id: `maintenance-${r.id}`,
    label: `${r.aircraftId} Maintenance`,
    detail: r.remarks || r.maintenanceType,
    time: time(r.endTime || r.startTime),
  }));

  const events = [...missionEvents, ...maintenanceEvents].slice(-6).reverse();

  return (
    <Card>
      <div className="mb-5">
        <p className="text-xs uppercase tracking-[0.25em] text-green-400">
          Activity
        </p>
        <h3 className="mt-1 text-lg font-semibold text-slate-100">
          Recent Activity
        </h3>
      </div>

      <div className="space-y-3">
        {events.map((event) => (
          <div
            key={event.id}
            className="rounded-xl border border-green-900/40 bg-[#0B0F0D] p-4"
          >
            <div className="flex justify-between gap-4">
              <p className="text-sm font-semibold text-slate-200">
                {event.label}
              </p>
              <p className="text-xs text-green-300">{event.time}</p>
            </div>
            <p className="mt-1 text-xs text-slate-500">{event.detail}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}
