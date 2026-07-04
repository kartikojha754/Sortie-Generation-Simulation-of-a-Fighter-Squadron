import Card from "../common/Card";
import Input from "../common/Input";
import { useScenario } from "../../context/ScenarioContext";

const abortFields = [
  {
    name: "groundAbortRate",
    label: "Ground Abort Rate",
    helperText: "Chance of mission abort before takeoff.",
  },
  {
    name: "airAbortRate",
    label: "Air Abort Rate",
    helperText: "Chance of mission abort during flight.",
  },
  {
    name: "weatherAbortRate",
    label: "Weather Abort Rate",
    helperText: "Chance of mission abort due to weather.",
  },
];

export default function AbortConfig() {
  const { scenario, updateScenarioField } = useScenario();

  function decimalToPercent(value) {
    return Math.round(value * 100);
  }

  function handlePercentChange(field, value) {
    const numberValue = Number(value);

    if (Number.isNaN(numberValue)) return;

    const clampedValue = Math.min(100, Math.max(0, numberValue));
    const decimalValue = clampedValue / 100;

    updateScenarioField(field, decimalValue);
  }

  return (
    <Card>
      <div className="mb-5">
        <p className="text-xs uppercase tracking-[0.25em] text-green-400">
          Risk Profile
        </p>
        <h3 className="mt-1 text-lg font-semibold text-slate-100">
          Operational Risk Profile
        </h3>
        <p className="mt-1 text-sm text-slate-500">
          Configure abort probabilities. UI uses percentages, backend receives
          decimals.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        {abortFields.map((field) => (
          <Input
            key={field.name}
            type="number"
            min="0"
            max="100"
            label={field.label}
            helperText={`${field.helperText} Sent as ${scenario[field.name]} to backend.`}
            value={decimalToPercent(scenario[field.name])}
            onChange={(e) => handlePercentChange(field.name, e.target.value)}
          />
        ))}
      </div>
    </Card>
  );
}
