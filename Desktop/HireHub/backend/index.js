require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT;
const cors = require('cors');
const HOST = '0.0.0.0'

const authRoutes = require('./routes/auth');
const jobRoutes = require('./routes/jobs');

app.use(express.json());
const allowedOrigins = [
  "https://hire-hub.vercel.app",
  "http://localhost:5173",
  "http://localhost:3000"
]

app.use(cors({
  origin: allowedOrigins, // Set the origin to the allowed list
  credentials: true
}))

// ADD THIS 👇
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);

app.listen(port,HOST, () => {
  console.log(`Server is running on port ${port}`);
});