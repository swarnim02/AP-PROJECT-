const express = require("express");
const app = express();

app.use(express.json());

// Test basic route
app.get("/", (req, res) => {
  res.send("Hostel Backend Running 🚀");
});

// Test auth routes
try {
  app.use("/auth", require("./auth-module/authRoutes"));
  console.log("✅ Auth routes loaded");
} catch (err) {
  console.log("❌ Auth routes error:", err.message);
}

const PORT = 5002;
app.listen(PORT, () => {
  console.log(`Test server running on port ${PORT}`);
});