export default function LocationItem({ location, isSelected, onSelect, onEdit, onDelete }) {
  return (
    <li
      className={`location-item ${isSelected ? 'is-selected' : ''}`}
      onClick={() => onSelect(location.id)}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(location.id);
        }
      }}
    >
      <div className="location-item-row">
        <div style={{ minWidth: 0, flex: 1 }}>
          <div className="location-name" title={location.name}>
            {location.name}
          </div>
          <div className="location-coords">
            {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
          </div>
        </div>

        <div className="location-actions">
          <button
            type="button"
            className="btn"
            onClick={(e) => {
              e.stopPropagation();
              onEdit(location);
            }}
            aria-label={`Edit ${location.name}`}
          >
            Edit
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(location.id);
            }}
            aria-label={`Delete ${location.name}`}
          >
            Delete
          </button>
        </div>
      </div>
    </li>
  );
}