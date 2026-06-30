import ConfigurationPanel from "../configuration/ConfigurationPanel";
import ConfigurationGrid from "../configuration/ConfigurationGrid";
import ConfigurationSection from "../configuration/ConfigurationSection";

import Input from "../common/Input";
import Select from "../common/Select";
import Toggle from "../common/Toggle";

const RunwayConfiguration = () => {
  return (
    <ConfigurationPanel
      eyebrow="Runways"
      title="Runway Configuration"
      description="Configure runway infrastructure, operational availability, scheduling constraints, and throughput limits."
    >
      <ConfigurationGrid columns={2}>
        <ConfigurationSection
          title="Runway Resources"
          description="Defines the available runway infrastructure for the squadron."
        >
          <Input label="Total Runways" type="number" min="1" placeholder="2" />

          <Input
            label="Operational Runways"
            type="number"
            min="1"
            placeholder="2"
          />
        </ConfigurationSection>

        <ConfigurationSection
          title="Runway Capacity"
          description="Controls how many aircraft operations each runway can support."
        >
          <Input
            label="Takeoffs per Hour"
            type="number"
            min="1"
            placeholder="20"
          />

          <Input
            label="Landings per Hour"
            type="number"
            min="1"
            placeholder="20"
          />
        </ConfigurationSection>

        <ConfigurationSection
          title="Operational Rules"
          description="Determines whether runway availability changes during simulation."
        >
          <Toggle label="Enable Runway Maintenance" />

          <Toggle label="Allow Temporary Runway Closure" />
        </ConfigurationSection>

        <ConfigurationSection
          title="Scheduling"
          description="Defines timing constraints applied while assigning aircraft to runways."
        >
          <Select label="Scheduling Strategy">
            <option value="">Select strategy</option>
            <option value="fifo">First In First Out</option>
            <option value="priority">Mission Priority</option>
            <option value="balanced">Balanced Utilization</option>
          </Select>

          <Input
            label="Minimum Separation (minutes)"
            type="number"
            min="1"
            placeholder="3"
          />
        </ConfigurationSection>
      </ConfigurationGrid>
    </ConfigurationPanel>
  );
};

export default RunwayConfiguration;
