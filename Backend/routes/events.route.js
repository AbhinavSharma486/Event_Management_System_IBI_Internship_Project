import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { addAttendeToEvent, createEvent, deleteEvent, getMyEvents, leaveEvent, removeAttendee, updateEvent } from "../controllers/event.controller.js";

const router = express.Router();

router.get("/my-events", protectRoute, getMyEvents);

router.post("/create-event", protectRoute, createEvent);

router.put("/updateEvent/:eventId", protectRoute, updateEvent);

router.delete("/deleteEvent/:eventId", protectRoute, deleteEvent);

router.post("/addAttendeeToEvent/:eventId", protectRoute, addAttendeToEvent);

router.post("/leaveEvent/:eventId", protectRoute, leaveEvent);

router.delete("/:eventId/removeAttendee/:userId", protectRoute, removeAttendee);

export default router;
