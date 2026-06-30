import { useEffect, useState } from "react";
import {
  MdRadar,
  MdFlightTakeoff,
  MdGroups,
  MdOutlineAssignment,
  MdMemory,
  MdAnalytics,
  MdDoneAll,
} from "react-icons/md";

const STAGES = [
  {
    icon: <MdRadar />,
    title: "Initializing Squadron",
    message: "Loading aircraft, pilots and available resources.",
  },
  {
    icon: <MdOutlineAssignment />,
    title: "Planning Missions",
    message: "Generating missions based on the selected scenario.",
  },
  {
    icon: <MdFlightTakeoff />,
    title: "Allocating Aircraft",
    message: "Assigning aircraft and runways to missions.",
  },
  {
    icon: <MdGroups />,
    title: "Assigning Pilots",
    message: "Matching pilots and ground crews to missions.",
  },
  {
    icon: <MdMemory />,
    title: "Running Simulation",
    message: "Executing mission events and evaluating abort conditions.",
  },
  {
    icon: <MdAnalytics />,
    title: "Computing Results",
    message: "Calculating statistics and preparing analytics.",
  },
  {
    icon: <MdDoneAll />,
    title: "Preparing Dashboard",
    message: "Finalizing mission data for visualization.",
  },
];

function LoadingOverlay({ isVisible }) {
  const [currentStage, setCurrentStage] = useState(0);

  useEffect(() => {
    if (!isVisible) {
      setCurrentStage(0);
      return;
    }

    const interval = setInterval(() => {
      setCurrentStage((prev) => (prev < STAGES.length - 1 ? prev + 1 : prev));
    }, 700);

    return () => clearInterval(interval);
  }, [isVisible]);

  if (!isVisible) return null;

  const stage = STAGES[currentStage];

  const progress = ((currentStage + 1) / STAGES.length) * 100;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-2xl shadow-black/50">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-sky-500/10 text-5xl text-sky-400">
          <div className="animate-pulse">{stage.icon}</div>
        </div>

        <h2 className="mt-6 text-center text-2xl font-bold text-white">
          {stage.title}
        </h2>

        <p className="mt-2 text-center text-sm leading-6 text-slate-400">
          {stage.message}
        </p>

        <div className="mt-8">
          <div className="mb-2 flex items-center justify-between text-xs uppercase tracking-[0.18em] text-slate-500">
            <span>Simulation Progress</span>

            <span>{Math.round(progress)}%</span>
          </div>

          <div className="h-3 overflow-hidden rounded-full bg-slate-800">
            <div
              className="h-full rounded-full bg-sky-500 transition-all duration-700"
              style={{
                width: `${progress}%`,
              }}
            />
          </div>
        </div>

        <div className="mt-8 space-y-3">
          {STAGES.map((item, index) => (
            <div
              key={item.title}
              className={`flex items-center gap-3 rounded-xl px-3 py-2 transition ${
                index === currentStage ? "bg-sky-500/10" : ""
              }`}
            >
              <div
                className={`text-xl ${
                  index <= currentStage ? "text-sky-400" : "text-slate-600"
                }`}
              >
                {item.icon}
              </div>

              <div className="flex-1">
                <p
                  className={`text-sm font-medium ${
                    index <= currentStage ? "text-white" : "text-slate-500"
                  }`}
                >
                  {item.title}
                </p>
              </div>

              {index < currentStage && (
                <MdDoneAll className="text-emerald-400" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default LoadingOverlay;
