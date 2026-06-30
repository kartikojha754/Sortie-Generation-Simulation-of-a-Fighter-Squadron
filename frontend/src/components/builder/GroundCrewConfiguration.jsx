import ConfigurationPanel from "../configuration/ConfigurationPanel";
import ConfigurationGrid from "../configuration/ConfigurationGrid";
import ConfigurationSection from "../configuration/ConfigurationSection";

import Input from "../common/Input";
import Select from "../common/Select";
import Toggle from "../common/Toggle";

const GroundCrewConfiguration = () => {
  return (
    <ConfigurationPanel
      eyebrow="Ground Crew"
      title="Ground Crew Configuration"
      description="Define ground crew capacity, preparation capability, maintenance support, and shift behavior for aircraft turnaround."
    >
      <ConfigurationGrid columns={2}>
        <ConfigurationSection
          title="Crew Pool"
          description="Controls the number of ground crew teams available during the scenario."
        >
          <Input
            label="Total Ground Crew Teams"
            type="number"
            min="1"
            placeholder="6"
          />

          <Input
            label="Available Crew Teams"
            type="number"
            min="0"
            placeholder="5"
          />
        </ConfigurationSection>

        <ConfigurationSection
          title="Preparation Capacity"
          description="Defines how many aircraft can be prepared in parallel before sorties."
        >
          <Input
            label="Aircraft Prepared Per Team"
            type="number"
            min="1"
            placeholder="1"
          />

          <Input
            label="Average Preparation Time (minutes)"
            type="number"
            min="0"
            placeholder="35"
          />
        </ConfigurationSection>

        <ConfigurationSection
          title="Maintenance Support"
          description="Controls whether crew teams are also responsible for maintenance recovery."
        >
          <Toggle label="Allow Crew Maintenance Assignment" />

          <Input
            label="Maintenance Crew Allocation (%)"
            type="number"
            min="0"
            max="100"
            placeholder="30"
          />
        </ConfigurationSection>

        <ConfigurationSection
          title="Shift Rules"
          description="Defines ground crew operating limits during longer simulation windows."
        >
          <Select label="Crew Shift Model">
            <option value="">Select shift model</option>
            <option value="single_shift">Single Shift</option>
            <option value="two_shift">Two Shift Rotation</option>
            <option value="continuous">Continuous Operations</option>
          </Select>

          <Input
            label="Crew Rest Time (minutes)"
            type="number"
            min="0"
            placeholder="60"
          />
        </ConfigurationSection>
      </ConfigurationGrid>
    </ConfigurationPanel>
  );
};

export default GroundCrewConfiguration;
