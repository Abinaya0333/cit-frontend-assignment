import { useMemo, useState } from 'react';
import MapView from './components/MapView.jsx';
import Sidebar from './components/Sidebar.jsx';
import LocationFormModal from './components/LocationFormModal.jsx';
import { useLocations } from './hooks/useLocations.js';

async function reverseGeocode(lat, lng) {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=10`,
      { headers: { 'Accept-Language': 'en' } }
    );
    if (!res.ok) return '';
    const data = await res.json();
    const a = data.address || {};
    return a.city || a.town || a.village || a.county || a.state || a.country || '';
  } catch {
    return '';
  }
}

export default function App() {
  const {
    locations,
    selectedId,
    selectedLocation,
    isLoaded,
    addLocation,
    updateLocation,
    removeLocation,
    selectLocation,
  } = useLocations();

  const [query, setQuery] = useState('');
  const [pendingCoords, setPendingCoords] = useState(null);
  const [editingLocation, setEditingLocation] = useState(null);
  const [lastDeleted, setLastDeleted] = useState(null);

  const filteredLocations = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return locations;
    return locations.filter((loc) => loc.name.toLowerCase().includes(q));
  }, [locations, query]);

  const handleMapClick = async ({ lat, lng }) => {
    setPendingCoords({ lat, lng, suggestedName: '' });
    const name = await reverseGeocode(lat, lng);
    setPendingCoords((prev) =>
      prev && prev.lat === lat && prev.lng === lng
        ? { ...prev, suggestedName: name }
        : prev
    );
  };

  const handleAddSubmit = ({ name }) => {
    if (!pendingCoords) return;
    addLocation({ name, lat: pendingCoords.lat, lng: pendingCoords.lng });
    setPendingCoords(null);
  };

  const handleEditSubmit = ({ name }) => {
    if (!editingLocation) return;
    updateLocation(editingLocation.id, { name });
    setEditingLocation(null);
  };

  const handleDelete = (id) => {
    if (!window.confirm('Delete this location?')) return;
    const loc = locations.find((l) => l.id === id);
    removeLocation(id);
    setLastDeleted(loc);
    setTimeout(() => {
      setLastDeleted((cur) => (cur && cur.id === id ? null : cur));
    }, 5000);
  };

  const handleUndo = () => {
    if (!lastDeleted) return;
    addLocation({
      name: lastDeleted.name,
      lat: lastDeleted.lat,
      lng: lastDeleted.lng,
    });
    setLastDeleted(null);
  };

  if (!isLoaded) {
    return (
      <div
        style={{
          display: 'grid',
          placeItems: 'center',
          height: '100vh',
          fontFamily: 'system-ui',
          color: '#64748b',
        }}
      >
        Loading…
      </div>
    );
  }

  return (
    <div className="app-shell">
      <Sidebar
        locations={locations}
        filteredLocations={filteredLocations}
        selectedId={selectedId}
        query={query}
        onQueryChange={setQuery}
        onSelect={selectLocation}
        onEdit={setEditingLocation}
        onDelete={handleDelete}
      />

      <div className="map-wrapper">
        <MapView
          locations={locations}
          selectedId={selectedId}
          selectedLocation={selectedLocation}
          onMapClick={handleMapClick}
          onSelect={selectLocation}
        />
      </div>

      <LocationFormModal
        open={!!pendingCoords}
        mode="add"
        initialValues={pendingCoords || undefined}
        onCancel={() => setPendingCoords(null)}
        onSubmit={handleAddSubmit}
      />

      <LocationFormModal
        open={!!editingLocation}
        mode="edit"
        initialValues={editingLocation || undefined}
        onCancel={() => setEditingLocation(null)}
        onSubmit={handleEditSubmit}
      />

      {lastDeleted && (
        <div className="toast">
          <span>Deleted "{lastDeleted.name}"</span>
          <button onClick={handleUndo}>Undo</button>
        </div>
      )}
    </div>
  );
}