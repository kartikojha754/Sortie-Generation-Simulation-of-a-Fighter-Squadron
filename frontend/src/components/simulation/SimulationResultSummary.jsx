import Card from "../common/Card";

function formatPercent(value) {
  if (value === undefined || value === null) return "0%";
  return `${Math.round(value * 100)}%`;
}

export default function SimulationResultSummary({ statistics }) {
  const stats = [
    {
      label: "Total Missions",
      value: statistics?.totalMissions ?? 0,
    },
    {
      label: "Completed Sorties",
      value: statistics?.completedSorties ?? 0,
    },
    {
      label: "Aborted Missions",
      value: statistics?.abortedMissions ?? 0,
    },
    {
      label: "Success Rate",
      value: formatPercent(statistics?.successRate),
    },
  ];

  return (
    <Card>
      <div className="mb-5">
        <p className="text-xs uppercase tracking-[0.25em] text-green-400">
          Summary
        </p>

        <h3 className="mt-1 text-lg font-semibold text-slate-100">
          Simulation Result Summary
        </h3>

        <p className="mt-1 text-sm text-slate-500">
          High-level result returned by the backend simulation engine.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => (
          <div
            key={item.label}
            className="rounded-xl border border-green-900/40 bg-[#0B0F0D] p-4"
          >
            <p className="text-sm text-slate-500">{item.label}</p>
            <p className="mt-2 text-2xl font-bold text-slate-100">
              {item.value}
            </p>
          </div>
        ))}
      </div>
    </Card>
  );
}
