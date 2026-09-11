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
    <aside className="sidebar">
      <div className="sidebar-header">
        <h1 className="sidebar-title">Favorite Locations</h1>
        <p className="sidebar-subtitle">Click on the map to add a new location.</p>
      </div>

      <SearchBar value={query} onChange={onQueryChange} />

      <div className="location-list">
        {!hasAnyLocations && (
          <div className="empty-state">
            <strong>No saved locations yet</strong>
            Click anywhere on the map to add your first one.
          </div>
        )}

        {hasAnyLocations && !hasResults && (
          <div className="empty-state">
            <strong>No matches found</strong>
            Nothing matches "{query}". Try a different search.
          </div>
        )}

        {hasResults && (
          <ul className="location-list" style={{ padding: 0, margin: 0 }}>
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