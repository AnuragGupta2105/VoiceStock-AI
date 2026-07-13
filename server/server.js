const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const shoppingRoutes = require("./routes/shoppingRoutes");

const protect = require("./middleware/authMiddleware");

dotenv.config();

// ==========================
// Connect Database
// ==========================

connectDB();

const app = express();

// ==========================
// Middlewares
// ==========================

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://voice-stock-ai.vercel.app",
    ],
    credentials: true,
  })
);
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// ==========================
// Home Route
// ==========================

app.get("/", (req, res) => {

  res.json({

    success: true,

    message: "🚀 VoiceStock AI Backend Running",

  });

});

// ==========================
// API Routes
// ==========================

app.use("/api/auth", authRoutes);

app.use("/api/shopping", shoppingRoutes);

// ==========================
// Test Protected Route
// ==========================

app.get(

  "/api/profile",

  protect,

  async (req, res) => {

    res.json({

      success: true,

      message: "Authorized",

      user: req.user,

    });

  }

);

// ==========================
// 404
// ==========================

app.use((req, res) => {

  res.status(404).json({

    success: false,

    message: "Route Not Found",

  });

});

// ==========================
// Global Error Handler
// ==========================

app.use((err, req, res, next) => {

  console.error(err);

  res.status(500).json({

    success: false,

    message: "Internal Server Error",

  });

});

// ==========================
// Start Server
// ==========================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {

  console.log(
    `🚀 Server running on http://localhost:${PORT}`
  );

});