
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Calendar } from '../components/ui/calendar';
import { Logo } from '../components/ui/logo';
import { CalendarIcon, Clock, User, Stethoscope, Phone, Mail } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '../components/ui/popover';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export default function PublicBooking() {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedProfessional, setSelectedProfessional] = useState('');
  const [selectedService, setSelectedService] = useState('');
  const [step, setStep] = useState(1);

  const professionals = [
    { id: '1', name: 'Dr. Eduardo Santos', specialty: 'Cardiologista' },
    { id: '2', name: 'Dra. Maria Silva', specialty: 'Dermatologista' },
    { id: '3', name: 'Dr. João Oliveira', specialty: 'Ortopedista' },
  ];

  const services = [
    { id: '1', name: 'Consulta de Rotina', duration: '30 min', price: 'R$ 200,00' },
    { id: '2', name: 'Consulta Especializada', duration: '45 min', price: 'R$ 300,00' },
    { id: '3', name: 'Exame Preventivo', duration: '60 min', price: 'R$ 150,00' },
  ];

  const availableTimes = [
    '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'
  ];

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handlePrevious = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <div className="min-h-screen bg-gradient-clinvia">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <Logo size="lg" className="justify-center mb-4" />
          <h1 className="text-3xl font-bold text-white mb-2">
            Agende sua Consulta Online
          </h1>
          <p className="text-white/80 text-lg">
            Rápido, seguro e conveniente
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>
                  Etapa {step} de 3: {
                    step === 1 ? 'Selecione o Profissional e Serviço' :
                    step === 2 ? 'Escolha Data e Horário' :
                    'Confirme seus Dados'
                  }
                </CardTitle>
                <div className="flex space-x-2">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className={`w-3 h-3 rounded-full ${
                        i <= step ? 'bg-primary' : 'bg-gray-200'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {step === 1 && (
                <>
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Profissional
                    </Label>
                    <Select value={selectedProfessional} onValueChange={setSelectedProfessional}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione um profissional" />
                      </SelectTrigger>
                      <SelectContent>
                        {professionals.map((prof) => (
                          <SelectItem key={prof.id} value={prof.id}>
                            {prof.name} - {prof.specialty}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <Stethoscope className="h-4 w-4" />
                      Serviço
                    </Label>
                    <Select value={selectedService} onValueChange={setSelectedService}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione um serviço" />
                      </SelectTrigger>
                      <SelectContent>
                        {services.map((service) => (
                          <SelectItem key={service.id} value={service.id}>
                            {service.name} - {service.duration} - {service.price}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </>
              )}

              {step === 2 && (
                <>
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <CalendarIcon className="h-4 w-4" />
                      Data
                    </Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal"
                        >
                          {selectedDate ? (
                            format(selectedDate, "PPP", { locale: ptBR })
                          ) : (
                            "Selecione uma data"
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={selectedDate}
                          onSelect={setSelectedDate}
                          disabled={(date) => date < new Date()}
                          initialFocus
                          className="pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      Horário
                    </Label>
                    <div className="grid grid-cols-3 gap-2">
                      {availableTimes.map((time) => (
                        <Button
                          key={time}
                          variant={selectedTime === time ? "default" : "outline"}
                          size="sm"
                          onClick={() => setSelectedTime(time)}
                        >
                          {time}
                        </Button>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {step === 3 && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nome Completo</Label>
                      <Input id="name" placeholder="Seu nome completo" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Telefone</Label>
                      <Input id="phone" placeholder="(11) 99999-9999" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">E-mail</Label>
                      <Input id="email" type="email" placeholder="seu@email.com" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cpf">CPF</Label>
                      <Input id="cpf" placeholder="000.000.000-00" />
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-medium mb-2">Resumo do Agendamento</h3>
                    <div className="space-y-1 text-sm text-gray-600">
                      <p><strong>Profissional:</strong> Dr. Eduardo Santos</p>
                      <p><strong>Serviço:</strong> Consulta de Rotina</p>
                      <p><strong>Data:</strong> {selectedDate && format(selectedDate, "PPP", { locale: ptBR })}</p>
                      <p><strong>Horário:</strong> {selectedTime}</p>
                      <p><strong>Valor:</strong> R$ 200,00</p>
                    </div>
                  </div>
                </>
              )}

              <div className="flex justify-between">
                {step > 1 && (
                  <Button variant="outline" onClick={handlePrevious}>
                    Voltar
                  </Button>
                )}
                <Button
                  className={`bg-gradient-clinvia hover:opacity-90 ${step === 1 ? 'w-full' : 'ml-auto'}`}
                  onClick={step === 3 ? () => alert('Agendamento confirmado!') : handleNext}
                  disabled={
                    (step === 1 && (!selectedProfessional || !selectedService)) ||
                    (step === 2 && (!selectedDate || !selectedTime))
                  }
                >
                  {step === 3 ? 'Confirmar Agendamento' : 'Próximo'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
