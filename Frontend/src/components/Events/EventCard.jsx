import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Users, Eye, Edit, Trash2, Phone as PhoneIcon, Share2, Clock } from 'lucide-react';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const EventCard = ({ event, index, handleDeleteEvent, setSelectedEvent, setShowEventModal, currentUserId, showCreatorInfo }) => {

  const navigate = useNavigate();
  const isOwner =
    (event.creator && typeof event.creator === 'object' && event.creator._id === currentUserId) ||
    (event.creator && typeof event.creator === 'string' && event.creator === currentUserId);

  const isAttendee = !isOwner && event.attendees && event.attendees.some(a => (a._id || a) === currentUserId);

  const [showShareModal, setShowShareModal] = useState(false);

  const handleShare = () => {
    setShowShareModal(true);
  };

  const handleCloseShareModal = () => {
    setShowShareModal(false);
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

  const onDelete = () => {
    handleDeleteEvent(event._id, event.title, isOwner);
  };

  return (
    <div className="bg-white/80 dark:bg-gray-900/80 rounded-2xl shadow-xl p-6 flex flex-col gap-4 hover:shadow-2xl transition-all duration-200 w-full max-w-3xl mx-auto backdrop-blur-lg border border-gray-100 dark:border-gray-800">
      {/* Event Image */}
      {event.image && (
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-56 object-cover rounded-xl mb-4 border border-gray-200 dark:border-gray-800"
        />
      )}
      <h3 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-1 capitalize">{
        event.title && event.title.length > 30
          ? event.title.slice(0, 30) + '...'
          : event.title
      }</h3>
      <p className="text-gray-600 dark:text-gray-300 text-base mb-2">{
        (() => {
          if (!event.description) return '';
          if (event.description.length <= 30) return event.description;
          return event.description.slice(0, 30) + '...';
        })()
      }</p>
      <div className="flex flex-col gap-3">
        {/* Creator Info */}
        {showCreatorInfo && event.creator && (
          <>
            <div className="flex items-center gap-2 bg-white/70 dark:bg-gray-800/70 rounded-xl px-4 py-2">
              <Users className="h-5 w-5 text-purple-500" />
              <span className="text-gray-800 dark:text-gray-200 font-medium">Creator: {event.creator.fullName}</span>
            </div>
            {event.creator.mobileNumber && (
              <div className="flex items-center gap-2 bg-white/70 dark:bg-gray-800/70 rounded-xl px-4 py-2 mt-2">
                <PhoneIcon className="h-5 w-5 text-green-500" />
                <span className="text-gray-800 dark:text-gray-200 font-medium">Mobile: {event.creator.mobileNumber}</span>
              </div>
            )}
          </>
        )}
        <div className="flex items-center gap-2 bg-white/70 dark:bg-gray-800/70 rounded-xl px-4 py-2">
          <Calendar className="h-5 w-5 text-pink-500" />
          <span className="text-gray-800 dark:text-gray-200 font-medium">
            {event.date ? format(new Date(event.date), 'MMMM d, yyyy') : ''}
          </span>
          <Clock className="h-5 w-5 text-purple-500 ml-4" />
          <span className="text-gray-800 dark:text-gray-200 font-medium">{event.time || ''}</span>
        </div>
        <div className="flex items-center gap-2 bg-white/70 dark:bg-gray-800/70 rounded-xl px-4 py-2">
          <MapPin className="h-5 w-5 text-blue-500" />
          <span className="text-gray-800 dark:text-gray-200 font-medium">{
            event.location && event.location.length > 20
              ? event.location.slice(0, 20) + '...'
              : event.location
          }</span>
        </div>
        <div className="flex items-center gap-2 bg-white/70 dark:bg-gray-800/70 rounded-xl px-4 py-2">
          <Users className="h-5 w-5 text-green-500" />
          <span className="text-gray-800 dark:text-gray-200 font-medium">{event.attendees?.length || 0}/{event.maxAttendees || 10}</span>
          <span className="ml-2 text-xs text-gray-500">Max Attendees</span>
          <div className="flex-1 ml-4">
            <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div className="h-full rounded-full bg-gradient-to-r from-blue-400 to-pink-400" style={{ width: `${((event.attendees?.length || 0) / (event.maxAttendees || 10)) * 100}%` }} />
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center gap-4 mt-6">
        <div className="relative group">
          <button
            className="p-3 rounded-xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-800 transition"
            title="View"
            onClick={() => navigate(`/events/${event._id}`)}
          >
            <Eye className="h-5 w-5" />
          </button>
          <span className="absolute left-1/2 -bottom-8 -translate-x-1/2 px-2 py-1 rounded bg-gray-800 text-white text-xs opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity">View</span>
        </div>
        {isOwner && (
          <>
            <div className="relative group">
              <button
                className="p-3 rounded-xl bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-300 hover:bg-green-100 dark:hover:bg-green-800 transition"
                title="Edit"
                onClick={() => {
                  const now = new Date();
                  const eventDate = event.date ? new Date(event.date) : null;
                  if (eventDate && eventDate < now) {
                    toast.info('This event is in the past and cannot be edited. Consider deleting it instead.');
                    return;
                  }
                  navigate(`/create-event/${event._id}`, { state: { eventData: event } });
                }}
              >
                <Edit className="h-5 w-5" />
              </button>
              <span className="absolute left-1/2 -bottom-8 -translate-x-1/2 px-2 py-1 rounded bg-gray-800 text-white text-xs opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity">Edit</span>
            </div>
            <div className="relative group">
              <button
                className="p-3 rounded-xl bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-300 hover:bg-purple-100 dark:hover:bg-purple-800 transition"
                title="Share"
                onClick={handleShare}
              >
                <Share2 className="h-5 w-5" />
              </button>
              <span className="absolute left-1/2 -bottom-8 -translate-x-1/2 px-2 py-1 rounded bg-gray-800 text-white text-xs opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity">Share</span>
            </div>
          </>
        )}
        <div className="relative group">
          <button className="p-3 rounded-xl bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-300 hover:bg-red-100 dark:hover:bg-red-800 transition" title="Delete" onClick={onDelete}>
            <Trash2 className="h-5 w-5" />
          </button>
          <span className="absolute left-1/2 -bottom-8 -translate-x-1/2 px-2 py-1 rounded bg-gray-800 text-white text-xs opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity">Delete</span>
        </div>
      </div>
      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 flex flex-col items-center gap-6 relative min-w-[280px]">
            <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200" onClick={handleCloseShareModal}>&times;</button>
            <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">Share Event</h3>
            <button
              className="flex flex-col items-center gap-2 px-6 py-3 rounded-lg bg-green-100 hover:bg-green-200 text-green-700 font-semibold text-base shadow transition"
              onClick={handleWhatsAppShare}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path fill="#25D366" d="M16 3C9.373 3 4 8.373 4 15c0 2.65.87 5.1 2.36 7.1L4 29l7.18-2.32A12.94 12.94 0 0 0 16 27c6.627 0 12-5.373 12-12S22.627 3 16 3zm0 22c-1.77 0-3.48-.46-4.98-1.32l-.36-.21l-4.26 1.38l1.4-4.14l-.23-.37A9.93 9.93 0 0 1 6 15c0-5.52 4.48-10 10-10s10 4.48 10 10s-4.48 10-10 10zm5.07-7.75c-.28-.14-1.65-.81-1.9-.9c-.25-.09-.43-.14-.61.14c-.18.28-.7.9-.86 1.08c-.16.18-.32.2-.6.07c-.28-.14-1.18-.44-2.25-1.4c-.83-.74-1.39-1.65-1.55-1.93c-.16-.28-.02-.43.12-.57c.13-.13.28-.34.42-.51c.14-.17.18-.29.28-.48c.09-.18.05-.35-.02-.49c-.07-.14-.61-1.47-.84-2.01c-.22-.53-.45-.46-.61-.47c-.16-.01-.35-.01-.54-.01c-.19 0-.5.07-.76.35c-.26.28-1 1-.97 2.43c.03 1.43 1.03 2.81 1.18 3c.14.19 2.03 3.1 5.02 4.23c.7.24 1.25.38 1.68.49c.71.18 1.36.16 1.87.1c.57-.07 1.65-.67 1.88-1.32c.23-.65.23-1.2.16-1.32c-.07-.12-.25-.19-.53-.33z" /></svg>
              <span>Share on WhatsApp</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventCard;