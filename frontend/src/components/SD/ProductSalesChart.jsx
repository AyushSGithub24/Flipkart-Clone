import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { generateSalesData, timeFrames } from './data/constants';

const ProductSalesChart = ({ product }) => {
  const [timeFrame, setTimeFrame] = useState(timeFrames[2].value);
  
  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h4 className="font-medium">Sales Trend: {product.name}</h4>
        <TimeFrameSelector 
          timeFrames={timeFrames}
          selectedTimeFrame={timeFrame}
          onSelect={setTimeFrame}
        />
      </div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={generateSalesData(timeFrame, product.id % 2 === 0 ? 'up' : 'down')}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="sales"
              stroke="#4f46e5"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
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
export default ProductSalesChart;