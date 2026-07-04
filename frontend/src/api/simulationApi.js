import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function runSimulationRequest(payload) {
  const response = await axios.post(`${API_BASE_URL}/simulation/run`, payload);

  return response.data;
}
