const Student = require("../models/Student");

// ✅ Define viewStudents function before exporting it
const viewStudents = async (req, res) => {
    try {
        const students = await Student.find({ teacher: req.user._id }).populate("user", "fullName email");
        res.status(200).json({ students });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ✅ Define updateStudent function
const updateStudent = async (req, res) => {
    try {
        const { id } = req.params;
        const { fullName, grade } = req.body;

        // Find and update the student
        const updatedStudent = await Student.findByIdAndUpdate(id, { fullName, grade }, { new: true });

        if (!updatedStudent) {
            return res.status(404).json({ message: "Student not found" });
        }

        res.status(200).json({ message: "Student updated successfully", student: updatedStudent });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ✅ Properly export functions
module.exports = { viewStudents, updateStudent };
