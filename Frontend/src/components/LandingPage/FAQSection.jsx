import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';

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
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

// Local data
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
    <div className="py-16 sm:py-24 lg:py-32 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16 sm:mb-20">
          <motion.h2
            initial="initial"
            whileInView="whileInView"
            variants={fadeUpVariants}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900"
          >
            Frequently Asked Questions
          </motion.h2>
          <motion.p
            initial="initial"
            whileInView="whileInView"
            variants={fadeUpVariants}
            viewport={{ once: true }}
            className="mt-4 text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto"
          >
            Everything you need to know about EventFlow. Can't find an answer? Contact us.
          </motion.p>
        </div>

        <motion.div
          initial="initial"
          whileInView="whileInView"
          variants={staggerContainerVariants}
          viewport={{ once: true, amount: 0.1 }}
          className="max-w-3xl mx-auto space-y-4"
        >
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center p-6 text-left"
              >
                <h3 className="text-lg font-semibold text-gray-900">{faq.question}</h3>
                {openIndex === index ? (
                  <ChevronUp className="h-5 w-5 text-purple-600" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-purple-600" />
                )}
              </button>

              {openIndex === index && (
                <div className="px-6 pb-6 text-gray-600">
                  {faq.answer}
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default FAQSection;