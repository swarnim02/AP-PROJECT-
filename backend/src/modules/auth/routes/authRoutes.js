const express = require("express");
const router = express.Router();
const { signup, login, getMyProfile, updateProfile, approveProfile, disapproveProfile, getPendingProfiles } = require("../controllers/authController");
const auth = require("../../../middleware/auth");

console.log('Auth routes file loaded');

router.get("/test", (req, res) => {
  res.json({ message: "Auth routes working" });
});

router.post("/signup", signup);
router.post("/login", login);
router.get("/my-profile", auth, getMyProfile);
router.put("/profile", auth, updateProfile);
router.post("/approve-profile/:userId", auth, approveProfile);
router.post("/disapprove-profile/:userId", auth, disapproveProfile);
router.get("/pending-profiles", auth, getPendingProfiles);

console.log('Auth routes configured');

module.exports = router;