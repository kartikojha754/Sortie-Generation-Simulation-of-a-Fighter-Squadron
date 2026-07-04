export default function Toggle({
  label,
  description,
  checked,
  onChange,
  activeLabel = "ENABLED",
  inactiveLabel = "DISABLED",
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-slate-300">
        {label}
      </label>

      <button
        type="button"
        onClick={() => onChange(!checked)}
        className={[
          "w-full rounded-xl border px-4 py-3 text-sm font-bold tracking-wide transition-all duration-300",
          checked
            ? "border-green-500/40 bg-green-500/15 text-green-300 hover:bg-green-500/20"
            : "border-red-500/30 bg-red-500/10 text-red-300 hover:bg-red-500/15",
        ].join(" ")}
      >
        {checked ? activeLabel : inactiveLabel}
      </button>

      {description && (
        <p className="mt-2 text-xs leading-5 text-slate-500">{description}</p>
      )}
    </div>
  );
}
