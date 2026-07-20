const PRIORITY_WEIGHT = Object.freeze({
  CRITICAL: 4,
  HIGH: 3,
  MEDIUM: 2,
  LOW: 1,
});

/**
 * Stores missions that have arrived but have not yet been dispatched.
 *
 * This queue is separate from EventQueue:
 * - EventQueue decides which simulation event executes next by time.
 * - PendingMissionQueue decides which ready mission gets resource priority.
 */
class PendingMissionQueue {
  constructor() {
    this.missions = [];
  }

  enqueue(mission, currentTime = 0) {
    if (!mission || !mission.id) {
      throw new Error("A valid mission is required.");
    }

    if (this.has(mission.id)) return false;

    if (mission.queueEnteredTime == null) {
      mission.queueEnteredTime = currentTime;
    }

    this.missions.push(mission);
    this.sort();
    return true;
  }

  remove(missionId) {
    const index = this.missions.findIndex((mission) => mission.id === missionId);
    if (index === -1) return null;
    return this.missions.splice(index, 1)[0];
  }

  has(missionId) {
    return this.missions.some((mission) => mission.id === missionId);
  }

  getAll() {
    this.sort();
    return [...this.missions];
  }

  size() {
    return this.missions.length;
  }

  isEmpty() {
    return this.missions.length === 0;
  }

  clear() {
    this.missions = [];
  }

  sort() {
    this.missions.sort((a, b) => {
      const priorityDifference =
        (PRIORITY_WEIGHT[b.priority] || 0) -
        (PRIORITY_WEIGHT[a.priority] || 0);

      if (priorityDifference !== 0) return priorityDifference;

      const incomingDifference =
        Number(a.incomingTime || 0) - Number(b.incomingTime || 0);

      if (incomingDifference !== 0) return incomingDifference;

      const queueDifference =
        Number(a.queueEnteredTime || 0) - Number(b.queueEnteredTime || 0);

      if (queueDifference !== 0) return queueDifference;

      return String(a.id).localeCompare(String(b.id));
    });
  }

  toJSON() {
    return this.getAll().map((mission) => ({
      missionId: mission.id,
      priority: mission.priority,
      status: mission.status,
      queueEnteredTime: mission.queueEnteredTime,
      retryCount: mission.retryCount || 0,
      waitingReason: mission.waitingReason || null,
    }));
  }
}

module.exports = PendingMissionQueue;
