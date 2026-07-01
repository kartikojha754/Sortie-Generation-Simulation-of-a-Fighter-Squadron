import { simulationApi } from "../api/simulationApi";

export const simulationService = {
  runScenario: async (scenarioPayload) => {
    const response = await simulationApi.runCustomSimulation(scenarioPayload);

    return {
      success: response.success,
      message: response.message,
      data: response.data,
    };
  },

  runScenarioSummary: async (scenarioPayload) => {
    const response = await simulationApi.runCustomSummary(scenarioPayload);

    return {
      success: response.success,
      message: response.message,
      data: response.data,
    };
  },
};
