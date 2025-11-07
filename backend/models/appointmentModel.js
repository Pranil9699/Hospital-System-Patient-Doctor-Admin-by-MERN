import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  userName: { type: String },
  email: { type: String },
  doctorId: { type: String, required: true },
  doctorName: { type: String },
  speciality: { type: String },
  date: { type: String, required: true },
  time: { type: String, required: true },
  status: {
    type: String,
    enum: ["NOT_VERIFIED", "VERIFIED", "CANCELLED"],
    default: "NOT_VERIFIED",
  },
});


const Appointment = mongoose.model("Appointment", appointmentSchema);
export default Appointment;
