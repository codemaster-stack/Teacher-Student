const express = require("express");
const router = express.Router();
const teacherController = require("../controllers/teacherController");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

// Protect all teacher routes with authentication and role check
router.use(authMiddleware, roleMiddleware(["teacher"]));

router.get("/view-students", teacherController.viewStudents);
router.put("/update-student/:id", teacherController.updateStudent); // ✅ Now this function exists

module.exports = router;
