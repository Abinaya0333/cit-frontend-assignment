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
        <h1 className="sidebar-title">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          Favorite Locations
        </h1>
        <p className="sidebar-subtitle">Click anywhere on the map to add a new place.</p>
      </div>

      <SearchBar value={query} onChange={onQueryChange} />

      <div className="location-list">
        {!hasAnyLocations && (
          <div className="empty-state">
            <svg
              className="empty-state-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <strong>No saved locations yet</strong>
            Click anywhere on the map to add your first one.
          </div>
        )}

        {hasAnyLocations && !hasResults && (
          <div className="empty-state">
            <svg
              className="empty-state-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <strong>No matches found</strong>
            Nothing matches "{query}". Try a different search.
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