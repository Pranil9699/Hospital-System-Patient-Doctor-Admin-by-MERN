import express from "express";
import {
  adminLogin,
  getCounts,
  getLatestBookings,
  updateAppointmentStatus,
  getAllDoctors,
  addDoctor, getAppointmentsPerDoctor,changeAvailability,getHospitalEarningStats,getHospitalEarnings  // <-- ✅ import here
} from "../controllers/adminController.js";
// ✅ NEW ROUTE for Hospital Earnings
const router = express.Router();

router.post("/login", adminLogin);
router.get("/counts", getCounts);
router.get("/bookings", getLatestBookings);
router.put("/appointments/:appointmentId/status", updateAppointmentStatus);
router.get("/doctors", getAllDoctors);
router.post("/add-doctor", addDoctor);
// ✅ new route for chart
router.get("/appointments-per-doctor", getAppointmentsPerDoctor);
router.put("/doctor/:id/availability", changeAvailability);
router.get("/hospital-earning-stats", getHospitalEarningStats);
router.get("/hospital-earnings", getHospitalEarnings);
export default router;
