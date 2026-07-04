import { runSimulationRequest } from "../api/simulationApi.js";
export function prepareSimulationPayload(scenario) {
  return {
    aircraftCount: scenario.aircraftCount,
    pilotCount: scenario.pilotCount,
    groundCrewCount: scenario.groundCrewCount,
    runwayCount: scenario.runwayCount,
    missionCount: scenario.missionCount,

    weatherCondition: scenario.weatherCondition,
    visibility: scenario.visibility,
    windSpeed: scenario.windSpeed,

    groundAbortRate: scenario.groundAbortRate,
    airAbortRate: scenario.airAbortRate,
    weatherAbortRate: scenario.weatherAbortRate,

    randomScheduling: scenario.randomScheduling,
    missionPlanningEnabled: scenario.missionPlanningEnabled,
    simulationDuration: scenario.simulationDuration,
  };
}

export async function runSimulation(scenario) {
  const payload = prepareSimulationPayload(scenario);
  return await runSimulationRequest(payload);
}
