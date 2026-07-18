const { createAirToGroundPlanner } = require("./src/airToGround");

function testPlanner() {
  const planner = createAirToGroundPlanner();

  const result = planner.plan({
    targetId: "TARGET-RADAR-STATION",

    // Maximum allowed mission time in minutes
    maximumAllowedTime: 120,

    aircraftSpeedKmph: 900,

    maxAircraft: 4,
  });

  console.log(JSON.stringify(result, null, 2));
}

try {
  testPlanner();
} catch (error) {
  console.error("AIR_TO_GROUND planner test failed:", error);
}
