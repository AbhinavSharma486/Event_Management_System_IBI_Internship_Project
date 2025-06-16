import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

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

// Local data
const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Event Coordinator',
    company: 'TechCorp',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah',
    quote: 'EventFlow transformed how we manage our corporate events. The analytics dashboard is incredible!',
    rating: 5,
  },
  {
    name: 'Michael Chen',
    role: 'Marketing Director',
    company: 'StartupXYZ',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=michael',
    quote: 'The user experience is phenomenal. Our team adopted it immediately without any training.',
    rating: 5,
  },
  {
    name: 'Emma Rodriguez',
    role: 'Conference Organizer',
    company: 'EventPro',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=emma',
    quote: 'Managing 1000+ attendees has never been easier. The automation features save us hours of work.',
    rating: 5,
  },
  {
    name: 'David Kim',
    role: 'Community Manager',
    company: 'InnovateLab',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=david',
    quote: 'The calendar integration and mobile app make event management seamless across all platforms.',
    rating: 5,
  },
];

const TestimonialsSection = () => {
  return (
    <div className="py-16 sm:py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16 sm:mb-20">
          <motion.h2
            initial="initial"
            whileInView="whileInView"
            variants={fadeUpVariants}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900"
          >
            Trusted by Event Professionals
          </motion.h2>
          <motion.p
            initial="initial"
            whileInView="whileInView"
            variants={fadeUpVariants}
            viewport={{ once: true }}
            className="mt-4 text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto"
          >
            Join thousands of event creators who have transformed their workflow.
          </motion.p>
        </div>

        <motion.div
          initial="initial"
          whileInView="whileInView"
          variants={staggerContainerVariants}
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-gray-50 rounded-xl p-6 shadow-md border border-gray-100"
            >
              <div className="flex items-center mb-4">
                <img src={testimonial.image} alt={testimonial.name} className="w-12 h-12 rounded-full" />
                <div className="ml-4">
                  <h3 className="font-bold text-gray-900">{testimonial.name}</h3>
                  <p className="text-sm text-gray-600">{testimonial.role}, {testimonial.company}</p>
                </div>
              </div>
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                  />
                ))}
              </div>
              <p className="text-gray-600 italic">"{testimonial.quote}"</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default TestimonialsSection;