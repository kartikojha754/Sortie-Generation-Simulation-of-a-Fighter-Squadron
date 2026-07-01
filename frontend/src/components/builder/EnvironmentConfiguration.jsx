import ConfigurationPanel from "../configuration/ConfigurationPanel";
import ConfigurationGrid from "../configuration/ConfigurationGrid";
import ConfigurationSection from "../configuration/ConfigurationSection";

import Input from "../common/Input";
import Select from "../common/Select";
import Toggle from "../common/Toggle";

import { useScenarioSection } from "../../hooks/useScenarioSection";

const EnvironmentConfiguration = () => {
  const { section: environment, updateField } = useScenarioSection(
    "scenario",
    "environment",
  );

  return (
    <ConfigurationPanel
      eyebrow="Environment"
      title="Environment Configuration"
      description="Define weather, visibility, wind, and time-of-day conditions."
    >
      <ConfigurationGrid columns={2}>
        <ConfigurationSection title="Weather">
          <Select
            label="Weather Condition"
            value={environment.weatherCondition}
            onChange={(e) => updateField("weatherCondition", e.target.value)}
          >
            <option value="clear">Clear</option>
            <option value="cloudy">Cloudy</option>
            <option value="rain">Rain</option>
            <option value="storm">Storm</option>
            <option value="fog">Fog</option>
          </Select>

          <Input
            label="Weather Severity (%)"
            type="number"
            value={environment.weatherSeverityPercent}
            onChange={(e) =>
              updateField("weatherSeverityPercent", Number(e.target.value))
            }
          />
        </ConfigurationSection>

        <ConfigurationSection title="Visibility">
          <Input
            label="Visibility Range (km)"
            type="number"
            value={environment.visibilityRangeKm}
            onChange={(e) =>
              updateField("visibilityRangeKm", Number(e.target.value))
            }
          />

          <Toggle
            label="Allow Low Visibility Operations"
            checked={environment.lowVisibilityOperations}
            onChange={(e) =>
              updateField("lowVisibilityOperations", e.target.checked)
            }
          />
        </ConfigurationSection>

        <ConfigurationSection title="Wind">
          <Input
            label="Wind Speed (knots)"
            type="number"
            value={environment.windSpeedKnots}
            onChange={(e) =>
              updateField("windSpeedKnots", Number(e.target.value))
            }
          />

          <Input
            label="Crosswind Limit (knots)"
            type="number"
            value={environment.crosswindLimitKnots}
            onChange={(e) =>
              updateField("crosswindLimitKnots", Number(e.target.value))
            }
          />
        </ConfigurationSection>

        <ConfigurationSection title="Time">
          <Select
            label="Time of Day"
            value={environment.timeOfDay}
            onChange={(e) => updateField("timeOfDay", e.target.value)}
          >
            <option value="day">Day</option>
            <option value="night">Night</option>
            <option value="mixed">Mixed</option>
          </Select>

          <Toggle
            label="Enable Night Operation Penalty"
            checked={environment.nightOperationPenalty}
            onChange={(e) =>
              updateField("nightOperationPenalty", e.target.checked)
            }
          />
        </ConfigurationSection>
      </ConfigurationGrid>
    </ConfigurationPanel>
  );
};

export default EnvironmentConfiguration;
