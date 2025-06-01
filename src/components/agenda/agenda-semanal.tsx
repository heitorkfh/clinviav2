
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Badge } from '../ui/badge';

const weekDays = [
  { day: 'domingo', date: '25/05', appointments: [] },
  { 
    day: 'segunda-feira', 
    date: '26/05', 
    appointments: [
      { time: '08:00', patient: 'João Santos', service: 'Consulta', color: 'bg-blue-100 border-blue-200' },
      { time: '09:00', patient: 'Maria Silva', service: 'Retorno', color: 'bg-green-100 border-green-200' }
    ]
  },
  { 
    day: 'terça-feira', 
    date: '27/05', 
    appointments: [
      { time: '10:00', patient: 'Ana Pereira', service: 'Exame', color: 'bg-yellow-100 border-yellow-200' },
      { time: '11:00', patient: 'Carlos Mendes', service: 'Consulta', color: 'bg-purple-100 border-purple-200' }
    ]
  },
  { day: 'quarta-feira', date: '28/05', appointments: [] },
  { 
    day: 'quinta-feira', 
    date: '29/05', 
    appointments: [
      { time: '14:00', patient: 'Fernanda Lima', service: 'Primeira vez', color: 'bg-pink-100 border-pink-200' }
    ]
  },
  { 
    day: 'sexta-feira', 
    date: '30/05', 
    appointments: [
      { time: '15:00', patient: 'Ricardo Oliveira', service: 'Retorno', color: 'bg-orange-100 border-orange-200' },
      { time: '16:00', patient: 'Luciana Santos', service: 'Consulta', color: 'bg-teal-100 border-teal-200' }
    ]
  },
  { day: 'sábado', date: '31/05', appointments: [] }
];

const timeSlots = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'];

export function AgendaSemanal() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Agenda Semanal</CardTitle>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm font-medium">25 de maio - 31 de maio de 2025</span>
            <Button variant="outline" size="sm">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-8 gap-1">
          {/* Header */}
          <div className="p-2 text-sm font-medium text-gray-600">Horário</div>
          {weekDays.map((day) => (
            <div key={day.day} className="p-2 text-center">
              <div className="text-sm font-medium text-gray-900 capitalize">{day.day}</div>
              <div className="text-xs text-gray-500">{day.date}</div>
            </div>
          ))}

          {/* Time slots */}
          {timeSlots.map((time) => (
            <React.Fragment key={time}>
              <div className="p-2 text-sm text-gray-600 border-r border-gray-100">
                {time}
              </div>
              {weekDays.map((day) => {
                const appointment = day.appointments.find(apt => apt.time === time);
                return (
                  <div key={`${day.day}-${time}`} className="p-1 min-h-[60px] border-r border-b border-gray-50">
                    {appointment && (
                      <div className={`p-2 rounded-md border ${appointment.color} cursor-pointer hover:shadow-sm`}>
                        <div className="text-xs font-medium">{appointment.patient}</div>
                        <div className="text-xs text-gray-600">{appointment.service}</div>
                      </div>
                    )}
                  </div>
                );
              })}
            </React.Fragment>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
