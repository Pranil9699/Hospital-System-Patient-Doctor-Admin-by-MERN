import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { doctorLogin } from "../../api/adminDoctorApi";

const DoctorLogin = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await doctorLogin(formData);
    if (res.success) {
      localStorage.setItem("doctor", JSON.stringify(res.data));
      navigate("/doctor/dashboard");
    } else {
      alert(res.message);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <div className="bg-white p-8 shadow-md rounded-2xl w-full max-w-sm">
        <h2 className="text-xl font-semibold text-center mb-6">Doctor Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            value={formData.email}
            className="w-full border rounded-md p-2"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            value={formData.password}
            className="w-full border rounded-md p-2"
          />
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
          >
            Login
          </button>
        </form>

        <p
          onClick={() => navigate("/admin/login")}
          className="text-sm text-center mt-4 text-green-500 cursor-pointer"
        >
          Go to Admin Login
        </p>
      </div>
    </div>
  );
};

export default DoctorLogin;
