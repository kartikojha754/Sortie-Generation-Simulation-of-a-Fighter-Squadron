export default function TacticalRadar() {
  return (
    <div className="relative h-24 w-24 rounded-full border border-green-400/30 bg-green-400/5 shadow-[0_0_35px_rgba(34,197,94,0.16)]">
      <div className="absolute inset-4 rounded-full border border-green-400/20" />
      <div className="absolute inset-8 rounded-full border border-green-400/20" />

      <div className="radar-sweep absolute left-1/2 top-1/2 h-px w-10 origin-left bg-gradient-to-r from-green-300 to-transparent" />

      <span className="absolute left-[28%] top-[35%] h-1.5 w-1.5 rounded-full bg-green-300 shadow-[0_0_12px_rgba(34,197,94,1)]" />
      <span className="absolute right-[25%] top-[55%] h-1.5 w-1.5 rounded-full bg-green-300 shadow-[0_0_12px_rgba(34,197,94,1)]" />
    </div>
  );
}
