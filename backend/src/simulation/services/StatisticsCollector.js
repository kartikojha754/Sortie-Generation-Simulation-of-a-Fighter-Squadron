/**
 * Collects simulation metrics.
 */
class StatisticsCollector {
    constructor() {
        this.totalMissions = 0;
        this.completedSorties = 0;
        this.abortedMissions = 0;

        this.groundAborts = 0;
        this.airAborts = 0;
        this.weatherAborts = 0;
    }

    recordMission() {
        this.totalMissions++;
    }

    recordCompletedSortie() {
        this.completedSorties++;
    }

    recordAbort(abortType) {
        this.abortedMissions++;

        if (abortType === "GROUND_ABORT") {
            this.groundAborts++;
        } else if (abortType === "AIR_ABORT") {
            this.airAborts++;
        } else if (abortType === "WEATHER_ABORT") {
            this.weatherAborts++;
        }
    }

    getReport() {
        return {
            totalMissions: this.totalMissions,
            completedSorties: this.completedSorties,
            abortedMissions: this.abortedMissions,
            groundAborts: this.groundAborts,
            airAborts: this.airAborts,
            weatherAborts: this.weatherAborts,
            successRate: this.totalMissions
                ? this.completedSorties / this.totalMissions
                : 0
        };
    }
}

module.exports = StatisticsCollector;