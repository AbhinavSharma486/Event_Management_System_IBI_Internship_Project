import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const EventModal = () => {
  const [showEventModal, setShowEventModal] = useState(false);
  const [event] = useState({
    title: 'Tech Conference 2025',
    description: 'An exciting conference on the latest trends in technology and innovation.',
    date: '2025-07-15',
    time: '10:00 AM',
    location: 'Mumbai Convention Center',
    category: 'Technology',
    capacity: 300,
    attendees: 215,
    image: 'https://source.unsplash.com/600x300/?conference,event'
  });

  if (!event) return null;

  return (
    <AnimatePresence>
      {showEventModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-white rounded-xl p-4 sm:p-6 w-full max-w-md"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-900">{event.title}</h3>
              <button
                onClick={() => setShowEventModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="rounded-xl overflow-hidden">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-48 object-cover"
                />
              </div>

              <div className="space-y-2">
                <p className="text-gray-700">{event.description}</p>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-xs text-gray-500">Date</p>
                    <p className="font-medium">{event.date}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-xs text-gray-500">Time</p>
                    <p className="font-medium">{event.time}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-xs text-gray-500">Location</p>
                    <p className="font-medium">{event.location}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-xs text-gray-500">Category</p>
                    <p className="font-medium">{event.category}</p>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-gray-500">Attendance</p>
                      <p className="font-medium">{event.attendees}/{event.capacity} attendees</p>
                    </div>
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full"
                        style={{ width: `${(event.attendees / event.capacity) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EventModal;