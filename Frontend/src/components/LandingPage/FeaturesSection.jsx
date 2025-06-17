import React from 'react';
import { motion } from 'framer-motion';
import {
  Calendar, Users, BarChart3, Zap, Shield, Clock
} from 'lucide-react';

// Animation variants
const fadeUpVariants = {
  initial: { opacity: 0, y: 50 },
  whileInView: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.0, ease: "easeOut" },
  },
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
  whileInView: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

// Feature data with gradient colors
const features = [
  {
    icon: Calendar,
    title: 'Smart Event Creation',
    description: 'Create beautiful events with our intuitive drag-and-drop interface and smart templates.',
    color: ['#8b5cf6', '#7c3aed'], // purple
  },
  {
    icon: Users,
    title: 'Attendee Management',
    description: 'Effortlessly manage registrations, check-ins, and communicate with attendees.',
    color: ['#3b82f6', '#2563eb'], // blue
  },
  {
    icon: BarChart3,
    title: 'Advanced Analytics',
    description: 'Get detailed insights on event performance, attendance, and engagement metrics.',
    color: ['#22c55e', '#16a34a'], // green
  },
  {
    icon: Zap,
    title: 'Real-time Updates',
    description: 'Keep everyone informed with instant notifications and live event updates.',
    color: ['#eab308', '#f97316'], // yellow-orange
  },
  {
    icon: Shield,
    title: 'Secure & Reliable',
    description: 'Enterprise-grade security with 99.9% uptime guarantee for your events.',
    color: ['#ef4444', '#ec4899'], // red-pink
  },
  {
    icon: Clock,
    title: 'Time-saving Automation',
    description: 'Automate repetitive tasks and focus on creating memorable experiences.',
    color: ['#6366f1', '#8b5cf6'], // indigo-purple
  },
];

const FeaturesSection = () => {
  return (
    <div id='features' className="py-16 sm:py-24 lg:py-32 bg-gradient-to-b from-[#f0f4ff] via-white to-[#fdfbff]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16 sm:mb-20">
          <motion.h1
            initial="initial"
            whileInView="whileInView"
            variants={fadeUpVariants}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-teal-500 via-pink-500 to-yellow-400 text-transparent bg-clip-text"
          >
            Everything You Need to Succeed
          </motion.h1>

          <motion.p
            initial="initial"
            whileInView="whileInView"
            variants={fadeUpVariants}
            viewport={{ once: true }}
            className="mt-4 text-lg sm:text-xl bg-gradient-to-r from-gray-700 via-neutral-800 to-gray-600 text-transparent bg-clip-text max-w-2xl mx-auto"
          >
            Powerful features designed to make event management simple, efficient, and effective.
          </motion.p>
        </div>

        <motion.div
          initial="initial"
          whileInView="whileInView"
          variants={staggerContainerVariants}
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              className="rounded-2xl shadow-xl transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl"
              style={{
                backgroundImage: `linear-gradient(135deg, ${feature.color[0]}, ${feature.color[1]})`,
              }}
            >
              {/* Overlay content */}
              <div className="bg-white/80 backdrop-blur-md rounded-2xl h-full p-6 sm:p-8 flex flex-col">
                <div
                  className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-lg mb-4 sm:mb-6 text-white"
                  style={{
                    backgroundImage: `linear-gradient(to bottom right, ${feature.color[0]}, ${feature.color[1]})`,
                  }}
                >
                  <feature.icon className="h-6 w-6 sm:h-7 sm:w-7" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-700 flex-grow">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default FeaturesSection;
