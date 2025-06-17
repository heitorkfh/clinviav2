import React, { useState } from 'react';
import { MainLayout } from '../components/layout/main-layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Button } from '../components/ui/button';
import { Plus, Calendar as CalendarIcon } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { AgendaList } from '../components/agenda/agenda-list';
import { AgendaSemanal } from '../components/agenda/agenda-semanal';
import { AgendaKanban } from '../components/agenda/agenda-kanban';
import { Dialog, DialogContent, DialogTrigger } from '../components/ui/dialog';
import { NovoAgendamento } from '../components/agenda/novo-agendamento';
import { Card, CardContent } from '../components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../components/ui/dropdown-menu';
import { Badge } from '../components/ui/badge';
import { Avatar, AvatarFallback } from '../components/ui/avatar';

const statusColors = {
  'agendado': 'bg-blue-100 text-blue-800 border-blue-200',
  'confirmado': 'bg-green-100 text-green-800 border-green-200', 
  'em-atendimento': 'bg-yellow-100 text-yellow-800 border-yellow-200',
  'atendido': 'bg-gray-100 text-gray-800 border-gray-200',
  'faltou': 'bg-red-100 text-red-800 border-red-200',
  'desmarcado': 'bg-orange-100 text-orange-800 border-orange-200'
};

const mockAppointments = [
  {
    id: 1,
    time: '08:00',
    service: 'CONSULTA',
    arrival: 'N/A',
    status: 'agendado',
    patient: { name: 'LUIS CARLOS DA SILVA', icon: '$' }
  },
  {
    id: 2,
    time: '09:00',
    service: 'CONSULTA',
    arrival: 'N/A',
    status: 'confirmado',
    patient: { name: 'MARIA SOUZA', icon: '$' }
  },
  {
    id: 3,
    time: '11:00',
    service: 'CONSULTA',
    arrival: 'N/A',
    status: 'em-atendimento',
    patient: { name: 'THIAGO MONTEIRO', icon: '$' }
  },
  {
    id: 4,
    time: '11:30',
    service: 'CONSULTA',
    arrival: 'N/A',
    status: 'atendido',
    patient: { name: 'BEATRIZ ALMEIDA', icon: '$' }
  },
  {
    id: 5,
    time: '12:00',
    service: 'CONSULTA',
    arrival: 'N/A',
    status: 'faltou',
    patient: { name: 'RAFAEL COSTA', icon: '$' }
  },
  {
    id: 6,
    time: '13:00',
    service: 'CONSULTA',
    arrival: 'N/A',
    status: 'desmarcado',
    patient: { name: 'AMANDA CARVALHO', icon: '$' }
  }
];

export default function Agenda() {
  const [isNewAppointmentOpen, setIsNewAppointmentOpen] = useState(false);
  const [view, setView] = useState('lista');

  return (
    <MainLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Agenda</h1>
          </div>
          
          <div className="flex items-center gap-3">
            <Button variant="outline" className="bg-blue-600 text-white hover:bg-blue-700">
              <CalendarIcon className="h-4 w-4 mr-2" />
              Ouvir agenda do dia
            </Button>
            
            <Dialog open={isNewAppointmentOpen} onOpenChange={setIsNewAppointmentOpen}>
              <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  <Plus className="h-4 w-4 mr-2" />
                  Novo agendamento
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <NovoAgendamento onClose={() => setIsNewAppointmentOpen(false)} />
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Simplified Filters */}
        <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-lg">
          <span className="text-sm font-medium text-gray-700">Filtrar por</span>
          
          <Select>
            <SelectTrigger className="w-40 bg-white">
              <SelectValue placeholder="Tipo de Consulta" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="consulta">Consulta</SelectItem>
              <SelectItem value="retorno">Retorno</SelectItem>
              <SelectItem value="exame">Exame</SelectItem>
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger className="w-40 bg-white">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="agendado">Agendado</SelectItem>
              <SelectItem value="confirmado">Confirmado</SelectItem>
              <SelectItem value="em-atendimento">Em atendimento</SelectItem>
              <SelectItem value="atendido">Atendido</SelectItem>
              <SelectItem value="faltou">Faltou</SelectItem>
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger className="w-40 bg-white">
              <SelectValue placeholder="Paciente" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem value="all">Todos</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Tabs */}
        <Tabs value={view} onValueChange={setView} className="w-full">
          <TabsList className="grid w-full grid-cols-3 lg:w-fit bg-gray-100">
            <TabsTrigger value="lista" className="data-[state=active]:bg-white">Lista</TabsTrigger>
            <TabsTrigger value="dia" className="data-[state=active]:bg-white">Dia</TabsTrigger>
            <TabsTrigger value="semana" className="data-[state=active]:bg-white">Semana</TabsTrigger>
          </TabsList>
          
          <TabsContent value="lista" className="mt-6">
            <Card>
              <CardContent className="p-0">
                <div className="overflow-hidden">
                  {/* Header */}
                  <div className="grid grid-cols-5 bg-gray-50 text-sm font-medium text-gray-700 p-4 border-b">
                    <div>HORÁRIO</div>
                    <div>TIPO DE CONSULTA</div>
                    <div>CHEGADA</div>
                    <div>STATUS</div>
                    <div>PACIENTE</div>
                  </div>

                  {/* Appointments */}
                  <div className="divide-y">
                    {mockAppointments.map((appointment) => (
                      <div key={appointment.id} className="grid grid-cols-5 items-center p-4 hover:bg-gray-50 transition-colors">
                        <div className="font-medium text-blue-600">{appointment.time}</div>
                        <div className="text-sm text-gray-900">{appointment.service}</div>
                        <div className="text-sm text-gray-500">{appointment.arrival}</div>
                        <div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className={`${statusColors[appointment.status as keyof typeof statusColors]} border rounded-md px-2 py-1 text-xs font-medium uppercase cursor-pointer hover:opacity-80`}>
                                {appointment.status}
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="bg-white">
                              <DropdownMenuItem>Agendado</DropdownMenuItem>
                              <DropdownMenuItem>Confirmado</DropdownMenuItem>
                              <DropdownMenuItem>Em atendimento</DropdownMenuItem>
                              <DropdownMenuItem>Atendido</DropdownMenuItem>
                              <DropdownMenuItem>Faltou</DropdownMenuItem>
                              <DropdownMenuItem>Desmarcado</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-orange-500 font-bold">{appointment.patient.icon}</span>
                            <span className="text-sm text-gray-900">{appointment.patient.name}</span>
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="text-blue-600 hover:bg-blue-50">
                                ATENDER →
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="bg-white">
                              <DropdownMenuItem>Iniciar atendimento</DropdownMenuItem>
                              <DropdownMenuItem>Editar agendamento</DropdownMenuItem>
                              <DropdownMenuItem>Cancelar</DropdownMenuItem>
                              <DropdownMenuItem>Enviar lembrete</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="dia" className="mt-6">
            <AgendaKanban />
          </TabsContent>
          
          <TabsContent value="semana" className="mt-6">
            <AgendaSemanal />
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}
