import SectionHeader from "../components/common/SectionHeader";
import DashboardEmptyState from "../components/dashboard/DashboardEmptyState";
import DashboardKpis from "../components/dashboard/DashboardKpis";
import OperationalReadiness from "../components/dashboard/OperationalReadiness";
import AbortSummary from "../components/dashboard/AbortSummary";
import MissionMix from "../components/dashboard/MissionMix";
import RecentActivity from "../components/dashboard/RecentActivity";
import QuickNavigation from "../components/dashboard/QuickNavigation";
import { useSimulation } from "../context/SimulationContext";

export default function Dashboard() {
  const { simulationResult } = useSimulation();

  if (!simulationResult) {
    return (
      <div>
        <SectionHeader
          eyebrow="Command Dashboard"
          title="Dashboard"
          description="Operational summary will appear after a simulation run."
        />

        <DashboardEmptyState />
      </div>
    );
  }

  const resultData = simulationResult.data;

  return (
    <div>
      <SectionHeader
        eyebrow="Command Dashboard"
        title="Dashboard"
        description="High-level operational overview of the latest simulation run."
      />

      <div className="space-y-6">
        <DashboardKpis statistics={resultData.statistics} />

        <OperationalReadiness squadron={resultData.finalSquadronState} />

        <div className="grid gap-6 xl:grid-cols-2">
          <AbortSummary statistics={resultData.statistics} />
          <MissionMix missions={resultData.missions} />
        </div>

        <RecentActivity
          missions={resultData.missions}
          maintenanceRecords={resultData.maintenanceRecords}
        />

        <QuickNavigation />
      </div>
    </div>
  );
}
