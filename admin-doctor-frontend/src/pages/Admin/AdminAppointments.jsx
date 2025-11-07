import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import { getLatestBookings, adminUpdateAppointmentStatus } from "../../api/adminDoctorApi";

const AdminAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      setLoading(true);
      const res = await getLatestBookings();
      if (res.success) setAppointments(res.data || []);
      console.log(res.data)
      setLoading(false);
    };
    fetchAppointments();
  }, []);

  const updateStatus = async (id, status) => {
    console.log(id,status,"HI..?");
    const res = await adminUpdateAppointmentStatus(id, status);
    console.log(res);
    if (res.success) {
      setAppointments((prev) =>
        prev.map((a) => (a._id === id ? { ...a, status } : a))
      );
    } else {
      alert(res.message);
    }
  };

  const handleVerify = (id) => {
    if (window.confirm("Mark this appointment as VERIFIED?")) {
      updateStatus(id, "VERIFIED");
    }
  };

  const handleCancel = (id) => {
    if (window.confirm("Are you sure you want to cancel this appointment?")) {
      updateStatus(id, "CANCELLED");
    }
  };

  return (
    <div className="flex">
      <Sidebar role="admin" />
      <div className="flex-1 p-8 overflow-x-auto">
        <h1 className="text-2xl font-semibold mb-6">All Appointments</h1>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <table className="w-full text-left border">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="p-3">Patient</th>
                <th className="p-3">Doctor</th>
                <th className="p-3">Date</th>
                <th className="p-3">Time</th>
                <th className="p-3">Status</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appt) => (
                <tr key={appt._id} className="border-b">
                  <td className="p-3">{appt.userName}</td>
                  <td className="p-3">{appt.doctorName}</td>
                  <td className="p-3">{appt.date}</td>
                  <td className="p-3">{appt.time}</td>

                  {/* 🧠 Status Display */}
                  <td className="p-3">
                    {appt.status === "VERIFIED" && (
                      <span className="text-green-600 font-semibold">✔ Verified</span>
                    )}
                    {appt.status === "CANCELLED" && (
                      <span className="text-red-600 font-semibold">❌ Cancelled</span>
                    )}
                    {appt.status === "NOT_VERIFIED" && (
                      <span className="text-yellow-600 font-semibold">⚠ Pending</span>
                    )}
                  </td>

                  {/* 🎯 Action Buttons */}
                  <td className="p-3 space-x-2">
                    {appt.status === "NOT_VERIFIED" ? (
                      <>
                        <button
                          onClick={() => handleVerify(appt._id)}
                          className="px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700"
                        >
                          Verify
                        </button>
                        <button
                          onClick={() => handleCancel(appt._id)}
                          className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700"
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <span className="text-gray-500 italic">No Action</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminAppointments;
