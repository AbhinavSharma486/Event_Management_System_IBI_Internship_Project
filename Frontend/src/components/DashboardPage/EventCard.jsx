import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Users, Eye, Edit, Trash2 } from 'lucide-react';

const EventCard = ({ event, index, handleDeleteEvent, setSelectedEvent, setShowEventModal }) => {

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="group bg-white/80 backdrop-blur-sm rounded-lg sm:rounded-xl lg:rounded-2xl border border-white/20 overflow-hidden shadow-sm hover:shadow-lg lg:hover:shadow-xl transition-all duration-500 h-full flex flex-col"
    >
      {/* Image Section with responsive heights */}
      <div className="relative h-32 xs:h-36 sm:h-40 md:h-44 lg:h-48 xl:h-52 2xl:h-56 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent z-10"></div>
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        {/* Status badge with responsive positioning and sizing */}
        <div className="absolute top-1.5 right-1.5 xs:top-2 xs:right-2 sm:top-3 sm:right-3 lg:top-4 lg:right-4 z-20">
          <span className={`px-1.5 py-0.5 xs:px-2 xs:py-1 sm:px-2.5 sm:py-1 lg:px-3 lg:py-1.5 rounded-full text-2xs xs:text-xs sm:text-sm font-semibold backdrop-blur-md ${event.status === 'Active'
            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
            : event.status === 'Upcoming'
              ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
              : 'bg-gray-500/20 text-gray-300 border border-gray-500/30'
            }`}>
            {event.status}
          </span>
        </div>
      </div>

      {/* Content Section with responsive padding and spacing */}
      <div className="p-2.5 xs:p-3 sm:p-4 md:p-5 lg:p-6 space-y-2.5 xs:space-y-3 sm:space-y-4 lg:space-y-5 flex-grow flex flex-col">
        {/* Title and Description */}
        <div className="flex-grow">
          <h3 className="text-sm xs:text-base sm:text-lg md:text-xl lg:text-xl font-bold text-gray-900 mb-1 xs:mb-1.5 sm:mb-2 group-hover:text-purple-600 transition-colors line-clamp-1">
            {event.title}
          </h3>
          <p className="text-gray-600 text-2xs xs:text-xs sm:text-sm md:text-base leading-relaxed line-clamp-2 min-h-[2rem] xs:min-h-[2.5rem] sm:min-h-[3rem]">
            {event.description}
          </p>
        </div>

        {/* Event Details with responsive spacing */}
        <div className="space-y-1.5 xs:space-y-2 sm:space-y-3">
          {/* Date and Time */}
          <div className="flex items-center text-2xs xs:text-xs sm:text-sm md:text-base text-gray-600 bg-gray-50 rounded-md sm:rounded-lg p-1.5 xs:p-2 sm:p-2.5 lg:p-3">
            <Calendar className="w-3.5 h-3.5 xs:w-3.5 xs:h-3.5 sm:w-4 sm:h-4 md:w-4 md:h-4 lg:w-4 lg:h-4 xl:w-4 xl:h-4 mr-1.5 xs:mr-2 sm:mr-3 text-purple-500 flex-shrink-0" />
            <span className="font-medium truncate">{event.date} at {event.time}</span>
          </div>

          {/* Location */}
          <div className="flex items-center text-2xs xs:text-xs sm:text-sm md:text-base text-gray-600 bg-gray-50 rounded-md sm:rounded-lg p-1.5 xs:p-2 sm:p-2.5 lg:p-3">
            <MapPin className="w-3.5 h-3.5 xs:w-3.5 xs:h-3.5 sm:w-4 sm:h-4 md:w-4 md:h-4 lg:w-4 lg:h-4 xl:w-4 xl:h-4 mr-1.5 xs:mr-2 sm:mr-3 text-blue-500 flex-shrink-0" />
            <span className="font-medium truncate">{event.location}</span>
          </div>

          {/* Attendees and Capacity */}
          <div className="flex items-center justify-between bg-gradient-to-r from-purple-50 to-blue-50 rounded-md sm:rounded-lg p-1.5 xs:p-2 sm:p-2.5 lg:p-3">
            <div className="flex items-center text-2xs xs:text-xs sm:text-sm md:text-base text-gray-600">
              <Users className="w-3.5 h-3.5 xs:w-3.5 xs:h-3.5 sm:w-4 sm:h-4 md:w-4 md:h-4 lg:w-4 lg:h-4 xl:w-4 xl:h-4 mr-1.5 xs:mr-2 sm:mr-3 text-emerald-500 flex-shrink-0" />
              <span className="font-medium truncate">{event.attendees}/{event.capacity}</span>
            </div>
            <div className="text-right min-w-[50px] xs:min-w-[60px] sm:min-w-[70px] lg:min-w-[80px]">
              <div className="text-3xs xs:text-2xs sm:text-xs text-gray-500 truncate">Capacity</div>
              <div className="w-8 xs:w-10 sm:w-12 md:w-14 lg:w-16 bg-gray-200 rounded-full h-1 xs:h-1.5 sm:h-2 mt-0.5 sm:mt-1">
                <div
                  className="bg-gradient-to-r from-purple-500 to-blue-500 h-full rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(100, (event.attendees / event.capacity) * 100)}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons and Category */}
        <div className="flex items-center justify-between pt-1.5 xs:pt-2 sm:pt-3 border-t border-gray-100">
          <div className="flex space-x-0.5 xs:space-x-1 sm:space-x-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setSelectedEvent(event);
                setShowEventModal(true);
              }}
              className="p-1 xs:p-1.5 sm:p-2 lg:p-2.5 text-blue-600 hover:bg-blue-100 rounded-md sm:rounded-lg transition-colors shadow-sm"
              aria-label="View event"
            >
              <Eye className="w-3.5 h-3.5 xs:w-3.5 xs:h-3.5 sm:w-4 sm:h-4 md:w-4 md:h-4 lg:w-4 lg:h-4 xl:w-4 xl:h-4" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="p-1 xs:p-1.5 sm:p-2 lg:p-2.5 text-emerald-600 hover:bg-emerald-100 rounded-md sm:rounded-lg transition-colors shadow-sm"
              aria-label="Edit event"
            >
              <Edit className="w-3.5 h-3.5 xs:w-3.5 xs:h-3.5 sm:w-4 sm:h-4 md:w-4 md:h-4 lg:w-4 lg:h-4 xl:w-4 xl:h-4" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleDeleteEvent(event.id)}
              className="p-1 xs:p-1.5 sm:p-2 lg:p-2.5 text-red-500 hover:bg-red-100 rounded-md sm:rounded-lg transition-colors shadow-sm"
              aria-label="Delete event"
            >
              <Trash2 className="w-3.5 h-3.5 xs:w-3.5 xs:h-3.5 sm:w-4 sm:h-4 md:w-4 md:h-4 lg:w-4 lg:h-4 xl:w-4 xl:h-4" />
            </motion.button>
          </div>
          <div className="flex items-center">
            <span className="px-1.5 py-0.5 xs:px-2 xs:py-1 sm:px-2.5 sm:py-1 lg:px-3 lg:py-1.5 bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 rounded-full text-2xs xs:text-xs sm:text-sm font-semibold truncate max-w-[60px] xs:max-w-[70px] sm:max-w-[80px] lg:max-w-[90px] xl:max-w-[100px]">
              {event.category}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default EventCard;