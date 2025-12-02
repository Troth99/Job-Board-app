# Job Board App — Full Stack (React + Node.js + MongoDB)

## 📝 Overview

A modern job board platform for posting, searching, and managing job listings, companies, and users. The project is split into two main modules: **frontend** (React + Vite) and **backend** (Node.js + Express + MongoDB).

---

## 📦 Project Structure

```
Job-Board-app/
│
├── backend/      # Node.js/Express/MongoDB REST API
│   ├── src/
│   │   ├── controllers/      # API logic (job, user, company, category)
│   │   ├── middleware/       # JWT, CORS, error handling
│   │   ├── models/           # Mongoose schemas (User, Job, Company, Category)
│   │   ├── routes/           # Express routes
│   │   ├── services/         # Business logic (jobService, companyService)
│   │   ├── utils/            # Utility functions (token, validation)
│   │   └── index.js          # Main entry point
│   ├── package.json
│   └── .env                  # Configuration (MONGO_URI, JWT_SECRET)
│
├── frontend/     # React + Vite SPA
│   ├── src/
│   │   ├── components/       # UI components (Jobs, Company, Profile, Auth)
│   │   ├── hooks/            # Custom React hooks (useJobs, useCompany, useForm)
│   │   ├── services/         # API requests (api.ts, jobService.tsx)
│   │   ├── context/          # Global contexts (Auth, Company)
│   │   ├── styles/           # CSS files
│   │   ├── interfaces/       # TypeScript interfaces
│   │   ├── App.tsx           # Main component with routes
│   ├── public/               # Static files
│   ├── package.json
│   └── vite.config.js
│
├── README.md
└── LICENSE
```

---

## 🚀 Technologies

- **Frontend:** React 19, Vite, TypeScript, Redux Toolkit, React Router, ESLint, CSS Modules, React Toastify
- **Backend:** Node.js, Express, MongoDB (Mongoose), JWT, bcrypt, dotenv, multer, express-validator
- **Dev tools:** Nodemon, ESLint

---

## 🔑 Main Features

- User registration and login (JWT authentication)
- Create, edit, and delete job postings
- Company and member management
- Filter and search jobs by category, keywords, and employment type
- Protected routes (middleware protect)
- Responsive and modern UI
- Form validation (frontend + backend)
- Toast notifications for success/error
- Pagination and search

---

## 🖥️ Local Development Setup

### 1. Clone the repository

```powershell
git clone <repo-url>
cd Job-Board-app
```

### 2. Setup backend

```powershell
cd backend
npm install
```

#### .env file (example):

```
PORT=5000
MONGO_URI=mongodb+srv://jobboard_admin:zQvzM90QIPYF1WWg@cluster0.mcnhlci.mongodb.net/jobboard?retryWrites=true&w=majority
JWT_SECRET=Df83hfh29fhf7hfsdjfhs9fhsf8fhsfhs93fh
JWT_REFRESH_SECRET=1231adaseawq23awdaw22d2ads2c2c2

```

#### Start backend:

```powershell
npm run dev
```
Backend will start on port 5000 (or as configured).

### 3. Setup frontend

```powershell
cd ../frontend
npm install
npm run dev
```
Frontend will start on port 5173 (Vite).

---

## 🗂️ Important npm scripts

**Backend:**
- `npm run dev` — start backend with nodemon (auto-reload)
- `npm start` — start backend with node

**Frontend:**
- `npm run dev` — start Vite dev server
- `npm run build` — build for production
- `npm run preview` — preview production build
- `npm run lint` — lint code

---

## 🏗️ Code Structure

**Backend:**
- `controllers/` — API logic (jobController, userController, companyController)
- `models/` — Mongoose schemas (User, Job, Company, Category)
- `routes/` — Express routes (jobRoutes, userRoutes, companyRoutes)
- `middleware/` — JWT, CORS, error handling
- `services/` — business logic (jobService, companyService)
- `utils/` — utility functions (token, validation)

**Frontend:**
- `components/` — UI components (Jobs, Company, Profile, Auth, Header, Footer)
- `hooks/` — custom React hooks (useJobs, useCompany, useForm, useApiRequester)
- `services/` — API requests (api.ts, jobService.tsx)
- `context/` — global contexts (Auth, Company)
- `styles/` — CSS files
- `interfaces/` — TypeScript interfaces (Job, Company, User)

---

## 🧪 Testing

- Use Postman or Thunder Client to test the API.
- For frontend — start the dev server and test in your browser.
- For production build — use `npm run build` and `npm run preview`.

---

## 🛡️ Security

- All protected routes use JWT middleware.
- Passwords are hashed with bcrypt.
- CORS is configured for frontend/backend communication.

---

## 🌐 Live Deployment

The frontend is deployed and publicly accessible at:

**Production URL:** [https://job-board-three-omega.vercel.app/](https://job-board-three-omega.vercel.app/)

You can visit the live site to explore all features and UI.

---

## 📋 Deployment

- **Frontend:** Vercel, Netlify, or other static hosting.
- **Backend:** Render.com, Heroku, or other Node.js hosting.
- **MongoDB:** MongoDB Atlas (cloud).

---

## 🛠️ Additional Information

- Use Postman or Thunder Client for API testing.
- For production, add CORS, rate limiting, and security best practices.
- For questions and suggestions — open an issue on GitHub.

---
