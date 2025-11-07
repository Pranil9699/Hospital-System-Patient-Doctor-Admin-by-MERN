import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext.jsx";
import { getUserAppointments, cancelAppointment } from "../api";
import { assets } from "../assets/assets.js";
import { toast } from "react-toastify";

const MyAppointments = () => {
  const { doctors } = useContext(AppContext);
  const [appointments, setAppointments] = useState([]);

  const fetchAppointments = async () => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (!userData) return;

    try {
      const res = await getUserAppointments(userData._id); // 🔹 Fetch only this user's appointments
      if (res.success && Array.isArray(res.data)) {
        setAppointments(res.data);
      } else {
        console.error("Failed to fetch appointments:", res.message);
        toast.error(res.message || "Failed to fetch appointments");
      }
    } catch (err) {
      console.error("Error fetching appointments:", err);
      toast.error("Error fetching appointments");
    }
  };

  const handleCancel = async (id) => {
    try {
      const res = await cancelAppointment(id);
      if (res.success) {
        toast.success("Appointment cancelled successfully!");
        setAppointments((prev) => prev.filter((a) => a._id !== id));
      } else {
        toast.error(res.message || "Failed to cancel appointment");
      }
    } catch (error) {
      console.error("Error cancelling appointment:", error);
      toast.error("Server error while cancelling appointment");
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  // Function to determine background color based on status
  const getStatusBg = (status) => {
    switch (status) {
      case "VERIFIED":
        return "bg-green-100";
      case "NOT_VERIFIED":
        return "bg-yellow-100";
      case "CANCELLED":
        return "bg-red-100";
      default:
        return "bg-white";
    }
  };

  return (
    <div className="mt-12">
      <p className="pb-3 font-medium text-zinc-700 border-b">My Appointments</p>

      <div className="mt-4 space-y-4">
        {appointments.length > 0 ? (
          appointments.map((item) => (
            <div
              key={item._id}
              className={`grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-4 px-4 rounded-lg ${getStatusBg(
                item.status
              )}`}
            >
              <div>
                <img
                  className="w-32 bg-indigo-50 rounded-lg"
                  src={
                    doctors.find((d) => d._id === item.doctorId)?.image ||
                    assets.doc_placeholder
                  }
                  alt="Doctor"
                />
              </div>

              <div className="flex-1 text-sm text-zinc-600">
                <p className="text-neutral-800 font-semibold">
                  {item.doctorName}
                </p>
                <p>{item.speciality}</p>
                <p className="text-zinc-700 font-medium mt-1">Date & Time:</p>
                <p className="text-xs">
                  {item.date} | {item.time}
                </p>
                <p className="mt-1 font-semibold">
                  Status:{" "}
                  {item.status === "VERIFIED"
                    ? "Paid"
                    : item.status === "NOT_VERIFIED"
                    ? "Not Paid"
                    : "Cancelled"}
                </p>
              </div>

              <div className="flex flex-col gap-2 justify-end sm:mt-0 mt-2">
                <button
                  onClick={() => handleCancel(item._id)}
                  disabled={item.status === "VERIFIED"} // 🔹 Disable if verified
                  className={`text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded transition-all duration-300 ${
                    item.status === "VERIFIED"
                      ? "bg-gray-300 cursor-not-allowed"
                      : "hover:bg-red-600 hover:text-white"
                  }`}
                >
                  Cancel Appointment
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 mt-4">
            No appointments booked yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default MyAppointments;
