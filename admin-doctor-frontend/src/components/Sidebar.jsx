import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  LogOut,
  LayoutDashboard,
  CalendarDays,
  UserPlus,
  Users,
  Menu,
  X,
} from "lucide-react";
import { logoutUser } from "../api/adminDoctorApi";

const Sidebar = ({ role = "admin" }) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => setIsOpen(!isOpen);

  const adminLinks = [
    { name: "Dashboard", path: "/admin/dashboard", icon: <LayoutDashboard size={18} /> },
    { name: "Appointments", path: "/admin/appointments", icon: <CalendarDays size={18} /> },
    { name: "Doctors", path: "/admin/doctors", icon: <Users size={18} /> },
    { name: "Add Doctor", path: "/admin/add-doctor", icon: <UserPlus size={18} /> },
  ];

  const doctorLinks = [
    { name: "Dashboard", path: "/doctor/dashboard", icon: <LayoutDashboard size={18} /> },
    // { name: "Appointments", path: "/doctor/appointments", icon: <CalendarDays size={18} /> },
    // { name: "Patients", path: "/doctor/patients", icon: <Users size={18} /> },
    { name: "Profile", path: "/doctor/profile", icon: <UserPlus size={18} /> },
  ];

  const links = role === "admin" ? adminLinks : doctorLinks;

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden fixed top-4 left-4 z-50 bg-blue-600 text-white p-2 rounded-md shadow-md"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed lg:static top-0 left-0 h-full bg-gradient-to-b from-blue-600 to-blue-800 text-white z-40 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 transition-transform duration-300 w-64 flex flex-col justify-between shadow-xl`}
      >
        {/* Top Section */}
        <div>
          <div className="flex items-center justify-center py-6 border-b border-blue-400">
            <h1 className="text-xl font-bold uppercase tracking-wide">
              {role === "admin" ? "Admin Panel" : "Doctor Panel"}
            </h1>
          </div>

          {/* Links */}
          <nav className="mt-4">
            {links.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)} // auto close on mobile
                className={({ isActive }) =>
                  `flex items-center gap-3 px-5 py-3 transition-all duration-200 ${
                    isActive
                      ? "bg-blue-900 text-white font-semibold"
                      : "text-blue-100 hover:bg-blue-700"
                  }`
                }
              >
                {link.icon}
                {link.name}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Logout */}
        <div className="border-t border-blue-400">
          <button
            onClick={() => logoutUser(role)}
            className="w-full flex items-center gap-3 px-5 py-3 text-blue-100 hover:bg-blue-700 transition-all duration-200"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
