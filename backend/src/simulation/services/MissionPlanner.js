const { entities, enums } = require("../../domain");

const { Mission } = entities;
const { MissionType, MissionPriority, PilotRating } = enums;

class MissionPlanner {
  createMissions(count = 5, scenario = {}) {
    const missionCount = Number(count || 5);

    if (scenario.randomScheduling) {
      return this.createRandomMissions(missionCount, scenario);
    }

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

    for (let i = 1; i <= missionCount; i++) {
      const incomingTime = i * 120;

      missions.push(
        new Mission({
          id: `MIS-${i}`,
          name: `Mission ${i}`,
          type: MissionType.TRAINING,
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

  createRandomMissions(count = 5, scenario = {}) {
    const missionCount = Math.max(1, Number(count || 5));
    const simulationDuration = Math.max(
      60,
      Number(scenario.simulationDuration || 1440),
    );

    const missions = [];

    for (let i = 1; i <= missionCount; i++) {
      const type = this.getRandomMissionType();
      const priority = this.getRandomMissionPriority();
      const requiredPilotRating = this.getRandomPilotRating(priority);
      const duration = this.getRandomDuration(type, priority);
      const incomingTime = this.getRandomIncomingTime(
        simulationDuration,
        duration,
      );

      missions.push(
        new Mission({
          id: `MIS-${i}`,
          name: `${this.formatMissionName(type)} ${i}`,
          type,
          priority,
          incomingTime,
          scheduledStartTime: incomingTime,
          requiredPilotRating,
          duration,
        }),
      );
    }

    return missions.sort((a, b) => a.incomingTime - b.incomingTime);
  }

  getRandomMissionType() {
    return this.pickRandom(Object.values(MissionType));
  }

  getRandomMissionPriority() {
    return this.pickWeighted([
      { value: MissionPriority.LOW, weight: 25 },
      { value: MissionPriority.MEDIUM, weight: 40 },
      { value: MissionPriority.HIGH, weight: 25 },
      { value: MissionPriority.CRITICAL, weight: 10 },
    ]);
  }

  getRandomPilotRating(priority) {
    const ratingOptionsByPriority = {
      [MissionPriority.LOW]: [
        PilotRating.TRAINEE,
        PilotRating.WINGMAN,
        PilotRating.FLIGHT_LEAD,
      ],
      [MissionPriority.MEDIUM]: [
        PilotRating.WINGMAN,
        PilotRating.FLIGHT_LEAD,
        PilotRating.FOUR_SHIP_LEAD,
      ],
      [MissionPriority.HIGH]: [
        PilotRating.FLIGHT_LEAD,
        PilotRating.FOUR_SHIP_LEAD,
        PilotRating.INSTRUCTOR,
      ],
      [MissionPriority.CRITICAL]: [
        PilotRating.FOUR_SHIP_LEAD,
        PilotRating.INSTRUCTOR,
      ],
    };

    return this.pickRandom(
      ratingOptionsByPriority[priority] || [PilotRating.WINGMAN],
    );
  }

  getRandomDuration(type, priority) {
    const durationRangesByType = {
      [MissionType.TRAINING]: [45, 90],
      [MissionType.AIR_TO_AIR]: [75, 150],
      [MissionType.AIR_TO_GROUND]: [90, 180],
      [MissionType.RECONNAISSANCE]: [90, 210],
      [MissionType.DEFENSIVE_PATROL]: [120, 240],
      [MissionType.OFFENSIVE_PATROL]: [120, 240],
      [MissionType.ESCORT]: [90, 180],
      [MissionType.INTERCEPTION]: [45, 120],
    };

    const [min, max] = durationRangesByType[type] || [60, 120];

    const priorityDurationBoost = {
      [MissionPriority.LOW]: 0,
      [MissionPriority.MEDIUM]: 10,
      [MissionPriority.HIGH]: 20,
      [MissionPriority.CRITICAL]: 30,
    };

    return (
      this.randomInteger(min, max) + (priorityDurationBoost[priority] || 0)
    );
  }

  getRandomIncomingTime(simulationDuration, duration) {
    const latestUsefulArrival = Math.max(0, simulationDuration - duration - 60);
    return this.randomInteger(0, latestUsefulArrival);
  }

  formatMissionName(type) {
    return type
      .toLowerCase()
      .split("_")
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(" ");
  }

  pickRandom(items) {
    return items[Math.floor(Math.random() * items.length)];
  }

  pickWeighted(options) {
    const totalWeight = options.reduce((sum, option) => sum + option.weight, 0);
    let randomValue = Math.random() * totalWeight;

    for (const option of options) {
      randomValue -= option.weight;
      if (randomValue <= 0) return option.value;
    }

    return options[options.length - 1].value;
  }

  randomInteger(min, max) {
    const lower = Math.ceil(min);
    const upper = Math.floor(max);

    return Math.floor(Math.random() * (upper - lower + 1)) + lower;
  }
}

module.exports = MissionPlanner;
