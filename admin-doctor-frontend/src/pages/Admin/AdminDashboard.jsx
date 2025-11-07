import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import {
  getAdminCounts,
  getLatestBookings,
  getHospitalEarnings,
} from "../../api/adminDoctorApi";

const AdminDashboard = () => {
  const [counts, setCounts] = useState({
    doctorCount: 0,
    appointmentCount: 0,
    patientCount: 0,
  });
  const [earningsDataRaw, setEarningsDataRaw] = useState(null);
  const [earningsData, setEarningsData] = useState([]);
  const [latestBookings, setLatestBookings] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const countRes = await getAdminCounts();
        setCounts(countRes.data || {});

        const earningsRes = await getHospitalEarnings();
        setEarningsDataRaw(earningsRes.data ?? earningsRes ?? null);

        const bookingRes = await getLatestBookings();
        setLatestBookings(bookingRes.data || []);
      } catch (error) {
        console.error("Dashboard fetch error:", error);
      }
    };
    fetchDashboardData();
  }, []);

  // 🧠 Convert backend data -> usable array
  useEffect(() => {
    let arr = [];

    if (!earningsDataRaw) {
      arr = [];
    } else if (Array.isArray(earningsDataRaw)) {
      arr = earningsDataRaw;
    } else if (typeof earningsDataRaw === "object") {
      arr = Object.keys(earningsDataRaw).map((key) => {
        const entry = earningsDataRaw[key];
        if (typeof entry === "object") {
          return {
            speciality: entry.speciality || key,
            amount: Number(entry.amount) || 0,
            patientAge: entry.patientAge || [],
          };
        }
        return { speciality: key, amount: Number(entry) || 0, patientAge: [] };
      });
    }

    // ✅ Compute average age from patientAge array
    const processed = arr.map((item) => {
      let avgAge = null;
      if (Array.isArray(item.patientAge) && item.patientAge.length > 0) {
        const total = item.patientAge.reduce((a, b) => a + b, 0);
        avgAge = (total / item.patientAge.length).toFixed(1);
      }
      return {
        speciality: item.speciality ?? "Unknown",
        amount: typeof item.amount === "number" ? item.amount : Number(item.amount) || 0,
        avgPatientAge: avgAge,
      };
    });

    setEarningsData(processed);
    console.log("✅ Normalized hospital earnings data:", processed);
  }, [earningsDataRaw]);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar role="admin" />
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-semibold mb-8">Admin Dashboard</h1>

        {/* --- Stats Cards --- */}
        <div className="grid grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-6 rounded-2xl shadow-md text-center">
            <h2 className="text-gray-500 text-sm uppercase">Doctors</h2>
            <p className="text-3xl font-bold text-blue-600">
              {counts.doctorCount}
            </p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-md text-center">
            <h2 className="text-gray-500 text-sm uppercase">Appointments</h2>
            <p className="text-3xl font-bold text-green-600">
              {counts.appointmentCount}
            </p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-md text-center">
            <h2 className="text-gray-500 text-sm uppercase">Patients</h2>
            <p className="text-3xl font-bold text-purple-600">
              {counts.patientCount}
            </p>
          </div>
        </div>

        {/* --- Hospital Earnings Chart --- */}
        <div className="bg-white p-6 rounded-2xl shadow-md mb-10">
          <h2 className="text-xl font-semibold mb-4">
            Hospital Earnings by Speciality
          </h2>

          {earningsData.length === 0 ? (
            <p className="text-gray-500">No earnings data available.</p>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={earningsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="speciality" />
                <YAxis />
                <Tooltip
                  formatter={(value, name) =>
                    name === "amount"
                      ? `₹${Number(value).toFixed(2)}`
                      : `${value} yrs (avg)`
                  }
                  labelFormatter={(label) => `Speciality: ${label}`}
                />
                <Bar dataKey="amount" fill="#10b981" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* --- Average Age Display --- */}
        <div className="bg-white p-6 rounded-2xl shadow-md mb-10">
          <h2 className="text-xl font-semibold mb-4">
            Average Patient Age per Speciality
          </h2>
          <table className="w-full text-left border">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="p-3">Speciality</th>
                <th className="p-3">Average Age</th>
                <th className="p-3">Total Earnings (₹)</th>
              </tr>
            </thead>
            <tbody>
              {earningsData.map((item, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="p-3">{item.speciality}</td>
                  <td className="p-3">
                    {item.avgPatientAge ? `${item.avgPatientAge} yrs` : "N/A"}
                  </td>
                  <td className="p-3 font-medium text-green-600">
                    ₹{item.amount.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* --- Latest Bookings --- */}
        <div className="bg-white p-6 rounded-2xl shadow-md">
          <h2 className="text-xl font-semibold mb-4">Latest Bookings</h2>
          <table className="w-full text-left border">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="p-3">Patient</th>
                <th className="p-3">Doctor</th>
                <th className="p-3">Date</th>
                <th className="p-3">Time</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {latestBookings.length > 0 ? (
                latestBookings.map((b, i) => (
                  <tr
                    key={i}
                    className={`border-b transition ${
                      b.status === "CANCELLED"
                        ? "bg-gray-100 text-gray-400 line-through"
                        : b.status === "VERIFIED"
                        ? "bg-green-50 text-green-700"
                        : "bg-yellow-50 text-yellow-700"
                    }`}
                  >
                    <td className="p-3">{b.userName}</td>
                    <td className="p-3">{b.doctorName}</td>
                    <td className="p-3">{b.date}</td>
                    <td className="p-3">{b.time}</td>
                    <td className="p-3 font-medium">
                      {b.status === "VERIFIED"
                        ? "✔ Verified"
                        : b.status === "CANCELLED"
                        ? "❌ Cancelled"
                        : "⚠ Pending"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center p-4 text-gray-500">
                    No recent bookings found.
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

export default AdminDashboard;
