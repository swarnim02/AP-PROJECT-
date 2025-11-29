const bcrypt = require("bcrypt");
const { PrismaClient } = require("../prisma/generated/prisma");
const prisma = new PrismaClient();

const { validateSignup, validateLogin } = require("./authValidation");
const { generateToken } = require("./tokenUtils");

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
  