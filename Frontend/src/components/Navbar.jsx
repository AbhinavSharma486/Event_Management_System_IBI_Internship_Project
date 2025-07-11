import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, Menu, Sun, Moon, X } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";

import { logout } from "../slices/authSlice";
import { persistor } from "../store";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [darkMode, setDarkMode] = useState(() => {

    if (typeof window !== 'undefined') {

      const saved = localStorage.getItem('theme');

      if (saved) return saved === 'dark';

      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const currentUser = useSelector(state => state.auth.currentUser);
  const isAuthenticated = !!currentUser;

  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  // Helper to handle restriceted navigation 
  const handleRestrictedNav = (path) => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: path } });
    }
    else {
      navigate(path);
    }
  };

  // Logout handler 
  const handleLogout = async () => {
    try {
      await dispatch(logout());
      persistor.purge();
      navigate('/login', { state: { showLogoutToast: true } });
    } catch (error) {
      toast.error('Logout Failed. Please try again.');
    }
  };

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }
    else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode((d) => !d);

  const navLinks = [
    { name: 'Events', to: '/events' },
    { name: 'Calendar', to: '/calendar' },
    { name: 'Profile', to: '/profile' }
  ];

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/70 dark:bg-gray-900/70 backdrop-blur border-b border-gray-200 dark:border-gray-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between h-16">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 flex-shrink-0">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
            <Calendar className="h-6 w-6 text-white cursor-pointer" />
          </div>
          <span className="text-2xl font-extrabold bg-gradient-to-r from-blue-500 via-pink-500 to-purple-500 bg-clip-text text-transparent tracking-tight">EventFlow</span>
        </Link>

        {/* Desktop Nav Centered */}
        <div className="hidden md:flex flex-1 items-center justify-center gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`px-4 py-2 rounded-lg font-semibold text-base transition-colors duration-150 ${location.pathname === link.to ? 'bg-primary text-gray-900 dark:text-white shadow' : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800'}`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Dark Mode Toggle & Auth Buttons Right */}
        <div className="hidden md:flex items-center flex-shrink-0 gap-2">
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-primary transition"
            aria-label="Toggle dark mode"
          >
            {darkMode ? <Sun className="h-5 w-5 text-white" /> : <Moon className="h-5 w-5 text-black" />}
          </button>
          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="ml-3 px-4 py-2 rounded-lg font-semibold text-base bg-white text-blue-600 border border-blue-500 hover:bg-blue-50 transition shadow"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="ml-3 px-4 py-2 rounded-lg font-semibold text-base bg-gradient-to-r from-blue-500 to-pink-500 text-white hover:from-blue-600 hover:to-pink-600 transition shadow"
            >
              Sign In
            </Link>
          )}
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden flex items-center">
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-gray-700 dark:text-gray-200 focus:outline-none">
            <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white/90 dark:bg-gray-900/90 backdrop-blur border-b border-gray-200 dark:border-gray-800 shadow-lg px-4 pt-2 pb-4 space-y-2 animate-fade-in-down">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`block px-4 py-2 rounded-lg font-semibold text-base transition-colors duration-150 ${location.pathname === link.to ? 'bg-primary text-gray-900 dark:text-white shadow' : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800'}`}
              onClick={() => { handleRestrictedNav(link.to); setIsMobileMenuOpen(false); }}
            >
              {link.name}
            </Link>
          ))}
          <button
            onClick={() => {
              toggleDarkMode();
              setIsMobileMenuOpen(false);
            }}
            className="w-full flex items-center gap-2 p-2 rounded-lg font-semibold text-base bg-gray-100 dark:bg-gray-800 hover:bg-primary transition mt-2 text-gray-700 dark:text-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            aria-label="Toggle dark mode"
          >
            {darkMode ? (
              <>
                <Sun className="h-5 w-5 text-yellow-400" />
                <span className="text-black dark:text-white">Light Mode</span>
              </>
            ) : (
              <>
                <Moon className="h-5 w-5 text-black" />
                <span className="text-black dark:text-white">Dark Mode</span>
              </>
            )}
          </button>
          {isAuthenticated ? (
            <button
              onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }}
              className="w-full mt-2 px-4 py-2 rounded-lg font-semibold text-base bg-blue-600 text-white hover:bg-blue-700 transition shadow"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full mt-2 block px-4 py-2 rounded-lg font-semibold text-base bg-gradient-to-r from-blue-500 to-pink-500 text-white hover:from-blue-600 hover:to-pink-600 transition shadow text-center"
            >
              Sign In
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;