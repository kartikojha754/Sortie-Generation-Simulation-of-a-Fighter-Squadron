import { FiCpu, FiLayers, FiSliders } from "react-icons/fi";

const BuilderHero = () => {
  return (
    <section className="relative overflow-hidden rounded-2xl border border-slate-800 bg-gradient-to-r from-slate-900 via-slate-900 to-slate-800 p-8 shadow-lg">
      <div className="absolute right-0 top-0 h-52 w-52 rounded-full bg-sky-500/10 blur-3xl" />

      <div className="relative grid gap-8 lg:grid-cols-[1.5fr_1fr] lg:items-center">
        <div className="space-y-5">
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-sky-500/10 px-3 py-1 text-xs font-medium text-sky-400">
            <FiSliders size={14} />
            Scenario Configuration Workspace
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-white">
            Build Advanced
            <br />
            Sortie Scenarios
          </h1>

          <p className="max-w-2xl leading-relaxed text-slate-400">
            Configure mission demand, squadron resources, environmental
            conditions, scheduling behavior, and operational rules before
            running the sortie generation simulation.
          </p>
        </div>

        <div className="grid gap-4">
          <div className="rounded-xl border border-slate-700 bg-slate-900/70 p-5">
            <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl border border-sky-500/30 bg-sky-500/10 text-sky-400">
              <FiLayers />
            </div>

            <p className="text-sm font-semibold text-white">
              Modular Scenario Sections
            </p>

            <p className="mt-1 text-sm text-slate-400">
              Each panel controls one part of the simulation input.
            </p>
          </div>

          <div className="rounded-xl border border-slate-700 bg-slate-900/70 p-5">
            <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-400">
              <FiCpu />
            </div>

            <p className="text-sm font-semibold text-white">
              Backend-Driven Simulation
            </p>

            <p className="mt-1 text-sm text-slate-400">
              The frontend prepares scenarios; backend handles simulation logic.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BuilderHero;
