import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import usersRoutes from "./routes/users.js";
import venueRoutes from "./routes/venue.js";
import eventRoutes from "./routes/events.js";

const app = express();
dotenv.config();
const PORT = process.env.PORT || 5000;

import "./database/mongoose.js";

// Middlewares
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/venue", venueRoutes);
app.use("/api/events", eventRoutes);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

app.listen(PORT, () => {
  console.log(`Server has started on port ${PORT}`);
});
