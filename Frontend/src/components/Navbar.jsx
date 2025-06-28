import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Calendar, Menu, X,
} from 'lucide-react';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="absolute top-0 w-full z-50">
      <div className="relative z-10">
        {/* Navigation */}
        <nav className="flex items-center justify-between p-4 sm:p-6 lg:px-8">
          <Link to="/" className="flex items-center">
            <div className="w-8 h-8 sm:w-10 sm:h-10 backdrop-blur-sm rounded-xl flex items-center justify-center">
              <Calendar className="h-5 w-5 sm:h-6 sm:w-6 text-white cursor-pointer" />
            </div>
            <span className="ml-2 sm:ml-3 text-2xl sm:text-2xl font-bold text-white cursor-pointer">EventFlow</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4 lg:space-x-8 font-bold text-xl">
            <Link to="/events" className="text-white hover:text-purple-200 transition-colors duration-200">
              Events
            </Link>
            <Link to="/calendar" className="text-white hover:text-purple-200 transition-colors duration-200">
              Calendar
            </Link>
            <Link to="/profile" className="text-white hover:text-purple-200 transition-colors duration-200">
              Profile
            </Link>
            <Link to="/dashboard" className="text-white hover:text-purple-200 transition-colors duration-200">
              Dashboard
            </Link>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4 font-bold text-xl">
            <Link
              to="/login"
              className="bg-white/20 backdrop-blur-2xl text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg hover:bg-white/30 transition-all duration-200 text-sm sm:text-base"
            >
              Sign In
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white focus:outline-none"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </nav>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="md:hidden fixed inset-0 bg-white/10 backdrop-blur-lg z-50 flex flex-col items-center justify-center space-y-6"
          >
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute top-4 right-4 text-black focus:outline-none p-2 rounded-full hover:bg-white/10"
            >
              <X className="h-8 w-8" />
            </button>

            {/* Same consideration for #features, #testimonials, #contact as above */}
            <Link
              to="/events"
              className="text-black text-2xl font-semibold hover:text-purple-200 transition-colors duration-200"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Events
            </Link>
            <Link
              to="/calendar"
              className="text-black text-2xl font-semibold hover:text-purple-200 transition-colors duration-200"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Calendar
            </Link>
            <Link
              to="/profile"
              className="text-black text-2xl font-semibold hover:text-purple-200 transition-colors duration-200"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Profile
            </Link>
            <Link
              to="/dashboard"
              className="text-black text-2xl font-semibold hover:text-purple-200 transition-colors duration-200"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Dashboard
            </Link>
            <Link
              to="/login"
              className="bg-amber-500 backdrop-blur-sm text-black px-6 py-3 rounded-lg hover:bg-white/30 transition-all duration-200 text-2xl font-semibold"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Sign In
            </Link>
          </motion.div>
        )}

      </div>
    </header >
  );
};

export default Navbar;