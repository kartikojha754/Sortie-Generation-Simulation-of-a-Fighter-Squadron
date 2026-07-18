class AirToGroundPlanner {
  constructor({
    targets,
    weapons,
    combinationGenerator,
    planEvaluator,
    planOptimizer,
  }) {
    this.targets = targets;
    this.weapons = weapons;
    this.combinationGenerator = combinationGenerator;
    this.planEvaluator = planEvaluator;
    this.planOptimizer = planOptimizer;
  }

  plan({
    targetId,
    maximumAllowedTime,
    aircraftSpeedKmph = 900,
    maxAircraft = 4,
    weaponInventory = {},
  }) {
    const target = this.findTarget(targetId);

    if (!target) {
      return {
        success: false,
        failureReason: "TARGET_NOT_FOUND",
        target: null,
        weaponInventory: {},
        results: [],
        generatedPlanCount: 0,
        validPlanCount: 0,
        bestPlan: null,
        fastestPlan: null,
        lowestResourcePlan: null,
      };
    }

    const normalizedInventory =
      this.combinationGenerator.normalizeInventory(weaponInventory);

    const combinations = this.combinationGenerator.generate({
      maxAircraft,
      weaponInventory: normalizedInventory,
    });

    if (combinations.length === 0) {
      return {
        success: false,
        failureReason: "WEAPON_INVENTORY_UNAVAILABLE",
        target,
        weaponInventory: normalizedInventory,
        results: [],
        generatedPlanCount: 0,
        validPlanCount: 0,
        bestPlan: null,
        fastestPlan: null,
        lowestResourcePlan: null,
      };
    }

    const results = combinations.map((combination) =>
      this.planEvaluator.evaluate({
        combination,
        target,
        maximumAllowedTime,
        aircraftSpeedKmph,
      }),
    );

    const optimized = this.planOptimizer.optimize(results);

    if (!optimized.bestPlan) {
      return {
        success: false,
        failureReason: "TIME_CONSTRAINT_EXCEEDED",
        target,
        weaponInventory: normalizedInventory,
        generatedPlanCount: results.length,
        validPlanCount: 0,
        results,
        ...optimized,
      };
    }

    return {
      success: true,
      failureReason: null,
      target,
      weaponInventory: normalizedInventory,
      generatedPlanCount: results.length,

      validPlanCount: results.filter((result) => result.valid).length,

      results,
      ...optimized,
    };
  }

  findTarget(targetId) {
    if (!targetId) {
      return this.targets[0] || null;
    }

    return (
      this.targets.find(
        (target) => target.id === targetId || target.type === targetId,
      ) || null
    );
  }
}

module.exports = AirToGroundPlanner;
