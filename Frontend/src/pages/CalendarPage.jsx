import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar, Clock, MapPin, Users } from 'lucide-react';

const CalendarPage = () => {
  // Dummy events array instead of using a store
  const events = [
    {
      id: '1',
      title: 'React Workshop',
      date: new Date().toISOString(),
      time: '10:00 AM',
      location: 'Online',
      currentAttendees: 25,
      maxAttendees: 50,
    },
    {
      id: '2',
      title: 'Team Meeting',
      date: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString(),
      time: '2:00 PM',
      location: 'Office',
      currentAttendees: 10,
      maxAttendees: 15,
    },
    {
      id: '3',
      title: 'Product Launch',
      date: new Date(new Date().setDate(new Date().getDate() + 3)).toISOString(),
      time: '5:00 PM',
      location: 'Headquarters',
      currentAttendees: 40,
      maxAttendees: 60,
    }
  ];

  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

  // Simplified date functions for this demo
  const format = (date, formatStr) => {
    const options = {
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
    return events.filter(event => isSameDay(new Date(event.date), date));
  };

  const selectedDateEvents = selectedDate ? getEventsForDate(selectedDate) : [];

  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate);
    if (direction === 'prev') {
      newDate.setMonth(currentDate.getMonth() - 1);
    } else {
      newDate.setMonth(currentDate.getMonth() + 1);
    }
    setCurrentDate(newDate);
  };

  return (
    <div className="space-y-4 sm:space-y-6 lg:space-y-8 min-h-screen pt-20 sm:pt-24 lg:pt-30 pb-6 sm:pb-8 lg:pb-10 px-2 sm:px-4 lg:px-6 xl:px-8 bg-gradient-to-tl from-gray-400 via-gray-600 to-indigo-700">
      {/* Header */}
      <div className="flex flex-col space-y-2 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">Calendar</h1>
          <p className="mt-1 sm:mt-2 text-sm sm:text-base text-white opacity-90">
            View and manage your events in calendar format
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
        {/* Calendar */}
        <div className="xl:col-span-3">
          <div className="bg-white rounded-lg sm:rounded-xl shadow-lg overflow-hidden">
            {/* Calendar Header */}
            <div className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-900">
                  {format(currentDate, 'MMMM yyyy')}
                </h2>
                <div className="flex items-center space-x-1 sm:space-x-2">
                  <button
                    onClick={() => navigateMonth('prev')}
                    className="p-1.5 sm:p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md sm:rounded-lg transition-colors duration-200"
                  >
                    <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
                  </button>
                  <button
                    onClick={() => setCurrentDate(new Date())}
                    className="px-2 sm:px-3 lg:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-purple-600 hover:text-purple-700 hover:bg-purple-50 rounded-md sm:rounded-lg transition-colors duration-200"
                  >
                    Today
                  </button>
                  <button
                    onClick={() => navigateMonth('next')}
                    className="p-1.5 sm:p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md sm:rounded-lg transition-colors duration-200"
                  >
                    <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Calendar Grid */}
            <div className="p-2 sm:p-4 lg:p-6">
              {/* Weekday Headers */}
              <div className="grid grid-cols-7 gap-0.5 sm:gap-1 mb-2 sm:mb-4">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                  <div key={day} className="p-1 sm:p-2 text-center text-xs sm:text-sm font-medium text-gray-500">
                    <span className="hidden sm:inline">{day}</span>
                    <span className="sm:hidden">{day.charAt(0)}</span>
                  </div>
                ))}
              </div>

              {/* Calendar Days */}
              <div className="grid grid-cols-7 gap-0.5 sm:gap-1">
                {calendarDays.map((day) => {
                  const dayEvents = getEventsForDate(day);
                  const isCurrentMonth = isSameMonth(day, currentDate);
                  const isSelected = selectedDate && isSameDay(day, selectedDate);
                  const isTodayDate = isToday(day);

                  return (
                    <button
                      key={day.toISOString()}
                      onClick={() => setSelectedDate(day)}
                      className={`relative p-1 sm:p-2 h-12 sm:h-16 lg:h-20 xl:h-24 border border-gray-100 rounded-md sm:rounded-lg text-left transition-all duration-200 ${isCurrentMonth
                        ? 'bg-white hover:bg-gray-50'
                        : 'bg-gray-50 text-gray-400'
                        } ${isSelected
                          ? 'ring-1 sm:ring-2 ring-purple-500 bg-purple-50'
                          : ''
                        } ${isTodayDate
                          ? 'bg-blue-50 border-blue-200'
                          : ''
                        }`}
                    >
                      <div className={`text-xs sm:text-sm font-medium ${isTodayDate ? 'text-blue-600' : 'text-gray-900'
                        }`}>
                        {format(day, 'd')}
                      </div>

                      {dayEvents.length > 0 && (
                        <div className="mt-0.5 sm:mt-1 space-y-0.5 sm:space-y-1">
                          {dayEvents.slice(0, window.innerWidth < 640 ? 1 : 2).map((event) => (
                            <div
                              key={event.id}
                              className="text-xs px-1 sm:px-2 py-0.5 sm:py-1 bg-purple-100 text-purple-800 rounded truncate"
                            >
                              <span className="hidden sm:inline">{event.title}</span>
                              <span className="sm:hidden">•</span>
                            </div>
                          ))}
                          {dayEvents.length > (window.innerWidth < 640 ? 1 : 2) && (
                            <div className="text-xs text-gray-500 px-1 sm:px-2">
                              <span className="hidden sm:inline">+{dayEvents.length - 2} more</span>
                              <span className="sm:hidden">+{dayEvents.length - 1}</span>
                            </div>
                          )}
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4 sm:space-y-6">
          {/* Selected Date Events */}
          <div className="bg-white rounded-lg sm:rounded-xl shadow-lg p-4 sm:p-6">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">
              {selectedDate ? format(selectedDate, 'MMMM d, yyyy') : 'Select a date'}
            </h3>

            {selectedDate ? (
              selectedDateEvents.length > 0 ? (
                <div className="space-y-3 sm:space-y-4">
                  {selectedDateEvents.map((event) => (
                    <div
                      key={event.id}
                      className="block p-3 sm:p-4 bg-gray-50 rounded-md sm:rounded-lg hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
                    >
                      <h4 className="font-medium text-gray-900 mb-2 text-sm sm:text-base">{event.title}</h4>
                      <div className="space-y-1 text-xs sm:text-sm text-gray-600">
                        <div className="flex items-center">
                          <Clock className="h-3 w-3 sm:h-4 sm:w-4 mr-2 flex-shrink-0" />
                          {event.time}
                        </div>
                        <div className="flex items-center">
                          <MapPin className="h-3 w-3 sm:h-4 sm:w-4 mr-2 flex-shrink-0" />
                          <span className="truncate">{event.location}</span>
                        </div>
                        <div className="flex items-center">
                          <Users className="h-3 w-3 sm:h-4 sm:w-4 mr-2 flex-shrink-0" />
                          {event.currentAttendees}/{event.maxAttendees} attendees
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-xs sm:text-sm">No events scheduled for this date</p>
              )
            ) : (
              <p className="text-gray-500 text-xs sm:text-sm">Click on a date to view events</p>
            )}
          </div>

          {/* Upcoming Events */}
          <div className="bg-white rounded-lg sm:rounded-xl shadow-lg p-4 sm:p-6">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Upcoming Events</h3>

            <div className="space-y-2 sm:space-y-3">
              {events
                .filter(event => new Date(event.date) > new Date())
                .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                .slice(0, 5)
                .map((event) => (
                  <div
                    key={event.id}
                    className="block p-2 sm:p-3 bg-gray-50 rounded-md sm:rounded-lg hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
                  >
                    <h4 className="font-medium text-gray-900 text-xs sm:text-sm mb-1">{event.title}</h4>
                    <div className="flex items-center text-xs text-gray-600 flex-wrap gap-2 sm:gap-0">
                      <div className="flex items-center">
                        <Calendar className="h-3 w-3 mr-1 flex-shrink-0" />
                        {format(new Date(event.date), 'MMM d')}
                      </div>
                      <div className="flex items-center sm:ml-2">
                        <Clock className="h-3 w-3 mr-1 flex-shrink-0" />
                        {event.time}
                      </div>
                    </div>
                  </div>
                ))}

              {events.filter(event => new Date(event.date) > new Date()).length === 0 && (
                <p className="text-gray-500 text-xs sm:text-sm">No upcoming events</p>
              )}
            </div>
          </div>

          {/* Calendar Legend */}
          <div className="bg-white rounded-lg sm:rounded-xl shadow-lg p-4 sm:p-6">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Legend</h3>

            <div className="space-y-2 sm:space-y-3">
              <div className="flex items-center">
                <div className="w-3 h-3 sm:w-4 sm:h-4 bg-blue-100 border border-blue-200 rounded mr-2 sm:mr-3 flex-shrink-0"></div>
                <span className="text-xs sm:text-sm text-gray-600">Today</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 sm:w-4 sm:h-4 bg-purple-100 rounded mr-2 sm:mr-3 flex-shrink-0"></div>
                <span className="text-xs sm:text-sm text-gray-600">Has Events</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 sm:w-4 sm:h-4 bg-purple-50 border-2 border-purple-500 rounded mr-2 sm:mr-3 flex-shrink-0"></div>
                <span className="text-xs sm:text-sm text-gray-600">Selected Date</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;