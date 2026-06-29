function Table({ columns = [], children }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-lg shadow-black/20">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px] border-collapse">
          <thead className="border-b border-slate-800 bg-slate-950/70">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-[0.18em] text-slate-500"
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-800">{children}</tbody>
        </table>
      </div>
    </div>
  );
}

export default Table;
