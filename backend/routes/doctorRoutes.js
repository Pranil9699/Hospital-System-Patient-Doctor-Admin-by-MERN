import express from "express";
import {
  doctorLogin,
  getDoctorDashboardStats,
  getAllPatients,
  updateBookingStatus,
  getDoctorProfile,
  updateDoctorProfile,getDoctorAppointments
} from "../controllers/doctorController.js";
import { updateAppointmentStatus } from "../controllers/adminController.js";

const router = express.Router();

router.post("/login", doctorLogin);

router.get("/dashboard-stats/:doctorId", getDoctorDashboardStats);
router.get("/patients/:doctorId", getAllPatients);
router.put("/appointments/:id/status", updateBookingStatus);
router.get("/appointments/:doctorId", getDoctorAppointments);
router.get("/profile/:doctorId", getDoctorProfile);
router.put("/profile/:doctorId", updateDoctorProfile);
router.put("/appointment/update-status/:appointmentId", updateAppointmentStatus);

export default router;
