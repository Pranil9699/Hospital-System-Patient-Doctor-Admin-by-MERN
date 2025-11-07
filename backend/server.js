import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
// import doctorRoutes from "./routes/doctorRoutes.js";
import appointmentRoutes from "./routes/appointmentRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import doctorRoutes from "./routes/doctorRoutes.js";
import Admin from "./models/adminModel.js";

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose.connect("mongodb+srv://tushar:zVjhBqAMLxoSilfs@cluster0.igxh4ev.mongodb.net/")
.then(() => console.log("✅ MongoDB Connected Successfully"))
.catch(err => console.log("❌ MongoDB Connection Error:", err));



// Auto-create default admin
const createDefaultAdmin = async () => {
  try {
    const existingAdmin = await Admin.findOne({ email: "tushar@admin.com" });
    if (!existingAdmin) {
      await Admin.create({
        email: "tushar@admin.com",
        password: "admin@123",
        name: "Tushar Admin",
      });
      console.log("✅ Default admin created: tushar@admin.com / admin@123");
    } else {
      console.log("✅ Default admin already exists");
    }
  } catch (error) {
    console.error("❌ Error creating default admin:", error);
  }
};


// Routes
app.use("/api/admin", adminRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/users", userRoutes);
// app.use("/api/doctors", doctorRoutes);
app.use("/api/appointments", appointmentRoutes);
createDefaultAdmin();


// Default route
app.get("/", (req, res) => {
  res.send("Doctor Appointment Backend Running");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
