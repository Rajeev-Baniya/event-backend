import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
mongoose.connect(process.env.MONGODB_CLOUD_URL);

const connection = mongoose.connection;

connection.once("open", () => {
  console.log("MongodDB connection established successfully");
});
