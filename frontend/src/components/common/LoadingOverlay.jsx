import { MdRadar } from "react-icons/md";

function LoadingOverlay({
  isVisible,
  title = "Running simulation",
  message = "Processing mission events, resource allocation, abort checks, and sortie outcomes.",
}) {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 px-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl border border-sky-500/30 bg-slate-900 p-8 text-center shadow-2xl shadow-sky-500/10">
        <div className="mx-auto flex h-16 w-16 animate-pulse items-center justify-center rounded-2xl border border-sky-500/30 bg-sky-500/10 text-4xl text-sky-400">
          <MdRadar />
        </div>

        <h3 className="mt-5 text-xl font-bold text-white">{title}</h3>

        <p className="mt-2 text-sm leading-6 text-slate-400">{message}</p>

        <div className="mt-6 h-2 overflow-hidden rounded-full bg-slate-800">
          <div className="h-full w-2/3 animate-pulse rounded-full bg-sky-400" />
        </div>
      </div>
    </div>
  );
}

export default LoadingOverlay;
