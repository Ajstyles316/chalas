import React from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { DashboardContent } from './components/DashboardContent';

export const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex">
        <Sidebar />
        <DashboardContent />
      </div>
    </div>
  );
};