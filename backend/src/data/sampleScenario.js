const { entities, enums } = require("../domain");

const {
    Aircraft,
    Pilot,
    GroundCrew,
    Runway,
    Weather,
    Squadron,
    Scenario
} = entities;

const {
    PilotRating,
    WeatherCondition
} = enums;

function createSampleScenario() {
    const squadron = new Squadron({
        id: "SQ-001",
        name: "Sample Fighter Squadron"
    });

    for (let i = 1; i <= 6; i++) {
        squadron.addAircraft(
            new Aircraft({
                id: `AC-${i}`,
                tailNumber: `F16-${i}`,
                aircraftType: "F-16C"
            })
        );
    }

    const pilotRatings = [
        PilotRating.INSTRUCTOR,
        PilotRating.FOUR_SHIP_LEAD,
        PilotRating.FLIGHT_LEAD,
        PilotRating.WINGMAN,
        PilotRating.WINGMAN,
        PilotRating.WINGMAN
    ];

    pilotRatings.forEach((rating, index) => {
        squadron.addPilot(
            new Pilot({
                id: `P-${index + 1}`,
                name: `Pilot ${index + 1}`,
                rank: "Officer",
                rating
            })
        );
    });

    for (let i = 1; i <= 4; i++) {
        squadron.addGroundCrew(
            new GroundCrew({
                id: `GC-${i}`,
                name: `Ground Crew ${i}`,
                role: "Technician"
            })
        );
    }

    squadron.addRunway(new Runway({ id: "RW-1", name: "Runway 1" }));
    squadron.addRunway(new Runway({ id: "RW-2", name: "Runway 2" }));

    squadron.setWeather(
        new Weather({
            id: "W-1",
            condition: WeatherCondition.CLEAR,
            visibility: 10,
            windSpeed: 5,
            isFlyable: true
        })
    );

    const scenario = new Scenario({
        id: "SC-001",
        name: "Baseline Scenario",
        description: "Sample baseline sortie generation scenario.",
        groundAbortRate: 0.05,
        airAbortRate: 0.03,
        weatherAbortRate: 0.02,
        availableAircraft: 6,
        availablePilots: 6,
        availableGroundCrew: 4,
        availableRunways: 2,
        randomScheduling: false,
        missionPlanningEnabled: true,
        simulationDuration: 1440
    });

    return {
        squadron,
        scenario,
        missionCount: 5
    };
}

module.exports = createSampleScenario;