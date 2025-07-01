import express from "express";
import { checkAuth, deleteUser, login, logout, register, updateProfile } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.post("/logout", logout);

router.get("/check", protectRoute, checkAuth);

router.put("/update-profile", protectRoute, updateProfile);

router.delete("/delete/:userId", deleteUser);

export default router;