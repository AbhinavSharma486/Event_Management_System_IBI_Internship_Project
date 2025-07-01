import validator from "validator";
import User from "../models/User.model.js";
import cloudinary from "../lib/cloudinary.js";
import Event from '../models/Event.model.js';


export const createEvent = async (req, res) => {

  const { title, description, date, time, location, maxAttendees, image, banner1, banner2 } = req.body;

  try {
    if (!title || !description || !date || !time || !location || !image || !banner1 || !banner2) {
      return res.status(400).json({ success: false, message: "All Fields & images are required" });
    }

    // check if date format is valid (ISO 5601 like YYYY-MM-DD)
    if (!validator.isISO8601(date)) {
      return res.status(400).json({ success: false, message: "Invalid date format " });
    }

    // check if the event date is not in the past
    if (new Date(date) < new Date()) {
      return res.status(400).json({ success: false, message: "Event date must be in the future" });
    }

    // check if maxAttendees is a number
    if (maxAttendees && isNaN(maxAttendees)) {
      return res.status(400).json({ success: false, message: "Max Attendees must be a number" });
    }

    // <---- Upload images to cloudinary ---->

    const uploadImage = async (base64Image, name) => {
      if (!base64Image) {
        throw new Error(`${name} is required`);
      }

      const uploaded = await cloudinary.uploader.upload(base64Image);
      return uploaded.secure_url;
    };

    // upload all three required image
    const uploadedImage = await uploadImage(image, "Image");
    const uploadedBanner1 = await uploadImage(banner1, "Banner1");
    const uploadedBanner2 = await uploadImage(banner2, "Banner2");


    // <---- Create & save event ---->
    const event = new Event({
      title,
      description,
      date,
      time,
      location,
      image: uploadedImage,
      banner1: uploadedBanner1,
      banner2: uploadedBanner2,
      creator: req.user._id,
      maxAttendees: maxAttendees ? parseInt(maxAttendees, 10) : null
    });

    // save the event in mongodb
    await event.save();

    // update the user profile to include this created event
    await User.findByIdAndUpdate(req.user._id, {
      $push: { createdEvents: event._id }
    });

    // return success response with created event
    res.status(201).json({
      success: true,
      message: "Event created successfully",
      event
    });
  } catch (error) {
    console.log("Error in create event controller", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};