
import React from 'react';
import { MainLayout } from '../components/layout/main-layout';
import { StatsCards } from '../components/dashboard/stats-cards';
import { AppointmentsChart } from '../components/dashboard/appointments-chart';
import { RecentAppointments } from '../components/dashboard/recent-appointments';
import { DashboardActionCards } from '../components/dashboard/dashboard-action-cards';
import { UpcomingAppointments } from '../components/dashboard/upcoming-appointments';
import { CashFlow } from '../components/dashboard/cash-flow';
import { ProcedureStats } from '../components/dashboard/procedure-stats';
import { WeekBirthdays } from '../components/dashboard/week-birthdays';

export default function Dashboard() {
  return (
    <MainLayout>
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Bem-vindo</h1>
          <p className="text-gray-600">Visão geral do seu consultório</p>
        </div>

        <DashboardActionCards />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <StatsCards />
            <AppointmentsChart />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ProcedureStats />
              <div className="space-y-4">
                <CashFlow />
                <WeekBirthdays />
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <UpcomingAppointments />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
