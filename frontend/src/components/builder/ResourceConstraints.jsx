import ConfigurationPanel from "../configuration/ConfigurationPanel";
import ConfigurationGrid from "../configuration/ConfigurationGrid";
import ConfigurationSection from "../configuration/ConfigurationSection";

import Input from "../common/Input";
import Select from "../common/Select";
import Toggle from "../common/Toggle";

import { useScenarioSection } from "../../hooks/useScenarioSection";

const ResourceConstraints = () => {
  const { section: constraints, updateField } = useScenarioSection(
    "scenario",
    "constraints",
  );

  return (
    <ConfigurationPanel
      eyebrow="Constraints"
      title="Resource Constraints"
      description="Define consumable and operational constraints that may limit sortie generation even when aircraft and pilots are available."
    >
      <ConfigurationGrid columns={2}>
        <ConfigurationSection title="Fuel Constraints">
          <Input
            label="Available Fuel Units"
            type="number"
            min="0"
            value={constraints.availableFuelUnits}
            onChange={(e) =>
              updateField("availableFuelUnits", Number(e.target.value))
            }
          />

          <Input
            label="Average Fuel Per Mission"
            type="number"
            min="0"
            value={constraints.averageFuelPerMission}
            onChange={(e) =>
              updateField("averageFuelPerMission", Number(e.target.value))
            }
          />
        </ConfigurationSection>

        <ConfigurationSection title="Weapons Stock">
          <Input
            label="Available Weapon Packages"
            type="number"
            min="0"
            value={constraints.availableWeaponPackages}
            onChange={(e) =>
              updateField("availableWeaponPackages", Number(e.target.value))
            }
          />

          <Select
            label="Weapon Allocation Policy"
            value={constraints.weaponAllocationPolicy}
            onChange={(e) =>
              updateField("weaponAllocationPolicy", e.target.value)
            }
          >
            <option value="first_available">First Available</option>
            <option value="priority_based">Priority Based</option>
            <option value="conservative">Conservative Usage</option>
          </Select>
        </ConfigurationSection>

        <ConfigurationSection title="Spare Parts">
          <Input
            label="Spare Parts Stock"
            type="number"
            min="0"
            value={constraints.sparePartsStock}
            onChange={(e) =>
              updateField("sparePartsStock", Number(e.target.value))
            }
          />

          <Toggle
            label="Limit Maintenance by Spare Parts"
            checked={constraints.limitMaintenanceBySpareParts}
            onChange={(e) =>
              updateField("limitMaintenanceBySpareParts", e.target.checked)
            }
          />
        </ConfigurationSection>

        <ConfigurationSection title="Constraint Policy">
          <Select
            label="Constraint Enforcement"
            value={constraints.constraintEnforcement}
            onChange={(e) =>
              updateField("constraintEnforcement", e.target.value)
            }
          >
            <option value="strict">Strict</option>
            <option value="balanced">Balanced</option>
            <option value="relaxed">Relaxed</option>
          </Select>

          <Toggle
            label="Allow Resource Override for Critical Missions"
            checked={constraints.resourceOverrideForCriticalMissions}
            onChange={(e) =>
              updateField(
                "resourceOverrideForCriticalMissions",
                e.target.checked,
              )
            }
          />
        </ConfigurationSection>
      </ConfigurationGrid>
    </ConfigurationPanel>
  );
};

export default ResourceConstraints;
