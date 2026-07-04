import Card from "../common/Card";

function countBy(items = [], predicate) {
  return items.filter(predicate).length;
}

function StatBox({ label, value, helper }) {
  return (
    <div className="rounded-xl border border-green-900/40 bg-[#0B0F0D] p-4">
      <p className="text-sm text-slate-500">{label}</p>
      <p className="mt-2 text-2xl font-bold text-slate-100">{value}</p>
      {helper && <p className="mt-1 text-xs text-slate-500">{helper}</p>}
    </div>
  );
}

export default function SquadronStateSummary({ squadron }) {
  const aircraft = squadron?.aircraft || [];
  const pilots = squadron?.pilots || [];
  const groundCrew = squadron?.groundCrew || [];
  const runways = squadron?.runways || [];

  const availableAircraft = countBy(
    aircraft,
    (item) => item.status === "AVAILABLE",
  );

  const availablePilots = countBy(
    pilots,
    (item) => item.status === "AVAILABLE" || item.status === "RESTING",
  );

  const availableGroundCrew = countBy(
    groundCrew,
    (item) => item.isAvailable === true,
  );

  const availableRunways = countBy(
    runways,
    (item) => item.isAvailable === true,
  );

  return (
    <Card>
      <div className="mb-5">
        <p className="text-xs uppercase tracking-[0.25em] text-green-400">
          Squadron State
        </p>

        <h3 className="mt-1 text-lg font-semibold text-slate-100">
          Final Squadron State
        </h3>

        <p className="mt-1 text-sm text-slate-500">
          Final resource state after backend simulation execution.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatBox
          label="Aircraft Available"
          value={`${availableAircraft}/${aircraft.length}`}
          helper="Aircraft with AVAILABLE status"
        />

        <StatBox
          label="Pilots Ready"
          value={`${availablePilots}/${pilots.length}`}
          helper="AVAILABLE or RESTING pilots"
        />

        <StatBox
          label="Ground Crew Available"
          value={`${availableGroundCrew}/${groundCrew.length}`}
          helper="Crew marked available"
        />

        <StatBox
          label="Runways Available"
          value={`${availableRunways}/${runways.length}`}
          helper="Runways marked available"
        />
      </div>
    </Card>
  );
}
