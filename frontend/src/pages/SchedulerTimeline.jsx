import SectionHeader from "../components/common/SectionHeader";
import SimulationEmptyState from "../components/simulation/SimulationEmptyState";
import SchedulerSummaryCards from "../components/scheduler/SchedulerSummaryCards";
import SchedulerTimelinePanel from "../components/scheduler/SchedulerTimelinePanel";
import SchedulerLogTable from "../components/scheduler/SchedulerLogTable";
import { useSimulation } from "../context/SimulationContext";

export default function SchedulerTimeline() {
  const { simulationResult } = useSimulation();

  if (!simulationResult) {
    return (
      <div>
        <SectionHeader
          eyebrow="Scheduler"
          title="Scheduler Timeline"
          description="Run a simulation first to inspect scheduler decisions."
        />

        <SimulationEmptyState />
      </div>
    );
  }

  const resultData = simulationResult.data;
  const schedulerLog = resultData.schedulerLog || [];

  return (
    <div>
      <SectionHeader
        eyebrow="Scheduler"
        title="Scheduler Timeline"
        description="Detailed event-driven scheduling log showing arrivals, waits, dispatches, sorties, maintenance, and resource recovery."
      />

      <div className="space-y-6">
        <SchedulerSummaryCards schedulerLog={schedulerLog} />
        <SchedulerTimelinePanel schedulerLog={schedulerLog} />
        <SchedulerLogTable schedulerLog={schedulerLog} />
      </div>
    </div>
  );
}
