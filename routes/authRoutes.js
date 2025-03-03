const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// Add the register route
router.post("/register", authController.register);

// Existing login route
router.post("/login", authController.login);

module.exports = router;
