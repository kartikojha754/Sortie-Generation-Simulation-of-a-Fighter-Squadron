export default function SectionHeader({ eyebrow, title, description }) {
  return (
    <header className="mb-7 rounded-2xl border border-green-400/20 bg-gradient-to-r from-green-400/10 via-transparent to-transparent p-5 shadow-[0_0_35px_rgba(34,197,94,0.08)]">
      {eyebrow && (
        <p className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.42em] text-green-300">
          <span className="h-2 w-2 rounded-full bg-green-300 shadow-[0_0_12px_rgba(34,197,94,1)]" />
          {eyebrow}
        </p>
      )}

      <div className="mt-3 flex flex-col gap-2 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h2 className="text-3xl font-black tracking-tight text-slate-50">
            {title}
          </h2>

          {description && (
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-300">
              {description}
            </p>
          )}
        </div>

        <div className="hidden items-center gap-2 rounded-full border border-green-300/30 bg-green-400/10 px-4 py-2 text-xs font-bold text-green-200 lg:flex">
          <span className="h-2 w-2 rounded-full bg-green-300 shadow-[0_0_12px_rgba(34,197,94,1)]" />
          READY
        </div>
      </div>
    </header>
  );
}
