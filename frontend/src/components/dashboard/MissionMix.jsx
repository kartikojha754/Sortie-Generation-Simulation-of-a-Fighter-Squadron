import Card from "../common/Card";

function countByType(missions = []) {
  return missions.reduce((acc, mission) => {
    acc[mission.type] = (acc[mission.type] || 0) + 1;
    return acc;
  }, {});
}

export default function MissionMix({ missions = [] }) {
  const distribution = countByType(missions);
  const entries = Object.entries(distribution);

  return (
    <Card>
      <div className="mb-5">
        <p className="text-xs uppercase tracking-[0.25em] text-green-400">
          Mission Mix
        </p>
        <h3 className="mt-1 text-lg font-semibold text-slate-100">
          Mission Type Distribution
        </h3>
      </div>

      {entries.length === 0 ? (
        <p className="text-sm text-slate-400">No mission data available.</p>
      ) : (
        <div className="space-y-4">
          {entries.map(([type, count]) => {
            const percent = Math.round((count / missions.length) * 100);

            return (
              <div key={type}>
                <div className="mb-1 flex justify-between text-sm">
                  <span className="text-slate-300">
                    {type.replaceAll("_", " ")}
                  </span>
                  <span className="text-green-300">
                    {count} / {percent}%
                  </span>
                </div>

                <div className="h-2 rounded-full bg-slate-800">
                  <div
                    className="h-2 rounded-full bg-green-500"
                    style={{ width: `${percent}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </Card>
  );
}
