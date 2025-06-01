
import React from 'react';
import { MainLayout } from '../components/layout/main-layout';
import { StatsCards } from '../components/dashboard/stats-cards';
import { AppointmentsChart } from '../components/dashboard/appointments-chart';
import { RecentAppointments } from '../components/dashboard/recent-appointments';

export default function Dashboard() {
  return (
    <MainLayout>
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Visão geral do seu consultório</p>
        </div>

        <StatsCards />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <AppointmentsChart />
          <RecentAppointments />
        </div>
      </div>
    </MainLayout>
  );
}
