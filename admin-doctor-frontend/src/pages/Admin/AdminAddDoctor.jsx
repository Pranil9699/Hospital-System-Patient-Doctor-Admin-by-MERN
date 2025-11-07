import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import { adminAddDoctor } from "../../api/adminDoctorApi";

const AdminAddDoctor = () => {
  const [doctor, setDoctor] = useState({
    name: "",
    email: "",
    password: "",
    speciality: "",
    degree: "",
    experience: "",
    about: "",
    fees: "",
    address: { line1: "", line2: "" },
    image: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes("address.")) {
      const key = name.split(".")[1];
      setDoctor((prev) => ({
        ...prev,
        address: { ...prev.address, [key]: value },
      }));
    } else {
      setDoctor((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await adminAddDoctor(doctor);
    if (res.success) {
      alert("✅ Doctor added successfully!");
      setDoctor({
        name: "",
        email: "",
        password: "",
        speciality: "",
        degree: "",
        experience: "",
        about: "",
        fees: "",
        address: { line1: "", line2: "" },
        image: "",
      });
    } else {
      alert(res.message || "Failed to add doctor");
    }
  };

  return (
    <div className="flex">
      <Sidebar role="admin" />
      <div className="flex-1 p-8">
        <h1 className="text-2xl font-semibold mb-6">Add New Doctor</h1>
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-xl shadow-md grid grid-cols-2 gap-4 max-w-3xl"
        >
          {[
            { name: "name", placeholder: "Doctor Name" },
            { name: "email", placeholder: "Email" },
            { name: "password", placeholder: "Password", type: "password" },
            { name: "speciality", placeholder: "Speciality" },
            { name: "degree", placeholder: "Degree" },
            { name: "experience", placeholder: "Experience (years)" },
            { name: "fees", placeholder: "Consultation Fee" },
            { name: "address.line1", placeholder: "Address Line 1" },
            { name: "address.line2", placeholder: "Address Line 2" },
            { name: "image", placeholder: "Image URL" },
          ].map((field) => (
            <input
              key={field.name}
              name={field.name}
              value={
                field.name.includes("address.")
                  ? doctor.address[field.name.split(".")[1]]
                  : doctor[field.name]
              }
              onChange={handleChange}
              placeholder={field.placeholder}
              type={field.type || "text"}
              className="border p-2 rounded-md"
              required={["name", "email", "password"].includes(field.name)}
            />
          ))}
          <button
            type="submit"
            className="col-span-2 mt-4 bg-green-600 text-white py-2 rounded-md hover:bg-green-700"
          >
            Add Doctor
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminAddDoctor;
