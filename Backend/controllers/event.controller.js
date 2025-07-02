import validator from "validator";
import cloudinary from "../lib/cloudinary.js";
import User from "../models/User.model.js";
import Event from '../models/Event.model.js';

// Define commonly used populate configuration for cleaner code reuse
const populateFields = [
  { path: 'creator', select: 'name email' },
  { path: 'attendees.user', select: 'name email' }
];

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

export const updateEvent = async (req, res) => {
  const { title, description, date, time, location, maxAttendees, image, banner1, banner2 } = req.body;

  try {
    // Fetch the event to update
    const event = await Event.findById(req.params.eventId);
    console.log(event);

    if (!event) {
      return res.status(404).json({ success: false, message: "Event not found" });
    }

    // check permission : only the creator can update the event
    if (event.creator.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: "Not Authorized to update this event" });
    }

    // Validate fields only if they are provided
    if (date && !validator.isISO8601(date)) {
      return res.staus(400).json({ success: false, message: "Invalid date format" });
    }

    if (date && new Date(date) < new Date()) {
      return res.status(400).json({ success: false, message: 'Event date must be in the future' });
    }

    if (maxAttendees && isNaN(maxAttendees)) {
      return res.status(400).json({ success: false, message: "Max Attendees must be a number" });
    }

    // Helper function for image upload
    const uploadImage = async (base64Image, name) => {
      if (!base64Image) return null; // only upload if new image is provided

      const uploaded = await cloudinary.uploader.upload(base64Image);
      return uploaded.secure_url;
    };

    // Upload new images if provided
    const uploadedImage = image ? await uploadImage(image, "Image") : null;
    const uploadedBanner1 = banner1 ? await uploadImage(banner1, "Banner1") : null;
    const uploadedBanner2 = banner2 ? await uploadImage(banner2, "Banner2") : null;

    // Prepare updated fields 
    const updatedFields = {
      ...(title && { title }),
      ...(description && { description }),
      ...(date && { date }),
      ...(time && { time }),
      ...(location && { location }),
      ...(uploadedImage && { image: uploadedImage }),
      ...(uploadedBanner1 && { banner1: uploadedBanner1 }),
      ...(uploadedBanner2 && { banner2: uploadedBanner2 }),
      ...(maxAttendees !== undefined && { maxAttendees: parseInt(maxAttendees, 10) })
    };

    // prevent empty updates 
    if (Object.keys(updatedFields).length === 0) {
      return res.status(400).json({ success: false, message: "No update fields provided" });
    }

    // update and populate event
    const updatedEvent = await Event.findByIdAndUpdate(req.params.eventId, updatedFields, {
      new: true
    }).populate(populateFields);

    return res.status(200).json({
      success: true,
      message: "Event updated successfully",
      event: updatedEvent
    });
  } catch (error) {
    console.error('Error in update event controller', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

export const deleteEvent = async (req, res) => {
  try {
    // fetch the event by id 
    const event = await Event.findById(req.params.eventId);

    // check if the event exists 
    if (!event) {
      return res.status(404).json({ success: false, message: "Event not found" });
    }

    // check if the logged in user is the creator 
    if (event.creator.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: "Not authorized to delete this event" });
    }

    // delete the event from db 
    await Event.findByIdAndDelete(req.params.eventId);

    // remove refrence from creator & attendees
    await User.findByIdAndUpdate(req.user._id, {
      $pull: { createdEvents: req.params.eventId }
    });

    await User.updateMany(
      { attendingEvents: req.params.eventId },
      { $pull: { attendingEvents: req.params.eventId } }
    );

    return res.status(200).json({
      success: true,
      message: "Event deleted successfully"
    });
  } catch (error) {
    console.error('Error in delete event controller', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

export const addAttendeToEvent = async (req, res) => {
  const { email } = req.body;

  try {
    // validate email
    if (!email) {
      return res.status(400).json({ success: false, message: "Attendee email is required" });
    }

    // find event 
    const event = await Event.findById(req.params.eventId);

    if (!event) {
      return res.status(404).json({ success: false, message: "Event not found" });
    }

    // only the creator can add attendees 
    if (event.creator.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: "Not authorized to add attendees" });
    }

    // find attendee by email
    const attendeeUser = await User.findOne({ email });

    if (!attendeeUser) {
      return res.status(404).json({ success: false, message: "User with this email not found" });
    }

    // Prevent creator from adding themselves
    if (attendeeUser._id.toString() === req.user._id.toString()) {
      return res.status(400).json({ success: false, message: 'You cannot add yourself as an attendee to your own event' });
    }

    // check if the user is already an attendee
    const isAttending = event.attendees.some(
      attendee => attendee.user.toString() === attendeeUser._id.toString()
    );

    if (isAttending) {
      return res.status(400).json({ success: false, message: "User is already attending this event" });
    }

    // check if event is full 
    if (event.maxAttendees && event.attendees.length >= event.maxAttendees) {
      return res.status(400).json({ success: false, message: "Event is full" });
    }

    // add attendee to event
    event.attendees.push(attendeeUser._id);

    await event.save();

    // add event to user's attending list 
    await User.findByIdAndUpdate(attendeeUser._id, {
      $addToSet: { eventAttendees: event._id }
    });

    const updatedEvent = await Event.findById(event._id).populate(populateFields);

    return res.status(200).json({
      success: true,
      message: `User ${email} successfully added to event`,
      event: updatedEvent
    });
  } catch (error) {
    console.error('Error in add attendee to event controller', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};