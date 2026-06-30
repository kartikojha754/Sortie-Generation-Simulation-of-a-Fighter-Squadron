import ConfigurationPanel from "../configuration/ConfigurationPanel";
import ConfigurationGrid from "../configuration/ConfigurationGrid";
import ConfigurationSection from "../configuration/ConfigurationSection";

import Input from "../common/Input";
import Toggle from "../common/Toggle";

const ResourceConstraints = () => {
  return (
    <ConfigurationPanel
      eyebrow="Constraints"
      title="Resource Constraints"
      description="Define logistical and operational resource limits that affect sortie generation capacity."
    >
      <ConfigurationGrid columns={2}>
        <ConfigurationSection
          title="Fuel Constraints"
          description="Controls available fuel reserves and fuel usage limits for generated missions."
        >
          <Input
            label="Total Fuel Reserve (units)"
            type="number"
            min="0"
            placeholder="50000"
          />

          <Input
            label="Average Fuel Per Mission"
            type="number"
            min="0"
            placeholder="2500"
          />
        </ConfigurationSection>

        <ConfigurationSection
          title="Spare Parts"
          description="Defines availability of spare parts required for aircraft recovery and maintenance."
        >
          <Input
            label="Spare Parts Inventory"
            type="number"
            min="0"
            placeholder="120"
          />

          <Input
            label="Average Parts Used Per Maintenance"
            type="number"
            min="0"
            placeholder="3"
          />
        </ConfigurationSection>

        <ConfigurationSection
          title="Maintenance Capacity"
          description="Controls how many aircraft can be handled by maintenance resources at the same time."
        >
          <Input
            label="Maintenance Bays"
            type="number"
            min="0"
            placeholder="4"
          />

          <Input
            label="Max Concurrent Maintenance Jobs"
            type="number"
            min="0"
            placeholder="3"
          />
        </ConfigurationSection>

        <ConfigurationSection
          title="Operational Reserve"
          description="Defines minimum resource reserves that should not be consumed during normal operations."
        >
          <Toggle label="Maintain Aircraft Reserve" />

          <Input
            label="Reserved Aircraft Count"
            type="number"
            min="0"
            placeholder="2"
          />

          <Toggle label="Maintain Fuel Reserve" />

          <Input
            label="Fuel Reserve Threshold (%)"
            type="number"
            min="0"
            max="100"
            placeholder="15"
          />
        </ConfigurationSection>
      </ConfigurationGrid>
    </ConfigurationPanel>
  );
};

export default ResourceConstraints;
