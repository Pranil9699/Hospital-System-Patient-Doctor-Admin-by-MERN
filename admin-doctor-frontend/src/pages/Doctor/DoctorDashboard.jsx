import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import StatCard from "../../components/StatCard";
import {
  getDoctorDashboardStats,
  getDoctorAppointments,
  adminUpdateAppointmentStatus,
} from "../../api/adminDoctorApi";

const DoctorDashboard = () => {
  const [stats, setStats] = useState({
    earning: 0,
    appointments: 0,
    patients: 0,
  });
  const [appointments, setAppointments] = useState([]);

  const doctorData = JSON.parse(localStorage.getItem("doctor"));

  // Fetch doctor dashboard stats and appointments
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const statsRes = await getDoctorDashboardStats(doctorData._id);
        if (statsRes.success) setStats(statsRes.data);

        const apptRes = await getDoctorAppointments(doctorData._id);
        if (apptRes.success) setAppointments(apptRes.data);
      } catch (err) {
        console.error("Error fetching doctor dashboard:", err);
      }
    };
    fetchDashboardData();
  }, [doctorData._id]);

  // ✅ Handler to update appointment status
  const handleStatusChange = async (appointmentId, newStatus) => {
    if (
      !window.confirm(
        `Are you sure you want to mark this appointment as ${newStatus}?`
      )
    )
      return;

    try {
      const res = await adminUpdateAppointmentStatus(appointmentId, newStatus);
      if (res.success) {
        // Update UI instantly without refetching
        setAppointments((prev) =>
          prev.map((a) =>
            a._id === appointmentId ? { ...a, status: newStatus } : a
          )
        );
      } else {
        alert(res.message || "Failed to update status.");
      }
    } catch (err) {
      console.error("Error updating status:", err);
      alert("Error updating appointment status.");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar role="doctor" />
      <div className="flex-1 p-8">
        <h1 className="text-2xl font-semibold mb-6">Doctor Dashboard</h1>
        <p className="text-lg text-gray-700 mb-6">
          Hello, <span className="font-semibold">{doctorData.name}</span>! 👋
        </p>
        {/* --- Stats Cards --- */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          <StatCard title="My Earnings" count={`₹${stats.earning}`} />
          <StatCard title="Appointments" count={stats.appointments} />
          <StatCard title="Patients" count={stats.patients} />
        </div>

        {/* --- All Appointments Table --- */}
        <div className="bg-white shadow rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-4">All Appointments</h2>
          <table className="w-full text-left border">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="p-3">#ID</th>
                <th className="p-3">Patient Name</th>
                <th className="p-3">Age</th>
                <th className="p-3">Date & Time</th>
                <th className="p-3">Status</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {appointments.length > 0 ? (
                appointments.map((a, i) => (
                  <tr key={i} className="border-b hover:bg-gray-50">
                    <td className="p-3 text-gray-600">{a._id.slice(-6)}</td>
                    <td className="p-3">{a.userName}</td>
                    <td className="p-3">{a.patientAge || "N/A"}</td>
                    <td className="p-3">
                      {a.date} - {a.time}
                    </td>
                    <td className="p-3 font-semibold">
                      {a.status === "VERIFIED" && (
                        <span className="text-green-600">VERIFIED</span>
                      )}
                      {a.status === "CANCELLED" && (
                        <span className="text-red-600">CANCELLED</span>
                      )}
                      {a.status === "NOT_VERIFIED" && (
                        <span className="text-yellow-600">PENDING</span>
                      )}
                    </td>
                    <td className="p-3 space-x-2">
                      {a.status === "NOT_VERIFIED" || a.status === "PENDING" ? (
                        <>
                          <button
                            onClick={() =>
                              handleStatusChange(a._id, "VERIFIED")
                            }
                            className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                          >
                            Verify
                          </button>
                          <button
                            onClick={() =>
                              handleStatusChange(a._id, "CANCELLED")
                            }
                            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <span className="text-gray-500 italic">No Action</span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center p-4 text-gray-500">
                    No appointments found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
