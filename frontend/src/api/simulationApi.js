import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api/simulation";

export async function runCustomSimulation(simulationInput) {
  const response = await axios.post(`${API_BASE_URL}/run`, simulationInput);

  return response.data;
}

export async function runCustomSimulationSummary(simulationInput) {
  const response = await axios.post(
    `${API_BASE_URL}/run/summary`,
    simulationInput,
  );

  return response.data;
}

export async function runSampleSimulation() {
  const response = await axios.get(`${API_BASE_URL}/sample`);

  return response.data;
}

export async function runSampleSimulationSummary() {
  const response = await axios.get(`${API_BASE_URL}/sample/summary`);

  return response.data;
}
