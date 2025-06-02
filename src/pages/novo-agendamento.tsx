
import React, { useState } from 'react';
import { MainLayout } from '../components/layout/main-layout';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Calendar } from '../components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../components/ui/popover';
import { Textarea } from '../components/ui/textarea';
import { CalendarIcon, Clock, User, Stethoscope, ArrowLeft, Save } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';

export default function NovoAgendamento() {
  const navigate = useNavigate();
  const [date, setDate] = useState<Date>();
  const [formData, setFormData] = useState({
    patient: '',
    professional: '',
    service: '',
    time: '',
    observations: '',
    phone: '',
    email: ''
  });

  const timeSlots = [
    '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
    '11:00', '11:30', '12:00', '12:30', '13:00', '13:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
    '17:00', '17:30'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Criando agendamento:', { ...formData, date });
    // Aqui você implementaria a lógica de salvamento
    navigate('/agenda');
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <MainLayout>
      <div className="p-6 space-y-6 max-w-4xl mx-auto">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => navigate('/agenda')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Novo Agendamento</h1>
            <p className="text-gray-600">Crie um novo agendamento para o paciente</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Informações do Paciente</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="patient">Paciente *</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      id="patient"
                      placeholder="Buscar ou criar paciente"
                      value={formData.patient}
                      onChange={(e) => handleChange('patient', e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone">Telefone</Label>
                    <Input
                      id="phone"
                      placeholder="(xx) xxxxx-xxxx"
                      value={formData.phone}
                      onChange={(e) => handleChange('phone', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="email@exemplo.com"
                      value={formData.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Detalhes do Agendamento</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Profissional *</Label>
                  <Select value={formData.professional} onValueChange={(value) => handleChange('professional', value)}>
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

                <div>
                  <Label>Serviço/Procedimento *</Label>
                  <Select value={formData.service} onValueChange={(value) => handleChange('service', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecionar serviço" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectItem value="consulta">Consulta</SelectItem>
                      <SelectItem value="retorno">Retorno</SelectItem>
                      <SelectItem value="limpeza">Limpeza</SelectItem>
                      <SelectItem value="restauracao">Restauração</SelectItem>
                      <SelectItem value="exame">Exame</SelectItem>
                      <SelectItem value="procedimento">Procedimento</SelectItem>
                      <SelectItem value="primeira-vez">Primeira vez</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Data e Horário</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label>Data *</Label>
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

                <div>
                  <Label>Horário *</Label>
                  <Select value={formData.time} onValueChange={(value) => handleChange('time', value)}>
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
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Observações</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Observações do agendamento (opcional)"
                value={formData.observations}
                onChange={(e) => handleChange('observations', e.target.value)}
                rows={4}
              />
            </CardContent>
          </Card>

          <div className="flex gap-4 justify-end">
            <Button type="button" variant="outline" onClick={() => navigate('/agenda')}>
              Cancelar
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              <Save className="h-4 w-4 mr-2" />
              Criar Agendamento
            </Button>
          </div>
        </form>
      </div>
    </MainLayout>
  );
}
