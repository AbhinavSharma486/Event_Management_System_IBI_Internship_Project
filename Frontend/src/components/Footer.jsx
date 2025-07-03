import React from 'react';
import { Calendar, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer id="contact" className="bg-gray-900 text-white p-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl flex items-center justify-center">
                <Calendar className="h-5 w-5 text-white" />
              </div>
              <span className="ml-3 text-xl font-bold">EventFlow</span>
            </div>
            <p className="text-gray-300 text-base leading-relaxed mb-6 max-w-md">
              The most intuitive event management platform for modern teams. Create, manage, and analyze events with powerful tools.
            </p>
            <div className="flex items-center gap-4">
              <div className="flex items-center">
                <Mail className="h-4 w-4 text-purple-400 mr-2" />
                <a href="mailto:hello@eventflow.com" className="text-gray-300 hover:text-white transition-colors">
                  hello@eventflow.com
                </a>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex justify-start md:justify-end">
            <div>
              <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
              <div className="flex gap-3">
                <span
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-purple-600 transition-all duration-300 group"
                >
                  <Linkedin className="h-5 w-5 group-hover:scale-110 transition-transform" />
                </span>
                <span
                  className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-purple-600 transition-all duration-300 group"
                >
                  <Mail className="h-5 w-5 group-hover:scale-110 transition-transform" />
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 pt-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} EventFlow. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <span
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                Privacy Policy
              </span>
              <span
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                Terms of Service
              </span>
              <span
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                Cookie Policy
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;