import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import routes from "./routes/index.js";
import cors from "cors";

const app = express()

dotenv.config()

const currentEnv = process.env.NODE_ENV || 'development';
console.log(`Current environment: ${currentEnv}`);
dotenv.config({ path: `.env.${currentEnv}`, override: true });

app.use(express.json());

//To add passport and session management, you can uncomment the following lines and install the required packages (passport, express-session, passport-local, etc.):
// import passport from 'passport';
// import session from 'express-session';
// app.use(session({ secret: 'your_secret_key', resave: false, saveUninitialized: false }));
// app.use(passport.initialize());
// app.use(passport.session());

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://job-board-three-omega.vercel.app", // main domain
  ],
  credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'], 

}));

mongoose.connect(process.env.MONGO_URI, {

}).then(() => console.log('MongoDB connected!'))
.catch(err => console.error('MongoDB connection error:', err))

app.use('/api', routes)


app.use('/', (req, res) => {
  res.send('API is up and running!');
});



// app.use('/', (req, res) => {
//   return res.status(403).json({ error: 'Access to root is forbidden' });
// });
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`))