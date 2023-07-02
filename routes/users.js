import express from "express";

import {
  getAllUsers,
  deleteUser,
  getUser,
  updateUser,
} from "../controllers/user.js";

import { verifyAdmin, verifyUser, auth } from "../middleware/verifyToken.js";
const router = express.Router();

router.get("/hi", (req, res) => {
  res.send("Hello from user route");
});

router.get("/allUsers", auth, verifyAdmin, getAllUsers);

router.get("/getUser/:id", getUser);

router.delete("/:id", auth, verifyUser, deleteUser);

router.put("/updateUser/:id", auth, verifyUser, updateUser);

export default router;
