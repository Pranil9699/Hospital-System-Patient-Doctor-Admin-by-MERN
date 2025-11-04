import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
  name: String,
  speciality: String,
  degree: String,
  experience: String,
  about: String,
  fees: Number,
  address: {
    line1: String,
    line2: String
  },
  image: String
});

const Doctor = mongoose.model("Doctor", doctorSchema);
export default Doctor;
