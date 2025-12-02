require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT;
const cors = require('cors');
const HOST = '0.0.0.0';

const authRoutes = require('./routes/auth');
const jobRoutes = require('./routes/jobs');
const profileRoutes = require('./routes/profile');
const applicationRoutes = require('./routes/application');

const allowedOrigins = [
  "https://hire-hub-livid.vercel.app",
  "http://localhost:5173",
  "http://localhost:3002"
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ⭐ Express 5 fix → wildcard "*" is not allowed
app.options(/.*/, cors());

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/applications", applicationRoutes);

app.listen(port, HOST, () => {
  console.log(`Server is running on port ${port}`);
});
