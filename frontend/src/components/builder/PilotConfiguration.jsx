import ConfigurationPanel from "../configuration/ConfigurationPanel";
import ConfigurationGrid from "../configuration/ConfigurationGrid";
import ConfigurationSection from "../configuration/ConfigurationSection";

import Input from "../common/Input";
import Select from "../common/Select";
import Toggle from "../common/Toggle";

const PilotConfiguration = () => {
  return (
    <ConfigurationPanel
      eyebrow="Pilots"
      title="Pilot Configuration"
      description="Define pilot availability, qualification level, fatigue behavior, and flight-hour limits used during mission assignment."
    >
      <ConfigurationGrid columns={2}>
        <ConfigurationSection
          title="Pilot Pool"
          description="Controls the number of pilots available for sortie generation."
        >
          <Input label="Total Pilots" type="number" min="1" placeholder="24" />

          <Input
            label="Available Pilots"
            type="number"
            min="0"
            placeholder="22"
          />
        </ConfigurationSection>

        <ConfigurationSection
          title="Pilot Qualification"
          description="Defines the general skill and readiness profile of the squadron pilot group."
        >
          <Select label="Average Pilot Rating">
            <option value="">Select rating</option>
            <option value="trainee">Trainee</option>
            <option value="standard">Standard</option>
            <option value="experienced">Experienced</option>
            <option value="instructor">Instructor</option>
          </Select>

          <Select label="Mission Qualification">
            <option value="">Select qualification</option>
            <option value="basic">Basic Missions</option>
            <option value="combat">Combat Missions</option>
            <option value="night">Night Operations</option>
            <option value="all">All Mission Types</option>
          </Select>
        </ConfigurationSection>

        <ConfigurationSection
          title="Fatigue Rules"
          description="Controls whether repeated assignments reduce pilot availability during simulation."
        >
          <Toggle label="Enable Pilot Fatigue" />

          <Input
            label="Rest Time Required (minutes)"
            type="number"
            min="0"
            placeholder="90"
          />
        </ConfigurationSection>

        <ConfigurationSection
          title="Flight Limits"
          description="Defines operational limits for assigning pilots to multiple sorties."
        >
          <Input
            label="Max Sorties Per Pilot"
            type="number"
            min="1"
            placeholder="2"
          />

          <Input
            label="Max Flight Hours Per Pilot"
            type="number"
            min="1"
            placeholder="6"
          />
        </ConfigurationSection>
      </ConfigurationGrid>
    </ConfigurationPanel>
  );
};

export default PilotConfiguration;
