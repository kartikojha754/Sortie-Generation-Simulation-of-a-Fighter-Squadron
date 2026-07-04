import Card from "../common/Card";

function KpiBox({ label, value }) {
  return (
    <div className="rounded-xl border border-green-900/40 bg-[#0B0F0D] p-4">
      <p className="text-sm text-slate-500">{label}</p>
      <p className="mt-2 text-2xl font-bold text-slate-100">{value}</p>
    </div>
  );
}

export default function MaintenanceKpis({ records = [], aircraft = [] }) {
  const completed = records.filter((r) => r.isCompleted).length;
  const pending = records.length - completed;
  const aircraftNeedingMaintenance = aircraft.filter(
    (a) => a.maintenanceRequired,
  ).length;

  return (
    <Card>
      <div className="mb-5">
        <p className="text-xs uppercase tracking-[0.25em] text-green-400">
          Maintenance Overview
        </p>

        <h3 className="mt-1 text-lg font-semibold text-slate-100">
          Maintenance KPIs
        </h3>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <KpiBox label="Total Records" value={records.length} />
        <KpiBox label="Completed" value={completed} />
        <KpiBox label="Pending" value={pending} />
        <KpiBox
          label="Aircraft Needing Maintenance"
          value={aircraftNeedingMaintenance}
        />
      </div>
    </Card>
  );
}
