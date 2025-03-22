const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Signup
router.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = await User.create({ username, email, password });
    req.session.userId = user._id;
    req.session.username = user.username;
    res.redirect("/dashboard");
  } catch (err) {
    res.send("Signup failed: " + err.message);
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user || !(await user.comparePassword(password))) {
      return res.send("Invalid credentials.");
    }
    req.session.userId = user._id;
    req.session.username = user.username;
    res.redirect("/dashboard");
  } catch (err) {
    res.send("Login error: " + err.message);
  }
});

// Logout
router.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/login.html");
  });
});

module.exports = router;
