// src/components/layout/Topbar.jsx

export default function Topbar() {
  return (
    <header className="border-b border-green-900/40 bg-[#111713]/80 px-6 py-4 backdrop-blur">
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-green-400">
          Fighter Squadron Simulation
        </p>
        <h2 className="mt-1 text-xl font-semibold text-slate-100">
          Operations Control Interface
        </h2>
      </div>
    </header>
  );
}
