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

    const fastestPlan = [...validPlans].sort((a, b) => {
      if (a.sortieDuration !== b.sortieDuration) {
        return a.sortieDuration - b.sortieDuration;
      }

      return a.aircraftCount - b.aircraftCount;
    })[0];

    const lowestResourcePlan = [...validPlans].sort((a, b) => {
      if (a.aircraftCount !== b.aircraftCount) {
        return a.aircraftCount - b.aircraftCount;
      }

      if (a.totalWeaponCount !== b.totalWeaponCount) {
        return a.totalWeaponCount - b.totalWeaponCount;
      }

      return a.sortieDuration - b.sortieDuration;
    })[0];

    return {
      bestPlan,
      fastestPlan,
      lowestResourcePlan,
    };
  }

  compareBestPlans(a, b) {
    if (a.aircraftCount !== b.aircraftCount) {
      return a.aircraftCount - b.aircraftCount;
    }

    if (a.sortieDuration !== b.sortieDuration) {
      return a.sortieDuration - b.sortieDuration;
    }

    if (a.totalWeaponCount !== b.totalWeaponCount) {
      return a.totalWeaponCount - b.totalWeaponCount;
    }

    return b.totalAttackPower - a.totalAttackPower;
  }
}

module.exports = StrikePlanOptimizer;
