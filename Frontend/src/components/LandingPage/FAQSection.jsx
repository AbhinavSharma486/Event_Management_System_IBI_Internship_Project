import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const fadeUpVariants = {
  initial: { opacity: 0, y: 50 },
  whileInView: { opacity: 1, y: 0, transition: { duration: 1.0, ease: "easeOut" } },
};

const staggerContainerVariants = {
  initial: { opacity: 0 },
  whileInView: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const faqs = [
  {
    question: 'How quickly can I set up my first event?',
    answer: 'You can create your first event in under 5 minutes using our intuitive event builder and pre-designed templates.',
  },
  {
    question: 'Is there a limit on the number of attendees?',
    answer: 'Our plans range from 50 attendees on the free plan to unlimited attendees on the Enterprise plan. Choose the plan that fits your needs.',
  },
  {
    question: 'Can I customize the branding for my events?',
    answer: 'Yes! Professional and Enterprise plans include custom branding options, including logos, colors, and custom domains.',
  },
  {
    question: 'Do you offer integrations with other tools?',
    answer: 'We integrate with popular tools like Slack, Zoom, Google Calendar, Mailchimp, and many more to streamline your workflow.',
  },
  {
    question: 'What kind of support do you provide?',
    answer: 'We offer email support for all plans, priority support for Professional users, and dedicated support for Enterprise customers.',
  },
  {
    question: 'Can I try EventFlow before purchasing?',
    answer: 'Absolutely! We offer a 14-day free trial with no credit card required. You can explore all features risk-free.',
  },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 sm:py-28 bg-gradient-to-br from-gray-100 to-gray-200">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          className="max-w-3xl mx-auto text-center mb-16 sm:mb-20"
          initial="initial"
          whileInView="whileInView"
          variants={fadeUpVariants}
          viewport={{ once: true }}
        >
          <h1 className="group text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 bg-clip-text text-transparent transition duration-300">
            Frequently Asked Questions
          </h1>
          <p className="mt-4 text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
            Everything you need to know about EventFlow. Can’t find what you’re looking for? Reach out to our support team anytime.
          </p>
        </motion.div>

        <motion.div
          initial="initial"
          whileInView="whileInView"
          variants={staggerContainerVariants}
          viewport={{ once: true, amount: 0.2 }}
          className="max-w-3xl mx-auto space-y-5"
        >
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center px-6 py-5 text-left group"
              >
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-purple-600 transition-colors">
                  {faq.question}
                </h3>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="h-5 w-5 text-purple-600" />
                </motion.div>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    key="answer"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden px-6 pb-5 text-gray-600 text-base leading-relaxed"
                  >
                    {faq.answer}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;