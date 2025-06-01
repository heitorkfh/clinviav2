
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const data = [
  { day: 'Seg', appointments: 8 },
  { day: 'Ter', appointments: 12 },
  { day: 'Qua', appointments: 15 },
  { day: 'Qui', appointments: 10 },
  { day: 'Sex', appointments: 18 },
  { day: 'Sáb', appointments: 6 },
  { day: 'Dom', appointments: 2 },
];

export function AppointmentsChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Agendamentos da Semana</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="appointments"
              stroke="#4F46E5"
              fill="#4F46E5"
              fillOpacity={0.1}
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
