
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Calendar } from '../components/ui/calendar';
import { Logo } from '../components/ui/logo';
import { CalendarIcon, Clock, User, Stethoscope, ArrowLeft, MapPin, Phone, CreditCard, Star } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '../components/ui/popover';
import { Badge } from '../components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { format, addDays, isSameDay } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useQuery } from '@tanstack/react-query';

interface Professional {
  id: string;
  name: string;
  specialty: string;
  crm: string;
  avatar?: string;
  bio: string;
  services: string[];
  acceptsInsurance: boolean;
  paymentMethods: string[];
}

interface Service {
  id: string;
  name: string;
  duration: number;
  price: number;
}

interface TimeSlot {
  time: string;
  available: boolean;
}

interface AvailableSchedule {
  date: Date;
  slots: TimeSlot[];
}

export default function PublicBooking() {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedProfessional, setSelectedProfessional] = useState('');
  const [selectedService, setSelectedService] = useState('');
  const [step, setStep] = useState(1);
  const [appointmentMode, setAppointmentMode] = useState<'presencial' | 'online'>('presencial');
  const [patientData, setPatientData] = useState({
    name: '',
    phone: '',
    email: '',
    cpf: '',
    healthPlan: '',
    birthDate: ''
  });

  // Mock data - In a real app, this would come from an API
  const professionals: Professional[] = [
    {
      id: '1',
      name: 'Rochelle Marquetto',
      specialty: 'Psiquiatra',
      crm: 'CREMERS: 39448 | RQE 43138',
      bio: 'CEO e Responsável técnica (medicina) da Pontual Psiquiatria Especialização em Psiquiatria pela Pontifícia Universidade Católica do Rio Grande do Sul (PUCRS). Residência médica em Psiquiatria no Hospital São Lucas da PUCRS. Realizou Psychiatry Observership Program at The University of Texas Health Science Center at Houston. Especialização em Psicoterapia de Orientação Analítica pelo Centro de Estudos Luiz Guedes da Universidade Federal do Rio Grande do Sul (UFRGS).',
      services: ['Consulta psiquiátrica'],
      acceptsInsurance: true,
      paymentMethods: ['Pix', 'Cartão de Crédito'],
      avatar: '/lovable-uploads/a687e334-5fb6-4d64-ae40-cac2ac799e54.png'
    }
  ];

  const services: Service[] = [
    { id: '1', name: 'Psicoterapia', duration: 60, price: 300 },
    { id: '2', name: 'Consulta Psiquiátrica', duration: 45, price: 400 }
  ];

  // Generate next 7 days for scheduling
  const getNext7Days = () => {
    const days = [];
    for (let i = 0; i < 7; i++) {
      days.push(addDays(new Date(), i));
    }
    return days;
  };

  const availableDays = getNext7Days();

  // Mock function to get available times - In real app, this would be an API call
  const getAvailableTimes = (professionalId: string, date: Date): TimeSlot[] => {
    const mockSlots: TimeSlot[] = [
      { time: '08:00', available: true },
      { time: '09:00', available: false },
      { time: '10:00', available: true },
      { time: '11:00', available: true },
      { time: '12:00', available: false },
      { time: '13:00', available: true },
      { time: '14:00', available: true },
      { time: '15:00', available: false },
      { time: '16:00', available: true },
      { time: '17:00', available: true },
      { time: '18:00', available: false },
      { time: '19:00', available: true }
    ];
    return mockSlots;
  };

  const selectedProfessionalData = professionals.find(p => p.id === selectedProfessional);
  const selectedServiceData = services.find(s => s.id === selectedService);

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handlePrevious = () => {
    if (step > 1) setStep(step - 1);
  };

  const handlePatientDataChange = (field: string, value: string) => {
    setPatientData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            {step > 1 && (
              <Button variant="ghost" size="icon" onClick={handlePrevious}>
                <ArrowLeft className="h-5 w-5" />
              </Button>
            )}
            <Logo />
            <div>
              <h1 className="text-xl font-bold text-blue-600">Clinvia</h1>
              <p className="text-sm text-gray-500">Agendamento Online</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {step === 1 && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Professional Info */}
              <div className="space-y-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <Avatar className="h-20 w-20">
                        <AvatarImage src={professionals[0].avatar} />
                        <AvatarFallback>{professionals[0].name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h1 className="text-2xl font-bold">{professionals[0].name}</h1>
                        <p className="text-lg text-gray-600">{professionals[0].specialty}</p>
                        <p className="text-sm text-gray-500">{professionals[0].crm}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <div className="flex">
                            {[1,2,3,4,5].map(star => (
                              <Star key={star} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            ))}
                          </div>
                          <span className="text-sm text-gray-600">Minha Apresentação</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <p className="text-sm text-gray-700 leading-relaxed">
                        {professionals[0].bio}
                      </p>
                    </div>

                    <div className="mt-6">
                      <h3 className="font-semibold text-blue-600 mb-3">Detalhes dos Serviços</h3>
                      
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium mb-2">Serviços</h4>
                          <ul className="text-sm text-gray-600">
                            {professionals[0].services.map((service, index) => (
                              <li key={index}>• {service}</li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h4 className="font-medium mb-2">Convênios</h4>
                          <p className="text-sm text-gray-600">
                            Aceita pacientes particulares (sem convênio médico) e pacientes com convênio médico.
                          </p>
                          <Button variant="link" className="p-0 h-auto text-blue-600">
                            Ver Lista de Convênios
                          </Button>
                        </div>

                        <div>
                          <h4 className="font-medium mb-2">Forma de Pagamento</h4>
                          <p className="text-sm text-gray-600">
                            {professionals[0].paymentMethods.join(', ')}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Booking Form */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-center text-blue-600">Agendar Consulta</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label>Serviço</Label>
                      <Select value={selectedService} onValueChange={setSelectedService}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione um serviço" />
                        </SelectTrigger>
                        <SelectContent>
                          {services.map((service) => (
                            <SelectItem key={service.id} value={service.id}>
                              {service.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Convênio</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Nome do Convênio" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="particular">Particular</SelectItem>
                          <SelectItem value="unimed">Unimed</SelectItem>
                          <SelectItem value="bradesco">Bradesco Saúde</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Plano</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Plano" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="basico">Básico</SelectItem>
                          <SelectItem value="premium">Premium</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-3">
                      <Label>Modalidade</Label>
                      <div className="flex gap-2">
                        <Button
                          variant={appointmentMode === 'presencial' ? 'default' : 'outline'}
                          onClick={() => setAppointmentMode('presencial')}
                          className="flex-1"
                        >
                          <MapPin className="h-4 w-4 mr-2" />
                          Presencial
                        </Button>
                        <Button
                          variant={appointmentMode === 'online' ? 'default' : 'outline'}
                          onClick={() => setAppointmentMode('online')}
                          className="flex-1"
                        >
                          Online
                        </Button>
                      </div>
                    </div>

                    <Button
                      className="w-full bg-blue-600 hover:bg-blue-700"
                      onClick={() => {
                        setSelectedProfessional('1');
                        handleNext();
                      }}
                      disabled={!selectedService}
                    >
                      Continuar
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="max-w-4xl mx-auto">
              <Card>
                <CardHeader>
                  <CardTitle className="text-center">Data - Fuso Horário: Brasília</CardTitle>
                </CardHeader>
                <CardContent>
                  {/* Date Selection */}
                  <div className="grid grid-cols-7 gap-2 mb-6">
                    {availableDays.map((day, index) => {
                      const isSelected = selectedDate && isSameDay(day, selectedDate);
                      return (
                        <Button
                          key={index}
                          variant={isSelected ? 'default' : 'outline'}
                          onClick={() => setSelectedDate(day)}
                          className="flex flex-col p-3 h-auto"
                        >
                          <span className="text-xs">
                            {format(day, 'EEE', { locale: ptBR })}
                          </span>
                          <span className="text-lg font-bold">
                            {format(day, 'd', { locale: ptBR })}
                          </span>
                          <span className="text-xs">
                            {format(day, 'MMM', { locale: ptBR })}
                          </span>
                        </Button>
                      );
                    })}
                  </div>

                  {/* Time Selection */}
                  {selectedDate && (
                    <div>
                      <div className="grid grid-cols-5 gap-3">
                        {getAvailableTimes(selectedProfessional, selectedDate).map((slot) => (
                          <Button
                            key={slot.time}
                            variant={selectedTime === slot.time ? 'default' : 'outline'}
                            onClick={() => slot.available && setSelectedTime(slot.time)}
                            disabled={!slot.available}
                            className={`p-3 ${!slot.available ? 'opacity-50' : ''}`}
                          >
                            {slot.time}
                          </Button>
                        ))}
                      </div>
                      
                      <div className="text-center mt-6">
                        <Button variant="link" className="text-blue-600">
                          Mostrar todos horários
                        </Button>
                      </div>
                    </div>
                  )}

                  {selectedDate && selectedTime && (
                    <div className="mt-6 text-center">
                      <Button
                        className="bg-blue-600 hover:bg-blue-700 px-8"
                        onClick={handleNext}
                      >
                        Agendar
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}

          {step === 3 && (
            <div className="max-w-2xl mx-auto">
              <Card>
                <CardHeader>
                  <CardTitle className="text-center">Dados do Paciente</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nome Completo *</Label>
                      <Input
                        id="name"
                        value={patientData.name}
                        onChange={(e) => handlePatientDataChange('name', e.target.value)}
                        placeholder="Seu nome completo"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Telefone *</Label>
                      <Input
                        id="phone"
                        value={patientData.phone}
                        onChange={(e) => handlePatientDataChange('phone', e.target.value)}
                        placeholder="(11) 99999-9999"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">E-mail *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={patientData.email}
                        onChange={(e) => handlePatientDataChange('email', e.target.value)}
                        placeholder="seu@email.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cpf">CPF *</Label>
                      <Input
                        id="cpf"
                        value={patientData.cpf}
                        onChange={(e) => handlePatientDataChange('cpf', e.target.value)}
                        placeholder="000.000.000-00"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="birthDate">Data de Nascimento</Label>
                      <Input
                        id="birthDate"
                        type="date"
                        value={patientData.birthDate}
                        onChange={(e) => handlePatientDataChange('birthDate', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="healthPlan">Plano de Saúde</Label>
                      <Input
                        id="healthPlan"
                        value={patientData.healthPlan}
                        onChange={(e) => handlePatientDataChange('healthPlan', e.target.value)}
                        placeholder="Nome do plano"
                      />
                    </div>
                  </div>

                  {/* Summary */}
                  <div className="bg-gray-50 p-4 rounded-lg mt-6">
                    <h3 className="font-medium mb-3">Resumo do Agendamento</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Profissional:</span>
                        <span>{selectedProfessionalData?.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Serviço:</span>
                        <span>{selectedServiceData?.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Data:</span>
                        <span>{selectedDate && format(selectedDate, "dd/MM/yyyy", { locale: ptBR })}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Horário:</span>
                        <span>{selectedTime}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Modalidade:</span>
                        <span>{appointmentMode === 'presencial' ? 'Presencial' : 'Online'}</span>
                      </div>
                      <div className="flex justify-between font-medium">
                        <span>Valor:</span>
                        <span>R$ {selectedServiceData?.price?.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  <Button
                    className="w-full bg-blue-600 hover:bg-blue-700 mt-6"
                    onClick={() => alert('Agendamento confirmado!')}
                  >
                    Confirmar Agendamento
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
