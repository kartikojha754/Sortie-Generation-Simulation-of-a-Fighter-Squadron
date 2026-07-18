const weapons = [
  {
    id: "WEAPON-AIRCRAFT-GUN",
    type: "AIRCRAFT_GUN",
    minAttackPower: 8,
    maxAttackPower: 14,
    maxPerAircraft: 2,

    // Used only when inventory is not supplied.
    defaultAvailableQuantity: 4,
  },
  {
    id: "WEAPON-LIGHT-BOMB",
    type: "LIGHT_BOMB",
    minAttackPower: 35,
    maxAttackPower: 55,
    maxPerAircraft: 4,
    defaultAvailableQuantity: 8,
  },
  {
    id: "WEAPON-HEAVY-BOMB",
    type: "HEAVY_BOMB",
    minAttackPower: 65,
    maxAttackPower: 90,
    maxPerAircraft: 2,
    defaultAvailableQuantity: 4,
  },
  {
    id: "WEAPON-AIR-TO-GROUND-MISSILE",
    type: "AIR_TO_GROUND_MISSILE",
    minAttackPower: 75,
    maxAttackPower: 105,
    maxPerAircraft: 4,
    defaultAvailableQuantity: 6,
  },
  {
    id: "WEAPON-HEAVY-AIR-TO-GROUND-MISSILE",
    type: "HEAVY_AIR_TO_GROUND_MISSILE",
    minAttackPower: 120,
    maxAttackPower: 160,
    maxPerAircraft: 2,
    defaultAvailableQuantity: 2,
  },
];

module.exports = weapons;
