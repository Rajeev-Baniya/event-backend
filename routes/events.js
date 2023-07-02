import express from "express";
import {
  createEvent,
  deleteEvent,
  getAllVenueEvents,
  getEventById,
  updateEvent,
  getUsersEvents,
  getAllEvents,
} from "../controllers/event.js";
import {
  verifyAdmin,
  verifyUser,
  auth,
  verifyOwner,
  verifyAuthor,
} from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/hi", (req, res) => {
  res.send("Hello from Events route");
});

router.post("/:venueId", auth, createEvent);

router.put("/:eventid", auth, verifyAuthor, updateEvent);

router.delete("/:eventid", auth, verifyAuthor, deleteEvent);

router.get("/venue/:venueid", auth, verifyOwner, getAllVenueEvents);

router.get("/allevents", auth, verifyAdmin, getAllEvents);

router.get("/:eventid", auth, getEventById);
router.get("/user/:userid", auth, getUsersEvents);

export default router;
