import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    time: {
      type: String, // Store time as string (e.g., "10:00 AM")
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    image: {
      type: String
    },
    banner1: {
      type: String,
    },
    banner2: {
      type: String
    },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    attendees: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }],
    maxAttendees: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

const Event = mongoose.model('Event', eventSchema);

export default Event;