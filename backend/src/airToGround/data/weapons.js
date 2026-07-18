const weapons = [
  {
    id: "WEAPON-AIRCRAFT-GUN",
    type: "AIRCRAFT_GUN",
    minAttackPower: 2,
    maxAttackPower: 4,
    maxPerAircraft: 2,
  },
  {
    id: "WEAPON-LIGHT-BOMB",
    type: "LIGHT_BOMB",
    minAttackPower: 8,
    maxAttackPower: 12,
    maxPerAircraft: 4,
  },
  {
    id: "WEAPON-HEAVY-BOMB",
    type: "HEAVY_BOMB",
    minAttackPower: 15,
    maxAttackPower: 22,
    maxPerAircraft: 2,
  },
  {
    id: "WEAPON-AIR-TO-GROUND-MISSILE",
    type: "AIR_TO_GROUND_MISSILE",
    minAttackPower: 18,
    maxAttackPower: 26,
    maxPerAircraft: 4,
  },
  {
    id: "WEAPON-HEAVY-AIR-TO-GROUND-MISSILE",
    type: "HEAVY_AIR_TO_GROUND_MISSILE",
    minAttackPower: 28,
    maxAttackPower: 38,
    maxPerAircraft: 2,
  },
];

module.exports = weapons;
