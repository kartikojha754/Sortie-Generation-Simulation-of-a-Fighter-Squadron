import SectionHeader from "../components/common/SectionHeader";
import MaintenanceEmptyState from "../components/maintenance/MaintenanceEmptyState";
import MaintenanceKpis from "../components/maintenance/MaintenanceKpis";
import AircraftMaintenanceStatus from "../components/maintenance/AircraftMaintenanceStatus";
import MaintenanceRecordsTable from "../components/simulation/MaintenanceRecordsTable";
import { useSimulation } from "../context/SimulationContext";

export default function Maintenance() {
  const { simulationResult } = useSimulation();

  if (!simulationResult) {
    return (
      <div>
        <SectionHeader
          eyebrow="Maintenance Output"
          title="Maintenance"
          description="Aircraft maintenance records and status will appear here."
        />

        <MaintenanceEmptyState />
      </div>
    );
  }

  const resultData = simulationResult.data;
  const aircraft = resultData.finalSquadronState?.aircraft || [];
  const records = resultData.maintenanceRecords || [];

  return (
    <div>
      <SectionHeader
        eyebrow="Maintenance Output"
        title="Maintenance"
        description="Aircraft maintenance status and records from the latest simulation."
      />

      <div className="space-y-6">
        <MaintenanceKpis records={records} aircraft={aircraft} />

        <AircraftMaintenanceStatus aircraft={aircraft} records={records} />

        <MaintenanceRecordsTable records={records} />
      </div>
    </div>
  );
}
