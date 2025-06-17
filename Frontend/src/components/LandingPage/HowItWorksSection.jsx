import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Users, BarChart3, Rocket } from 'lucide-react';

const HowItWorksSection = () => {
  const steps = [
    {
      step: '01',
      title: 'Create Your Event',
      description: 'Use our intuitive builder to create stunning events with custom branding, descriptions, and media.',
      icon: Calendar,
      color: 'from-purple-500 to-blue-500',
    },
    {
      step: '02',
      title: 'Manage Attendees',
      description: 'Send invitations, track RSVPs, and manage check-ins with our powerful attendee management tools.',
      icon: Users,
      color: 'from-blue-500 to-green-500',
    },
    {
      step: '03',
      title: 'Analyze & Improve',
      description: 'Get detailed insights and analytics to understand your audience and improve future events.',
      icon: BarChart3,
      color: 'from-green-500 to-purple-500',
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 rounded-full text-blue-700 mb-6 text-sm font-medium">
            <Rocket className="h-4 w-4 mr-2" />
            <span>Simple Process</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            How EventFlow Works
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Get started in minutes with our intuitive three-step process
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 md:gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="flex flex-col items-center text-center">
                <div className="relative mb-8">
                  <div className={`absolute inset-0 bg-gradient-to-br ${step.color} blur-xl opacity-30 rounded-full`}></div>
                  <div className={`relative w-24 h-24 bg-gradient-to-br ${step.color} rounded-full flex items-center justify-center shadow-lg`}>
                    <step.icon className="h-10 w-10 text-white" />
                  </div>
                </div>

                <div className="mb-4">
                  <span className="text-sm font-bold text-gray-500">STEP {step.step}</span>
                  <h3 className="text-xl font-bold text-gray-900 mt-2">{step.title}</h3>
                </div>

                <p className="text-gray-600">{step.description}</p>
              </div>

              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-16 right-0 translate-x-1/2">
                  <div className="h-0.5 w-16 bg-gradient-to-r from-blue-400 to-purple-400"></div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;