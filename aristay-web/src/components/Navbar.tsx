import { NavLink, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/auth.store";

const Navbar = () => {
  const navigate = useNavigate();
  const { logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navLinkClasses = ({ isActive }: { isActive: boolean }) => 
    `flex items-center px-4 py-3 text-gray-200 hover:bg-gray-700 rounded-lg transition-colors ${
      isActive ? "bg-gray-700 font-bold" : ""
    }`;

  return (
    <div className="w-64 bg-gray-800 text-white flex flex-col p-4">
      <div className="text-2xl font-bold mb-10 text-center">AriStay</div>
      <nav className="flex flex-col space-y-3">
        <NavLink to="/" className={navLinkClasses}>
          Bảng điều khiển
        </NavLink>
        <NavLink to="/properties" className={navLinkClasses}>
          Bất động sản
        </NavLink>
        <NavLink to="/incidents" className={navLinkClasses}>
          Sự cố
        </NavLink>
        <NavLink to="/inventory" className={navLinkClasses}>
          Kho
        </NavLink>
        <NavLink to="/laundry" className={navLinkClasses}>
          Giặt ủi
        </NavLink>
      </nav>
      <div className="mt-auto">
        <button 
          onClick={handleLogout} 
          className="w-full px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          Đăng xuất
        </button>
      </div>
    </div>
  );
};

export default Navbar;
