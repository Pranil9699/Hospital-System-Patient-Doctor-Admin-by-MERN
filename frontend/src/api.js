import axios from "axios";

const BASE_URL = "http://localhost:5000/api";

// Create a reusable Axios instance
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Register User
export const registerUser = async (userData) => {
  try {
    console.log(userData)
    const res = await api.post("/users/register", userData);
    console.log("Register Response:", res.data);
    return res.data;
  } catch (error) {
    console.error("Register Error:", error);
    return { success: false, message: error.response?.data?.message || "Server error" };
  }
};

// Login User
export const loginUser = async (userData) => {
  try {
    const res = await api.post("/users/login", userData);
    console.log("Login Response:", res.data);
    return res.data;
  } catch (error) {
    console.error("Login Error:", error);
    return { success: false, message: error.response?.data?.message || "Server error" };
  }
};

// Get Doctors
export const getDoctors = async () => {
  try {
    const res = await api.get("/admin/doctors");
    console.log(res)
    return res.data;
  } catch (error) {
    alert(error.message)
    console.error("Get Doctors Error:", error);
    return { success: false, message: "Failed to fetch doctors" };
  }
};
// Get User Profile
export const getUserProfile = async (userId) => {
  try {
    const res = await api.get(`/users/profile/${userId}`);
    return res.data;
  } catch (error) {
    console.error("Get User Profile Error:", error);
    return { success: false, message: "Failed to fetch user profile" };
  }
};

export const updateUserProfile = async (userData) => {
  try {
    const res = await api.put("/users/update-profile", userData);
    return res.data;
  } catch (error) {
    console.error("Profile Update Error:", error);
    return { success: false, message: "Failed to update profile" };
  }
};


// Book Appointment
export const bookAppointment = async (appointmentData) => {
  try {
    const res = await api.post("/appointments/book", appointmentData);
    return res.data;
  } catch (error) {
    console.error("Book Appointment Error:", error);
    return { success: false, message: "Failed to book appointment" };
  }
};

// Get Appointments
export const getAppointments = async () => {
  try {
    const res = await api.get("/appointments");
    return res.data;
  } catch (error) {
    console.error("Get Appointments Error:", error);
    return { success: false, message: "Failed to fetch appointments" };
  }
};

// Cancel Appointment
export const cancelAppointment = async (id) => {
  try {
    const res = await api.delete(`/appointments/${id}`);
    return res.data;
  } catch (error) {
    console.error("Cancel Appointment Error:", error);
    return { success: false, message: "Failed to cancel appointment" };
  }
};


// 🩺 Fetch All Doctors
export const fetchAllDoctors = async () => {
  try {
    const res = await api.get("/doctors");
    return res.data;
  } catch (error) {
    console.error("❌ Fetch All Doctors Error:", error);
    return { success: false, message: "Failed to load doctors" };
  }
};

export const getUserAppointments = async (userId) => {
  try {
    console.log("hi")
    const res = await api.get(`/users/appointments/${userId}`);
    console.log("hi><")
    return res.data;
  } catch (error) {
    console.error("Get User Appointments Error:", error);
    return { success: false, message: "Failed to fetch user appointments" };
  }
};