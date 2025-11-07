import express from "express";
import { registerUser, loginUser,updateProfile,getUserAppointments } from "../controllers/userController.js";

const router = express.Router();
router.put("/update-profile", updateProfile);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/appointments/:userId", getUserAppointments);

export default router;
