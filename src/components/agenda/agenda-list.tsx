
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { MoreVertical, Clock, User, Stethoscope } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';

const mockAppointments = [
  {
    id: 1,
    time: '08:00',
    patient: 'João Silva',
    professional: 'Dr. Eduardo',
    service: 'Consulta',
    status: 'agendado',
    statusColor: 'bg-blue-100 text-blue-800'
  },
  {
    id: 2,
    time: '09:00',
    patient: 'Maria Souza',
    professional: 'Dr. Eduardo',
    service: 'Consulta',
    status: 'confirmado',
    statusColor: 'bg-green-100 text-green-800'
  },
  {
    id: 3,
    time: '10:00',
    patient: 'Carlos Mendes',
    professional: 'Dr. Luís',
    service: 'Exame',
    status: 'em atendimento',
    statusColor: 'bg-yellow-100 text-yellow-800'
  },
  {
    id: 4,
    time: '11:00',
    patient: 'Ana Pereira',
    professional: 'Dr. Joel',
    service: 'Consulta',
    status: 'atendido',
    statusColor: 'bg-gray-100 text-gray-800'
  },
  {
    id: 5,
    time: '12:00',
    patient: 'Rafael Costa',
    professional: 'Dra. Carla',
    service: 'Consulta',
    status: 'faltou',
    statusColor: 'bg-red-100 text-red-800'
  }
];

export function AgendaList() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Agendamentos de Hoje
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Horário</TableHead>
              <TableHead>Paciente</TableHead>
              <TableHead>Profissional</TableHead>
              <TableHead>Serviço</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[100px]">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockAppointments.map((appointment) => (
              <TableRow key={appointment.id}>
                <TableCell className="font-medium">{appointment.time}</TableCell>
                <TableCell className="flex items-center gap-2">
                  <User className="h-4 w-4 text-gray-400" />
                  {appointment.patient}
                </TableCell>
                <TableCell className="flex items-center gap-2">
                  <Stethoscope className="h-4 w-4 text-gray-400" />
                  {appointment.professional}
                </TableCell>
                <TableCell>{appointment.service}</TableCell>
                <TableCell>
                  <Badge className={appointment.statusColor}>
                    {appointment.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-white">
                      <DropdownMenuItem>Confirmar Presença</DropdownMenuItem>
                      <DropdownMenuItem>Reagendar</DropdownMenuItem>
                      <DropdownMenuItem>Cancelar</DropdownMenuItem>
                      <DropdownMenuItem>Enviar Lembrete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
