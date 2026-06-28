const { Maintenance } = require("../../domain").entities;
const { EventType } = require("../../domain").enums;
const { SimulationConstants } = require("../../domain").constants;
const EventFactory = require("../events/EventFactory");

/**
 * Handles aircraft maintenance scheduling.
 */
class MaintenanceScheduler {
    scheduleMaintenance(aircraft, currentTime) {
        const maintenance = new Maintenance({
            id: `MNT-${aircraft.id}-${currentTime}`,
            aircraftId: aircraft.id,
            maintenanceType: "Routine Inspection",
            startTime: currentTime
        });

        aircraft.startMaintenance();

        const completionEvent = EventFactory.createEvent({
            type: EventType.MAINTENANCE_COMPLETED,
            time: currentTime + SimulationConstants.DEFAULT_MAINTENANCE_TIME,
            entityId: aircraft.id,
            payload: {
                aircraftId: aircraft.id,
                maintenanceId: maintenance.id
            }
        });

        return {
            maintenance,
            completionEvent
        };
    }

    completeMaintenance(aircraft, maintenance, time) {
        maintenance.complete(time, "Maintenance completed.");
        aircraft.completeMaintenance();
    }
}

module.exports = MaintenanceScheduler;