import { runSimulationRequest } from "../api/simulationApi.js";

export function prepareSimulationPayload(scenario) {
  const pilotCount = Object.values(scenario.pilotLevels || {}).reduce(
    (sum, count) => sum + Number(count || 0),
    0,
  );

  return {
    aircraftCount: scenario.aircraftCount,
    pilotCount,
    groundCrewCount: scenario.groundCrewCount,
    runwayCount: scenario.runwayCount,
    missionCount: scenario.missionCount,

    pilotLevels: scenario.pilotLevels,
    missionRequests: scenario.missionRequests || [],
    weaponInventory: scenario.weaponInventory || {},
    maxStrikeAircraft: scenario.maxStrikeAircraft || 4,
    aircraftSpeedKmph: scenario.aircraftSpeedKmph || 900,

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
