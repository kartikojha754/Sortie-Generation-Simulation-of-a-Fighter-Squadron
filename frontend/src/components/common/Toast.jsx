import { MdCheckCircle, MdError, MdInfo, MdClose } from "react-icons/md";

function Toast({ message, type = "info", onClose }) {
  if (!message) return null;

  const config = {
    success: {
      icon: <MdCheckCircle />,
      classes: "border-emerald-500/30 bg-emerald-500/10 text-emerald-300",
    },
    error: {
      icon: <MdError />,
      classes: "border-red-500/30 bg-red-500/10 text-red-300",
    },
    info: {
      icon: <MdInfo />,
      classes: "border-sky-500/30 bg-sky-500/10 text-sky-300",
    },
  };

  const selected = config[type] || config.info;

  return (
    <div
      className={`fixed right-6 top-6 z-50 flex max-w-md items-start gap-3 rounded-2xl border px-5 py-4 shadow-2xl backdrop-blur ${selected.classes}`}
    >
      <div className="mt-0.5 text-xl">{selected.icon}</div>

      <p className="flex-1 text-sm font-medium">{message}</p>

      <button
        type="button"
        onClick={onClose}
        className="cursor-pointer text-lg opacity-70 transition hover:opacity-100"
      >
        <MdClose />
      </button>
    </div>
  );
}

export default Toast;
