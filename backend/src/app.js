require('dotenv').config();
const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors({
  origin: ['https://ap-project-1-a3e5.onrender.com', 'http://localhost:5174'],
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


module.exports = app;
