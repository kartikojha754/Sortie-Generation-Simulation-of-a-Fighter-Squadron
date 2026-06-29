import {
  MdPlayArrow,
  MdTune,
  MdCloudDone,
  MdMemory,
  MdCheckCircle,
} from "react-icons/md";

import Button from "../common/Button";
import Card from "../common/Card";

function HeroSection({ onRunSimulation, isLoading = false }) {
  return (
    <section className="grid gap-6 rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 p-8 shadow-2xl shadow-black/30 lg:grid-cols-[1.6fr_1fr]">
      <div>
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-sky-400">
          Sortie Generation Simulator
        </p>

        <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl">
          Fighter Squadron Simulation
        </h1>

        <p className="mt-4 max-w-2xl text-base leading-7 text-slate-400">
          Configure squadron resources, define scenario conditions, run a
          discrete-event simulation, and analyze sortie generation performance.
        </p>

        <div className="mt-7 flex flex-wrap gap-3">
          <Button
            size="lg"
            icon={<MdPlayArrow />}
            onClick={onRunSimulation}
            disabled={isLoading}
          >
            {isLoading ? "Running..." : "Run Simulation"}
          </Button>

          <Button variant="secondary" size="lg" icon={<MdTune />}>
            Configure Scenario
          </Button>
        </div>
      </div>

      <Card className="bg-slate-950/60">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-sky-400">
              System Status
            </p>
            <h3 className="mt-1 text-xl font-bold text-white">
              {isLoading ? "Simulation Running" : "Engine Ready"}
            </h3>
          </div>

          <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3 text-2xl text-emerald-400">
            <MdCheckCircle />
          </div>
        </div>

        <div className="space-y-3">
          <StatusRow
            icon={<MdMemory />}
            label="Simulation Engine"
            value={isLoading ? "Running" : "Online"}
            tone="success"
          />

          <StatusRow
            icon={<MdCloudDone />}
            label="Weather Model"
            value="Clear"
            tone="primary"
          />

          <StatusRow
            icon={<MdTune />}
            label="Scenario Mode"
            value="Default"
            tone="warning"
          />
        </div>
      </Card>
    </section>
  );
}

function StatusRow({ icon, label, value, tone }) {
  const tones = {
    success: "text-emerald-400",
    primary: "text-sky-400",
    warning: "text-amber-400",
  };

  return (
    <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-900/70 px-4 py-3">
      <div className="flex items-center gap-3">
        <span className={`text-xl ${tones[tone] || tones.primary}`}>
          {icon}
        </span>
        <span className="text-sm text-slate-400">{label}</span>
      </div>

      <span className={`text-sm font-semibold ${tones[tone] || tones.primary}`}>
        {value}
      </span>
    </div>
  );
}

export default HeroSection;
