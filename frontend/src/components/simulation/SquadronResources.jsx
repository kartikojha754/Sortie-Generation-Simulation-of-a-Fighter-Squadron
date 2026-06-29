import {
  MdAirplanemodeActive,
  MdPerson,
  MdEngineering,
  MdFlightTakeoff,
  MdMilitaryTech,
  MdAssignment,
} from "react-icons/md";

import Card from "../common/Card";
import SectionHeader from "../common/SectionHeader";

function SquadronResources() {
  const resources = [
    {
      label: "Aircraft",
      value: "8",
      subtitle: "F-16C assets",
      icon: <MdAirplanemodeActive />,
      tone: "primary",
    },
    {
      label: "Pilots",
      value: "8",
      subtitle: "Combat-ready crew",
      icon: <MdPerson />,
      tone: "success",
    },
    {
      label: "Ground Crew",
      value: "5",
      subtitle: "Maintenance support",
      icon: <MdEngineering />,
      tone: "warning",
    },
    {
      label: "Runways",
      value: "2",
      subtitle: "Available launch paths",
      icon: <MdFlightTakeoff />,
      tone: "primary",
    },
    {
      label: "Mission Count",
      value: "10",
      subtitle: "Planned missions",
      icon: <MdAssignment />,
      tone: "success",
    },
  ];

  return (
    <section className="space-y-6">
      <SectionHeader
        eyebrow="Squadron"
        title="Squadron Resources"
        subtitle="Operational assets available for sortie generation and mission execution."
        icon={<MdMilitaryTech />}
      />

      <Card>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {resources.map((resource) => (
            <ResourceItem
              key={resource.label}
              label={resource.label}
              value={resource.value}
              subtitle={resource.subtitle}
              icon={resource.icon}
              tone={resource.tone}
            />
          ))}
        </div>
      </Card>
    </section>
  );
}

function ResourceItem({ label, value, subtitle, icon, tone }) {
  const tones = {
    primary: "text-sky-400 bg-sky-500/10 border-sky-500/30",
    success: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30",
    warning: "text-amber-400 bg-amber-500/10 border-amber-500/30",
    danger: "text-red-400 bg-red-500/10 border-red-500/30",
  };

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4 transition hover:-translate-y-1 hover:border-slate-700">
      <div
        className={`mb-5 flex h-11 w-11 items-center justify-center rounded-xl border text-xl ${
          tones[tone] || tones.primary
        }`}
      >
        {icon}
      </div>

      <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-500">
        {label}
      </p>

      <p className="mt-2 text-3xl font-bold text-white">{value}</p>

      <p className="mt-1 text-sm text-slate-500">{subtitle}</p>
    </div>
  );
}

export default SquadronResources;
