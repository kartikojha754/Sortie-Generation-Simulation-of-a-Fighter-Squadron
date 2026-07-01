import { createContext, useContext, useState } from "react";

const SimulationContext = createContext(null);

export const SimulationProvider = ({ children }) => {
  const [simulationResult, setSimulationResult] = useState(null);
  const [latestSummary, setLatestSummary] = useState(null);
  const [isSimulationRunning, setIsSimulationRunning] = useState(false);
  const [simulationError, setSimulationError] = useState(null);

  const clearSimulationState = () => {
    setSimulationResult(null);
    setLatestSummary(null);
    setSimulationError(null);
    setIsSimulationRunning(false);
  };

  return (
    <SimulationContext.Provider
      value={{
        simulationResult,
        setSimulationResult,
        latestSummary,
        setLatestSummary,
        isSimulationRunning,
        setIsSimulationRunning,
        simulationError,
        setSimulationError,
        clearSimulationState,
      }}
    >
      {children}
    </SimulationContext.Provider>
  );
};

export const useSimulation = () => {
  const context = useContext(SimulationContext);

  if (!context) {
    throw new Error("useSimulation must be used inside SimulationProvider");
  }

  return context;
};
