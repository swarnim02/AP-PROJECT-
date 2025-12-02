const express = require("express");
const router = express.Router();
const auth = require("../../../middleware/auth");
const { allUsers, allRooms, allAllotments, getDashboardStats } = require("../controllers/adminController");

// ADMIN ONLY ROUTES
router.get("/users", auth, allUsers);
router.get("/rooms", auth, allRooms);
router.get("/allotments", auth, allAllotments);
router.get("/dashboard-stats", auth, getDashboardStats);

module.exports = router;
