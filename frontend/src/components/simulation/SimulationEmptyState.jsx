import { Link } from "react-router-dom";
import Card from "../common/Card";
import Button from "../common/Button";

export default function SimulationEmptyState() {
  return (
    <Card>
      <div className="text-center">
        <p className="text-xs uppercase tracking-[0.25em] text-green-400">
          No Simulation Data
        </p>

        <h3 className="mt-2 text-xl font-semibold text-slate-100">
          No simulation has been executed yet.
        </h3>

        <p className="mx-auto mt-2 max-w-xl text-sm text-slate-400">
          Build a scenario first, run the backend simulation, then return here
          to inspect mission results, statistics, resources, and maintenance
          output.
        </p>

        <div className="mt-5">
          <Link to="/scenario-builder">
            <Button>Go to Scenario Builder</Button>
          </Link>
        </div>
      </div>
    </Card>
  );
}
