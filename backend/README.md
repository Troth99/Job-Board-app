# Job Board — Backend API

> Node.js · Express 5 · MongoDB (Mongoose) · JWT Auth · Google OAuth 2.0 · SSE Notifications · SendGrid

---

## Table of Contents

- [Job Board — Backend API](#job-board--backend-api)
  - [Table of Contents](#table-of-contents)
  - [Tech Stack](#tech-stack)
  - [Project Structure](#project-structure)
  - [Environment Variables](#environment-variables)
  - [Getting Started](#getting-started)
  - [Authentication Flow](#authentication-flow)
  - [API Reference](#api-reference)
    - [Users](#users)
    - [Auth (OAuth)](#auth-oauth)
    - [Jobs](#jobs)
    - [Companies](#companies)
    - [Applications](#applications)
    - [Notifications](#notifications)
    - [Stats](#stats)
    - [Categories](#categories)
  - [Models](#models)
    - [User](#user)
    - [Job](#job)
    - [Company](#company)
    - [Application](#application)
    - [Notification](#notification)
    - [RefreshToken](#refreshtoken)
    - [CompanyMember](#companymember)
    - [Category](#category)
  - [Middleware](#middleware)
    - [`protect` — `src/middleware/authMiddleware.js`](#protect--srcmiddlewareauthmiddlewarejs)
  - [Services](#services)
  - [Utils](#utils)
    - [`src/utils/generateToken.js`](#srcutilsgeneratetokenjs)
  - [What's Missing / TODO](#whats-missing--todo)

---

## Tech Stack

| Layer | Package |
|---|---|
| Runtime | Node.js (ESM) |
| Framework | Express 5 |
| Database | MongoDB via Mongoose 8 |
| Auth | JWT (access 15m / refresh 7d) + Google OAuth 2.0 (Passport) |
| Email | SendGrid (`@sendgrid/mail`) |
| Password hashing | bcrypt (salt rounds: 13) |
| Validation | express-validator + mongoose schema validators |
| File uploads | Multer |
| Real-time | Server-Sent Events (SSE) |
| Dev server | Nodemon |

---

## Project Structure

```
backend/
├── src/
│   ├── index.js                  # App entry — Express setup, DB connect, routes mount
│   ├── seedCategories.js         # One-time DB seed script for job categories
│   │
│   ├── config/
│   │   └── passport.js           # Google OAuth 2.0 strategy (Passport)
│   │
│   ├── middleware/
│   │   └── authMiddleware.js     # JWT protect middleware (Bearer token)
│   │
│   ├── models/
│   │   ├── User.js               # User schema + bcrypt pre-save hook
│   │   ├── Jobs.js               # Job posting schema
│   │   ├── Company.js            # Company schema
│   │   ├── CompanyMember.js      # Company <-> User membership + roles
│   │   ├── Application.js        # Job application schema
│   │   ├── Category.js           # Job category schema
│   │   ├── Notification.js       # In-app notification schema
│   │   └── RefreshToken.js       # Stored refresh tokens (7d TTL)
│   │
│   ├── controllers/
│   │   ├── userController.js           # Register, Login, Profile CRUD, Token refresh, Logout
│   │   ├── jobController.js            # Jobs CRUD + category filter + recent jobs
│   │   ├── companyController.js        # Company CRUD + member management
│   │   ├── ApplicationController.js    # Application CRUD + status update
│   │   ├── categoryController.js       # Category listing
│   │   ├── notificationsContoller.js   # Notifications CRUD + SSE stream
│   │   ├── statsController.js          # Application statistics per company
│   │   ├── changePasswordController.js # Authenticated password change
│   │   ├── forgotPasswordController.js # Send reset-password email (SendGrid)
│   │   └── resetPasswordController.js  # Consume reset token + set new password
│   │
│   ├── routes/
│   │   ├── index.js              # Central router — mounts all sub-routers
│   │   ├── userRoutes.js         # /api/users/*
│   │   ├── jobRoutes.js          # /api/jobs/*
│   │   ├── companyRoutes.js      # /api/companies/*
│   │   ├── applicationRoutes.js  # /api/applications/*
│   │   ├── categoriesRoutes.js   # /api/categories/*
│   │   ├── notificationRoutes.js # /api/notifications/*
│   │   ├── statsRoutes.js        # /api/application/stats
│   │   └── authRoutes.js         # /api/auth/google (OAuth)
│   │
│   ├── services/
│   │   ├── jobService.js         # Job DB logic (create, getById, recent, byCategory)
│   │   └── companyService.js     # Company DB logic + member role helpers
│   │
│   └── utils/
│       └── generateToken.js      # generateAccessToken() + generateRefreshToken()
│
└── package.json
```

---

## Environment Variables

Create `.env.development` and `.env.production` files in `backend/`.

```env
# Server
PORT=5000
NODE_ENV=development

# Database
MONGO_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/jobboard

# JWT
JWT_SECRET=your_access_token_secret
JWT_REFRESH_SECRET=your_refresh_token_secret

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:5000/api/auth/google/callback

# SendGrid (forgot password emails)
SENDGRID_API_KEY=SG.xxx

# Frontend URL (used for OAuth redirects)
FRONTEND_URL=http://localhost:5173

# Sessions (Passport)
SESSION_SECRET=your_session_secret
```

---

## Getting Started

```bash
# Install dependencies
npm install

# Development (hot reload)
npm run dev

# Production
npm start
```

---

## Authentication Flow

```
1. Register / Login  ->  returns { accessToken (15m), refreshToken (7d) }
2. Client stores both tokens
3. Every request  ->  Authorization: Bearer <accessToken>
4. Token expired?  ->  POST /api/users/refresh-token with { refreshToken }
                   ->  returns new accessToken
5. Logout          ->  POST /api/users/logout  (deletes refreshToken from DB)

Google OAuth:
1. Redirect user to  GET /api/auth/google
2. Google returns to GET /api/auth/google/callback
3. Server issues JWT pair, redirects to frontend /oauth-callback?accessToken=...
```

---

## API Reference

> Lock = requires `Authorization: Bearer <accessToken>` header

---

### Users

Base: `/api/users`

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/register` | — | Register new user |
| POST | `/login` | — | Login, returns token pair |
| POST | `/logout` | — | Invalidate refresh token |
| POST | `/refresh-token` | — | Exchange refresh token for new access token |
| POST | `/check-user-exists` | — | Check if email already registered |
| GET | `/me` | Lock | Get own profile |
| PUT | `/me` | Lock | Update own profile |
| DELETE | `/me` | Lock | Delete account |
| DELETE | `/me/avatar` | Lock | Remove profile image |
| PUT | `/change-password` | Lock | Change password (requires current password) |
| POST | `/forgot-password` | — | Send password reset email |
| POST | `/reset-password/:token` | — | Reset password via email token |

---

### Auth (OAuth)

Base: `/api/auth`

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/google` | — | Redirect to Google consent screen |
| GET | `/google/callback` | — | Google callback — issues JWT, redirects to frontend |

---

### Jobs

Base: `/api/jobs`

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/` | — | Get all jobs (filter by `?company=id`) |
| GET | `/recent` | — | Get recent jobs (`?limit=10`) |
| GET | `/:id` | — | Get single job by ID |
| GET | `/category/:categoryName` | — | Get jobs by category name |
| POST | `/` | Lock | Create job (must be a company member) |
| PUT | `/:id` | Lock | Update job |
| DELETE | `/:id` | Lock | Delete job |

---

### Companies

Base: `/api/companies`

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/` | — | Get all companies |
| GET | `/:id` | — | Get company by ID |
| GET | `/my-company` | Lock | Get own company |
| POST | `/` | Lock | Create company |
| POST | `/:companyId/add-member` | Lock | Invite member to company |
| GET | `/:companyId/members` | Lock | List company members |
| GET | `/:companyId/members/:userId/role` | Lock | Get member role |
| PATCH | `/:companyId/members/:memberId/role` | Lock | Change member role |
| POST | `/:companyId/transfer-ownership` | Lock | Transfer company ownership |
| DELETE | `/:companyId/member/:memberId` | Lock | Kick member |
| DELETE | `/:companyId/abandon` | Lock | Abandon / delete company |

---

### Applications

Base: `/api/applications`

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/` | Lock | Submit application (CV link + cover letter) |
| GET | `/job/:jobId` | Lock | Get all applications for a job |
| GET | `/:id` | Lock | Get single application |
| PATCH | `/:id/status` | — | Update application status |
| DELETE | `/:id` | — | Delete application |

Application statuses: `new` / `pending` / `approved` / `rejected`

---

### Notifications

Base: `/api/notifications`

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/stream/:userId` | — | SSE stream — real-time push |
| POST | `/` | — | Create notification |
| GET | `/user/:userId` | — | Get all notifications for user |
| GET | `/:id` | — | Get single notification |
| PATCH | `/read/:id` | — | Mark notification as read |
| DELETE | `/:id` | — | Delete notification |

---

### Stats

Base: `/api/application`

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/stats` | — | Application counts per status / per company |

---

### Categories

Base: `/api/categories`

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/` | — | Get all job categories |

---

## Models

### User
| Field | Type | Notes |
|---|---|---|
| firstName | String | required, min 2 chars |
| lastName | String | required (unless Google OAuth) |
| email | String | unique, validated |
| phoneNumber | String | required (unless Google OAuth) |
| location | String | required (unless Google OAuth) |
| password | String | hashed with bcrypt, salt 13 |
| googleId | String | set on OAuth login |
| avatar | String | URL |
| company | ObjectId -> Company | |
| resetPasswordToken | String | |
| resetPasswordExpire | Date | |

### Job
| Field | Type | Notes |
|---|---|---|
| title | String | required |
| description | String | required |
| location | String | required |
| salary | String | |
| logo | String | |
| createdBy | ObjectId -> User | required |
| company | ObjectId -> Company | required |
| category | ObjectId -> Category | required |
| employmentType | String | default: Full-time |
| benefits | [String] | |
| tags | [String] | |
| skills | [String] | |
| applicationDeadline | Date | |
| email | String | contact email |
| views | Number | default: 0 |
| isActive | Boolean | default: true |

### Company
| Field | Type | Notes |
|---|---|---|
| name | String | required, unique |
| industry | String | required |
| description | String | |
| location | String | required |
| website | String | |
| logo | String | |
| size | String | |
| foundedYear | Number | |
| members | [ObjectId -> User] | |
| createdBy | ObjectId -> User | required |

### Application
| Field | Type | Notes |
|---|---|---|
| jobId | ObjectId -> Job | required |
| userId | ObjectId -> User | required |
| email | String | required |
| phone | String | |
| cv | String | CV URL — required |
| coverLetter | String | |
| status | String | new / pending / approved / rejected |
| appliedAt | Date | auto |

### Notification
| Field | Type | Notes |
|---|---|---|
| user | ObjectId -> User | recipient |
| sender | ObjectId -> User | |
| type | String | required |
| message | String | required |
| isRead | Boolean | default: false |
| actionRequired | Boolean | |
| actionType | String | |
| link | String | |
| company | ObjectId -> Company | |

### RefreshToken
Stores issued refresh tokens — fields: `userId`, `token`, `expiresAt` (7 days).

### CompanyMember
Junction model linking `User <-> Company` with a `role` field (`owner` / `member`).

### Category
Name-based category used to classify job postings. Seeded via `seedCategories.js`.

---

## Middleware

### `protect` — `src/middleware/authMiddleware.js`

- Reads `Authorization: Bearer <token>` header
- Verifies JWT signature against `JWT_SECRET`
- Attaches full `User` document (without password) to `req.user`
- Returns `401` for missing, expired, or invalid tokens
- Does **not** log `TokenExpiredError` (expected during refresh flow)

---

## Services

| File | Functions |
|---|---|
| `jobService.js` | `createJobService` · `getJobById` · `getRecentJobs` · `getJobsByCategoryName` |
| `companyService.js` | `createCompanyService` · `getCompaniesService` · `getCompanyByIdService` · `getMemberRole` |

Services contain the raw DB logic so controllers stay thin.

---

## Utils

### `src/utils/generateToken.js`

```js
generateAccessToken(userId)   // JWT signed with JWT_SECRET,         expires 15m
generateRefreshToken(userId)  // JWT signed with JWT_REFRESH_SECRET,  expires 7d
```

---

## What's Missing / TODO

| Area | Detail |
|---|---|
| **Input validation** | `express-validator` is installed but not applied to most routes — add validation chains for register, create job, create company |
| **Authorization guards on jobs** | No ownership check on job edit/delete — any authenticated user can edit any job |
| **Application status guard** | `PATCH /:id/status` has no `protect` middleware — anyone can change status |
| **Delete application guard** | `DELETE /:id` has no `protect` middleware |
| **Notification cleanup** | No TTL index or cron to purge old read notifications |
