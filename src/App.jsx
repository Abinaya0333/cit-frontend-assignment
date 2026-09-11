import { useMemo, useState } from 'react';
import MapView from './components/MapView.jsx';
import Sidebar from './components/Sidebar.jsx';
import LocationFormModal from './components/LocationFormModal.jsx';
import { useLocations } from './hooks/useLocations.js';

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

  const filteredLocations = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return locations;
    return locations.filter((loc) => loc.name.toLowerCase().includes(q));
  }, [locations, query]);

  const handleMapClick = ({ lat, lng }) => {
    setPendingCoords({ lat, lng });
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
    removeLocation(id);
  };

  if (!isLoaded) {
    return (
      <div style={{ display: 'grid', placeItems: 'center', height: '100vh', fontFamily: 'system-ui' }}>
        Loading…
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', height: '100vh', fontFamily: 'system-ui, sans-serif' }}>
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

      <div style={{ flex: 1, position: 'relative' }}>
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
    </div>
  );
}