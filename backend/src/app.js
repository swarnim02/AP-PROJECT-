require('dotenv').config();
const express = require("express");
const app = express();

app.use(express.json());

// IMPORT ALL MODULES
app.use("/auth", require("./modules/auth/routes/authRoutes"));
app.use("/rooms", require("./modules/rooms/routes/roomRoutes"));
app.use("/allotment", require("./modules/allotments/routes/allotmentRoutes"));
app.use("/admin", require("./modules/admin/routes/adminRoutes"));

app.get("/", (req, res) => {
  res.send("Hostel Backend Running 🚀");
});

module.exports = app;
