
import React from 'react';
import { DialogHeader, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Calendar } from '../ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { CalendarIcon, Clock, User, Stethoscope } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface NovoAgendamentoProps {
  onClose: () => void;
}

export function NovoAgendamento({ onClose }: NovoAgendamentoProps) {
  const [date, setDate] = React.useState<Date>();

  const timeSlots = [
    '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
    '11:00', '11:30', '12:00', '12:30', '13:00', '13:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
    '17:00', '17:30'
  ];

  return (
    <>
      <DialogHeader>
        <DialogTitle>Novo Agendamento</DialogTitle>
      </DialogHeader>

      <div className="grid gap-6 py-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="patient">Paciente</Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                id="patient"
                placeholder="Selecionar paciente"
                className="pl-10"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="professional">Profissional</Label>
            <Select>
              <SelectTrigger>
                <div className="flex items-center gap-2">
                  <Stethoscope className="h-4 w-4 text-gray-400" />
                  <SelectValue placeholder="Selecionar profissional" />
                </div>
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="dr-eduardo">Dr. Eduardo</SelectItem>
                <SelectItem value="dr-luis">Dr. Luís</SelectItem>
                <SelectItem value="dr-joel">Dr. Joel</SelectItem>
                <SelectItem value="dra-carla">Dra. Carla</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Data</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "dd/MM/yyyy") : "Selecionar data"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                  className="p-3 pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label>Horário</Label>
            <Select>
              <SelectTrigger>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-gray-400" />
                  <SelectValue placeholder="Selecionar horário" />
                </div>
              </SelectTrigger>
              <SelectContent className="bg-white max-h-60">
                {timeSlots.map((time) => (
                  <SelectItem key={time} value={time}>
                    {time}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="service">Serviço/Procedimento</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Selecionar serviço" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem value="consulta">Consulta</SelectItem>
              <SelectItem value="retorno">Retorno</SelectItem>
              <SelectItem value="exame">Exame</SelectItem>
              <SelectItem value="procedimento">Procedimento</SelectItem>
              <SelectItem value="primeira-vez">Primeira vez</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="observations">Observações</Label>
          <Input
            id="observations"
            placeholder="Observações do agendamento (opcional)"
          />
        </div>
      </div>

      <div className="flex justify-end gap-3">
        <Button variant="outline" onClick={onClose}>
          Cancelar
        </Button>
        <Button className="bg-gradient-clinvia hover:opacity-90 text-white">
          Criar Agendamento
        </Button>
      </div>
    </>
  );
}
