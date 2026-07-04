import Card from "../common/Card";

function countByType(log = [], type) {
  return log.filter((entry) => entry.type === type).length;
}

function getAverageWait(log = []) {
  const dispatches = log.filter(
    (entry) =>
      entry.type === "MISSION_DISPATCHED" &&
      entry.waitingTime !== undefined &&
      entry.waitingTime !== null,
  );

  if (dispatches.length === 0) return 0;

  const total = dispatches.reduce(
    (sum, entry) => sum + Number(entry.waitingTime || 0),
    0,
  );

  return Math.round(total / dispatches.length);
}

export default function SchedulerSummaryCards({ schedulerLog = [] }) {
  const arrivals = countByType(schedulerLog, "MISSION_ARRIVED");
  const dispatched = countByType(schedulerLog, "MISSION_DISPATCHED");
  const waiting = countByType(schedulerLog, "MISSION_WAITING_FOR_RESOURCES");
  const landed = countByType(schedulerLog, "SORTIE_LANDED");
  const aborted = schedulerLog.filter((entry) =>
    entry.type?.includes("ABORTED"),
  ).length;

  const averageWait = getAverageWait(schedulerLog);

  const cards = [
    {
      label: "Mission Arrivals",
      value: arrivals,
      description: "Missions that entered the scheduler.",
    },
    {
      label: "Dispatched",
      value: dispatched,
      description: "Missions released for planning and execution.",
    },
    {
      label: "Wait Events",
      value: waiting,
      description: "Times missions waited due to resource constraints.",
    },
    {
      label: "Sorties Landed",
      value: landed,
      description: "Completed sortie execution records.",
    },
    {
      label: "Aborted",
      value: aborted,
      description: "Missions rejected or failed by scheduler rules.",
    },
    {
      label: "Avg Wait",
      value: `${averageWait} min`,
      description: "Average wait before dispatch.",
    },
  ];

  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {cards.map((card) => (
        <Card key={card.label}>
          <p className="text-xs uppercase tracking-[0.25em] text-green-400">
            {card.label}
          </p>

          <h3 className="mt-3 text-3xl font-bold text-slate-100">
            {card.value}
          </h3>

          <p className="mt-2 text-sm text-slate-500">{card.description}</p>
        </Card>
      ))}
    </div>
  );
}
