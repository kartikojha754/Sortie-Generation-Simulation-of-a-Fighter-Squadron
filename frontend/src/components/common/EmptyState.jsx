import { MdInbox } from "react-icons/md";

function EmptyState({
  title = "No data available",
  message = "Run a simulation to generate results.",
  icon = <MdInbox />,
}) {
  return (
    <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-900/50 px-6 py-12 text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-slate-700 bg-slate-950 text-3xl text-slate-500">
        {icon}
      </div>

      <h3 className="mt-4 text-lg font-semibold text-white">{title}</h3>

      <p className="mx-auto mt-2 max-w-md text-sm text-slate-400">{message}</p>
    </div>
  );
}

export default EmptyState;
