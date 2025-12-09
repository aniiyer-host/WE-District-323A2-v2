import React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { User } from 'lucide-react';

const Navigation = () => {
  const location = useLocation();
  const navigate = useNavigate();

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

      {/* Circular Login Button */}
      <button
        onClick={() => navigate('/login')}
        className="fixed top-4 right-8 z-50 w-14 h-14 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full shadow-2xl flex items-center justify-center text-white transition-all duration-300 hover:shadow-xl hover:scale-110"
        aria-label="Login"
      >
        <User size={24} />
      </button>
    </>
  );
};

export default Navigation;
