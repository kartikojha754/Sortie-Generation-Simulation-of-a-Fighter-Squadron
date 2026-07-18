class StrikeCombinationGenerator {
  constructor(weapons = []) {
    this.weapons = weapons;
  }

  generate(options = {}) {
    const requestedMaximum = Number(options.maxAircraft || 4);
    const maxAircraft = Math.max(1, Math.min(requestedMaximum, 4));
    const combinations = [];

    for (let aircraftCount = 1; aircraftCount <= maxAircraft; aircraftCount++) {
      this.generateSingleWeaponCombinations(aircraftCount, combinations);
      this.generateTwoWeaponCombinations(aircraftCount, combinations);
    }

    return combinations.map((combination, index) => ({
      id: `PLAN-${index + 1}`,
      ...combination,
    }));
  }

  generateSingleWeaponCombinations(aircraftCount, combinations) {
    for (const weapon of this.weapons) {
      for (
        let quantityPerAircraft = 1;
        quantityPerAircraft <= weapon.maxPerAircraft;
        quantityPerAircraft++
      ) {
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

  generateTwoWeaponCombinations(aircraftCount, combinations) {
    for (let i = 0; i < this.weapons.length; i++) {
      for (let j = i + 1; j < this.weapons.length; j++) {
        const firstWeapon = this.weapons[i];
        const secondWeapon = this.weapons[j];

        for (
          let firstQuantity = 1;
          firstQuantity <= firstWeapon.maxPerAircraft;
          firstQuantity++
        ) {
          for (
            let secondQuantity = 1;
            secondQuantity <= secondWeapon.maxPerAircraft;
            secondQuantity++
          ) {
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
