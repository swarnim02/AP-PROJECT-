const jwt = require("jsonwebtoken");

exports.generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      year: user.year
    },
    process.env.JWT_SECRET,
    { expiresIn: "8h" }
  );
};


