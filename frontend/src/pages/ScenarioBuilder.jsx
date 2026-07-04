import SectionHeader from "../components/common/SectionHeader";
import ResourceConfig from "../components/scenario/ResourceConfig";
import WeatherConfig from "../components/scenario/WeatherConfig";
import AbortConfig from "../components/scenario/AbortConfig";
import SimulationSettings from "../components/scenario/SimulationSettings";
import ScenarioPreview from "../components/scenario/ScenarioPreview";
import RunSimulationPanel from "../components/scenario/RunSimulationPanel";

export default function ScenarioBuilder() {
  return (
    <div>
      <SectionHeader
        eyebrow="Scenario Input"
        title="Scenario Builder"
        description="Configure only backend-supported simulation inputs."
      />

      <div className="space-y-6">
        <ResourceConfig />
        <WeatherConfig />
        <AbortConfig />
        <SimulationSettings />
        <ScenarioPreview />
        <RunSimulationPanel />
      </div>
    </div>
  );
}
