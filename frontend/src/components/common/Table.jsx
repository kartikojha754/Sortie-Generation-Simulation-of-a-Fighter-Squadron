import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

function Table({ columns = [], children, sortConfig, onSort }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-lg shadow-black/20">
      <div className="max-h-[520px] overflow-auto">
        <table className="w-full min-w-[900px] border-collapse">
          <thead className="sticky top-0 z-10 border-b border-slate-800 bg-slate-950/95 backdrop-blur">
            <tr>
              {columns.map((column) => {
                const isSorted = sortConfig?.key === column.key;

                return (
                  <th
                    key={column.key}
                    className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-[0.18em] text-slate-500"
                  >
                    {column.sortable ? (
                      <button
                        type="button"
                        onClick={() => onSort(column.key)}
                        className="flex cursor-pointer items-center gap-1 transition hover:text-sky-400"
                      >
                        {column.label}

                        {isSorted &&
                          (sortConfig.direction === "asc" ? (
                            <MdKeyboardArrowUp className="text-base" />
                          ) : (
                            <MdKeyboardArrowDown className="text-base" />
                          ))}
                      </button>
                    ) : (
                      column.label
                    )}
                  </th>
                );
              })}
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-800">{children}</tbody>
        </table>
      </div>
    </div>
  );
}

export default Table;
