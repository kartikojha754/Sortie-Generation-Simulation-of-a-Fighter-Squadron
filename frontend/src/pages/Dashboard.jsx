// src/pages/Dashboard.jsx

import SectionHeader from "../components/common/SectionHeader";
import Card from "../components/common/Card";

export default function Dashboard() {
  return (
    <div>
      <SectionHeader
        eyebrow="Backend Summary"
        title="Dashboard"
        description="Operational summary will appear after a simulation run."
      />

      <Card>
        <p className="text-slate-400">No simulation result available yet.</p>
      </Card>
    </div>
  );
}
