function validateSignup(name, email, password, college, year) {
    if (!name || !email || !password || !college || !year) {
      return "All fields (name, email, password, college, year) are required.";
    }
    if (password.length < 6) return "Password must be at least 6 characters.";
    if (year < 1 || year > 4) return "Year must be between 1 and 4.";
    return null;
  }

  function validateLogin(email, password) {
    if (!email || !password) {
      return "Email and password required.";
    }
    return null;
  }

module.exports = { validateSignup, validateLogin };
  