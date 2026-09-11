import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap } from 'react-leaflet';
import L from 'leaflet';

// Fix default marker icons (Vite doesn't resolve Leaflet's default image paths)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// A red icon for the selected marker
const selectedIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const defaultCenter = [12.9716, 77.5946]; // Bangalore
const defaultZoom = 5;

function MapClickHandler({ onMapClick }) {
  useMapEvents({
    click(e) {
      onMapClick({ lat: e.latlng.lat, lng: e.latlng.lng });
    },
  });
  return null;
}

function FlyToSelected({ selectedLocation }) {
  const map = useMap();

  useEffect(() => {
    if (!selectedLocation) return;
    map.flyTo([selectedLocation.lat, selectedLocation.lng], 13, {
      duration: 0.8,
    });
  }, [selectedLocation, map]);

  return null;
}

export default function MapView({
  locations,
  selectedId,
  selectedLocation,
  onMapClick,
  onSelect,
}) {
  return (
    <MapContainer
      center={defaultCenter}
      zoom={defaultZoom}
      style={{ height: '100%', width: '100%' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <MapClickHandler onMapClick={onMapClick} />
      <FlyToSelected selectedLocation={selectedLocation} />

      {locations.map((loc) => (
        <Marker
          key={loc.id}
          position={[loc.lat, loc.lng]}
          icon={loc.id === selectedId ? selectedIcon : new L.Icon.Default()}
          eventHandlers={{
            click: () => onSelect(loc.id),
          }}
        >
         <Popup>
  <div style={{ minWidth: 140 }}>
    <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 2 }}>{loc.name}</div>
    <div style={{ fontSize: 12, color: '#6b7280', fontVariantNumeric: 'tabular-nums' }}>
      {loc.lat.toFixed(4)}, {loc.lng.toFixed(4)}
    </div>
  </div>
</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}