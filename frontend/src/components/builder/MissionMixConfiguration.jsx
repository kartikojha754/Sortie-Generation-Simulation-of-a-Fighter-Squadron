import ConfigurationPanel from "../configuration/ConfigurationPanel";
import ConfigurationGrid from "../configuration/ConfigurationGrid";
import ConfigurationSection from "../configuration/ConfigurationSection";

import Input from "../common/Input";
import Select from "../common/Select";
import Toggle from "../common/Toggle";

import { useScenarioSection } from "../../hooks/useScenarioSection";

const MissionMixConfiguration = () => {
  const { section: missionMix, updateField } = useScenarioSection(
    "scenario",
    "missionMix",
  );

  return (
    <ConfigurationPanel
      eyebrow="Mission Mix"
      title="Mission Mix Configuration"
      description="Define the distribution of mission categories used when generating sorties for the scenario."
    >
      <ConfigurationGrid columns={2}>
        <ConfigurationSection title="Mission Distribution">
          <Input
            label="Combat Air Patrol (%)"
            type="number"
            min="0"
            max="100"
            value={missionMix.combatAirPatrolPercent}
            onChange={(e) =>
              updateField("combatAirPatrolPercent", Number(e.target.value))
            }
          />

          <Input
            label="Strike Missions (%)"
            type="number"
            min="0"
            max="100"
            value={missionMix.strikePercent}
            onChange={(e) =>
              updateField("strikePercent", Number(e.target.value))
            }
          />

          <Input
            label="Intercept Missions (%)"
            type="number"
            min="0"
            max="100"
            value={missionMix.interceptPercent}
            onChange={(e) =>
              updateField("interceptPercent", Number(e.target.value))
            }
          />

          <Input
            label="Reconnaissance Missions (%)"
            type="number"
            min="0"
            max="100"
            value={missionMix.reconnaissancePercent}
            onChange={(e) =>
              updateField("reconnaissancePercent", Number(e.target.value))
            }
          />
        </ConfigurationSection>

        <ConfigurationSection title="Training & Support">
          <Input
            label="Training Missions (%)"
            type="number"
            min="0"
            max="100"
            value={missionMix.trainingPercent}
            onChange={(e) =>
              updateField("trainingPercent", Number(e.target.value))
            }
          />

          <Toggle
            label="Allow Support Missions"
            checked={missionMix.supportMissions}
            onChange={(e) => updateField("supportMissions", e.target.checked)}
          />

          <Select
            label="Support Mission Type"
            value={missionMix.supportMissionType}
            onChange={(e) => updateField("supportMissionType", e.target.value)}
          >
            <option value="air_refueling">Air Refueling</option>
            <option value="escort">Escort</option>
            <option value="standby">Standby Alert</option>
          </Select>
        </ConfigurationSection>

        <ConfigurationSection title="Mission Complexity">
          <Select
            label="Complexity Level"
            value={missionMix.complexityLevel}
            onChange={(e) => updateField("complexityLevel", e.target.value)}
          >
            <option value="low">Low Complexity</option>
            <option value="medium">Medium Complexity</option>
            <option value="high">High Complexity</option>
            <option value="mixed">Mixed Complexity</option>
          </Select>

          <Toggle
            label="Allow Mixed Mission Packages"
            checked={missionMix.mixedMissionPackages}
            onChange={(e) =>
              updateField("mixedMissionPackages", e.target.checked)
            }
          />
        </ConfigurationSection>

        <ConfigurationSection title="Priority Mix">
          <Input
            label="High Priority Mission Share (%)"
            type="number"
            min="0"
            max="100"
            value={missionMix.highPrioritySharePercent}
            onChange={(e) =>
              updateField("highPrioritySharePercent", Number(e.target.value))
            }
          />

          <Toggle
            label="Allow Critical Mission Injection"
            checked={missionMix.criticalMissionInjection}
            onChange={(e) =>
              updateField("criticalMissionInjection", e.target.checked)
            }
          />
        </ConfigurationSection>
      </ConfigurationGrid>
    </ConfigurationPanel>
  );
};

export default MissionMixConfiguration;
