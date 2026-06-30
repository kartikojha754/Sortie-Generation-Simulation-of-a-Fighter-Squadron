import { MdErrorOutline } from "react-icons/md";

function FormError({ message }) {
  if (!message) return null;

  return (
    <div className="flex items-start gap-3 rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-red-300">
      <MdErrorOutline className="mt-0.5 text-xl" />

      <p className="text-sm font-medium">{message}</p>
    </div>
  );
}

export default FormError;
