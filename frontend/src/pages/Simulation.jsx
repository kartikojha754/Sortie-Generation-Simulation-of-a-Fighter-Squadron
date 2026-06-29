import HeroSection from "../components/simulation/HeroSection";
import ResultSummary from "../components/simulation/ResultSummary";
import ScenarioOverview from "../components/simulation/ScenarioOverview";
import SquadronResources from "../components/simulation/SquadronResources";

function Simulation() {
  return (
    <div className="space-y-12">
      <HeroSection />
      <ResultSummary />
      <ScenarioOverview />
      <SquadronResources />
    </div>
  );
}

export default Simulation;
