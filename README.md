# Job Board

> A full-stack hiring workspace for discovering roles, building companies, and moving candidates through the hiring journey.

Job Board brings job discovery and lightweight recruiting operations into one focused experience. Candidates can search, save, and apply for opportunities. Employers can create a company, collaborate with members, publish jobs, review applications, and follow activity through notifications.

**Live app:** [job-board-three-omega.vercel.app](https://job-board-three-omega.vercel.app/)

## What You Can Do

### For candidates

- Browse recent and categorized job listings
- Search by keywords and filter by employment type and category
- Open detailed job views with skills, benefits, salary, and deadline information
- Apply with a CV link, contact details, and cover letter
- Save interesting jobs to a personal favourites list
- Track notifications and application updates
- Maintain a profile, avatar, and password

### For employers

- Create and update a company profile
- Invite team members and manage `owner`, `admin`, and `recruiter` responsibilities
- Publish, edit, and manage company job listings
- Review applications and update their status
- See application statistics in the company dashboard
- Transfer ownership or leave/abandon a company when appropriate

### Product experience

- JWT access and refresh token authentication
- Google OAuth 2.0 sign-in
- Real-time notifications through Server-Sent Events
- Password recovery email flow through SendGrid
- Responsive UI with English and Bulgarian translations
- Protected routes, role guards, validation, lazy-loaded views, SEO metadata, and toast feedback

## Technology

| Area | Stack |
| --- | --- |
| Frontend | React 19, TypeScript, Vite, React Router 7 |
| State and UI | Redux Toolkit, React Context, React Toastify, React Icons |
| Localization | Lingui with `en` and `bg` catalogs |
| Backend | Node.js, Express 5, Mongoose 8 |
| Security | JWT, bcrypt, Passport Google OAuth, rate limiting, CORS |
| Integrations | MongoDB Atlas, SendGrid, Multer, Server-Sent Events |
| Deployment | Vercel frontend, Render-compatible backend, MongoDB Atlas |

## Repository Map

```text
Job-Board-app/
├── backend/              Express API and database layer
│   └── src/
│       ├── controllers/  Request handlers for each domain
│       ├── models/       User, job, company, application, and support schemas
│       ├── routes/       API route modules mounted from routes/index.js
│       ├── services/     Database-focused business logic
│       ├── middleware/   Authentication and request middleware
│       └── utils/        Shared backend helpers
├── frontend/             React application
│   └── src/
│       ├── features/     Auth, jobs, companies, profile, notifications, and more
│       ├── shared/       Layouts, pages, navigation, SEO, and reusable UI
│       ├── context/      Theme, notifications, roles, and favourites state
│       └── store/        Redux store configuration
└── tests/                Browser test artifacts and test configuration
```

The frontend follows a feature-first structure. A feature normally contains `components`, `hooks`, `routes`, `types`, and `views`; shared code stays under `src/shared` or the existing top-level contexts and store.

## Run Locally

### Prerequisites

- Node.js 18+
- A MongoDB database
- Optional: Google OAuth and SendGrid credentials for those flows

### 1. Install dependencies

```sh
cd backend && npm install
cd ../frontend && npm install
```

### 2. Configure the backend

Create `backend/.env.development`:

```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb+srv://<user>:<password>@<cluster>/jobboard
JWT_SECRET=replace-with-a-long-access-secret
JWT_REFRESH_SECRET=replace-with-a-long-refresh-secret
SESSION_SECRET=replace-with-a-long-session-secret
FRONTEND_URL=http://localhost:5173
GOOGLE_CLIENT_ID=optional-google-client-id
GOOGLE_CLIENT_SECRET=optional-google-client-secret
GOOGLE_CALLBACK_URL=http://localhost:5000/api/auth/google/callback
SENDGRID_API_KEY=optional-sendgrid-key
EMAIL_FROM=verified-sender@example.com
```

`NODE_ENV=production` loads `backend/.env.production` instead. Keep secrets out of git.

### 3. Start the API

```sh
cd backend
npm run dev
```

The API is available at `http://localhost:5000`; its root health response is `API is up and running!`.

### 4. Start the frontend

```sh
cd frontend
npm run dev
```

Open `http://localhost:5173`. The frontend automatically uses the local API on localhost and the deployed Render API elsewhere. For the full command list, see [frontend/README.md](frontend/README.md).

## Useful Commands

```sh
# frontend
npm run dev
npm run build
npm run lint
npm run preview
npm run extract
npm run compile:locale
npm run check:translations

# backend
npm run dev
npm start
npm run migrate:add-job-skills
```

## API Overview

The backend is mounted under `/api`:

| Area | Base path | Purpose |
| --- | --- | --- |
| Users | `/api/users` | Registration, login, profiles, passwords, tokens |
| OAuth | `/api/auth` | Google authentication |
| Jobs | `/api/jobs` | Public discovery and protected job management |
| Companies | `/api/companies` | Company profiles, members, and roles |
| Applications | `/api/applications` | Candidate applications and statuses |
| Favourites | `/api/favourites` | Save and remove jobs |
| Notifications | `/api/notifications` | In-app messages and SSE stream |
| Stats | `/api/application/stats` | Company application analytics |
| Categories | `/api/categories` | Job category catalogue |
| Health | `/api/ping` | Backend connectivity check |

For endpoint-level details and auth requirements, see [backend/README.md](backend/README.md).

## Security Notes

Protected requests use `Authorization: Bearer <accessToken>`. Access tokens expire quickly and refresh tokens are stored server-side with a seven-day lifetime. Passwords are hashed with bcrypt. In production, use strong unique secrets, HTTPS, a restricted CORS origin, and real provider credentials.

## Contributing

Use a focused feature branch, keep frontend work inside the owning feature where possible, run the frontend build and lint checks, and describe user-visible behavior in the pull request.

## License

MIT. See [LICENSE](LICENSE).
