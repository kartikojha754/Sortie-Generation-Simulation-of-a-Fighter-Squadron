import { useState } from "react";

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

import { defaultScenario } from "../utils/defaultScenario";

const ScenarioBuilder = () => {
  const [scenario, setScenario] = useState(defaultScenario);

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
        <MissionConfiguration scenario={scenario} setScenario={setScenario} />
      </AnimatedSection>

      <AnimatedSection>
        <AircraftConfiguration scenario={scenario} setScenario={setScenario} />
      </AnimatedSection>

      <AnimatedSection>
        <PilotConfiguration scenario={scenario} setScenario={setScenario} />
      </AnimatedSection>

      <AnimatedSection>
        <GroundCrewConfiguration
          scenario={scenario}
          setScenario={setScenario}
        />
      </AnimatedSection>

      <AnimatedSection>
        <RunwayConfiguration scenario={scenario} setScenario={setScenario} />
      </AnimatedSection>

      <AnimatedSection>
        <EnvironmentConfiguration
          scenario={scenario}
          setScenario={setScenario}
        />
      </AnimatedSection>

      <AnimatedSection>
        <SchedulingConfiguration
          scenario={scenario}
          setScenario={setScenario}
        />
      </AnimatedSection>

      <AnimatedSection>
        <RulesConfiguration scenario={scenario} setScenario={setScenario} />
      </AnimatedSection>

      <AnimatedSection>
        <MissionMixConfiguration
          scenario={scenario}
          setScenario={setScenario}
        />
      </AnimatedSection>

      <AnimatedSection>
        <ResourceConstraints scenario={scenario} setScenario={setScenario} />
      </AnimatedSection>

      <AnimatedSection>
        <ScenarioSummary scenario={scenario} />
      </AnimatedSection>

      <ScenarioActions scenario={scenario} setScenario={setScenario} />
    </div>
  );
};

export default ScenarioBuilder;
