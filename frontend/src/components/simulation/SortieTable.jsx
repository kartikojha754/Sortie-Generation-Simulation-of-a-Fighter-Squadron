import Card from "../common/Card";

function formatTime(value) {
  if (value === undefined || value === null) return "-";

  const mins = Math.round(Number(value));
  const h = Math.floor(mins / 60);
  const m = mins % 60;

  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

function badge(status) {
  switch (status) {
    case "COMPLETED":
      return "bg-green-500/10 text-green-300 border-green-500/40";

    case "ABORTED":
      return "bg-red-500/10 text-red-300 border-red-500/40";

    case "IN_PROGRESS":
      return "bg-sky-500/10 text-sky-300 border-sky-500/40";

    default:
      return "bg-slate-500/10 text-slate-300 border-slate-500/40";
  }
}

export default function SortieTable({ sorties = [] }) {
  return (
    <Card>
      <div className="mb-6">
        <p className="text-xs uppercase tracking-[0.25em] text-green-400">
          Sorties
        </p>

        <h3 className="mt-1 text-lg font-semibold text-slate-100">
          Sortie Execution Log
        </h3>

        <p className="mt-1 text-sm text-slate-500">
          Individual sortie execution returned by the backend.
        </p>
      </div>

      {sorties.length === 0 ? (
        <div className="rounded-xl border border-dashed border-green-900/40 p-8 text-center">
          <p className="text-slate-400">
            Backend did not return any sortie records.
          </p>

          <p className="mt-2 text-xs text-slate-500">
            This section will populate automatically once sortie generation is
            implemented.
          </p>
        </div>
      ) : (
        <div className="overflow-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-green-900/40 text-slate-400">
              <tr>
                <th className="px-3 py-3 text-left">Sortie</th>
                <th className="px-3 py-3 text-left">Aircraft</th>
                <th className="px-3 py-3 text-left">Pilot</th>
                <th className="px-3 py-3 text-left">Mission</th>
                <th className="px-3 py-3 text-left">Start</th>
                <th className="px-3 py-3 text-left">End</th>
                <th className="px-3 py-3 text-left">Status</th>
              </tr>
            </thead>

            <tbody>
              {sorties.map((sortie) => (
                <tr key={sortie.id} className="border-b border-green-900/20">
                  <td className="px-3 py-3">{sortie.name || sortie.id}</td>

                  <td className="px-3 py-3">{sortie.aircraftId || "-"}</td>

                  <td className="px-3 py-3">{sortie.pilotId || "-"}</td>

                  <td className="px-3 py-3">{sortie.missionId || "-"}</td>

                  <td className="px-3 py-3">{formatTime(sortie.startTime)}</td>

                  <td className="px-3 py-3">{formatTime(sortie.endTime)}</td>

                  <td className="px-3 py-3">
                    <span
                      className={`rounded-full border px-3 py-1 text-xs font-semibold ${badge(
                        sortie.status,
                      )}`}
                    >
                      {sortie.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Card>
  );
}
