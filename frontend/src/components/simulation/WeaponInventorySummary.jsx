import Card from "../common/Card";

const LABELS = {
  AIRCRAFT_GUN: "Aircraft Guns",
  LIGHT_BOMB: "Light Bombs",
  HEAVY_BOMB: "Heavy Bombs",
  AIR_TO_GROUND_MISSILE: "AG Missiles",
  HEAVY_AIR_TO_GROUND_MISSILE: "Heavy AG Missiles",
};

export default function WeaponInventorySummary({ summary }) {
  if (!summary) return null;

  const weaponTypes = Object.keys(summary.initial || {});

  return (
    <Card>
      <div className="mb-5">
        <p className="text-xs uppercase tracking-[0.25em] text-green-400">
          Strike Resources
        </p>
        <h3 className="mt-1 text-lg font-semibold text-slate-100">
          Weapon Inventory Consumption
        </h3>
        <p className="mt-1 text-sm text-slate-500">
          Weapons are selected using the live squadron inventory and permanently
          consumed when an AIR_TO_GROUND mission is allocated.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {weaponTypes.map((type) => (
          <div
            key={type}
            className="rounded-xl border border-green-900/30 bg-[#0B0F0D] p-4"
          >
            <p className="text-sm font-medium text-slate-200">
              {LABELS[type] || type.replaceAll("_", " ")}
            </p>
            <div className="mt-3 space-y-2 text-sm">
              <div className="flex justify-between text-slate-400">
                <span>Initial</span>
                <span className="text-slate-100">{summary.initial?.[type] ?? 0}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Consumed</span>
                <span className="text-amber-300">{summary.consumed?.[type] ?? 0}</span>
              </div>
              <div className="flex justify-between border-t border-green-900/30 pt-2 text-slate-400">
                <span>Remaining</span>
                <span className="font-semibold text-green-300">
                  {summary.remaining?.[type] ?? 0}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
