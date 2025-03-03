const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

// Protect all admin routes with authentication and admin role check
router.use(authMiddleware, roleMiddleware(["admin"]));

router.post("/add-teacher", adminController.addTeacher);
router.post("/add-student", adminController.addStudent);
router.get("/view-teachers", adminController.viewTeachers);
router.get("/view-students", adminController.viewStudents);
router.put("/update-teacher/:id", adminController.updateTeacher);
router.put("/update-student/:id", adminController.updateStudent);
router.delete("/delete-teacher/:id", adminController.deleteTeacher);
router.delete("/delete-student/:id", adminController.deleteStudent);

module.exports = router;  // ✅ Correct export statement
