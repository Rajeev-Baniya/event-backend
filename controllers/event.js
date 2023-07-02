import Event from "../models/Event.js";
import Venue from "../models/Venue.js";

export const createEvent = async (req, res) => {
  try {
    const theVenue = await Venue.findById(req.params.venueId);
    const event = new Event({ ...req.body, author: req.user._id });
    // console.log(theVenue);
    event.venue.venueId = theVenue._id;
    event.venue.venueName = theVenue.name;
    event.author.authorId = req.user._id;
    event.author.authorName = req.user.username;
    await event.save();
    const myVenue = await Venue.findByIdAndUpdate(event.venue.venueId, {
      $push: {
        unavailableDates: event.dates,
      },
    });
    myVenue.bookedCount = myVenue.bookedCount + 1;
    myVenue.save();
    return res.status(200).json({
      status: "success",
      data: event,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.stack,
    });
  }
};

export const updateEvent = async (req, res) => {
  try {
    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.eventid,
      { $set: req.body },
      { new: true }
    );
    return res.status(200).json({
      status: "success",
      data: updatedEvent,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.stack,
    });
  }
};

export const deleteEvent = async (req, res) => {
  try {
    const eventId = req.params.eventid;
    const MyEvent = await Event.findById(eventId);
    await Event.findByIdAndDelete(eventId);
    await Venue.findOneAndUpdate(
      { _id: MyEvent.venue.venueId },
      {
        $pull: {
          unavailableDates: { $in: MyEvent.dates },
        },
      },
      { new: true }
    );

    return res.status(200).json({
      status: "success",
      data: "Event deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({ status: "error", message: error.stack });
  }
};

export const getAllVenueEvents = async (req, res) => {
  try {
    const allEvents = await Event.find({ venue: req.params.venueid });
    if (!allEvents) {
      return res.status(404).json({
        status: "fail",
        message: "Events not found",
      });
    }
    return res.status(200).json({
      status: "success",
      data: allEvents,
    });
  } catch (error) {
    return res.status(500).json({ status: "error", message: error.stack });
  }
};

export const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.eventid);
    if (!event) {
      return res.status(404).json({
        status: "fail",
        message: "Events not found",
      });
    }
    return res.status(200).json({ status: "success", data: event });
  } catch (error) {
    return res.status(500).json({ status: "error", message: error.stack });
  }
};

export const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();
    return res.status(200).json({ status: "success", data: events });
  } catch (error) {
    return res.status(500).json({ status: "error", message: error.stack });
  }
};

export const getUsersEvents = async (req, res) => {
  try {
    const events = await Event.find({ "author.authorId": req.params.userid });
    return res.status(200).json({ status: "success", data: events });
  } catch (error) {
    return res.status(500).json({ status: "error", message: error.stack });
  }
};
