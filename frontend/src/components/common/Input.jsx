export default function Input({
  label,
  helperText,
  className = "",
  inputClassName = "",
  ...props
}) {
  return (
    <label className={["block", className].join(" ")}>
      {label && (
        <span className="mb-2 block text-sm font-semibold text-slate-100">
          {label}
        </span>
      )}

      <input
        className={[
          "w-full rounded-xl border border-green-400/25 bg-[#031006]/90 px-4 py-3",
          "text-sm text-green-50 outline-none transition",
          "placeholder:text-slate-600",
          "focus:border-green-300/70 focus:bg-[#06170C] focus:ring-2 focus:ring-green-400/25",
          "hover:border-green-300/45",
          inputClassName,
        ].join(" ")}
        {...props}
      />

      {helperText && (
        <span className="mt-2 block text-xs leading-relaxed text-slate-400">
          {helperText}
        </span>
      )}
    </label>
  );
}
