# Favorite Locations Map

A React application that lets users mark, manage, and revisit their favorite locations on an interactive map. Click anywhere on the map to save a place — it instantly appears as both a marker and a sidebar item, and everything persists across page reloads.

Built as a solution to the **CIT Frontend Engineer Assignment 2026**.

---

## Table of Contents

1. [Demo & Screenshots](#demo--screenshots)
2. [Features](#features)
3. [Getting Started](#getting-started)
4. [Environment Variables](#environment-variables)
5. [Usage](#usage)
6. [Architecture](#architecture)
7. [Key Technical Decisions](#key-technical-decisions)
8. [Project Structure](#project-structure)
9. [File-by-File Walkthrough](#file-by-file-walkthrough)
10. [Edge Cases Handled](#edge-cases-handled)
11. [Testing Checklist](#testing-checklist)
12. [Tech Stack](#tech-stack)
13. [Optional Enhancements Implemented](#optional-enhancements-implemented)
14. [What I'd Do Next](#what-id-do-next)

---

## Demo & Screenshots

> Run locally with `npm run dev` and open http://localhost:5173

**Desktop layout:** Sidebar on the left (search + list), map on the right.
**Mobile layout:** Map on top, sidebar stacked below.

---

## Features

### Core
- **Interactive map** — pan, zoom, click anywhere to select a coordinate
- **Add location** — click the map, name the place, save it
- **Markers + sidebar in sync** — every saved location is rendered in both places from the same source
- **Select a location** — click a sidebar item to fly the map to it, highlight the marker, and highlight the row
- **Edit name** — inline edit via a reusable modal
- **Delete** — with confirmation and a 5-second Undo toast
- **Search** — filters saved locations by name as you type
- **Persistent** — saved to `localStorage` and restored on reload

### UX
- **Reverse geocoding** — clicking the map suggests a place name via Nominatim
- **Marker popups** — show name and coordinates on click
- **Selected marker** — rendered in red to distinguish from other markers
- **Responsive layout** — sidebar stacks below map on small screens
- **Keyboard-friendly modal** — Esc to cancel, Enter to submit, auto-focus on input
- **Loading state** — "Loading…" shown while reading `localStorage`
- **Empty states** — distinct messages for "no saved locations" and "no search matches"

---

## Getting Started

### Prerequisites
- **Node.js** 18 or newer
- **npm** 9 or newer

### Install

```bash
git clone https://github.com/Abinaya0333/cit-frontend-assignment.git
cd cit-frontend-assignment
npm install