import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import AdminLogin from "../pages/Admin/AdminLogin";
import AdminDashboard from "../pages/Admin/AdminDashboard";
import AdminAppointments from "../pages/Admin/AdminAppointments";
import AdminDoctors from "../pages/Admin/AdminDoctors";
import AdminAddDoctor from "../pages/Admin/AdminAddDoctor";

import DoctorLogin from "../pages/Doctor/DoctorLogin";
import DoctorDashboard from "../pages/Doctor/DoctorDashboard";
import DoctorAppointments from "../pages/Doctor/DoctorAppointments";
import DoctorProfile from "../pages/Doctor/DoctorProfile";

// ✅ Layouts
import AdminLayout from "../pages/Admin/AdminLayout";
import DoctorLayout from "../pages/Doctor/DoctorLayout";

// --- Helper Components --- //
const AdminProtectedRoute = ({ children }) => {
  const admin = localStorage.getItem("admin");
  const doctor = localStorage.getItem("doctor");

  if (doctor) return <Navigate to="/doctor/dashboard" replace />;
  if (!admin) return <Navigate to="/admin/login" replace />;
  return children;
};

const DoctorProtectedRoute = ({ children }) => {
  const doctor = localStorage.getItem("doctor");
  const admin = localStorage.getItem("admin");

  if (admin) return <Navigate to="/admin/dashboard" replace />;
  if (!doctor) return <Navigate to="/doctor/login" replace />;
  return children;
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* --- Admin Auth Route --- */}
      <Route path="/admin/login" element={<AdminLogin />} />

      {/* --- Admin Protected Routes --- */}
      <Route
        path="/admin/dashboard"
        element={
          <AdminProtectedRoute>
            <AdminLayout>
              <AdminDashboard />
            </AdminLayout>
          </AdminProtectedRoute>
        }
      />
      <Route
        path="/admin/appointments"
        element={
          <AdminProtectedRoute>
            <AdminLayout>
              <AdminAppointments />
            </AdminLayout>
          </AdminProtectedRoute>
        }
      />
      <Route
        path="/admin/doctors"
        element={
          <AdminProtectedRoute>
            <AdminLayout>
              <AdminDoctors />
            </AdminLayout>
          </AdminProtectedRoute>
        }
      />
      <Route
        path="/admin/add-doctor"
        element={
          <AdminProtectedRoute>
            <AdminLayout>
              <AdminAddDoctor />
            </AdminLayout>
          </AdminProtectedRoute>
        }
      />

      {/* --- Doctor Auth Route --- */}
      <Route path="/doctor/login" element={<DoctorLogin />} />

      {/* --- Doctor Protected Routes --- */}
      <Route
        path="/doctor/dashboard"
        element={
          <DoctorProtectedRoute>
            <DoctorLayout>
              <DoctorDashboard />
            </DoctorLayout>
          </DoctorProtectedRoute>
        }
      />
      {/* <Route
        path="/doctor/appointments"
        element={
          <DoctorProtectedRoute>
            <DoctorLayout>
              <DoctorAppointments />
            </DoctorLayout>
          </DoctorProtectedRoute>
        }
      /> */}
      <Route
        path="/doctor/profile"
        element={
          <DoctorProtectedRoute>
            <DoctorLayout>
              <DoctorProfile />
            </DoctorLayout>
          </DoctorProtectedRoute>
        }
      />

      {/* --- Default Redirect --- */}
      <Route path="*" element={<Navigate to="/admin/login" replace />} />
    </Routes>
  );
};

export default AppRoutes;
