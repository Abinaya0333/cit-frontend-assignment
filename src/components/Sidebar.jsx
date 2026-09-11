import SearchBar from './SearchBar.jsx';
import LocationItem from './LocationItem.jsx';

export default function Sidebar({
  locations,
  filteredLocations,
  selectedId,
  query,
  onQueryChange,
  onSelect,
  onEdit,
  onDelete,
}) {
  const hasAnyLocations = locations.length > 0;
  const hasResults = filteredLocations.length > 0;

  return (
    <aside
      style={{
        width: 320,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRight: '1px solid #e5e7eb',
        background: 'white',
        overflow: 'hidden',
      }}
    >
      <div style={{ padding: '16px 14px 8px' }}>
        <h1 style={{ fontSize: 18, margin: 0 }}>Favorite Locations</h1>
        <p style={{ fontSize: 12, color: '#6b7280', margin: '4px 0 0' }}>
          Click on the map to add a new location.
        </p>
      </div>

      <SearchBar value={query} onChange={onQueryChange} />

      <div style={{ flex: 1, overflowY: 'auto' }}>
        {!hasAnyLocations && (
          <div style={{ padding: 20, color: '#6b7280', fontSize: 14, textAlign: 'center' }}>
            No saved locations yet.
            <br />
            Click anywhere on the map to add one.
          </div>
        )}

        {hasAnyLocations && !hasResults && (
          <div style={{ padding: 20, color: '#6b7280', fontSize: 14, textAlign: 'center' }}>
            No locations match "{query}".
          </div>
        )}

        {hasResults && (
          <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
            {filteredLocations.map((loc) => (
              <LocationItem
                key={loc.id}
                location={loc}
                isSelected={loc.id === selectedId}
                onSelect={onSelect}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
          </ul>
        )}
      </div>
    </aside>
  );
}