class StrikePlanEvaluator {
  constructor(weapons = []) {
    this.weaponMap = new Map(weapons.map((weapon) => [weapon.id, weapon]));
  }

  evaluate({
    combination,
    target,
    maximumAllowedTime,
    requiredDamagePercentage = 100,
    aircraftSpeedKmph = 900,
  }) {
    if (!combination) throw new Error("Strike combination is required.");
    if (!target) throw new Error("Target is required.");

    const maxTime = Number(maximumAllowedTime);
    const speed = Number(aircraftSpeedKmph);
    const requestedDamagePercent = Math.min(
      100,
      Math.max(1, Number(requiredDamagePercentage || 100)),
    );

    if (!Number.isFinite(maxTime) || maxTime <= 0) {
      throw new Error("Maximum allowed mission time must be greater than zero.");
    }
    if (!Number.isFinite(speed) || speed <= 0) {
      throw new Error("Aircraft speed must be greater than zero.");
    }

    let attackPowerPerAircraft = 0;
    let weaponsPerAircraft = 0;

    const evaluatedLoadout = combination.loadout.map((loadoutItem) => {
      const weapon = this.weaponMap.get(loadoutItem.weaponId);
      if (!weapon) throw new Error(`Weapon not found: ${loadoutItem.weaponId}`);

      const averageAttackPower =
        (weapon.minAttackPower + weapon.maxAttackPower) / 2;
      const quantityPerAircraft = Number(loadoutItem.quantityPerAircraft);
      const loadoutAttackPower = averageAttackPower * quantityPerAircraft;

      attackPowerPerAircraft += loadoutAttackPower;
      weaponsPerAircraft += quantityPerAircraft;

      return {
        weaponId: weapon.id,
        weaponType: weapon.type,
        quantityPerAircraft,
        totalQuantity: quantityPerAircraft * combination.aircraftCount,
        averageAttackPower,
        attackPowerPerAircraft: this.round(loadoutAttackPower),
      };
    });

    const totalAttackPower = attackPowerPerAircraft * combination.aircraftCount;
    const totalWeaponCount = weaponsPerAircraft * combination.aircraftCount;
    const requiredDamagePoints = target.hp * (requestedDamagePercent / 100);

    const oneWayTravelTimeMinutes = (target.distanceKm / speed) * 60;
    const roundTripTravelTimeMinutes = oneWayTravelTimeMinutes * 2;
    const availableAttackTimeMinutes = Math.max(
      0,
      maxTime - roundTripTravelTimeMinutes,
    );

    const maximumPossibleDamagePoints = Math.min(
      target.hp,
      totalAttackPower * availableAttackTimeMinutes,
    );
    const maximumPossibleDamagePercentage = Math.min(
      100,
      (maximumPossibleDamagePoints / target.hp) * 100,
    );

    // Attacks are evaluated in complete one-minute firing windows. A weapon
    // cannot be credited for an arbitrary fraction of a minute, so a plan may
    // deliver slightly more than the requested damage. This lets the optimizer
    // prefer the package that reaches the objective with the least over-damage.
    const exactAttackTimeMinutes = requiredDamagePoints / totalAttackPower;
    const attackTimeMinutes = Math.ceil(exactAttackTimeMinutes);
    const sortieDuration = roundTripTravelTimeMinutes + attackTimeMinutes;
    const withinTime = sortieDuration <= maxTime;

    const plannedDamagePoints = Math.min(
      target.hp,
      totalAttackPower * attackTimeMinutes,
    );
    const plannedDamagePercentage = Math.min(
      100,
      (plannedDamagePoints / target.hp) * 100,
    );

    const damageRequirementMet =
      plannedDamagePercentage + 0.0001 >= requestedDamagePercent;
    const valid = withinTime && damageRequirementMet;

    const deliveredDamagePoints = valid
      ? plannedDamagePoints
      : maximumPossibleDamagePoints;
    const deliveredDamagePercentage = Math.min(
      100,
      (deliveredDamagePoints / target.hp) * 100,
    );
    const excessDamagePercentage = valid
      ? Math.max(0, deliveredDamagePercentage - requestedDamagePercent)
      : 0;

    const classification = valid ? "SUCCESS" : "FAILURE";

    const weaponUsage = {};
    for (const item of evaluatedLoadout) {
      weaponUsage[item.weaponType] = item.totalQuantity;
    }

    return {
      id: combination.id,
      valid,
      withinTime,
      damageRequirementMet,
      failureReason: valid
        ? null
        : withinTime
          ? "DAMAGE_REQUIREMENT_NOT_MET"
          : "TIME_CONSTRAINT_EXCEEDED",
      classification,
      target: {
        id: target.id,
        type: target.type,
        hp: target.hp,
        distanceKm: target.distanceKm,
      },
      aircraftCount: combination.aircraftCount,
      loadout: evaluatedLoadout,
      combinationName: evaluatedLoadout
        .map(
          (item) =>
            `${item.quantityPerAircraft} × ${item.weaponType.replaceAll("_", " ")}`,
        )
        .join(" + "),
      weaponUsage,
      attackPowerPerAircraft: this.round(attackPowerPerAircraft),
      totalAttackPower: this.round(totalAttackPower),
      weaponsPerAircraft,
      totalWeaponCount,
      requestedDamagePercentage: requestedDamagePercent,
      requiredDamagePoints: this.round(requiredDamagePoints),
      deliveredDamagePoints: this.round(deliveredDamagePoints),
      deliveredDamagePercentage: this.round(deliveredDamagePercentage),
      excessDamagePercentage: this.round(excessDamagePercentage),
      exactAttackTimeMinutes: this.round(exactAttackTimeMinutes),
      maximumPossibleDamagePoints: this.round(maximumPossibleDamagePoints),
      maximumPossibleDamagePercentage: this.round(maximumPossibleDamagePercentage),
      availableAttackTimeMinutes: this.round(availableAttackTimeMinutes),
      attackTimeMinutes: this.round(attackTimeMinutes),
      oneWayTravelTimeMinutes: this.round(oneWayTravelTimeMinutes),
      roundTripTravelTimeMinutes: this.round(roundTripTravelTimeMinutes),
      sortieDuration: this.round(sortieDuration),
      maximumAllowedTime: maxTime,
      remainingTime: valid ? this.round(maxTime - sortieDuration) : 0,
    };
  }

  round(value) {
    return Number(value.toFixed(2));
  }
}

module.exports = StrikePlanEvaluator;
