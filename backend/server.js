const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const orderRoutes = require("./routes/orders");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ CORS (only once, clean config)
app.use(cors({
  origin: [
    "http://localhost:3000",                 // local frontend
    "fashion-flick-frontend-6etm.vercel.app"  // deployed frontend (no slash)
  ],
  credentials: true,
}));

// Middleware
app.use(express.json());

// Routes
app.use("/api/orders", orderRoutes);

// ✅ MongoDB Connection (UPDATED - no deprecated options)
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