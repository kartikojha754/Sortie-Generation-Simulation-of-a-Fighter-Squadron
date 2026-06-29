import { MdSettings } from "react-icons/md";

import SectionHeader from "../common/SectionHeader";
import ScenarioOverview from "./ScenarioOverview";
import SquadronResources from "./SquadronResources";

function OperationsOverview({ result }) {
  return (
    <section className="space-y-6">
      <SectionHeader
        eyebrow="Operations"
        title="Operations Overview"
        subtitle="Monitor the active scenario configuration and available squadron assets used by the simulation."
        icon={<MdSettings />}
      />

      <div className="grid gap-6 xl:grid-cols-2">
        <ScenarioOverview result={result} compact />
        <SquadronResources result={result} compact />
      </div>
    </section>
  );
}

export default OperationsOverview;
