import AnimatedSection from "../components/common/AnimatedSection";
import SectionHeader from "../components/common/SectionHeader";

import BuilderHero from "../components/builder/BuilderHero";
import MissionConfiguration from "../components/builder/MissionConfiguration";
import AircraftConfiguration from "../components/builder/AircraftConfiguration";
import PilotConfiguration from "../components/builder/PilotConfiguration";
import GroundCrewConfiguration from "../components/builder/GroundCrewConfiguration";
import RunwayConfiguration from "../components/builder/RunwayConfiguration";
import EnvironmentConfiguration from "../components/builder/EnvironmentConfiguration";
import SchedulingConfiguration from "../components/builder/SchedulingConfiguration";
import RulesConfiguration from "../components/builder/RulesConfiguration";
import MissionMixConfiguration from "../components/builder/MissionMixConfiguration";
import ResourceConstraints from "../components/builder/ResourceConstraints";
import ScenarioSummary from "../components/builder/ScenarioSummary";
import ScenarioActions from "../components/builder/ScenarioActions";

const ScenarioBuilder = () => {
  return (
    <div className="space-y-8 pb-24">
      <AnimatedSection>
        <SectionHeader
          eyebrow="Scenario Builder"
          title="Advanced Scenario Configuration"
          description="Create structured sortie generation scenarios using mission, resource, environment, and rule-based configuration modules."
        />
      </AnimatedSection>

      <AnimatedSection>
        <BuilderHero />
      </AnimatedSection>

      <AnimatedSection>
        <MissionConfiguration />
      </AnimatedSection>

      <AnimatedSection>
        <AircraftConfiguration />
      </AnimatedSection>

      <AnimatedSection>
        <PilotConfiguration />
      </AnimatedSection>

      <AnimatedSection>
        <GroundCrewConfiguration />
      </AnimatedSection>

      <AnimatedSection>
        <RunwayConfiguration />
      </AnimatedSection>

      <AnimatedSection>
        <EnvironmentConfiguration />
      </AnimatedSection>

      <AnimatedSection>
        <SchedulingConfiguration />
      </AnimatedSection>

      <AnimatedSection>
        <RulesConfiguration />
      </AnimatedSection>

      <AnimatedSection>
        <MissionMixConfiguration />
      </AnimatedSection>

      <AnimatedSection>
        <ResourceConstraints />
      </AnimatedSection>

      <AnimatedSection>
        <ScenarioSummary />
      </AnimatedSection>

      <ScenarioActions />
    </div>
  );
};

export default ScenarioBuilder;
