// src/components/scenario/ResourceConfig.jsx

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
    name: "pilotCount",
    label: "Pilot Count",
    helperText: "Total pilots available for sortie assignment.",
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
    label: "Mission Count",
    helperText: "Number of missions backend should generate.",
    min: 1,
  },
];

export default function ResourceConfig() {
  const { scenario, updateScenarioField } = useScenario();

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
          Configure backend-supported squadron resource counts.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
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
    </Card>
  );
}
