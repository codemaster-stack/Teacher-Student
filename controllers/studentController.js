const Student = require("../models/Student");

exports.viewProfile = async (req, res) => {
    try {
        const student = await Student.findOne({ user: req.user._id }).populate("user", "fullName email");
        if (!student) return res.status(404).json({ message: "Student not found" });

        res.status(200).json({ student });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
