import { Link } from "react-router-dom";
import Card from "../common/Card";
import Button from "../common/Button";

export default function QuickNavigation() {
  return (
    <Card>
      <div className="mb-5">
        <p className="text-xs uppercase tracking-[0.25em] text-green-400">
          Navigation
        </p>
        <h3 className="mt-1 text-lg font-semibold text-slate-100">
          Quick Navigation
        </h3>
      </div>

      <div className="flex flex-wrap gap-3">
        <Link to="/simulation">
          <Button>View Simulation Details</Button>
        </Link>

        <Link to="/maintenance">
          <Button variant="secondary">View Maintenance</Button>
        </Link>

        <Link to="/scenario-builder">
          <Button variant="secondary">Run New Scenario</Button>
        </Link>
      </div>
    </Card>
  );
}
