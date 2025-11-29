require('dotenv').config();
const express = require("express");
const authMiddleware = require("../middleware");
const app = express();

app.use(express.json());

// IMPORT ALL MODULES
app.use("/auth", require("../auth-module/authRoutes"));
app.use("/rooms", require("../room-module/roomRoutes"));
app.use("/allotment", require("../allotment-module/allotmentRoutes"));
app.use("/admin", require("./adminRoutes"));

app.get("/", (req, res) => {
  res.send("Hostel Backend Running 🚀");
});

module.exports = app;
