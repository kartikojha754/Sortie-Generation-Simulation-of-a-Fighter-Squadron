import ConfigurationPanel from "../configuration/ConfigurationPanel";
import ConfigurationGrid from "../configuration/ConfigurationGrid";
import ConfigurationSection from "../configuration/ConfigurationSection";

import Input from "../common/Input";
import Select from "../common/Select";
import Toggle from "../common/Toggle";

const AircraftConfiguration = () => {
  return (
    <ConfigurationPanel
      eyebrow="Aircraft"
      title="Aircraft Configuration"
      description="Define fleet size, aircraft availability, maintenance behavior, and turnaround assumptions used by the simulation engine."
    >
      <ConfigurationGrid columns={2}>
        <ConfigurationSection
          title="Fleet Setup"
          description="Controls the number and type of aircraft available in the squadron."
        >
          <Input
            label="Total Aircraft"
            type="number"
            min="1"
            placeholder="16"
          />

          <Select label="Primary Aircraft Type">
            <option value="">Select aircraft type</option>
            <option value="f16">F-16 Fighting Falcon</option>
            <option value="f15">F-15 Eagle</option>
            <option value="f18">F/A-18 Hornet</option>
            <option value="generic">Generic Fighter</option>
          </Select>
        </ConfigurationSection>

        <ConfigurationSection
          title="Availability"
          description="Defines how many aircraft are initially ready for mission assignment."
        >
          <Input
            label="Available Aircraft"
            type="number"
            min="0"
            placeholder="14"
          />

          <Input
            label="Initial Unavailable Aircraft"
            type="number"
            min="0"
            placeholder="2"
          />
        </ConfigurationSection>

        <ConfigurationSection
          title="Maintenance Rules"
          description="Controls how maintenance affects aircraft readiness during simulation."
        >
          <Toggle label="Enable Maintenance Impact" />

          <Input
            label="Maintenance Duration (minutes)"
            type="number"
            min="0"
            placeholder="120"
          />
        </ConfigurationSection>

        <ConfigurationSection
          title="Turnaround Rules"
          description="Defines how quickly aircraft can be prepared again after completing a mission."
        >
          <Input
            label="Turnaround Time (minutes)"
            type="number"
            min="0"
            placeholder="45"
          />

          <Input
            label="Aircraft Failure Rate (%)"
            type="number"
            min="0"
            max="100"
            placeholder="5"
          />
        </ConfigurationSection>
      </ConfigurationGrid>
    </ConfigurationPanel>
  );
};

export default AircraftConfiguration;
