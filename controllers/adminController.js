const User = require("../models/User");
const Teacher = require("../models/Teacher");
const Student = require("../models/Student");
const bcryptjs = require("bcryptjs");

// Add Teacher
exports.addTeacher = async (req, res) => {
    try {
        const { fullName, email, password, subject } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "User already exists" });

        const hashedPassword = await bcryptjs.hash(password, 10);
        const newUser = await User.create({ fullName, email, password: hashedPassword, role: "teacher" });
        const newTeacher = await Teacher.create({ user: newUser._id, subject });

        res.status(201).json({ message: "Teacher added successfully", teacher: newTeacher });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Add Student
exports.addStudent = async (req, res) => {
    try {
        const { fullName, email, password, grade, teacherId } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "User already exists" });

        const hashedPassword = await bcryptjs.hash(password, 10);
        const newUser = await User.create({ fullName, email, password: hashedPassword, role: "student" });
        const newStudent = await Student.create({ user: newUser._id, grade, teacher: teacherId });

        res.status(201).json({ message: "Student added successfully", student: newStudent });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// View All Teachers
exports.viewTeachers = async (req, res) => {
    try {
        const teachers = await Teacher.find().populate("user", "fullName email");
        res.status(200).json({ teachers });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// View All Students
exports.viewStudents = async (req, res) => {
    try {
        const students = await Student.find().populate("user", "fullName email grade teacher");
        res.status(200).json({ students });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update Teacher
exports.updateTeacher = async (req, res) => {
    try {
        const { id } = req.params;
        const { fullName, email, subject } = req.body;

        const teacher = await Teacher.findById(id);
        if (!teacher) return res.status(404).json({ message: "Teacher not found" });

        await User.findByIdAndUpdate(teacher.user, { fullName, email });
        await Teacher.findByIdAndUpdate(id, { subject });

        res.status(200).json({ message: "Teacher updated successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update Student
exports.updateStudent = async (req, res) => {
    try {
        const { id } = req.params;
        const { fullName, email, grade, teacherId } = req.body;

        const student = await Student.findById(id);
        if (!student) return res.status(404).json({ message: "Student not found" });

        await User.findByIdAndUpdate(student.user, { fullName, email });
        await Student.findByIdAndUpdate(id, { grade, teacher: teacherId });

        res.status(200).json({ message: "Student updated successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete Teacher
exports.deleteTeacher = async (req, res) => {
    try {
        const { id } = req.params;

        const teacher = await Teacher.findById(id);
        if (!teacher) return res.status(404).json({ message: "Teacher not found" });

        await User.findByIdAndDelete(teacher.user);
        await Teacher.findByIdAndDelete(id);

        res.status(200).json({ message: "Teacher deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete Student
exports.deleteStudent = async (req, res) => {
    try {
        const { id } = req.params;

        const student = await Student.findById(id);
        if (!student) return res.status(404).json({ message: "Student not found" });

        await User.findByIdAndDelete(student.user);
        await Student.findByIdAndDelete(id);

        res.status(200).json({ message: "Student deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
