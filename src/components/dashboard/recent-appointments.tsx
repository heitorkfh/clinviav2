
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Clock, User, Stethoscope } from 'lucide-react';

const appointments = [
  {
    id: '1',
    time: '08:00',
    patient: 'João Silva',
    professional: 'Dr. Eduardo',
    service: 'Consulta',
    status: 'confirmed',
  },
  {
    id: '2',
    time: '09:00',
    patient: 'Maria Souza',
    professional: 'Dr. Eduardo',
    service: 'Consulta',
    status: 'scheduled',
  },
  {
    id: '3',
    time: '10:00',
    patient: 'Pedro Santos',
    professional: 'Dr. Luís',
    service: 'Exame',
    status: 'in-progress',
  },
];

const statusColors = {
  scheduled: 'bg-blue-100 text-blue-800',
  confirmed: 'bg-green-100 text-green-800',
  'in-progress': 'bg-yellow-100 text-yellow-800',
  completed: 'bg-gray-100 text-gray-800',
  cancelled: 'bg-red-100 text-red-800',
};

const statusLabels = {
  scheduled: 'Agendado',
  confirmed: 'Confirmado',
  'in-progress': 'Em Andamento',
  completed: 'Concluído',
  cancelled: 'Cancelado',
};

export function RecentAppointments() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Próximos Agendamentos</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {appointments.map((appointment) => (
          <div
            key={appointment.id}
            className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Clock className="h-4 w-4" />
                <span>{appointment.time}</span>
              </div>
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4 text-gray-400" />
                  <span className="font-medium">{appointment.patient}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Stethoscope className="h-4 w-4" />
                  <span>{appointment.professional} - {appointment.service}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge className={statusColors[appointment.status as keyof typeof statusColors]}>
                {statusLabels[appointment.status as keyof typeof statusLabels]}
              </Badge>
              <Button variant="outline" size="sm">
                Atender
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
