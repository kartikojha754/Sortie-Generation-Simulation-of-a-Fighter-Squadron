import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
} from "recharts";
import {
  MdInsights,
  MdCheckCircle,
  MdCancel,
  MdSpeed,
  MdAirplanemodeActive,
} from "react-icons/md";

import Card from "../common/Card";
import EmptyState from "../common/EmptyState";
import SectionHeader from "../common/SectionHeader";
import StatCard from "../common/StatCard";

function AnalyticsSection({ result }) {
  const statistics = result?.statistics;
  const missions = result?.missions || [];
  const aircraft = result?.finalSquadronState?.aircraft || [];

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

  const completed = statistics.completedSorties || 0;
  const aborted = statistics.abortedMissions || 0;
  const total = statistics.totalMissions || 0;
  const successRate = Math.round((statistics.successRate || 0) * 100);
  const abortRate = total ? Math.round((aborted / total) * 100) : 0;

  const missionStatusData = [
    { name: "Completed", value: completed, color: "#22c55e" },
    { name: "Aborted", value: aborted, color: "#ef4444" },
  ];

  const abortReasonData = [
    { name: "Ground", value: statistics.groundAborts || 0 },
    { name: "Air", value: statistics.airAborts || 0 },
    { name: "Weather", value: statistics.weatherAborts || 0 },
    {
      name: "Resource",
      value:
        missions.filter(
          (mission) => mission.abortReason === "RESOURCE_UNAVAILABLE",
        ).length || 0,
    },
  ];

  const aircraftUtilizationData = aircraft.map((item) => ({
    name: item.tailNumber || item.id,
    flightHours: item.flightHours || 0,
  }));

  return (
    <section className="space-y-6">
      <SectionHeader
        eyebrow="Analytics"
        title="Simulation Analytics"
        subtitle="Visual breakdown of sortie generation performance, abort causes, and aircraft usage."
        icon={<MdInsights />}
      />

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Success Rate"
          value={`${successRate}%`}
          subtitle="Completed missions"
          icon={<MdCheckCircle />}
          tone="success"
        />

        <StatCard
          title="Abort Rate"
          value={`${abortRate}%`}
          subtitle="Failed or unavailable missions"
          icon={<MdCancel />}
          tone="danger"
        />

        <StatCard
          title="Total Missions"
          value={total}
          subtitle="Simulation workload"
          icon={<MdSpeed />}
          tone="primary"
        />

        <StatCard
          title="Aircraft Used"
          value={aircraft.filter((item) => item.flightHours > 0).length}
          subtitle="Aircraft with flight hours"
          icon={<MdAirplanemodeActive />}
          tone="warning"
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <Card
          title="Mission Outcome Distribution"
          subtitle="Completed sorties compared with aborted missions."
        >
          <div className="grid items-center gap-6 md:grid-cols-[1.1fr_0.9fr]">
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

                  <Tooltip content={<ChartTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-3">
              {missionStatusData.map((item) => (
                <ChartLegendItem
                  key={item.name}
                  label={item.name}
                  value={item.value}
                  color={item.color}
                />
              ))}
            </div>
          </div>
        </Card>

        <Card
          title="Abort Cause Breakdown"
          subtitle="Distribution of abort reasons produced by the simulation."
        >
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={abortReasonData}>
                <XAxis
                  dataKey="name"
                  stroke="#64748b"
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#64748b"
                  tickLine={false}
                  axisLine={false}
                  allowDecimals={false}
                />
                <Tooltip content={<ChartTooltip />} />
                <Bar dataKey="value" radius={[8, 8, 0, 0]} fill="#38bdf8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <Card
        title="Aircraft Utilization"
        subtitle="Flight hours accumulated by each aircraft during the simulation."
      >
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={aircraftUtilizationData}>
              <XAxis
                dataKey="name"
                stroke="#64748b"
                tickLine={false}
                axisLine={false}
              />
              <YAxis stroke="#64748b" tickLine={false} axisLine={false} />
              <Tooltip content={<ChartTooltip />} />
              <Bar dataKey="flightHours" radius={[8, 8, 0, 0]} fill="#22c55e" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </section>
  );
}

function ChartLegendItem({ label, value, color }) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950/60 p-4">
      <div className="flex items-center gap-3">
        <span
          className="h-3 w-3 rounded-full"
          style={{ backgroundColor: color }}
        />
        <span className="text-sm text-slate-300">{label}</span>
      </div>

      <span className="text-xl font-bold text-white">{value}</span>
    </div>
  );
}

function ChartTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;

  return (
    <div className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 shadow-xl">
      {label && (
        <p className="mb-1 text-xs uppercase tracking-[0.18em] text-slate-500">
          {label}
        </p>
      )}

      {payload.map((item) => (
        <p key={item.name} className="text-sm font-semibold text-white">
          {item.name}: {item.value}
        </p>
      ))}
    </div>
  );
}

export default AnalyticsSection;
