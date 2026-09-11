# 📍 Favorite Locations Map

A responsive React web application that allows users to save, search, edit, delete, and manage their favorite locations on an interactive map.

## ✨ Features

- 🗺️ Interactive map using Leaflet
- 📍 Add locations by clicking on the map
- 📌 Display saved locations as map markers
- 📋 View saved locations in a sidebar
- 🔍 Search saved locations by name
- 🎯 Select a location and focus the map on it
- ✏️ Edit saved location names
- 🗑️ Delete saved locations with confirmation
- ↩️ Undo recently deleted locations
- 💾 Persist locations using browser localStorage
- 🌍 Reverse geocoding using OpenStreetMap Nominatim
- 📱 Responsive desktop and mobile design
- ♿ Keyboard-friendly controls and focus states
- ⚠️ Handles empty states and invalid inputs

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React | User interface |
| Vite | Development and build tool |
| JavaScript | Application logic |
| Leaflet | Interactive map |
| React Leaflet | React integration for Leaflet |
| OpenStreetMap | Map tiles |
| Nominatim | Reverse geocoding |
| localStorage | Data persistence |
| CSS | Styling and responsive design |

## 📂 Project Structure

```text
cit-frontend-assignment/
│
├── public/
│
├── src/
│   ├── components/
│   │   ├── LocationFormModal.jsx
│   │   ├── LocationItem.jsx
│   │   ├── MapView.jsx
│   │   ├── SearchBar.jsx
│   │   └── Sidebar.jsx
│   │
│   ├── hooks/
│   │   └── useLocations.js
│   │
│   ├── utils/
│   │   └── storage.js
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── index.html
├── package.json
├── package-lock.json
└── README.md

🧩 Application Architecture
The application follows a component-based React architecture
                         App.jsx
                            │
              ┌─────────────┼─────────────┐
              │             │             │
              ▼             ▼             ▼
           Sidebar       MapView        Modal
              │             │
              ▼             ▼
       Location List     Map Markers
              │             │
              └──────┬──────┘
                     │
                     ▼
              useLocations Hook
                     │
                     ▼
               Location State
                     │
                     ▼
                localStorage

🚀 Getting Started
1. Clone the repository
git clone https://github.com/Abinaya0333/cit-frontend-assignment.git
2. Navigate to the project
cd cit-frontend-assignment
3. Install dependencies
npm install
4. Start the development server
npm run dev

Open the local URL displayed in the terminal.

🗺️ How to Use
Add a Location
Click anywhere on the map.
The location form will appear.
Enter a location name or use the suggested name.
Save the location.
The location will appear in the sidebar and on the map.
Select a Location

Click a saved location in the sidebar.
The selected location is highlighted and the map focuses on its coordinates.

Search Locations
Use the search box in the sidebar to search saved locations by name.

Edit a Location
Select the edit option for a saved location and update its name.

Delete a Location
Select the delete option.
A confirmation message is displayed before the location is removed.

Undo Delete
After deleting a location, an Undo option appears temporarily.
Click Undo to restore the recently deleted location.

💾 Data Persistence

Saved locations are stored in the browser using localStorage.

Example:

[
  {
    "id": "location-id",
    "name": "Chennai",
    "lat": 13.0827,
    "lng": 80.2707,
    "createdAt": 1720000000000
  }
]

Because the data is stored locally, saved locations remain available after refreshing the browser.
 🎯 Project Objective

This project was developed to demonstrate practical frontend development skills using React.

The project focuses on:

Interactive map integration
React component architecture
State management
CRUD operations
Search functionality
API integration
Browser data persistence
Responsive UI design
User interaction
Accessibility
📚 React Concepts Demonstrated
Component-Based Architecture

The application is divided into reusable components such as:

Sidebar
LocationItem
SearchBar
MapView
LocationFormModal
Props

Components communicate through props for passing:

Location data
Selected state
Event handlers
Search values
Form information
Custom Hook

The useLocations hook keeps location-related state and operations in one place.
Derived State
useMemo is used to calculate the filtered list of locations based on the search query.

Side Effects
useEffect is used for:
Loading saved locations
Saving locations to localStorage
Maintaining valid selection state

🌐 External Services
OpenStreetMap
Used as the map tile provider.
Nominatim
Used for reverse geocoding coordinates into readable location names.

🔐 Data & Privacy
The application does not require:
User accounts
A backend database
Login credentials
Saved locations are stored locally in the user's browser.

👩‍💻 Author
Abinaya R
2nd Year CSE
Chennai Institute of Technology

🔗 GitHub Repository
Repository:
https://github.com/Abinaya0333/cit-frontend-assignment

🙏 Acknowledgements
React
Vite
Leaflet
React Leaflet
OpenStreetMap
Nominatim

📄 License
This project was developed as part of a frontend engineering assignment for educational and demonstration purposes.
