
import React, { useState } from 'react';
import { MainLayout } from '../layout/main-layout';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { ArrowLeft, Save, Edit, Phone, Mail, Upload, FileText, Image, Video, Trash2 } from 'lucide-react';
import { PatientFileUpload } from './patient-file-upload';
import { PatientMedicalInfo } from './patient-medical-info';
import { PatientHistory } from './patient-history';

interface PatientFormProps {
  patient?: any;
  onClose: () => void;
}

export function PatientForm({ patient, onClose }: PatientFormProps) {
  const [isEditing, setIsEditing] = useState(!patient);
  const [activeTab, setActiveTab] = useState('dados');
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
    // Here you would save the data
  };

  const handleEdit = () => {
    setIsEditing(true);
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
              {patient ? 'Editar Paciente' : 'Novo Paciente'}
            </h1>
          </div>
          <div className="flex gap-2">
            {!isEditing && patient && (
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
              <TabsTrigger value="dados" className="data-[state=active]:bg-white">Dados pessoais</TabsTrigger>
              <TabsTrigger value="prontuario" className="data-[state=active]:bg-white">Prontuário</TabsTrigger>
              <TabsTrigger value="medicas" className="data-[state=active]:bg-white">Info. Médicas</TabsTrigger>
              <TabsTrigger value="fotos" className="data-[state=active]:bg-white">Fotos</TabsTrigger>
              <TabsTrigger value="videos" className="data-[state=active]:bg-white">Vídeos</TabsTrigger>
              <TabsTrigger value="documentos" className="data-[state=active]:bg-white">Documentos</TabsTrigger>
              <TabsTrigger value="contratos" className="data-[state=active]:bg-white disabled:opacity-50" disabled>Contratos</TabsTrigger>
              <TabsTrigger value="historico" className="data-[state=active]:bg-white">Histórico</TabsTrigger>
            </TabsList>

            <TabsContent value="dados" className="mt-0">
              <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-1">
                    <Card>
                      <CardContent className="p-6">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-blue-600 font-semibold text-2xl">
                              {formData.name ? formData.name.split(' ').map(n => n[0]).join('') : 'NN'}
                            </span>
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
                  </div>

                  <div className="lg:col-span-2">
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
                </div>
              </div>
            </TabsContent>

            <TabsContent value="prontuario" className="mt-0">
              <div className="p-6">
                <h3 className="text-xl font-bold mb-4">Prontuário Médico</h3>
                <p className="text-gray-600">Fichas de atendimento e histórico médico serão exibidos aqui.</p>
              </div>
            </TabsContent>

            <TabsContent value="medicas" className="mt-0">
              <PatientMedicalInfo patient={patient} />
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
