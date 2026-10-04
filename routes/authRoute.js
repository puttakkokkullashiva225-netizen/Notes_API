const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const { register, login, logout } = require("../controllers/authController");

// Page routes
router.get("/", (req, res) => {
  res.redirect("/login");
});

router.get("/register", (req, res) => {
  res.render("register");
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/dashboard", authMiddleware, (req, res) => {
  res.render("dashboard");
});

// Auth action routes
router.post("/register", register);

router.post("/login", login);

router.post("/logout", authMiddleware, logout);

module.exports = router;
