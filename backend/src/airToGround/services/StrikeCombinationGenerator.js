class StrikeCombinationGenerator {
  constructor(weapons = []) {
    this.weapons = weapons;
  }

  normalizeInventory(providedInventory = {}) {
    const inventory = {};

    for (const weapon of this.weapons) {
      const supplied = providedInventory?.[weapon.type] ?? providedInventory?.[weapon.id];
      const fallback = Number(weapon.defaultAvailableQuantity || 0);
      const parsed = supplied === undefined || supplied === null || supplied === ""
        ? fallback
        : Number(supplied);

      inventory[weapon.type] = Math.max(
        0,
        Number.isFinite(parsed) ? Math.floor(parsed) : 0,
      );
    }

    return inventory;
  }

  generate(options = {}) {
    const requestedMaximum = Number(options.maxAircraft || 4);
    const maxAircraft = Math.max(1, Math.min(requestedMaximum, 4));
    const weaponInventory = this.normalizeInventory(options.weaponInventory);
    const combinations = [];

    for (let aircraftCount = 1; aircraftCount <= maxAircraft; aircraftCount++) {
      this.generateSingleWeaponCombinations(
        aircraftCount,
        weaponInventory,
        combinations,
      );
      this.generateTwoWeaponCombinations(
        aircraftCount,
        weaponInventory,
        combinations,
      );
    }

    return combinations.map((combination, index) => ({
      id: `PLAN-${index + 1}`,
      ...combination,
    }));
  }

  generateSingleWeaponCombinations(aircraftCount, inventory, combinations) {
    for (const weapon of this.weapons) {
      for (
        let quantityPerAircraft = 1;
        quantityPerAircraft <= weapon.maxPerAircraft;
        quantityPerAircraft++
      ) {
        const totalRequired = quantityPerAircraft * aircraftCount;
        if (totalRequired > (inventory[weapon.type] || 0)) continue;

        combinations.push({
          aircraftCount,
          loadout: [{
            weaponId: weapon.id,
            weaponType: weapon.type,
            quantityPerAircraft,
          }],
        });
      }
    }
  }

  generateTwoWeaponCombinations(aircraftCount, inventory, combinations) {
    for (let i = 0; i < this.weapons.length; i++) {
      for (let j = i + 1; j < this.weapons.length; j++) {
        const firstWeapon = this.weapons[i];
        const secondWeapon = this.weapons[j];

        for (
          let firstQuantity = 1;
          firstQuantity <= firstWeapon.maxPerAircraft;
          firstQuantity++
        ) {
          const firstRequired = firstQuantity * aircraftCount;
          if (firstRequired > (inventory[firstWeapon.type] || 0)) continue;

          for (
            let secondQuantity = 1;
            secondQuantity <= secondWeapon.maxPerAircraft;
            secondQuantity++
          ) {
            const secondRequired = secondQuantity * aircraftCount;
            if (secondRequired > (inventory[secondWeapon.type] || 0)) continue;

            combinations.push({
              aircraftCount,
              loadout: [
                {
                  weaponId: firstWeapon.id,
                  weaponType: firstWeapon.type,
                  quantityPerAircraft: firstQuantity,
                },
                {
                  weaponId: secondWeapon.id,
                  weaponType: secondWeapon.type,
                  quantityPerAircraft: secondQuantity,
                },
              ],
            });
          }
        }
      }
    }
  }
}

module.exports = StrikeCombinationGenerator;
