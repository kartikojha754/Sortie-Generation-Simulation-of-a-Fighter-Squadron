import ConfigurationPanel from "../configuration/ConfigurationPanel";
import ConfigurationGrid from "../configuration/ConfigurationGrid";
import ConfigurationSection from "../configuration/ConfigurationSection";

import Input from "../common/Input";
import Select from "../common/Select";
import Toggle from "../common/Toggle";

import { useScenarioSection } from "../../hooks/useScenarioSection";

const RunwayConfiguration = () => {
  const { section: runways, updateField } = useScenarioSection(
    "squadron",
    "runways",
  );

  return (
    <ConfigurationPanel
      eyebrow="Runways"
      title="Runway Configuration"
      description="Configure runway infrastructure, operational availability, scheduling constraints, and throughput limits."
    >
      <ConfigurationGrid columns={2}>
        <ConfigurationSection title="Runway Resources">
          <Input
            label="Total Runways"
            type="number"
            value={runways.totalRunways}
            onChange={(e) =>
              updateField("totalRunways", Number(e.target.value))
            }
          />

          <Input
            label="Operational Runways"
            type="number"
            value={runways.operationalRunways}
            onChange={(e) =>
              updateField("operationalRunways", Number(e.target.value))
            }
          />
        </ConfigurationSection>

        <ConfigurationSection title="Runway Capacity">
          <Input
            label="Takeoffs per Hour"
            type="number"
            value={runways.takeoffsPerHour}
            onChange={(e) =>
              updateField("takeoffsPerHour", Number(e.target.value))
            }
          />

          <Input
            label="Landings per Hour"
            type="number"
            value={runways.landingsPerHour}
            onChange={(e) =>
              updateField("landingsPerHour", Number(e.target.value))
            }
          />
        </ConfigurationSection>

        <ConfigurationSection title="Operational Rules">
          <Toggle
            label="Enable Runway Maintenance"
            checked={runways.runwayMaintenance}
            onChange={(e) => updateField("runwayMaintenance", e.target.checked)}
          />

          <Toggle
            label="Allow Temporary Runway Closure"
            checked={runways.temporaryClosure}
            onChange={(e) => updateField("temporaryClosure", e.target.checked)}
          />
        </ConfigurationSection>

        <ConfigurationSection title="Scheduling">
          <Select
            label="Scheduling Strategy"
            value={runways.schedulingStrategy}
            onChange={(e) => updateField("schedulingStrategy", e.target.value)}
          >
            <option value="fifo">First In First Out</option>
            <option value="priority">Mission Priority</option>
            <option value="balanced">Balanced Utilization</option>
          </Select>

          <Input
            label="Minimum Separation (minutes)"
            type="number"
            value={runways.minimumSeparationMinutes}
            onChange={(e) =>
              updateField("minimumSeparationMinutes", Number(e.target.value))
            }
          />
        </ConfigurationSection>
      </ConfigurationGrid>
    </ConfigurationPanel>
  );
};

export default RunwayConfiguration;
