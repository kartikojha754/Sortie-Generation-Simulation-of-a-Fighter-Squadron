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

    const achievableDamagePoints = Math.min(
      target.hp,
      totalAttackPower * availableAttackTimeMinutes,
    );
    const achievedDamagePercentage = Math.min(
      100,
      (achievableDamagePoints / target.hp) * 100,
    );

    const attackTimeMinutes = requiredDamagePoints / totalAttackPower;
    const sortieDuration = roundTripTravelTimeMinutes + attackTimeMinutes;
    const withinTime = sortieDuration <= maxTime;
    const damageRequirementMet =
      achievedDamagePercentage + 0.0001 >= requestedDamagePercent;
    const valid = withinTime && damageRequirementMet;

    let classification = "FAILED";
    if (achievedDamagePercentage >= 100) classification = "TARGET_DESTROYED";
    else if (damageRequirementMet) classification = "PARTIAL_SUCCESS";

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
      attackPowerPerAircraft: this.round(attackPowerPerAircraft),
      totalAttackPower: this.round(totalAttackPower),
      weaponsPerAircraft,
      totalWeaponCount,
      requestedDamagePercentage: requestedDamagePercent,
      requiredDamagePoints: this.round(requiredDamagePoints),
      achievableDamagePoints: this.round(achievableDamagePoints),
      achievedDamagePercentage: this.round(achievedDamagePercentage),
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
