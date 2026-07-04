import TacticalRadar from "../common/TacticalRadar";

function getTime() {
  return new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function StatusPill({ label, value }) {
  return (
    <div className="rounded-xl border border-green-400/25 bg-green-400/10 px-4 py-2 shadow-[0_0_18px_rgba(34,197,94,0.08)]">
      <p className="text-[10px] uppercase tracking-[0.28em] text-green-300/70">
        {label}
      </p>
      <p className="mt-1 font-mono text-sm text-green-200">{value}</p>
    </div>
  );
}

export default function Topbar() {
  return (
    <header className="sticky top-0 z-30 border-b border-green-400/30 bg-[#06100A]/90 backdrop-blur-xl shadow-[0_0_40px_rgba(34,197,94,0.08)]">
      <div className="mx-auto flex max-w-[1600px] items-center justify-between px-5 py-4 lg:px-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.42em] text-green-300">
            Fighter Squadron Simulation
          </p>

          <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-100">
            Operations Control Interface
          </h1>
        </div>

        <div className="hidden items-center gap-4 xl:flex">
          <StatusPill label="Local Time" value={getTime()} />
          <StatusPill label="Database" value="CONNECTED" />
          <StatusPill label="System" value="ONLINE" />
          <TacticalRadar />
        </div>
      </div>
    </header>
  );
}
