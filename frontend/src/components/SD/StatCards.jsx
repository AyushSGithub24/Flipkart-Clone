import React from 'react';
import { Package, Users, DollarSign, TrendingUp } from 'lucide-react';

const StatCard = ({ title, value, change, changeType, icon, bgColor }) => {
    return (
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-gray-500 mb-1">{title}</p>
            <h3 className="text-2xl font-bold">{value}</h3>
            <p className={`${changeType === 'positive' ? 'text-green-500' : 'text-yellow-500'} text-sm`}>
              {change}
            </p>
          </div>
          <div className={`p-3 ${bgColor} rounded-full`}>
            {icon}
          </div>
        </div>
      </div>
    );
  };

const StatCards = () => {
  const stats = [
    {
      title: 'Total Sales',
      value: '₹149,543',
      change: '+18% from last month',
      changeType: 'positive',
      icon: <DollarSign size={24} className="text-indigo-600" />,
      bgColor: 'bg-indigo-100'
    },
    {
      title: 'Products',
      value: '24',
      change: '+3 new this month',
      changeType: 'positive',
      icon: <Package size={24} className="text-green-600" />,
      bgColor: 'bg-green-100'
    },
    {
      title: 'Customers',
      value: '1,245',
      change: '+12% from last month',
      changeType: 'positive',
      icon: <Users size={24} className="text-blue-600" />,
      bgColor: 'bg-blue-100'
    },
    {
      title: 'Conversion Rate',
      value: '3.8%',
      change: '-0.5% from last month',
      changeType: 'negative',
      icon: <TrendingUp size={24} className="text-yellow-600" />,
      bgColor: 'bg-yellow-100'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 mt-[100px]">
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  );
};

export default StatCards;