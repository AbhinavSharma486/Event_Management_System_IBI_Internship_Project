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
            <span className="ml-2 sm:ml-3 text-xl sm:text-2xl font-bold text-white cursor-pointer">EventFlow</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4 lg:space-x-8">
            <a href="#features" className="text-white hover:text-purple-200 transition-colors duration-200">
              Features
            </a>
            <a href="#testimonials" className="text-white hover:text-purple-200 transition-colors duration-200">
              Reviews
            </a>
            <a href="#contact" className="text-white hover:text-purple-200 transition-colors duration-200">
              Contact
            </a>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/login"
              className="text-white hover:text-purple-200 transition-colors duration-200"
            >
              Sign in
            </Link>
            <Link
              to="/register"
              className="bg-white/20 backdrop-blur-sm text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg hover:bg-white/30 transition-all duration-200 text-sm sm:text-base"
            >
              Get Started
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
              className="absolute top-4 right-4 text-white focus:outline-none p-2 rounded-full hover:bg-white/10"
            >
              <X className="h-8 w-8" />
            </button>

            <a
              href="#features"
              className="text-white text-2xl font-semibold hover:text-purple-200 transition-colors duration-200"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Features
            </a>
            <a
              href="#testimonials"
              className="text-white text-2xl font-semibold hover:text-purple-200 transition-colors duration-200"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Reviews
            </a>
            <a
              href="#contact"
              className="text-white text-2xl font-semibold hover:text-purple-200 transition-colors duration-200"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact
            </a>
            <Link
              to="/login"
              className="text-white text-2xl font-semibold hover:text-purple-200 transition-colors duration-200"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Sign in
            </Link>
            <Link
              to="/register"
              className="bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-lg hover:bg-white/30 transition-all duration-200 text-2xl font-semibold"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Get Started
            </Link>
          </motion.div>
        )}

      </div>
    </header >
  );
};

export default Navbar;