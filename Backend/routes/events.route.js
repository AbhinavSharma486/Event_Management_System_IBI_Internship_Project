import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { createEvent, updateEvent } from "../controllers/event.controller.js";

const router = express.Router();

router.post("/create-event", protectRoute, createEvent);

router.put("/updateEvent/:eventId", protectRoute, updateEvent);

export default router;
