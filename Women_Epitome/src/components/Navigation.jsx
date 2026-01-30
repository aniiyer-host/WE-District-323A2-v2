import React, { useState, useRef, useEffect } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { User, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Projects', path: '/projects' },
    { name: 'Clubs', path: '/clubs' },
    { name: 'Contact', path: '/contact' }
  ];

  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  const handleLogout = () => {
    logout();
    setIsDropdownOpen(false);
    navigate('/');
  };

  // Extract initials from club name
  const getInitials = (clubName) => {
    if (!clubName) return 'CU';

    // Split by spaces, underscores, or hyphens
    const words = clubName.split(/[\s_-]+/);

    // Get first letter of first two words, or first two letters if single word
    if (words.length >= 2) {
      return (words[0][0] + words[1][0]).toUpperCase();
    } else if (words.length === 1 && words[0].length >= 2) {
      return words[0].substring(0, 2).toUpperCase();
    }

    return clubName.substring(0, 2).toUpperCase();
  };

  return (
    <>
      <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-white/80 backdrop-blur-xl rounded-full shadow-2xl border border-purple-100">
        <ul className="flex items-center gap-2 px-3 py-2">
          {navItems.map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.path}
                className={`px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300 ${isActive(item.path)
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                  : 'text-gray-700 hover:bg-purple-50'
                  }`}
              >
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* User Profile Dropdown or Login Button */}
      {isAuthenticated && user?.role === 'club' ? (
        <div className="fixed top-4 right-8 z-50" ref={dropdownRef}>
          {/* Profile Button */}
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="w-14 h-14 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full shadow-2xl flex items-center justify-center text-white transition-all duration-300 hover:shadow-xl hover:scale-110"
            aria-label="Profile Menu"
          >
            <span className="text-sm font-bold">{getInitials(user?.club_name)}</span>
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute top-16 right-0 w-64 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-purple-100 overflow-hidden animate-fadeIn">
              {/* Profile Section */}
              <div className="px-6 py-4 bg-gradient-to-r from-purple-600 to-pink-600">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <User size={24} className="text-white" />
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">
                      {user?.club_name || 'Club User'}
                    </p>
                    <p className="text-white/80 text-xs">Club Account</p>
                  </div>
                </div>
              </div>

              {/* Logout Button */}
              <div className="p-2">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-purple-50 transition-all duration-300 group"
                >
                  <LogOut size={18} className="text-purple-600 group-hover:scale-110 transition-transform" />
                  <span className="font-medium text-sm">Logout</span>
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Circular Login Button for non-authenticated users */
        <button
          onClick={() => navigate('/login')}
          className="fixed top-4 right-8 z-50 w-14 h-14 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full shadow-2xl flex items-center justify-center text-white transition-all duration-300 hover:shadow-xl hover:scale-110"
          aria-label="Login"
        >
          <User size={24} />
        </button>
      )}
    </>
  );
};

export default Navigation;
