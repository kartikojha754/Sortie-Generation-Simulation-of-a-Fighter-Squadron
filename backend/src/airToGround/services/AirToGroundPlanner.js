class AirToGroundPlanner {
  constructor({ targets, combinationGenerator, planEvaluator, planOptimizer }) {
    this.targets = targets;
    this.combinationGenerator = combinationGenerator;
    this.planEvaluator = planEvaluator;
    this.planOptimizer = planOptimizer;
  }

  plan({
    targetId,
    maximumAllowedTime,
    requiredDamagePercentage = 100,
    aircraftSpeedKmph = 900,
    maxAircraft = 4,
  }) {
    const target = this.findTarget(targetId);

    if (!target) {
      return this.failure("TARGET_NOT_FOUND", null, []);
    }

    const combinations = this.combinationGenerator.generate({ maxAircraft });
    const results = combinations.map((combination) =>
      this.planEvaluator.evaluate({
        combination,
        target,
        maximumAllowedTime,
        requiredDamagePercentage,
        aircraftSpeedKmph,
      }),
    );

    const optimized = this.planOptimizer.optimize(results);
    if (!optimized.bestPlan) {
      const hasDamageCapablePlan = results.some(
        (result) => result.damageRequirementMet,
      );
      return {
        ...this.failure(
          hasDamageCapablePlan
            ? "TIME_CONSTRAINT_EXCEEDED"
            : "DAMAGE_REQUIREMENT_NOT_MET",
          target,
          results,
        ),
        ...optimized,
      };
    }

    return {
      success: true,
      failureReason: null,
      target,
      requestedDamagePercentage: Number(requiredDamagePercentage),
      generatedPlanCount: results.length,
      validPlanCount: results.filter((result) => result.valid).length,
      results,
      ...optimized,
    };
  }

  failure(failureReason, target, results) {
    return {
      success: false,
      failureReason,
      target,
      generatedPlanCount: results.length,
      validPlanCount: 0,
      results,
      bestPlan: null,
      fastestPlan: null,
      lowestResourcePlan: null,
    };
  }

  findTarget(targetId) {
    if (!targetId) return this.targets[0] || null;
    return (
      this.targets.find(
        (target) => target.id === targetId || target.type === targetId,
      ) || null
    );
  }
}

module.exports = AirToGroundPlanner;
