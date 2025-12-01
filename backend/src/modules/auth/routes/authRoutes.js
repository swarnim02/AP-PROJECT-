const express = require("express");
const router = express.Router();
const { signup, login } = require("../controllers/authController");

router.post("/signup", signup);
router.post("/login", login);
router.put('/profile', auth, updateProfile);

module.exports = router;
