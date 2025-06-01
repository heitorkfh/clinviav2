
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Clock, User } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

const appointments = [
  {
    id: 1,
    time: '08:00',
    patient: 'João Silva',
    status: 'confirmado',
    service: 'Consulta',
    price: 'R$ 325,00',
    statusColor: 'bg-blue-100 text-blue-800'
  },
  {
    id: 2,
    time: '09:00',
    patient: 'Maria Souza',
    status: 'desmarcado',
    service: 'Consulta',
    price: 'R$ 325,00',
    statusColor: 'bg-orange-100 text-orange-800'
  },
  {
    id: 3,
    time: '10:00',
    patient: 'Beatriz Almeida',
    status: 'faltou',
    service: 'Consulta',
    price: 'R$ 325,00',
    statusColor: 'bg-red-100 text-red-800'
  }
];

export function UpcomingAppointments() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Próximos Agendamentos</CardTitle>
          <Select defaultValue="dr-eduardo">
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem value="dr-eduardo">Dr. Eduardo</SelectItem>
              <SelectItem value="dr-luis">Dr. Luís</SelectItem>
              <SelectItem value="dra-carla">Dra. Carla</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {appointments.map((appointment) => (
          <div key={appointment.id} className="border-l-4 border-blue-500 pl-4 py-3">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-gray-400" />
                <span className="font-medium">{appointment.time}</span>
              </div>
              <Badge className={appointment.statusColor}>
                {appointment.status}
              </Badge>
            </div>
            
            <div className="flex items-center gap-2 mb-2">
              <User className="h-4 w-4 text-gray-400" />
              <span className="font-medium">{appointment.patient}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">{appointment.service}</span>
              <div className="text-right">
                <div className="text-sm text-gray-500">Ticket médio</div>
                <div className="font-medium">{appointment.price}</div>
                <div className="text-xs text-gray-500">por consulta</div>
              </div>
            </div>

            <div className="mt-3">
              <div className="text-xs text-gray-500 mb-1">Comissão</div>
              <div className="font-medium">{appointment.price}</div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
