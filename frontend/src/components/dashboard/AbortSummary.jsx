import Card from "../common/Card";

function AbortBox({ label, value, total }) {
  const percent = total ? Math.round((value / total) * 100) : 0;

  return (
    <div className="rounded-xl border border-green-900/40 bg-[#0B0F0D] p-4">
      <p className="text-sm text-slate-400">{label}</p>
      <p className="mt-2 text-2xl font-bold text-slate-100">{value}</p>
      <p className="mt-1 text-xs text-slate-500">{percent}% of aborts</p>
    </div>
  );
}

export default function AbortSummary({ statistics }) {
  const total = statistics?.abortedMissions ?? 0;

  return (
    <Card>
      <div className="mb-5">
        <p className="text-xs uppercase tracking-[0.25em] text-green-400">
          Risk
        </p>
        <h3 className="mt-1 text-lg font-semibold text-slate-100">
          Abort Summary
        </h3>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <AbortBox
          label="Ground Aborts"
          value={statistics?.groundAborts ?? 0}
          total={total}
        />
        <AbortBox
          label="Air Aborts"
          value={statistics?.airAborts ?? 0}
          total={total}
        />
        <AbortBox
          label="Weather Aborts"
          value={statistics?.weatherAborts ?? 0}
          total={total}
        />
      </div>
    </Card>
  );
}
