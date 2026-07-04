// src/components/layout/Sidebar.jsx

import { NavLink } from "react-router-dom";
import {
  MdDashboard,
  MdBuild,
  MdOutlineScience,
  MdSettings,
} from "react-icons/md";

const navItems = [
  {
    label: "Scenario Builder",
    path: "/scenario-builder",
    icon: MdBuild,
  },
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: MdDashboard,
  },
  {
    label: "Simulation",
    path: "/simulation",
    icon: MdOutlineScience,
  },
  {
    label: "Maintenance",
    path: "/maintenance",
    icon: MdSettings,
  },
];

export default function Sidebar() {
  return (
    <aside className="sticky top-0 hidden h-screen w-72 border-r border-green-900/40 bg-[#111713] p-5 lg:block">
      <div className="mb-8">
        <h1 className="text-xl font-bold tracking-wide text-green-400">
          SORTIE OPS
        </h1>
        <p className="mt-1 text-sm text-slate-400">
          Tactical Simulation Console
        </p>
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
                  "flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition",
                  isActive
                    ? "bg-green-500/15 text-green-300 border border-green-500/30"
                    : "text-slate-400 hover:bg-green-500/10 hover:text-green-300",
                ].join(" ")
              }
            >
              <Icon className="text-xl" />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}
