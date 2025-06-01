
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Clock, User, Stethoscope, MoreVertical } from 'lucide-react';
import { Button } from '../ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';

const kanbanColumns = [
  {
    id: 'agendado',
    title: 'Agendado',
    color: 'bg-blue-50 border-blue-200',
    appointments: [
      { id: 1, time: '08:00', patient: 'João Silva', professional: 'Dr. Eduardo', service: 'Consulta' },
      { id: 2, time: '13:00', patient: 'Amanda Carvalho', professional: 'Dr. Eduardo', service: 'Consulta' }
    ]
  },
  {
    id: 'confirmado',
    title: 'Confirmado',
    color: 'bg-green-50 border-green-200',
    appointments: [
      { id: 3, time: '09:00', patient: 'Maria Souza', professional: 'Dr. Eduardo', service: 'Consulta' }
    ]
  },
  {
    id: 'em-atendimento',
    title: 'Em Atendimento',
    color: 'bg-yellow-50 border-yellow-200',
    appointments: [
      { id: 4, time: '11:00', patient: 'Thiago Monteiro', professional: 'Dr. Luís', service: 'Consulta' }
    ]
  },
  {
    id: 'atendido',
    title: 'Atendido',
    color: 'bg-gray-50 border-gray-200',
    appointments: [
      { id: 5, time: '11:30', patient: 'Beatriz Almeida', professional: 'Dr. Joel', service: 'Consulta' }
    ]
  },
  {
    id: 'faltou',
    title: 'Faltou',
    color: 'bg-red-50 border-red-200',
    appointments: [
      { id: 6, time: '12:00', patient: 'Rafael Costa', professional: 'Dra. Carla', service: 'Consulta' }
    ]
  },
  {
    id: 'desmarcado',
    title: 'Desmarcado',
    color: 'bg-orange-50 border-orange-200',
    appointments: []
  }
];

export function AgendaKanban() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      {kanbanColumns.map((column) => (
        <Card key={column.id} className={`${column.color} min-h-[400px]`}>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center justify-between">
              {column.title}
              <Badge variant="secondary" className="text-xs">
                {column.appointments.length}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {column.appointments.map((appointment) => (
              <Card key={appointment.id} className="bg-white border shadow-sm hover:shadow-md transition-shadow cursor-move">
                <CardContent className="p-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Clock className="h-3 w-3" />
                      {appointment.time}
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                          <MoreVertical className="h-3 w-3" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-white">
                        <DropdownMenuItem>Confirmar Presença</DropdownMenuItem>
                        <DropdownMenuItem>Reagendar</DropdownMenuItem>
                        <DropdownMenuItem>Cancelar</DropdownMenuItem>
                        <DropdownMenuItem>Enviar Lembrete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex items-center gap-1 text-sm font-medium">
                      <User className="h-3 w-3 text-gray-400" />
                      {appointment.patient}
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Stethoscope className="h-3 w-3" />
                      {appointment.professional}
                    </div>
                    <div className="text-xs text-gray-500">
                      {appointment.service}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
