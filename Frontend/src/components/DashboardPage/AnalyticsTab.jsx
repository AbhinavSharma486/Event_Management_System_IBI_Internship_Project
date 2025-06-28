import React, { useState, useEffect } from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';

const AnalyticsTab = () => {
  const [chartData] = useState([
    { name: 'Jan', events: 10, attendees: 200 },
    { name: 'Feb', events: 14, attendees: 240 },
    { name: 'Mar', events: 12, attendees: 220 },
    { name: 'Apr', events: 18, attendees: 310 },
    { name: 'May', events: 16, attendees: 280 }
  ]);

  const [categoryData] = useState([
    { name: 'Conference', value: 400, color: '#8B5CF6' },
    { name: 'Workshop', value: 300, color: '#06B6D4' },
    { name: 'Webinar', value: 200, color: '#F59E0B' },
    { name: 'Meetup', value: 100, color: '#10B981' }
  ]);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="p-3 sm:p-4 md:p-6 space-y-4 sm:space-y-6">
      {/* Events by Month Chart */}
      <div className="bg-white rounded-xl border border-gray-200 p-3 sm:p-4 md:p-6">
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">
          Events by Month
        </h3>
        <div className="h-60 xs:h-64 sm:h-72 md:h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 10, right: 10, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="name" tick={{ fontSize: isMobile ? 10 : 12 }} />
              <YAxis tick={{ fontSize: isMobile ? 10 : 12 }} />
              <Tooltip />
              <Bar dataKey="events" fill="#8B5CF6" name="Events" />
              <Bar dataKey="attendees" fill="#06B6D4" name="Attendees" />
              {isMobile && <Legend iconSize={10} />}
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Event Categories Pie Chart */}
        <div className="bg-white rounded-xl border border-gray-200 p-3 sm:p-4 md:p-6">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">
            Event Categories
          </h3>
          <div className="h-60 xs:h-64 sm:h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={isMobile ? 60 : 80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                {!isMobile && <Legend />}
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="bg-white rounded-xl border border-gray-200 p-3 sm:p-4 md:p-6">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">
            Performance Metrics
          </h3>
          <div className="space-y-2 sm:space-y-3 md:space-y-4">
            {[
              { label: 'Registration Rate', value: '78%', change: '+12%' },
              { label: 'Check-in Rate', value: '92%', change: '+5%' },
              { label: 'Satisfaction Score', value: '4.7/5', change: '+0.3' },
              { label: 'Return Attendees', value: '42%', change: '+8%' },
            ].map((metric, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-2 sm:p-3 border-b border-gray-100"
              >
                <div>
                  <p className="text-sm sm:text-base font-medium text-gray-900">
                    {metric.label}
                  </p>
                  <p className="text-xl sm:text-2xl font-bold text-gray-900">
                    {metric.value}
                  </p>
                </div>
                <span className="px-2 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs sm:text-sm">
                  {metric.change}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsTab;