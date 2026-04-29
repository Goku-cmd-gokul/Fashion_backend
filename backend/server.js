const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const orderRoutes = require("./routes/orders");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

/**
 * ✅ CORS Configuration (FIXED)
 */
const allowedOrigins = [
  "http://localhost:3000",
  "https://fashion-flick-frontend-6etm.vercel.app"
];

app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like Postman)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

/**
 * ✅ Middleware
 */
app.use(express.json());

/**
 * ✅ Routes
 */
app.use("/api/orders", orderRoutes);

/**
 * ✅ Health check route (optional but useful)
 */
app.get("/", (req, res) => {
  res.send("API is running...");
});

/**
 * ✅ MongoDB Connection
 */
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });

  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
  });