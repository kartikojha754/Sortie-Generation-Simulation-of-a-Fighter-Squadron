import { FiRotateCcw, FiSave } from "react-icons/fi";

import Button from "../common/Button";

const ConfigurationActions = ({ onReset, onSave }) => {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <Button variant="secondary" onClick={onReset}>
        <FiRotateCcw className="mr-2" />
        Reset
      </Button>

      <Button onClick={onSave}>
        <FiSave className="mr-2" />
        Save Scenario
      </Button>
    </div>
  );
};

export default ConfigurationActions;
