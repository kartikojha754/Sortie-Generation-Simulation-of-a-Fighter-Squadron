const { weapons } = require("../../airToGround");

class WeaponInventoryManager {
  constructor(initialInventory = {}) {
    this.initialInventory = this.normalize(initialInventory);
    this.remainingInventory = { ...this.initialInventory };
    this.consumedInventory = Object.fromEntries(
      Object.keys(this.initialInventory).map((type) => [type, 0]),
    );
    this.consumptionLog = [];
  }

  normalize(inventory = {}) {
    const normalized = {};

    for (const weapon of weapons) {
      const raw = inventory?.[weapon.type] ?? inventory?.[weapon.id];
      const fallback = Number(weapon.defaultAvailableQuantity || 0);
      const parsed = raw === undefined || raw === null || raw === ""
        ? fallback
        : Number(raw);

      normalized[weapon.type] = Math.max(
        0,
        Number.isFinite(parsed) ? Math.floor(parsed) : 0,
      );
    }

    return normalized;
  }

  canConsume(weaponUsage = {}) {
    return Object.entries(weaponUsage).every(([type, quantity]) => {
      return Number(this.remainingInventory[type] || 0) >= Number(quantity || 0);
    });
  }

  consume(missionId, weaponUsage = {}, time = 0) {
    if (!this.canConsume(weaponUsage)) return false;

    for (const [type, quantityValue] of Object.entries(weaponUsage)) {
      const quantity = Math.max(0, Number(quantityValue || 0));
      this.remainingInventory[type] = Number(this.remainingInventory[type] || 0) - quantity;
      this.consumedInventory[type] = Number(this.consumedInventory[type] || 0) + quantity;
    }

    this.consumptionLog.push({
      missionId,
      time,
      weaponUsage: { ...weaponUsage },
      remainingInventory: this.getRemaining(),
    });

    return true;
  }

  getInitial() {
    return { ...this.initialInventory };
  }

  getRemaining() {
    return { ...this.remainingInventory };
  }

  getConsumed() {
    return { ...this.consumedInventory };
  }

  getReport() {
    return {
      initial: this.getInitial(),
      consumed: this.getConsumed(),
      remaining: this.getRemaining(),
      consumptionLog: this.consumptionLog.map((entry) => ({ ...entry })),
    };
  }
}

module.exports = WeaponInventoryManager;
