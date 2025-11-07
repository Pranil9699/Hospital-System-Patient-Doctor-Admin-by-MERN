// AdminLayout.jsx
import Sidebar from "../../components/Sidebar";

const AdminLayout = ({ children }) => (
  <div className="flex">
    {/* <Sidebar role="admin" /> */}
    <main className="flex-1 bg-gray-50 p-6 overflow-y-auto">{children}</main>
  </div>
);

export default AdminLayout;
