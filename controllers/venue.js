import Venue from "../models/Venue.js";

export const createVenue = async (req, res) => {
  const venue = new Venue(req.body);
  try {
    const savedVenue = await venue.save();
    return res.status(200).json({
      status: "success",
      data: savedVenue,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.stack,
    });
  }
};

export const updateVenue = async (req, res) => {
  try {
    const updatedVenue = await Venue.findByIdAndUpdate(
      req.params.venueid,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );
    return res.status(200).json({
      status: "success",
      data: updatedVenue,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.stack,
    });
  }
};

export const deleteVenue = async (req, res) => {
  try {
    await Venue.findByIdAndRemove(req.params.venueid);
    res.status(200).json({
      status: "success",
      data: "Venue deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.stack,
    });
  }
};

export const getAllVenue = async (req, res) => {
  const { price, people, count, limit, ...others } = req.query;
  try {
    const allVenue = await Venue.find({
      ...others,
      pricePerDay: { $lt: price || 9 * 1000000 },
      maxCapacity: { $gt: people || 100 },
    })
      .limit(limit)
      .sort(count ? { bookedCount: -1 } : {_id: -1});
    // const allVenue = await Venue.find();
    return res.status(200).json({
      status: "success",
      data: allVenue,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.stack,
    });
  }
};

export const getVenueById = async (req, res) => {
  try {
    const venue = await Venue.findById(req.params.venueid);
    return res.status(200).json({
      status: "success",
      data: venue,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.stack,
    });
  }
};

export const availabityCheck = async (req, res) => {
  try {
    const venue = await Venue.findById(req.params.venueid);
    const docs = await Venue.find({
      unavailableDates: { $in: req.query.date },
    });
    if (docs.length == 0) {
      return res.status(200).json({
        status: "success",
        data: { venue },
        message: "Venue is available, you can start booking",
      });
    } else {
      return res.status(400).json({
        status: "fail",
        message: "Not available",
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.stack,
    });
  }
};
