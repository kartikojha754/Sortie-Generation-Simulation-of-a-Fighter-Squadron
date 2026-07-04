// src/context/SimulationContext.jsx

import { createContext, useContext, useState } from "react";
import { runSimulation } from "../services/simulationService";

const SimulationContext = createContext(null);

export function SimulationProvider({ children }) {
  const [simulationResult, setSimulationResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function executeSimulation(scenario) {
    try {
      setLoading(true);
      setError("");

      const result = await runSimulation(scenario);

      console.log("=== BACKEND RESPONSE ===");
      console.log(result);

      setSimulationResult(result);

      return result;
    } catch (err) {
      console.error("=== SIMULATION ERROR ===");
      console.error(err);

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
