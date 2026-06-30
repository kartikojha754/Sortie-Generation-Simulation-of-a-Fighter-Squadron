const ConfigurationGrid = ({ children, columns = 2 }) => {
  const gridClasses = {
    1: "grid-cols-1",
    2: "grid-cols-1 lg:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 xl:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 xl:grid-cols-4",
  };

  return (
    <div className={`grid gap-5 ${gridClasses[columns] || gridClasses[2]}`}>
      {children}
    </div>
  );
};

export default ConfigurationGrid;
