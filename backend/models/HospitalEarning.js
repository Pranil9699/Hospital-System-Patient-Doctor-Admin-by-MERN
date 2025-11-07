// models/HospitalEarning.js
import mongoose from "mongoose";

const hospitalEarningSchema = new mongoose.Schema({
  speciality: { type: String, required: true },
  amount: { type: Number, default: 0 },
  patientAges: { type: [Number], default: [] } // <-- updated
});

const HospitalEarning = mongoose.model("HospitalEarning", hospitalEarningSchema);
export default HospitalEarning;
