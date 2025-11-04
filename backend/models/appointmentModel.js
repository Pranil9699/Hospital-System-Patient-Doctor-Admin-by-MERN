import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
  userId: String,
  doctorId: String,
  date: String,
  time: String,
  status: { type: String, default: "Pending" }
});

const Appointment = mongoose.model("Appointment", appointmentSchema);
export default Appointment;
