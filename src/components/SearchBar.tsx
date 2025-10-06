interface Props {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}

export default function SearchBar({ value, onChange, placeholder = "Search..." }: Props) {
  return (
    <div className="search-bar-container">
      <input
        className="search-bar"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
      {value && (
        <button 
          className="search-clear-btn" 
          onClick={() => onChange("")}
          aria-label="Clear search"
        >
        x
        </button>
      )}
    </div>
  );
}