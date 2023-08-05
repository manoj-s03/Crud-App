// backend/index.js
const express = require("express");
const cors = require("cors");
const apiRouter = require("./routes/api");
// Database Connection
const mongoose = require("mongoose");

const dbURI = "mongodb://127.0.0.1:27017/Product";

mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
});

mongoose.connection.on("error", (err) => {
  console.error("Error connecting to MongoDB:", err.message);
});

mongoose.connection.on("disconnected", () => {
  console.log("Disconnected from MongoDB");
});

process.on("SIGINT", async () => {
  await mongoose.connection.close();
  process.exit(0);
});

module.exports = mongoose.connection;
// Port number
const app = express();
const PORT = 5000;
// Middleware
app.use(cors());
app.use(express.json());
// API Routes
app.use("/api", apiRouter);
/// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
