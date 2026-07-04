import {
  getSimulationHistoryRequest,
  getSimulationHistoryByIdRequest,
  deleteSimulationHistoryRequest,
} from "../api/historyApi";

export async function getSimulationHistory() {
  return await getSimulationHistoryRequest();
}

export async function getSimulationHistoryById(id) {
  return await getSimulationHistoryByIdRequest(id);
}

export async function deleteSimulationHistory(id) {
  return await deleteSimulationHistoryRequest(id);
}
