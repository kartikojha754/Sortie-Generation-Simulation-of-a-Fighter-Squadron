import {
  FiCheckCircle,
  FiCloud,
  FiEye,
  FiWind,
  FiXCircle,
} from "react-icons/fi";

import Card from "../common/Card";
import { useSimulation } from "../../context/SimulationContext";

const SystemHealth = () => {
  const { simulationResult } = useSimulation();

  const state = simulationResult?.finalSquadronState;
  const weather = state?.weather;

  const condition = weather?.condition || "—";
  const visibility = weather?.visibility ?? "—";
  const windSpeed = weather?.windSpeed ?? "—";
  const isFlyable = weather?.isFlyable ?? false;

  const conditionItems = [
    {
      label: "Weather Condition",
      value: condition,
      icon: <FiCloud />,
      healthy: isFlyable,
    },
    {
      label: "Visibility",
      value: visibility !== "—" ? `${visibility} km` : "—",
      icon: <FiEye />,
      healthy: visibility !== "—" && visibility >= 5,
    },
    {
      label: "Wind Speed",
      value: windSpeed !== "—" ? `${windSpeed} kt` : "—",
      icon: <FiWind />,
      healthy: windSpeed !== "—" && windSpeed <= 25,
    },
    {
      label: "Flyable Status",
      value: isFlyable ? "Flyable" : "Not Flyable",
      icon: isFlyable ? <FiCheckCircle /> : <FiXCircle />,
      healthy: isFlyable,
    },
  ];

  return (
    <Card>
      <div className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-sky-400">
          Conditions
        </p>

        <h2 className="mt-2 text-xl font-semibold text-white">
          Operational Conditions
        </h2>

        <p className="mt-1 text-sm text-slate-400">
          Weather and flyability details from the final squadron state.
        </p>
      </div>

      {!state ? (
        <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4 text-sm text-slate-400">
          No operational condition data available. Run a simulation to view
          weather readiness.
        </div>
      ) : (
        <div className="space-y-4">
          {conditionItems.map((item) => (
            <div
              key={item.label}
              className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950/60 px-4 py-3"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-lg border ${
                    item.healthy
                      ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                      : "border-red-500/30 bg-red-500/10 text-red-400"
                  }`}
                >
                  {item.icon}
                </div>

                <p className="text-sm font-medium text-slate-300">
                  {item.label}
                </p>
              </div>

              <span
                className={`rounded-full border px-3 py-1 text-xs font-medium ${
                  item.healthy
                    ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                    : "border-red-500/30 bg-red-500/10 text-red-400"
                }`}
              >
                {item.value}
              </span>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};

export default SystemHealth;
