import { motion } from "framer-motion";

function Card({ children, title, subtitle, icon, className = "" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className={`
                rounded-2xl
                border
                border-slate-800
                bg-slate-900
                p-6
                shadow-lg
                shadow-black/20
                hover:border-sky-500/40
                hover:shadow-sky-500/5
                transition-all
                duration-300
                ${className}
            `}
    >
      {(title || icon) && (
        <div className="mb-5 flex items-center gap-3">
          {icon && (
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-500/10 text-xl text-sky-400">
              {icon}
            </div>
          )}

          <div>
            {title && (
              <h3 className="text-lg font-semibold text-white">{title}</h3>
            )}

            {subtitle && <p className="text-sm text-slate-400">{subtitle}</p>}
          </div>
        </div>
      )}

      {children}
    </motion.div>
  );
}

export default Card;
