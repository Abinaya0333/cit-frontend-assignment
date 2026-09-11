const STORAGE_KEY = 'favorite-locations:v1';

export function loadLocations() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];

    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    return parsed.filter(
      (loc) =>
        loc &&
        typeof loc.id === 'string' &&
        typeof loc.name === 'string' &&
        typeof loc.lat === 'number' &&
        typeof loc.lng === 'number'
    );
  } catch (err) {
    console.warn('Failed to load locations from storage:', err);
    return [];
  }
}

export function saveLocations(locations) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(locations));
    return true;
  } catch (err) {
    console.warn('Failed to save locations to storage:', err);
    return false;
  }
}