const { AircraftStatus } = require("../enums");

/**
 * Represents a maintenance activity performed on an aircraft.
 * Used to track maintenance history and current maintenance status.
 */
class Maintenance {

    /**
     * @param {Object} data
     */
    constructor(data = {}) {

        this.id = data.id || null;

        this.aircraftId = data.aircraftId || null;

        // Examples:
        // Routine Inspection
        // Engine Check
        // Fuel System
        // Repair
        this.maintenanceType =
            data.maintenanceType || "Routine Inspection";

        this.startTime =
            data.startTime || null;

        this.endTime =
            data.endTime || null;

        this.isCompleted =
            data.isCompleted !== undefined
                ? data.isCompleted
                : false;

        this.remarks =
            data.remarks || "";
    }

    /**
     * Start maintenance.
     */
    start(time = new Date()) {
        this.startTime = time;
    }

    /**
     * Complete maintenance.
     */
    complete(time = new Date(), remarks = "") {

        this.endTime = time;
        this.isCompleted = true;
        this.remarks = remarks;
    }

    /**
     * Returns maintenance duration in minutes.
     */
    getDuration() {

        if (!this.startTime || !this.endTime)
            return null;

        return (
            (this.endTime - this.startTime) /
            (1000 * 60)
        );
    }

    /**
     * JSON representation.
     */
    toJSON() {
        return {
            id: this.id,
            aircraftId: this.aircraftId,
            maintenanceType: this.maintenanceType,
            startTime: this.startTime,
            endTime: this.endTime,
            isCompleted: this.isCompleted,
            remarks: this.remarks,
            duration: this.getDuration()
        };
    }
}

module.exports = Maintenance;