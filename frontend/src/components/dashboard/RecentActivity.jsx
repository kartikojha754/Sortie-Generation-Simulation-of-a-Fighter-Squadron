import {
  FiActivity,
  FiCheckCircle,
  FiClock,
  FiPlayCircle,
} from "react-icons/fi";

import Card from "../common/Card";

const activities = [
  {
    title: "Simulation completed",
    description: "18 missions generated with 94.4% success rate.",
    time: "Latest run",
    icon: <FiCheckCircle />,
    tone: "text-emerald-400",
  },
  {
    title: "Scenario configured",
    description: "Aircraft, pilots, weather, and abort rules updated.",
    time: "Before run",
    icon: <FiActivity />,
    tone: "text-sky-400",
  },
  {
    title: "Simulation engine ready",
    description: "Backend engine available for new sortie generation.",
    time: "System status",
    icon: <FiPlayCircle />,
    tone: "text-emerald-400",
  },
  {
    title: "Dashboard refreshed",
    description: "Operational overview loaded successfully.",
    time: "Now",
    icon: <FiClock />,
    tone: "text-amber-400",
  },
];

const RecentActivity = () => {
  return (
    <Card>
      <div className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-sky-400">
          Activity
        </p>

        <h2 className="mt-2 text-xl font-semibold text-white">
          Recent Activity
        </h2>

        <p className="mt-1 text-sm text-slate-400">
          Latest high-level operational events.
        </p>
      </div>

      <div className="space-y-4">
        {activities.map((activity) => (
          <div
            key={activity.title}
            className="flex gap-4 rounded-xl border border-slate-800 bg-slate-950/60 p-4"
          >
            <div
              className={`mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-slate-700 bg-slate-900 text-lg ${activity.tone}`}
            >
              {activity.icon}
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-sm font-semibold text-white">
                  {activity.title}
                </h3>

                <span className="text-xs text-slate-500">{activity.time}</span>
              </div>

              <p className="mt-1 text-sm leading-relaxed text-slate-400">
                {activity.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default RecentActivity;
