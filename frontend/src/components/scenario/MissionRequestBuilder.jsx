import Card from "../common/Card";
import Input from "../common/Input";
import Select from "../common/Select";
import Button from "../common/Button";
import { useScenario } from "../../context/ScenarioContext";

const missionTypeOptions = [
  { value: "TRAINING", label: "Training" },
  { value: "AIR_TO_AIR", label: "Air To Air" },
  { value: "AIR_TO_GROUND", label: "Air To Ground" },
  { value: "RECON", label: "Recon" },
  { value: "PATROL", label: "Patrol" },
];
const priorityOptions = [
  { value: "LOW", label: "Low" },
  { value: "MEDIUM", label: "Medium" },
  { value: "HIGH", label: "High" },
  { value: "CRITICAL", label: "Critical" },
];
const pilotRatingOptions = [
  { value: "TRAINEE", label: "Trainee" },
  { value: "WINGMAN", label: "Wingman" },
  { value: "FLIGHT_LEAD", label: "Flight Lead" },
  { value: "FOUR_SHIP_LEAD", label: "Four Ship Lead" },
  { value: "INSTRUCTOR", label: "Instructor" },
];
const targetOptions = [
  { value: "TARGET-RADAR-STATION", label: "Radar Station" },
  { value: "TARGET-FUEL-STORAGE", label: "Fuel Storage" },
  { value: "TARGET-SUPPLY-DEPOT", label: "Supply Depot" },
  { value: "TARGET-AIRCRAFT-HANGAR", label: "Aircraft Hangar" },
  { value: "TARGET-BRIDGE", label: "Bridge" },
  { value: "TARGET-COMMAND-CENTER", label: "Command Center" },
  { value: "TARGET-FORTIFIED-BUNKER", label: "Fortified Bunker" },
];

export default function MissionRequestBuilder() {
  const {
    scenario,
    addMissionRequest,
    updateMissionRequest,
    removeMissionRequest,
    clearMissionRequests,
  } = useScenario();
  const missions = scenario.missionRequests || [];

  return (
    <Card>
      <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-green-400">Mission Queue</p>
          <h3 className="mt-1 text-lg font-semibold text-slate-100">Custom Mission Requests</h3>
          <p className="mt-1 text-sm text-slate-500">
            Configure missions and compare every valid aircraft and weapon combination.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button variant="secondary" onClick={clearMissionRequests}>Clear Missions</Button>
          <Button onClick={addMissionRequest}>Add Mission</Button>
        </div>
      </div>

      {missions.length === 0 ? (
        <div className="rounded-xl border border-dashed border-green-900/40 p-8 text-center">
          <p className="text-sm text-slate-400">No custom missions added. Backend will use auto mission count.</p>
        </div>
      ) : (
        <div className="space-y-5">
          {missions.map((mission, index) => (
            <div key={index} className="rounded-xl border border-green-900/30 bg-[#0B0F0D] p-4">
              <div className="mb-4 flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-green-400">Mission {index + 1}</p>
                  <h4 className="mt-1 text-sm font-semibold text-slate-100">{mission.name || `Mission ${index + 1}`}</h4>
                </div>
                <Button variant="danger" onClick={() => removeMissionRequest(index)}>Remove</Button>
              </div>

              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                <Input label="Mission Name" value={mission.name} placeholder="Example: Strike Radar Station" onChange={(e) => updateMissionRequest(index, "name", e.target.value)} />
                <Select label="Mission Type" options={missionTypeOptions} value={mission.type} onChange={(e) => updateMissionRequest(index, "type", e.target.value)} />
                <Select label="Priority" options={priorityOptions} value={mission.priority} onChange={(e) => updateMissionRequest(index, "priority", e.target.value)} />
                <Input type="number" min="0" label="Incoming Time / Start Time" helperText="Time in simulation minutes." value={mission.incomingTime} onChange={(e) => updateMissionRequest(index, "incomingTime", e.target.value)} />
                <Select label="Required Pilot Rating" options={pilotRatingOptions} value={mission.requiredPilotRating} onChange={(e) => updateMissionRequest(index, "requiredPilotRating", e.target.value)} />
                <Input type="number" min="1" label={mission.type === "AIR_TO_GROUND" ? "Maximum Mission Time" : "Duration"} helperText={mission.type === "AIR_TO_GROUND" ? "Travel and strike must fit inside this time." : "Mission duration in minutes."} value={mission.duration} onChange={(e) => updateMissionRequest(index, "duration", e.target.value)} />
              </div>

              {mission.type === "AIR_TO_GROUND" && (
                <div className="mt-6 rounded-xl border border-green-800/40 bg-green-950/10 p-4">
                  <p className="text-xs uppercase tracking-[0.22em] text-green-400">Strike Analysis</p>
                  <h5 className="mt-1 font-semibold text-slate-100">Target and Required Damage</h5>
                  <p className="mt-1 text-xs text-slate-500">
                    Fixed weapon carry limits are used to generate single and mixed loadouts such as AGM + Bomb.
                  </p>
                  <div className="mt-4 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                    <Select label="Target" options={targetOptions} value={mission.targetId || "TARGET-RADAR-STATION"} onChange={(e) => updateMissionRequest(index, "targetId", e.target.value)} />
                    <Input type="number" min="1" max="100" label="Required Damage (%)" helperText="Damage objective for this mission." value={mission.requiredDamagePercentage || 100} onChange={(e) => updateMissionRequest(index, "requiredDamagePercentage", e.target.value)} />
                    <Input type="number" min="1" label="Aircraft Speed (km/h)" value={mission.aircraftSpeedKmph || 900} onChange={(e) => updateMissionRequest(index, "aircraftSpeedKmph", e.target.value)} />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}
