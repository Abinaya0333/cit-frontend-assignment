export default function SearchBar({ value, onChange }) {
  return (
    <div className="search-wrapper">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search saved locations…"
        className="search-input"
      />
    </div>
  );
}