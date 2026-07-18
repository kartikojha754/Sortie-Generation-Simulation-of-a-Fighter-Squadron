import { createContext, useContext, useState } from "react";

const ScenarioContext = createContext(null);

const defaultScenario = {
  aircraftCount: 6,
  groundCrewCount: 4,
  runwayCount: 2,
  missionCount: 5,

  weaponInventory: {
    AIRCRAFT_GUN: 8,
    LIGHT_BOMB: 20,
    HEAVY_BOMB: 10,
    AIR_TO_GROUND_MISSILE: 12,
    HEAVY_AIR_TO_GROUND_MISSILE: 6,
  },

  pilotLevels: {
    TRAINEE: 2,
    WINGMAN: 2,
    FLIGHT_LEAD: 1,
    FOUR_SHIP_LEAD: 0,
    INSTRUCTOR: 1,
  },

  missionRequests: [
    {
      name: "Basic Handling Training",
      type: "TRAINING",
      priority: "LOW",
      incomingTime: 60,
      requiredPilotRating: "TRAINEE",
      duration: 60,
    },
    {
      name: "Air Combat Training",
      type: "AIR_TO_AIR",
      priority: "HIGH",
      incomingTime: 20,
      requiredPilotRating: "FLIGHT_LEAD",
      duration: 90,
    },
    {
      name: "Instructor Check Ride",
      type: "TRAINING",
      priority: "CRITICAL",
      incomingTime: 100,
      requiredPilotRating: "INSTRUCTOR",
      duration: 120,
    },
  ],

  weatherCondition: "CLEAR",
  visibility: 10,
  windSpeed: 5,

  groundAbortRate: 0,
  airAbortRate: 0,
  weatherAbortRate: 0,

  randomScheduling: false,
  missionPlanningEnabled: true,
  simulationDuration: 1440,
};

export function ScenarioProvider({ children }) {
  const [scenario, setScenario] = useState(defaultScenario);

  function updateScenarioField(field, value) {
    setScenario((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  function updateWeaponInventory(weaponType, value) {
    const numberValue = Number(value);
    if (Number.isNaN(numberValue)) return;

    setScenario((prev) => ({
      ...prev,
      weaponInventory: {
        ...prev.weaponInventory,
        [weaponType]: Math.max(0, Math.floor(numberValue)),
      },
    }));
  }

  function updatePilotLevel(level, value) {
    const numberValue = Number(value);
    if (Number.isNaN(numberValue)) return;

    setScenario((prev) => ({
      ...prev,
      pilotLevels: {
        ...prev.pilotLevels,
        [level]: Math.max(0, numberValue),
      },
    }));
  }

  function addMissionRequest() {
    setScenario((prev) => ({
      ...prev,
      missionRequests: [
        ...prev.missionRequests,
        {
          name: `Mission ${prev.missionRequests.length + 1}`,
          type: "TRAINING",
          priority: "MEDIUM",
          incomingTime: 0,
          requiredPilotRating: "WINGMAN",
          duration: 90,
        },
      ],
    }));
  }

  function updateMissionRequest(index, field, value) {
    setScenario((prev) => ({
      ...prev,
      missionRequests: prev.missionRequests.map((mission, missionIndex) =>
        missionIndex === index
          ? {
              ...mission,
              [field]:
                field === "incomingTime" ||
                field === "duration" ||
                field === "aircraftSpeedKmph" ||
                field === "requiredDamagePercentage"
                  ? Math.max(0, Number(value))
                  : value,
            }
          : mission,
      ),
    }));
  }

  function removeMissionRequest(index) {
    setScenario((prev) => ({
      ...prev,
      missionRequests: prev.missionRequests.filter((_, i) => i !== index),
    }));
  }

  function clearMissionRequests() {
    setScenario((prev) => ({
      ...prev,
      missionRequests: [],
    }));
  }

  function resetScenario() {
    setScenario(defaultScenario);
  }

  return (
    <ScenarioContext.Provider
      value={{
        scenario,
        updateScenarioField,
        updatePilotLevel,
        updateWeaponInventory,
        addMissionRequest,
        updateMissionRequest,
        removeMissionRequest,
        clearMissionRequests,
        resetScenario,
      }}
    >
      {children}
    </ScenarioContext.Provider>
  );
}

export function useScenario() {
  const context = useContext(ScenarioContext);

  if (!context) {
    throw new Error("useScenario must be used inside ScenarioProvider");
  }

  return context;
}
