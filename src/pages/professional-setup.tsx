
import React, { useState } from 'react';
import { MainLayout } from '../components/layout/main-layout';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Switch } from '../components/ui/switch';
import { Avatar, AvatarFallback } from '../components/ui/avatar';
import { Upload, Save, User, Stethoscope, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const weekDays = [
  { key: 'monday', label: 'Segunda-feira' },
  { key: 'tuesday', label: 'Terça-feira' },
  { key: 'wednesday', label: 'Quarta-feira' },
  { key: 'thursday', label: 'Quinta-feira' },
  { key: 'friday', label: 'Sexta-feira' },
  { key: 'saturday', label: 'Sábado' },
  { key: 'sunday', label: 'Domingo' }
];

export default function ProfessionalSetup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    specialty: '',
    email: '',
    phone: '',
    crm: '',
    bio: '',
    workingDays: {} as Record<string, boolean>,
    workingHours: {} as Record<string, { start: string; end: string }>
  });

  const handleDayToggle = (dayKey: string) => {
    setFormData(prev => ({
      ...prev,
      workingDays: {
        ...prev.workingDays,
        [dayKey]: !prev.workingDays[dayKey]
      },
      workingHours: {
        ...prev.workingHours,
        [dayKey]: {
          start: prev.workingHours[dayKey]?.start || '09:00',
          end: prev.workingHours[dayKey]?.end || '18:00'
        }
      }
    }));
  };

  const handleTimeChange = (dayKey: string, type: 'start' | 'end', value: string) => {
    setFormData(prev => ({
      ...prev,
      workingHours: {
        ...prev.workingHours,
        [dayKey]: {
          ...prev.workingHours[dayKey],
          [type]: value
        }
      }
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Salvando configuração do profissional:', formData);
    // Aqui você salvaria os dados e redirecionaria para o dashboard
    navigate('/dashboard');
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <MainLayout>
      <div className="p-6 space-y-6 max-w-4xl mx-auto">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-gray-900">Configuração Inicial</h1>
          <p className="text-gray-600">Configure seus dados profissionais e horários de atendimento</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Dados Pessoais */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Dados Pessoais
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <Avatar className="w-20 h-20">
                  <AvatarFallback className="bg-blue-100 text-blue-600 text-xl">
                    {formData.name ? formData.name.split(' ').map(n => n[0]).join('') : 'DR'}
                  </AvatarFallback>
                </Avatar>
                <Button type="button" variant="outline" size="sm">
                  <Upload className="h-4 w-4 mr-2" />
                  Carregar Foto
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Nome Completo *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    placeholder="Dr. João Silva"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="specialty">Especialidade *</Label>
                  <Input
                    id="specialty"
                    value={formData.specialty}
                    onChange={(e) => handleChange('specialty', e.target.value)}
                    placeholder="Cardiologista"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    placeholder="joao@exemplo.com"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Telefone *</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    placeholder="(11) 99999-9999"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="crm">Número do CRM *</Label>
                <Input
                  id="crm"
                  value={formData.crm}
                  onChange={(e) => handleChange('crm', e.target.value)}
                  placeholder="CRM/SP 123456"
                  required
                />
              </div>

              <div>
                <Label htmlFor="bio">Biografia (exibida no agendamento público)</Label>
                <Textarea
                  id="bio"
                  value={formData.bio}
                  onChange={(e) => handleChange('bio', e.target.value)}
                  placeholder="Descreva sua experiência e especialidades..."
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Horários de Atendimento */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Horários de Atendimento
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {weekDays.map((day) => (
                <div key={day.key} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Switch
                      checked={formData.workingDays[day.key] || false}
                      onCheckedChange={() => handleDayToggle(day.key)}
                    />
                    <span className="font-medium">{day.label}</span>
                  </div>
                  
                  {formData.workingDays[day.key] && (
                    <div className="flex items-center gap-2">
                      <Input
                        type="time"
                        value={formData.workingHours[day.key]?.start || '09:00'}
                        onChange={(e) => handleTimeChange(day.key, 'start', e.target.value)}
                        className="w-32"
                      />
                      <span>até</span>
                      <Input
                        type="time"
                        value={formData.workingHours[day.key]?.end || '18:00'}
                        onChange={(e) => handleTimeChange(day.key, 'end', e.target.value)}
                        className="w-32"
                      />
                    </div>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">
              <Save className="h-4 w-4 mr-2" />
              Salvar e Continuar
            </Button>
          </div>
        </form>
      </div>
    </MainLayout>
  );
}
