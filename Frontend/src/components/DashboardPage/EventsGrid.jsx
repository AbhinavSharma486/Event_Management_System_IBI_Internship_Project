import React, { useState } from 'react';
import { motion } from 'framer-motion';
import EventCard from './EventCard';

const EventsGrid = () => {
  const [events] = useState([
    {
      id: 1,
      title: 'Tech Conference 2025',
      date: '2025-07-12',
      location: 'Bangalore, India',
      description: 'Annual tech meetup and innovation expo.',
      time: '10:00 AM',
      attendees: 50,
      capacity: 200,
      status: 'Active',
      category: 'Technology',
      image: 'https://images.unsplash.com/photo-1582192730841-2a682d7375f9?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    {
      id: 2,
      title: 'Design Summit',
      date: '2025-08-03',
      location: 'Mumbai, India',
      description: 'UI/UX design summit featuring top speakers.',
      time: '09:00 AM',
      attendees: 30,
      capacity: 150,
      status: 'Active',
      category: 'Design',
      image: 'https://images.unsplash.com/photo-1557672172-298e090bd0f1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    {
      id: 3,
      title: 'Startup Pitch Day',
      date: '2025-09-10',
      location: 'Delhi, India',
      description: 'Pitch your startup to investors.',
      time: '02:00 PM',
      attendees: 20,
      capacity: 50,
      status: 'Upcoming',
      category: 'Business',
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    // Add 5 more events for testing
    {
      id: 4,
      title: 'Digital Marketing Workshop',
      date: '2025-07-25',
      location: 'Chennai, India',
      description: 'Learn the latest digital marketing strategies.',
      time: '11:00 AM',
      attendees: 45,
      capacity: 100,
      status: 'Active',
      category: 'Marketing',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    {
      id: 5,
      title: 'AI & Machine Learning Conference',
      date: '2025-08-15',
      location: 'Hyderabad, India',
      description: 'Exploring the future of artificial intelligence.',
      time: '09:30 AM',
      attendees: 120,
      capacity: 300,
      status: 'Active',
      category: 'Technology',
      image: 'https://images.unsplash.com/photo-1677442135722-5f8ea49cec8a?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    {
      id: 6,
      title: 'Healthcare Innovation Summit',
      date: '2025-09-05',
      location: 'Pune, India',
      description: 'Advancements in medical technology and practices.',
      time: '01:00 PM',
      attendees: 75,
      capacity: 150,
      status: 'Upcoming',
      category: 'Healthcare',
      image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2053&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    {
      id: 7,
      title: 'Finance Leaders Forum',
      date: '2025-10-18',
      location: 'Kolkata, India',
      description: 'Global economic trends and investment strategies.',
      time: '10:00 AM',
      attendees: 90,
      capacity: 200,
      status: 'Active',
      category: 'Finance',
      image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    {
      id: 8,
      title: 'Education Technology Expo',
      date: '2025-11-07',
      location: 'Ahmedabad, India',
      description: 'Innovative solutions for modern education.',
      time: '09:00 AM',
      attendees: 60,
      capacity: 180,
      status: 'Upcoming',
      category: 'Education',
      image: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    }
  ]);

  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showEventModal, setShowEventModal] = useState(false);

  const handleDeleteEvent = (id) => {
    // Implementation would go here
    console.log(`Delete event with id: ${id}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-3 sm:p-4 md:p-5 lg:p-6"
    >
      {events.length === 0 ? (
        <div className="text-center py-10 md:py-14">
          <p className="text-gray-500 text-base md:text-lg">No events found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 min-[480px]:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
          {events.map((event, index) => (
            <EventCard
              key={event.id}
              event={event}
              index={index}
              handleDeleteEvent={handleDeleteEvent}
              setSelectedEvent={setSelectedEvent}
              setShowEventModal={setShowEventModal}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default EventsGrid;