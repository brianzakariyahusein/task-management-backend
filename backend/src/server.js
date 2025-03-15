require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/database");


const app = express();
const PORT = process.env.PORT || 5000;

// Menghubungkan ke databse
connectDB();

// Middleware
app.use(express.json());
app.use(cors());

// Route sederhana
app.get("/", (req, res) => {
  res.send("Task Management API is running...");
});

// Menjalankan server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
