
import React, { useState } from 'react';
import { MainLayout } from '../layout/main-layout';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { ArrowLeft, Phone, Mail, Edit, Calendar, FileText, Image, Video, Activity, Pill } from 'lucide-react';

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

  return (
    <MainLayout>
      <div className="p-6 max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="outline" onClick={onClose}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-9 bg-gray-100 rounded-none">
              <TabsTrigger value="prontuario" className="data-[state=active]:bg-white">Prontuário</TabsTrigger>
              <TabsTrigger value="dados" className="data-[state=active]:bg-white">Dados pessoais</TabsTrigger>
              <TabsTrigger value="fotos" className="data-[state=active]:bg-white">Fotos</TabsTrigger>
              <TabsTrigger value="videos" className="data-[state=active]:bg-white">Vídeos</TabsTrigger>
              <TabsTrigger value="simulacoes" className="data-[state=active]:bg-white">Simulações</TabsTrigger>
              <TabsTrigger value="documentos" className="data-[state=active]:bg-white">Documentos</TabsTrigger>
              <TabsTrigger value="contratos" className="data-[state=active]:bg-white">Contratos</TabsTrigger>
              <TabsTrigger value="galeria" className="data-[state=active]:bg-white">Galeria</TabsTrigger>
              <TabsTrigger value="historico" className="data-[state=active]:bg-white">Histórico</TabsTrigger>
            </TabsList>

            <TabsContent value="prontuario" className="mt-0">
              <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Informações do Paciente */}
                  <div className="lg:col-span-1">
                    <Card>
                      <CardContent className="p-6">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-blue-600 font-semibold text-2xl">
                              {patient.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <div>
                            <h2 className="text-xl font-bold text-gray-900">{patient.name}</h2>
                            <p className="text-gray-600">
                              {patient.age} anos, {patient.birthDate?.split('-').reverse().join('/')}, {patient.gender?.toLowerCase()}
                            </p>
                          </div>
                        </div>

                        <div className="space-y-2 mb-6">
                          <div className="flex items-center gap-2 text-gray-600">
                            <Phone className="h-4 w-4" />
                            <span>{patient.phone}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-600">
                            <Mail className="h-4 w-4" />
                            <span>{patient.email}</span>
                          </div>
                        </div>

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

                        <Button className="w-full bg-blue-600 hover:bg-blue-700">
                          <Edit className="h-4 w-4 mr-2" />
                          Editar Informações
                        </Button>
                      </CardContent>
                    </Card>

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
                  </div>

                  {/* Fichas de Atendimento e Histórico */}
                  <div className="lg:col-span-2">
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
                      <div className="border-b border-gray-200 mb-4">
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
                        {mockMedicalHistory.map((item) => (
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
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="dados" className="mt-0">
              <div className="p-6">
                <h3 className="text-xl font-bold mb-4">Dados Pessoais</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nome Completo</label>
                    <div className="text-gray-900">{patient.name}</div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">CPF</label>
                    <div className="text-gray-900">{patient.cpf}</div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Data de Nascimento</label>
                    <div className="text-gray-900">{patient.birthDate?.split('-').reverse().join('/')}</div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Gênero</label>
                    <div className="text-gray-900">{patient.gender}</div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Telefone</label>
                    <div className="text-gray-900">{patient.phone}</div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <div className="text-gray-900">{patient.email}</div>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Endereço</label>
                    <div className="text-gray-900">
                      {patient.address}, {patient.city} - {patient.state}, {patient.zipCode}
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Outras abas podem ser implementadas conforme necessário */}
            <TabsContent value="fotos" className="mt-0">
              <div className="p-6">
                <h3 className="text-xl font-bold mb-4">Fotos</h3>
                <p className="text-gray-600">Nenhuma foto adicionada ainda.</p>
              </div>
            </TabsContent>

            <TabsContent value="videos" className="mt-0">
              <div className="p-6">
                <h3 className="text-xl font-bold mb-4">Vídeos</h3>
                <p className="text-gray-600">Nenhum vídeo adicionado ainda.</p>
              </div>
            </TabsContent>

            <TabsContent value="simulacoes" className="mt-0">
              <div className="p-6">
                <h3 className="text-xl font-bold mb-4">Simulações</h3>
                <p className="text-gray-600">Nenhuma simulação disponível.</p>
              </div>
            </TabsContent>

            <TabsContent value="documentos" className="mt-0">
              <div className="p-6">
                <h3 className="text-xl font-bold mb-4">Documentos</h3>
                <p className="text-gray-600">Nenhum documento adicionado ainda.</p>
              </div>
            </TabsContent>

            <TabsContent value="contratos" className="mt-0">
              <div className="p-6">
                <h3 className="text-xl font-bold mb-4">Contratos</h3>
                <p className="text-gray-600">Nenhum contrato disponível.</p>
              </div>
            </TabsContent>

            <TabsContent value="galeria" className="mt-0">
              <div className="p-6">
                <h3 className="text-xl font-bold mb-4">Galeria</h3>
                <p className="text-gray-600">Galeria vazia.</p>
              </div>
            </TabsContent>

            <TabsContent value="historico" className="mt-0">
              <div className="p-6">
                <h3 className="text-xl font-bold mb-4">Histórico Completo</h3>
                <p className="text-gray-600">Visualização completa do histórico.</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </MainLayout>
  );
}
