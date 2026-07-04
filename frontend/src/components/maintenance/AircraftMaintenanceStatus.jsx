import Card from "../common/Card";

function badge(required) {
  return required
    ? "border-red-500/40 bg-red-500/10 text-red-300"
    : "border-green-500/40 bg-green-500/10 text-green-300";
}

export default function AircraftMaintenanceStatus({
  aircraft = [],
  records = [],
}) {
  return (
    <Card>
      <div className="mb-5">
        <p className="text-xs uppercase tracking-[0.25em] text-green-400">
          Aircraft
        </p>

        <h3 className="mt-1 text-lg font-semibold text-slate-100">
          Aircraft Maintenance Status
        </h3>

        <p className="mt-1 text-sm text-slate-500">
          Aircraft maintenance state from final squadron output.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {aircraft.map((item) => {
          const aircraftRecords = records.filter(
            (r) => r.aircraftId === item.id,
          );

          return (
            <div
              key={item.id}
              className="rounded-xl border border-green-900/40 bg-[#0B0F0D] p-5"
            >
              <div className="mb-4 flex items-start justify-between">
                <div>
                  <h4 className="text-xl font-bold text-slate-100">
                    {item.tailNumber || item.id}
                  </h4>
                  <p className="text-xs text-slate-500">
                    {item.aircraftType || "Aircraft"}
                  </p>
                </div>

                <span
                  className={[
                    "rounded-full border px-3 py-1 text-xs font-semibold",
                    badge(item.maintenanceRequired),
                  ].join(" ")}
                >
                  {item.maintenanceRequired ? "REQUIRED" : "CLEAR"}
                </span>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-500">Flight Hours</span>
                  <span>{item.flightHours ?? 0}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-500">Status</span>
                  <span>{item.status || "-"}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-500">Maintenance Records</span>
                  <span>{aircraftRecords.length}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
