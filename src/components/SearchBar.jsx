export default function SearchBar({ value, onChange }) {
  return (
    <div style={{ padding: '12px 14px', borderBottom: '1px solid #e5e7eb' }}>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search saved locations…"
        style={{
          width: '100%',
          padding: '10px 12px',
          border: '1px solid #d1d5db',
          borderRadius: 8,
          fontSize: 14,
          outline: 'none',
        }}
      />
    </div>
  );
}