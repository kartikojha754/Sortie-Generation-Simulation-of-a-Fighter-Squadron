import { FiActivity, FiCheckCircle, FiCpu, FiUsers } from "react-icons/fi";

import StatCard from "../common/StatCard";

const DashboardKpis = () => {
  const kpis = [
    {
      title: "Squadron Readiness",
      value: "87%",
      subtitle: "Operationally ready",
      icon: <FiActivity />,
      tone: "success",
    },
    {
      title: "Aircraft Available",
      value: "14 / 16",
      subtitle: "2 under maintenance",
      icon: <FiCpu />,
      tone: "primary",
    },
    {
      title: "Mission Success",
      value: "94.4%",
      subtitle: "Latest simulation run",
      icon: <FiCheckCircle />,
      tone: "success",
    },
    {
      title: "Active Pilots",
      value: "22",
      subtitle: "Ready for assignment",
      icon: <FiUsers />,
      tone: "warning",
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
