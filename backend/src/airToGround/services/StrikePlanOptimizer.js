class StrikePlanOptimizer {
  optimize(results = []) {
    const validPlans = results.filter((result) => result.valid);

    if (validPlans.length === 0) {
      return {
        bestPlan: null,
        fastestPlan: null,
        lowestResourcePlan: null,
      };
    }

    const bestPlan = [...validPlans].sort((a, b) =>
      this.compareBestPlans(a, b),
    )[0];

    const fastestPlan = [...validPlans].sort(
      (a, b) =>
        a.sortieDuration - b.sortieDuration ||
        a.aircraftCount - b.aircraftCount ||
        a.totalWeaponCount - b.totalWeaponCount,
    )[0];

    const lowestResourcePlan = [...validPlans].sort(
      (a, b) =>
        a.aircraftCount - b.aircraftCount ||
        a.totalWeaponCount - b.totalWeaponCount ||
        a.totalAttackPower - b.totalAttackPower ||
        a.sortieDuration - b.sortieDuration,
    )[0];

    return { bestPlan, fastestPlan, lowestResourcePlan };
  }

  compareBestPlans(a, b) {
    // First choose the plan whose delivered damage is closest to the requested
    // objective. This prevents an unnecessarily destructive weapon from being
    // selected merely because it finishes faster. When over-damage is equal,
    // prefer fewer aircraft, fewer weapons, and then the shorter mission.
    return (
      a.excessDamagePercentage - b.excessDamagePercentage ||
      a.aircraftCount - b.aircraftCount ||
      a.totalWeaponCount - b.totalWeaponCount ||
      a.sortieDuration - b.sortieDuration ||
      a.totalAttackPower - b.totalAttackPower
    );
  }
}

module.exports = StrikePlanOptimizer;
