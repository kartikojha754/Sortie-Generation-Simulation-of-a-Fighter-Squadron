function Badge({ children, variant = "neutral", size = "md", icon }) {
  const variants = {
    success: "border-emerald-500/30 bg-emerald-500/10 text-emerald-400",
    danger: "border-red-500/30 bg-red-500/10 text-red-400",
    warning: "border-amber-500/30 bg-amber-500/10 text-amber-400",
    primary: "border-sky-500/30 bg-sky-500/10 text-sky-400",
    neutral: "border-slate-600/40 bg-slate-700/30 text-slate-300",
  };

  const sizes = {
    sm: "px-2 py-1 text-xs",
    md: "px-3 py-1.5 text-xs",
    lg: "px-4 py-2 text-sm",
  };

  return (
    <span
      className={`
        inline-flex
        items-center
        gap-2
        rounded-full
        border
        font-semibold
        uppercase
        tracking-[0.16em]
        ${variants[variant] || variants.neutral}
        ${sizes[size] || sizes.md}
      `}
    >
      {icon && <span className="text-sm">{icon}</span>}
      {children}
    </span>
  );
}

export default Badge;
