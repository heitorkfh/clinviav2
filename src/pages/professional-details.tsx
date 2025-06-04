
import React, { useState } from 'react';
import { MainLayout } from '../components/layout/main-layout';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Badge } from '../components/ui/badge';
import { Switch } from '../components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { ArrowLeft, Edit3, Save, Upload, Phone, Mail, MapPin, Calendar, Clock, User, Stethoscope, GraduationCap, Award, FileText } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { ProfessionalSchedule } from '../components/professionals/professional-schedule';

// Mock data - in real app, this would come from API
const mockProfessional = {
  id: 1,
  name: 'Dr. Eduardo Silva',
  specialty: 'Cardiologista',
  email: 'eduardo@clinvia.com',
  phone: '(11) 99999-9999',
  avatar: '',
  bio: 'Cardiologista com mais de 15 anos de experiência em diagnóstico e tratamento de doenças cardiovasculares.',
  crm: 'CRM/SP 123456',
  cpf: '123.456.789-00',
  rg: '12.345.678-9',
  birthDate: '1980-05-15',
  address: 'Av. Paulista, 1000',
  city: 'São Paulo',
  state: 'SP',
  zipCode: '01310-100',
  workingDays: {
    monday: true,
    tuesday: true,
    wednesday: true,
    thursday: true,
    friday: true,
    saturday: false,
    sunday: false
  },
  workingHours: {
    monday: { start: '08:00', end: '18:00', lunchStart: '12:00', lunchEnd: '14:00' },
    tuesday: { start: '08:00', end: '18:00', lunchStart: '12:00', lunchEnd: '14:00' },
    wednesday: { start: '08:00', end: '18:00', lunchStart: '12:00', lunchEnd: '14:00' },
    thursday: { start: '08:00', end: '18:00', lunchStart: '12:00', lunchEnd: '14:00' },
    friday: { start: '08:00', end: '18:00', lunchStart: '12:00', lunchEnd: '14:00' }
  },
  appointmentDuration: 30,
  intervalBetweenAppointments: 15,
  services: ['Consulta Cardiológica', 'Ecocardiograma', 'Teste de Esforço'],
  education: ['Medicina - USP', 'Residência em Cardiologia - InCor'],
  certifications: ['Título de Especialista em Cardiologia - SBC'],
  status: 'Ativo'
};

export default function ProfessionalDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isEditing, setIsEditing] = useState(!id); // New professional if no ID
  const [professionalData, setProfessionalData] = useState(mockProfessional);

  const handleSave = () => {
    // Here you would save the data to the backend
    console.log('Saving professional data:', professionalData);
    setIsEditing(false);
  };

  const handleInputChange = (field: string, value: any) => {
    setProfessionalData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const isNewProfessional = !id;

  return (
    <MainLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => navigate('/professionals')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {isNewProfessional ? 'Novo Profissional' : professionalData.name}
              </h1>
              <p className="text-gray-600">
                {isNewProfessional ? 'Cadastre um novo profissional' : 'Visualizar e editar informações do profissional'}
              </p>
            </div>
          </div>

          <Button 
            onClick={isEditing ? handleSave : () => setIsEditing(true)}
            className="bg-gradient-clinvia hover:opacity-90 text-white"
          >
            {isEditing ? (
              <>
                <Save className="h-4 w-4 mr-2" />
                Salvar
              </>
            ) : (
              <>
                <Edit3 className="h-4 w-4 mr-2" />
                Editar
              </>
            )}
          </Button>
        </div>

        {/* Profile Card */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-6">
              <div className="relative">
                <Avatar className="w-24 h-24">
                  <AvatarImage src={professionalData.avatar} />
                  <AvatarFallback className="bg-blue-100 text-blue-600 text-2xl">
                    {professionalData.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                {isEditing && (
                  <Button
                    size="sm"
                    variant="outline"
                    className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0"
                  >
                    <Upload className="h-4 w-4" />
                  </Button>
                )}
              </div>
              <div className="flex-1">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Nome Completo</Label>
                    {isEditing ? (
                      <Input
                        value={professionalData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className="mt-1"
                      />
                    ) : (
                      <p className="text-lg font-semibold">{professionalData.name}</p>
                    )}
                  </div>
                  <div>
                    <Label>Especialidade</Label>
                    {isEditing ? (
                      <Input
                        value={professionalData.specialty}
                        onChange={(e) => handleInputChange('specialty', e.target.value)}
                        className="mt-1"
                      />
                    ) : (
                      <p className="text-lg text-blue-600">{professionalData.specialty}</p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-4 mt-2">
                  <Badge variant={professionalData.status === 'Ativo' ? 'default' : 'secondary'}>
                    {professionalData.status}
                  </Badge>
                  <span className="text-sm text-gray-600">{professionalData.crm}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="personal" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="personal" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Pessoais
            </TabsTrigger>
            <TabsTrigger value="professional" className="flex items-center gap-2">
              <Stethoscope className="h-4 w-4" />
              Profissionais
            </TabsTrigger>
            <TabsTrigger value="schedule" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Horários
            </TabsTrigger>
            <TabsTrigger value="education" className="flex items-center gap-2">
              <GraduationCap className="h-4 w-4" />
              Formação
            </TabsTrigger>
            <TabsTrigger value="services" className="flex items-center gap-2">
              <Award className="h-4 w-4" />
              Serviços
            </TabsTrigger>
            <TabsTrigger value="documents" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Documentos
            </TabsTrigger>
          </TabsList>

          {/* Personal Information Tab */}
          <TabsContent value="personal">
            <Card>
              <CardHeader>
                <CardTitle>Informações Pessoais</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Email</Label>
                    {isEditing ? (
                      <Input
                        type="email"
                        value={professionalData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="mt-1"
                      />
                    ) : (
                      <div className="flex items-center gap-2 mt-1">
                        <Mail className="h-4 w-4 text-gray-400" />
                        <span>{professionalData.email}</span>
                      </div>
                    )}
                  </div>
                  <div>
                    <Label>Telefone</Label>
                    {isEditing ? (
                      <Input
                        value={professionalData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="mt-1"
                      />
                    ) : (
                      <div className="flex items-center gap-2 mt-1">
                        <Phone className="h-4 w-4 text-gray-400" />
                        <span>{professionalData.phone}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label>CPF</Label>
                    {isEditing ? (
                      <Input
                        value={professionalData.cpf}
                        onChange={(e) => handleInputChange('cpf', e.target.value)}
                        className="mt-1"
                      />
                    ) : (
                      <p className="mt-1">{professionalData.cpf}</p>
                    )}
                  </div>
                  <div>
                    <Label>RG</Label>
                    {isEditing ? (
                      <Input
                        value={professionalData.rg}
                        onChange={(e) => handleInputChange('rg', e.target.value)}
                        className="mt-1"
                      />
                    ) : (
                      <p className="mt-1">{professionalData.rg}</p>
                    )}
                  </div>
                  <div>
                    <Label>Data de Nascimento</Label>
                    {isEditing ? (
                      <Input
                        type="date"
                        value={professionalData.birthDate}
                        onChange={(e) => handleInputChange('birthDate', e.target.value)}
                        className="mt-1"
                      />
                    ) : (
                      <p className="mt-1">{new Date(professionalData.birthDate).toLocaleDateString()}</p>
                    )}
                  </div>
                </div>

                <div>
                  <Label>Endereço</Label>
                  {isEditing ? (
                    <Input
                      value={professionalData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      className="mt-1"
                    />
                  ) : (
                    <div className="flex items-center gap-2 mt-1">
                      <MapPin className="h-4 w-4 text-gray-400" />
                      <span>{professionalData.address}, {professionalData.city} - {professionalData.state}, {professionalData.zipCode}</span>
                    </div>
                  )}
                </div>

                {isEditing && (
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label>Cidade</Label>
                      <Input
                        value={professionalData.city}
                        onChange={(e) => handleInputChange('city', e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label>Estado</Label>
                      <Input
                        value={professionalData.state}
                        onChange={(e) => handleInputChange('state', e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label>CEP</Label>
                      <Input
                        value={professionalData.zipCode}
                        onChange={(e) => handleInputChange('zipCode', e.target.value)}
                        className="mt-1"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <Label>Biografia (exibida no agendamento público)</Label>
                  {isEditing ? (
                    <Textarea
                      value={professionalData.bio}
                      onChange={(e) => handleInputChange('bio', e.target.value)}
                      rows={3}
                      className="mt-1"
                    />
                  ) : (
                    <p className="mt-1 text-gray-700">{professionalData.bio}</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Professional Information Tab */}
          <TabsContent value="professional">
            <Card>
              <CardHeader>
                <CardTitle>Informações Profissionais</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Número do CRM</Label>
                    {isEditing ? (
                      <Input
                        value={professionalData.crm}
                        onChange={(e) => handleInputChange('crm', e.target.value)}
                        className="mt-1"
                      />
                    ) : (
                      <p className="mt-1">{professionalData.crm}</p>
                    )}
                  </div>
                  <div>
                    <Label>Status</Label>
                    {isEditing ? (
                      <Select
                        value={professionalData.status}
                        onValueChange={(value) => handleInputChange('status', value)}
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Ativo">Ativo</SelectItem>
                          <SelectItem value="Inativo">Inativo</SelectItem>
                          <SelectItem value="Licença">Licença</SelectItem>
                        </SelectContent>
                      </Select>
                    ) : (
                      <Badge variant={professionalData.status === 'Ativo' ? 'default' : 'secondary'} className="mt-1">
                        {professionalData.status}
                      </Badge>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Schedule Tab */}
          <TabsContent value="schedule">
            <ProfessionalSchedule 
              isEditing={isEditing}
              scheduleData={professionalData}
              onScheduleChange={handleInputChange}
            />
          </TabsContent>

          {/* Education Tab */}
          <TabsContent value="education">
            <Card>
              <CardHeader>
                <CardTitle>Formação e Certificações</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Formação Acadêmica</Label>
                  {isEditing ? (
                    <div className="space-y-2 mt-1">
                      {professionalData.education.map((edu, index) => (
                        <Input key={index} value={edu} className="mb-2" />
                      ))}
                      <Button variant="outline" size="sm">Adicionar Formação</Button>
                    </div>
                  ) : (
                    <ul className="mt-1 space-y-1">
                      {professionalData.education.map((edu, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <GraduationCap className="h-4 w-4 text-blue-600" />
                          {edu}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div>
                  <Label>Certificações</Label>
                  {isEditing ? (
                    <div className="space-y-2 mt-1">
                      {professionalData.certifications.map((cert, index) => (
                        <Input key={index} value={cert} className="mb-2" />
                      ))}
                      <Button variant="outline" size="sm">Adicionar Certificação</Button>
                    </div>
                  ) : (
                    <ul className="mt-1 space-y-1">
                      {professionalData.certifications.map((cert, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <Award className="h-4 w-4 text-green-600" />
                          {cert}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Services Tab */}
          <TabsContent value="services">
            <Card>
              <CardHeader>
                <CardTitle>Serviços Oferecidos</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Serviços</Label>
                  {isEditing ? (
                    <div className="space-y-2 mt-1">
                      {professionalData.services.map((service, index) => (
                        <Input key={index} value={service} className="mb-2" />
                      ))}
                      <Button variant="outline" size="sm">Adicionar Serviço</Button>
                    </div>
                  ) : (
                    <div className="flex flex-wrap gap-2 mt-1">
                      {professionalData.services.map((service, index) => (
                        <Badge key={index} variant="outline">{service}</Badge>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Documents Tab */}
          <TabsContent value="documents">
            <Card>
              <CardHeader>
                <CardTitle>Documentos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-2">Arraste e solte documentos aqui</p>
                  <p className="text-sm text-gray-500 mb-4">ou clique para selecionar arquivos</p>
                  <Button variant="outline">Selecionar Documentos</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}
