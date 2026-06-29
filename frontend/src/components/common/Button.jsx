function Button({
  children,
  type = "button",
  variant = "primary",
  size = "md",
  icon,
  fullWidth = false,
  disabled = false,
  onClick,
}) {
  const baseClasses =
    "inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-200 hover:scale-[1.03] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-sky-400/50 disabled:cursor-not-allowed disabled:opacity-50";

  const variants = {
    primary:
      "bg-sky-500 text-slate-950 hover:bg-sky-400 shadow-lg shadow-sky-500/20",
    secondary:
      "bg-slate-800 text-slate-100 hover:bg-slate-700 border border-slate-700",
    danger:
      "bg-red-500 text-white hover:bg-red-400 shadow-lg shadow-red-500/20",
    ghost: "bg-transparent text-slate-300 hover:bg-slate-800 hover:text-white",
  };

  const sizes = {
    sm: "px-3 py-2 text-xs",
    md: "px-4 py-2.5 text-sm",
    lg: "px-6 py-3 text-base",
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${
        fullWidth ? "w-full" : ""
      }`}
    >
      {icon && <span className="text-lg">{icon}</span>}
      {children}
    </button>
  );
}

export default Button;
