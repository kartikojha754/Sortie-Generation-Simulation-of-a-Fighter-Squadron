import { Link } from "react-router-dom";
import Card from "../common/Card";

function formatList(list) { return !list?.length ? "-" : list.join(", "); }
function formatTime(value) {
  if (value === undefined || value === null) return "-";
  const mins = Math.round(Number(value));
  return `${String(Math.floor(mins / 60)).padStart(2, "0")}:${String(mins % 60).padStart(2, "0")}`;
}
function formatName(value = "") {
  return value.toLowerCase().split("_").map((p) => p.charAt(0).toUpperCase() + p.slice(1)).join(" ");
}
function statusBadge(status) {
  if (status === "COMPLETED") return "bg-green-500/10 text-green-300 border-green-500/40";
  if (status === "ABORTED") return "bg-red-500/10 text-red-300 border-red-500/40";
  if (status === "IN_PROGRESS") return "bg-sky-500/10 text-sky-300 border-sky-500/40";
  if (status === "READY") return "bg-amber-500/10 text-amber-300 border-amber-500/40";
  return "bg-slate-500/10 text-slate-300 border-slate-500/40";
}

function getNumericValue(source, keys, fallback = 0) {
  for (const key of keys) {
    const value = Number(source?.[key]);
    if (Number.isFinite(value)) return value;
  }
  return fallback;
}

function FinalStrikeResult({ mission }) {
  const plan = mission.strikePlan;
  const deliveredDamage = getNumericValue(plan, [
    "deliveredDamagePercentage",
    "achievedDamagePercentage",
    "damagePercentage",
  ]);
  return (
    <div className="rounded-xl border border-green-800/40 bg-green-950/10 p-4">
      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-green-400">Strike Result</p>
          <h4 className="mt-1 font-semibold text-slate-100">{mission.name}</h4>
          <p className="mt-1 text-xs text-slate-500">Target: {formatName(mission.targetType || "Unknown")}</p>
        </div>
        <Link to="/strike-analysis" className="rounded-lg border border-green-500/40 bg-green-500/10 px-4 py-2 text-sm font-semibold text-green-300 hover:bg-green-500/20">
          View All Combinations
        </Link>
      </div>

      {!plan ? (
        <p className="mt-4 rounded-lg border border-red-900/40 bg-red-950/10 p-3 text-sm text-red-300">
          No valid combination: {mission.abortReason || mission.strikePlanningSummary?.failureReason || "Planning failed"}
        </p>
      ) : (
        <>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {[
              ["Result", plan.valid ? "Success" : "Failure"],
              ["Required Damage", `${mission.requiredDamagePercentage}%`],
              ["Delivered Damage", `${deliveredDamage}%`],
              ["Aircraft", plan.aircraftCount],
              ["Total Time", `${plan.sortieDuration} min`],
            ].map(([label, value]) => (
              <div key={label} className="rounded-lg border border-green-900/30 bg-black/20 p-3">
                <p className="text-xs text-slate-500">{label}</p>
                <p className="mt-1 font-semibold text-slate-100">{value}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 rounded-lg border border-green-900/30 p-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-green-400">Weapon Combination</p>
            <p className="mt-2 text-sm text-slate-200">{plan.combinationName}</p>
          </div>
        </>
      )}
    </div>
  );
}

export default function MissionTable({ missions = [] }) {
  const strikeMissions = missions.filter((m) => m.type === "AIR_TO_GROUND");
  return (
    <Card>
      <div className="mb-5">
        <p className="text-xs uppercase tracking-[0.25em] text-green-400">Missions</p>
        <h3 className="mt-1 text-lg font-semibold text-slate-100">Mission Execution Table</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1300px] text-left text-sm">
          <thead className="border-b border-green-900/40 text-slate-400"><tr>
            {['Mission','Type','Priority','Status','Incoming','Actual Start','End','Duration','Req. Rating','Aircraft','Pilots','Runway','Abort Reason'].map((h)=><th key={h} className="py-3 pr-4">{h}</th>)}
          </tr></thead>
          <tbody>{missions.map((mission)=><tr key={mission.id} className="border-b border-green-900/20 text-slate-300">
            <td className="py-3 pr-4"><p className="font-medium text-slate-100">{mission.name || mission.id}</p><p className="text-xs text-slate-500">{mission.id}</p></td>
            <td className="py-3 pr-4">{mission.type}</td><td className="py-3 pr-4">{mission.priority}</td>
            <td className="py-3 pr-4"><span className={`rounded-full border px-3 py-1 text-xs font-semibold ${statusBadge(mission.status)}`}>{mission.status}</span></td>
            <td className="py-3 pr-4">{formatTime(mission.incomingTime)}</td><td className="py-3 pr-4">{formatTime(mission.actualStartTime)}</td><td className="py-3 pr-4">{formatTime(mission.endTime)}</td>
            <td className="py-3 pr-4">{mission.duration} min</td><td className="py-3 pr-4">{mission.requiredPilotRating || "-"}</td>
            <td className="py-3 pr-4">{formatList(mission.aircraftIds)}</td><td className="py-3 pr-4">{formatList(mission.pilotIds)}</td><td className="py-3 pr-4">{mission.runwayId || "-"}</td><td className="py-3 pr-4">{mission.abortReason || "-"}</td>
          </tr>)}</tbody>
        </table>
      </div>
      {strikeMissions.length > 0 && <div className="mt-6 space-y-4 border-t border-green-900/30 pt-6">{strikeMissions.map((m)=><FinalStrikeResult key={m.id} mission={m}/>)}</div>}
    </Card>
  );
}
