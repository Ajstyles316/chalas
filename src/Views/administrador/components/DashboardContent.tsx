import React from 'react';
import { UserList } from './UserList';
import { OrderReport } from './OrderReport';
import { CouponUsage } from './CouponUsage';
import { EventsChart } from './EventsChart';
import { SalesReport } from './SalesReport';

export const DashboardContent = () => {
  return (
    <main className="flex-1 p-6">
      <div className="grid gap-6">
        <UserList />
        <OrderReport />
        <CouponUsage />
        <EventsChart />
        <SalesReport />
      </div>
    </main>
  );
};