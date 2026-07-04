import Card from "../common/Card";

function formatTime(value) {
  if (value === undefined || value === null) return "-";

  const totalMinutes = Math.round(Number(value));
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
}

function getEventStyle(type = "") {
  if (type.includes("ABORTED")) {
    return {
      dot: "bg-red-400",
      border: "border-red-500/40",
      text: "text-red-300",
      label: "Abort",
    };
  }

  if (type === "MISSION_DISPATCHED") {
    return {
      dot: "bg-green-400",
      border: "border-green-500/40",
      text: "text-green-300",
      label: "Dispatch",
    };
  }

  if (type === "MISSION_WAITING_FOR_RESOURCES") {
    return {
      dot: "bg-amber-400",
      border: "border-amber-500/40",
      text: "text-amber-300",
      label: "Waiting",
    };
  }

  if (type === "SORTIE_TAKEOFF" || type === "SORTIE_LANDED") {
    return {
      dot: "bg-sky-400",
      border: "border-sky-500/40",
      text: "text-sky-300",
      label: "Sortie",
    };
  }

  if (
    type === "AIRCRAFT_AVAILABLE_AFTER_MAINTENANCE" ||
    type === "PILOT_AVAILABLE_AFTER_REST"
  ) {
    return {
      dot: "bg-purple-400",
      border: "border-purple-500/40",
      text: "text-purple-300",
      label: "Recovery",
    };
  }

  return {
    dot: "bg-slate-400",
    border: "border-green-900/40",
    text: "text-slate-300",
    label: "Event",
  };
}

function formatTitle(entry) {
  const type = entry.type || "UNKNOWN_EVENT";

  const readable = type
    .replaceAll("_", " ")
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());

  if (entry.missionId) {
    return `${readable} · ${entry.missionId}`;
  }

  if (entry.aircraftId) {
    return `${readable} · ${entry.aircraftId}`;
  }

  if (entry.pilotId) {
    return `${readable} · ${entry.pilotId}`;
  }

  return readable;
}

function formatDetails(entry) {
  const details = [];

  if (entry.priority) details.push(`Priority: ${entry.priority}`);
  if (entry.requiredPilotRating)
    details.push(`Required Pilot: ${entry.requiredPilotRating}`);
  if (entry.waitingTime !== undefined)
    details.push(`Waited: ${entry.waitingTime} min`);
  if (entry.aircraftId) details.push(`Aircraft: ${entry.aircraftId}`);
  if (entry.pilotId) details.push(`Pilot: ${entry.pilotId}`);
  if (entry.runwayId) details.push(`Runway: ${entry.runwayId}`);
  if (entry.sortieId) details.push(`Sortie: ${entry.sortieId}`);
  if (entry.reason) details.push(`Reason: ${entry.reason}`);

  if (details.length === 0) {
    return "Scheduler event recorded.";
  }

  return details.join(" · ");
}

export default function SchedulerTimelinePanel({ schedulerLog = [] }) {
  const sortedLog = [...schedulerLog].sort(
    (a, b) => Number(a.time || 0) - Number(b.time || 0),
  );

  return (
    <Card>
      <div className="mb-5">
        <p className="text-xs uppercase tracking-[0.25em] text-green-400">
          Decision Timeline
        </p>

        <h3 className="mt-1 text-lg font-semibold text-slate-100">
          Scheduler Event Timeline
        </h3>

        <p className="mt-1 text-sm text-slate-500">
          Chronological explanation of how the scheduler reacted to mission
          arrivals, resource availability, waits, dispatches, and completions.
        </p>
      </div>

      {sortedLog.length === 0 ? (
        <div className="rounded-xl border border-dashed border-green-900/40 p-8 text-center">
          <p className="text-sm text-slate-400">
            No scheduler log returned by backend.
          </p>
        </div>
      ) : (
        <div className="max-h-[680px] space-y-4 overflow-y-auto pr-2">
          {sortedLog.map((entry, index) => {
            const style = getEventStyle(entry.type);

            return (
              <div
                key={`${entry.type}-${entry.time}-${index}`}
                className="flex gap-4"
              >
                <div className="w-16 shrink-0 pt-1 text-sm font-semibold text-green-300">
                  {formatTime(entry.time)}
                </div>

                <div className="relative flex-1 border-l border-green-900/40 pb-4 pl-5">
                  <span
                    className={`absolute -left-[5px] top-2 h-2.5 w-2.5 rounded-full ${style.dot}`}
                  />

                  <div
                    className={`rounded-xl border bg-[#0B0F0D] p-4 ${style.border}`}
                  >
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <p className="text-sm font-semibold text-slate-100">
                          {formatTitle(entry)}
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                          {formatDetails(entry)}
                        </p>
                      </div>

                      <span
                        className={`w-fit rounded-full border px-3 py-1 text-xs font-semibold ${style.border} ${style.text}`}
                      >
                        {style.label}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </Card>
  );
}
