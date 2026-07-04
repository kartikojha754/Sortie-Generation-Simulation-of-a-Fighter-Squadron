// src/components/common/Card.jsx

export default function Card({ children, className = "" }) {
  return (
    <div
      className={[
        "rounded-2xl border border-green-900/40 bg-[#141A16] p-5 shadow-sm",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}
