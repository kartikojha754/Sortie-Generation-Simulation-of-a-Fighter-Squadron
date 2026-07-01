import apiClient from "./apiClient";

export const runSampleSimulation = async () => {
  const response = await apiClient.get("/simulation/sample");
  return response.data;
};

export const runSampleSummary = async () => {
  const response = await apiClient.get("/simulation/sample/summary");
  return response.data;
};

export const runCustomSimulation = async (scenarioPayload) => {
  const response = await apiClient.post("/simulation/run", scenarioPayload);
  return response.data;
};

export const runCustomSummary = async (scenarioPayload) => {
  const response = await apiClient.post(
    "/simulation/run/summary",
    scenarioPayload,
  );
  return response.data;
};

export const simulationApi = {
  runSampleSimulation,
  runSampleSummary,
  runCustomSimulation,
  runCustomSummary,
};
