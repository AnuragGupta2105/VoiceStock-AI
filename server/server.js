const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const shoppingRoutes = require("./routes/shoppingRoutes");
const protect = require("./middleware/authMiddleware");

dotenv.config();

// ===============================
// Connect MongoDB
// ===============================

connectDB();

const app = express();

// ===============================
// Middlewares
// ===============================

// Allow requests from Vercel, localhost, etc.
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ===============================
// Root Route
// ===============================

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "🚀 VoiceStock AI Backend Running",
  });
});

// ===============================
// API Routes
// ===============================

app.use("/api/auth", authRoutes);
app.use("/api/shopping", shoppingRoutes);

// ===============================
// Protected Test Route
// ===============================

app.get("/api/profile", protect, (req, res) => {
  res.status(200).json({
    success: true,
    message: "Authorized",
    user: req.user,
  });
});

// ===============================
// 404 Handler
// ===============================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found",
  });
});

// ===============================
// Global Error Handler
// ===============================

app.use((err, req, res, next) => {
  console.error(err);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

// ===============================
// Start Server
// ===============================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});