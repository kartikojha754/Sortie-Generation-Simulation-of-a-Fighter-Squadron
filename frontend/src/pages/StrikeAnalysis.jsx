import SectionHeader from "../components/common/SectionHeader";
import Card from "../components/common/Card";
import { useSimulation } from "../context/SimulationContext";

function pretty(value = "") {
  return value.toLowerCase().split("_").map((p) => p.charAt(0).toUpperCase() + p.slice(1)).join(" ");
}
function badge(classification) {
  if (classification === "TARGET_DESTROYED") return "border-green-500/40 bg-green-500/10 text-green-300";
  if (classification === "PARTIAL_SUCCESS") return "border-amber-500/40 bg-amber-500/10 text-amber-300";
  return "border-red-500/40 bg-red-500/10 text-red-300";
}

export default function StrikeAnalysis() {
  const { simulationResult } = useSimulation();
  const missions = simulationResult?.data?.missions || [];
  const strikeMissions = missions.filter((m) => m.type === "AIR_TO_GROUND");

  return (
    <div>
      <SectionHeader eyebrow="Strike Planning" title="Weapon Combination Analysis" description="Every generated single and mixed weapon loadout evaluated against the target, damage objective, and time limit." />
      {strikeMissions.length === 0 ? (
        <Card><p className="text-sm text-slate-400">Run a scenario containing an AIR_TO_GROUND mission to view combination results.</p></Card>
      ) : (
        <div className="space-y-6">
          {strikeMissions.map((mission) => {
            const results = mission.strikePlanningSummary?.results || [];
            return (
              <Card key={mission.id}>
                <div className="mb-5 flex flex-col gap-2 lg:flex-row lg:items-end lg:justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.22em] text-green-400">{mission.id}</p>
                    <h3 className="mt-1 text-lg font-semibold text-slate-100">{mission.name}</h3>
                    <p className="mt-1 text-sm text-slate-500">{pretty(mission.targetType)} · Required damage {mission.requiredDamagePercentage}% · Maximum time {mission.maximumAllowedTime} min</p>
                  </div>
                  <p className="text-sm text-slate-400">{results.length} combinations · {mission.strikePlanningSummary?.validPlanCount || 0} valid</p>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[1450px] text-left text-sm">
                    <thead className="border-b border-green-900/40 text-slate-400"><tr>
                      {['Plan','Aircraft','Combination per Aircraft','Total Weapons','Attack Power','Damage Possible','Required Damage','Attack Time','Travel Time','Total Time','Time Status','Classification','Selected'].map((h)=><th key={h} className="py-3 pr-4">{h}</th>)}
                    </tr></thead>
                    <tbody>{results.map((plan) => {
                      const selected = mission.strikePlan?.id === plan.id;
                      return <tr key={plan.id} className={`border-b border-green-900/20 ${selected ? 'bg-green-500/10' : ''}`}>
                        <td className="py-3 pr-4 font-medium text-slate-100">{plan.id}</td>
                        <td className="py-3 pr-4 text-slate-300">{plan.aircraftCount}</td>
                        <td className="py-3 pr-4 text-slate-300">{plan.combinationName}</td>
                        <td className="py-3 pr-4 text-slate-300">{plan.totalWeaponCount}</td>
                        <td className="py-3 pr-4 text-slate-300">{plan.totalAttackPower}</td>
                        <td className="py-3 pr-4 text-slate-300">{plan.achievedDamagePercentage}%</td>
                        <td className="py-3 pr-4 text-slate-300">{plan.requestedDamagePercentage}%</td>
                        <td className="py-3 pr-4 text-slate-300">{plan.attackTimeMinutes} min</td>
                        <td className="py-3 pr-4 text-slate-300">{plan.roundTripTravelTimeMinutes} min</td>
                        <td className="py-3 pr-4 text-slate-300">{plan.sortieDuration} min</td>
                        <td className="py-3 pr-4"><span className={plan.withinTime ? 'text-green-300' : 'text-red-300'}>{plan.withinTime ? 'WITHIN TIME' : 'TIME EXCEEDED'}</span></td>
                        <td className="py-3 pr-4"><span className={`rounded-full border px-3 py-1 text-xs font-semibold ${badge(plan.classification)}`}>{pretty(plan.classification)}</span></td>
                        <td className="py-3 pr-4 text-green-300">{selected ? 'BEST PLAN' : '-'}</td>
                      </tr>;
                    })}</tbody>
                  </table>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
