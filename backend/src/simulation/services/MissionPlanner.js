const { Mission } = require("../../domain").entities;
const { MissionType, MissionPriority } = require("../../domain").enums;

/**
 * Creates missions for the simulation.
 */
class MissionPlanner {
    createMissions(count = 5, scenario = {}) {
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
                    scheduledStartTime: i * 120
                })
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