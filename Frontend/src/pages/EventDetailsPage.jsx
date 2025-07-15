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
  Phone as PhoneIcon,
  Share2,
} from 'lucide-react';
import { format } from 'date-fns';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMyEvents, deleteEvent, fetchEventById } from '../slices/eventSlice';
import DeleteConfirmationModal from '../components/Events/DeleteConfirmationModal';
import { axiosInstance } from '../lib/axios';

const EventDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentEvent, loading, error } = useSelector(state => state.events);
  const currentUser = useSelector(state => state.auth.currentUser);
  const [showAddAttendee, setShowAddAttendee] = useState(false);
  const [deleteModal, setDeleteModal] = useState({ isOpen: false });
  const [addAttendeeInput, setAddAttendeeInput] = useState("");
  const [addAttendeeLoading, setAddAttendeeLoading] = useState(false);
  const [addAttendeeError, setAddAttendeeError] = useState('');
  const [leaveModal, setLeaveModal] = useState(false);
  const [deleteAttendeeModal, setDeleteAttendeeModal] = useState({ isOpen: false, attendee: null });
  const [showShareModal, setShowShareModal] = useState(false);

  useEffect(() => {
    dispatch(fetchEventById(id));
  }, [dispatch, id]);

  // Removed global error handler since errors are handled in catch blocks

  const event = currentEvent?.event || null;
  // More robust owner/attendee checks
  const isOwner = (event?.creator?._id && event?.creator?._id === currentUser?._id) || (typeof event?.creator === 'string' && event?.creator === currentUser?._id);
  const isAttendee = event && !isOwner && event.attendees?.some(a => (a._id || a) === currentUser?._id);

  const handleDeleteEvent = () => {
    setDeleteModal({ isOpen: true });
  };

  const confirmDelete = async () => {
    if (!event?._id) return;
    try {
      await dispatch(deleteEvent(event._id)).unwrap();
      toast.success('Event deleted successfully');
      navigate('/events');
    } catch (error) {
      toast.error(error.message || 'Failed to delete event');
    }
  };

  const handleAddAttendeeSubmit = async (e) => {
    e.preventDefault();
    if (!event?._id) return;
    if (!isOwner) {
      toast.error('Only the event creator can add attendees.');
      setShowAddAttendee(false);
      return;
    }
    setAddAttendeeLoading(true);
    setAddAttendeeError("");
    try {
      if (!addAttendeeInput) {
        setAddAttendeeError("Please enter an email or mobile number.");
        setAddAttendeeLoading(false);
        return;
      }
      // Simple email regex
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      // Simple mobile number regex (10-15 digits, can start with +)
      const mobileRegex = /^\+?\d{10,15}$/;
      let payload = {};
      if (emailRegex.test(addAttendeeInput)) {
        payload = { email: addAttendeeInput };
      } else if (mobileRegex.test(addAttendeeInput)) {
        payload = { mobileNumber: addAttendeeInput };
      } else {
        setAddAttendeeError("Please enter a valid email or mobile number.");
        setAddAttendeeLoading(false);
        return;
      }
      const res = await axiosInstance.post(`/event/addAttendeeToEvent/${event._id}`, payload);
      toast.success(res.data.message || 'Attendee added!');
      setAddAttendeeInput("");
      setShowAddAttendee(false);
      dispatch(fetchEventById(id));
    } catch (err) {
      setAddAttendeeError(err.response?.data?.message || err.message);
    } finally {
      setAddAttendeeLoading(false);
    }
  };

  const handleDeleteAttendee = (attendee) => {
    setDeleteAttendeeModal({ isOpen: true, attendee });
  };

  const confirmDeleteAttendee = async () => {
    if (!event?._id || !deleteAttendeeModal.attendee) return;
    try {
      const attendeeId = deleteAttendeeModal.attendee._id || deleteAttendeeModal.attendee;
      await axiosInstance.delete(`/event/${event._id}/removeAttendee/${attendeeId}`);
      toast.success('Attendee removed successfully');
      setDeleteAttendeeModal({ isOpen: false, attendee: null });
      dispatch(fetchEventById(id));
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to remove attendee');
    }
  };

  const confirmLeave = async () => {
    if (!event?._id) return;
    try {
      await axiosInstance.post(`/event/leaveEvent/${event._id}`);
      toast.success('You have left the event');
      setLeaveModal(false);
      navigate('/events');
    } catch (error) {
      toast.error(error.message || 'Failed to leave event');
    }
  };

  const handleWhatsAppShare = () => {
    const organizerName = event.creator?.fullName || '';
    const organizerMobile = event.creator?.mobileNumber || '';

    const text =
      `✨ *You're Invited!* ✨\n\n` +
      `*Event Name:* ${event.title}*\n` +
      `------------------------------\n` +
      `📝 *About:* ${event.description}\n` +
      `\n` +
      `📅 *Date:* ${event.date ? format(new Date(event.date), 'dddd, MMMM d, yyyy') : ''}\n` +
      `⏰ *Time:* ${event.time || ''}\n` +
      `📍 *Location:* ${event.location}\n` +
      `\n` +
      `👤 *Organizer:* ${organizerName}\n` +
      `📞 *Contact:* ${organizerMobile}\n` +
      `------------------------------`;

    const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
    setShowShareModal(false);
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-pink-100 to-purple-100 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Loading event...</p>
        </div>
      </div>
    );
  }

  if (!event && !loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-pink-100 to-purple-100 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900">
        <div className="text-center py-12 text-xl">Event not found or failed to load.</div>
      </div>
    );
  }

  const attendeeList = event?.attendees || [];
  const registered = attendeeList.length;
  const max = event?.maxAttendees || 0;
  const registrationRate = max ? Math.round((registered / max) * 100) : 0;
  const availableSpots = max - registered;
  const createdDate = event?.createdAt ? format(new Date(event.createdAt), 'MMM d, yyyy') : '';

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-pink-100 to-purple-100 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 pb-12">
      <div className="w-full max-w-6xl mx-auto px-4 pt-8">
        <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4">
          <BackButton />
          <div className="flex gap-3 w-full sm:w-auto justify-center sm:justify-end">
            {isOwner && (
              <>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-1 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold shadow hover:from-blue-600 hover:to-purple-700 transition"
                  onClick={() => navigate(`/create-event/${event._id}`, { state: { eventData: event } })}
                >
                  <Edit className="h-4 w-4" /> Edit
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-1 px-4 py-2 rounded-lg bg-gradient-to-r from-pink-500 to-red-500 text-white font-semibold shadow hover:from-pink-600 hover:to-red-700 transition"
                  onClick={handleDeleteEvent}
                >
                  <Trash2 className="h-4 w-4" /> Delete
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-1 px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold shadow hover:from-purple-600 hover:to-blue-600 transition"
                  onClick={() => setShowShareModal(true)}
                >
                  <Share2 className="h-4 w-4" /> Share
                </motion.button>
              </>
            )}
            {isAttendee && !isOwner && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-1 px-4 py-2 rounded-lg bg-gradient-to-r from-yellow-400 to-pink-500 text-white font-semibold shadow hover:from-yellow-500 hover:to-pink-600 transition"
                onClick={() => setLeaveModal(true)}
              >
                Leave Event
              </motion.button>
            )}
          </div>
        </div>

        {event.image && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.015, boxShadow: '0 8px 32px rgba(80, 80, 180, 0.18)' }}
            className="w-full h-64 md:h-80 rounded-3xl overflow-hidden mb-8 relative shadow-lg border-4 border-white dark:border-gray-800 ring-2 ring-blue-200 dark:ring-blue-900 group"
          >
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105 bg-gray-200 dark:bg-gray-800"
              onError={e => { e.target.onerror = null; e.target.src = 'https://via.placeholder.com/600x320?text=No+Image'; }}
              style={{ imageRendering: 'auto' }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6 pointer-events-none">
              <h1 className="text-3xl md:text-4xl font-extrabold text-white drop-shadow-lg">{event.title}</h1>
            </div>
          </motion.div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="md:col-span-2 space-y-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <InfoCard icon={<Calendar className="h-5 w-5 text-pink-500" />} label="Date" value={event.date ? format(new Date(event.date), 'EEEE, MMMM d, yyyy') : ''} />
              <InfoCard icon={<Clock className="h-5 w-5 text-purple-500" />} label="Time" value={event.time} />
              <LocationInfoCard icon={<MapPin className="h-5 w-5 text-blue-500" />} label="Location" value={event.location} />
              <InfoCard icon={<Users className="h-5 w-5 text-green-500" />} label="Capacity" value={`${registered}/${max} registered`} />

              {event.creator && isAttendee && !isOwner && (
                <div className="col-span-2 sm:col-span-4 bg-white/90 dark:bg-gray-900/80 rounded-xl p-4 shadow">
                  <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Organizer Info</h3>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-pink-400 flex items-center justify-center text-white font-bold">
                      {event.creator.fullName?.[0] || <User className="h-5 w-5" />}
                    </div>
                    <div>
                      <p className="font-medium text-gray-800 dark:text-gray-200">{event.creator.fullName}</p>
                      {event.creator.mobileNumber && (
                        <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                          <PhoneIcon className="h-4 w-4" /> {event.creator.mobileNumber}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="bg-white/90 dark:bg-gray-900/80 rounded-xl p-6 shadow">
              <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Event Details</h2>
              <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">{event.description}</p>
            </div>

            {event.banner1 && (
              <motion.img
                whileHover={{ scale: 1.01 }}
                src={event.banner1}
                alt="Event Banner"
                className="w-full h-48 md:h-64 rounded-xl shadow-lg object-cover object-center border-2 border-white dark:border-gray-800 ring-1 ring-blue-200 dark:ring-blue-900 bg-gray-200 dark:bg-gray-800"
                onError={e => { e.target.onerror = null; e.target.src = 'https://via.placeholder.com/600x320?text=No+Banner'; }}
                style={{ imageRendering: 'auto' }}
              />
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white/90 dark:bg-gray-900/80 rounded-xl p-6 shadow">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-gray-900 dark:text-white">Attendees ({registered})</h3>
                {isOwner && (
                  <button
                    onClick={() => setShowAddAttendee(true)}
                    className="text-sm bg-gradient-to-r from-purple-500 to-blue-500 text-white px-3 py-1 rounded-lg hover:from-purple-600 hover:to-blue-600 transition"
                  >
                    + Add
                  </button>
                )}
              </div>

              <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                {attendeeList.length === 0 ? (
                  <p className="text-gray-500 text-center py-4">No attendees yet</p>
                ) : (
                  attendeeList.map((att) => (
                    <AttendeeCard
                      key={att._id || att.email}
                      attendee={att}
                      isOwner={isOwner}
                      onDelete={() => handleDeleteAttendee(att)}
                    />
                  ))
                )}
              </div>
            </div>

            <div className="bg-white/90 dark:bg-gray-900/80 rounded-xl p-6 shadow">
              <h3 className="font-bold text-gray-900 dark:text-blue-200 mb-4">Event Stats</h3>
              <div className="space-y-4">
                <StatItem
                  label="Registration Rate"
                  value={`${registrationRate}%`}
                  progress={registrationRate}
                  color="from-blue-400 to-pink-400"
                />
                <StatItem
                  label="Available Spots"
                  value={availableSpots}
                  color="text-green-600 dark:text-green-300"
                />
                <StatItem
                  label="Created On"
                  value={createdDate}
                  color="text-gray-800 dark:text-gray-200"
                />
              </div>
            </div>
          </div>
        </div>

        {event.banner2 && (
          <motion.img
            whileHover={{ scale: 1.01 }}
            src={event.banner2}
            alt="Event Banner"
            className="w-full h-48 md:h-64 mt-8 rounded-xl shadow-lg object-cover object-center border-2 border-white dark:border-gray-800 ring-1 ring-blue-200 dark:ring-blue-900 bg-gray-200 dark:bg-gray-800"
            onError={e => { e.target.onerror = null; e.target.src = 'https://via.placeholder.com/600x320?text=No+Banner'; }}
            style={{ imageRendering: 'auto' }}
          />
        )}
      </div>

      {/* Modals */}
      <DeleteConfirmationModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false })}
        onConfirm={confirmDelete}
        eventName={event.title}
        loading={loading}
        isOwner={isOwner}
      />

      <DeleteConfirmationModal
        isOpen={deleteAttendeeModal.isOpen}
        onClose={() => setDeleteAttendeeModal({ isOpen: false, attendee: null })}
        onConfirm={confirmDeleteAttendee}
        eventName={deleteAttendeeModal.attendee?.fullName || ''}
        loading={addAttendeeLoading}
        customTitle="Remove Attendee"
        customDescription={`Are you sure you want to remove ${deleteAttendeeModal.attendee?.fullName || 'this attendee'} from this event?`}
        customButtonText={addAttendeeLoading ? 'Removing...' : 'Remove Attendee'}
      />

      {/* Add Attendee Modal */}
      {showAddAttendee && (
        <Modal onClose={() => setShowAddAttendee(false)} title="Add Attendee">
          <form onSubmit={handleAddAttendeeSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Email or Mobile Number
              </label>
              <input
                type="text"
                placeholder="Enter attendee email or mobile number"
                value={addAttendeeInput}
                onChange={e => setAddAttendeeInput(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              />
              {addAttendeeError && <p className="mt-1 text-sm text-red-500">{addAttendeeError}</p>}
            </div>
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowAddAttendee(false)}
                className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold shadow hover:from-blue-600 hover:to-purple-600 transition"
                disabled={addAttendeeLoading}
              >
                {addAttendeeLoading ? 'Adding...' : 'Add Attendee'}
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* Leave Event Modal */}
      {leaveModal && (
        <Modal onClose={() => setLeaveModal(false)} title="Leave Event">
          <p className="mb-6 text-gray-700 dark:text-gray-300">Are you sure you want to leave this event?</p>
          <div className="flex justify-end gap-3">
            <button
              onClick={() => setLeaveModal(false)}
              className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
            >
              Cancel
            </button>
            <button
              onClick={confirmLeave}
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-yellow-400 to-pink-500 text-white font-semibold shadow hover:from-yellow-500 hover:to-pink-600 transition"
            >
              Confirm Leave
            </button>
          </div>
        </Modal>
      )}

      {/* Share Modal */}
      {showShareModal && (
        <Modal onClose={() => setShowShareModal(false)} title="Share Event">
          <div className="flex flex-col items-center gap-4">
            <button
              onClick={handleWhatsAppShare}
              className="flex items-center gap-2 px-6 py-3 rounded-lg bg-green-100 hover:bg-green-200 text-green-700 font-semibold shadow transition w-full justify-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#25D366" d="M12 2C6.48 2 2 6.48 2 12c0 1.66.44 3.21 1.23 4.55L2 22l5.23-1.45A9.96 9.96 0 0 0 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm0 18c-1.33 0-2.6-.26-3.77-.72l-.27-.08-2.9.76.77-2.85-.18-.28A8 8 0 0 1 4 12c0-4.42 3.58-8 8-8s8 3.58 8 8-3.58 8-8 8zm4.5-5.5c-.22-.33-.71-.54-1.5-.54-.42 0-.72.07-1.03.12-.3.05-.62.12-.97.12-.5 0-.72-.17-.95-.37-.23-.2-.5-.5-.5-1.5s.5-3.5.77-3.93c.13-.22.33-.34.57-.34.13 0 .27.03.4.08l1.03.43c.3.13.5.2.67.2.17 0 .37-.07.6-.3.23-.23.5-.6.8-1 .3-.4.17-.7 0-.9l-.13-.15c-.23-.26-.6-.3-.83-.16l-.12.08c-.37.25-.6.43-.8.43-.17 0-.3-.1-.5-.33l-.4-.57c-.45-.65-.75-.75-1-.75-.25 0-.5.1-.67.3-.17.2-.65.8-.65 1.7 0 .9.67 1.97.77 2.12.1.15 1.37 2.08 3.33 2.95.47.2.83.33 1.12.43.47.15.9.13 1.23.08.38-.07 1.17-.48 1.33-.95.17-.47.17-.87.12-.95-.05-.08-.17-.13-.38-.23z" /></svg>
              Share on WhatsApp
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

// Reusable Components
const InfoCard = ({ icon, label, value }) => (
  <div className="bg-white/90 dark:bg-gray-900/80 rounded-xl p-4 shadow flex flex-col text-center items-center w-full max-w-full">
    <div className="flex items-center gap-2 text-gray-500 mb-1">
      {icon}
      <span className="text-xs text-gray-800 dark:text-white">{label}</span>
    </div>
    <p className="font-semibold text-gray-800 dark:text-white text-sm w-full max-w-full break-words whitespace-normal" style={{ wordBreak: 'break-word' }}>{value}</p>
  </div>
);

// Replace the InfoCard for Location with a custom one that handles long text
const LocationInfoCard = ({ icon, label, value }) => (
  <div className="bg-white/90 dark:bg-gray-900/80 rounded-xl p-4 shadow flex flex-col text-center items-center w-full">
    <div className="flex items-center gap-2 text-gray-500 mb-1">
      {icon}
      <span className="text-xs text-gray-800 dark:text-white">{label}</span>
    </div>
    <p
      className="font-semibold text-gray-800 dark:text-white text-sm w-full max-w-full break-words whitespace-normal"
      style={{ wordBreak: 'break-word' }}
    >
      {value}
    </p>
  </div>
);

const AttendeeCard = ({ attendee, isOwner, onDelete }) => (
  <div className="flex items-center gap-3 bg-gray-100 dark:bg-gray-800 rounded-lg p-3">
    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-pink-400 flex items-center justify-center text-white font-bold">
      {attendee.fullName?.[0] || <User className="h-5 w-5" />}
    </div>
    <div className="flex-1 min-w-0">
      <p className="font-medium text-gray-800 dark:text-gray-200 truncate">{attendee.fullName || 'Guest'}</p>
      <p className="text-xs text-gray-500 truncate">{attendee.email || ''}</p>
    </div>
    {isOwner && (
      <button
        onClick={onDelete}
        className="text-red-500 hover:text-red-700 transition"
        title="Remove Attendee"
      >
        <Trash2 className="h-4 w-4" />
      </button>
    )}
  </div>
);

const StatItem = ({ label, value, progress, color }) => (
  <div>
    <div className="flex justify-between text-sm mb-1">
      <span className="text-gray-700 dark:text-gray-300">{label}</span>
      <span className={`font-semibold ${color.includes('text-') ? color : 'text-blue-600 dark:text-pink-300'}`}>{value}</span>
    </div>
    {progress !== undefined && (
      <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full bg-gradient-to-r ${color}`}
          style={{ width: `${progress}%` }}
        />
      </div>
    )}
  </div>
);

const Modal = ({ onClose, title, children }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-xl p-6 w-full max-w-md mx-4 relative">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
      >
        &times;
      </button>
      {title && <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">{title}</h3>}
      {children}
    </div>
  </div>
);

export default EventDetailsPage;