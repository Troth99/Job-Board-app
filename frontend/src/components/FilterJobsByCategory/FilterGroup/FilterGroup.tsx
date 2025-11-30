
interface FilterGroupProps {
    title: string;
    options: string[];
    selected: string[];
    onChange: (option: string) => void;
}


export function FilterGroup({title, options, selected, onChange}: FilterGroupProps){
    
    return (
          <div className="filter-group">
      <h4>{title}</h4>
      <div className="filter-options">
        {options.map(option => (
          <label key={option} className="filter-checkbox">
            <input
              type="checkbox"
              checked={selected.includes(option)}
              onChange={() => onChange(option)}
            />
            <span>{option}</span>
          </label>
        ))}
      </div>
    </div>
    )
}