const { entities, enums } = require("../../domain");

const { Mission } = entities;
const { MissionType, MissionPriority, PilotRating } = enums;

const PRIORITY_WEIGHT = {
  [MissionPriority.CRITICAL]: 4,
  [MissionPriority.HIGH]: 3,
  [MissionPriority.MEDIUM]: 2,
  [MissionPriority.LOW]: 1,
};

class MissionPlanner {
  createMissions(count = 5, scenario = {}) {
    if (
      Array.isArray(scenario.missionRequests) &&
      scenario.missionRequests.length > 0
    ) {
      return scenario.missionRequests
        .map((request, index) => {
          const incomingTime = request.incomingTime ?? 0;

          return new Mission({
            id: request.id || `MIS-${index + 1}`,
            name: request.name || `Mission ${index + 1}`,
            type: request.type || MissionType.TRAINING,
            priority: request.priority || MissionPriority.MEDIUM,
            incomingTime,
            scheduledStartTime: incomingTime,
            requiredPilotRating:
              request.requiredPilotRating || PilotRating.WINGMAN,
            duration: request.duration || 90,
          });
        })
        .sort((a, b) => this.compareMissions(a, b));
    }

    const missions = [];

    for (let i = 1; i <= count; i++) {
      missions.push(
        new Mission({
          id: `MIS-${i}`,
          name: `Mission ${i}`,
          type: scenario.randomScheduling
            ? this.getRandomMissionType()
            : MissionType.TRAINING,
          priority: MissionPriority.MEDIUM,
          incomingTime: i * 120,
          scheduledStartTime: i * 120,
          requiredPilotRating: PilotRating.WINGMAN,
          duration: 90,
        }),
      );
    }

    return missions.sort((a, b) => this.compareMissions(a, b));
  }

  compareMissions(a, b) {
    const priorityDifference =
      (PRIORITY_WEIGHT[b.priority] || 0) - (PRIORITY_WEIGHT[a.priority] || 0);

    if (priorityDifference !== 0) {
      return priorityDifference;
    }

    return (a.incomingTime || 0) - (b.incomingTime || 0);
  }

  getRandomMissionType() {
    const types = Object.values(MissionType);
    return types[Math.floor(Math.random() * types.length)];
  }
}

module.exports = MissionPlanner;
