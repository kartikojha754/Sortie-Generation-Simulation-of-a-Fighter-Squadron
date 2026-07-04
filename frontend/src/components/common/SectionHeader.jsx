// src/components/common/SectionHeader.jsx

export default function SectionHeader({ eyebrow, title, description }) {
  return (
    <div className="mb-5">
      {eyebrow && (
        <p className="text-xs uppercase tracking-[0.25em] text-green-400">
          {eyebrow}
        </p>
      )}

      <h2 className="mt-1 text-2xl font-bold text-slate-100">{title}</h2>

      {description && (
        <p className="mt-2 max-w-2xl text-sm text-slate-400">{description}</p>
      )}
    </div>
  );
}
