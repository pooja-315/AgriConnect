import React from 'react';
import Navbar from '../../Components/Navbar/Navbar';
import Sidebar from '../../Components/Sidebar/Sidebar';
import Dashboard from '../../Components/Dashboard/Dashboard';

const DashboardPage = () => {
  return (
    <div>
      <div className="navbar">
        <Navbar />
      </div>
      <div className="hero-section">
        <Sidebar />
        <Dashboard />
      </div>
    </div>
  );
};

export default DashboardPage;
