function SectionHeader({ eyebrow, title, subtitle, icon, action }) {
  return (
    <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="flex items-start gap-3">
        {icon && (
          <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-xl border border-sky-500/30 bg-sky-500/10 text-xl text-sky-400">
            {icon}
          </div>
        )}

        <div>
          {eyebrow && (
            <p className="mb-1 text-xs font-semibold uppercase tracking-[0.25em] text-sky-400">
              {eyebrow}
            </p>
          )}

          <h2 className="text-2xl font-bold tracking-tight text-white">
            {title}
          </h2>

          {subtitle && (
            <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-400">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      {action && <div>{action}</div>}
    </div>
  );
}

export default SectionHeader;
