const bcrypt = require("bcrypt");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const { validateSignup, validateLogin } = require("../validation/authValidation");
const { generateToken } = require("../utils/tokenUtils");

// SIGNUP
exports.signup = async (req, res) => {
    try {
      const { name, email, password, college, year, role } = req.body;
  
      // Validation
      const err = validateSignup(name, email, password, college, year);
      if (err) return res.status(400).json({ message: err });
  
      // Check user exists
      const exists = await prisma.user.findUnique({ where: { email } });
      if (exists) return res.status(400).json({ message: "Email already exists" });
  
      // Create user
      const hashed = await bcrypt.hash(password, 10);
  
      const user = await prisma.user.create({
        data: {
          name,
          email,
          password: hashed,
          college,
          year,
          role: role || "student",
        }
      });
  
      res.json({ message: "Signup successful", user });
  
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error" });
    }
  };
  
// LOGIN
exports.login = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const err = validateLogin(email, password);
      if (err) return res.status(400).json({ message: err });
  
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) return res.status(400).json({ message: "User not found" });
  
      const valid = await bcrypt.compare(password, user.password);
      if (!valid) return res.status(400).json({ message: "Invalid password" });
  
      const token = generateToken(user);
  
      res.json({ message: "Login successful", token });
  
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: err });
    }
  };

const updateProfile = async (req, res) => {
  try {
    const { name, college, year } = req.body;
    const userId = req.user.id;
    const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: { name, college, year: parseInt(year) },
    select: { id: true, name: true, email: true, college: true, year: true, role: true }
    });
    res.json({
    success: true,
    message: 'Profile updated successfully',
    user: updatedUser
    });
}catch (error) {
    res.status(500).json({
    success: false,
    message: 'Error updating profile'
    });
    }
    };
    
module.exports = { signup, login, updateProfile };