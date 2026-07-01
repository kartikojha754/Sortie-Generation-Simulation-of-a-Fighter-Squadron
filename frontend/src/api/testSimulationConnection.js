import apiClient from "./apiClient";

export const simulationApi = {
  runSampleSimulation: async () => {
    const response = await apiClient.get("/simulation/sample");
    return response.data;
  },

  runSampleSummary: async () => {
    const response = await apiClient.get("/simulation/sample/summary");
    return response.data;
  },

  runCustomSimulation: async (scenarioPayload) => {
    const response = await apiClient.post("/simulation/run", scenarioPayload);
    return response.data;
  },

  runCustomSummary: async (scenarioPayload) => {
    const response = await apiClient.post(
      "/simulation/run/summary",
      scenarioPayload,
    );
    return response.data;
  },
};
