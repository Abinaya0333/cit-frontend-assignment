import { useCallback, useEffect, useMemo, useState } from 'react';
import { loadLocations, saveLocations } from '../utils/storage.js';

export function useLocations() {
  const [locations, setLocations] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setLocations(loadLocations());
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (!isLoaded) return;
    saveLocations(locations);
  }, [locations, isLoaded]);

  useEffect(() => {
    if (selectedId && !locations.some((l) => l.id === selectedId)) {
      setSelectedId(null);
    }
  }, [locations, selectedId]);

  const addLocation = useCallback(({ name, lat, lng }) => {
    const trimmed = (name || '').trim();
    if (!trimmed) return null;

    const newLocation = {
      id:
        typeof crypto !== 'undefined' && crypto.randomUUID
          ? crypto.randomUUID()
          : `loc-${Date.now()}-${Math.random().toString(36).slice(2)}`,
      name: trimmed,
      lat,
      lng,
      createdAt: Date.now(),
    };

    setLocations((prev) => [newLocation, ...prev]);
    setSelectedId(newLocation.id);
    return newLocation;
  }, []);

  const updateLocation = useCallback((id, patch) => {
    setLocations((prev) =>
      prev.map((loc) => {
        if (loc.id !== id) return loc;
        const next = { ...loc, ...patch };
        if (typeof next.name === 'string') {
          const trimmed = next.name.trim();
          if (!trimmed) return loc;
          next.name = trimmed;
        }
        return next;
      })
    );
  }, []);

  const removeLocation = useCallback((id) => {
    setLocations((prev) => prev.filter((loc) => loc.id !== id));
  }, []);

  const selectLocation = useCallback((id) => {
    setSelectedId(id);
  }, []);

  const selectedLocation = useMemo(
    () => locations.find((l) => l.id === selectedId) || null,
    [locations, selectedId]
  );

  return {
    locations,
    selectedId,
    selectedLocation,
    isLoaded,
    addLocation,
    updateLocation,
    removeLocation,
    selectLocation,
  };
}