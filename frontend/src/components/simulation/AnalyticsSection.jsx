import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { MdInsights } from "react-icons/md";

import Card from "../common/Card";
import EmptyState from "../common/EmptyState";
import SectionHeader from "../common/SectionHeader";

function AnalyticsSection({ result }) {
  const statistics = result?.statistics;

  if (!statistics) {
    return (
      <section className="space-y-6">
        <SectionHeader
          eyebrow="Analytics"
          title="Simulation Analytics"
          subtitle="Run a simulation to view visual analysis of mission outcomes."
          icon={<MdInsights />}
        />

        <EmptyState
          title="No analytics available"
          message="Analytics charts will appear after a simulation is completed."
          icon={<MdInsights />}
        />
      </section>
    );
  }

  const missionStatusData = [
    {
      name: "Completed",
      value: statistics.completedSorties,
      color: "#22c55e",
    },
    {
      name: "Aborted",
      value: statistics.abortedMissions,
      color: "#ef4444",
    },
  ];

  return (
    <section className="space-y-6">
      <SectionHeader
        eyebrow="Analytics"
        title="Simulation Analytics"
        subtitle="Visual breakdown of sortie generation performance and mission outcomes."
        icon={<MdInsights />}
      />

      <div className="grid gap-6 xl:grid-cols-2">
        <Card
          title="Mission Outcome Distribution"
          subtitle="Completed sorties compared against aborted missions."
        >
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={missionStatusData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={70}
                  outerRadius={105}
                  paddingAngle={4}
                >
                  {missionStatusData.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>

                <Tooltip
                  contentStyle={{
                    backgroundColor: "#020617",
                    border: "1px solid #1e293b",
                    borderRadius: "12px",
                    color: "#e5e7eb",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3">
            {missionStatusData.map((item) => (
              <div
                key={item.name}
                className="rounded-xl border border-slate-800 bg-slate-950/60 p-4"
              >
                <p className="text-sm text-slate-400">{item.name}</p>
                <p className="mt-1 text-2xl font-bold text-white">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </section>
  );
}

export default AnalyticsSection;
