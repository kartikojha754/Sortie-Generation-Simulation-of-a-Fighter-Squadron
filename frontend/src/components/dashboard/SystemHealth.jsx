import { FiCheckCircle, FiServer, FiWifi, FiDatabase } from "react-icons/fi";
import Card from "../common/Card";

const healthItems = [
  {
    label: "Simulation API",
    status: "Online",
    icon: <FiServer />,
  },
  {
    label: "Backend Engine",
    status: "Ready",
    icon: <FiCheckCircle />,
  },
  {
    label: "Data Connection",
    status: "Stable",
    icon: <FiWifi />,
  },
  {
    label: "Result Store",
    status: "Available",
    icon: <FiDatabase />,
  },
];

const SystemHealth = () => {
  return (
    <Card>
      <div className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-sky-400">
          System
        </p>

        <h2 className="mt-2 text-xl font-semibold text-white">System Health</h2>

        <p className="mt-1 text-sm text-slate-400">
          Current frontend and simulation service readiness.
        </p>
      </div>

      <div className="space-y-4">
        {healthItems.map((item) => (
          <div
            key={item.label}
            className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950/60 px-4 py-3"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-emerald-500/30 bg-emerald-500/10 text-emerald-400">
                {item.icon}
              </div>

              <p className="text-sm font-medium text-slate-300">{item.label}</p>
            </div>

            <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400">
              {item.status}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default SystemHealth;
