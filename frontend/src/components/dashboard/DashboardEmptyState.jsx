import { Link } from "react-router-dom";
import Card from "../common/Card";
import Button from "../common/Button";

export default function DashboardEmptyState() {
  return (
    <Card>
      <div className="text-center">
        <p className="text-xs uppercase tracking-[0.25em] text-green-400">
          No Simulation Data
        </p>

        <h3 className="mt-2 text-xl font-semibold text-slate-100">
          Dashboard is waiting for a simulation run.
        </h3>

        <p className="mx-auto mt-2 max-w-xl text-sm text-slate-400">
          Run a scenario first to populate operational KPIs, readiness, mission
          mix, abort summary, and recent activity.
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
