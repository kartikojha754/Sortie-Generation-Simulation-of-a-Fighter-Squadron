import { useEffect, useRef, useState } from "react";
import { MdRocketLaunch } from "react-icons/md";

import LoadingOverlay from "../components/common/LoadingOverlay";
import AnimatedSection from "../components/common/AnimatedSection";
import Toast from "../components/common/Toast";
import FormError from "../components/common/FormError";
import EmptyState from "../components/common/EmptyState";

import HeroSection from "../components/simulation/HeroSection";
import ResultSummary from "../components/simulation/ResultSummary";
import OperationsOverview from "../components/simulation/OperationsOverview";
import MissionTable from "../components/simulation/MissionTable";
import AnalyticsSection from "../components/simulation/AnalyticsSection";
import ScenarioBuilderPanel from "../components/simulation/ScenarioBuilderPanel";

import { runCustomSimulation } from "../api/simulationApi";
import { useSimulation } from "../context/SimulationContext";

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
  const {
    simulationResult: contextSimulationResult,
    setSimulationResult: setContextSimulationResult,
    setLatestSummary,
  } = useSimulation();

  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [simulationResult, setSimulationResult] = useState(
    contextSimulationResult,
  );
  const [isLoading, setIsLoading] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");
  const [toast, setToast] = useState({
    message: "",
    type: "info",
  });

  const resultsRef = useRef(null);

  useEffect(() => {
    if (contextSimulationResult) {
      setSimulationResult(contextSimulationResult);
    }
  }, [contextSimulationResult]);

  function showToast(message, type = "info") {
    setToast({ message, type });
  }

  function clearToast() {
    setToast({
      message: "",
      type: "info",
    });
  }

  useEffect(() => {
    if (!toast.message) return;

    const timer = setTimeout(() => {
      clearToast();
    }, 3000);

    return () => clearTimeout(timer);
  }, [toast.message]);

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
    showToast("Scenario reset to default configuration.", "info");
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

    if (abortRates.some((rate) => rate < 0 || rate > 1)) {
      return "Abort rates must be between 0 and 1.";
    }

    return "";
  }

  async function handleRunSimulation() {
    const validationError = validateForm();

    if (validationError) {
      setErrorMessage(validationError);
      showToast(validationError, "error");
      return;
    }

    try {
      setIsLoading(true);
      setErrorMessage("");
      clearToast();

      const response = await runCustomSimulation(formData);

      setSimulationResult(response.data);
      setContextSimulationResult(response.data);
      setLatestSummary(response.data?.statistics || null);

      showToast("Simulation completed successfully.", "success");

      setTimeout(() => {
        resultsRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 300);
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Unable to run simulation. Please check backend server.";

      setErrorMessage(message);
      showToast(message, "error");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-12">
      <LoadingOverlay isVisible={isLoading} />

      <Toast message={toast.message} type={toast.type} onClose={clearToast} />

      <HeroSection
        onRunSimulation={handleRunSimulation}
        isLoading={isLoading}
      />

      <AnimatedSection delay={0.05}>
        <ScenarioBuilderPanel
          formData={formData}
          onChange={handleInputChange}
          onRunSimulation={handleRunSimulation}
          onReset={handleResetDefaults}
          isLoading={isLoading}
        />
      </AnimatedSection>

      <FormError message={errorMessage} />

      <div ref={resultsRef}>
        {simulationResult ? (
          <>
            <AnimatedSection delay={0.1}>
              <ResultSummary result={simulationResult} />
            </AnimatedSection>

            <AnimatedSection delay={0.15}>
              <OperationsOverview result={simulationResult} />
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <MissionTable result={simulationResult} />
            </AnimatedSection>

            <AnimatedSection delay={0.25}>
              <AnalyticsSection result={simulationResult} />
            </AnimatedSection>
          </>
        ) : (
          <AnimatedSection delay={0.1}>
            <EmptyState
              title="Ready to simulate"
              message="Configure your scenario above and run the simulation to generate mission results, operational insights, and analytics."
              icon={<MdRocketLaunch />}
            />
          </AnimatedSection>
        )}
      </div>
    </div>
  );
}

export default Simulation;
