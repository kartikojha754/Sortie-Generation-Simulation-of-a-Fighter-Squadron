import { useState } from "react";

import HeroSection from "../components/simulation/HeroSection";
import ResultSummary from "../components/simulation/ResultSummary";
import OperationsOverview from "../components/simulation/OperationsOverview";
import MissionTable from "../components/simulation/MissionTable";
import AnalyticsSection from "../components/simulation/AnalyticsSection";
import ScenarioBuilderPanel from "../components/simulation/ScenarioBuilderPanel";
import LoadingOverlay from "../components/common/LoadingOverlay";

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

  function handleResetDefaults() {
    setFormData(INITIAL_FORM_DATA);
    setErrorMessage("");
  }

  function validateForm() {
    if (formData.aircraftCount < 1) return "Aircraft count must be at least 1.";
    if (formData.pilotCount < 1) return "Pilot count must be at least 1.";
    if (formData.groundCrewCount < 1)
      return "Ground crew count must be at least 1.";
    if (formData.runwayCount < 1) return "Runway count must be at least 1.";
    if (formData.missionCount < 1) return "Mission count must be at least 1.";
    if (formData.simulationDuration < 60)
      return "Simulation duration must be at least 60 minutes.";

    const abortRates = [
      formData.groundAbortRate,
      formData.airAbortRate,
      formData.weatherAbortRate,
    ];

    const invalidAbortRate = abortRates.some((rate) => rate < 0 || rate > 1);

    if (invalidAbortRate) {
      return "Abort rates must be between 0 and 1.";
    }

    return "";
  }

  async function handleRunSimulation() {
    const validationError = validateForm();

    if (validationError) {
      setErrorMessage(validationError);
      return;
    }

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
      <LoadingOverlay
        isVisible={isLoading}
        title="Running Simulation"
        message="Generating missions, assigning resources, executing events, and calculating results..."
      />

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
        onReset={handleResetDefaults}
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
