import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import { getDoctorProfile, updateDoctorProfile } from "../../api/adminDoctorApi";

const DoctorProfile = () => {
  const [doctor, setDoctor] = useState({
    name: "",
    email: "",
    speciality: "",
    degree: "",
    experience: "",
    about: "",
    fees: "",
    address: { line1: "", line2: "" },
    image: "",
    available: "YES",
  });

  useEffect(() => {
    const loadDoctor = async () => {
      try {
        const stored = JSON.parse(localStorage.getItem("doctor"));
        if (!stored?._id) return alert("Doctor not logged in!");

        const res = await getDoctorProfile(stored._id);
        if (res.success && res.data) {
          setDoctor(res.data);
        }
      } catch (err) {
        console.error("Error loading doctor profile:", err);
      }
    };
    loadDoctor();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("address.")) {
      const key = name.split(".")[1];
      setDoctor((prev) => ({
        ...prev,
        address: { ...prev.address, [key]: value },
      }));
    } else {
      setDoctor((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleUpdate = async () => {
    try {
      const res = await updateDoctorProfile(doctor._id, doctor);
      if (res.success) {
        alert("Profile updated successfully!");
        setDoctor(res.data);
        localStorage.setItem("doctor", JSON.stringify(res.data));
      } else {
        alert(res.message || "Update failed!");
      }
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar role="doctor" />
      <div className="flex-1 p-8">
        <h1 className="text-2xl font-semibold mb-6">Doctor Profile</h1>

        <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-3xl">
          {/* Profile Header */}
          <div className="flex items-center gap-6 mb-6">
            {doctor.image ? (
              <img
                src={doctor.image}
                alt="Doctor"
                className="w-24 h-24 rounded-full object-cover border"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-sm">
                No Image
              </div>
            )}
            <div>
              <h2 className="text-xl font-semibold">{doctor.name || "N/A"}</h2>
              <p className="text-gray-600">{doctor.speciality || "No speciality"}</p>
              <p className="text-gray-500 text-sm">
                Availability: <span className="font-medium">{doctor.available}</span>
              </p>
            </div>
          </div>

          {/* Editable Fields */}
          <div className="grid grid-cols-2 gap-4">
            <input
              name="name"
              value={doctor.name}
              onChange={handleChange}
              placeholder="Name"
              className="border p-2 rounded-md"
            />
            <input
              name="email"
              value={doctor.email}
              onChange={handleChange}
              placeholder="Email"
              disabled
              className="border p-2 rounded-md bg-gray-100 cursor-not-allowed"
            />
            <input
              name="speciality"
              value={doctor.speciality}
              onChange={handleChange}
              placeholder="Speciality"
              className="border p-2 rounded-md"
            />
            <input
              name="degree"
              value={doctor.degree}
              onChange={handleChange}
              placeholder="Degree"
              className="border p-2 rounded-md"
            />
            <input
              name="experience"
              value={doctor.experience}
              onChange={handleChange}
              placeholder="Experience (in years)"
              className="border p-2 rounded-md"
            />
            <input
              name="fees"
              value={doctor.fees}
              onChange={handleChange}
              placeholder="Fees"
              className="border p-2 rounded-md"
            />
            <input
              name="address.line1"
              value={doctor.address?.line1 || ""}
              onChange={handleChange}
              placeholder="Address Line 1"
              className="border p-2 rounded-md"
            />
            <input
              name="address.line2"
              value={doctor.address?.line2 || ""}
              onChange={handleChange}
              placeholder="Address Line 2"
              className="border p-2 rounded-md"
            />
          </div>

          <textarea
            name="about"
            value={doctor.about}
            onChange={handleChange}
            placeholder="About Doctor"
            className="border p-2 rounded-md w-full mt-4 h-24"
          ></textarea>

          <div className="mt-6">
            <button
              onClick={handleUpdate}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
              Update Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;
