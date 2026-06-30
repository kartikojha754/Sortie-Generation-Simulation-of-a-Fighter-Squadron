import ConfigurationPanel from "../configuration/ConfigurationPanel";
import ConfigurationGrid from "../configuration/ConfigurationGrid";
import ConfigurationSection from "../configuration/ConfigurationSection";

import Input from "../common/Input";
import Select from "../common/Select";
import Toggle from "../common/Toggle";

const MissionConfiguration = () => {
  return (
    <ConfigurationPanel
      eyebrow="Mission"
      title="Mission Configuration"
      description="Define the expected mission demand, operating duration, mission priority, and scheduling behavior for the scenario."
    >
      <ConfigurationGrid columns={2}>
        <ConfigurationSection
          title="Mission Demand"
          description="Controls how many sorties the backend simulation engine should attempt to generate."
        >
          <Input label="Mission Count" type="number" min="1" placeholder="18" />

          <Input
            label="Simulation Duration (hours)"
            type="number"
            min="1"
            placeholder="8"
          />
        </ConfigurationSection>

        <ConfigurationSection
          title="Mission Profile"
          description="Defines the primary mission characteristics used during scenario generation."
        >
          <Select label="Primary Mission Type">
            <option value="">Select mission type</option>
            <option value="combat_air_patrol">Combat Air Patrol</option>
            <option value="strike">Strike</option>
            <option value="intercept">Intercept</option>
            <option value="reconnaissance">Reconnaissance</option>
            <option value="training">Training</option>
          </Select>

          <Select label="Mission Priority">
            <option value="">Select priority</option>
            <option value="low">Low</option>
            <option value="normal">Normal</option>
            <option value="high">High</option>
            <option value="critical">Critical</option>
          </Select>
        </ConfigurationSection>

        <ConfigurationSection
          title="Scheduling Behavior"
          description="Controls whether missions are generated sequentially or distributed across the simulation window."
        >
          <Toggle label="Enable Random Scheduling" />

          <Toggle label="Allow Mission Overlap" />
        </ConfigurationSection>

        <ConfigurationSection
          title="Mission Rules"
          description="Defines basic operational rules applied before missions are assigned to resources."
        >
          <Input
            label="Minimum Preparation Time (minutes)"
            type="number"
            min="0"
            placeholder="30"
          />

          <Input
            label="Mission Duration Estimate (minutes)"
            type="number"
            min="1"
            placeholder="90"
          />
        </ConfigurationSection>
      </ConfigurationGrid>
    </ConfigurationPanel>
  );
};

export default MissionConfiguration;
