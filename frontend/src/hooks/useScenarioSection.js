import { useScenario } from "../context/ScenarioContext";

export const useScenarioSection = (parentKey, sectionName) => {
  const { scenario, updateScenarioField } = useScenario();

  const section = scenario[parentKey][sectionName];

  const updateField = (fieldName, value) => {
    updateScenarioField(parentKey, sectionName, fieldName, value);
  };

  return {
    section,
    updateField,
  };
};
