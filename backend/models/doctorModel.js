import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  speciality: String,
  degree: String,
  experience: String,
  about: String,
  fees: Number,
  address: {
    line1: String,
    line2: String,
  },
  image: String,
  available: {
    type: String,
    enum: ["YES", "NO"],
    default: "YES",
  },
   earning: {
    type: Number,
    default: 0, // total amount doctor has earned so far
  },
});

const Doctor = mongoose.model("Doctor", doctorSchema);
export default Doctor;
