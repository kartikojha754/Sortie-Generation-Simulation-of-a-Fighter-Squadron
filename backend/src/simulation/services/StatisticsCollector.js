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

    this.totalWaitingTime = 0;
    this.longestWaitingTime = 0;
    this.dispatchedMissionCount = 0;
    this.totalRetries = 0;
    this.successfulRetries = 0;
    this.waitingReasons = {};
  }

  recordMission() { this.totalMissions++; }
  recordCompletedSortie() { this.completedSorties++; }

  recordAbort(abortType) {
    this.abortedMissions++;
    if (abortType === "GROUND_ABORT") this.groundAborts++;
    else if (abortType === "AIR_ABORT") this.airAborts++;
    else if (abortType === "WEATHER_ABORT") this.weatherAborts++;
  }

  recordWait(reason) {
    const key = reason || "RESOURCE_UNAVAILABLE";
    this.totalRetries++;
    this.waitingReasons[key] = (this.waitingReasons[key] || 0) + 1;
  }

  recordDispatch(waitingTime, retryCount = 0) {
    const wait = Math.max(0, Number(waitingTime || 0));
    this.dispatchedMissionCount++;
    this.totalWaitingTime += wait;
    this.longestWaitingTime = Math.max(this.longestWaitingTime, wait);
    if (retryCount > 0) this.successfulRetries++;
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
        : 0,
      averageWaitingTime: this.dispatchedMissionCount
        ? Number((this.totalWaitingTime / this.dispatchedMissionCount).toFixed(2))
        : 0,
      longestWaitingTime: this.longestWaitingTime,
      totalRetries: this.totalRetries,
      successfulRetries: this.successfulRetries,
      waitingReasons: { ...this.waitingReasons },
    };
  }
}

module.exports = StatisticsCollector;
