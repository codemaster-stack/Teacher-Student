const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    subject: { type: String, required: true },
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }] // Reference students
});

module.exports = mongoose.model("Teacher", teacherSchema);
