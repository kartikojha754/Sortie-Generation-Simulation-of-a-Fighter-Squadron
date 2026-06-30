import { Link } from "react-router-dom";
import { FiPlayCircle, FiRotateCcw, FiSave } from "react-icons/fi";

import Button from "../common/Button";

const ScenarioActions = () => {
  return (
    <div className="sticky bottom-4 z-20 rounded-2xl border border-slate-800 bg-slate-950/90 p-5 shadow-2xl backdrop-blur">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm font-semibold text-white">
            Scenario configuration ready
          </p>

          <p className="mt-1 text-sm text-slate-400">
            Save this scenario, reset the configuration, or run it in the
            simulation engine.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <Button variant="secondary">
            <FiRotateCcw className="mr-2" />
            Reset
          </Button>

          <Button variant="secondary">
            <FiSave className="mr-2" />
            Save Scenario
          </Button>

          <Link to="/">
            <Button>
              <FiPlayCircle className="mr-2" />
              Run Simulation
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ScenarioActions;
