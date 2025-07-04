import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Edit,
  Trash2,
  ArrowLeft,
  User,
} from 'lucide-react';
import { format } from 'date-fns';
import toast from 'react-hot-toast';

const EventDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);
  const [showAddAttendee, setShowAddAttendee] = useState(false);
  const [newAttendee, setNewAttendee] = useState({ name: '', email: '' });

  useEffect(() => {
    const fetchEvent = () => {
      const allEvents = [
        {
          id: '1',
          title: 'Annual Tech Conference 2025',
          date: '2025-09-15T09:00:00Z',
          time: '9:00 AM - 5:00 PM',
          location: 'Virtual Event',
          description: 'Join us for the Annual Tech Conference, a premier event showcasing the latest innovations in technology. Featuring keynote speakers, interactive workshops, and networking opportunities that will shape the future of tech. Don\'t miss out on this unparalleled opportunity to connect with industry leaders and explore cutting-edge solutions',
          maxAttendees: 500,
          currentAttendees: 320,
          banner: 'https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg',
          image: 'https://images.pexels.com/photos/3183166/pexels-photo-3183166.jpeg',
          createdAt: '2025-01-01T10:00:00Z',
          attendees: [
            { id: 'att1', name: 'Alice Smith', email: 'alice@example.com' },
            { id: 'att2', name: 'Bob Johnson', email: 'bob@example.com' },
          ],
        },
      ];
      setEvent(allEvents.find(e => e.id === id));
    };

    fetchEvent();
  }, [id]);

  const handleDeleteEvent = () => {
    if (window.confirm(`Are you sure you want to delete "${event.title}"?`)) {
      toast.success('Event deleted successfully (simulated)');
      navigate('/events');
    }
  };

  const handleAddAttendee = (e) => {
    e.preventDefault();
    if (newAttendee.name && newAttendee.email) {
      const newId = `att${event.attendees.length + 1 + Math.floor(Math.random() * 100)}`;
      const updatedAttendees = [...event.attendees, { id: newId, name: newAttendee.name, email: newAttendee.email }];
      setEvent({ ...event, attendees: updatedAttendees, currentAttendees: event.currentAttendees + 1 });
      toast.success('Attendee added successfully (simulated)');
      setNewAttendee({ name: '', email: '' });
      setShowAddAttendee(false);
    }
  };

  const handleRemoveAttendee = (attendeeId, attendeeName) => {
    if (window.confirm(`Remove ${attendeeName} from this event?`)) {
      const updatedAttendees = event.attendees.filter(att => att.id !== attendeeId);
      setEvent({ ...event, attendees: updatedAttendees, currentAttendees: event.currentAttendees - 1 });
      toast.success('Attendee removed successfully (simulated)');
    }
  };

  const BackButton = ({ className = '' }) => (
    <Link
      to="/events"
      className={`inline-flex items-center justify-center px-4 py-2 text-sm border border-transparent text-white font-medium rounded-3xl shadow-sm bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-colors duration-200 ${className}`}
    >
      <ArrowLeft className="mr-2 h-5 w-5" />
      Back to Events
    </Link>
  );

  if (!event) {
    return (
      <div className="text-center py-12 px-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Event not found</h2>
        <BackButton />
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 space-y-8 pt-20 pb-10 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-sky-500 via-blue-600 to-indigo-800">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <BackButton className="mb-4 sm:mb-0" />

        <div className="flex items-center space-x-2 sm:space-x-4 flex-wrap justify-end min-w-0">
          <Link
            to={`/events/${event.id}/edit`}
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-white hover:text-blue-700 transition-colors duration-200 whitespace-nowrap"
          >
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </Link>
          <button
            onClick={handleDeleteEvent}
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-red-600 hover:text-red-700 transition-colors duration-200 whitespace-nowrap"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </button>
        </div>
      </div>

      {event.banner && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative h-48 sm:h-64 md:h-80 lg:h-96 rounded-2xl overflow-hidden mb-8"
        >
          <img src={event.banner} alt={event.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 text-white p-2 sm:p-0">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-1 sm:mb-2 leading-tight">{event.title}</h1>
          </div>
        </motion.div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-4 mb-6">
              <div className="flex items-center text-gray-600">
                <Calendar className="h-5 w-5 mr-3 text-purple-600 flex-shrink-0" />
                <div>
                  <p className="font-medium text-sm sm:text-base">Date</p>
                  <p className="text-xs sm:text-sm">{format(new Date(event.date), 'EEEE, MMMM d, yyyy')}</p>
                </div>
              </div>

              <div className="flex items-center text-gray-600">
                <Clock className="h-5 w-5 mr-3 text-purple-600 flex-shrink-0" />
                <div>
                  <p className="font-medium text-sm sm:text-base">Time</p>
                  <p className="text-xs sm:text-sm">{event.time}</p>
                </div>
              </div>

              <div className="flex items-center text-gray-600">
                <MapPin className="h-5 w-5 mr-3 text-purple-600 flex-shrink-0" />
                <div>
                  <p className="font-medium text-sm sm:text-base">Location</p>
                  <p className="text-xs sm:text-sm">{event.location}</p>
                </div>
              </div>

              <div className="flex items-center text-gray-600">
                <Users className="h-5 w-5 mr-3 text-purple-600 flex-shrink-0" />
                <div>
                  <p className="font-medium text-sm sm:text-base">Capacity</p>
                  <p className="text-xs sm:text-sm">{event.currentAttendees}/{event.maxAttendees} registered</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3">Description</h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{event.description}</p>
            </div>
          </motion.div>

          {event.image && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="bg-white rounded-xl shadow-lg overflow-hidden">
              <img src={event.image} alt={event.title} className="w-full h-48 sm:h-64 object-cover" />
            </motion.div>
          )}
        </div>

        <div className="space-y-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }} className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
            <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900">Attendees ({event.attendees.length})</h3>
              <button onClick={() => setShowAddAttendee(true)} className="text-xs sm:text-sm text-purple-600 hover:text-purple-700 font-medium">Add Attendee</button>
            </div>

            {showAddAttendee && (
              <motion.form initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} onSubmit={handleAddAttendee} className="mb-4 p-3 sm:p-4 bg-gray-50 rounded-lg">
                <div className="space-y-3">
                  <input type="text" placeholder="Name" value={newAttendee.name} onChange={(e) => setNewAttendee({ ...newAttendee, name: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-purple-500" />
                  <input type="email" placeholder="Email" value={newAttendee.email} onChange={(e) => setNewAttendee({ ...newAttendee, email: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-purple-500" />
                  <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                    <button type="submit" className="flex-1 bg-purple-600 text-white px-3 py-2 rounded-md hover:bg-purple-700 transition-colors duration-200 text-sm sm:text-base">Add</button>
                    <button type="button" onClick={() => setShowAddAttendee(false)} className="flex-1 bg-gray-300 text-gray-700 px-3 py-2 rounded-md hover:bg-gray-400 transition-colors duration-200 text-sm sm:text-base">Cancel</button>
                  </div>
                </div>
              </motion.form>
            )}

            <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
              {event.attendees.length === 0 ? (
                <p className="text-gray-500 text-sm text-center py-4">No attendees registered yet</p>
              ) : (
                event.attendees.map((attendee) => (
                  <div key={attendee.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg flex-wrap sm:flex-nowrap gap-2">
                    <div className="flex items-center space-x-3 min-w-0">
                      <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <User className="h-4 w-4 text-white" />
                      </div>
                      <div className="truncate">
                        <p className="text-sm font-medium text-gray-900 truncate">{attendee.name}</p>
                        <p className="text-xs text-gray-500 truncate">{attendee.email}</p>
                      </div>
                    </div>
                    <button onClick={() => handleRemoveAttendee(attendee.id, attendee.name)} className="text-red-600 hover:text-red-700 p-1">
                      <Trash2 className="h-3 w-3" />
                    </button>
                  </div>
                ))
              )}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }} className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">Event Statistics</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 text-sm sm:text-base">Registration Rate</span>
                <span className="font-semibold text-sm sm:text-base">{Math.round((event.currentAttendees / event.maxAttendees) * 100)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-gradient-to-r from-purple-600 to-blue-600 h-2 rounded-full transition-all duration-300" style={{ width: `${Math.min((event.currentAttendees / event.maxAttendees) * 100, 100)}%` }} />
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 text-sm sm:text-base">Available Spots</span>
                <span className="font-semibold text-sm sm:text-base">{event.maxAttendees - event.currentAttendees}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 text-sm sm:text-base">Created</span>
                <span className="font-semibold text-sm sm:text-base">{format(new Date(event.createdAt), 'MMM d, yyyy')}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="flex justify-center mt-12">
        <BackButton />
      </div>
    </div>
  );
};

export default EventDetailsPage;