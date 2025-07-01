import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { createEvent } from "../controllers/event.controller.js";

const router = express.Router();

router.post("/create-event", protectRoute, createEvent);

export default router;
