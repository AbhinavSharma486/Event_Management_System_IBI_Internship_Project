import React, { useEffect, useState, Suspense, lazy } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
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
import { toast } from 'react-toastify';

import { useDispatch, useSelector } from 'react-redux';

import { axiosInstance } from '../lib/axios';
import DeleteConfirmationModal from '../components/Events/DeleteConfirmationModal';
import { fetchMyEvents, fetchAttendingEvents, deleteEvent } from '../slices/eventSlice.js';
const EventCard = React.memo(lazy(() => import('../components/Events/EventCard')));


const EventsPage = () => {
  const dispatch = useDispatch();
  const { events, attendingEvents, loading, error } = useSelector(state => state.events);
  const currentUser = useSelector(state => state.auth.currentUser);
  const isAuthenticated = !!currentUser;
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, eventId: null, eventName: '', isOwner: false });
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchMyEvents());
      dispatch(fetchAttendingEvents());
    }
  }, [dispatch, isAuthenticated]);

  const filteredEvents = events
    .filter((event) => {
      const matchesSearch =
        (event.title || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (event.description || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (event.location || '').toLowerCase().includes(searchTerm.toLowerCase());
      return matchesSearch;
    })
    .sort((a, b) => {
      // latest events first
      const createdA = a.createdAt ? new Date(a.createdAt) : (a.data ? new Date(a.date) : 0);
      const createdB = b.createdAt ? new Date(b.createdAt) : (b.date ? new Date(b.date) : 0);
      return createdB - createdA;
    });

  const handleDeleteEvent = (eventId, eventTitle, isOwner) => {
    setDeleteModal({ isOpen: true, eventId, eventName: eventTitle, isOwner });
  };

  const confirmDelete = async () => {
    try {
      if (deleteModal.isOwner) {
        await dispatch(deleteEvent(deleteModal.eventId));
        toast.success('Event deleted successfully');
      }
      else {
        // attendee leave event
        await axiosInstance.post(`/event/leaveEvent/${deleteModal.eventId}`);
        toast.success('You have left the event successfully');
      }

      setDeleteModal({ isOpen: false, eventId: null, eventName: '', isOwner: false });
      dispatch(fetchMyEvents());
      dispatch(fetchAttendingEvents());
    } catch (error) {
      toast.error(error.message || 'Failed to process request');
      setDeleteModal({ isOpen: false, eventId: null, eventName: '', isOwner: false });
    }
  };

  const closeDeleteModal = () => {
    setDeleteModal({ isOpen: false, eventId: null, eventName: '', isOwner: false });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading events...</p>
      </div>
    );
  }

  // Before rendering, ensure attendingEvents is always an array
  const safeAttendingEvents = Array.isArray(attendingEvents) ? attendingEvents : [];

  return (
    <main className="min-h-screen w-full bg-gradient-to-br from-blue-100 via-pink-100 to-purple-100 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 flex flex-col items-center justify-start pt-10 pb-20 px-2">
      <section className="w-full max-w-6xl mx-auto bg-white/80 dark:bg-gray-900/80 rounded-3xl shadow-2xl p-6 md:p-12 mt-8 backdrop-blur-lg border border-gray-200 dark:border-gray-800">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8">
          <div className="flex flex-col items-center w-fit mx-auto sm:mx-0">
            <h1 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-blue-500 via-pink-500 to-purple-500 bg-clip-text text-transparent mb-2 text-center">Events</h1>
            <span className="block h-1 w-full rounded-full bg-gradient-to-r from-blue-500 via-pink-500 to-purple-500" />
            <p className="mt-2 text-gray-700 dark:text-gray-200 text-center">Manage all your events in one place</p>
          </div>
          <Link
            to="/create-event"
            className="inline-flex items-center justify-center px-8 py-3 bg-gradient-to-r from-blue-500 to-pink-500 text-white rounded-full font-semibold shadow-lg hover:from-blue-600 hover:to-pink-600 hover:scale-105 transition text-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <Plus className="mr-2 h-5 w-5" />
            Create Event
          </Link>
        </div>
        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/70 dark:bg-gray-800/70 border border-gray-200 dark:border-gray-700 shadow focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
            />
          </div>
          <div className="flex gap-2 items-center justify-center">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-6 py-2 rounded-full font-semibold transition-all text-sm shadow ${viewMode === 'grid'
                ? 'bg-gradient-to-r from-blue-500 to-pink-500 text-white scale-105'
                : 'bg-white/60 dark:bg-gray-800/60 text-gray-700 dark:text-gray-200 hover:bg-white/80 dark:hover:bg-gray-700'}`}
            >
              Grid
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-6 py-2 rounded-full font-semibold transition-all text-sm shadow ${viewMode === 'list'
                ? 'bg-gradient-to-r from-blue-500 to-pink-500 text-white scale-105'
                : 'bg-white/60 dark:bg-gray-800/60 text-gray-700 dark:text-gray-200 hover:bg-white/80 dark:hover:bg-gray-700'}`}
            >
              List
            </button>
          </div>
        </div>
        {/* My Events Section */}
        <div className="mb-16">
          <div className="flex flex-col items-center w-fit mx-auto mb-6">
            <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-500 via-cyan-400 to-green-400 bg-clip-text text-transparent mb-2 text-center">My Events</h2>
            <span className="block h-1 w-full rounded-full bg-gradient-to-r from-blue-500 via-cyan-400 to-green-400" />
          </div>
          {filteredEvents.length === 0 ? (
            <div className="text-center py-16 bg-white/80 dark:bg-gray-800/80 rounded-2xl shadow-lg flex flex-col items-center">
              <span className="text-lg text-gray-500 dark:text-gray-300 mb-4">No events found</span>
              <Link
                to="/create-event"
                className="inline-flex items-center px-6 py-2 bg-gradient-to-r from-blue-500 to-pink-500 text-white rounded-full font-semibold shadow hover:from-blue-600 hover:to-pink-600 hover:scale-105 transition"
              >
                <Plus className="mr-2 h-4 w-4" />
                Create Your First Event
              </Link>
            </div>
          ) : (
            <div className="py-8 px-2 max-w-7xl mx-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
                {filteredEvents.map((event, index) => (
                  <div key={event._id || index} className="relative">
                    <Suspense fallback={<div>Loading event card...</div>}>
                      <EventCard
                        index={index}
                        event={event}
                        handleDeleteEvent={(id) => handleDeleteEvent(id, event.title, true)}
                        currentUserId={currentUser?._id}
                        showCreatorInfo={false}
                      />
                    </Suspense>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        {/* Events I'm Attending Section */}
        <div>
          <div className="flex flex-col items-center w-fit mx-auto mb-6">
            <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-pink-500 via-red-400 to-yellow-400 bg-clip-text text-transparent mb-2 text-center">Events I'm Attending</h2>
            <span className="block h-1 w-full rounded-full bg-gradient-to-r from-pink-500 via-red-400 to-yellow-400" />
          </div>
          {safeAttendingEvents.length === 0 ? (
            <div className="text-center py-16 bg-white/80 dark:bg-gray-800/80 rounded-2xl shadow-lg flex flex-col items-center">
              <span className="text-lg text-gray-500 dark:text-gray-300">No attending events found</span>
            </div>
          ) : (
            <div className="py-8 px-2 max-w-7xl mx-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
                {safeAttendingEvents
                  .slice()
                  .sort((a, b) => {
                    const dateA = a.date ? new Date(a.date) : (a.createdAt ? new Date(a.createdAt) : 0);
                    const dateB = b.date ? new Date(b.date) : (b.createdAt ? new Date(b.createdAt) : 0);
                    return dateB - dateA;
                  })
                  .map((event, index) => (
                    <div key={event._id || index} className="relative">
                      <Suspense fallback={<div>Loading event card...</div>}>
                        <EventCard
                          index={index}
                          event={event}
                          handleDeleteEvent={(id) => handleDeleteEvent(id, event.title, false)}
                          currentUserId={currentUser?._id}
                          showCreatorInfo={true}
                        />
                      </Suspense>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      </section>
      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={deleteModal.isOpen}
        onClose={closeDeleteModal}
        onConfirm={confirmDelete}
        eventName={deleteModal.eventName}
        loading={loading}
        isOwner={deleteModal.isOwner}
      />
    </main>
  );
};

export default EventsPage;