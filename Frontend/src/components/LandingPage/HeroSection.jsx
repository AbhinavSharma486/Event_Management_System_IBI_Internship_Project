// HeroSection.js
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Sparkles, ArrowRight, Play, Calendar, Users, Shield, Globe
} from 'lucide-react';

// Define animation variants locally
const fadeUpVariants = {
  initial: { opacity: 0, y: 50 },
  whileInView: { opacity: 1, y: 0, transition: { duration: 1.0, ease: "easeOut" } },
};

const staggerContainerVariants = {
  initial: { opacity: 0 },
  whileInView: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

// Local stats data
const stats = [
  { number: '50K+', label: 'Events Created', icon: 'Calendar' },
  { number: '2M+', label: 'Happy Attendees', icon: 'Users' },
  { number: '99.9%', label: 'Uptime', icon: 'Shield' },
  { number: '150+', label: 'Countries', icon: 'Globe' },
];

// Local icons mapping
const icons = {
  Sparkles, ArrowRight, Play, Calendar, Users, Shield, Globe
};

const HeroSection = () => {
  const getIconComponent = (iconName) => {
    return icons[iconName] || null;
  };

  return (
    <div className="px-6 pt-24 pb-16 sm:pt-32 sm:pb-24 lg:px-8 relative z-10 bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700">

      <motion.div
        initial="initial"
        animate="whileInView"
        variants={fadeUpVariants}
        className="mx-auto max-w-5xl text-center"
      >
        <div className="inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 bg-white/10 backdrop-blur-sm rounded-full text-white mb-6 sm:mb-8">
          <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
          <span className="text-xs sm:text-sm font-medium">New: AI-powered event recommendations</span>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-6 sm:mb-8 leading-tight">
          Create Amazing
          <span className="block bg-gradient-to-r from-yellow-400 to-pink-400 bg-clip-text text-transparent">
            Events
          </span>
          Effortlessly
        </h1>

        <p className="text-base sm:text-xl lg:text-2xl text-purple-100 mb-8 sm:mb-12 max-w-4xl mx-auto leading-relaxed">
          The most intuitive event management platform for modern teams.
          Create, manage, and analyze events with powerful tools designed for success.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-8 sm:mb-12">
          <Link
            to="/register"
            className="group inline-flex items-center px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg font-semibold text-purple-700 bg-white rounded-xl hover:bg-gray-50 transition-all duration-200 shadow-xl hover:shadow-2xl hover:scale-105"
          >
            Start Free Trial
            <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <button className="group inline-flex items-center px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg font-semibold text-white border-2 border-white/30 rounded-xl hover:bg-white/10 transition-all duration-200">
            <Play className="mr-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:scale-110 transition-transform" />
            Watch Demo
          </button>
        </div>

        {/* Hero Stats */}
        <motion.div
          initial="initial"
          whileInView="whileInView"
          variants={staggerContainerVariants}
          viewport={{ once: true, amount: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 max-w-3xl mx-auto"
        >
          {stats.map((stat) => {
            const IconComponent = getIconComponent(stat.icon);
            return (
              <motion.div
                key={stat.label}
                variants={itemVariants}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-white/20 backdrop-blur-sm rounded-lg mb-2 sm:mb-3">
                  {IconComponent && <IconComponent className="h-5 w-5 sm:h-6 sm:w-6 text-white" />}
                </div>
                <div className="text-xl sm:text-2xl font-bold text-white">{stat.number}</div>
                <div className="text-purple-200 text-xs sm:text-sm">{stat.label}</div>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default HeroSection;