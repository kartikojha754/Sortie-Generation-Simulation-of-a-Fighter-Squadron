import SectionHeader from "../components/common/SectionHeader";
import Card from "../components/common/Card";
import { useSimulation } from "../context/SimulationContext";

function pretty(value) {
  if (typeof value !== "string" || !value.trim()) return "Unknown";

  return value
    .toLowerCase()
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function getDamageValue(plan, keys = []) {
  for (const key of keys) {
    const value = Number(plan?.[key]);
    if (Number.isFinite(value)) return value;
  }
  return 0;
}

function resultBadge(valid) {
  return valid
    ? "border-green-500/40 bg-green-500/10 text-green-300"
    : "border-red-500/40 bg-red-500/10 text-red-300";
}

function getMissions(simulationResult) {
  const candidates = [
    simulationResult?.data?.missions,
    simulationResult?.missions,
    simulationResult?.data?.data?.missions,
  ];

  return candidates.find(Array.isArray) || [];
}

function getResults(mission) {
  const candidates = [
    mission?.strikePlanningSummary?.results,
    mission?.strikeAnalysisResults,
    mission?.allStrikePlans,
  ];

  return candidates.find(Array.isArray) || [];
}

export default function StrikeAnalysis() {
  const { simulationResult } = useSimulation();
  const missions = getMissions(simulationResult);
  const strikeMissions = missions.filter(
    (mission) => mission && mission.type === "AIR_TO_GROUND",
  );

  return (
    <div>
      <SectionHeader
        eyebrow="Strike Planning"
        title="Weapon Combination Analysis"
        description="Single and mixed weapon loadouts evaluated against the selected target, required damage, available inventory, and mission time."
      />

      {strikeMissions.length === 0 ? (
        <Card>
          <p className="text-sm text-slate-400">
            Run a new scenario containing an AIR_TO_GROUND mission to view
            combination results.
          </p>
        </Card>
      ) : (
        <div className="space-y-6">
          {strikeMissions.map((mission, missionIndex) => {
            const results = getResults(mission);
            const maximumAllowedTime = Number(
              mission?.maximumAllowedTime ?? mission?.duration ?? 0,
            );

            return (
              <Card key={mission?.id || `strike-mission-${missionIndex}`}>
                <div className="mb-4 flex flex-col gap-2 lg:flex-row lg:items-end lg:justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.22em] text-green-400">
                      {mission?.id || `MISSION-${missionIndex + 1}`}
                    </p>
                    <h3 className="mt-1 text-lg font-semibold text-slate-100">
                      {mission?.name || "Air-to-Ground Mission"}
                    </h3>
                    <p className="mt-1 text-sm text-slate-500">
                      {pretty(mission?.targetType)} · Required damage {Number(
                        mission?.requiredDamagePercentage ?? 100,
                      )}% · Maximum time {maximumAllowedTime || "—"} min
                    </p>
                  </div>
                  <p className="text-sm text-slate-400">
                    {results.length} combinations · {Number(
                      mission?.strikePlanningSummary?.validPlanCount ??
                        results.filter((plan) => plan?.valid).length,
                    )} successful
                  </p>
                </div>

                <div className="mb-5 rounded-lg border border-green-900/30 bg-green-950/10 px-4 py-3 text-sm text-slate-400">
                  <span className="font-semibold text-green-300">
                    How the optimal plan is selected:
                  </span>{" "}
                  only combinations that reach the required damage within the
                  allotted time are considered. The planner first minimizes
                  excess damage, then prefers fewer aircraft, fewer weapons,
                  and finally a shorter total time.
                </div>

                {results.length === 0 ? (
                  <div className="rounded-lg border border-amber-500/30 bg-amber-500/5 px-4 py-3 text-sm text-amber-200">
                    No combination details are available for this stored result.
                    Run the simulation again to generate the strike-analysis
                    table.
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[1180px] text-left text-sm">
                      <thead className="border-b border-green-900/40 text-slate-400">
                        <tr>
                          {[
                            "Plan",
                            "Aircraft",
                            "Combination per Aircraft",
                            "Total Weapons",
                            "Required Damage",
                            "Delivered Damage",
                            "Attack Time",
                            "Total Time",
                            "Max Allotted Time",
                            "Result",
                          ].map((heading) => (
                            <th key={heading} className="py-3 pr-4">
                              {heading}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {results.map((plan, planIndex) => {
                          const planId = plan?.id || `PLAN-${planIndex + 1}`;
                          const selected = mission?.strikePlan?.id === plan?.id;
                          const deliveredDamage = getDamageValue(plan, [
                            "deliveredDamagePercentage",
                            "achievedDamagePercentage",
                            "damagePercentage",
                          ]);
                          const requestedDamage =
                            getDamageValue(plan, [
                              "requestedDamagePercentage",
                            ]) ||
                            Number(
                              mission?.requiredDamagePercentage ?? 100,
                            );
                          const maxTime = Number(
                            plan?.maximumAllowedTime ?? maximumAllowedTime,
                          );

                          return (
                            <tr
                              key={`${planId}-${planIndex}`}
                              className={`border-b border-green-900/20 ${
                                selected
                                  ? "bg-green-500/15 shadow-[inset_4px_0_0_rgba(34,197,94,0.8)]"
                                  : ""
                              }`}
                            >
                              <td className="py-3 pr-4 font-medium text-slate-100">
                                {planId}
                                {selected && (
                                  <span className="ml-2 rounded border border-green-500/40 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-green-300">
                                    Optimal
                                  </span>
                                )}
                              </td>
                              <td className="py-3 pr-4 text-slate-300">
                                {plan?.aircraftCount ?? "—"}
                              </td>
                              <td className="py-3 pr-4 text-slate-300">
                                {plan?.combinationName || "—"}
                              </td>
                              <td className="py-3 pr-4 text-slate-300">
                                {plan?.totalWeaponCount ?? "—"}
                              </td>
                              <td className="py-3 pr-4 text-slate-300">
                                {requestedDamage}%
                              </td>
                              <td className="py-3 pr-4 text-slate-300">
                                {deliveredDamage}%
                              </td>
                              <td className="py-3 pr-4 text-slate-300">
                                {plan?.attackTimeMinutes ?? "—"} min
                              </td>
                              <td className="py-3 pr-4 text-slate-300">
                                {plan?.sortieDuration ?? "—"} min
                              </td>
                              <td className="py-3 pr-4 text-slate-300">
                                {Number.isFinite(maxTime) && maxTime > 0
                                  ? `${maxTime} min`
                                  : "—"}
                              </td>
                              <td className="py-3 pr-4">
                                <span
                                  className={`rounded-full border px-3 py-1 text-xs font-semibold ${resultBadge(
                                    Boolean(plan?.valid),
                                  )}`}
                                >
                                  {plan?.valid ? "SUCCESS" : "FAILURE"}
                                </span>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
