const { entities, enums } = require("../../domain");

const { Mission } = entities;
const { MissionType, MissionPriority, PilotRating } = enums;

class MissionPlanner {
  createMissions(count = 5, scenario = {}) {
    if (
      Array.isArray(scenario.missionRequests) &&
      scenario.missionRequests.length > 0
    ) {
      return scenario.missionRequests.map((request, index) => {
        const incomingTime = Number(request.incomingTime ?? 0);

        return new Mission({
          id: request.id || `MIS-${index + 1}`,
          name: request.name || `Mission ${index + 1}`,
          type: request.type || MissionType.TRAINING,
          priority: request.priority || MissionPriority.MEDIUM,
          incomingTime,
          scheduledStartTime: incomingTime,
          requiredPilotRating:
            request.requiredPilotRating || PilotRating.WINGMAN,
          duration: Number(request.duration || 90),
        });
      });
    }

    const missions = [];

    for (let i = 1; i <= count; i++) {
      const incomingTime = i * 120;

      missions.push(
        new Mission({
          id: `MIS-${i}`,
          name: `Mission ${i}`,
          type: scenario.randomScheduling
            ? this.getRandomMissionType()
            : MissionType.TRAINING,
          priority: MissionPriority.MEDIUM,
          incomingTime,
          scheduledStartTime: incomingTime,
          requiredPilotRating: PilotRating.WINGMAN,
          duration: 90,
        }),
      );
    }

    return missions;
  }

  getRandomMissionType() {
    const types = Object.values(MissionType);
    return types[Math.floor(Math.random() * types.length)];
  }
}

module.exports = MissionPlanner;
