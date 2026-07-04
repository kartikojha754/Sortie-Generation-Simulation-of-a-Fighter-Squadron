import Card from "../common/Card";

function percent(value) {
  return `${Math.round((value ?? 0) * 100)}%`;
}

function KpiBox({ label, value }) {
  return (
    <div className="rounded-xl border border-green-900/40 bg-[#0B0F0D] p-4">
      <p className="text-sm text-slate-500">{label}</p>
      <p className="mt-2 text-2xl font-bold text-slate-100">{value}</p>
    </div>
  );
}

export default function DashboardKpis({ statistics }) {
  return (
    <Card>
      <div className="mb-5">
        <p className="text-xs uppercase tracking-[0.25em] text-green-400">
          Command Overview
        </p>
        <h3 className="mt-1 text-lg font-semibold text-slate-100">
          Mission KPIs
        </h3>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <KpiBox label="Total Missions" value={statistics?.totalMissions ?? 0} />
        <KpiBox
          label="Completed Sorties"
          value={statistics?.completedSorties ?? 0}
        />
        <KpiBox
          label="Aborted Missions"
          value={statistics?.abortedMissions ?? 0}
        />
        <KpiBox label="Success Rate" value={percent(statistics?.successRate)} />
      </div>
    </Card>
  );
}
