const variants = {
  primary:
    "border-green-300/40 bg-green-400 text-[#021006] shadow-[0_0_28px_rgba(34,197,94,0.35)] hover:bg-green-300 hover:shadow-[0_0_44px_rgba(34,197,94,0.55)]",
  secondary:
    "border-green-400/25 bg-green-400/10 text-green-100 hover:border-green-300/45 hover:bg-green-400/20",
  danger:
    "border-red-400/40 bg-red-500 text-white shadow-[0_0_22px_rgba(239,68,68,0.28)] hover:bg-red-400",
};

export default function Button({
  children,
  variant = "primary",
  className = "",
  disabled = false,
  ...props
}) {
  return (
    <button
      disabled={disabled}
      className={[
        "inline-flex items-center justify-center rounded-xl border px-5 py-2.5",
        "text-sm font-bold transition duration-200",
        "active:scale-[0.98]",
        "disabled:cursor-not-allowed disabled:opacity-50",
        variants[variant] || variants.primary,
        className,
      ].join(" ")}
      {...props}
    >
      {children}
    </button>
  );
}
