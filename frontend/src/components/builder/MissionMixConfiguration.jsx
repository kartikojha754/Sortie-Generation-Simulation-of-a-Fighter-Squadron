import ConfigurationPanel from "../configuration/ConfigurationPanel";
import ConfigurationGrid from "../configuration/ConfigurationGrid";
import ConfigurationSection from "../configuration/ConfigurationSection";

import Input from "../common/Input";
import Select from "../common/Select";
import Toggle from "../common/Toggle";

const MissionMixConfiguration = () => {
  return (
    <ConfigurationPanel
      eyebrow="Mission Mix"
      title="Mission Mix Configuration"
      description="Define the distribution of mission categories used when generating sorties for the scenario."
    >
      <ConfigurationGrid columns={2}>
        <ConfigurationSection
          title="Mission Distribution"
          description="Controls the percentage split between different mission categories."
        >
          <Input
            label="Combat Air Patrol (%)"
            type="number"
            min="0"
            max="100"
            placeholder="35"
          />

          <Input
            label="Strike Missions (%)"
            type="number"
            min="0"
            max="100"
            placeholder="25"
          />

          <Input
            label="Intercept Missions (%)"
            type="number"
            min="0"
            max="100"
            placeholder="20"
          />

          <Input
            label="Reconnaissance Missions (%)"
            type="number"
            min="0"
            max="100"
            placeholder="10"
          />
        </ConfigurationSection>

        <ConfigurationSection
          title="Training & Support"
          description="Adds non-combat mission categories into the generated sortie plan."
        >
          <Input
            label="Training Missions (%)"
            type="number"
            min="0"
            max="100"
            placeholder="10"
          />

          <Toggle label="Allow Support Missions" />

          <Select label="Support Mission Type">
            <option value="">Select support mission</option>
            <option value="air_refueling">Air Refueling</option>
            <option value="escort">Escort</option>
            <option value="standby">Standby Alert</option>
          </Select>
        </ConfigurationSection>

        <ConfigurationSection
          title="Mission Complexity"
          description="Defines how demanding the generated mission set should be."
        >
          <Select label="Complexity Level">
            <option value="">Select complexity</option>
            <option value="low">Low Complexity</option>
            <option value="medium">Medium Complexity</option>
            <option value="high">High Complexity</option>
            <option value="mixed">Mixed Complexity</option>
          </Select>

          <Toggle label="Allow Mixed Mission Packages" />
        </ConfigurationSection>

        <ConfigurationSection
          title="Priority Mix"
          description="Controls how many generated missions should receive elevated priority."
        >
          <Input
            label="High Priority Mission Share (%)"
            type="number"
            min="0"
            max="100"
            placeholder="30"
          />

          <Toggle label="Allow Critical Mission Injection" />
        </ConfigurationSection>
      </ConfigurationGrid>
    </ConfigurationPanel>
  );
};

export default MissionMixConfiguration;
