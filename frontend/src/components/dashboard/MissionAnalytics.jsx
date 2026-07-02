import { FiBarChart2, FiLayers, FiTarget, FiTrendingUp } from "react-icons/fi";

import Card from "../common/Card";
import { useSimulation } from "../../context/SimulationContext";

const getMissionType = (mission) => {
  return String(
    mission?.type || mission?.missionType || "UNKNOWN",
  ).toUpperCase();
};

const getPercentage = (value, total) => {
  if (!total) return 0;
  return Math.round((value / total) * 100);
};

const getComplexity = (uniqueTypes) => {
  if (uniqueTypes <= 1) return "Low";
  if (uniqueTypes === 2) return "Medium";
  return "High";
};

const getComplexityTone = (complexity) => {
  if (complexity === "Low") return "text-emerald-400";
  if (complexity === "Medium") return "text-amber-400";
  return "text-red-400";
};

const MissionAnalytics = () => {
  const { simulationResult } = useSimulation();

  const missions = simulationResult?.missions || [];
  const totalMissions = missions.length;

  const distribution = missions.reduce((acc, mission) => {
    const type = getMissionType(mission);
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {});

  const distributionEntries = Object.entries(distribution).sort(
    (a, b) => b[1] - a[1],
  );

  const dominantType = distributionEntries?.[0]?.[0] || "—";
  const dominantCount = distributionEntries?.[0]?.[1] || 0;

  const uniqueTypes = distributionEntries.length;
  const complexity = getComplexity(uniqueTypes);
  const complexityTone = getComplexityTone(complexity);

  return (
    <Card>
      <div className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-sky-400">
          Mission Mix
        </p>

        <h2 className="mt-2 text-xl font-semibold text-white">
          Mission Distribution
        </h2>

        <p className="mt-1 text-sm text-slate-400">
          Breakdown of mission types and scenario complexity from generated
          sorties.
        </p>
      </div>

      {totalMissions === 0 ? (
        <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4 text-sm text-slate-400">
          No mission distribution available. Run a simulation to view mission
          mix.
        </div>
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4">
              <div className="mb-3 text-xl text-sky-400">
                <FiTarget />
              </div>

              <p className="text-2xl font-bold text-white">{dominantType}</p>

              <p className="mt-1 text-sm text-slate-500">
                Dominant Mission Type
              </p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4">
              <div className="mb-3 text-xl text-violet-400">
                <FiLayers />
              </div>

              <p className="text-2xl font-bold text-white">{uniqueTypes}</p>

              <p className="mt-1 text-sm text-slate-500">
                Unique Mission Types
              </p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4">
              <div className={`mb-3 text-xl ${complexityTone}`}>
                <FiTrendingUp />
              </div>

              <p className={`text-2xl font-bold ${complexityTone}`}>
                {complexity}
              </p>

              <p className="mt-1 text-sm text-slate-500">Scenario Complexity</p>
            </div>
          </div>

          <div className="mt-5 space-y-3">
            {distributionEntries.map(([type, count]) => {
              const percentage = getPercentage(count, totalMissions);

              return (
                <div
                  key={type}
                  className="rounded-xl border border-slate-800 bg-slate-950/60 p-4"
                >
                  <div className="mb-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-sky-500/30 bg-sky-500/10 text-sky-400">
                        <FiBarChart2 />
                      </div>

                      <p className="text-sm font-semibold text-white">{type}</p>
                    </div>

                    <span className="text-sm font-semibold text-sky-400">
                      {count} Missions
                    </span>
                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-slate-800">
                    <div
                      className="h-full rounded-full bg-sky-400"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>

                  <p className="mt-2 text-xs text-slate-500">
                    {percentage}% of generated missions
                  </p>
                </div>
              );
            })}
          </div>

          <p className="mt-4 text-xs text-slate-500">
            Dominant type count: {dominantCount} / {totalMissions} missions
          </p>
        </>
      )}
    </Card>
  );
};

export default MissionAnalytics;
