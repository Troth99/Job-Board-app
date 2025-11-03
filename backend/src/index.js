import express from "express";
import mongoose from "mongoose";
import 'dotenv/config'
import routes from "./routes/index.js";



const app = express()

app.use(express.json());


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