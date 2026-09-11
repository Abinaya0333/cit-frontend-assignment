# Favorite Locations Map

A React app to save, manage, and explore favorite locations on an interactive map.

## Features

- **Click the map** to add a new favorite location
- Saved locations appear as **map markers** and **sidebar items** simultaneously
- **Select** from the sidebar to fly the map to it and highlight its marker
- **Edit** location names inline
- **Delete** with confirmation and a 5-second **Undo** toast
- **Live search** across saved locations with empty-state messages
- **Persistent** across refreshes via `localStorage`
- **Responsive** — sidebar stacks below the map on small screens
- **Reverse geocoding** suggests a name when clicking the map (via Nominatim)

## Setup

```bash
npm install
npm run dev