# FitTrack

A personal gym workout tracker built with React, TypeScript, and Vite. Log workouts, track exercises, view progress charts, and browse an exercise library — all data stored in `localStorage`.

## Tech Stack

- **React 19** with TypeScript 6
- **Vite 8** for dev server and builds
- **Tailwind CSS 4** for styling
- **react-router 8** for client-side routing
- **Oxlint** for linting
- **React Compiler** enabled via Babel plugin
- **pnpm** as package manager

## Features

- **Dashboard** — Overview stats (total workouts, volume, sets, weekly count) and recent activity
- **Workout Logging** — Two-step wizard: pick exercises, then log sets with reps and weight
- **Exercise Library** — Browse 35 predefined exercises grouped by muscle group, with usage frequency
- **Progress Charts** — Per-exercise bar charts for max weight and total volume over time
- **Workout History** — Chronological history grouped by month with delete support
- **Persistence** — All data saved automatically to `localStorage`

## Getting Started

```bash
pnpm install
pnpm dev
```

## Scripts

| Command           | Description                |
| ----------------- | -------------------------- |
| `pnpm dev`        | Start Vite dev server      |
| `pnpm build`      | Type-check and build       |
| `pnpm preview`    | Preview production build   |
| `pnpm lint`       | Run Oxlint                 |
