import { useState } from "react";

import HeroSection from "../components/simulation/HeroSection";
import ResultSummary from "../components/simulation/ResultSummary";
import OperationsOverview from "../components/simulation/OperationsOverview";
import MissionTable from "../components/simulation/MissionTable";
import AnalyticsSection from "../components/simulation/AnalyticsSection";
import ScenarioBuilderPanel from "../components/simulation/ScenarioBuilderPanel";

import { runCustomSimulation } from "../api/simulationApi";

const INITIAL_FORM_DATA = {
  aircraftCount: 8,
  pilotCount: 8,
  groundCrewCount: 5,
  runwayCount: 2,
  missionCount: 10,
  groundAbortRate: 0.05,
  airAbortRate: 0.03,
  weatherAbortRate: 0.02,
  weatherCondition: "CLEAR",
  missionPlanningEnabled: true,
  randomScheduling: false,
  simulationDuration: 1440,
};

function Simulation() {
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [simulationResult, setSimulationResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  function handleInputChange(event) {
    const { name, value, checked, type } = event.target;

    setFormData((current) => ({
      ...current,
      [name]:
        type === "checkbox"
          ? checked
          : type === "number"
            ? Number(value)
            : value,
    }));
  }

  async function handleRunSimulation() {
    try {
      setIsLoading(true);
      setErrorMessage("");

      const response = await runCustomSimulation(formData);

      setSimulationResult(response.data);
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message ||
          "Unable to run simulation. Please check backend server.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-12">
      <HeroSection
        onRunSimulation={handleRunSimulation}
        isLoading={isLoading}
      />

      {errorMessage && (
        <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-300">
          {errorMessage}
        </div>
      )}

      <ScenarioBuilderPanel
        formData={formData}
        onChange={handleInputChange}
        onRunSimulation={handleRunSimulation}
        isLoading={isLoading}
      />

      <ResultSummary result={simulationResult} />
      <OperationsOverview result={simulationResult} />
      <MissionTable result={simulationResult} />
      <AnalyticsSection result={simulationResult} />
    </div>
  );
}

export default Simulation;
