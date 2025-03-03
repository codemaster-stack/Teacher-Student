const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config(); // Load environment variables
connectDB(); // Connect to MongoDB

const app = express();

app.use(express.json()); // Body parser middleware

// Routes
app.use("/api/auth", require("./routes/authRoutes")); // <-- Add this line
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/teacher", require("./routes/teacherRoutes"));
app.use("/api/student", require("./routes/studentRoutes"));

// Define Port and Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
