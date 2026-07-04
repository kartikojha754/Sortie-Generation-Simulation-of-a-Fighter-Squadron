// src/context/ScenarioContext.jsx

import { createContext, useContext, useState } from "react";

const ScenarioContext = createContext(null);

const defaultScenario = {
  aircraftCount: 6,
  pilotCount: 6,
  groundCrewCount: 4,
  runwayCount: 2,
  missionCount: 12,

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

  function resetScenario() {
    setScenario(defaultScenario);
  }

  return (
    <ScenarioContext.Provider
      value={{
        scenario,
        updateScenarioField,
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
