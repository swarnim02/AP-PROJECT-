const express = require("express");
const router = express.Router();
const auth = require("../../../middleware/auth");
const { allUsers, allRooms, allAllotments } = require("../controllers/adminController");

// ADMIN ONLY ROUTES
router.get("/users", auth, allUsers);
router.get("/rooms", auth, allRooms);
router.get("/allotments", auth, allAllotments);

module.exports = router;
