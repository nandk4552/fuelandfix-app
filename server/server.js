const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const morgan = require("morgan");
const colors = require("colors");
const connectDB = require("./config/db");

// dot env
dotenv.config();

// mongoose config
connectDB();

// rest obj
const app = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// routes
app.get("/", (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Welcome to Full Stack React Native App",
  });
});

// ROUTES with version 1
app.use("/api/v1/auth", require("./routes/user.routes"));
app.use("/api/v1/order", require("./routes/order.routes"));
// PORT
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`.yellow.bold);
});
