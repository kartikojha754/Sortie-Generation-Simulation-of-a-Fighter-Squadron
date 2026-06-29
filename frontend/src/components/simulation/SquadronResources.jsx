import {
  MdAirplanemodeActive,
  MdPerson,
  MdEngineering,
  MdFlightTakeoff,
  MdAssignment,
} from "react-icons/md";

import Card from "../common/Card";

function SquadronResources({ result }) {
  const scenario = result?.scenario;
  const squadron = result?.finalSquadronState;

  const resources = [
    {
      label: "Aircraft",
      value: squadron?.aircraft?.length ?? scenario?.availableAircraft ?? "—",
      subtitle: "F-16C assets",
      icon: <MdAirplanemodeActive />,
      tone: "primary",
    },
    {
      label: "Pilots",
      value: squadron?.pilots?.length ?? scenario?.availablePilots ?? "—",
      subtitle: "Flight crew",
      icon: <MdPerson />,
      tone: "success",
    },
    {
      label: "Ground Crew",
      value:
        squadron?.groundCrew?.length ?? scenario?.availableGroundCrew ?? "—",
      subtitle: "Maintenance support",
      icon: <MdEngineering />,
      tone: "warning",
    },
    {
      label: "Runways",
      value: squadron?.runways?.length ?? scenario?.availableRunways ?? "—",
      subtitle: "Available launch paths",
      icon: <MdFlightTakeoff />,
      tone: "primary",
    },
    {
      label: "Mission Count",
      value: result?.missions?.length ?? "—",
      subtitle: "Planned missions",
      icon: <MdAssignment />,
      tone: "success",
    },
  ];

  return (
    <Card className="h-full">
      <div className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-sky-400">
          Squadron
        </p>
        <h3 className="mt-1 text-xl font-bold text-white">
          Squadron Resources
        </h3>
        <p className="mt-1 text-sm text-slate-400">
          Assets available for sortie generation.
        </p>
      </div>

      <div className="space-y-3">
        {resources.map((resource) => (
          <ResourceRow
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
  );
}

function ResourceRow({ label, value, subtitle, icon, tone }) {
  const tones = {
    primary: "text-sky-400 bg-sky-500/10 border-sky-500/30",
    success: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30",
    warning: "text-amber-400 bg-amber-500/10 border-amber-500/30",
    danger: "text-red-400 bg-red-500/10 border-red-500/30",
  };

  return (
    <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950/60 px-4 py-3 transition hover:border-slate-700">
      <div className="flex items-center gap-3">
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-xl border text-lg ${
            tones[tone] || tones.primary
          }`}
        >
          {icon}
        </div>

        <div>
          <p className="text-sm font-medium text-slate-300">{label}</p>
          <p className="text-xs text-slate-500">{subtitle}</p>
        </div>
      </div>

      <p className="text-2xl font-bold text-white">{value}</p>
    </div>
  );
}

export default SquadronResources;
