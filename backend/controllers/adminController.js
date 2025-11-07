 // ✅ make sure you import this
import HospitalEarning from "../models/HospitalEarning.js";
import Admin from "../models/adminModel.js";
import Doctor from "../models/doctorModel.js";
import Appointment from "../models/appointmentModel.js";
import User from "../models/userModel.js";

// 🧠 Admin Login
export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res
        .status(400)
        .json({ success: false, message: "Missing fields" });

    const admin = await Admin.findOne({ email, password });
    if (!admin)
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });

    res.json({
      success: true,
      message: "Admin login successful",
      data: admin,
    });
  } catch (error) {
    console.error("Admin Login Error:", error);
    res
      .status(500)
      .json({ success: false, message: "Server error" });
  }
};

// 📊 Dashboard Counts
export const getCounts = async (req, res) => {
  try {
    const doctorCount = await Doctor.countDocuments();
    const appointmentCount = await Appointment.countDocuments();
    const patientCount = await User.countDocuments();

    res.json({
      success: true,
      data: { doctorCount, appointmentCount, patientCount },
    });
  } catch (error) {
    console.error("Get Counts Error:", error);
    res
      .status(500)
      .json({ success: false, message: "Error fetching counts" });
  }
};

// 📈 Appointments per Doctor (for chart)
export const getAppointmentsPerDoctor = async (req, res) => {
  try {
    const data = await Appointment.aggregate([
      {
        $group: {
          _id: "$doctorName",
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
    ]);

    res.json({ success: true, data });
  } catch (error) {
    console.error("Get Appointments Per Doctor Error:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching appointments per doctor",
    });
  }
};

// 🕓 Latest Bookings
export const getLatestBookings = async (req, res) => {
  try {
    const bookings = await Appointment.find()
      .sort({ _id: -1 })
      .limit(10);
    res.json({ success: true, data: bookings });
  } catch (error) {
    console.error("Get Latest Bookings Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch latest bookings",
    });
  }
};

// 🔄 Update Appointment Status (Improved)
export const updateAppointmentStatus = async (req, res) => {
  try {
    console.log("hi");
    console.log(req.url);

    const { appointmentId } = req.params;
    const { status } = req.body;

    console.log("hi...d");
    console.log(appointmentId, status);

    const appointment = await Appointment.findById(appointmentId);
    if (!appointment)
      return res
        .status(404)
        .json({ success: false, message: "Appointment not found" });

    appointment.status = status;
    await appointment.save();

    // ✅ Only for verified appointments
    if (status === "VERIFIED") {
      const doctor = await Doctor.findById(appointment.doctorId);
      if (doctor) {
        const doctorShare = doctor.fees * 0.7;
        const hospitalShare = doctor.fees * 0.3;

        // 🔹 Calculate patient age
        let patientAge = null;
        const patient = await User.findById(appointment.userId);
        if (patient && patient.dob) {
          const birthDate = new Date(patient.dob);
          const today = new Date();

          let age = today.getFullYear() - birthDate.getFullYear();
          const monthDiff = today.getMonth() - birthDate.getMonth();
          const dayDiff = today.getDate() - birthDate.getDate();

          if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
            age--;
          }

          patientAge = age > 0 ? age : 0; // prevent negatives
        }

        // 🩺 Update doctor’s earnings
        doctor.earning = (doctor.earning || 0) + doctorShare;
        await doctor.save();

        // 🏥 Update hospital earnings
        let hospitalEarning = await HospitalEarning.findOne({
          speciality: doctor.speciality,
        });

        if (!hospitalEarning) {
          // create new document if speciality not exists
          hospitalEarning = new HospitalEarning({
            speciality: doctor.speciality,
            amount: hospitalShare,
            patientAges: patientAge !== null ? [patientAge] : [],
          });
        } else {
          hospitalEarning.amount += hospitalShare;

          // Ensure patientAges array exists
          if (!Array.isArray(hospitalEarning.patientAges)) {
            hospitalEarning.patientAges = [];
          }

          // Push the new patient's age (avoid null)
          if (patientAge !== null) {
            hospitalEarning.patientAges.push(patientAge);
          }
        }

        await hospitalEarning.save();
      }
    }

    res.json({
      success: true,
      message: "Appointment status updated successfully",
    });
  } catch (err) {
    console.error("Error updating appointment:", err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};


// 🩺 Get all Doctors
export const getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.json({ success: true, data: doctors });
  } catch (error) {
    console.error("Get Doctors Error:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching doctors",
    });
  }
};

// ➕ Add new Doctor
export const addDoctor = async (req, res) => {
  try {
    const newDoctor = new Doctor(req.body);
    await newDoctor.save();
    res.json({
      success: true,
      message: "Doctor added successfully",
      data: newDoctor,
    });
  } catch (error) {
    console.error("Add Doctor Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to add doctor",
    });
  }
};

// 🔄 Change Doctor Availability
export const changeAvailability = async (req, res) => {
  try {
    const { id } = req.params;
    const doctor = await Doctor.findById(id);
    if (!doctor)
      return res.status(404).json({ success: false, message: "Doctor not found" });

    // Toggle availability
    doctor.available = doctor.available === "YES" ? "NO" : "YES";
    await doctor.save();

    res.json({
      success: true,
      message: `Doctor availability changed to ${doctor.available}`,
      data: doctor,
    });
  } catch (error) {
    console.error("Change Availability Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to change doctor availability",
    });
  }
};


// ✅ Fetch summarized hospital earning stats
export const getHospitalEarningStats = async (req, res) => {
  try {
    const earnings = await HospitalEarning.find();

    if (!earnings || earnings.length === 0) {
      return res.json({
        success: true,
        data: {
          totalEarnings: 0,
          highestSpeciality: "N/A",
          highestAmount: 0,
          averagePatientAge: 0,
        },
      });
    }

    // Total hospital earnings
    const totalEarnings = earnings.reduce((sum, e) => sum + e.amount, 0);

    // Highest earning speciality
    const top = earnings.reduce(
      (max, e) => (e.amount > max.amount ? e : max),
      earnings[0]
    );

    // Flatten all patientAges arrays into one
    const allAges = earnings.flatMap((e) => e.patientAges || []);

    // Calculate overall average age
    const avgAge =
      allAges.length > 0
        ? allAges.reduce((sum, age) => sum + age, 0) / allAges.length
        : 0;

    res.json({
      success: true,
      data: {
        totalEarnings,
        highestSpeciality: top.speciality,
        highestAmount: top.amount,
        averagePatientAge: avgAge.toFixed(1),
      },
    });
  } catch (err) {
    console.error("❌ Error fetching hospital earnings stats:", err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// ✅ Fetch per-speciality hospital earnings for dashboard/chart
export const getHospitalEarnings = async (req, res) => {
  try {
    const earnings = await HospitalEarning.find().lean();

    // Format for frontend chart/dashboard
    const formatted = earnings.map((e) => {
      const avgAge =
        e.patientAges && e.patientAges.length > 0
          ? e.patientAges.reduce((sum, a) => sum + a, 0) / e.patientAges.length
          : null;

      return {
        speciality: e.speciality,
        amount: e.amount,
        avgPatientAge: avgAge ? avgAge.toFixed(1) : "N/A",
      };
    });

    res.json({
      success: true,
      data: formatted,
    });
  } catch (err) {
    console.error("❌ Error fetching hospital earnings:", err);
    res.status(500).json({
      success: false,
      message: "Failed to fetch hospital earnings",
    });
  }
};
