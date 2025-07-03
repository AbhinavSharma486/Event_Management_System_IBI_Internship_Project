import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Plus,
  Search,
  Calendar,
  MapPin,
  Users,
  Clock,
  Eye,
  Edit,
  Trash2,
} from 'lucide-react';
import { format } from 'date-fns';
import toast from 'react-hot-toast';

import EventCard from '../components/Events/EventCard';

const initialEvents = [
  {
    id: '1',
    title: 'React Conference',
    description: 'A deep dive into React 18 features.',
    location: 'Online',
    date: '2025-07-01',
    time: '10:00 AM',
    image: 'https://images.pexels.com/photos/573589/pexels-photo-573589.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    attendees: 120,
    capacity: 200,
  },
  {
    id: '2',
    title: 'Next.js Meetup',
    description: 'Meet and connect with Next.js developers.',
    location: 'Bangalore',
    date: '2025-07-15',
    time: '2:00 PM',
    image: 'https://images.pexels.com/photos/716411/pexels-photo-716411.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    attendees: 45,
    capacity: 100,
  },
];

const EventsPage = () => {
  const [events, setEvents] = useState(initialEvents);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid');

  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.location.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesSearch;
  });

  const handleDeleteEvent = (eventId, eventTitle) => {
    const eventToDelete = events.find(event => event.id === eventId);
    const title = eventTitle || eventToDelete?.title || 'this event';

    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      setEvents((prev) => prev.filter((event) => event.id !== eventId));
      toast.success('Event deleted successfully');
    }
  };

  return (
    <div className="space-y-8 bg-gradient-to-t from-yellow-900 via-pink-900 to-indigo-900 min-h-screen pt-30 pb-10 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Events</h1>
          <p className="mt-1 text-gray-100">Manage all your events in one place</p>
        </div>
        <Link
          to="/create-event"
          className="inline-flex items-center justify-center px-6 py-3 text-white bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg shadow hover:from-purple-700 hover:to-blue-700 transition duration-200 text-sm sm:text-base"
        >
          <Plus className="mr-2 h-5 w-5" />
          Create Event
        </Link>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow p-3 sm:p-4 max-w-4xl mx-auto">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between md:flex-row md:items-center md:justify-between">
          {/* Search Input */}
          <div className="w-full sm:w-auto sm:flex-1">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>

          {/* View Mode Toggle */}
          <div className="w-full sm:w-auto flex items-center justify-center sm:justify-end gap-2 bg-gray-100 rounded-md px-2 py-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`w-1/2 sm:w-auto text-sm px-3 py-1 rounded-md font-medium transition ${viewMode === 'grid' ? 'bg-white text-purple-600 shadow' : 'text-gray-600 hover:text-gray-900'}`}
            >
              Grid
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`w-1/2 sm:w-auto text-sm px-3 py-1 rounded-md font-medium transition ${viewMode === 'list' ? 'bg-white text-purple-600 shadow' : 'text-gray-600 hover:text-gray-900'}`}
            >
              List
            </button>
          </div>
        </div>
      </div>

      {/* Events Display */}
      <div>
        {filteredEvents.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl shadow">
            <Calendar className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No events found</h3>
            <p className="text-gray-500 mb-6">
              {searchTerm
                ? 'Try adjusting your search criteria'
                : 'Get started by creating your first event'}
            </p>
            <Link
              to="/events/create"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg shadow hover:from-purple-700 hover:to-blue-700 transition"
            >
              <Plus className="mr-2 h-5 w-5" />
              Create Your First Event
            </Link>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredEvents.map((event, index) => (
              <div key={event.id} className="relative">
                <Link
                  to={`/events/${event.id}`}
                  className="absolute inset-0 z-10"
                  aria-label={`View details for ${event.title}`}
                />
                <EventCard
                  index={index}
                  event={event}
                  handleDeleteEvent={(id) => handleDeleteEvent(id, event.title)}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow divide-y">
            {filteredEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-4 flex flex-col sm:flex-row gap-4 items-center sm:items-start hover:bg-gray-50 cursor-pointer relative"
              >
                <Link to={`/events/${event.id}`} className="absolute inset-0 z-10" aria-label={`View details for ${event.title}`}></Link>
                {event.image && (
                  <img src={event.image} alt={event.title} className="w-full h-32 sm:w-48 object-cover rounded-lg flex-shrink-0" />
                )}
                <div className="flex-1 min-w-0 flex flex-col justify-center">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-1 gap-2 sm:gap-0">
                    <h3 className="text-lg font-medium text-gray-900 truncate flex-grow">{event.title}</h3>
                  </div>
                  <p className="text-sm text-gray-600 truncate mb-2">{event.description}</p>
                  <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-gray-500">
                    <div className="flex items-center"><Calendar className="h-4 w-4 mr-1" /> {format(new Date(event.date), 'MMM d,yyyy')}</div>
                    <div className="flex items-center"><Clock className="h-4 w-4 mr-1" /> {event.time}</div>
                    <div className="flex items-center"><MapPin className="h-4 w-4 mr-1" /> {event.location}</div>
                    <div className="flex items-center"><Users className="h-4 w-4 mr-1" /> {event.attendees}/{event.capacity}</div>
                  </div>
                </div>
                <div className="flex gap-1 relative z-20 flex-shrink-0 mt-2 sm:mt-0">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors shadow-sm"
                    onClick={(e) => e.stopPropagation()}
                    aria-label="View event"
                  >
                    <Eye className="h-4 w-4" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2 text-emerald-600 hover:bg-emerald-100 rounded-lg transition-colors shadow-sm"
                    onClick={(e) => e.stopPropagation()}
                    aria-label="Edit event"
                  >
                    <Edit className="h-4 w-4" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => { e.stopPropagation(); handleDeleteEvent(event.id, event.title); }}
                    className="p-2 text-red-500 hover:bg-red-100 rounded-lg transition-colors shadow-sm"
                    aria-label="Delete event"
                  >
                    <Trash2 className="h-4 w-4" />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EventsPage;