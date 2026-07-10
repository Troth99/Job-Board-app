

# Job Board App

## 📝 Overview
A modern full-stack job board for posting, searching, and managing job listings, companies, and users. The project is split into **frontend** (React + Vite) and **backend** (Node.js + Express + MongoDB).

The frontend is currently being refactored toward a **feature-based architecture**. The `jobs` feature is the main migrated slice and serves as the reference structure for future frontend modules.

---

## 🚀 Features
- User registration, login, JWT authentication
- Create, edit, and delete job postings
- Company and member management
- Filter and search jobs by category, keywords, employment type
- Protected routes (middleware)
- Responsive, modern UI
- Form validation (frontend + backend)
- Toast notifications for success/error
- Pagination and search
- Password reset and change
- Profile editing and image upload

---

## 🛠️ Technologies

**Frontend:**  
- React 19, Vite, TypeScript, Redux Toolkit, React Router, React Helmet Async, ESLint, React Toastify, plain CSS

**Backend:**  
- Node.js, Express, MongoDB (Mongoose), JWT, bcrypt, dotenv, multer, express-validator

---

## 📦 Project Structure

```
Job-Board-app/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── utils/
│   │   └── index.js
│   ├── package.json
│   └── .env
├── frontend/
│   ├── src/
│   │   ├── features/
│   │   │   ├── jobs/
│   │   │   ├── companies/
│   │   │   └── profile/
│   │   ├── components/      # shared / legacy UI
│   │   ├── hooks/           # shared / legacy hooks
│   │   ├── context/
│   │   ├── redux/
│   │   ├── interfaces/
│   │   ├── services/
│   │   ├── seo/
│   │   ├── utils/
│   │   └── App.tsx
│   ├── public/
│   ├── package.json
│   ├── vite.config.js
│   └── tsconfig.json
├── README.md
└── LICENSE
```

---

## 🧭 Frontend Architecture

The frontend is being migrated from a flat `components/hooks/services` layout to a **feature-first structure**.

### Current Direction

- `features/jobs` is the primary reference feature.
- `features/companies` and `features/profile` exist as placeholders for future migration.
- top-level folders like `components`, `hooks`, `context`, `redux`, `services`, and `utils` still hold shared or not-yet-migrated code.

### Jobs Feature Layout

```txt
frontend/src/features/jobs/
├── components/   # reusable parts used by job views
├── form/         # form-specific UI/select inputs
├── hooks/        # jobs API and orchestration hooks
├── routes/       # jobs route definitions
├── types/        # jobs-related models and view types
└── views/        # route-level screens/pages
```

### Jobs Feature Breakdown

`views/`
- route-level pages such as `ViewAllJobs`, `CreateJob`, `EditJob`, `DetailsJob`, `JobDetailsView`, `SavedJobView`, and `HowToPostJobInfo`

`components/`
- reusable feature-local UI such as `ApplyForJobModal` and `SaveJobButton`

`hooks/`
- `useJobsAPI.ts` for jobs API requests
- `useJobApplications.ts` for application actions
- `useSavedJobs.ts` for saved jobs/favorites logic
- `useJobBoard.ts` as a composition hook over jobs-related actions
- `useJobFilters.ts` for jobs filtering state/helpers

`types/`
- `Job.model.ts`
- `Apllication.model.ts`
- `SavedJob.model.ts`
- `QuickInfoSection.types.ts`

`form/`
- jobs form selects and related form-specific inputs

### Practical Rule

- put **route-level screens** in `views`
- put **feature-local reusable pieces** in `components`
- put **API/state logic** in `hooks`
- put **models and view contracts** in `types`
- keep **shared cross-feature logic** in existing shared top-level folders until those are explicitly refactored

### Migration Note

The frontend is in a transitional state. Some older folders still exist alongside the new feature-based structure. This is intentional during migration; new frontend work should prefer the `features/*` layout, starting with the `jobs` pattern.

---

## ⚡ Installation & Setup

### 1. Clone the repository
```sh
git clone <repo-url>
cd Job-Board-app
```

### 2. Backend Setup
```sh
cd backend
npm install
```
Create a `.env` file:
```
PORT=5000
MONGO_URI=your_mongo_uri
JWT_SECRET=your_jwt_secret
JWT_REFRESH_SECRET=your_refresh_secret
EMAIL_FROM=your@email.com
FRONTEND_URL=https://your-frontend-url.vercel.app
SENDGRID_API_KEY=your_sendgrid_key
```
Start backend:
```sh
npm run dev
```

### 3. Frontend Setup
```sh
cd ../frontend
npm install
npm run dev
```

Frontend scripts:

```sh
npm run dev
npm run build
npm run preview
npm run lint
```

---

## 🏃‍♂️ Running Locally

- Backend: `http://localhost:5000`
- Frontend: `http://localhost:5173`

---

## 🌐 Deployment

- **Frontend:** Vercel (SPA routing, automatic deploy on main branch changes)
- **Backend:** Render.com, Heroku, or other Node.js hosting
- **MongoDB:** MongoDB Atlas

---

## 🔗 API Endpoints (examples)
- `POST /api/users/register` — register
- `POST /api/users/login` — login
- `GET /api/jobs` — all jobs
- `POST /api/jobs` — create job (auth)
- `POST /api/users/forgot-password` — request password reset
- `POST /api/users/reset-password/:token` — reset password

---

## 🖥️ Usage

- Register and login
- Create or edit your profile
- Post and manage job listings
- Apply for jobs
- Manage company and members

---

## 🧪 Testing

- Test API with Postman or Thunder Client
- Test UI in browser
- For production build: `npm run build` and `npm run preview` (frontend)

---

## 🛡️ Security

- JWT middleware for protected routes
- bcrypt for password hashing
- CORS configured for frontend/backend communication

---

## 🌐 Live Deployment

**Frontend:** [https://job-board-three-omega.vercel.app/](https://job-board-three-omega.vercel.app/)

---

## 📋 Contribution

- Fork, feature branch, pull request
- Follow code style (ESLint, Prettier)
- Write clear commit messages

---

## 📄 License

MIT

---
