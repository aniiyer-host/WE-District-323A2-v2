import React, { useState, useRef, useEffect } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { User, LogOut, Menu, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);

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

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    setIsDropdownOpen(false);
    setIsMobileMenuOpen(false);
    navigate('/');
  };

  // Extract initials from club name
  const getInitials = (clubName) => {
    if (!clubName) return 'CU';
    const words = clubName.split(/[\s_-]+/);
    if (words.length >= 2) {
      return (words[0][0] + words[1][0]).toUpperCase();
    } else if (words.length === 1 && words[0].length >= 2) {
      return words[0].substring(0, 2).toUpperCase();
    }
    return clubName.substring(0, 2).toUpperCase();
  };

  return (
    <>
      {/* ── DESKTOP / LANDSCAPE NAV (pill style, centered) ── */}
      <nav className="we-nav-desktop fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-white/80 backdrop-blur-xl rounded-full shadow-2xl border border-purple-100">
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

      {/* ── MOBILE PORTRAIT NAV ── */}
      <div className="we-nav-mobile fixed top-0 left-0 right-0 z-50" ref={mobileMenuRef}>
        {/* Top bar */}
        <div className="flex items-center justify-between px-4 py-3 bg-white/90 backdrop-blur-xl border-b border-purple-100 shadow-md">
          {/* Brand / Logo text */}
          <span
            className="font-bold text-transparent bg-clip-text we-nav-brand"
            style={{
              backgroundImage: 'linear-gradient(to right, #9333ea, #ec4899)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            Women Epitome
          </span>

          <div className="flex items-center gap-3">
            {/* Profile / Login button (compact) */}
            {isAuthenticated && user?.role === 'club' ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full shadow-lg flex items-center justify-center text-white transition-all duration-300 hover:scale-110"
                  aria-label="Profile Menu"
                >
                  <span className="text-xs font-bold">{getInitials(user?.club_name)}</span>
                </button>

                {isDropdownOpen && (
                  <div className="absolute top-12 right-0 w-56 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-purple-100 overflow-hidden">
                    <div className="px-5 py-3 bg-gradient-to-r from-purple-600 to-pink-600">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center">
                          <User size={18} className="text-white" />
                        </div>
                        <div>
                          <p className="text-white font-semibold text-sm">{user?.club_name || 'Club User'}</p>
                          <p className="text-white/80 text-xs">Club Account</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-2">
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-purple-50 transition-all duration-300 group"
                      >
                        <LogOut size={16} className="text-purple-600 group-hover:scale-110 transition-transform" />
                        <span className="font-medium text-sm">Logout</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => navigate('/login')}
                className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full shadow-lg flex items-center justify-center text-white transition-all duration-300 hover:scale-110"
                aria-label="Login"
              >
                <User size={18} />
              </button>
            )}

            {/* Hamburger toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="w-10 h-10 rounded-full flex items-center justify-center text-purple-700 bg-purple-50 hover:bg-purple-100 transition-all duration-300"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Slide-down menu */}
        {isMobileMenuOpen && (
          <div className="bg-white/95 backdrop-blur-xl border-b border-purple-100 shadow-lg px-4 py-3 flex flex-col gap-1">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={`px-4 py-3 rounded-xl font-semibold text-sm transition-all duration-300 ${isActive(item.path)
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md'
                    : 'text-gray-700 hover:bg-purple-50'
                  }`}
              >
                {item.name}
              </NavLink>
            ))}
          </div>
        )}
      </div>

      {/* ── DESKTOP PROFILE BUTTON (only shown in desktop/landscape view) ── */}
      {isAuthenticated && user?.role === 'club' ? (
        <div className="we-nav-desktop fixed top-4 right-8 z-50" ref={dropdownRef}>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="w-14 h-14 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full shadow-2xl flex items-center justify-center text-white transition-all duration-300 hover:shadow-xl hover:scale-110"
            aria-label="Profile Menu"
          >
            <span className="text-sm font-bold">{getInitials(user?.club_name)}</span>
          </button>

          {isDropdownOpen && (
            <div className="absolute top-16 right-0 w-64 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-purple-100 overflow-hidden animate-fadeIn">
              <div className="px-6 py-4 bg-gradient-to-r from-purple-600 to-pink-600">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <User size={24} className="text-white" />
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">{user?.club_name || 'Club User'}</p>
                    <p className="text-white/80 text-xs">Club Account</p>
                  </div>
                </div>
              </div>
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
        <button
          onClick={() => navigate('/login')}
          className="we-nav-desktop fixed top-4 right-8 z-50 w-14 h-14 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full shadow-2xl flex items-center justify-center text-white transition-all duration-300 hover:shadow-xl hover:scale-110"
          aria-label="Login"
        >
          <User size={24} />
        </button>
      )}

      <style>{`
        /* Show pill nav on desktop / landscape; hide mobile bar */
        .we-nav-desktop { display: flex; }
        .we-nav-mobile  { display: none; }

        /* Portrait mobile: ≤ 640px wide */
        @media (max-width: 640px) and (orientation: portrait) {
          .we-nav-desktop { display: none !important; }
          .we-nav-mobile  { display: block !important; }
        }

        /* Also cover phones in landscape that are very short */
        @media (max-width: 480px) {
          .we-nav-desktop { display: none !important; }
          .we-nav-mobile  { display: block !important; }
        }

        .we-nav-brand {
          font-size: 1.1rem;
          letter-spacing: 0.02em;
        }
      `}</style>
    </>
  );
};

export default Navigation;
