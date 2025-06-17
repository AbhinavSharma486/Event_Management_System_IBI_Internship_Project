import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

// Animation variants
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

// Testimonial data
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
    <div id='testimonials' className="py-20 bg-gradient-to-br from-indigo-50 via-white to-pink-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.h1
            initial="initial"
            whileInView="whileInView"
            variants={fadeUpVariants}
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-fuchsia-600 via-amber-500 to-lime-400 text-transparent bg-clip-text"
          >
            Trusted by Event Professionals
          </motion.h1>
          <motion.p
            initial="initial"
            whileInView="whileInView"
            variants={fadeUpVariants}
            viewport={{ once: true }}
            className="mt-4 text-lg sm:text-xl bg-gradient-to-r from-gray-700 to-gray-500 text-transparent bg-clip-text max-w-2xl mx-auto"
          >
            Join thousands of creators who revolutionize events with EventFlow.
          </motion.p>
        </div>

        <motion.div
          initial="initial"
          whileInView="whileInView"
          variants={staggerContainerVariants}
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="rounded-2xl p-6 bg-white/60 backdrop-blur-md border border-white/40 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-center mb-4">
                <img src={testimonial.image} alt={testimonial.name} className="w-12 h-12 rounded-full shadow-sm" />
                <div className="ml-4">
                  <h3 className="font-semibold text-gray-900">{testimonial.name}</h3>
                  <p className="text-sm text-gray-600">{testimonial.role}, {testimonial.company}</p>
                </div>
              </div>
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 transition-transform ${i < testimonial.rating ? 'text-yellow-400 fill-yellow-400 drop-shadow-md' : 'text-gray-300'
                      }`}
                  />
                ))}
              </div>
              <p className="text-gray-700 italic leading-relaxed">"{testimonial.quote}"</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default TestimonialsSection;