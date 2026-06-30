import ConfigurationPanel from "../configuration/ConfigurationPanel";
import ConfigurationGrid from "../configuration/ConfigurationGrid";
import ConfigurationSection from "../configuration/ConfigurationSection";

import Input from "../common/Input";
import Select from "../common/Select";
import Toggle from "../common/Toggle";

const EnvironmentConfiguration = () => {
  return (
    <ConfigurationPanel
      eyebrow="Environment"
      title="Environment Configuration"
      description="Define weather, visibility, wind, and time-of-day conditions that influence sortie execution and abort probability."
    >
      <ConfigurationGrid columns={2}>
        <ConfigurationSection
          title="Weather Conditions"
          description="Sets the primary environmental condition for the simulation window."
        >
          <Select label="Weather Condition">
            <option value="">Select weather</option>
            <option value="clear">Clear</option>
            <option value="cloudy">Cloudy</option>
            <option value="rain">Rain</option>
            <option value="storm">Storm</option>
            <option value="fog">Fog</option>
          </Select>

          <Input
            label="Weather Severity (%)"
            type="number"
            min="0"
            max="100"
            placeholder="20"
          />
        </ConfigurationSection>

        <ConfigurationSection
          title="Visibility"
          description="Controls how visibility affects mission launch and completion conditions."
        >
          <Input
            label="Visibility Range (km)"
            type="number"
            min="0"
            placeholder="10"
          />

          <Toggle label="Allow Low Visibility Operations" />
        </ConfigurationSection>

        <ConfigurationSection
          title="Wind Conditions"
          description="Defines wind impact on takeoff, landing, and mission safety."
        >
          <Input
            label="Wind Speed (knots)"
            type="number"
            min="0"
            placeholder="12"
          />

          <Input
            label="Crosswind Limit (knots)"
            type="number"
            min="0"
            placeholder="25"
          />
        </ConfigurationSection>

        <ConfigurationSection
          title="Time Conditions"
          description="Defines whether missions occur during day, night, or mixed operational windows."
        >
          <Select label="Time of Day">
            <option value="">Select time condition</option>
            <option value="day">Day Operations</option>
            <option value="night">Night Operations</option>
            <option value="mixed">Mixed Day/Night</option>
          </Select>

          <Toggle label="Enable Night Operation Penalty" />
        </ConfigurationSection>
      </ConfigurationGrid>
    </ConfigurationPanel>
  );
};

export default EnvironmentConfiguration;
