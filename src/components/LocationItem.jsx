export default function LocationItem({ location, isSelected, onSelect, onEdit, onDelete }) {
  return (
    <li
      onClick={() => onSelect(location.id)}
      style={{
        padding: '12px 14px',
        borderBottom: '1px solid #f3f4f6',
        cursor: 'pointer',
        background: isSelected ? '#eff6ff' : 'transparent',
        borderLeft: isSelected ? '3px solid #2563eb' : '3px solid transparent',
        transition: 'background 120ms ease',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
        <div style={{ minWidth: 0, flex: 1 }}>
          <div
            style={{
              fontWeight: 600,
              fontSize: 14,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
            title={location.name}
          >
            {location.name}
          </div>
          <div style={{ fontSize: 12, color: '#6b7280', marginTop: 2 }}>
            {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
          </div>
        </div>

        <div style={{ display: 'flex', gap: 4, flexShrink: 0 }}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit(location);
            }}
            title="Edit"
            style={{
              border: '1px solid #d1d5db',
              background: 'white',
              borderRadius: 6,
              padding: '4px 8px',
              cursor: 'pointer',
              fontSize: 12,
            }}
          >
            Edit
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(location.id);
            }}
            title="Delete"
            style={{
              border: '1px solid #fecaca',
              background: '#fef2f2',
              color: '#b91c1c',
              borderRadius: 6,
              padding: '4px 8px',
              cursor: 'pointer',
              fontSize: 12,
            }}
          >
            Del
          </button>
        </div>
      </div>
    </li>
  );
}