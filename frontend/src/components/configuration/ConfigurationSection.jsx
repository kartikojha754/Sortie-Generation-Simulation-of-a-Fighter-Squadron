const ConfigurationSection = ({ title, description, children }) => {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
      <div className="mb-5">
        <h3 className="text-base font-semibold text-white">{title}</h3>

        {description && (
          <p className="mt-1 text-sm leading-relaxed text-slate-400">
            {description}
          </p>
        )}
      </div>

      <div className="space-y-4">{children}</div>
    </div>
  );
};

export default ConfigurationSection;
