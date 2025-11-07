import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  phone: { type: String, default: "" },
  gender: { type: String, default: "" },
  dob: { type: String, default: "" },
  image: { type: String, default: "" },
  address: {
    line1: { type: String, default: "" },
    line2: { type: String, default: "" },
  },
});

const User = mongoose.model("User", userSchema);
export default User;
