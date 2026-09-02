# Job Board Frontend

The frontend is the responsive React experience for the Job Board platform. It serves two audiences in the same product: candidates looking for their next role and company teams managing jobs, members, and applications.

## Experience Map

| Area | User-facing capabilities |
| --- | --- |
| Home and search | Discover featured/recent jobs, search, and browse results |
| Jobs | View details, filter by category, inspect skills and benefits, save, apply |
| Companies | Explore the company directory and company profiles |
| Employer workspace | Register a company, manage jobs, members, roles, and dashboard data |
| Profile | Edit personal information, avatar, password, and profile activity |
| Notifications | View messages, invitations, replies, and application activity |
| Auth | Register, login, logout, Google OAuth, forgot/reset password |
| Content | Career advice, employer guidance, privacy, cookies, and terms pages |

## Stack

- React 19 + TypeScript + Vite
- React Router 7 with lazy-loaded route views
- Redux Toolkit and React Context for state
- Lingui with English and Bulgarian catalogs
- React Helmet Async for page metadata
- React Toastify and React Icons for interaction feedback and UI
- ESLint for code quality

## Start Here

```sh
npm install
npm run dev
```

The development server runs at `http://localhost:5173`. On localhost, API requests target `http://localhost:5000/api`. On the deployed site, requests target the configured Render backend. This behavior is defined in [src/config/api.ts](src/config/api.ts).

## Commands

```sh
npm run dev              # start Vite
npm run build            # production build
npm run preview          # preview the production build
npm run lint             # ESLint
npm run extract          # extract Lingui messages
npm run compile:locale   # compile locale catalogs
npm run check:translations
```

Run `npm run build` after structural changes and before deployment. Vite will catch missing imports, including missing locale catalog files.

## Feature-First Structure

```text
src/
├── features/
│   ├── auth/             login, registration, guards, OAuth callback
│   ├── categories/       category data and UI
│   ├── companies/        directory, company workspace, members, roles
│   ├── homeview/         home and search experience
│   ├── jobs/             discovery, details, posting, applications, favourites
│   ├── notifications/    notification views and message actions
│   └── profile/          profile, editing, avatar, and password flows
├── shared/               layouts, navigation, pages, SEO, and reusable UI
├── context/              theme, roles, favourites, notifications, and data
├── store/                Redux store and slices
├── config/               API configuration
└── styles/               global CSS
```

### Ownership rules

- Put route-level screens in `features/<name>/views`.
- Put feature-local reusable UI in `components`.
- Put API and orchestration logic in `hooks`.
- Put domain models and view contracts in `types`.
- Keep route definitions beside their feature in `routes`.
- Use `shared` for code genuinely used by multiple features.

The migration from older flat folders is intentionally incremental. Do not move unrelated code just to make the tree look uniform; use the `jobs` feature as the strongest reference for new work.

## Route Highlights

Public routes include `/`, `/search`, `/jobs`, `/job/:jobId`, `/category/:categoryName`, and `/companies`. Authenticated users can access `/favourite-jobs`, profile pages, and the company workspace. Company actions are guarded by membership and role checks; posting and editing jobs is limited to the appropriate company roles.

## Localization

Supported locales are `en` and `bg`. Catalog configuration lives in [lingui.config.js](lingui.config.js), while compiled catalogs live under `src/i18n/locales`. When adding a catalog, update the config and the imports in `src/i18n/index.ts` together, then run:

```sh
npm run extract
npm run compile:locale
npm run check:translations
```

## Deployment

The SPA is configured for Vercel through [vercel.json](vercel.json). Build with `npm run build`; the generated `dist/` directory is the deployable output. Configure the deployed backend URL and ensure its CORS allowlist includes the frontend origin.

## Related Documentation

- [Project overview and local setup](../README.md)
- [Backend API reference](../backend/README.md)
