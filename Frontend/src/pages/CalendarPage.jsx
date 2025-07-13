import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Calendar, Clock, MapPin, Users, RefreshCw } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { fetchCalendarEvents } from '../slices/eventSlice';

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const CalendarPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { calendarEvents = [], loading, error } = useSelector(state => state.events);
  const currentUser = useSelector(state => state.auth.currentUser);
  const isAuthenticated = !!currentUser;
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    dispatch(fetchCalendarEvents());
  }, [dispatch]);

  const handleRefresh = async () => {
    setRefreshing(true);

    try {
      await dispatch(fetchCalendarEvents()).unwrap();
      toast.success('Calendar refreshed!');
    } catch (error) {
      toast.error('Failed to refresh calendar');
    } finally {
      setRefreshing(false);
    }
  };

  // simplified date functions for this demo
  const format = (date, formatStr) => {
    const option = {
      'MMMM yyyy': { month: 'long', year: 'numeric' },
      'MMMM d, yyyy': { month: 'long', day: 'numeric', year: 'numeric' },
      'MMM d': { month: 'short', day: 'numeric' },
      'd': { day: 'numeric' }
    };
    return new Intl.DateTimeFormat('en-US', options[formatStr] || {}).format(date);
  };

  const startOfMonth = (date) => new Date(date.getFullYear(), date.getMonth(), 1);
  const endOfMonth = (date) => new Date(date.getFullYear(), date.getMonth() + 1, 0);
  const eachDayOfInterval = ({ start, end }) => {
    const days = [];
    const current = new Date(start);
    while (current <= end) {
      days.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }
    return days;
  };

  const isSameMonth = (date1, date2) =>
    date1.getMonth() === date2.getMonth() && date1.getFullYear() === date2.getFullYear();

  const isSameDay = (date1, date2) =>
    date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear();

  const isToday = (date) => isSameDay(date, new Date());

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const calendarDays = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const getEventsForDate = (date) => {
    return calendarEvents.filter(event => {
      const eventDate = new Date(event.date);
      return isSameDay(eventDate, date);
    });
  };

  const selectedDateEvents = selectedDate ? getEventsForDate(selectedDate) : [];

  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate);
    if (direction === 'prev') {
      newDate.setMonth(currentDate.getMonth() - 1);
    }
    else {
      newDate.setMonth(currentDate.getMonth() + 1);
    }
    setCurrentDate(newDate);
  };

  const handleEventClick = (event) => {
    navigate(`/event/${event._id}`);
  };

  const getUpcomingEvents = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return calendarEvents
      .filter(event => new Date(event.date) >= today)
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .slice(0, 5);
  };

  const upcomingEvents = getUpcomingEvents();

  if (loading && !refreshing) {
    return (
      <div className="min-h-screen pt-20 pb-10 px-4 bg-gradient-to-tl from-indigo-900 via-fuchsia-800 to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading calendar...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 via-pink-100 to-purple-100 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 px-1 sm:px-2 py-4 sm:py-8">
      <div className="w-full max-w-full sm:max-w-3xl lg:max-w-5xl mx-auto flex flex-col md:flex-row gap-4 sm:gap-8">
        {/* Calendar Card */}
        <div className="flex-1 bg-white/80 dark:bg-gray-900/80 rounded-2xl sm:rounded-3xl shadow-2xl p-3 sm:p-6 md:p-8 lg:p-10 border border-gray-200 dark:border-gray-800 backdrop-blur-lg min-w-0">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <button
              className={`p-2 sm:p-2.5 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:scale-110 transition ${(currentDate.getFullYear() === new Date().getFullYear() && currentDate.getMonth() === new Date().getMonth()) ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={() => {
                // Only allow prev if not at current month/year
                const now = new Date();
                if (currentDate.getFullYear() === now.getFullYear() && currentDate.getMonth() === now.getMonth()) return;
                navigateMonth('prev');
              }}
              disabled={currentDate.getFullYear() === new Date().getFullYear() && currentDate.getMonth() === new Date().getMonth()}
              title="Previous Month"
            >
              <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
            </button>
            <h2 className="text-lg sm:text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-blue-500 via-pink-500 to-purple-500 bg-clip-text text-transparent text-center truncate max-w-[120px] sm:max-w-xs md:max-w-md">
              {format(currentDate, 'MMMM yyyy')}
            </h2>
            <button
              className="p-2 sm:p-2.5 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:scale-110 transition"
              onClick={() => navigateMonth('next')}
              title="Next Month"
            >
              <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
            </button>
          </div>
          <div className="grid grid-cols-7 gap-1 sm:gap-2 mb-1 sm:mb-2 text-xs sm:text-base">
            {daysOfWeek.map(day => (
              <div key={day} className="text-center font-semibold text-gray-700 dark:text-gray-200 py-1 sm:py-2">
                {day}
              </div>
            ))}
          </div>
          {/* Calendar Days */}
          <div className="grid grid-cols-7 gap-1 sm:gap-2">
            {/* Fill empty days at start of month */}
            {Array(monthStart.getDay()).fill(null).map((_, i) => (
              <div key={`empty-${i}`} />
            ))}
            {calendarDays.map((date, idx) => {
              const isCurrentMonth = isSameMonth(date, currentDate);
              const isSelected = selectedDate && isSameDay(date, selectedDate);
              const hasEvents = getEventsForDate(date).length > 0;
              const today = new Date();
              today.setHours(0, 0, 0, 0);
              if (date < today) return null;
              return (
                <button
                  key={date.toISOString()}
                  className={`relative flex flex-col items-center justify-center h-8 w-8 sm:h-12 sm:w-full md:h-16 md:w-full rounded-lg sm:rounded-xl border transition-all
                    ${isSelected ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white border-blue-500 dark:border-purple-500 scale-105 shadow-lg' :
                      isToday(date) ? 'border-pink-400 dark:border-pink-500 bg-pink-100/60 dark:bg-pink-900/30 text-pink-700 dark:text-pink-200' :
                        isCurrentMonth ? 'bg-white/70 dark:bg-gray-800/70 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100' :
                          'bg-gray-100/60 dark:bg-gray-800/30 border-gray-100 dark:border-gray-800 text-gray-400 dark:text-gray-600'}
                  `}
                  onClick={() => setSelectedDate(new Date(date))}
                  disabled={!isCurrentMonth}
                >
                  <span className="font-bold text-xs sm:text-base">{date.getDate()}</span>
                  {hasEvents && <span className="absolute bottom-1 sm:bottom-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-gradient-to-r from-blue-500 to-pink-500" />}
                </button>
              );
            })}
          </div>
          {/* Selected Date Events */}
          <div className="mt-4 sm:mt-8">
            {selectedDate && (
              <div className="bg-white/90 dark:bg-gray-900/90 rounded-xl sm:rounded-2xl shadow-lg p-3 sm:p-6 border border-gray-200 dark:border-gray-800 overflow-x-auto">
                <div className="flex items-center gap-2 mb-2 sm:mb-4">
                  <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-purple-500" />
                  <span className="font-semibold text-gray-900 dark:text-white text-base sm:text-lg">
                    Events on {format(selectedDate, 'MMMM d, yyyy')}
                  </span>
                </div>
                {selectedDateEvents.length === 0 ? (
                  <div className="text-gray-500 dark:text-gray-400">No events on this day.</div>
                ) : (
                  <ul className="space-y-2 sm:space-y-4">
                    {selectedDateEvents.map(event => (
                      <li key={event._id} className="bg-gradient-to-r from-blue-100 via-pink-100 to-purple-100 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 rounded-lg sm:rounded-xl p-2 sm:p-4 flex flex-col md:flex-row md:items-center gap-2 border border-gray-200 dark:border-gray-700 shadow">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-bold text-base sm:text-lg text-blue-700 dark:text-blue-300 truncate max-w-[120px] sm:max-w-xs md:max-w-md">{event.title}</span>
                            <span className="ml-2 text-xs px-2 py-1 rounded-full bg-blue-200 dark:bg-blue-900 text-blue-800 dark:text-blue-200 font-semibold">{event.status || 'Scheduled'}</span>
                          </div>
                          <div className="flex flex-wrap gap-2 sm:gap-4 text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                            <span className="flex items-center gap-1"><Clock className="h-3 w-3 sm:h-4 sm:w-4 text-purple-500" /> {event.time}</span>
                            <span className="flex items-center gap-1"><MapPin className="h-3 w-3 sm:h-4 sm:w-4 text-pink-500" /> {event.location}</span>
                            <span className="flex items-center gap-1"><Users className="h-3 w-3 sm:h-4 sm:w-4 text-green-500" /> {event.attendees?.length || 0}/{event.maxAttendees || 10}</span>
                          </div>
                        </div>
                        <button
                          className="px-2 py-1 sm:px-4 sm:py-2 rounded-lg sm:rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold shadow hover:from-blue-600 hover:to-purple-700 transition text-xs sm:text-base"
                          onClick={() => navigate(`/events/${event._id}`)}
                        >
                          View Details
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>
        </div>
        {/* Upcoming Events Sidebar */}
        <div className="w-full md:w-80 flex flex-col gap-4 sm:gap-6 min-w-0">
          <div className="bg-white/80 dark:bg-gray-900/80 rounded-2xl sm:rounded-3xl shadow-2xl p-3 sm:p-6 border border-gray-200 dark:border-gray-800 backdrop-blur-lg flex flex-col gap-2 sm:gap-4">
            <div className="flex items-center justify-between mb-1 sm:mb-2">
              <h3 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-blue-500 via-pink-500 to-purple-500 bg-clip-text text-transparent">Upcoming Events</h3>
              <button
                className={`p-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:scale-110 transition ${refreshing ? 'opacity-60 cursor-not-allowed' : ''}`}
                onClick={handleRefresh}
                disabled={refreshing}
                title="Refresh"
              >
                {refreshing ? (
                  <RefreshCw className="h-4 w-4 sm:h-5 sm:w-5 animate-spin" />
                ) : (
                  <RefreshCw className="h-4 w-4 sm:h-5 sm:w-5" />
                )}
              </button>
            </div>
            {upcomingEvents.length === 0 ? (
              <div className="text-gray-500 dark:text-gray-400">No upcoming events.</div>
            ) : (
              <ul className="space-y-2 sm:space-y-4">
                {upcomingEvents.map(event => (
                  <li key={event._id} className="bg-gradient-to-r from-blue-100 via-pink-100 to-purple-100 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 rounded-lg sm:rounded-xl p-2 sm:p-4 border border-gray-200 dark:border-gray-700 shadow flex flex-col gap-1">
                    <span className="font-bold text-base sm:text-lg text-blue-700 dark:text-blue-300 truncate max-w-[120px] sm:max-w-xs md:max-w-md">{event.title}</span>
                    <span className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 flex items-center gap-1"><Calendar className="h-3 w-3 sm:h-4 sm:w-4 text-purple-500" /> {format(new Date(event.date), 'MMM d')}</span>
                    <span className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 flex items-center gap-1"><Clock className="h-3 w-3 sm:h-4 sm:w-4 text-purple-500" /> {event.time}</span>
                    <span className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 flex items-center gap-1"><MapPin className="h-3 w-3 sm:h-4 sm:w-4 text-pink-500" /> {event.location}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;