import React, { useState } from 'react';
import { MainLayout } from '../layout/main-layout';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Separator } from '../ui/separator';
import { ArrowLeft, Edit, Save, X, Phone, Mail, MapPin, Calendar, FileText, Camera, Download } from 'lucide-react';
import { PatientForm } from './patient-form';
import { PatientHistory } from './patient-history';
import { PatientMedicalInfo } from './patient-medical-info';
import { PatientFileUpload } from './patient-file-upload';

interface PatientDetailsProps {
  patient: any;
  onClose: () => void;
  isModal?: boolean;
}

export function PatientDetails({ patient, onClose, isModal = false }: PatientDetailsProps) {
  const [isEditing, setIsEditing] = useState(!patient.id);
  const [currentPatient, setCurrentPatient] = useState(patient);

  const handleSave = (patientData: any) => {
    console.log('Salvando paciente:', patientData);
    setCurrentPatient(patientData);
    setIsEditing(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    if (!patient.id) {
      onClose();
    } else {
      setIsEditing(false);
      setCurrentPatient(patient);
    }
  };

  const mockAppointments = [
    {
      id: 1,
      date: '2024-02-10',
      time: '10:00',
      type: 'Consulta de Rotina',
      professional: 'Dr. João Silva'
    },
    {
      id: 2,
      date: '2024-02-15',
      time: '14:30',
      type: 'Retorno',
      professional: 'Dra. Maria Oliveira'
    }
  ];

  const mockFiles = [
    {
      id: 1,
      name: 'Exame de Sangue - 2024-01-15.pdf',
      type: 'pdf',
      url: '#'
    },
    {
      id: 2,
      name: 'Radiografia - 2023-12-20.jpg',
      type: 'jpg',
      url: '#'
    }
  ];

  const mockMedicalHistory = [
    {
      id: 1,
      date: '2023-01-10',
      description: 'Primeira consulta com Dr. João Silva. Paciente relata dores de cabeça frequentes.',
      professional: 'Dr. João Silva'
    },
    {
      id: 2,
      date: '2023-06-15',
      description: 'Consulta de acompanhamento com Dra. Maria Oliveira. Paciente apresenta melhora nas dores de cabeça após início do tratamento.',
      professional: 'Dra. Maria Oliveira'
    }
  ];

  const PatientContent = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {!isModal && (
            <Button variant="ghost" size="sm" onClick={onClose}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar
            </Button>
          )}
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {isEditing ? (patient.id ? 'Editar Paciente' : 'Novo Paciente') : 'Detalhes do Paciente'}
            </h1>
            {!isEditing && (
              <p className="text-gray-600">Informações completas do paciente</p>
            )}
          </div>
        </div>
        
        {!isEditing ? (
          <Button onClick={handleEdit} className="bg-blue-600 hover:bg-blue-700">
            <Edit className="h-4 w-4 mr-2" />
            Editar
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleCancel}>
              <X className="h-4 w-4 mr-2" />
              Cancelar
            </Button>
            <Button form="patient-form" type="submit" className="bg-green-600 hover:bg-green-700">
              <Save className="h-4 w-4 mr-2" />
              Salvar
            </Button>
          </div>
        )}
      </div>

      {isEditing ? (
        <PatientForm 
          patient={currentPatient} 
          onSave={handleSave}
          formId="patient-form"
        />
      ) : (
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Resumo</TabsTrigger>
            <TabsTrigger value="personal">Dados Pessoais</TabsTrigger>
            <TabsTrigger value="medical">Informações Médicas</TabsTrigger>
            <TabsTrigger value="history">Histórico</TabsTrigger>
            <TabsTrigger value="files">Arquivos</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Patient Overview Card */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-6">
                  <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-semibold text-2xl">
                      {currentPatient.name.split(' ').map((n: string) => n[0]).join('')}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">{currentPatient.name}</h2>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <span>{currentPatient.age} anos</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-gray-400" />
                        <span>{currentPatient.phone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-gray-400" />
                        <span>{currentPatient.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-gray-400" />
                        <span>{currentPatient.city}, {currentPatient.state}</span>
                      </div>
                    </div>
                    <div className="mt-4">
                      <Badge variant={currentPatient.status === 'Ativo' ? 'default' : 'secondary'}>
                        {currentPatient.status}
                      </Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-green-600">
                      {currentPatient.appointments}
                    </div>
                    <div className="text-sm text-gray-600">Consultas</div>
                    <div className="text-lg font-semibold text-gray-900 mt-2">
                      R$ {currentPatient.revenue.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600">Receita Total</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Última Consulta</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg font-semibold">{currentPatient.lastVisit}</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Próxima Consulta</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg font-semibold">15/02/2024</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Plano de Saúde</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg font-semibold">Unimed</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="personal" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Informações Pessoais</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Nome Completo</Label>
                    <p className="text-sm">{currentPatient.name}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">CPF</Label>
                    <p className="text-sm">{currentPatient.cpf}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Data de Nascimento</Label>
                    <p className="text-sm">{currentPatient.birthDate}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Gênero</Label>
                    <p className="text-sm">{currentPatient.gender}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Telefone</Label>
                    <p className="text-sm">{currentPatient.phone}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Email</Label>
                    <p className="text-sm">{currentPatient.email}</p>
                  </div>
                </div>
                <Separator />
                <div>
                  <Label className="text-sm font-medium text-gray-500">Endereço</Label>
                  <p className="text-sm">
                    {currentPatient.address}, {currentPatient.city} - {currentPatient.state}, {currentPatient.zipCode}
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="medical">
            <PatientMedicalInfo patient={currentPatient} />
          </TabsContent>

          <TabsContent value="history">
            <PatientHistory patient={currentPatient} />
          </TabsContent>

          <TabsContent value="files">
            <PatientFileUpload patient={currentPatient} />
          </TabsContent>
        </Tabs>
      )}
    </div>
  );

  if (isModal) {
    return <PatientContent />;
  }

  return (
    <MainLayout>
      <div className="p-6">
        <PatientContent />
      </div>
    </MainLayout>
  );
}
