// 📄 allotmentRoutes.js
const express = require("express");
const router = express.Router();

const auth = require("../../../middleware/auth");

const {
    applyForRoom,
    myAllotment,
    adminApprove,
    getAllAllotments,
} = require("../controllers/allotmentController");

// STUDENT — apply for room
router.post("/apply/:roomId", auth, applyForRoom);

// STUDENT — view my allotment
router.get("/my", auth, myAllotment);

// ADMIN — approve a student allotment
router.post("/approve/:studentId", auth, adminApprove);

// ADMIN — get all allotments
router.get("/all", auth, getAllAllotments);

module.exports = router;
