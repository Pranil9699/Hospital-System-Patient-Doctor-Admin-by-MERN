import express from "express";
import { bookAppointment, getAppointments,cancelAppointment } from "../controllers/appointmentController.js";

const router = express.Router();

router.post("/book", bookAppointment);
router.get("/", getAppointments);
router.delete("/:id", cancelAppointment);

export default router;
