import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import routes from "./routes/index.js";
import cors from "cors";




const app = express()

dotenv.config()
app.use(express.json());


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