// src/context/SimulationContext.jsx

import { createContext, useContext, useEffect, useState } from "react";
import { runSimulation } from "../services/simulationService";

const SimulationContext = createContext(null);
const OLD_STORAGE_KEY = "sortieSimulationResult";

export function SimulationProvider({ children }) {
  // Simulation results now live only in React memory.
  // Refreshing or reopening the frontend starts with no previous result.
  const [simulationResult, setSimulationResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // Remove results saved by older project versions so they cannot reappear.
    localStorage.removeItem(OLD_STORAGE_KEY);
  }, []);

  async function executeSimulation(scenario) {
    try {
      setLoading(true);
      setError("");

      const result = await runSimulation(scenario);
      setSimulationResult(result);

      return result;
    } catch (err) {
      console.error("=== SIMULATION ERROR ===", err);

      const message =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        err?.message ||
        "Failed to run simulation.";

      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  }

  function clearSimulation() {
    setSimulationResult(null);
    setError("");
  }

  return (
    <SimulationContext.Provider
      value={{
        simulationResult,
        loading,
        error,
        executeSimulation,
        clearSimulation,
      }}
    >
      {children}
    </SimulationContext.Provider>
  );
}

export function useSimulation() {
  const context = useContext(SimulationContext);

  if (!context) {
    throw new Error("useSimulation must be used inside SimulationProvider");
  }

  return context;
}
