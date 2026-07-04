const { entities, enums } = require("../domain");

const { Aircraft, Pilot, GroundCrew, Runway, Weather, Squadron, Scenario } =
  entities;

const { PilotRating, WeatherCondition } = enums;

function createCustomScenario(input = {}) {
  const aircraftCount = input.aircraftCount || 6;
  const groundCrewCount = input.groundCrewCount || 4;
  const runwayCount = input.runwayCount || 2;

  const pilotLevels = input.pilotLevels || {
    [PilotRating.WINGMAN]: input.pilotCount || 6,
  };

  const pilotCount = Object.values(pilotLevels).reduce(
    (sum, count) => sum + Number(count || 0),
    0,
  );

  const missionRequests = Array.isArray(input.missionRequests)
    ? input.missionRequests
    : [];

  const missionCount =
    missionRequests.length > 0
      ? missionRequests.length
      : input.missionCount || 5;

  const squadron = new Squadron({
    id: input.squadronId || "SQ-CUSTOM",
    name: input.squadronName || "Custom Fighter Squadron",
  });

  for (let i = 1; i <= aircraftCount; i++) {
    squadron.addAircraft(
      new Aircraft({
        id: `AC-${i}`,
        tailNumber: `F16-${i}`,
        aircraftType: "F-16C",
      }),
    );
  }

  let pilotIndex = 1;

  Object.entries(pilotLevels).forEach(([rating, count]) => {
    for (let i = 1; i <= Number(count); i++) {
      squadron.addPilot(
        new Pilot({
          id: `P-${pilotIndex}`,
          name: `${rating} Pilot ${i}`,
          rank: "Officer",
          rating,
        }),
      );

      pilotIndex++;
    }
  });

  for (let i = 1; i <= groundCrewCount; i++) {
    squadron.addGroundCrew(
      new GroundCrew({
        id: `GC-${i}`,
        name: `Ground Crew ${i}`,
        role: "Technician",
      }),
    );
  }

  for (let i = 1; i <= runwayCount; i++) {
    squadron.addRunway(
      new Runway({
        id: `RW-${i}`,
        name: `Runway ${i}`,
      }),
    );
  }

  squadron.setWeather(
    new Weather({
      id: "W-CUSTOM",
      condition: input.weatherCondition || WeatherCondition.CLEAR,
      visibility: input.visibility || 10,
      windSpeed: input.windSpeed || 5,
      isFlyable: input.isFlyable !== undefined ? input.isFlyable : true,
    }),
  );

  const scenario = new Scenario({
    id: input.scenarioId || "SC-CUSTOM",
    name: input.scenarioName || "Custom Scenario",
    description:
      input.description ||
      "User-defined sortie generation simulation scenario.",

    groundAbortRate: input.groundAbortRate || 0,
    airAbortRate: input.airAbortRate || 0,
    weatherAbortRate: input.weatherAbortRate || 0,

    availableAircraft: aircraftCount,
    availablePilots: pilotCount,
    availableGroundCrew: groundCrewCount,
    availableRunways: runwayCount,

    randomScheduling: input.randomScheduling || false,

    missionPlanningEnabled:
      input.missionPlanningEnabled !== undefined
        ? input.missionPlanningEnabled
        : true,

    simulationDuration: input.simulationDuration || 1440,

    missionRequests,
    pilotLevels,
  });

  return {
    squadron,
    scenario,
    missionCount,
  };
}

module.exports = createCustomScenario;
