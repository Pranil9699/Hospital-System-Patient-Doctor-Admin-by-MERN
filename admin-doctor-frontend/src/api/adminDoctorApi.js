import axios from "axios";

const BASE_URL = "http://localhost:5000/api";

const api = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// =============================
// 🧑‍💼 ADMIN SIDE APIs
// =============================

// 🔐 Admin Login
export const adminLogin = async (loginData) => {
  try {
    const res = await api.post("/admin/login", loginData);
    return res.data;
  } catch (err) {
    console.error("❌ Admin Login Error:", err);
    return { success: false, message: "Admin login failed" };
  }
};

// 📊 Get Dashboard Counts
export const getAdminCounts = async () => {
  try {
    const res = await api.get("/admin/counts");
    return res.data;
  } catch (err) {
    console.error("❌ Get Admin Counts Error:", err);
    return { success: false, message: "Failed to fetch admin counts" };
  }
};

export const getAppointmentsPerDoctor = async () => {
  try {
    const res = await api.get("/admin/appointments-per-doctor");
    return res.data;
  } catch (err) {
    console.error("❌ Get Appointments Per Doctor Error:", err);
    return { success: false, message: "Failed to fetch appointments per doctor" };
  }
};

export const getHospitalEarningStats = async () => {
  try {
    const res = await api.get("/admin/hospital-earning-stats");
    return res.data;
  } catch (err) {
    console.error("❌ Get Hospital Earning Stats Error:", err);
    return { success: false, message: "Failed to fetch hospital earning stats" };
  }
};

export const getHospitalEarnings = async () => {
  try {
    const res = await api.get("/admin/hospital-earnings");
    return res.data;
  } catch (err) {
    console.error("❌ Get Hospital Earnings Error:", err);
    return { success: false, message: "Failed to fetch hospital earnings" };
  }
};


// 🕒 Get Latest Bookings (for Dashboard Table)
export const getLatestBookings = async () => {
  try {
    const res = await api.get("/admin/bookings");
    console.log("HI");
    return res.data;
  } catch (err) {
    console.error("❌ Get Latest Bookings Error:", err);
    return { success: false, message: "Failed to fetch latest bookings" };
  }
};

// ⚙️ Update Appointment Status (Accept / Cancel / Verify)
export const adminUpdateAppointmentStatus = async (id, status) => {
  try {
    const res = await api.put(`/admin/appointments/${id}/status`, { status });
    return res.data;          
  } catch (err) {
    console.error("❌ Update Appointment Status Error:", err);
    return { success: false, message: "Failed to update appointment status" };
  }
};


export const adminGetAllDoctors = async () => {
  try {
    const res = await api.get("/admin/doctors");
    return res.data;
  } catch (err) {
    console.error("❌ Get All Doctors Error:", err);
    return { success: false, message: "Failed to fetch doctors" };
  }
};

// ➕ Add New Doctor
export const adminAddDoctor = async (doctorData) => {
  try {
    const res = await api.post("/admin/add-doctor", doctorData);
    return res.data;
  } catch (err) {
    console.error("❌ Add Doctor Error:", err);
    return { success: false, message: "Failed to add doctor" };
  }
};

// 🔄 Change Doctor Availability
export const adminChangeDoctorAvailability = async (doctorId) => {
  try {
    const res = await api.put(`/admin/doctor/${doctorId}/availability`);
    return res.data;
  } catch (err) {
    console.error("❌ Change Doctor Availability Error:", err);
    return { success: false, message: "Failed to change doctor availability" };
  }
};

// =============================
// 👨‍⚕️ DOCTOR SIDE APIs
// =============================

// 🔐 Doctor Login
export const doctorLogin = async (loginData) => {
  try {
    const res = await api.post("/doctors/login", loginData);
    return res.data;
  } catch (err) {
    console.error("❌ Doctor Login Error:", err);
    return { success: false, message: "Doctor login failed" };
  }
};

// 📈 Get Doctor Dashboard Stats (Earnings, Appointment Count, Patient Count)
export const getDoctorDashboardStats = async (doctorId) => {
  try {
    const res = await api.get(`/doctors/dashboard-stats/${doctorId}`);
    return res.data;
  } catch (err) {
    console.error("❌ Get Doctor Dashboard Stats Error:", err);
    return { success: false, message: "Failed to fetch doctor dashboard stats" };
  }
};
// export const updateAppointmentStatusByDoctor = async (appointmentId, status) => {
//   try {
//     const res = await api.put(`/doctor/appointment/update-status/${appointmentId}`, { status });
//     return res.data;
//   } catch (err) {
//     console.error("API error: updateAppointmentStatusByDoctor", err);
//     return { success: false, message: "Server error" };
//   }
// };

// ✅ Get doctor’s appointments
export const getDoctorAppointments = async (doctorId) => {
  try {
    const res = await api.get(`/doctors/appointments/${doctorId}`);
    console.log("HI",res)
    return res.data;
  } catch (err) {
    console.error("API error: getDoctorAppointments", err);
    return { success: false, message: "Server error" };
  }
};

// 🧾 Get All Patients of a Doctor
export const getDoctorPatients = async (doctorId) => {
  try {
    const res = await api.get(`/doctors/patients/${doctorId}`);
    return res.data;
  } catch (err) {
    console.error("❌ Get Doctor Patients Error:", err);
    return { success: false, message: "Failed to fetch patients" };
  }
};

// 🩺 Update Appointment Status by Doctor
export const doctorUpdateAppointmentStatus = async (id, status) => {
  try {
    const res = await api.put(`/doctors/appointments/${id}/status`, { status });
    return res.data;
  } catch (err) {
    console.error("❌ Doctor Update Status Error:", err);
    return { success: false, message: "Failed to update appointment status" };
  }
};

// 👤 Get Doctor Profile
export const getDoctorProfile = async (doctorId) => {
  try {
    const res = await api.get(`/doctors/profile/${doctorId}`);
    return res.data;
  } catch (err) {
    console.error("❌ Get Doctor Profile Error:", err);
    return { success: false, message: "Failed to fetch doctor profile" };
  }
};

// ✏️ Update Doctor Profile
export const updateDoctorProfile = async (doctorId, updatedData) => {
  try {
    const res = await api.put(`/doctors/profile/${doctorId}`, updatedData);
    return res.data;
  } catch (err) {
    console.error("❌ Update Doctor Profile Error:", err);
    return { success: false, message: "Failed to update doctor profile" };
  }
};

// =============================
// 🚪 Logout Helper
// =============================
export const logoutUser = (role) => {
  localStorage.removeItem(role);
  window.location.href = `/${role}/login`;
};
