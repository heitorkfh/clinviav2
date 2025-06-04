
import React, { useState } from 'react';
import { MainLayout } from '../layout/main-layout';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { ArrowLeft, Phone, Mail, Edit, Calendar, FileText, Image, Video, Activity, Pill, Save, Camera, Upload } from 'lucide-react';
import { ProntuarioFilters } from './prontuario-filters';
import { PatientFileUpload } from './patient-file-upload';
import { PatientMedicalInfo } from './patient-medical-info';
import { PatientHistory } from './patient-history';

interface PatientDetailsProps {
  patient: any;
  onClose: () => void;
}

const mockMedicalHistory = [
  {
    id: 1,
    type: 'consulta',
    title: 'CONSULTA INTELIGENTE',
    description: 'Paciente se queixa de coceira, ardência e formigamento na boca',
    doctor: 'DR. EDUARDO',
    date: '2024-01-15',
    color: 'blue'
  },
  {
    id: 2,
    type: 'prescription',
    title: 'PRESCRIÇÃO',
    description: 'Aciclovir 400 mg (oral) 1 comprimido, 3 vezes ao dia, por 7 dias',
    doctor: 'DR. EDUARDO',
    date: '2024-01-15',
    color: 'green'
  },
  {
    id: 3,
    type: 'exam',
    title: 'EXAME',
    description: 'Sorologia para HSV-1 (Vírus Herpes Simples tipo 1)',
    doctor: 'DR. EDUARDO',
    date: '2024-01-10',
    color: 'red'
  },
  {
    id: 4,
    type: 'photos',
    title: 'FOTOS',
    description: 'Adicionadas 3 fotos ao histórico do paciente',
    doctor: 'DR. EDUARDO',
    date: '2024-01-08',
    color: 'orange'
  },
  {
    id: 5,
    type: 'videos',
    title: 'VÍDEOS',
    description: 'Adicionados 2 vídeos ao histórico do paciente',
    doctor: 'DR. EDUARDO',
    date: '2024-01-05',
    color: 'gray'
  }
];

export function PatientDetails({ patient, onClose }: PatientDetailsProps) {
  const [activeTab, setActiveTab] = useState('prontuario');
  const [isEditing, setIsEditing] = useState(!patient?.id);
  const [filteredHistory, setFilteredHistory] = useState(mockMedicalHistory);
  const [formData, setFormData] = useState({
    name: patient?.name || '',
    email: patient?.email || '',
    phone: patient?.phone || '',
    birthDate: patient?.birthDate || '',
    gender: patient?.gender || '',
    cpf: patient?.cpf || '',
    address: patient?.address || '',
    city: patient?.city || '',
    state: patient?.state || '',
    zipCode: patient?.zipCode || '',
    observations: patient?.observations || ''
  });

  const handleInputChange = (field: string, value: string) => {
    if (isEditing) {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
  };

  const handleSave = () => {
    console.log('Saving patient data:', formData);
    setIsEditing(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleFiltersChange = (filters: any) => {
    let filtered = [...mockMedicalHistory];

    if (filters.search) {
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        item.description.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    if (filters.dateFrom) {
      filtered = filtered.filter(item => new Date(item.date) >= filters.dateFrom);
    }
    if (filters.dateTo) {
      filtered = filtered.filter(item => new Date(item.date) <= filters.dateTo);
    }

    if (filters.type) {
      filtered = filtered.filter(item => item.type === filters.type);
    }

    if (filters.doctor) {
      filtered = filtered.filter(item => item.doctor === filters.doctor);
    }

    if (filters.diagnosis) {
      filtered = filtered.filter(item =>
        item.description.toLowerCase().includes(filters.diagnosis.toLowerCase())
      );
    }

    setFilteredHistory(filtered);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'consulta':
        return <Activity className="h-4 w-4" />;
      case 'prescription':
        return <Pill className="h-4 w-4" />;
      case 'exam':
        return <FileText className="h-4 w-4" />;
      case 'photos':
        return <Image className="h-4 w-4" />;
      case 'videos':
        return <Video className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const getTypeColor = (color: string) => {
    switch (color) {
      case 'blue':
        return 'border-l-blue-500 bg-blue-50';
      case 'green':
        return 'border-l-green-500 bg-green-50';
      case 'red':
        return 'border-l-red-500 bg-red-50';
      case 'orange':
        return 'border-l-orange-500 bg-orange-50';
      case 'gray':
        return 'border-l-gray-500 bg-gray-50';
      default:
        return 'border-l-gray-500 bg-gray-50';
    }
  };

  const handlePhotoUpload = () => {
    // Implementar upload de foto
    console.log('Upload de foto do paciente');
  };

  return (
    <MainLayout>
      <div className="p-6 max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={onClose}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar
            </Button>
            <h1 className="text-2xl font-bold">
              {patient?.id ? 'Paciente' : 'Novo Paciente'}
            </h1>
          </div>
          <div className="flex gap-2">
            {!isEditing && patient?.id && (
              <Button onClick={handleEdit} className="bg-blue-600 hover:bg-blue-700">
                <Edit className="h-4 w-4 mr-2" />
                Editar
              </Button>
            )}
            {isEditing && (
              <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700">
                <Save className="h-4 w-4 mr-2" />
                Salvar
              </Button>
            )}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-8 bg-gray-100 rounded-none">
              <TabsTrigger value="prontuario" className="data-[state=active]:bg-white">Prontuário</TabsTrigger>
              <TabsTrigger value="dados" className="data-[state=active]:bg-white">Dados pessoais</TabsTrigger>
              <TabsTrigger value="medicas" className="data-[state=active]:bg-white">Info. Médicas</TabsTrigger>
              <TabsTrigger value="fotos" className="data-[state=active]:bg-white">Fotos</TabsTrigger>
              <TabsTrigger value="videos" className="data-[state=active]:bg-white">Vídeos</TabsTrigger>
              <TabsTrigger value="documentos" className="data-[state=active]:bg-white">Documentos</TabsTrigger>
              <TabsTrigger value="contratos" className="data-[state=active]:bg-white disabled:opacity-50" disabled>Contratos</TabsTrigger>
              <TabsTrigger value="historico" className="data-[state=active]:bg-white">Histórico</TabsTrigger>
            </TabsList>

            <TabsContent value="prontuario" className="mt-0">
              <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-1">
                    <Card>
                      <CardContent className="p-6">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="relative">
                            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
                              <span className="text-blue-600 font-semibold text-2xl">
                                {formData.name ? formData.name.split(' ').map(n => n[0]).join('') : 'NN'}
                              </span>
                            </div>
                            {isEditing && (
                              <Button
                                size="sm"
                                className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0"
                                onClick={handlePhotoUpload}
                              >
                                <Camera className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                          <div>
                            <h2 className="text-xl font-bold text-gray-900">{formData.name || 'Novo Paciente'}</h2>
                            <p className="text-gray-600">
                              {formData.birthDate && new Date().getFullYear() - new Date(formData.birthDate).getFullYear()} anos
                            </p>
                          </div>
                        </div>

                        <div className="space-y-2 mb-6">
                          <div className="flex items-center gap-2 text-gray-600">
                            <Phone className="h-4 w-4" />
                            <span>{formData.phone || 'Não informado'}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-600">
                            <Mail className="h-4 w-4" />
                            <span>{formData.email || 'Não informado'}</span>
                          </div>
                        </div>

                        {patient?.id && (
                          <>
                            <div className="grid grid-cols-2 gap-4 mb-6">
                              <div className="text-center">
                                <div className="text-2xl font-bold text-gray-900">{patient.appointments}</div>
                                <div className="text-sm text-gray-600">agendamentos</div>
                              </div>
                              <div className="text-center">
                                <div className="text-2xl font-bold text-gray-900">1</div>
                                <div className="text-sm text-gray-600">cancelamentos</div>
                              </div>
                            </div>

                            <div className="mb-6">
                              <div className="text-2xl font-bold text-gray-900">R$ {patient.revenue?.toLocaleString()}</div>
                              <div className="text-sm text-gray-600">em receita</div>
                            </div>

                            <div className="mb-6">
                              <div className="font-semibold text-gray-900">Particular</div>
                              <div className="text-sm text-gray-600">convênio</div>
                            </div>
                          </>
                        )}

                        <div className="space-y-4">
                          <div>
                            <Label>Observações</Label>
                            <Textarea
                              value={formData.observations}
                              onChange={(e) => handleInputChange('observations', e.target.value)}
                              disabled={!isEditing}
                              placeholder="Anotações importantes sobre o paciente..."
                              className="mt-1"
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {patient?.id && (
                      <Card className="mt-6">
                        <CardHeader>
                          <CardTitle className="text-lg">OBSERVAÇÕES</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            <div className="text-sm">• Alérgico a dipirona</div>
                            <div className="text-sm">• Diabético</div>
                            <div className="text-sm">• Faz uso de insulina</div>
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </div>

                  <div className="lg:col-span-2">
                    {patient?.id && (
                      <>
                        <div className="mb-6">
                          <h3 className="text-xl font-bold text-gray-900 mb-4">Fichas de atendimento</h3>
                          <div className="grid grid-cols-3 gap-4">
                            <Card className="text-center p-4 hover:bg-blue-50 cursor-pointer">
                              <div className="text-blue-600 mb-2">
                                <Activity className="h-8 w-8 mx-auto" />
                              </div>
                              <div className="text-blue-600 font-semibold text-sm">CONSULTA</div>
                              <div className="text-blue-600 font-semibold text-sm">INTELIGENTE</div>
                            </Card>
                            <Card className="text-center p-4 hover:bg-blue-50 cursor-pointer">
                              <div className="text-blue-600 mb-2">
                                <FileText className="h-8 w-8 mx-auto" />
                              </div>
                              <div className="text-blue-600 font-semibold text-sm">FICHA</div>
                              <div className="text-blue-600 font-semibold text-sm">PERSONALIZADA</div>
                            </Card>
                            <Card className="text-center p-4 hover:bg-blue-50 cursor-pointer">
                              <div className="text-blue-600 mb-2">
                                <Calendar className="h-8 w-8 mx-auto" />
                              </div>
                              <div className="text-blue-600 font-semibold text-sm">HISTÓRICO</div>
                            </Card>
                          </div>
                        </div>

                        <div>
                          <h3 className="text-xl font-bold text-gray-900 mb-4">Histórico médico</h3>
                          
                          <ProntuarioFilters onFiltersChange={handleFiltersChange} />

                          <div className="border-b border-gray-200 mb-4 mt-6">
                            <div className="flex gap-8">
                              <button className="pb-2 border-b-2 border-blue-600 text-blue-600 font-medium">
                                Lista
                              </button>
                              <button className="pb-2 text-gray-500">
                                Linha do tempo
                              </button>
                            </div>
                          </div>

                          <div className="space-y-4">
                            {filteredHistory.map((item) => (
                              <div
                                key={item.id}
                                className={`border-l-4 p-4 rounded-r ${getTypeColor(item.color)}`}
                              >
                                <div className="flex items-start justify-between">
                                  <div className="flex items-start gap-3">
                                    <div className={`text-${item.color}-600 mt-1`}>
                                      {getTypeIcon(item.type)}
                                    </div>
                                    <div>
                                      <div className={`font-semibold text-${item.color}-600 text-sm mb-1`}>
                                        {item.title}
                                      </div>
                                      <div className="text-gray-700 text-sm mb-2">
                                        {item.description}
                                      </div>
                                      <div className="text-xs text-gray-500">
                                        {new Date(item.date).toLocaleDateString('pt-BR')}
                                      </div>
                                    </div>
                                  </div>
                                  <div className={`text-${item.color}-600 font-semibold text-sm`}>
                                    {item.doctor}
                                  </div>
                                </div>
                              </div>
                            ))}
                            
                            {filteredHistory.length === 0 && (
                              <div className="text-center py-8 text-gray-500">
                                Nenhum registro encontrado com os filtros aplicados.
                              </div>
                            )}
                          </div>
                        </div>
                      </>
                    )}

                    {!patient?.id && (
                      <Card>
                        <CardHeader>
                          <CardTitle>Informações do Novo Paciente</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-gray-600">
                            Preencha os dados pessoais na aba "Dados pessoais" para criar o cadastro do paciente.
                          </p>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="dados" className="mt-0">
              <div className="p-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Informações Pessoais</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label>Nome Completo *</Label>
                        <Input
                          value={formData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          disabled={!isEditing}
                          placeholder="Nome completo"
                        />
                      </div>
                      <div>
                        <Label>CPF</Label>
                        <Input
                          value={formData.cpf}
                          onChange={(e) => handleInputChange('cpf', e.target.value)}
                          disabled={!isEditing}
                          placeholder="000.000.000-00"
                        />
                      </div>
                      <div>
                        <Label>Data de Nascimento</Label>
                        <Input
                          type="date"
                          value={formData.birthDate}
                          onChange={(e) => handleInputChange('birthDate', e.target.value)}
                          disabled={!isEditing}
                        />
                      </div>
                      <div>
                        <Label>Gênero</Label>
                        <Select 
                          value={formData.gender} 
                          onValueChange={(value) => handleInputChange('gender', value)}
                          disabled={!isEditing}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Selecionar gênero" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Masculino">Masculino</SelectItem>
                            <SelectItem value="Feminino">Feminino</SelectItem>
                            <SelectItem value="Outro">Outro</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Telefone *</Label>
                        <Input
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          disabled={!isEditing}
                          placeholder="(00) 00000-0000"
                        />
                      </div>
                      <div>
                        <Label>Email</Label>
                        <Input
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          disabled={!isEditing}
                          placeholder="email@exemplo.com"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <Label>Endereço</Label>
                        <Input
                          value={formData.address}
                          onChange={(e) => handleInputChange('address', e.target.value)}
                          disabled={!isEditing}
                          placeholder="Rua, número, complemento"
                        />
                      </div>
                      <div>
                        <Label>Cidade</Label>
                        <Input
                          value={formData.city}
                          onChange={(e) => handleInputChange('city', e.target.value)}
                          disabled={!isEditing}
                          placeholder="Cidade"
                        />
                      </div>
                      <div>
                        <Label>Estado</Label>
                        <Input
                          value={formData.state}
                          onChange={(e) => handleInputChange('state', e.target.value)}
                          disabled={!isEditing}
                          placeholder="UF"
                          maxLength={2}
                        />
                      </div>
                      <div>
                        <Label>CEP</Label>
                        <Input
                          value={formData.zipCode}
                          onChange={(e) => handleInputChange('zipCode', e.target.value)}
                          disabled={!isEditing}
                          placeholder="00000-000"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="medicas" className="mt-0">
              <PatientMedicalInfo patient={patient} isEditing={isEditing} />
            </TabsContent>

            <TabsContent value="fotos" className="mt-0">
              <PatientFileUpload 
                type="photos" 
                title="Fotos do Paciente"
                acceptedTypes="image/*"
                icon={<Image className="h-8 w-8" />}
              />
            </TabsContent>

            <TabsContent value="videos" className="mt-0">
              <PatientFileUpload 
                type="videos" 
                title="Vídeos do Paciente"
                acceptedTypes="video/*"
                icon={<Video className="h-8 w-8" />}
              />
            </TabsContent>

            <TabsContent value="documentos" className="mt-0">
              <PatientFileUpload 
                type="documents" 
                title="Documentos do Paciente"
                acceptedTypes=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                icon={<FileText className="h-8 w-8" />}
              />
            </TabsContent>

            <TabsContent value="contratos" className="mt-0">
              <div className="p-6">
                <h3 className="text-xl font-bold mb-4">Contratos</h3>
                <p className="text-gray-600">Funcionalidade em desenvolvimento.</p>
              </div>
            </TabsContent>

            <TabsContent value="historico" className="mt-0">
              <PatientHistory patient={patient} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </MainLayout>
  );
}
