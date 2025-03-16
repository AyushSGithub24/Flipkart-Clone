import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { generateSalesData, timeFrames } from './data/constants';

const TimeFrameSelector = ({ timeFrames, selectedTimeFrame, onSelect }) => {
    return (
      <div className="flex space-x-2">
        {timeFrames.map((tf) => (
          <button
            key={tf.value}
            onClick={() => onSelect(tf.value)}
            className={`px-3 py-1 rounded-md text-sm ${
              selectedTimeFrame === tf.value
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {tf.label}
          </button>
        ))}
      </div>
    );
  };


const SalesChart = ({ selectedTimeFrame, onTimeFrameChange }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Sales Performance</h2>
        <TimeFrameSelector 
          timeFrames={timeFrames}
          selectedTimeFrame={selectedTimeFrame}
          onSelect={onTimeFrameChange}
        />
      </div>
      
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={generateSalesData(selectedTimeFrame, 'up')}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="sales"
              stroke="#4f46e5"
              strokeWidth={2}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SalesChart;