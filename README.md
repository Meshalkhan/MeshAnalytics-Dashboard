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

## Deploy on Vercel (Option 2: Both Client and Server on Vercel)

Deploy as two Vercel projects from the same repository.

### A) Deploy the Server project

1. Push this repository to GitHub/GitLab/Bitbucket.
2. In Vercel, create a new project from this repo.
3. Set **Root Directory** to `server`.
4. Keep defaults and deploy.
5. After deployment, verify:
   - `https://<server-project>.vercel.app/api/dashboard`

The Vercel serverless endpoint is implemented at `server/api/dashboard.js`.

### B) Deploy the Client project

1. Create another Vercel project from the same repository.
2. Set **Root Directory** to `client`.
3. Add environment variable:
   - `VITE_API_BASE_URL=https://<server-project>.vercel.app/api`
4. Deploy.

### C) Redeploy when env vars change

If `VITE_API_BASE_URL` is updated, trigger a new client deployment so Vite picks up the new value at build time.

## Goal
Demonstrate Vue dashboard engineering skills.
