require('dotenv').config();
const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors({
  origin: 'http://localhost:5174',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// IMPORT ALL MODULES
app.use("/auth", require("./modules/auth/routes/authRoutes"));
app.use("/rooms", require("./modules/rooms/routes/roomRoutes"));
app.use("/allotment", require("./modules/allotments/routes/allotmentRoutes"));
app.use("/admin", require("./modules/admin/routes/adminRoutes"));

// Handle preflight requests
app.use((req, res, next) => {
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Origin', 'http://localhost:5174');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    return res.sendStatus(200);
  }
  next();
});

app.get("/", (req, res) => {
  res.send("Hostel Backend Running 🚀");
});

module.exports = app;
