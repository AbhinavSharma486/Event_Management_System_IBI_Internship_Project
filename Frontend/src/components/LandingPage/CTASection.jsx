import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Rocket, CheckCircle, Shield, Clock, TrendingUp } from 'lucide-react';

const CTASection = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-700 relative overflow-hidden animate-gradient">
      <div className="absolute inset-0">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-yellow-400/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white mb-6 sm:mb-8">
            <Rocket className="h-4 w-4 mr-2" />
            <span className="text-sm font-medium">Ready to get started?</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
            Start creating amazing events today
          </h2>
          <p className="text-lg sm:text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            Join thousands of event organizers who create unforgettable experiences with EventFlow.
            Start your free trial today and see the difference.
          </p>

          <div className="flex flex-col items-center justify-center space-y-6 mb-8">
            <Link
              to="/register"
              className="group inline-flex items-center px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg font-semibold text-purple-700 bg-white rounded-xl hover:bg-gray-50 transition-all duration-200 shadow-xl hover:shadow-2xl hover:scale-105"
            >
              Start Free Trial
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>

            <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-purple-100">
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 mr-2" />
                <span className="text-xs sm:text-sm">No credit card required</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 mr-2" />
                <span className="text-xs sm:text-sm">14-day free trial</span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-4 sm:gap-8 text-purple-200 text-xs sm:text-sm">
            <div className="flex items-center">
              <Shield className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
              <span>Enterprise Security</span>
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
              <span>24/7 Support</span>
            </div>
            <div className="flex items-center">
              <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
              <span>99.9% Uptime</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;