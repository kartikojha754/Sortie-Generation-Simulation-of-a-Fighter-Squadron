import {
  MdAirplanemodeActive,
  MdAssessment,
  MdCheckCircle,
  MdError,
  MdPlayArrow,
  MdSettings,
  MdSpeed,
  MdTune,
} from "react-icons/md";

import Button from "../components/common/Button";
import Card from "../components/common/Card";
import SectionHeader from "../components/common/SectionHeader";
import StatCard from "../components/common/StatCard";

function Simulation() {
  return (
    <div className="space-y-10">
      <section className="rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 p-8 shadow-2xl shadow-black/30">
        <div className="max-w-3xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-sky-400">
            Sortie Generation Simulator
          </p>

          <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl">
            Fighter Squadron Simulation
          </h1>

          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-400">
            Configure squadron resources, define scenario conditions, run a
            discrete-event simulation, and analyze sortie generation
            performance.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <Button size="lg" icon={<MdPlayArrow />}>
              Run Simulation
            </Button>

            <Button variant="secondary" size="lg" icon={<MdTune />}>
              Configure Scenario
            </Button>
          </div>
        </div>
      </section>

      <section>
        <SectionHeader
          eyebrow="Results"
          title="Simulation Results"
          subtitle="Key sortie generation metrics will appear here after running the simulation."
          icon={<MdAssessment />}
        />

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          <StatCard
            title="Total Missions"
            value="10"
            subtitle="Scheduled missions"
            icon={<MdAirplanemodeActive />}
          />

          <StatCard
            title="Completed Sorties"
            value="5"
            subtitle="Successful mission completions"
            icon={<MdCheckCircle />}
            tone="success"
          />

          <StatCard
            title="Aborted Missions"
            value="5"
            subtitle="Ground, air, weather, or resource aborts"
            icon={<MdError />}
            tone="danger"
          />

          <StatCard
            title="Success Rate"
            value="50%"
            subtitle="Completed / total missions"
            icon={<MdSpeed />}
            tone="warning"
          />
        </div>
      </section>

      <section>
        <SectionHeader
          eyebrow="Configuration"
          title="Scenario Configuration"
          subtitle="Simulation conditions such as abort rates, weather, mission planning, and duration."
          icon={<MdSettings />}
        />

        <Card>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            <InfoItem label="Weather" value="CLEAR" />
            <InfoItem label="Ground Abort Rate" value="5%" />
            <InfoItem label="Air Abort Rate" value="3%" />
            <InfoItem label="Weather Abort Rate" value="2%" />
            <InfoItem label="Mission Planning" value="Enabled" />
            <InfoItem label="Simulation Duration" value="1440 min" />
          </div>
        </Card>
      </section>

      <section>
        <SectionHeader
          eyebrow="Resources"
          title="Squadron Resources"
          subtitle="Available squadron assets used by the sortie generation simulation."
          icon={<MdAirplanemodeActive />}
        />

        <Card>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            <InfoItem label="Aircraft" value="8" />
            <InfoItem label="Pilots" value="8" />
            <InfoItem label="Ground Crew" value="5" />
            <InfoItem label="Runways" value="2" />
            <InfoItem label="Mission Count" value="10" />
          </div>
        </Card>
      </section>
    </div>
  );
}

function InfoItem({ label, value }) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4">
      <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-500">
        {label}
      </p>
      <p className="mt-2 text-lg font-semibold text-white">{value}</p>
    </div>
  );
}

export default Simulation;
