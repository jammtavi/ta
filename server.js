require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("MongoDB error:", err));

// Middleware
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
}));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use("/", require("./routes/auth"));

// Auth middleware
function requireLogin(req, res, next) {
  if (!req.session.userId) return res.redirect("/login.html");
  next();
}

// Protected route
app.get("/dashboard", requireLogin, (req, res) => {
  res.render("dashboard", { username: req.session.username });
});

app.listen(process.env.PORT, () =>
  console.log(`🚀 Server running: http://localhost:${process.env.PORT}`)
);
