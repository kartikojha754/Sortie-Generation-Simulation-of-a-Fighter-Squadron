// src/pages/Maintenance.jsx

import SectionHeader from "../components/common/SectionHeader";
import Card from "../components/common/Card";

export default function Maintenance() {
  return (
    <div>
      <SectionHeader
        eyebrow="Maintenance Output"
        title="Maintenance"
        description="Aircraft maintenance records and status will appear here."
      />

      <Card>
        <p className="text-slate-400">No maintenance records available yet.</p>
      </Card>
    </div>
  );
}
