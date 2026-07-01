import { FiActivity, FiCheckCircle, FiCpu, FiUsers } from "react-icons/fi";

import StatCard from "../common/StatCard";
import { useSimulation } from "../../context/SimulationContext";

const formatPercent = (value) => {
  if (value === null || value === undefined) return "—";
  return `${Math.round(value * 100)}%`;
};

const DashboardKpis = () => {
  const { simulationResult, latestSummary } = useSimulation();

  const statistics = simulationResult?.statistics || latestSummary;

  const totalMissions = statistics?.totalMissions ?? "—";
  const completedSorties = statistics?.completedSorties ?? "—";
  const successRate = formatPercent(statistics?.successRate);
  const abortedMissions = statistics?.abortedMissions ?? "—";

  const kpis = [
    {
      title: "Total Missions",
      value: totalMissions,
      subtitle: "Latest simulation run",
      icon: <FiActivity />,
      tone: "primary",
    },
    {
      title: "Completed Sorties",
      value: completedSorties,
      subtitle: "Successfully completed missions",
      icon: <FiCheckCircle />,
      tone: "success",
    },
    {
      title: "Success Rate",
      value: successRate,
      subtitle: "Mission completion efficiency",
      icon: <FiCpu />,
      tone: "success",
    },
    {
      title: "Aborted Missions",
      value: abortedMissions,
      subtitle: "Ground, air, or weather aborts",
      icon: <FiUsers />,
      tone: abortedMissions > 0 ? "warning" : "primary",
    },
  ];

  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
      {kpis.map((kpi) => (
        <StatCard
          key={kpi.title}
          title={kpi.title}
          value={kpi.value}
          subtitle={kpi.subtitle}
          icon={kpi.icon}
          tone={kpi.tone}
        />
      ))}
    </div>
  );
};

export default DashboardKpis;
