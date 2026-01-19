// Load environment variables FIRST
require("dotenv").config();

const express = require("express");
const connectDB = require("./src/config/db");

const app = express();

// Debug: check if env is loading
console.log("MONGO_URI:", process.env.MONGO_URI);

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use("/api/auth", require("./src/routes/authRoutes"));
const auth = require("./src/middleware/auth");

app.get("/api/protected", auth, (req, res) => {
  res.json({
    message: "You accessed a protected route",
    user: req.user
  });
});


// Test route
app.get("/", (req, res) => {
  res.send("E-commerce API running");
});
app.use("/api/products", require("./src/routes/productRoutes"));
app.use("/api/cart", require("./src/routes/cartRoutes"));
app.use("/api/orders", require("./src/routes/orderRoutes"));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
