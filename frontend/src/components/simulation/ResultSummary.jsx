import {
  MdAirplanemodeActive,
  MdCheckCircle,
  MdCancel,
  MdTrendingUp,
  MdAssessment,
} from "react-icons/md";

import SectionHeader from "../common/SectionHeader";
import StatCard from "../common/StatCard";

function ResultSummary() {
  const stats = [
    {
      title: "Total Missions",
      value: "10",
      subtitle: "Scheduled sorties",
      icon: <MdAirplanemodeActive />,
      tone: "primary",
    },
    {
      title: "Mission Success",
      value: "5",
      subtitle: "Successfully completed",
      icon: <MdCheckCircle />,
      tone: "success",
    },
    {
      title: "Mission Aborts",
      value: "5",
      subtitle: "Ground / Air / Weather",
      icon: <MdCancel />,
      tone: "danger",
    },
    {
      title: "Success Rate",
      value: "50%",
      subtitle: "Overall efficiency",
      icon: <MdTrendingUp />,
      tone: "warning",
    },
  ];

  return (
    <section className="space-y-6">
      <SectionHeader
        eyebrow="Mission Overview"
        title="Simulation Results"
        subtitle="Key performance indicators generated after each simulation run."
        icon={<MdAssessment />}
      />

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <StatCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            subtitle={stat.subtitle}
            icon={stat.icon}
            tone={stat.tone}
          />
        ))}
      </div>
    </section>
  );
}

export default ResultSummary;
