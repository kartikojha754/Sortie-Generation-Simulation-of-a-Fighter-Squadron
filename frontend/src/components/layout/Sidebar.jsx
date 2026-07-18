import { NavLink } from "react-router-dom";
import {
  MdDashboard,
  MdBuild,
  MdOutlineScience,
  MdSettings,
  MdTimeline,
  MdHistory,
  MdTableChart,
} from "react-icons/md";

const navItems = [
  { label: "Scenario Builder", path: "/scenario-builder", icon: MdBuild },
  { label: "Dashboard", path: "/dashboard", icon: MdDashboard },
  { label: "Simulation", path: "/simulation", icon: MdOutlineScience },
  { label: "Strike Analysis", path: "/strike-analysis", icon: MdTableChart },
  { label: "Scheduler", path: "/scheduler", icon: MdTimeline },
  { label: "Maintenance", path: "/maintenance", icon: MdSettings },
  { label: "History", path: "/history", icon: MdHistory },
];

export default function Sidebar() {
  return (
    <aside className="sticky top-0 hidden h-screen w-72 border-r border-green-400/30 bg-[#07120B]/95 p-5 shadow-[0_0_45px_rgba(34,197,94,0.12)] backdrop-blur-xl lg:block">
      <div className="mb-8 rounded-2xl border border-green-400/30 bg-gradient-to-br from-green-400/15 to-transparent p-4 shadow-[0_0_35px_rgba(34,197,94,0.12)]">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-green-300/40 bg-green-400/20 text-2xl text-green-200 shadow-[0_0_28px_rgba(34,197,94,0.22)]">
          ✦
        </div>

        <h1 className="text-2xl font-black tracking-wide text-green-300">
          SORTIE OPS
        </h1>

        <p className="mt-1 text-sm text-slate-300">
          Tactical Simulation Console
        </p>

        <div className="mt-4 flex items-center gap-2 rounded-full border border-green-300/30 bg-[#031006] px-3 py-2 text-xs font-semibold text-green-200">
          <span className="h-2 w-2 rounded-full bg-green-300 shadow-[0_0_14px_rgba(34,197,94,1)]" />
          SYSTEM ONLINE
        </div>
      </div>

      <nav className="space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                [
                  "group relative flex items-center gap-3 overflow-hidden rounded-xl border px-4 py-3 text-sm transition duration-200",
                  isActive
                    ? "border-green-300/45 bg-green-400/20 text-green-100 shadow-[0_0_28px_rgba(34,197,94,0.2)]"
                    : "border-green-400/0 text-slate-300 hover:border-green-400/25 hover:bg-green-400/10 hover:text-green-200",
                ].join(" ")
              }
            >
              <span className="absolute inset-y-0 left-0 w-1 bg-green-300 opacity-0 shadow-[0_0_12px_rgba(34,197,94,1)] transition group-hover:opacity-100" />
              <Icon className="text-xl" />
              <span>{item.label}</span>
              <span className="ml-auto h-1.5 w-1.5 rounded-full bg-green-300/70 shadow-[0_0_10px_rgba(34,197,94,0.8)]" />
            </NavLink>
          );
        })}
      </nav>

      <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-green-400/25 bg-[#031006]/90 p-4 shadow-[0_0_28px_rgba(34,197,94,0.08)]">
        <p className="text-[10px] uppercase tracking-[0.28em] text-green-300/70">
          Ops Mode
        </p>
        <p className="mt-1 text-sm font-semibold text-green-100">
          Simulation Control
        </p>
      </div>
    </aside>
  );
}
