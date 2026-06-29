import { NavLink, Outlet } from "react-router-dom";
import {
  MdAirplanemodeActive,
  MdDashboard,
  MdTune,
  MdRadar,
} from "react-icons/md";

function MainLayout() {
  const navItems = [
    {
      label: "Simulation",
      path: "/",
      icon: <MdAirplanemodeActive />,
    },
    {
      label: "Dashboard",
      path: "/dashboard",
      icon: <MdDashboard />,
    },
    {
      label: "Scenario Builder",
      path: "/scenario-builder",
      icon: <MdTune />,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="border-b border-slate-800 bg-slate-950/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-sky-500/30 bg-sky-500/10 text-2xl text-sky-400">
              <MdRadar />
            </div>

            <div>
              <h1 className="text-lg font-semibold tracking-wide text-white">
                Fighter Squadron Simulation
              </h1>
              <p className="text-xs text-slate-400">
                Sortie generation command dashboard
              </p>
            </div>
          </div>

          <nav className="flex items-center gap-2">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/"}
                className={({ isActive }) =>
                  `flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition ${
                    isActive
                      ? "bg-sky-500/15 text-sky-300 ring-1 ring-sky-500/30"
                      : "text-slate-400 hover:bg-slate-900 hover:text-slate-100"
                  }`
                }
              >
                <span className="text-lg">{item.icon}</span>
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-8">
        <Outlet />
      </main>
    </div>
  );
}

export default MainLayout;
