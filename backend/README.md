# Job Board Backend API

The backend is an Express API that powers job discovery, company collaboration, recruiting workflows, authentication, and notifications.

## Stack

Node.js ESM, Express 5, MongoDB with Mongoose 8, JWT access and refresh tokens, Passport Google OAuth 2.0, bcrypt, SendGrid, Multer, express-validator, CORS, rate limiting, and Server-Sent Events.

## Run It

```sh
npm install
npm run dev       # development with nodemon
npm start         # production-style start
```

The server defaults to `http://localhost:5000`. Its root endpoint returns `API is up and running!`.

## Configuration

The app loads `.env` first and then overrides it with `.env.development` or `.env.production`, based on `NODE_ENV`.

```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb+srv://<user>:<password>@<cluster>/jobboard
JWT_SECRET=long-access-token-secret
JWT_REFRESH_SECRET=long-refresh-token-secret
SESSION_SECRET=long-session-secret
FRONTEND_URL=http://localhost:5173
GOOGLE_CLIENT_ID=google-client-id
GOOGLE_CLIENT_SECRET=google-client-secret
GOOGLE_CALLBACK_URL=http://localhost:5000/api/auth/google/callback
SENDGRID_API_KEY=sendgrid-api-key
EMAIL_FROM=verified-sender@example.com
```

Google OAuth and password-reset email features require their provider variables. Never commit environment files or real credentials.

## Architecture

```text
src/
├── index.js                  Express setup, middleware, DB connection, server
├── config/passport.js        Google OAuth strategy
├── controllers/              HTTP handlers by domain
├── middleware/               JWT protection
├── models/                   Mongoose schemas
├── routes/                   Domain routers mounted from routes/index.js
├── services/                 Job/company database operations
├── scripts/                  One-off migrations
├── seedCategories.js         Category seed script
└── utils/generateToken.js    Access and refresh token helpers
```

## Authentication

1. Register or log in to receive a 15-minute access token and seven-day refresh token.
2. Send the access token as `Authorization: Bearer <accessToken>`.
3. Call `POST /api/users/refresh-token` with the refresh token after expiry.
4. Call `POST /api/users/logout` to invalidate the stored refresh token.

Google login starts at `GET /api/auth/google` and returns to the configured callback before redirecting to the frontend OAuth callback.

## API Reference

`Lock` means the route expects a valid Bearer access token. `Public` means no `protect` middleware is currently attached.

### Users and Auth

| Method | Endpoint | Auth | Purpose |
| --- | --- | --- | --- |
| POST | `/api/users/register` | - | Create an account |
| POST | `/api/users/login` | - | Log in |
| POST | `/api/users/logout` | - | Invalidate refresh token |
| POST | `/api/users/refresh-token` | - | Issue a new access token |
| GET | `/api/users/me` | Lock | Read own profile |
| PUT | `/api/users/me` | Lock | Update own profile |
| DELETE | `/api/users/me` | Lock | Delete account |
| PUT | `/api/users/change-password` | Lock | Change password |
| POST | `/api/users/forgot-password` | - | Send reset email |
| POST | `/api/users/reset-password/:token` | - | Set a new password |
| GET | `/api/auth/google` | - | Start Google OAuth |

### Jobs and Favourites

| Method | Endpoint | Auth | Purpose |
| --- | --- | --- | --- |
| GET | `/api/jobs` | - | List jobs; supports company filtering |
| GET | `/api/jobs/recent` | - | List recent jobs with optional limit |
| GET | `/api/jobs/:id` | - | Read one job |
| GET | `/api/jobs/category/:categoryName` | - | Filter by category |
| POST | `/api/jobs` | Lock | Create a company job |
| PUT | `/api/jobs/:id` | Lock | Update a job |
| DELETE | `/api/jobs/:id` | Lock | Delete a job |
| GET/POST/DELETE | `/api/favourites/*` | Lock | Read, save, and remove saved jobs |

### Companies and Applications

| Method | Endpoint | Auth | Purpose |
| --- | --- | --- | --- |
| GET | `/api/companies` | - | Browse companies |
| GET | `/api/companies/:id` | - | Read a company |
| POST | `/api/companies` | Lock | Create a company |
| GET | `/api/companies/:companyId/members` | Lock | List members |
| POST | `/api/companies/:companyId/add-member` | Lock | Invite a member |
| PATCH | `/api/companies/:companyId/members/:memberId/role` | Lock | Change a role |
| POST | `/api/companies/:companyId/transfer-ownership` | Lock | Transfer ownership |
| DELETE | `/api/companies/:companyId/member/:memberId` | Lock | Remove a member |
| POST | `/api/applications` | Lock | Submit an application |
| GET | `/api/applications/job/:jobId` | Lock | List applications for a job |
| PATCH | `/api/applications/:id/status` | Public | Update application status |

Application statuses are `new`, `pending`, `approved`, and `rejected`.

### Notifications, Stats, and Categories

| Method | Endpoint | Auth | Purpose |
| --- | --- | --- | --- |
| GET | `/api/notifications/user/:userId` | Public | List user notifications |
| GET | `/api/notifications/stream/:userId` | Public | Open the SSE stream |
| PATCH | `/api/notifications/read/:id` | Public | Mark a notification read |
| GET | `/api/application/stats` | Public | Read application statistics |
| GET | `/api/categories` | - | List job categories |
| GET | `/api/ping` | - | Connectivity check |

For complete route behavior, inspect the matching module in `src/routes` and controller in `src/controllers`.

## Data Model

- `User`: identity, credentials, profile, avatar, company relationship, reset state
- `Jobs`: title, description, location, salary, company, category, skills, benefits, deadline, views, active state
- `Company`: profile data, creator, members, and employer metadata
- `CompanyMember`: user/company junction with `owner`, `admin`, or `recruiter` role
- `Application`: applicant, job, CV, cover letter, contact data, status, timestamp
- `Notification`: recipient, message, read state, action metadata, and optional company link
- `RefreshToken`: stored refresh token with user and expiry
- `Category`: name-based job classification

## Operations

Seed categories or run the available migration with:

```sh
node src/seedCategories.js
npm run migrate:add-job-skills
```

The service layer keeps common job and company database operations out of controllers. The `protect` middleware verifies JWTs and attaches the authenticated user without exposing the password.

## Related Documentation

- [Product overview and setup](../README.md)
- [Frontend guide](../frontend/README.md)
