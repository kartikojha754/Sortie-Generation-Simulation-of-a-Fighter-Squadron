import Card from "../common/Card";
import Input from "../common/Input";
import Select from "../common/Select";
import { useScenario } from "../../context/ScenarioContext";

const weatherOptions = [
  { value: "CLEAR", label: "Clear" },
  { value: "CLOUDY", label: "Cloudy" },
  { value: "RAIN", label: "Rain" },
  { value: "STORM", label: "Storm" },
  { value: "FOG", label: "Fog" },
  { value: "SNOW", label: "Snow" },
  { value: "HIGH_WIND", label: "High Wind" },
];

export default function WeatherConfig() {
  const { scenario, updateScenarioField } = useScenario();

  function handleNumberChange(field, value, min = 0) {
    const numberValue = Number(value);
    if (Number.isNaN(numberValue)) return;

    updateScenarioField(field, Math.max(min, numberValue));
  }

  return (
    <Card>
      <div className="mb-5">
        <p className="text-xs uppercase tracking-[0.25em] text-green-400">
          Environment
        </p>

        <h3 className="mt-1 text-lg font-semibold text-slate-100">
          Operational Environment
        </h3>

        <p className="mt-1 text-sm text-slate-500">
          Configure weather conditions stored and returned by the backend.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        <Select
          label="Weather Condition"
          value={scenario.weatherCondition}
          options={weatherOptions}
          onChange={(e) =>
            updateScenarioField("weatherCondition", e.target.value)
          }
        />

        <Input
          type="number"
          min="0"
          label="Visibility"
          helperText="Backend stores this as weather visibility."
          value={scenario.visibility}
          onChange={(e) => handleNumberChange("visibility", e.target.value, 0)}
        />

        <Input
          type="number"
          min="0"
          label="Wind Speed"
          helperText="Backend stores this as weather wind speed."
          value={scenario.windSpeed}
          onChange={(e) => handleNumberChange("windSpeed", e.target.value, 0)}
        />
      </div>

      <div className="mt-5 rounded-xl border border-amber-500/20 bg-amber-500/10 p-4">
        <p className="text-sm font-semibold text-amber-300">Flyability Note</p>
        <p className="mt-1 text-sm text-slate-400">
          Flyability is not controlled manually here. It should later be derived
          by backend weather logic from condition, visibility, and wind speed.
        </p>
      </div>
    </Card>
  );
}
