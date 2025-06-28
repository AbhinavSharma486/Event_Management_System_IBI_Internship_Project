import React from 'react';
import { motion } from 'framer-motion';

const StatCard = ({ label, value, icon, gradient, bg }) => {
  const IconComponent = ({ iconName, className }) => {
    const baseIconClass = `text-white ${className}`;

    switch (iconName) {
      case 'Calendar':
        return (
          <svg className={baseIconClass} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        );
      case 'Users':
        return (
          <svg className={baseIconClass} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        );
      case 'TrendingUp':
        return (
          <svg className={baseIconClass} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
        );
      case 'Eye':
        return (
          <svg className={baseIconClass} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <motion.div
      whileHover={{
        y: -4,
        scale: 1.01,
        transition: { type: "spring", stiffness: 400, damping: 25 }
      }}
      whileTap={{ scale: 0.98 }}
      className="group relative overflow-hidden w-full h-full"
    >
      <div
        className={`relative bg-gradient-to-br ${bg} 
        min-h-[7rem] p-3 sm:p-4
        rounded-xl border border-white/20 
        shadow-lg hover:shadow-xl transition-all duration-300
        flex flex-col items-center justify-between h-full
        pb-4`}
      >
        {/* Icon container - top */}
        <div className={`
          p-2 sm:p-2.5 md:p-3
          rounded-md sm:rounded-lg
          bg-gradient-to-r ${gradient} shadow-md group-hover:shadow-lg 
          transition-all duration-300 group-hover:scale-105
          mb-2 sm:mb-3`}  
        >
          <IconComponent
            iconName={icon}
            className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7"
          />
        </div>

        {/* Text content - centered */}
        <div className="flex flex-col items-center justify-center w-full px-1 flex-grow">
          <p className="text-xs sm:text-sm font-medium text-gray-600 group-hover:text-gray-700 transition-colors">
            {label}
          </p>
          <p className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mt-1 truncate max-w-full">
            {value}
          </p>
        </div>

        {/* Bottom accent line */}
        <div className="absolute bottom-0 left-0 right-0 h-0.5 sm:h-1 bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>
      </div>
    </motion.div>
  );
};

export default StatCard;