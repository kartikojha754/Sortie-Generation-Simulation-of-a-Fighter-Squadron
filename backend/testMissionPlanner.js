const MissionPlanner = require("./src/simulation/services/MissionPlanner");

const planner = new MissionPlanner();

const scenario = {
  randomScheduling: false,

  aircraftSpeedKmph: 900,

  maxStrikeAircraft: 4,

  missionRequests: [
    {
      id: "MIS-STRIKE-1",

      name: "Destroy Radar Station",

      type: "AIR_TO_GROUND",

      priority: "HIGH",

      incomingTime: 60,

      requiredPilotRating: "FLIGHT_LEAD",

      // Maximum mission time
      duration: 120,

      targetId: "TARGET-RADAR-STATION",

      aircraftSpeedKmph: 900,
    },

    {
      id: "MIS-TRAINING-1",

      name: "Training Flight",

      type: "TRAINING",

      priority: "LOW",

      incomingTime: 100,

      requiredPilotRating: "WINGMAN",

      duration: 90,
    },
  ],
};

try {
  const missions = planner.createMissions(
    scenario.missionRequests.length,
    scenario,
  );

  console.log(
    JSON.stringify(
      missions.map((mission) => mission.toJSON()),
      null,
      2,
    ),
  );
} catch (error) {
  console.error("Mission planner test failed:", error);
}
