import React, { useState } from 'react';
import { motion } from 'framer-motion';
import StatCard from './StatCard';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

const DashboardOverview = () => {
  const [analyticsData] = useState({
    totalEvents: 42,
    totalAttendees: 1280,
    avgAttendance: 76,
    activeEvents: 5,
  });

  const [chartData] = useState([
    { name: 'Jan', events: 10, attendees: 300 },
    { name: 'Feb', events: 12, attendees: 320 },
    { name: 'Mar', events: 9, attendees: 290 },
    { name: 'Apr', events: 15, attendees: 400 },
    { name: 'May', events: 14, attendees: 370 },
  ]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4 sm:p-6 space-y-6"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <StatCard
          label="Total Events"
          value={analyticsData.totalEvents}
          icon="Calendar"
          gradient="from-purple-500 to-purple-600"
          bg="from-purple-50 to-purple-100"
        />
        <StatCard
          label="Total Attendees"
          value={analyticsData.totalAttendees}
          icon="Users"
          gradient="from-blue-500 to-blue-600"
          bg="from-blue-50 to-blue-100"
        />
        <StatCard
          label="Avg Attendance"
          value={`${analyticsData.avgAttendance}%`}
          icon="TrendingUp"
          gradient="from-emerald-500 to-emerald-600"
          bg="from-emerald-50 to-emerald-100"
        />
        <StatCard
          label="Active Events"
          value={analyticsData.activeEvents}
          icon="Eye"
          gradient="from-orange-500 to-orange-600"
          bg="from-orange-50 to-orange-100"
        />
      </div>

      <div className="grid grid-cols-1 gap-6">
        <div className="bg-gradient-to-br from-white via-purple-50/30 to-blue-50/30 backdrop-blur-sm p-4 sm:p-8 rounded-2xl border border-white/20 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
            <div>
              <h3 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Event Performance
              </h3>
              <p className="text-gray-600 mt-1">Track your events and attendee growth over time</p>
            </div>
            <div className="flex space-x-2">
              <div className="flex items-center space-x-2 px-3 py-1 sm:px-4 sm:py-2 bg-purple-100 rounded-full text-xs sm:text-sm">
                <div className="w-2 h-2 sm:w-3 sm:h-3 bg-purple-600 rounded-full"></div>
                <span className="font-medium text-purple-700">Events</span>
              </div>
              <div className="flex items-center space-x-2 px-3 py-1 sm:px-4 sm:py-2 bg-blue-100 rounded-full text-xs sm:text-sm">
                <div className="w-2 h-2 sm:w-3 sm:h-3 bg-blue-600 rounded-full"></div>
                <span className="font-medium text-blue-700">Attendees</span>
              </div>
            </div>
          </div>

          <div className="h-64 sm:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <defs>
                  <linearGradient id="eventsGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0.1} />
                  </linearGradient>
                  <linearGradient id="attendeesGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06B6D4" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#06B6D4" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" strokeOpacity={0.5} />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#6B7280' }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#6B7280' }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    border: 'none',
                    borderRadius: '12px',
                    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
                    backdropFilter: 'blur(10px)'
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="events"
                  stroke="#8B5CF6"
                  strokeWidth={3}
                  dot={{ fill: '#8B5CF6', strokeWidth: 2, r: 6 }}
                  activeDot={{ r: 8, stroke: '#8B5CF6', strokeWidth: 2, fill: '#fff' }}
                  fill="url(#eventsGradient)"
                />
                <Line
                  type="monotone"
                  dataKey="attendees"
                  stroke="#06B6D4"
                  strokeWidth={3}
                  dot={{ fill: '#06B6D4', strokeWidth: 2, r: 6 }}
                  activeDot={{ r: 8, stroke: '#06B6D4', strokeWidth: 2, fill: '#fff' }}
                  fill="url(#attendeesGradient)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default DashboardOverview;