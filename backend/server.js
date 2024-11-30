const path = require("path");
const express = require("express");
const cors = require("cors");
require("dotenv").config();
require("./db/conn");
const userRouter = require("./routes/userRoutes");
const driverRouter = require("./routes/driverRoutes");
const appointRouter = require("./routes/bookingRoutes");
const notificationRouter = require("./routes/notificationRouter");

const app = express();
const port = process.env.PORT || 5000;

// Define CORS options
const corsOptions = {
  origin: "https://heyyyyautoooo.onrender.com/",
  credentials: true,
};

// Use CORS with options
app.use(cors(corsOptions));

app.use(express.json());
app.use("/api/user", userRouter);
app.use("/api/driver", driverRouter);
app.use("/api/booking", appointRouter);
app.use("/api/notification", notificationRouter);

// Serve static files
app.use(express.static(path.join(__dirname, "./client/build")));
app.get("*", (_, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build/index.html"));
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
