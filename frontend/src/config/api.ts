export const API_BASE =
  typeof window !== "undefined" && window.location.hostname === "localhost"
    ? "http://localhost:5000/api"  
    : "https://job-board-backend-7gfd.onrender.com/api";  

// Must match the account created by `npm run seed:demo-user` in the backend.
export const DEMO_CREDENTIALS = {
  email: import.meta.env.VITE_DEMO_EMAIL || "demo@jobboard.com",
  password: import.meta.env.VITE_DEMO_PASSWORD || "Demo12345!",
};