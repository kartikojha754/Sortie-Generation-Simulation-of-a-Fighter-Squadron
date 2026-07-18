const targets = require("./data/targets");
const weapons = require("./data/weapons");

const StrikeCombinationGenerator = require("./services/StrikeCombinationGenerator");

const StrikePlanEvaluator = require("./services/StrikePlanEvaluator");

const StrikePlanOptimizer = require("./services/StrikePlanOptimizer");

const AirToGroundPlanner = require("./services/AirToGroundPlanner");

function createAirToGroundPlanner() {
  const combinationGenerator = new StrikeCombinationGenerator(weapons);

  const planEvaluator = new StrikePlanEvaluator(weapons);

  const planOptimizer = new StrikePlanOptimizer();

  return new AirToGroundPlanner({
    targets,
    weapons,
    combinationGenerator,
    planEvaluator,
    planOptimizer,
  });
}

module.exports = {
  targets,
  weapons,
  StrikeCombinationGenerator,
  StrikePlanEvaluator,
  StrikePlanOptimizer,
  AirToGroundPlanner,
  createAirToGroundPlanner,
};
