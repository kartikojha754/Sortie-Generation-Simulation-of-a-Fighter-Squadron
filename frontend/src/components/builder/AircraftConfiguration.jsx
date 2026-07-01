import ConfigurationPanel from "../configuration/ConfigurationPanel";
import ConfigurationGrid from "../configuration/ConfigurationGrid";
import ConfigurationSection from "../configuration/ConfigurationSection";

import Input from "../common/Input";
import Select from "../common/Select";
import Toggle from "../common/Toggle";

import { useScenarioSection } from "../../hooks/useScenarioSection";

const AircraftConfiguration = () => {
  const { section: aircraft, updateField } = useScenarioSection(
    "squadron",
    "aircraft",
  );

  return (
    <ConfigurationPanel
      eyebrow="Aircraft"
      title="Aircraft Configuration"
      description="Define fleet size, aircraft availability, maintenance behavior, and turnaround assumptions used by the simulation engine."
    >
      <ConfigurationGrid columns={2}>
        <ConfigurationSection title="Fleet Setup">
          <Input
            label="Total Aircraft"
            type="number"
            min="1"
            value={aircraft.totalAircraft}
            onChange={(e) =>
              updateField("totalAircraft", Number(e.target.value))
            }
          />

          <Select
            label="Primary Aircraft Type"
            value={aircraft.aircraftType}
            onChange={(e) => updateField("aircraftType", e.target.value)}
          >
            <option value="">Select aircraft type</option>
            <option value="f16">F-16 Fighting Falcon</option>
            <option value="f15">F-15 Eagle</option>
            <option value="f18">F/A-18 Hornet</option>
            <option value="generic">Generic Fighter</option>
          </Select>
        </ConfigurationSection>

        <ConfigurationSection title="Availability">
          <Input
            label="Available Aircraft"
            type="number"
            min="0"
            value={aircraft.availableAircraft}
            onChange={(e) =>
              updateField("availableAircraft", Number(e.target.value))
            }
          />

          <Input
            label="Initial Unavailable Aircraft"
            type="number"
            min="0"
            value={aircraft.unavailableAircraft}
            onChange={(e) =>
              updateField("unavailableAircraft", Number(e.target.value))
            }
          />
        </ConfigurationSection>

        <ConfigurationSection title="Maintenance Rules">
          <Toggle
            label="Enable Maintenance Impact"
            checked={aircraft.maintenanceImpact}
            onChange={(e) => updateField("maintenanceImpact", e.target.checked)}
          />

          <Input
            label="Maintenance Duration (minutes)"
            type="number"
            min="0"
            value={aircraft.maintenanceDurationMinutes}
            onChange={(e) =>
              updateField("maintenanceDurationMinutes", Number(e.target.value))
            }
          />
        </ConfigurationSection>

        <ConfigurationSection title="Turnaround Rules">
          <Input
            label="Turnaround Time (minutes)"
            type="number"
            min="0"
            value={aircraft.turnaroundTimeMinutes}
            onChange={(e) =>
              updateField("turnaroundTimeMinutes", Number(e.target.value))
            }
          />

          <Input
            label="Aircraft Failure Rate (%)"
            type="number"
            min="0"
            max="100"
            value={aircraft.aircraftFailureRate}
            onChange={(e) =>
              updateField("aircraftFailureRate", Number(e.target.value))
            }
          />
        </ConfigurationSection>
      </ConfigurationGrid>
    </ConfigurationPanel>
  );
};

export default AircraftConfiguration;
