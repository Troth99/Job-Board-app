import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import routes from "./routes/index.js";
import cors from "cors";
import http from "http"
import {Server} from "socket.io"




const app = express()

const server = http.createServer(app)

const io = new Server(server, {
  cors: {
      origin: [
    "http://localhost:5173",
    "https://job-board-three-omega.vercel.app", // main domain
  ],
      credentials: true

  }
})
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

io.on('connection', (socket) => {
  console.log('New client connected', socket.id)
})



// app.use('/', (req, res) => {
//   return res.status(403).json({ error: 'Access to root is forbidden' });
// });
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server is listening on port ${PORT}`))