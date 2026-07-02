import AnimatedSection from "../components/common/AnimatedSection";
import SectionHeader from "../components/common/SectionHeader";

import DashboardHero from "../components/dashboard/DashboardHero";
import DashboardKpis from "../components/dashboard/DashboardKpis";
import RecentSimulationSummary from "../components/dashboard/RecentSimulationSummary";
import SquadronSnapshot from "../components/dashboard/SquadronSnapshot";
import MissionOutcomeBreakdown from "../components/dashboard/MissionOutcomeBreakdown";
import MissionAnalytics from "../components/dashboard/MissionAnalytics";
import QuickNavigation from "../components/dashboard/QuickNavigation";
import SystemHealth from "../components/dashboard/SystemHealth";
import RecentActivity from "../components/dashboard/RecentActivity";
import MaintenanceOverview from "../components/dashboard/MaintenanceOverview";

const Dashboard = () => {
  return (
    <div className="space-y-8">
      <AnimatedSection>
        <SectionHeader
          eyebrow="Command Overview"
          title="Squadron Dashboard"
          description="Quick operational summary of sortie generation readiness, recent simulation output, and system status."
        />
      </AnimatedSection>

      <AnimatedSection>
        <DashboardHero />
      </AnimatedSection>

      <AnimatedSection>
        <DashboardKpis />
      </AnimatedSection>

      <AnimatedSection>
        <RecentSimulationSummary />
      </AnimatedSection>

      <AnimatedSection>
        <MissionAnalytics />
      </AnimatedSection>

      <AnimatedSection>
        <MissionOutcomeBreakdown />
      </AnimatedSection>

      <AnimatedSection>
        <SquadronSnapshot />
      </AnimatedSection>

      <div className="grid gap-6 xl:grid-cols-2">
        <AnimatedSection>
          <SystemHealth />
        </AnimatedSection>

        <AnimatedSection>
          <RecentActivity />
        </AnimatedSection>
      </div>

      <AnimatedSection>
        <MaintenanceOverview />
      </AnimatedSection>

      <AnimatedSection>
        <QuickNavigation />
      </AnimatedSection>
    </div>
  );
};

export default Dashboard;
