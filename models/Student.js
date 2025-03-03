const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    teacher: { type: mongoose.Schema.Types.ObjectId, ref: "Teacher", required: true },
    grade: { type: String, required: true }
});

module.exports = mongoose.model("Student", studentSchema);
