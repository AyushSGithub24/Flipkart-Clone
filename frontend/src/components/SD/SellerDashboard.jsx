import React, { useState } from 'react';
import Header from './Header';
import StatCards from './StatCards';
import SalesChart from './SalesChart';
import ProductsSection from './ProductsSection';
import { timeFrames } from './data/constants';

const SellerDashboard = () => {
  const [selectedTimeFrame, setSelectedTimeFrame] = useState(timeFrames[2].value);

  const handleTimeFrameChange = (days) => {
    setSelectedTimeFrame(days);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-6">
        <StatCards />
        
        <SalesChart 
          selectedTimeFrame={selectedTimeFrame} 
          onTimeFrameChange={handleTimeFrameChange} 
        />
        
        <ProductsSection />
      </main>
    </div>
  );
};

export default SellerDashboard;