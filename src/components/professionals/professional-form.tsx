
import React, { useState } from 'react';
import { DialogHeader, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Switch } from '../ui/switch';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Upload, X } from 'lucide-react';

interface ProfessionalFormProps {
  onClose: () => void;
}

const weekDays = [
  { key: 'monday', label: 'Segunda-feira' },
  { key: 'tuesday', label: 'Terça-feira' },
  { key: 'wednesday', label: 'Quarta-feira' },
  { key: 'thursday', label: 'Quinta-feira' },
  { key: 'friday', label: 'Sexta-feira' },
  { key: 'saturday', label: 'Sábado' },
  { key: 'sunday', label: 'Domingo' }
];

export function ProfessionalForm({ onClose }: ProfessionalFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    specialty: '',
    email: '',
    phone: '',
    bio: '',
    workingDays: {} as Record<string, boolean>,
    workingHours: {} as Record<string, { start: string; end: string; enabled: boolean }>
  });

  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [newService, setNewService] = useState('');

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
          end: prev.workingHours[dayKey]?.end || '18:00',
          enabled: !prev.workingDays[dayKey]
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

  const addService = () => {
    if (newService.trim() && !selectedServices.includes(newService.trim())) {
      setSelectedServices([...selectedServices, newService.trim()]);
      setNewService('');
    }
  };

  const removeService = (service: string) => {
    setSelectedServices(selectedServices.filter(s => s !== service));
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle>Novo Profissional</DialogTitle>
      </DialogHeader>

      <div className="grid gap-6 py-4 max-h-[60vh] overflow-y-auto">
        {/* Informações Básicas */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Informações Básicas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <Avatar className="w-20 h-20">
                <AvatarFallback className="bg-blue-100 text-blue-600 text-xl">
                  {formData.name ? formData.name.split(' ').map(n => n[0]).join('') : 'FT'}
                </AvatarFallback>
              </Avatar>
              <Button variant="outline" size="sm">
                <Upload className="h-4 w-4 mr-2" />
                Carregar Foto
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome Completo</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Ex: Dr. João Silva"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="specialty">Especialidade</Label>
                <Input
                  id="specialty"
                  value={formData.specialty}
                  onChange={(e) => setFormData(prev => ({ ...prev, specialty: e.target.value }))}
                  placeholder="Ex: Cardiologista"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="joao@clinvia.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Telefone</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  placeholder="(11) 99999-9999"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Biografia (exibida no agendamento público)</Label>
              <Textarea
                id="bio"
                value={formData.bio}
                onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                placeholder="Descreva a experiência e especialidades do profissional..."
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* Serviços */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Serviços Oferecidos</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input
                value={newService}
                onChange={(e) => setNewService(e.target.value)}
                placeholder="Digite um serviço..."
                onKeyPress={(e) => e.key === 'Enter' && addService()}
              />
              <Button type="button" onClick={addService} variant="outline">
                Adicionar
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {selectedServices.map((service) => (
                <Badge key={service} variant="secondary" className="flex items-center gap-1">
                  {service}
                  <X 
                    className="h-3 w-3 cursor-pointer" 
                    onClick={() => removeService(service)}
                  />
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Horários de Atendimento */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Horários de Atendimento</CardTitle>
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
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t">
        <Button variant="outline" onClick={onClose}>
          Cancelar
        </Button>
        <Button className="bg-gradient-clinvia hover:opacity-90 text-white">
          Salvar Profissional
        </Button>
      </div>
    </>
  );
}
