export default function LocationItem({ location, isSelected, onSelect, onEdit, onDelete }) {
  return (
    <li
      className={`location-item ${isSelected ? 'is-selected' : ''}`}
      onClick={() => onSelect(location.id)}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10 }}>
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
            className="btn"
            onClick={(e) => {
              e.stopPropagation();
              onEdit(location);
            }}
          >
            Edit
          </button>
          <button
            className="btn btn-danger"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(location.id);
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </li>
  );
}