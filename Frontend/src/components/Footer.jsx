import React from 'react';
import { Calendar, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer id="contact" className="bg-gray-900 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Row 1 - Company Info + Links */}
        <div className="flex flex-col md:flex-row md:justify-between gap-8 mb-6">
          {/* Company Info */}
          <div className="md:w-1/3">
            <div className="flex items-center mb-3">
              <div className="w-7 h-7 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl flex items-center justify-center">
                <Calendar className="h-4 w-4 text-white" />
              </div>
              <span className="ml-2 text-lg font-semibold">EventFlow</span>
            </div>
            <p className="text-gray-400 text-sm mb-3">
              The most intuitive event management platform for modern teams. Create, manage, and analyze events with powerful tools.
            </p>
            <div className="flex space-x-3">
              <a
                href="https://www.linkedin.com/company/eventflow"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href="mailto:hello@eventflow.com"
                className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Product + Support */}
          <div className="flex flex-col sm:flex-row md:w-2/3 gap-8 sm:gap-12">
            <div className="flex-1">
              <h3 className="text-base font-semibold mb-2">Product</h3>
              <ul className="space-y-1 text-sm">
                <li>
                  <a href="#features" className="text-gray-400 hover:text-white transition-colors">Features</a>
                </li>
              </ul>
            </div>
            <div className="flex-1">
              <h3 className="text-base font-semibold mb-2">Support</h3>
              <ul className="space-y-1 text-sm">
                <li>
                  <a href="/help-center" className="text-gray-400 hover:text-white transition-colors">Help Center</a>
                </li>
                <li>
                  <a href="#contact" className="text-gray-400 hover:text-white transition-colors">Contact Us</a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Row 2 - Contact Info */}
        <div className="border-t border-gray-800 pt-4 mb-4">
          <div className="flex items-center justify-center md:justify-start">
            <Mail className="h-4 w-4 text-purple-400 mr-2" />
            <span className="text-gray-400 text-sm">hello@eventflow.com</span>
          </div>
        </div>

        {/* Row 3 - Bottom Footer */}
        <div className="border-t border-gray-800 pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
          <p className="text-gray-400 text-center sm:text-left">
            © {new Date().getFullYear()} EventFlow. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-1">
            <a href="/privacy-policy" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
            <a href="/terms-of-service" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a>
            <a href="/cookie-policy" className="text-gray-400 hover:text-white transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;