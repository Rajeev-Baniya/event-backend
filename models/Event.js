import mongoose from "mongoose";

const EventSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    venue: {
      venueId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Venue",
        required: true,
      },
      venueName: {
        type: String,
        required: true,
      },
    },
    author: {
      authorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      authorName: {
        type: String,
        required: true,
      },
    },

    // author: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "User",
    //   required: true,
    // },

    dates: {
      type: Date,
      required: true,
    },
    expectedPeople: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Event", EventSchema);
