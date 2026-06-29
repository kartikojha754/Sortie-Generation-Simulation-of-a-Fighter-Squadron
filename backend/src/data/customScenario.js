const { entities, enums } = require("../domain");

const { Aircraft, Pilot, GroundCrew, Runway, Weather, Squadron, Scenario } =
  entities;

const { PilotRating, WeatherCondition } = enums;

function createCustomScenario(input = {}) {
  const aircraftCount = input.aircraftCount || 6;
  const pilotCount = input.pilotCount || 6;
  const groundCrewCount = input.groundCrewCount || 4;
  const runwayCount = input.runwayCount || 2;
  const missionCount = input.missionCount || 5;

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

  for (let i = 1; i <= pilotCount; i++) {
    squadron.addPilot(
      new Pilot({
        id: `P-${i}`,
        name: `Pilot ${i}`,
        rank: "Officer",
        rating: PilotRating.WINGMAN,
      }),
    );
  }

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
  });

  return {
    squadron,
    scenario,
    missionCount,
  };
}

module.exports = createCustomScenario;
