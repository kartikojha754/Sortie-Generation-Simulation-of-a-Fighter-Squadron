import ConfigurationPanel from "../configuration/ConfigurationPanel";
import ConfigurationGrid from "../configuration/ConfigurationGrid";
import ConfigurationSection from "../configuration/ConfigurationSection";

import Input from "../common/Input";
import Select from "../common/Select";
import Toggle from "../common/Toggle";

const SchedulingConfiguration = () => {
  return (
    <ConfigurationPanel
      eyebrow="Scheduling"
      title="Scheduling Configuration"
      description="Define how missions are sequenced, prioritized, and distributed across the simulation timeline."
    >
      <ConfigurationGrid columns={2}>
        <ConfigurationSection
          title="Scheduling Strategy"
          description="Controls how the backend chooses the next mission to generate or assign."
        >
          <Select label="Mission Scheduling Strategy">
            <option value="">Select strategy</option>
            <option value="sequential">Sequential Scheduling</option>
            <option value="priority_based">Priority Based</option>
            <option value="balanced">Balanced Resource Usage</option>
            <option value="randomized">Randomized Scheduling</option>
          </Select>

          <Toggle label="Enable Dynamic Re-Scheduling" />
        </ConfigurationSection>

        <ConfigurationSection
          title="Timeline Distribution"
          description="Defines how sorties are distributed across the available simulation duration."
        >
          <Select label="Distribution Mode">
            <option value="">Select distribution</option>
            <option value="even">Evenly Distributed</option>
            <option value="front_loaded">Front Loaded</option>
            <option value="back_loaded">Back Loaded</option>
            <option value="random">Random Distribution</option>
          </Select>

          <Input
            label="Minimum Gap Between Missions (minutes)"
            type="number"
            min="0"
            placeholder="10"
          />
        </ConfigurationSection>

        <ConfigurationSection
          title="Priority Handling"
          description="Controls how high-priority missions affect resource allocation."
        >
          <Toggle label="Prioritize Critical Missions" />

          <Input
            label="Priority Boost Factor"
            type="number"
            min="1"
            placeholder="2"
          />
        </ConfigurationSection>

        <ConfigurationSection
          title="Delay Handling"
          description="Defines how the simulation responds when required resources are not available."
        >
          <Select label="Delay Policy">
            <option value="">Select policy</option>
            <option value="wait">Wait Until Resources Available</option>
            <option value="skip">Skip Mission</option>
            <option value="abort">Mark as Ground Abort</option>
          </Select>

          <Input
            label="Maximum Allowed Delay (minutes)"
            type="number"
            min="0"
            placeholder="60"
          />
        </ConfigurationSection>
      </ConfigurationGrid>
    </ConfigurationPanel>
  );
};

export default SchedulingConfiguration;
