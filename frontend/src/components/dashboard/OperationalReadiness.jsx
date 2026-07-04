import Card from "../common/Card";

function count(items = [], predicate) {
  return items.filter(predicate).length;
}

function ReadinessBox({ label, ready, total }) {
  const percent = total ? Math.round((ready / total) * 100) : 0;

  return (
    <div className="rounded-xl border border-green-900/40 bg-[#0B0F0D] p-4">
      <div className="flex justify-between text-sm">
        <span className="text-slate-400">{label}</span>
        <span className="text-green-300">{percent}%</span>
      </div>

      <div className="mt-3 h-2 rounded-full bg-slate-800">
        <div
          className="h-2 rounded-full bg-green-500"
          style={{ width: `${percent}%` }}
        />
      </div>

      <p className="mt-2 text-xs text-slate-500">
        {ready}/{total} ready
      </p>
    </div>
  );
}

export default function OperationalReadiness({ squadron }) {
  const aircraft = squadron?.aircraft || [];
  const pilots = squadron?.pilots || [];
  const groundCrew = squadron?.groundCrew || [];
  const runways = squadron?.runways || [];

  return (
    <Card>
      <div className="mb-5">
        <p className="text-xs uppercase tracking-[0.25em] text-green-400">
          Readiness
        </p>
        <h3 className="mt-1 text-lg font-semibold text-slate-100">
          Operational Readiness
        </h3>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <ReadinessBox
          label="Aircraft"
          ready={count(aircraft, (a) => a.status === "AVAILABLE")}
          total={aircraft.length}
        />
        <ReadinessBox
          label="Pilots"
          ready={count(
            pilots,
            (p) => p.status === "AVAILABLE" || p.status === "RESTING",
          )}
          total={pilots.length}
        />
        <ReadinessBox
          label="Ground Crew"
          ready={count(groundCrew, (g) => g.isAvailable)}
          total={groundCrew.length}
        />
        <ReadinessBox
          label="Runways"
          ready={count(runways, (r) => r.isAvailable)}
          total={runways.length}
        />
      </div>
    </Card>
  );
}
