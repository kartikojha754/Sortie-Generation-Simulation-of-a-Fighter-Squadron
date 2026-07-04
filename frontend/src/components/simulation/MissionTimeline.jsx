import Card from "../common/Card";

function formatSimTime(minutes) {
  if (minutes === undefined || minutes === null) return "-";

  const totalMinutes = Math.round(Number(minutes));
  const hours = Math.floor(totalMinutes / 60);
  const mins = totalMinutes % 60;

  return `${String(hours).padStart(2, "0")}:${String(mins).padStart(2, "0")}`;
}

function buildTimelineEvents(missions = [], maintenanceRecords = []) {
  const missionEvents = missions.flatMap((mission) => {
    const events = [];

    if (mission.scheduledStartTime !== undefined) {
      events.push({
        time: mission.scheduledStartTime,
        title: `${mission.name || mission.id} Scheduled`,
        description: `${mission.type} / ${mission.priority}`,
        status: mission.status,
      });
    }

    if (
      mission.actualStartTime !== undefined &&
      mission.actualStartTime !== null
    ) {
      events.push({
        time: mission.actualStartTime,
        title: `${mission.name || mission.id} Started`,
        description: `Aircraft: ${
          mission.aircraftIds?.join(", ") || "-"
        } | Pilots: ${mission.pilotIds?.join(", ") || "-"}`,
        status: "IN_PROGRESS",
      });
    }

    if (mission.endTime !== undefined && mission.endTime !== null) {
      events.push({
        time: mission.endTime,
        title: `${mission.name || mission.id} Ended`,
        description: mission.abortReason
          ? `Aborted: ${mission.abortReason}`
          : mission.isCompleted
            ? "Mission completed successfully"
            : "Mission ended",
        status: mission.status,
      });
    }

    return events;
  });

  const maintenanceEvents = maintenanceRecords.flatMap((record) => {
    const events = [];

    if (record.startTime !== undefined && record.startTime !== null) {
      events.push({
        time: record.startTime,
        title: `Maintenance Started`,
        description: `${record.aircraftId} - ${record.maintenanceType}`,
        status: "MAINTENANCE",
      });
    }

    if (record.endTime !== undefined && record.endTime !== null) {
      events.push({
        time: record.endTime,
        title: `Maintenance Completed`,
        description: `${record.aircraftId} - ${record.remarks || "Completed"}`,
        status: "COMPLETED",
      });
    }

    return events;
  });

  return [...missionEvents, ...maintenanceEvents].sort(
    (a, b) => Number(a.time) - Number(b.time),
  );
}

function getStatusClass(status) {
  if (status === "COMPLETED") return "text-green-300 border-green-500/40";
  if (status === "ABORTED") return "text-red-300 border-red-500/40";
  if (status === "MAINTENANCE") return "text-amber-300 border-amber-500/40";
  if (status === "IN_PROGRESS") return "text-sky-300 border-sky-500/40";
  return "text-slate-300 border-green-900/40";
}

export default function MissionTimeline({
  missions = [],
  maintenanceRecords = [],
}) {
  const events = buildTimelineEvents(missions, maintenanceRecords);

  return (
    <Card>
      <div className="mb-5">
        <p className="text-xs uppercase tracking-[0.25em] text-green-400">
          Timeline
        </p>

        <h3 className="mt-1 text-lg font-semibold text-slate-100">
          Mission Timeline
        </h3>

        <p className="mt-1 text-sm text-slate-500">
          Chronological view of mission and maintenance events.
        </p>
      </div>

      {events.length === 0 ? (
        <p className="text-sm text-slate-400">No timeline events available.</p>
      ) : (
        <div className="max-h-[520px] space-y-4 overflow-y-auto pr-2">
          {events.map((event, index) => (
            <div
              key={`${event.title}-${event.time}-${index}`}
              className="flex gap-4"
            >
              <div className="w-16 shrink-0 pt-1 text-sm font-semibold text-green-300">
                {formatSimTime(event.time)}
              </div>

              <div className="relative flex-1 border-l border-green-900/40 pb-4 pl-5">
                <span className="absolute -left-[5px] top-2 h-2.5 w-2.5 rounded-full bg-green-400" />

                <div
                  className={[
                    "rounded-xl border bg-[#0B0F0D] p-4",
                    getStatusClass(event.status),
                  ].join(" ")}
                >
                  <p className="text-sm font-semibold text-slate-100">
                    {event.title}
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    {event.description}
                  </p>
                  <p className="mt-2 text-xs uppercase tracking-wide">
                    {event.status}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}
