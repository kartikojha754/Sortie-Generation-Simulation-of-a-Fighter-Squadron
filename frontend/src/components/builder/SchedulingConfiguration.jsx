import ConfigurationPanel from "../configuration/ConfigurationPanel";
import ConfigurationGrid from "../configuration/ConfigurationGrid";
import ConfigurationSection from "../configuration/ConfigurationSection";

import Input from "../common/Input";
import Select from "../common/Select";
import Toggle from "../common/Toggle";

import { useScenarioSection } from "../../hooks/useScenarioSection";

const SchedulingConfiguration = () => {
  const { section: scheduling, updateField } = useScenarioSection(
    "scenario",
    "scheduling",
  );

  return (
    <ConfigurationPanel
      eyebrow="Scheduling"
      title="Scheduling Configuration"
      description="Configure mission sequencing and timeline behavior."
    >
      <ConfigurationGrid columns={2}>
        <ConfigurationSection title="Scheduling Strategy">
          <Select
            label="Mission Scheduling Strategy"
            value={scheduling.missionSchedulingStrategy}
            onChange={(e) =>
              updateField("missionSchedulingStrategy", e.target.value)
            }
          >
            <option value="sequential">Sequential</option>
            <option value="priority_based">Priority Based</option>
            <option value="balanced">Balanced</option>
            <option value="randomized">Randomized</option>
          </Select>

          <Toggle
            label="Enable Dynamic Re-Scheduling"
            checked={scheduling.dynamicRescheduling}
            onChange={(e) =>
              updateField("dynamicRescheduling", e.target.checked)
            }
          />
        </ConfigurationSection>

        <ConfigurationSection title="Timeline Distribution">
          <Select
            label="Distribution Mode"
            value={scheduling.distributionMode}
            onChange={(e) => updateField("distributionMode", e.target.value)}
          >
            <option value="even">Even</option>
            <option value="front_loaded">Front Loaded</option>
            <option value="back_loaded">Back Loaded</option>
            <option value="random">Random</option>
          </Select>

          <Input
            label="Minimum Gap (minutes)"
            type="number"
            value={scheduling.minimumGapMinutes}
            onChange={(e) =>
              updateField("minimumGapMinutes", Number(e.target.value))
            }
          />
        </ConfigurationSection>

        <ConfigurationSection title="Priority">
          <Toggle
            label="Prioritize Critical Missions"
            checked={scheduling.prioritizeCriticalMissions}
            onChange={(e) =>
              updateField("prioritizeCriticalMissions", e.target.checked)
            }
          />

          <Input
            label="Priority Boost Factor"
            type="number"
            value={scheduling.priorityBoostFactor}
            onChange={(e) =>
              updateField("priorityBoostFactor", Number(e.target.value))
            }
          />
        </ConfigurationSection>

        <ConfigurationSection title="Delay Handling">
          <Select
            label="Delay Policy"
            value={scheduling.delayPolicy}
            onChange={(e) => updateField("delayPolicy", e.target.value)}
          >
            <option value="wait">Wait</option>
            <option value="skip">Skip</option>
            <option value="abort">Ground Abort</option>
          </Select>

          <Input
            label="Maximum Delay (minutes)"
            type="number"
            value={scheduling.maxAllowedDelayMinutes}
            onChange={(e) =>
              updateField("maxAllowedDelayMinutes", Number(e.target.value))
            }
          />
        </ConfigurationSection>
      </ConfigurationGrid>
    </ConfigurationPanel>
  );
};

export default SchedulingConfiguration;
