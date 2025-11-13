import { useAuthStore } from '../store/auth.store';
import { useNavigate, Link } from 'react-router-dom';

export const Navbar = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <h1 className="text-2xl font-bold text-primary-600">AriStay</h1>
            <div className="hidden md:flex space-x-6">
              <Link to="/dashboard" className="text-gray-700 hover:text-primary-600 transition">Dashboard</Link>
              <Link to="/properties" className="text-gray-700 hover:text-primary-600 transition">Properties</Link>
              <Link to="/incidents" className="text-gray-700 hover:text-primary-600 transition">Incidents</Link>
              <Link to="/inventory" className="text-gray-700 hover:text-primary-600 transition">Inventory</Link>
              <Link to="/laundry" className="text-gray-700 hover:text-primary-600 transition">Laundry</Link>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {user && (
              <>
                <span className="text-sm text-gray-700">{user.full_name}</span>
                <span className="text-xs bg-primary-100 text-primary-700 px-3 py-1 rounded-full">
                  {user.role}
                </span>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
