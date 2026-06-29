import { motion } from "framer-motion";

function StatCard({ title, value, subtitle, icon, tone = "primary" }) {
  const tones = {
    primary: {
      iconBox: "bg-sky-500/10 text-sky-400 border-sky-500/30",
      glow: "hover:shadow-sky-500/10",
    },
    success: {
      iconBox: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
      glow: "hover:shadow-emerald-500/10",
    },
    warning: {
      iconBox: "bg-amber-500/10 text-amber-400 border-amber-500/30",
      glow: "hover:shadow-amber-500/10",
    },
    danger: {
      iconBox: "bg-red-500/10 text-red-400 border-red-500/30",
      glow: "hover:shadow-red-500/10",
    },
  };

  const selectedTone = tones[tone] || tones.primary;

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className={`
        rounded-2xl
        border
        border-slate-800
        bg-slate-900
        p-5
        shadow-lg
        shadow-black/20
        transition-all
        duration-300
        hover:-translate-y-1
        hover:border-slate-700
        ${selectedTone.glow}
      `}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-400">{title}</p>

          <p className="mt-3 text-3xl font-bold tracking-tight text-white">
            {value}
          </p>

          {subtitle && (
            <p className="mt-2 text-sm text-slate-500">{subtitle}</p>
          )}
        </div>

        {icon && (
          <div
            className={`
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-xl
              border
              text-xl
              ${selectedTone.iconBox}
            `}
          >
            {icon}
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default StatCard;
