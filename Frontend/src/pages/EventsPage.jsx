import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Plus,
  Search,
  Filter,
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

const initialEvents = [
  {
    id: '1',
    title: 'React Conference',
    description: 'A deep dive into React 18 features.',
    location: 'Online',
    date: '2025-07-01',
    time: '10:00 AM',
    status: 'published',
    image: 'https://via.placeholder.com/400x200',
    currentAttendees: 120,
    maxAttendees: 200,
  },
  {
    id: '2',
    title: 'Next.js Meetup',
    description: 'Meet and connect with Next.js developers.',
    location: 'Bangalore',
    date: '2025-07-15',
    time: '2:00 PM',
    status: 'draft',
    image: '',
    currentAttendees: 45,
    maxAttendees: 100,
  },
];

const EventsPage = () => {
  const [events, setEvents] = useState(initialEvents);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [viewMode, setViewMode] = useState('grid');

  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.location.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter = filterStatus === 'all' || event.status === filterStatus;

    return matchesSearch && matchesFilter;
  });

  const handleDeleteEvent = (eventId, eventTitle) => {
    if (window.confirm(`Are you sure you want to delete "${eventTitle}"?`)) {
      setEvents((prev) => prev.filter((event) => event.id !== eventId));
      toast.success('Event deleted successfully');
    }
  };

  return (
    <div className="space-y-8 bg-gradient-to-br from-purple-600 via-blue-500 to-indigo-600 min-h-screen pt-30 pb-10 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Events</h1>
          <p className="mt-1 text-gray-100">Manage all your events in one place</p>
        </div>
        <Link
          to="/events/create"
          className="inline-flex items-center justify-center px-6 py-3 text-white bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg shadow hover:from-purple-700 hover:to-blue-700 transition duration-200 text-sm sm:text-base"
        >
          <Plus className="mr-2 h-5 w-5" />
          Create Event
        </Link>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow p-3 sm:p-4">
        <div className="flex flex-col gap-4 sm:flex-col md:flex-row md:items-center md:justify-between">

          {/* Search */}
          <div className="w-full">
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

          {/* Filter */}
          <div className="w-full flex items-center gap-2 sm:justify-start md:justify-end">
            <Filter className="h-4 w-4 text-gray-400" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full sm:w-auto text-sm px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="all">All Status</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          {/* View Mode Toggle */}
          <div className="w-full sm:w-auto flex items-center justify-between sm:justify-start md:justify-end gap-2 bg-gray-100 rounded-md px-2 py-1">
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
              {searchTerm || filterStatus !== 'all'
                ? 'Try adjusting your search or filter criteria'
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
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl overflow-hidden"
              >
                {event.image && (
                  <img src={event.image} alt={event.title} className="w-full h-48 object-cover" />
                )}
                <div className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${event.status === 'published' ? 'bg-green-100 text-green-800' : event.status === 'draft' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>{event.status}</span>
                    <div className="flex gap-1">
                      <Link to={`/events/${event.id}`} className="text-gray-400 hover:text-purple-600">
                        <Eye className="h-4 w-4" />
                      </Link>
                      <Link to={`/events/${event.id}/edit`} className="text-gray-400 hover:text-blue-600">
                        <Edit className="h-4 w-4" />
                      </Link>
                      <button onClick={() => handleDeleteEvent(event.id, event.title)} className="text-gray-400 hover:text-red-600">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 truncate mb-1">{event.title}</h3>
                  <p className="text-sm text-gray-600 mb-3 truncate">{event.description}</p>
                  <div className="text-sm text-gray-500 space-y-1">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2" /> {format(new Date(event.date), 'MMM d, yyyy')}
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2" /> {event.time}
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2" /> {event.location}
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-2" /> {event.currentAttendees}/{event.maxAttendees}
                    </div>
                  </div>
                </div>
              </motion.div>
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
                className="p-4 flex flex-col sm:flex-row gap-4 items-start sm:items-center hover:bg-gray-50"
              >
                {event.image && (
                  <img src={event.image} alt={event.title} className="w-24 h-24 object-cover rounded-lg" />
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center mb-1">
                    <h3 className="text-lg font-medium text-gray-900 truncate">{event.title}</h3>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${event.status === 'published' ? 'bg-green-100 text-green-800' : event.status === 'draft' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>{event.status}</span>
                  </div>
                  <p className="text-sm text-gray-600 truncate mb-2">{event.description}</p>
                  <div className="flex flex-wrap gap-x-6 text-sm text-gray-500">
                    <div className="flex items-center"><Calendar className="h-4 w-4 mr-1" /> {format(new Date(event.date), 'MMM d, yyyy')}</div>
                    <div className="flex items-center"><Clock className="h-4 w-4 mr-1" /> {event.time}</div>
                    <div className="flex items-center"><MapPin className="h-4 w-4 mr-1" /> {event.location}</div>
                    <div className="flex items-center"><Users className="h-4 w-4 mr-1" /> {event.currentAttendees}/{event.maxAttendees}</div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Link to={`/events/${event.id}`} className="text-gray-400 hover:text-purple-600"><Eye className="h-5 w-5" /></Link>
                  <Link to={`/events/${event.id}/edit`} className="text-gray-400 hover:text-blue-600"><Edit className="h-5 w-5" /></Link>
                  <button onClick={() => handleDeleteEvent(event.id, event.title)} className="text-gray-400 hover:text-red-600"><Trash2 className="h-5 w-5" /></button>
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
