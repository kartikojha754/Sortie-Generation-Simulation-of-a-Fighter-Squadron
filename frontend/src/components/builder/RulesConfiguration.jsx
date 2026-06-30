import ConfigurationPanel from "../configuration/ConfigurationPanel";
import ConfigurationGrid from "../configuration/ConfigurationGrid";
import ConfigurationSection from "../configuration/ConfigurationSection";

import Input from "../common/Input";
import Select from "../common/Select";
import Toggle from "../common/Toggle";

const RulesConfiguration = () => {
  return (
    <ConfigurationPanel
      eyebrow="Operational Rules"
      title="Simulation Rules"
      description="Configure operational policies, mission failure handling, resource allocation rules, and simulation decision logic."
    >
      <ConfigurationGrid columns={2}>
        <ConfigurationSection
          title="Mission Abort Rules"
          description="Controls when missions are cancelled before or during execution."
        >
          <Toggle label="Enable Ground Abort Logic" />

          <Toggle label="Enable Air Abort Logic" />

          <Input
            label="Maximum Abort Probability (%)"
            type="number"
            min="0"
            max="100"
            placeholder="15"
          />
        </ConfigurationSection>

        <ConfigurationSection
          title="Resource Allocation"
          description="Defines how aircraft and pilots are assigned to missions."
        >
          <Select label="Allocation Strategy">
            <option value="">Select strategy</option>
            <option value="first_available">First Available</option>
            <option value="balanced">Balanced Utilization</option>
            <option value="priority">Priority Based</option>
          </Select>

          <Toggle label="Prevent Resource Overallocation" />
        </ConfigurationSection>

        <ConfigurationSection
          title="Mission Recovery"
          description="Determines how failed or delayed missions are handled."
        >
          <Toggle label="Retry Failed Missions" />

          <Input
            label="Maximum Retry Attempts"
            type="number"
            min="0"
            placeholder="2"
          />
        </ConfigurationSection>

        <ConfigurationSection
          title="Emergency Operations"
          description="Controls emergency sortie generation and high-priority overrides."
        >
          <Toggle label="Enable Emergency Missions" />

          <Toggle label="Allow Priority Resource Override" />
        </ConfigurationSection>
      </ConfigurationGrid>
    </ConfigurationPanel>
  );
};

export default RulesConfiguration;
