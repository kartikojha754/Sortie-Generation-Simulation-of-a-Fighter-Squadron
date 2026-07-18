class StrikePlanEvaluator {
  constructor(weapons = []) {
    this.weaponMap = new Map(weapons.map((weapon) => [weapon.id, weapon]));
  }

  evaluate({
    combination,
    target,
    maximumAllowedTime,
    aircraftSpeedKmph = 900,
  }) {
    if (!combination) {
      throw new Error("Strike combination is required.");
    }

    if (!target) {
      throw new Error("Target is required.");
    }

    const maxTime = Number(maximumAllowedTime);
    const speed = Number(aircraftSpeedKmph);

    if (!Number.isFinite(maxTime) || maxTime <= 0) {
      throw new Error(
        "Maximum allowed mission time must be greater than zero.",
      );
    }

    if (!Number.isFinite(speed) || speed <= 0) {
      throw new Error("Aircraft speed must be greater than zero.");
    }

    let attackPowerPerAircraft = 0;
    let weaponsPerAircraft = 0;

    const evaluatedLoadout = combination.loadout.map((loadoutItem) => {
      const weapon = this.weaponMap.get(loadoutItem.weaponId);

      if (!weapon) {
        throw new Error(`Weapon not found: ${loadoutItem.weaponId}`);
      }

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
        attackPowerPerAircraft: loadoutAttackPower,
      };
    });

    const totalAttackPower = attackPowerPerAircraft * combination.aircraftCount;

    const totalWeaponCount = weaponsPerAircraft * combination.aircraftCount;

    const attackTimeMinutes = target.hp / totalAttackPower;

    const oneWayTravelTimeMinutes = (target.distanceKm / speed) * 60;

    const roundTripTravelTimeMinutes = oneWayTravelTimeMinutes * 2;

    const sortieDuration = roundTripTravelTimeMinutes + attackTimeMinutes;

    const valid = sortieDuration <= maxTime;

    return {
      valid,

      failureReason: valid ? null : "TIME_CONSTRAINT_EXCEEDED",

      target: {
        id: target.id,
        type: target.type,
        hp: target.hp,
        distanceKm: target.distanceKm,
      },

      aircraftCount: combination.aircraftCount,

      loadout: evaluatedLoadout,

      attackPowerPerAircraft: this.round(attackPowerPerAircraft),

      totalAttackPower: this.round(totalAttackPower),

      weaponsPerAircraft,

      totalWeaponCount,

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
