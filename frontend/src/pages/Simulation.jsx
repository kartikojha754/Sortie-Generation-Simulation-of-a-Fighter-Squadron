import SectionHeader from "../components/common/SectionHeader";
import SimulationEmptyState from "../components/simulation/SimulationEmptyState";
import SimulationResultSummary from "../components/simulation/SimulationResultSummary";
import MissionTable from "../components/simulation/MissionTable";
import SquadronStateSummary from "../components/simulation/SquadronStateSummary";
import MaintenanceRecordsTable from "../components/simulation/MaintenanceRecordsTable";
import AircraftStatusCards from "../components/simulation/AircraftStatusCards";
import PilotStatusCards from "../components/simulation/PilotStatusCards";
import GroundCrewStatusCards from "../components/simulation/GroundCrewStatusCards";
import SortieTable from "../components/simulation/SortieTable";
import ScenarioSummary from "../components/simulation/ScenarioSummary";
import { useSimulation } from "../context/SimulationContext";

export default function Simulation() {
  const { simulationResult } = useSimulation();

  if (!simulationResult) {
    return (
      <div>
        <SectionHeader
          eyebrow="Simulation Output"
          title="Simulation Results"
          description="Detailed mission, sortie, and squadron output."
        />

        <SimulationEmptyState />
      </div>
    );
  }

  const resultData = simulationResult.data;

  return (
    <div>
      <SectionHeader
        eyebrow="Simulation Output"
        title="Simulation Results"
        description="Detailed mission, sortie, and squadron output returned from the backend."
      />

      <div className="space-y-6">
        <SimulationResultSummary statistics={resultData.statistics} />
        <ScenarioSummary
          scenario={resultData.scenario}
          weather={resultData.finalSquadronState?.weather}
        />
        <MissionTable missions={resultData.missions} scenarioWeaponInventory={resultData.scenario?.weaponInventory || {}} />
        <SortieTable sorties={resultData.sorties} />
        <SquadronStateSummary squadron={resultData.finalSquadronState} />

        <AircraftStatusCards
          aircraft={resultData.finalSquadronState?.aircraft}
          missions={resultData.missions}
          maintenanceRecords={resultData.maintenanceRecords}
        />

        <PilotStatusCards
          pilots={resultData.finalSquadronState?.pilots}
          missions={resultData.missions}
        />

        <GroundCrewStatusCards
          groundCrew={resultData.finalSquadronState?.groundCrew}
          missions={resultData.missions}
        />

        <MaintenanceRecordsTable records={resultData.maintenanceRecords} />
      </div>
    </div>
  );
}
