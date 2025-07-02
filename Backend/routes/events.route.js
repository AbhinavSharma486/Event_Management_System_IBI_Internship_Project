import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { addAttendeToEvent, createEvent, deleteEvent, updateEvent } from "../controllers/event.controller.js";

const router = express.Router();

router.post("/create-event", protectRoute, createEvent);

router.put("/updateEvent/:eventId", protectRoute, updateEvent);

router.delete("/deleteEvent/:eventId", protectRoute, deleteEvent);

router.post("/addAttendeeToEvent/:eventId", protectRoute, addAttendeToEvent);

export default router;
