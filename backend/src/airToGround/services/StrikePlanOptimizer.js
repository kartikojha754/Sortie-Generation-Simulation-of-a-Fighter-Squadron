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

    const bestPlan = [...validPlans].sort((a, b) => this.compareBestPlans(a, b))[0];
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
        a.sortieDuration - b.sortieDuration,
    )[0];

    return { bestPlan, fastestPlan, lowestResourcePlan };
  }

  compareBestPlans(a, b) {
    return (
      a.aircraftCount - b.aircraftCount ||
      a.totalWeaponCount - b.totalWeaponCount ||
      a.sortieDuration - b.sortieDuration ||
      b.achievedDamagePercentage - a.achievedDamagePercentage
    );
  }
}

module.exports = StrikePlanOptimizer;
