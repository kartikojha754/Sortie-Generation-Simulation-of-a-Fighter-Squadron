import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function getSimulationHistoryRequest() {
  const response = await axios.get(`${API_BASE_URL}/history`);
  return response.data;
}

export async function getSimulationHistoryByIdRequest(id) {
  const response = await axios.get(`${API_BASE_URL}/history/${id}`);
  return response.data;
}

export async function deleteSimulationHistoryRequest(id) {
  const response = await axios.delete(`${API_BASE_URL}/history/${id}`);
  return response.data;
}
