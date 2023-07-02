import express from "express";
import { register, login, logout } from "../controllers/auth.js";
import { verifyAdmin, verifyUser, auth } from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/hi", (req, res) => {
  res.send("Hello from auth route");
});

router.post("/register", register);
router.post("/login", login);
router.post("/logout", auth, logout);

export default router;
