function Skeleton({ className = "" }) {
  return (
    <div
      className={`
        animate-pulse
        rounded-xl
        bg-slate-800/70
        ${className}
      `}
    />
  );
}

export default Skeleton;
