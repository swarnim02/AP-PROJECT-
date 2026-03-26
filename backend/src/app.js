require('dotenv').config();
const express = require("express");
const cors = require("cors");
const app = express();

const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5173',
  'http://localhost:5174',
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.some(o => origin.startsWith(o))) return callback(null, true);
    callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Cache-Control']
}));


app.use(express.json());

// Handle preflight requests FIRST
app.use((req, res, next) => {
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    return res.sendStatus(200);
  }
  next();
});

app.get("/", (req, res) => {
  res.send("Hostel Backend Running 🚀");
});

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.get("/direct-test", (req, res) => {
  res.json({ message: "Direct route working" });
});

// IMPORT ALL MODULES
console.log('Loading auth routes...');
const authRoutes = require("./modules/auth/routes/authRoutes");
app.use("/auth", authRoutes);
console.log('Auth routes loaded');

app.use("/rooms", require("./modules/rooms/routes/roomRoutes"));
app.use("/allotment", require("./modules/allotments/routes/allotmentRoutes"));
app.use("/admin", require("./modules/admin/routes/adminRoutes"));


// Keep-alive self-ping for Render free tier
if (process.env.NODE_ENV === 'production') {
  const https = require('https');
  setInterval(() => {
    https.get('https://ap-project-v67b.onrender.com/health').on('error', () => {});
  }, 4 * 60 * 1000);
}

module.exports = app;
