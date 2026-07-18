class StrikeCombinationGenerator {
  constructor(weapons = []) {
    this.weapons = weapons;
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

    return combinations;
  }

  normalizeInventory(providedInventory = {}) {
    const inventory = {};

    for (const weapon of this.weapons) {
      const suppliedValue =
        providedInventory?.[weapon.type] ?? providedInventory?.[weapon.id];

      const quantity =
        suppliedValue !== undefined &&
        suppliedValue !== null &&
        suppliedValue !== ""
          ? Number(suppliedValue)
          : Number(weapon.defaultAvailableQuantity || 0);

      inventory[weapon.type] = Math.max(
        0,
        Number.isFinite(quantity) ? Math.floor(quantity) : 0,
      );
    }

    return inventory;
  }

  generateSingleWeaponCombinations(
    aircraftCount,
    weaponInventory,
    combinations,
  ) {
    for (const weapon of this.weapons) {
      for (
        let quantityPerAircraft = 1;
        quantityPerAircraft <= weapon.maxPerAircraft;
        quantityPerAircraft++
      ) {
        const totalRequired = quantityPerAircraft * aircraftCount;

        if (totalRequired > (weaponInventory[weapon.type] || 0)) {
          continue;
        }

        combinations.push({
          aircraftCount,

          loadout: [
            {
              weaponId: weapon.id,
              weaponType: weapon.type,
              quantityPerAircraft,
            },
          ],
        });
      }
    }
  }

  generateTwoWeaponCombinations(aircraftCount, weaponInventory, combinations) {
    for (let i = 0; i < this.weapons.length; i++) {
      for (let j = i + 1; j < this.weapons.length; j++) {
        const firstWeapon = this.weapons[i];
        const secondWeapon = this.weapons[j];

        for (
          let firstQuantity = 1;
          firstQuantity <= firstWeapon.maxPerAircraft;
          firstQuantity++
        ) {
          const totalFirstRequired = firstQuantity * aircraftCount;

          if (totalFirstRequired > (weaponInventory[firstWeapon.type] || 0)) {
            continue;
          }

          for (
            let secondQuantity = 1;
            secondQuantity <= secondWeapon.maxPerAircraft;
            secondQuantity++
          ) {
            const totalSecondRequired = secondQuantity * aircraftCount;

            if (
              totalSecondRequired > (weaponInventory[secondWeapon.type] || 0)
            ) {
              continue;
            }

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
