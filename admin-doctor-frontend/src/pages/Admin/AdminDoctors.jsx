import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import { adminGetAllDoctors, adminChangeDoctorAvailability } from "../../api/adminDoctorApi";

const AdminDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDoctors = async () => {
    const res = await adminGetAllDoctors();
    if (res.success) setDoctors(res.data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const toggleAvailability = async (id) => {
    const res = await adminChangeDoctorAvailability(id);
    if (res.success) {
      alert(`✅ ${res.message}`);
      fetchDoctors(); // refresh list
    } else {
      alert("❌ Failed to update availability");
    }
  };

  return (
    <div className="flex">
      <Sidebar role="admin" />
      <div className="flex-1 p-8">
        <h1 className="text-2xl font-semibold mb-6">All Doctors</h1>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="grid grid-cols-3 gap-6">
            {doctors.map((doc) => (
              <div
                key={doc._id}
                className="bg-white p-6 rounded-2xl shadow-md text-center"
              >
                <img
                  src={doc.image || "/default-doctor.png"}
                  alt={doc.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
                <h2 className="text-lg font-semibold">{doc.name}</h2>
                <p className="text-gray-500">{doc.speciality}</p>
                <p className="text-sm text-gray-600 mb-2">{doc.experience} yrs exp</p>
                <p className="text-sm text-gray-700 mb-3">₹{doc.fees}</p>

                <button
                  onClick={() => toggleAvailability(doc._id)}
                  className={`px-4 py-2 rounded-md text-white ${
                    doc.available === "YES"
                      ? "bg-green-600 hover:bg-green-700"
                      : "bg-red-600 hover:bg-red-700"
                  }`}
                >
                  {doc.available === "YES" ? "Available" : "Unavailable"}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDoctors;
