
interface FilterGroupOption {
  label: string;
  value: string;
}

interface FilterGroupProps {
  title: string;
  options: Array<string | FilterGroupOption>;
  selected: string[];
  onChange: (option: string) => void;
}

export function FilterGroup({title, options, selected, onChange}: FilterGroupProps){
  return (
    <div className="filter-group">
      <h4>{title}</h4>
      <div className="filter-options">
        {options.map((option) => {
          const value = typeof option === "string" ? option : option.value;
          const label = typeof option === "string" ? option : option.label;

          return (
            <label key={value} className="filter-checkbox">
              <input
                type="checkbox"
                checked={selected.includes(value)}
                onChange={() => onChange(value)}
              />
              <span>{label}</span>
            </label>
          );
        })}
      </div>
    </div>
  );
}