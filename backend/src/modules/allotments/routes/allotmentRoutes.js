const express = require("express");
const router = express.Router();

const auth = require("../../../middleware/auth");

const {
   applyForRoom,
   myAllotment,
   adminApprove,
   adminReject,
   getAllAllotments,
   randomAllocate,
} = require("../controllers/allotmentController");

// STUDENT — apply for room
router.post("/apply/:roomId", auth, applyForRoom);

// STUDENT — random allocation for 1st year
router.post("/random-allocate", auth, randomAllocate);

// STUDENT — view my allotment
router.get("/my", auth, myAllotment);

// ADMIN — approve allotment
router.post("/approve/:allotmentId", auth, adminApprove);

// ADMIN — reject allotment
router.post("/reject/:allotmentId", auth, adminReject);

// ADMIN — get all allotments
router.get("/all", auth, getAllAllotments);

module.exports = router;
