import { MdSearch } from "react-icons/md";

function MissionToolbar({
  searchTerm,
  onSearchChange,
  activeFilter,
  onFilterChange,
}) {
  const filters = ["All", "Completed", "Aborted", "Planning"];

  return (
    <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <div className="relative w-full lg:max-w-md">
        <MdSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-xl text-slate-500" />

        <input
          type="text"
          value={searchTerm}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search mission, aircraft, pilot..."
          className="w-full rounded-xl border border-slate-700 bg-slate-950 py-3 pl-12 pr-4 text-white outline-none transition focus:border-sky-500"
        />
      </div>

      <div className="flex flex-wrap gap-2">
        {filters.map((filter) => {
          const isActive = activeFilter === filter;

          return (
            <button
              key={filter}
              onClick={() => onFilterChange(filter)}
              className={`cursor-pointer rounded-full border px-4 py-2 text-sm font-medium transition ${
                isActive
                  ? "border-sky-500 bg-sky-500/10 text-sky-400"
                  : "border-slate-700 bg-slate-900 text-slate-300 hover:border-slate-500"
              }`}
            >
              {filter}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default MissionToolbar;
