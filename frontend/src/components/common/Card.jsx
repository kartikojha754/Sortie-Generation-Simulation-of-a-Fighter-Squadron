export default function Card({ children, className = "" }) {
  return (
    <section
      className={[
        "tactical-card relative overflow-hidden rounded-2xl border border-green-400/30",
        "bg-gradient-to-br from-[#102017]/95 via-[#08110C]/95 to-[#040806]/95",
        "p-6 shadow-[0_0_45px_rgba(34,197,94,0.11),0_18px_60px_rgba(0,0,0,0.5)]",
        "backdrop-blur-xl transition duration-200",
        "hover:-translate-y-0.5 hover:border-green-300/45 hover:shadow-[0_0_55px_rgba(34,197,94,0.18)]",
        "before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-green-300/80 before:to-transparent",
        "after:pointer-events-none after:absolute after:-right-24 after:-top-24 after:h-48 after:w-48 after:rounded-full after:bg-green-400/10 after:blur-3xl",
        className,
      ].join(" ")}
    >
      <div className="relative z-10">{children}</div>
    </section>
  );
}
