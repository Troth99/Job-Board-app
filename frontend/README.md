# Frontend

## Overview

This frontend is built with React, Vite, and TypeScript.

The codebase is currently in transition from a flat structure (`components`, `hooks`, `services`) to a feature-based structure. The `jobs` feature is the main migrated example and should be used as the reference pattern for future frontend work.

## Stack

- React 19
- Vite
- TypeScript
- React Router
- Redux Toolkit
- React Redux
- React Helmet Async
- React Toastify
- ESLint
- plain CSS

## Scripts

Run all commands from [frontend/package.json](e:/JavaScript%20programming%20files/Job-Board-app/frontend/package.json).

```sh
npm install
npm run dev
npm run build
npm run preview
npm run lint
```

## Current Frontend Structure

```txt
frontend/
├── public/
├── src/
│   ├── features/
│   │   ├── jobs/
│   │   ├── companies/
│   │   └── profile/
│   ├── components/      # shared or not-yet-migrated UI
│   ├── hooks/           # shared or not-yet-migrated hooks
│   ├── context/
│   ├── redux/
│   ├── interfaces/
│   ├── services/
│   ├── seo/
│   ├── utils/
│   ├── Routes/
│   ├── RouteGuards/
│   ├── App.tsx
│   └── main.tsx
├── package.json
├── tsconfig.json
├── vite.config.js
└── vercel.json
```

## Feature-Based Direction

The target direction is:

- route-level screens go in `views`
- feature-local reusable UI goes in `components`
- API and orchestration logic goes in `hooks`
- models and contracts go in `types`
- form-only helpers/selects can live in `form`
- route config stays close to the feature in `routes`

## Jobs Feature Reference

Current structure:

```txt
src/features/jobs/
├── components/
│   ├── ApplyForJobModal/
│   └── SaveJobButton/
├── form/
│   └── formSelectedInputs.tsx
├── hooks/
│   ├── useJobApplications.ts
│   ├── useJobBoard.ts
│   ├── useJobFilters.ts
│   ├── useJobsAPI.ts
│   └── useSavedJobs.ts
├── routes/
│   └── JobsRoutes.tsx
├── types/
│   ├── Apllication.model.ts
│   ├── Job.model.ts
│   ├── QuickInfoSection.types.ts
│   └── SavedJob.model.ts
└── views/
    ├── CreateJob/
    ├── DetailsJob/
    ├── EditJob/
    ├── HowToPostJobInfo/
    ├── JobDetailsView/
    ├── SavedJobView/
    └── ViewAllJobs/
```

### What belongs in `views`

- full pages loaded by routes
- route entry screens
- page-specific layout composition

Examples:

- `ViewAllJobs`
- `CreateJob`
- `EditJob`
- `DetailsJob`
- `JobDetailsView`
- `SavedJobView`

### What belongs in `components`

- smaller reusable parts of a feature
- buttons, modals, local reusable sections
- pieces that can be reused by multiple views in the same feature

Examples:

- `ApplyForJobModal`
- `SaveJobButton`

### What belongs in `hooks`

- API request hooks
- composed feature hooks
- feature-local state helpers

Examples:

- `useJobsAPI.ts`
- `useJobApplications.ts`
- `useSavedJobs.ts`
- `useJobBoard.ts`
- `useJobFilters.ts`

### What belongs in `types`

- domain models
- feature-local view props/interfaces

Examples:

- `Job.model.ts`
- `Apllication.model.ts`
- `SavedJob.model.ts`
- `QuickInfoSection.types.ts`

## Shared vs Feature Code

Keep code in top-level shared folders when it is used across multiple features.

Typical shared areas:

- `src/components/`
- `src/hooks/`
- `src/context/`
- `src/redux/`
- `src/services/`
- `src/utils/`
- `src/seo/`
- `src/RouteGuards/`

Move code into `features/*` only when it is clearly owned by one feature.

## Naming Conventions

- use `views` for route-level screens
- use `components` for reusable UI inside a feature
- keep file and folder names aligned when possible
- prefer descriptive names over generic names like `utils` inside a feature unless the purpose is actually utility logic

Good examples:

- `SaveJobButton.tsx`
- `SavedJobView.tsx`
- `useJobApplications.ts`
- `Job.model.ts`

## Adding a New Feature

When creating a new frontend feature, prefer this shape:

```txt
src/features/feature-name/
├── components/
├── hooks/
├── routes/
├── types/
└── views/
```

Add `form/` only if the feature has meaningful form-specific UI or options.

## Practical Rules

- do not move everything at once; migrate one slice at a time
- after moving files, always run `npm run build`
- prefer direct imports while refactoring instead of overusing barrel files
- keep shared code shared until feature ownership is clear
- use `jobs` as the reference example for future migrations