import React, { useState, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [showCollabDropdown, setShowCollabDropdown] = useState(false);
  const timeoutRef = useRef(null);

  const navLinkStyle = (path) =>
    location.pathname === path ? 'text-blue-400 font-semibold' : 'hover:text-blue-400';

  const handleMouseEnter = () => {
    clearTimeout(timeoutRef.current);
    setShowCollabDropdown(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setShowCollabDropdown(false);
    }, 150);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-[#111827] text-white px-6 py-4 flex justify-between items-center shadow-md">
      {/* Logo */}
      <Link to="/dashboard" className="text-2xl font-bold hover:opacity-80">
        <span className="text-blue-400">collab</span>
        <span className="text-white">finder</span>
      </Link>

      {/* Nav Links */}
      <div className="flex items-center gap-6 text-sm">
        <Link to="/dashboard" className={navLinkStyle('/dashboard')}>
          Dashboard
        </Link>

        {/* Collab Dropdown */}
        <div
          className="relative"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <button className={`transition ${navLinkStyle('/collabs')}`}>
            Collabs
          </button>

          {showCollabDropdown && (
            <div className="absolute top-full left-0 mt-2 bg-[#1f2937] shadow-md rounded-lg z-50 w-44">
              <Link
                to="your-collabs"
                className="block px-4 py-2 hover:bg-indigo-600"
                onClick={() => setShowCollabDropdown(false)}
              >
                Your Collabs
              </Link>
              <Link
                to="collabs"
                className="block px-4 py-2 hover:bg-indigo-600"
                onClick={() => setShowCollabDropdown(false)}
              >
                All Collabs
              </Link>
              <Link
                to="your-responses"
                className="block px-4 py-2 hover:bg-indigo-600 rounded-b-lg"
                onClick={() => setShowCollabDropdown(false)}
              >
                Your Responses
              </Link>
            </div>
          )}
        </div>

        <Link to="profile" className={navLinkStyle('/profile')}>
          Profile
        </Link>

        <Link
          to="create-collab"
          className="bg-blue-500 hover:bg-green-600 text-white px-4 py-1 rounded-md text-sm font-semibold transition whitespace-nowrap"
        >
          + Collab
        </Link>

        {/* Simple Notification Icon */}
        <Link to="/dashboard/notifications" className="text-2xl hover:text-yellow-400">
          🔔
        </Link>

        <button onClick={handleLogout} className="hover:text-red-400">
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
