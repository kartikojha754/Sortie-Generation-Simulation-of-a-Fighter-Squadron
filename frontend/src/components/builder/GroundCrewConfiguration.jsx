import ConfigurationPanel from "../configuration/ConfigurationPanel";
import ConfigurationGrid from "../configuration/ConfigurationGrid";
import ConfigurationSection from "../configuration/ConfigurationSection";

import Input from "../common/Input";
import Select from "../common/Select";
import Toggle from "../common/Toggle";

import { useScenarioSection } from "../../hooks/useScenarioSection";

const GroundCrewConfiguration = () => {
  const { section: groundCrew, updateField } = useScenarioSection(
    "squadron",
    "groundCrew",
  );

  return (
    <ConfigurationPanel
      eyebrow="Ground Crew"
      title="Ground Crew Configuration"
      description="Define ground crew capacity, preparation capability, maintenance support, and shift behavior for aircraft turnaround."
    >
      <ConfigurationGrid columns={2}>
        <ConfigurationSection title="Crew Pool">
          <Input
            label="Total Ground Crew Teams"
            type="number"
            min="1"
            value={groundCrew.totalTeams}
            onChange={(e) => updateField("totalTeams", Number(e.target.value))}
          />

          <Input
            label="Available Crew Teams"
            type="number"
            min="0"
            value={groundCrew.availableTeams}
            onChange={(e) =>
              updateField("availableTeams", Number(e.target.value))
            }
          />
        </ConfigurationSection>

        <ConfigurationSection title="Preparation Capacity">
          <Input
            label="Aircraft Prepared Per Team"
            type="number"
            min="1"
            value={groundCrew.aircraftPreparedPerTeam}
            onChange={(e) =>
              updateField("aircraftPreparedPerTeam", Number(e.target.value))
            }
          />

          <Input
            label="Average Preparation Time (minutes)"
            type="number"
            min="0"
            value={groundCrew.averagePreparationTimeMinutes}
            onChange={(e) =>
              updateField(
                "averagePreparationTimeMinutes",
                Number(e.target.value),
              )
            }
          />
        </ConfigurationSection>

        <ConfigurationSection title="Maintenance Support">
          <Toggle
            label="Allow Crew Maintenance Assignment"
            checked={groundCrew.maintenanceAssignment}
            onChange={(e) =>
              updateField("maintenanceAssignment", e.target.checked)
            }
          />

          <Input
            label="Maintenance Crew Allocation (%)"
            type="number"
            min="0"
            max="100"
            value={groundCrew.maintenanceCrewAllocationPercent}
            onChange={(e) =>
              updateField(
                "maintenanceCrewAllocationPercent",
                Number(e.target.value),
              )
            }
          />
        </ConfigurationSection>

        <ConfigurationSection title="Shift Rules">
          <Select
            label="Crew Shift Model"
            value={groundCrew.shiftModel}
            onChange={(e) => updateField("shiftModel", e.target.value)}
          >
            <option value="">Select shift model</option>
            <option value="single_shift">Single Shift</option>
            <option value="two_shift">Two Shift Rotation</option>
            <option value="continuous">Continuous Operations</option>
          </Select>

          <Input
            label="Crew Rest Time (minutes)"
            type="number"
            min="0"
            value={groundCrew.crewRestTimeMinutes}
            onChange={(e) =>
              updateField("crewRestTimeMinutes", Number(e.target.value))
            }
          />
        </ConfigurationSection>
      </ConfigurationGrid>
    </ConfigurationPanel>
  );
};

export default GroundCrewConfiguration;
