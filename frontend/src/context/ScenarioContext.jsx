import { createContext, useContext, useState } from "react";

import { defaultScenario } from "../utils/defaultScenario";
import { updateScenarioSection } from "../utils/updateScenarioSection";

const ScenarioContext = createContext(null);

export const ScenarioProvider = ({ children }) => {
  const [scenario, setScenario] = useState(defaultScenario);

  const updateScenarioField = (parentKey, sectionName, fieldName, value) => {
    setScenario((currentScenario) =>
      updateScenarioSection(
        currentScenario,
        parentKey,
        sectionName,
        fieldName,
        value,
      ),
    );
  };

  const updateMissionCount = (value) => {
    setScenario((currentScenario) => ({
      ...currentScenario,
      missionCount: value,
    }));
  };

  const resetScenario = () => {
    setScenario(defaultScenario);
  };

  return (
    <ScenarioContext.Provider
      value={{
        scenario,
        setScenario,
        updateScenarioField,
        updateMissionCount,
        resetScenario,
      }}
    >
      {children}
    </ScenarioContext.Provider>
  );
};

export const useScenario = () => {
  const context = useContext(ScenarioContext);

  if (!context) {
    throw new Error("useScenario must be used inside ScenarioProvider");
  }

  return context;
};
