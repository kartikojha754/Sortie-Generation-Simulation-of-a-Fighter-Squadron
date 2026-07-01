export const updateScenarioSection = (
  scenario,
  sectionName,
  fieldName,
  value,
) => {
  return {
    ...scenario,
    [sectionName]: {
      ...scenario[sectionName],
      [fieldName]: value,
    },
  };
};
