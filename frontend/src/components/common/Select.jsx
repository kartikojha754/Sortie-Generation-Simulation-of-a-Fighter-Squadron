function Select({ label, name, value, onChange, options = [] }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-slate-300">
        {label}
      </span>

      <select
        name={name}
        value={value}
        onChange={onChange}
        className="w-full cursor-pointer rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
      >
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            className="bg-slate-950 text-white"
          >
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}

export default Select;
