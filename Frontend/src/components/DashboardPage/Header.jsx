import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Menu } from 'lucide-react';
import { Link } from "react-router-dom";

const Header = ({ activeTab, setIsMobileSidebarOpen }) => {
  const [showCreateModal, setShowCreateModal] = useState(false);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="bg-white border-b border-gray-200 px-4 py-3 sm:px-6 sm:py-4 w-full"
    >
      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* Left section: Menu + Title */}
        <div className="flex items-center space-x-4">
          {/* Hamburger Menu - visible only on small screens */}
          <button
            className="lg:hidden text-gray-500"
            onClick={() => setIsMobileSidebarOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>

          <div>
            <h2 className="text-xl font-bold text-gray-900 capitalize">{activeTab}</h2>
            <p className="text-gray-500 text-sm hidden sm:block">
              Manage your events efficiently
            </p>
          </div>
        </div>

        {/* Right section: Create Event Button */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center"
        >
          <Link
            to="/create-event"
            className="flex items-center px-3 py-2 sm:px-4 sm:py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm sm:text-base"
          >
            <Plus className="w-5 h-5" />
            <span className="hidden sm:inline ml-2">Create Event</span>
          </Link>
        </motion.div>
      </div>
    </motion.header>
  );
};

export default Header;