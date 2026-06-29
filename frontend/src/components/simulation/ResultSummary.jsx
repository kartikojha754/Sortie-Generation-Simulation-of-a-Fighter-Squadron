import {
  MdAirplanemodeActive,
  MdCheckCircle,
  MdCancel,
  MdTrendingUp,
  MdAssessment,
} from "react-icons/md";

import SectionHeader from "../common/SectionHeader";
import StatCard from "../common/StatCard";

function ResultSummary({ result }) {
  const statistics = result?.statistics;

  const totalMissions = statistics?.totalMissions ?? "—";
  const completedSorties = statistics?.completedSorties ?? "—";
  const abortedMissions = statistics?.abortedMissions ?? "—";

  const successRate =
    statistics?.successRate !== undefined
      ? `${Math.round(statistics.successRate * 100)}%`
      : "—";

  const stats = [
    {
      title: "Total Missions",
      value: totalMissions,
      subtitle: "Scheduled sorties",
      icon: <MdAirplanemodeActive />,
      tone: "primary",
    },
    {
      title: "Mission Success",
      value: completedSorties,
      subtitle: "Successfully completed",
      icon: <MdCheckCircle />,
      tone: "success",
    },
    {
      title: "Mission Aborts",
      value: abortedMissions,
      subtitle: "Ground / Air / Weather / Resource",
      icon: <MdCancel />,
      tone: "danger",
    },
    {
      title: "Success Rate",
      value: successRate,
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
