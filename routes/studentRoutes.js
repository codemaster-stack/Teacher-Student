const express = require("express");
const router = express.Router();
const studentController = require("../controllers/studentController");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

// Protect all student routes
router.use(authMiddleware, roleMiddleware(["student"]));

router.get("/profile", studentController.viewProfile);

module.exports = router;
