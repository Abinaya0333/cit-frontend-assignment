import { useLocations } from './hooks/useLocations.js';

function App() {
  const {
    locations,
    selectedId,
    isLoaded,
    addLocation,
    removeLocation,
    selectLocation,
  } = useLocations();

  if (!isLoaded) {
    return <div style={{ padding: 20 }}>Loading…</div>;
  }

  return (
    <div style={{ padding: 20, fontFamily: 'system-ui, sans-serif' }}>
      <h1>Favorites Debug Panel</h1>
      <p>This is temporary — will be replaced by the map + sidebar.</p>

      <button
        onClick={() =>
          addLocation({
            name: `Test ${locations.length + 1}`,
            lat: 12.9716 + Math.random() * 0.1,
            lng: 77.5946 + Math.random() * 0.1,
          })
        }
        style={{ padding: '8px 14px', marginBottom: 16 }}
      >
        Add fake location
      </button>

      {locations.length === 0 ? (
        <p>No locations yet. Click the button above.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0, maxWidth: 400 }}>
          {locations.map((loc) => (
            <li
              key={loc.id}
              onClick={() => selectLocation(loc.id)}
              style={{
                padding: 10,
                marginBottom: 6,
                border: '1px solid #ccc',
                borderRadius: 6,
                cursor: 'pointer',
                background: loc.id === selectedId ? '#e3f2fd' : 'white',
              }}
            >
              <strong>{loc.name}</strong>
              <div style={{ fontSize: 12, color: '#666' }}>
                {loc.lat.toFixed(4)}, {loc.lng.toFixed(4)}
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeLocation(loc.id);
                }}
                style={{ marginTop: 6 }}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;