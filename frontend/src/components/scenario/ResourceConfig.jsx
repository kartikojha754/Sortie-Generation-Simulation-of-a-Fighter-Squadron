import Card from "../common/Card";
import Input from "../common/Input";
import { useScenario } from "../../context/ScenarioContext";

const resourceFields = [
  {
    name: "aircraftCount",
    label: "Aircraft Count",
    helperText: "Total aircraft available for mission generation.",
    min: 1,
  },
  {
    name: "groundCrewCount",
    label: "Ground Crew Count",
    helperText: "Crew available for aircraft preparation and support.",
    min: 0,
  },
  {
    name: "runwayCount",
    label: "Runway Count",
    helperText: "Available runways for takeoff and landing operations.",
    min: 1,
  },
  {
    name: "missionCount",
    label: "Auto Mission Count",
    helperText: "Used only when no custom mission requests are added.",
    min: 1,
  },
];

const pilotLevelFields = [
  {
    name: "TRAINEE",
    label: "Trainee Pilots",
    helperText: "Basic training missions.",
  },
  {
    name: "WINGMAN",
    label: "Wingman Pilots",
    helperText: "Standard mission qualified pilots.",
  },
  {
    name: "FLIGHT_LEAD",
    label: "Flight Lead Pilots",
    helperText: "Advanced formation and combat training.",
  },
  {
    name: "FOUR_SHIP_LEAD",
    label: "Four Ship Lead Pilots",
    helperText: "Higher level package leadership.",
  },
  {
    name: "INSTRUCTOR",
    label: "Instructor Pilots",
    helperText: "Highest qualification level.",
  },
];

export default function ResourceConfig() {
  const { scenario, updateScenarioField, updatePilotLevel } = useScenario();

  const totalPilots = Object.values(scenario.pilotLevels || {}).reduce(
    (sum, count) => sum + Number(count || 0),
    0,
  );

  function handleNumberChange(field, value, min) {
    const numberValue = Number(value);

    if (Number.isNaN(numberValue)) return;

    updateScenarioField(field, Math.max(min, numberValue));
  }

  return (
    <Card>
      <div className="mb-5">
        <p className="text-xs uppercase tracking-[0.25em] text-green-400">
          Resources
        </p>

        <h3 className="mt-1 text-lg font-semibold text-slate-100">
          Squadron Resources
        </h3>

        <p className="mt-1 text-sm text-slate-500">
          Configure squadron resources and pilot qualification levels.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {resourceFields.map((field) => (
          <Input
            key={field.name}
            type="number"
            min={field.min}
            label={field.label}
            helperText={field.helperText}
            value={scenario[field.name]}
            onChange={(e) =>
              handleNumberChange(field.name, e.target.value, field.min)
            }
          />
        ))}
      </div>

      <div className="mt-8 border-t border-green-900/30 pt-6">
        <div className="mb-5 flex items-center justify-between gap-4">
          <div>
            <h4 className="text-sm font-semibold text-slate-100">
              Pilot Level Distribution
            </h4>
            <p className="mt-1 text-xs text-slate-500">
              Backend will create pilots according to these qualification
              levels.
            </p>
          </div>

          <div className="rounded-full border border-green-500/40 bg-green-500/10 px-4 py-1 text-xs font-semibold text-green-300">
            Total Pilots: {totalPilots}
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-5">
          {pilotLevelFields.map((field) => (
            <Input
              key={field.name}
              type="number"
              min="0"
              label={field.label}
              helperText={field.helperText}
              value={scenario.pilotLevels?.[field.name] ?? 0}
              onChange={(e) => updatePilotLevel(field.name, e.target.value)}
            />
          ))}
        </div>
      </div>
    </Card>
  );
}
