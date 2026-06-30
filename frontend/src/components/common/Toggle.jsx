function Toggle({ label, name, checked, onChange, description }) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950/60 px-4 py-3 transition hover:border-slate-700">
      <div>
        <p className="text-sm font-medium text-white">{label}</p>

        {description && (
          <p className="mt-1 text-xs text-slate-400">{description}</p>
        )}
      </div>

      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() =>
          onChange({
            target: {
              name,
              value: !checked,
              checked: !checked,
            },
          })
        }
        className={`relative h-7 w-12 cursor-pointer rounded-full transition ${
          checked ? "bg-sky-500" : "bg-slate-700"
        }`}
      >
        <span
          className={`absolute top-1 h-5 w-5 rounded-full bg-white transition ${
            checked ? "left-6" : "left-1"
          }`}
        />
      </button>
    </div>
  );
}

export default Toggle;
