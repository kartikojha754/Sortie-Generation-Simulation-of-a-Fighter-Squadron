import Card from "../common/Card";

const ConfigurationPanel = ({
  eyebrow,
  title,
  description,
  children,
  actions,
}) => {
  return (
    <Card>
      <div className="mb-6 flex flex-col gap-4 border-b border-slate-800 pb-5 lg:flex-row lg:items-start lg:justify-between">
        <div>
          {eyebrow && (
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-sky-400">
              {eyebrow}
            </p>
          )}

          <h2 className="mt-2 text-xl font-semibold text-white">{title}</h2>

          {description && (
            <p className="mt-1 max-w-2xl text-sm leading-relaxed text-slate-400">
              {description}
            </p>
          )}
        </div>

        {actions && <div className="shrink-0">{actions}</div>}
      </div>

      {children}
    </Card>
  );
};

export default ConfigurationPanel;
