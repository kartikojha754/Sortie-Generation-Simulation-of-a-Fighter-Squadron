import { useEffect, useState } from "react";
import SectionHeader from "../components/common/SectionHeader";
import Card from "../components/common/Card";
import Button from "../components/common/Button";

import SimulationResultSummary from "../components/simulation/SimulationResultSummary";
import ScenarioSummary from "../components/simulation/ScenarioSummary";
import MissionTable from "../components/simulation/MissionTable";
import SortieTable from "../components/simulation/SortieTable";
import SquadronStateSummary from "../components/simulation/SquadronStateSummary";
import MaintenanceRecordsTable from "../components/simulation/MaintenanceRecordsTable";

import SchedulerTimelinePanel from "../components/scheduler/SchedulerTimelinePanel";
import SchedulerLogTable from "../components/scheduler/SchedulerLogTable";

import {
  getSimulationHistory,
  getSimulationHistoryById,
  deleteSimulationHistory,
} from "../services/historyService";

function formatDate(value) {
  if (!value) return "-";

  return new Date(value).toLocaleString();
}

function formatPercent(value) {
  if (value === undefined || value === null) return "-";
  return `${Math.round(Number(value) * 100)}%`;
}

export default function History() {
  const [history, setHistory] = useState([]);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [loading, setLoading] = useState(false);
  const [detailLoading, setDetailLoading] = useState(false);
  const [error, setError] = useState("");

  async function loadHistory() {
    try {
      setLoading(true);
      setError("");

      const response = await getSimulationHistory();
      setHistory(response.data || []);
    } catch (err) {
      setError(err.message || "Failed to load simulation history.");
    } finally {
      setLoading(false);
    }
  }

  async function handleView(id) {
    try {
      setDetailLoading(true);
      setError("");

      const response = await getSimulationHistoryById(id);
      setSelectedRecord(response.data);
    } catch (err) {
      setError(err.message || "Failed to load simulation details.");
    } finally {
      setDetailLoading(false);
    }
  }

  async function handleDelete(id) {
    try {
      await deleteSimulationHistory(id);

      if (selectedRecord?._id === id) {
        setSelectedRecord(null);
      }

      await loadHistory();
    } catch (err) {
      setError(err.message || "Failed to delete simulation.");
    }
  }

  useEffect(() => {
    loadHistory();
  }, []);

  const selectedResult = selectedRecord?.result;

  return (
    <div>
      <SectionHeader
        eyebrow="History"
        title="Simulation History"
        description="Review previously executed simulation runs stored in the database."
      />

      <div className="space-y-6">
        <Card>
          <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-green-400">
                Stored Runs
              </p>

              <h3 className="mt-1 text-lg font-semibold text-slate-100">
                Previous Simulations
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Each simulation is saved with timestamp, summary, and full
                output.
              </p>
            </div>

            <Button onClick={loadHistory} disabled={loading}>
              {loading ? "Refreshing..." : "Refresh"}
            </Button>
          </div>

          {error && (
            <div className="mb-4 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-300">
              {error}
            </div>
          )}

          {loading ? (
            <p className="text-sm text-slate-400">Loading history...</p>
          ) : history.length === 0 ? (
            <div className="rounded-xl border border-dashed border-green-900/40 p-8 text-center">
              <p className="text-sm text-slate-400">
                No simulation history found yet.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1100px] text-left text-sm">
                <thead className="border-b border-green-900/40 text-slate-400">
                  <tr>
                    <th className="py-3 pr-4">Run</th>
                    <th className="py-3 pr-4">Timestamp</th>
                    <th className="py-3 pr-4">Scenario</th>
                    <th className="py-3 pr-4">Missions</th>
                    <th className="py-3 pr-4">Sorties</th>
                    <th className="py-3 pr-4">Aborted</th>
                    <th className="py-3 pr-4">Success</th>
                    <th className="py-3 pr-4">Weather</th>
                    <th className="py-3 pr-4">Risk</th>
                    <th className="py-3 pr-4">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {history.map((record) => (
                    <tr
                      key={record._id}
                      className="border-b border-green-900/20 text-slate-300"
                    >
                      <td className="py-3 pr-4 font-mono text-green-300">
                        #{record.simulationNumber}
                      </td>

                      <td className="py-3 pr-4">
                        {formatDate(record.createdAt)}
                      </td>

                      <td className="py-3 pr-4">
                        {record.scenarioName || "-"}
                      </td>

                      <td className="py-3 pr-4">
                        {record.summary?.totalMissions ?? "-"}
                      </td>

                      <td className="py-3 pr-4">
                        {record.summary?.completedSorties ?? "-"}
                      </td>

                      <td className="py-3 pr-4">
                        {record.summary?.abortedMissions ?? "-"}
                      </td>

                      <td className="py-3 pr-4">
                        {formatPercent(record.summary?.successRate)}
                      </td>

                      <td className="py-3 pr-4">
                        {record.summary?.weatherCondition || "-"}
                      </td>

                      <td className="py-3 pr-4">
                        {record.summary?.weatherRiskLevel || "-"}
                      </td>

                      <td className="py-3 pr-4">
                        <div className="flex gap-2">
                          <Button
                            variant="secondary"
                            onClick={() => handleView(record._id)}
                          >
                            View
                          </Button>

                          <Button
                            variant="danger"
                            onClick={() => handleDelete(record._id)}
                          >
                            Delete
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>

        {detailLoading && (
          <Card>
            <p className="text-sm text-slate-400">
              Loading simulation details...
            </p>
          </Card>
        )}

        {selectedRecord && selectedResult && (
          <div className="space-y-6">
            <Card className="border-green-500/30 bg-green-500/5">
              <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.25em] text-green-400">
                    Selected Run
                  </p>

                  <h3 className="mt-1 text-xl font-semibold text-slate-100">
                    Simulation #{selectedRecord.simulationNumber}
                  </h3>

                  <p className="mt-1 text-sm text-slate-400">
                    Executed at {formatDate(selectedRecord.createdAt)}
                  </p>
                </div>

                <Button
                  variant="secondary"
                  onClick={() => setSelectedRecord(null)}
                >
                  Close Details
                </Button>
              </div>
            </Card>

            <SimulationResultSummary statistics={selectedResult.statistics} />

            <ScenarioSummary
              scenario={selectedResult.scenario}
              weather={selectedResult.finalSquadronState?.weather}
            />

            <MissionTable missions={selectedResult.missions} />
            <SortieTable sorties={selectedResult.sorties} />

            <SchedulerTimelinePanel
              schedulerLog={selectedResult.schedulerLog || []}
            />

            <SchedulerLogTable
              schedulerLog={selectedResult.schedulerLog || []}
            />

            <SquadronStateSummary
              squadron={selectedResult.finalSquadronState}
            />

            <MaintenanceRecordsTable
              records={selectedResult.maintenanceRecords}
            />
          </div>
        )}
      </div>
    </div>
  );
}
