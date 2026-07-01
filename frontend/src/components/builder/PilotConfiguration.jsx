import ConfigurationPanel from "../configuration/ConfigurationPanel";
import ConfigurationGrid from "../configuration/ConfigurationGrid";
import ConfigurationSection from "../configuration/ConfigurationSection";

import Input from "../common/Input";
import Select from "../common/Select";
import Toggle from "../common/Toggle";

import { useScenarioSection } from "../../hooks/useScenarioSection";

const PilotConfiguration = () => {
  const { section: pilots, updateField } = useScenarioSection(
    "squadron",
    "pilots",
  );

  return (
    <ConfigurationPanel
      eyebrow="Pilots"
      title="Pilot Configuration"
      description="Define pilot availability, qualification level, fatigue behavior, and flight-hour limits used during mission assignment."
    >
      <ConfigurationGrid columns={2}>
        <ConfigurationSection title="Pilot Pool">
          <Input
            label="Total Pilots"
            type="number"
            min="1"
            value={pilots.totalPilots}
            onChange={(e) => updateField("totalPilots", Number(e.target.value))}
          />

          <Input
            label="Available Pilots"
            type="number"
            min="0"
            value={pilots.availablePilots}
            onChange={(e) =>
              updateField("availablePilots", Number(e.target.value))
            }
          />
        </ConfigurationSection>

        <ConfigurationSection title="Pilot Qualification">
          <Select
            label="Average Pilot Rating"
            value={pilots.averagePilotRating}
            onChange={(e) => updateField("averagePilotRating", e.target.value)}
          >
            <option value="">Select rating</option>
            <option value="trainee">Trainee</option>
            <option value="standard">Standard</option>
            <option value="experienced">Experienced</option>
            <option value="instructor">Instructor</option>
          </Select>

          <Select
            label="Mission Qualification"
            value={pilots.missionQualification}
            onChange={(e) =>
              updateField("missionQualification", e.target.value)
            }
          >
            <option value="">Select qualification</option>
            <option value="basic">Basic Missions</option>
            <option value="combat">Combat Missions</option>
            <option value="night">Night Operations</option>
            <option value="all">All Mission Types</option>
          </Select>
        </ConfigurationSection>

        <ConfigurationSection title="Fatigue Rules">
          <Toggle
            label="Enable Pilot Fatigue"
            checked={pilots.pilotFatigue}
            onChange={(e) => updateField("pilotFatigue", e.target.checked)}
          />

          <Input
            label="Rest Time Required (minutes)"
            type="number"
            min="0"
            value={pilots.restTimeMinutes}
            onChange={(e) =>
              updateField("restTimeMinutes", Number(e.target.value))
            }
          />
        </ConfigurationSection>

        <ConfigurationSection title="Flight Limits">
          <Input
            label="Max Sorties Per Pilot"
            type="number"
            min="1"
            value={pilots.maxSortiesPerPilot}
            onChange={(e) =>
              updateField("maxSortiesPerPilot", Number(e.target.value))
            }
          />

          <Input
            label="Max Flight Hours Per Pilot"
            type="number"
            min="1"
            value={pilots.maxFlightHoursPerPilot}
            onChange={(e) =>
              updateField("maxFlightHoursPerPilot", Number(e.target.value))
            }
          />
        </ConfigurationSection>
      </ConfigurationGrid>
    </ConfigurationPanel>
  );
};

export default PilotConfiguration;
