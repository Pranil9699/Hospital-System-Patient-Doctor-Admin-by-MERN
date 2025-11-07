import Doctor from "../models/doctorModel.js";
import Appointment from "../models/appointmentModel.js";
import User from "../models/userModel.js";

// Doctor Login
export const doctorLogin = async (req, res) => {
  try {
    // console.log("hi")
    const { email, password } = req.body;
    // console.log(email,password)
    if (!email || !password)
      return res.status(400).json({ success: false, message: "Missing fields" });

    const doctor = await Doctor.findOne({ email, password });
    // console.log(doctor)
    if (!doctor)
      return res.status(401).json({ success: false, message: "Invalid credentials" });

    res.json({ success: true, message: "Doctor login successful", data: doctor });
  } catch (error) {
    // console.log(error)
    console.error("Doctor Login Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Dashboard Stats (earnings, appointment count, patient count)
export const getDoctorDashboardStats = async (req, res) => {
  try {
    const { doctorId } = req.params;

    const doctor = await Doctor.findById(doctorId);
    const appointments = await Appointment.find({ doctorId });

    const patients = new Set(appointments.map((a) => a.userId)).size;

    res.json({
      success: true,
      data: {
        earning: doctor.earning,
        appointments: appointments.length,
        patients,
      },
    });
  } catch (err) {
    console.error("Error getting doctor stats:", err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Get all patients (doctor-specific appointments)
export const getAllPatients = async (req, res) => {
  try {
    const { doctorId } = req.params;
    const appointments = await Appointment.find({ doctorId });
    res.json({ success: true, data: appointments });
  } catch (error) {
    console.error("Get Patients Error:", error);
    res.status(500).json({ success: false, message: "Error fetching patients" });
  }
};

// Update booking status (accept/cancel)
export const updateBookingStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updated = await Appointment.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    res.json({ success: true, message: "Booking status updated", data: updated });
  } catch (error) {
    console.error("Update Booking Status Error:", error);
    res.status(500).json({ success: false, message: "Error updating status" });
  }
};

// Get Doctor Profile
export const getDoctorProfile = async (req, res) => {
  try {
    const { doctorId } = req.params;
    const doctor = await Doctor.findById(doctorId);

    if (!doctor) {
      return res.status(404).json({ success: false, message: "Doctor not found" });
    }

    res.json({ success: true, data: doctor });
  } catch (error) {
    console.error("Get Doctor Profile Error:", error);
    res.status(500).json({ success: false, message: "Failed to fetch profile" });
  }
};

// Update Doctor Profile
export const updateDoctorProfile = async (req, res) => {
  try {
    const { doctorId } = req.params;
    const updateData = req.body;

    const doctor = await Doctor.findByIdAndUpdate(doctorId, updateData, {
      new: true,
    });

    if (!doctor) {
      return res.status(404).json({ success: false, message: "Doctor not found" });
    }

    res.json({ success: true, message: "Profile updated successfully", data: doctor });
  } catch (error) {
    console.error("Update Doctor Profile Error:", error);
    res.status(500).json({ success: false, message: "Failed to update profile" });
  }
};


// ✅ Get all appointments for a specific doctor (used in doctor dashboard / appointments page)
export const getDoctorAppointments = async (req, res) => {
  try {
    const { doctorId } = req.params;

    // Fetch appointments for the doctor
    const appointments = await Appointment.find({ doctorId }).sort({ createdAt: -1 });

    // Add patientAge dynamically
    const appointmentsWithAge = await Promise.all(
      appointments.map(async (appt) => {
        let patientAge = null;

        const patient = await User.findById(appt.userId);
        if (patient && patient.dob) {
          const birthDate = new Date(patient.dob);
          const today = new Date();

          let age = today.getFullYear() - birthDate.getFullYear();
          const monthDiff = today.getMonth() - birthDate.getMonth();
          const dayDiff = today.getDate() - birthDate.getDate();

          if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
            age--;
          }

          patientAge = age > 0 ? age : 0;
        }

        return {
          ...appt.toObject(),
          patientAge,
        };
      })
    );

    res.json({
      success: true,
      message: "Doctor appointments fetched successfully",
      data: appointmentsWithAge,
    });
  } catch (error) {
    console.error("Error fetching doctor appointments:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching doctor appointments",
    });
  }
};