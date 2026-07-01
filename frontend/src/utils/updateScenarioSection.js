export const updateScenarioSection = (
  currentScenario,
  parentKey,
  sectionName,
  fieldName,
  value,
) => {
  return {
    ...currentScenario,
    [parentKey]: {
      ...currentScenario[parentKey],
      [sectionName]: {
        ...currentScenario[parentKey][sectionName],
        [fieldName]: value,
      },
    },
  };
};
