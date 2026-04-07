const express = require("express");
const cors=require("cors");
const cookieParser = require("cookie-parser");
const app = express();


const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const logger = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");

// JSON middleware
app.use(
  cors({
    origin: "http://localhost:5173", // or whatever port your React app runs
    credentials: true, // allows cookies to be sent
  })
);
app.use(express.json());
app.use(cookieParser());

// Logger middleware
app.use(logger);

// Routes
app.use("/", userRoutes);
app.use("/", authRoutes);

// Error handling middleware (must be after routes)
app.use(errorHandler);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});