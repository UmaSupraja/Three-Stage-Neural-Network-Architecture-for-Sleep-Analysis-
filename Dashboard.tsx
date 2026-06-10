import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

// Simplified subset of data for visualization purposes
const DATA_DISTRIBUTION = [
  { name: 'Insomnia', count: 77, fill: '#ef4444' }, // Red
  { name: 'Sleep Apnea', count: 78, fill: '#f97316' }, // Orange
  { name: 'Narcolepsy', count: 45, fill: '#eab308' }, // Yellow
  { name: 'REM Behavior', count: 56, fill: '#6366f1' }, // Indigo (Updated)
  { name: 'None', count: 219, fill: '#3b82f6' }, // Blue (Updated)
];

const AGE_VS_SLEEP = [
  { age: '20-30', avgSleep: 7.2 },
  { age: '30-40', avgSleep: 7.1 },
  { age: '40-50', avgSleep: 6.8 },
  { age: '50-60', avgSleep: 6.5 },
];

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <h2 className="text-xl font-bold text-slate-800 mb-4">Dataset Overview</h2>
        <p className="text-slate-600 mb-6">
          Visualizing the distribution of sleep disorders and correlations in the provided 5,000+ patient dataset.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="h-80">
            <h3 className="text-center font-medium text-slate-600 mb-4">Disorder Class Distribution</h3>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={DATA_DISTRIBUTION}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="count"
                  label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {DATA_DISTRIBUTION.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="h-80">
            <h3 className="text-center font-medium text-slate-600 mb-4">Avg Sleep Duration by Age Group</h3>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={AGE_VS_SLEEP}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="age" />
                <YAxis domain={[0, 10]} />
                <Tooltip />
                <Legend />
                <Bar dataKey="avgSleep" fill="#2563eb" name="Hours of Sleep" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h4 className="text-4xl font-bold text-blue-600">5,000</h4>
            <p className="text-slate-500 font-medium">Total Patient Records</p>
         </div>
         <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h4 className="text-4xl font-bold text-indigo-600">22</h4>
            <p className="text-slate-500 font-medium">Clinical Features</p>
         </div>
         <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h4 className="text-4xl font-bold text-amber-500">4</h4>
            <p className="text-slate-500 font-medium">Target Classes</p>
         </div>
      </div>
    </div>
  );
};

export default Dashboard;