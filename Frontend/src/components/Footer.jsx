import React from 'react';
import { Calendar, Linkedin, Mail, Instagram, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-[#22223b] via-[#4a4e69] to-[#9a8c98] dark:from-[#232946] dark:via-[#121629] dark:to-[#393d63] text-gray-100 dark:text-white pt-8 sm:pt-12 pb-4 sm:pb-6 px-2">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-6 sm:mb-8 text-center sm:text-left place-items-center items-start">

          {/* About */}
          <div className="col-span-1 flex flex-col gap-3 items-center">
            <div className="flex items-center mb-2">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                <Calendar className="h-6 w-6 text-white" />
              </div>
              <span className="ml-3 text-2xl font-extrabold bg-gradient-to-r from-blue-500 via-pink-500 to-purple-500 bg-clip-text text-transparent">EventFlow</span>
            </div>
            <p className="text-gray-200 dark:text-gray-300 text-base leading-relaxed max-w-xs text-center">
              Effortlessly create, manage, and track your events. EventFlow empowers teams and communities to connect, collaborate, and celebrate with ease.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-span-1 flex flex-col items-center">
            <h3 className="text-lg font-bold mb-3 text-white">Quick Links</h3>
            <ul className="space-y-2 text-center mx-auto">
              <li>
                <Link
                  to="/events"
                  className="text-gray-200 hover:text-purple-300 dark:text-gray-300 dark:hover:text-purple-400 transition-colors"
                >
                  Events
                </Link>
              </li>
              <li>
                <Link
                  to="/calendar"
                  className="text-gray-200 hover:text-purple-300 dark:text-gray-300 dark:hover:text-purple-400 transition-colors"
                >
                  Calendar
                </Link>
              </li>
              <li>
                <Link
                  to="/profile"
                  className="text-gray-200 hover:text-purple-300 dark:text-gray-300 dark:hover:text-purple-400 transition-colors"
                >
                  Profile
                </Link>
              </li>
              <li>
                <Link
                  to="/create-event"
                  className="text-gray-200 hover:text-purple-300 dark:text-gray-300 dark:hover:text-purple-400 transition-colors"
                >
                  Create Event
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-1 flex flex-col items-center">
            <h3 className="text-lg font-bold mb-3 text-white">Contact</h3>
            <div className="flex items-center gap-2 mb-2">
              <Mail className="h-5 w-5 text-purple-500" />
              <a href="mailto:support@eventflow.com" className="text-gray-200 hover:text-purple-300 dark:text-gray-300 dark:hover:text-purple-400 transition-colors">support@eventflow.com</a>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-200 dark:text-gray-300">For help & feedback</span>
            </div>
          </div>

          {/* Social */}
          <div className="col-span-1 flex flex-col items-center">
            <h3 className="text-lg font-bold mb-3 text-white">Connect</h3>
            <div className="flex gap-3">
              <a href="#" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/80 dark:bg-gray-800/80 rounded-lg flex items-center justify-center hover:bg-blue-500 hover:text-white dark:hover:bg-blue-600 transition-all duration-300 group shadow">
                <Linkedin className="h-5 w-5 text-[#232946] dark:text-white group-hover:scale-110 transition-transform" />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/80 dark:bg-gray-800/80 rounded-lg flex items-center justify-center hover:bg-pink-500 hover:text-white dark:hover:bg-pink-600 transition-all duration-300 group shadow">
                <Instagram className="h-5 w-5 text-[#232946] dark:text-white group-hover:scale-110 transition-transform" />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/80 dark:bg-gray-800/80 rounded-lg flex items-center justify-center hover:bg-blue-400 hover:text-white dark:hover:bg-blue-500 transition-all duration-300 group shadow">
                <Twitter className="h-5 w-5 text-[#232946] dark:text-white group-hover:scale-110 transition-transform" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-300 dark:border-gray-700 pt-4 sm:pt-6">
          <div className="flex flex-col gap-3 sm:gap-4 md:flex-row md:items-center md:justify-between">
            <p className="text-gray-200 dark:text-gray-300 text-xs sm:text-sm text-center md:text-left">
              © {new Date().getFullYear()} EventFlow. Created by ♥ Abhinav Sharma
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-6 justify-center md:justify-end">
              <a href="#" className="text-gray-200 dark:text-gray-300 hover:text-purple-300 dark:hover:text-purple-400 text-xs sm:text-sm transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-200 dark:text-gray-300 hover:text-purple-300 dark:hover:text-purple-400 text-xs sm:text-sm transition-colors">Terms of Service</a>
              <a href="#" className="text-gray-200 dark:text-gray-300 hover:text-purple-300 dark:hover:text-purple-400 text-xs sm:text-sm transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;