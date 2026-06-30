import { Link } from "react-router-dom";
import { FiActivity, FiArrowRight } from "react-icons/fi";

import Button from "../common/Button";

const DashboardHero = () => {
  return (
    <section className="relative overflow-hidden rounded-2xl border border-slate-800 bg-gradient-to-r from-slate-900 via-slate-900 to-slate-800 p-8 shadow-lg">
      <div className="absolute right-0 top-0 h-48 w-48 rounded-full bg-sky-500/10 blur-3xl" />

      <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-2xl space-y-5">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400">
            <FiActivity size={14} />
            Operational Dashboard
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-white">
            Fighter Squadron
            <br />
            Command Overview
          </h1>

          <p className="max-w-xl leading-relaxed text-slate-400">
            Monitor squadron readiness, review the latest simulation results,
            and quickly navigate to operational planning modules.
          </p>
        </div>

        <div className="flex flex-col gap-4 lg:items-end">
          <Link to="/">
            <Button>
              Run New Simulation
              <FiArrowRight className="ml-2" />
            </Button>
          </Link>

          <div className="rounded-xl border border-slate-700 bg-slate-900/70 px-5 py-4">
            <p className="text-xs uppercase tracking-widest text-slate-500">
              Last Simulation
            </p>

            <p className="mt-2 text-2xl font-semibold text-white">
              18 Missions
            </p>

            <p className="mt-1 text-sm text-emerald-400">94.4% Success Rate</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardHero;
