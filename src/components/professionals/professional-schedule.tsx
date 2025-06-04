
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Switch } from '../ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Badge } from '../ui/badge';
import { Clock, Plus, X } from 'lucide-react';
import { Button } from '../ui/button';

interface ProfessionalScheduleProps {
  isEditing: boolean;
  scheduleData: any;
  onScheduleChange: (field: string, value: any) => void;
}

const weekDays = [
  { key: 'monday', label: 'Segunda-feira', short: 'Seg' },
  { key: 'tuesday', label: 'Terça-feira', short: 'Ter' },
  { key: 'wednesday', label: 'Quarta-feira', short: 'Qua' },
  { key: 'thursday', label: 'Quinta-feira', short: 'Qui' },
  { key: 'friday', label: 'Sexta-feira', short: 'Sex' },
  { key: 'saturday', label: 'Sábado', short: 'Sáb' },
  { key: 'sunday', label: 'Domingo', short: 'Dom' }
];

const generateTimeSlots = (start: string, end: string, lunchStart: string, lunchEnd: string, interval: number) => {
  const slots = [];
  const startTime = new Date(`1970-01-01T${start}:00`);
  const endTime = new Date(`1970-01-01T${end}:00`);
  const lunchStartTime = new Date(`1970-01-01T${lunchStart}:00`);
  const lunchEndTime = new Date(`1970-01-01T${lunchEnd}:00`);
  
  let currentTime = new Date(startTime);
  
  while (currentTime < endTime) {
    // Skip lunch time
    if (currentTime >= lunchStartTime && currentTime < lunchEndTime) {
      currentTime = new Date(lunchEndTime);
      continue;
    }
    
    const timeString = currentTime.toTimeString().slice(0, 5);
    slots.push(timeString);
    currentTime.setMinutes(currentTime.getMinutes() + interval);
  }
  
  return slots;
};

export function ProfessionalSchedule({ isEditing, scheduleData, onScheduleChange }: ProfessionalScheduleProps) {
  const handleDayToggle = (dayKey: string) => {
    const newWorkingDays = {
      ...scheduleData.workingDays,
      [dayKey]: !scheduleData.workingDays[dayKey]
    };
    onScheduleChange('workingDays', newWorkingDays);
  };

  const handleTimeChange = (dayKey: string, type: string, value: string) => {
    const newWorkingHours = {
      ...scheduleData.workingHours,
      [dayKey]: {
        ...scheduleData.workingHours[dayKey],
        [type]: value
      }
    };
    onScheduleChange('workingHours', newWorkingHours);
  };

  return (
    <div className="space-y-6">
      {/* General Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Configurações Gerais
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Duração da Consulta (minutos)</Label>
              {isEditing ? (
                <Select
                  value={scheduleData.appointmentDuration?.toString()}
                  onValueChange={(value) => onScheduleChange('appointmentDuration', parseInt(value))}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15">15 minutos</SelectItem>
                    <SelectItem value="20">20 minutos</SelectItem>
                    <SelectItem value="30">30 minutos</SelectItem>
                    <SelectItem value="45">45 minutos</SelectItem>
                    <SelectItem value="60">60 minutos</SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                <p className="mt-1 font-medium">{scheduleData.appointmentDuration} minutos</p>
              )}
            </div>
            <div>
              <Label>Intervalo entre Consultas (minutos)</Label>
              {isEditing ? (
                <Select
                  value={scheduleData.intervalBetweenAppointments?.toString()}
                  onValueChange={(value) => onScheduleChange('intervalBetweenAppointments', parseInt(value))}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">Sem intervalo</SelectItem>
                    <SelectItem value="5">5 minutos</SelectItem>
                    <SelectItem value="10">10 minutos</SelectItem>
                    <SelectItem value="15">15 minutos</SelectItem>
                    <SelectItem value="30">30 minutos</SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                <p className="mt-1 font-medium">{scheduleData.intervalBetweenAppointments} minutos</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Weekly Schedule */}
      <Card>
        <CardHeader>
          <CardTitle>Horários por Dia da Semana</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {weekDays.map((day) => {
            const isWorking = scheduleData.workingDays[day.key];
            const daySchedule = scheduleData.workingHours[day.key];
            
            return (
              <div key={day.key} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    {isEditing ? (
                      <Switch
                        checked={isWorking}
                        onCheckedChange={() => handleDayToggle(day.key)}
                      />
                    ) : (
                      <div className={`w-4 h-4 rounded-full ${isWorking ? 'bg-green-500' : 'bg-gray-300'}`} />
                    )}
                    <span className="font-medium text-lg">{day.label}</span>
                  </div>
                  {isWorking && (
                    <Badge variant="outline" className="text-green-600">
                      Ativo
                    </Badge>
                  )}
                </div>

                {isWorking && daySchedule && (
                  <div className="space-y-4">
                    {isEditing ? (
                      <div className="grid grid-cols-4 gap-4">
                        <div>
                          <Label className="text-sm">Início Manhã</Label>
                          <Input
                            type="time"
                            value={daySchedule.start}
                            onChange={(e) => handleTimeChange(day.key, 'start', e.target.value)}
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label className="text-sm">Início Almoço</Label>
                          <Input
                            type="time"
                            value={daySchedule.lunchStart}
                            onChange={(e) => handleTimeChange(day.key, 'lunchStart', e.target.value)}
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label className="text-sm">Fim Almoço</Label>
                          <Input
                            type="time"
                            value={daySchedule.lunchEnd}
                            onChange={(e) => handleTimeChange(day.key, 'lunchEnd', e.target.value)}
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label className="text-sm">Fim Tarde</Label>
                          <Input
                            type="time"
                            value={daySchedule.end}
                            onChange={(e) => handleTimeChange(day.key, 'end', e.target.value)}
                            className="mt-1"
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <div className="flex items-center gap-4 text-sm">
                          <span className="font-medium">Horário:</span>
                          <span>{daySchedule.start} - {daySchedule.lunchStart}</span>
                          <span>•</span>
                          <span>{daySchedule.lunchEnd} - {daySchedule.end}</span>
                        </div>
                        
                        {/* Available Time Slots Preview */}
                        <div>
                          <span className="text-sm font-medium text-gray-600 mb-2 block">
                            Horários Disponíveis (exemplo):
                          </span>
                          <div className="flex flex-wrap gap-1">
                            {generateTimeSlots(
                              daySchedule.start,
                              daySchedule.end,
                              daySchedule.lunchStart,
                              daySchedule.lunchEnd,
                              scheduleData.intervalBetweenAppointments || 15
                            ).slice(0, 8).map((slot, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {slot}
                              </Badge>
                            ))}
                            {generateTimeSlots(
                              daySchedule.start,
                              daySchedule.end,
                              daySchedule.lunchStart,
                              daySchedule.lunchEnd,
                              scheduleData.intervalBetweenAppointments || 15
                            ).length > 8 && (
                              <Badge variant="secondary" className="text-xs">
                                +{generateTimeSlots(
                                  daySchedule.start,
                                  daySchedule.end,
                                  daySchedule.lunchStart,
                                  daySchedule.lunchEnd,
                                  scheduleData.intervalBetweenAppointments || 15
                                ).length - 8} mais
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {!isWorking && (
                  <p className="text-gray-500 text-sm">Não atende neste dia</p>
                )}
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Summary */}
      {!isEditing && (
        <Card>
          <CardHeader>
            <CardTitle>Resumo dos Horários</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-2">
              {weekDays.map((day) => {
                const isWorking = scheduleData.workingDays[day.key];
                const daySchedule = scheduleData.workingHours[day.key];
                
                return (
                  <div key={day.key} className="text-center">
                    <div className={`w-full p-2 rounded-lg border ${isWorking ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'}`}>
                      <div className="font-medium text-sm">{day.short}</div>
                      {isWorking && daySchedule ? (
                        <div className="text-xs text-gray-600 mt-1">
                          <div>{daySchedule.start}-{daySchedule.lunchStart}</div>
                          <div>{daySchedule.lunchEnd}-{daySchedule.end}</div>
                        </div>
                      ) : (
                        <div className="text-xs text-gray-400 mt-1">Fechado</div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
