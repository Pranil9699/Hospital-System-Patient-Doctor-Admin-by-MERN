// DoctorLayout.jsx
import Sidebar from "../../components/Sidebar";

const DoctorLayout = ({ children }) => (
  <div className="flex">
    {/* <Sidebar role="doctor" /> */}
    <main className="flex-1 bg-gray-50 p-6 overflow-y-auto">{children}</main>
  </div>
);

export default DoctorLayout;
