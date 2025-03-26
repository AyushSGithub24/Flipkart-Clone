import React from 'react';

// Time frame options
export const timeFrames = [
  { label: '1 Day', value: 1 },
  { label: '5 Days', value: 5 },
  { label: '1 Week', value: 7 },
  { label: '1 Month', value: 30 },
  { label: '1 Year', value: 365 }
];

// Sample product data
export const productsList = [
  { 
    id: 1, 
    name: 'Wireless Bluetooth Headphones', 
    price: 1499, 
    stock: 45, 
    image: '/api/placeholder/100/100', 
    sales: 128,
    rating: 4.3
  },
  { 
    id: 2, 
    name: 'Smart LED TV 43-inch', 
    price: 28999, 
    stock: 12, 
    image: '/api/placeholder/100/100', 
    sales: 57,
    rating: 4.1
  },
  { 
    id: 3, 
    name: 'Smartphone Power Bank 20000mAh', 
    price: 1299, 
    stock: 78, 
    image: '/api/placeholder/100/100', 
    sales: 215,
    rating: 4.5
  },
  { 
    id: 4, 
    name: 'Memory Foam Pillow Set', 
    price: 899, 
    stock: 32, 
    image: '/api/placeholder/100/100', 
    sales: 89,
    rating: 3.9
  }
];

// Generate mock sales data for charts
export const generateSalesData = (days, trend = 'up') => {
  const data = [];
  let lastValue = Math.floor(Math.random() * 500) + 300;
  
  for (let i = 0; i < days; i++) {
    const change = trend === 'up' 
      ? Math.floor(Math.random() * 50) - 10 
      : Math.floor(Math.random() * 50) - 30;
    
    lastValue = Math.max(50, lastValue + change);
    data.push({
      date: new Date(Date.now() - (days - i) * 86400000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      sales: lastValue
    });
  }
  return data;
};

