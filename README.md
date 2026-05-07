# MeshAnalytics Dashboard

Enterprise data visualization dashboard.

## Features
- Interactive charts
- Dynamic filters
- Responsive analytics UI
- API-driven data

## Tech Stack
- Vue 3
- Pinia
- Chart.js
- Node.js + Express

## Getting Started

### 1) Install dependencies

```bash
cd client && npm install
cd ../server && npm install
```

### 2) Run the server

```bash
cd server
npm run dev
```

Server runs on `http://localhost:4000`.

### 3) Run the client

```bash
cd client
npm run dev
```

Client runs on `http://localhost:5173`.

## API Overview

- `GET /api/dashboard` - returns dashboard KPIs, charts, and table rows.
- Query params:
  - `period` (`7d`, `30d`, `90d`)
  - `region` (`all`, `north-america`, `emea`, `apac`, `latam`)
  - `segment` (`all`, `enterprise`, `mid-market`, `smb`)

## Goal
Demonstrate Vue dashboard engineering skills.
