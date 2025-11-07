import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import axios from "axios";

const DoctorAppointments = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchDoctorAppointments = async () => {
      try {
        const doctor = JSON.parse(localStorage.getItem("doctor"));
        const res = await axios.get("http://localhost:5000/api/appointments");
        const myAppointments = res.data.data.filter(
          (appt) => appt.doctorId === doctor?._id
        );
        setAppointments(myAppointments);
      } catch (err) {
        console.error("Error fetching doctor appointments:", err);
      }
    };
    fetchDoctorAppointments();
  }, []);

  const handleUpdateStatus = async (id, status) => {
    try {
      await axios.put(`http://localhost:5000/api/appointments/${id}`, {
        status,
      });
      setAppointments((prev) =>
        prev.map((a) => (a._id === id ? { ...a, status } : a))
      );
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  return (
    <div className="flex">
      <Sidebar role="doctor" />
      <div className="flex-1 p-8">
        <h1 className="text-2xl font-semibold mb-6">My Appointments</h1>
        <table className="w-full text-left border">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="p-3">Patient</th>
              <th className="p-3">Date</th>
              <th className="p-3">Time</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appt) => (
              <tr key={appt._id} className="border-b">
                <td className="p-3">{appt.userName}</td>
                <td className="p-3">{appt.date}</td>
                <td className="p-3">{appt.time}</td>
                <td className="p-3 space-x-2">
                  <button
                    onClick={() => handleUpdateStatus(appt._id, "accepted")}
                    className="px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleUpdateStatus(appt._id, "cancelled")}
                    className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700"
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DoctorAppointments;
