import ConfigurationPanel from "../configuration/ConfigurationPanel";
import ConfigurationGrid from "../configuration/ConfigurationGrid";
import ConfigurationSection from "../configuration/ConfigurationSection";

import Input from "../common/Input";
import Select from "../common/Select";
import Toggle from "../common/Toggle";

import { useScenarioSection } from "../../hooks/useScenarioSection";

const RulesConfiguration = () => {
  const { section: rules, updateField } = useScenarioSection(
    "scenario",
    "rules",
  );

  return (
    <ConfigurationPanel
      eyebrow="Operational Rules"
      title="Simulation Rules"
      description="Configure operational policies, mission failure handling, resource allocation rules, and simulation decision logic."
    >
      <ConfigurationGrid columns={2}>
        <ConfigurationSection title="Mission Abort Rules">
          <Toggle
            label="Enable Ground Abort Logic"
            checked={rules.groundAbortLogic}
            onChange={(e) => updateField("groundAbortLogic", e.target.checked)}
          />

          <Toggle
            label="Enable Air Abort Logic"
            checked={rules.airAbortLogic}
            onChange={(e) => updateField("airAbortLogic", e.target.checked)}
          />

          <Input
            label="Maximum Abort Probability (%)"
            type="number"
            min="0"
            max="100"
            value={rules.maxAbortProbabilityPercent}
            onChange={(e) =>
              updateField("maxAbortProbabilityPercent", Number(e.target.value))
            }
          />
        </ConfigurationSection>

        <ConfigurationSection title="Resource Allocation">
          <Select
            label="Allocation Strategy"
            value={rules.allocationStrategy}
            onChange={(e) => updateField("allocationStrategy", e.target.value)}
          >
            <option value="first_available">First Available</option>
            <option value="balanced">Balanced Utilization</option>
            <option value="priority">Priority Based</option>
          </Select>

          <Toggle
            label="Prevent Resource Overallocation"
            checked={rules.preventOverallocation}
            onChange={(e) =>
              updateField("preventOverallocation", e.target.checked)
            }
          />
        </ConfigurationSection>

        <ConfigurationSection title="Mission Recovery">
          <Toggle
            label="Retry Failed Missions"
            checked={rules.retryFailedMissions}
            onChange={(e) =>
              updateField("retryFailedMissions", e.target.checked)
            }
          />

          <Input
            label="Maximum Retry Attempts"
            type="number"
            min="0"
            value={rules.maxRetryAttempts}
            onChange={(e) =>
              updateField("maxRetryAttempts", Number(e.target.value))
            }
          />
        </ConfigurationSection>

        <ConfigurationSection title="Emergency Operations">
          <Toggle
            label="Enable Emergency Missions"
            checked={rules.emergencyMissions}
            onChange={(e) => updateField("emergencyMissions", e.target.checked)}
          />

          <Toggle
            label="Allow Priority Resource Override"
            checked={rules.priorityOverride}
            onChange={(e) => updateField("priorityOverride", e.target.checked)}
          />
        </ConfigurationSection>
      </ConfigurationGrid>
    </ConfigurationPanel>
  );
};

export default RulesConfiguration;
