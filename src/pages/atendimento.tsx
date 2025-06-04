
import React, { useState } from 'react';
import { MainLayout } from '../components/layout/main-layout';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Badge } from '../components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { 
  User, 
  Clock, 
  Bot, 
  FileText, 
  History, 
  Stethoscope,
  Calendar,
  Search,
  Save,
  Pill,
  AlertCircle,
  Camera,
  Mic,
  Play,
  Pause
} from 'lucide-react';

const mockPatient = {
  id: 1,
  name: 'Maria Silva Santos',
  age: 45,
  phone: '(11) 99999-9999',
  email: 'maria@email.com',
  lastVisit: '2024-01-15',
  allergies: ['Penicilina', 'Látex'],
  conditions: ['Hipertensão', 'Diabetes Tipo 2'],
  medications: ['Losartana 50mg', 'Metformina 500mg']
};

const mockAppointment = {
  id: 1,
  date: '2024-01-20',
  time: '14:30',
  type: 'Consulta de Retorno',
  professional: 'Dr. Eduardo Silva'
};

export default function AtendimentoPage() {
  const [isRecording, setIsRecording] = useState(false);
  const [currentNotes, setCurrentNotes] = useState('');
  const [patientDialogOpen, setPatientDialogOpen] = useState(false);
  const [aiSummary, setAiSummary] = useState('');
  const [prescription, setPrescription] = useState('');

  const handleGenerateAISummary = () => {
    // Simulate AI summary generation
    setAiSummary('Paciente apresenta quadro estável de hipertensão e diabetes. Sinais vitais dentro dos parâmetros normais. Recomendado manter medicação atual e retorno em 3 meses.');
  };

  const handleStartRecording = () => {
    setIsRecording(!isRecording);
  };

  const handleSaveConsultation = () => {
    console.log('Salvando consulta:', {
      patientId: mockPatient.id,
      appointmentId: mockAppointment.id,
      notes: currentNotes,
      prescription: prescription,
      aiSummary: aiSummary
    });
  };

  return (
    <MainLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Atendimento em Andamento</h1>
            <p className="text-gray-600">Ferramentas para auxiliar durante a consulta.</p>
          </div>
          
          <Button 
            onClick={handleSaveConsultation}
            className="bg-gradient-clinvia hover:opacity-90 text-white"
          >
            <Save className="h-4 w-4 mr-2" />
            Salvar Consulta
          </Button>
        </div>

        {/* Patient Info Banner */}
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src="" />
                  <AvatarFallback className="bg-blue-100 text-blue-600">
                    {mockPatient.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold text-lg">{mockPatient.name}</h3>
                  <p className="text-gray-600">{mockPatient.age} anos • {mockPatient.phone}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-green-600 border-green-600">
                  {mockAppointment.type}
                </Badge>
                <Dialog open={patientDialogOpen} onOpenChange={setPatientDialogOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      <User className="h-4 w-4 mr-2" />
                      Ver Histórico
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Histórico do Paciente - {mockPatient.name}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="grid grid-cols-3 gap-4">
                        <Card>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-sm">Alergias</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-1">
                              {mockPatient.allergies.map((allergy, index) => (
                                <Badge key={index} variant="destructive" className="mr-1">
                                  {allergy}
                                </Badge>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-sm">Condições</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-1">
                              {mockPatient.conditions.map((condition, index) => (
                                <Badge key={index} variant="secondary" className="mr-1">
                                  {condition}
                                </Badge>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-sm">Medicações</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-1">
                              {mockPatient.medications.map((medication, index) => (
                                <Badge key={index} variant="outline" className="mr-1">
                                  {medication}
                                </Badge>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                      {/* Add more patient history details here */}
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Consultation Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Consultation Notes */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Anotações da Consulta
                  </CardTitle>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleStartRecording}
                      className={isRecording ? "text-red-600" : ""}
                    >
                      {isRecording ? (
                        <>
                          <Pause className="h-4 w-4 mr-2" />
                          Pausar
                        </>
                      ) : (
                        <>
                          <Mic className="h-4 w-4 mr-2" />
                          Gravar
                        </>
                      )}
                    </Button>
                    <Button variant="outline" size="sm">
                      <Camera className="h-4 w-4 mr-2" />
                      Foto
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Digite suas anotações sobre a consulta..."
                  value={currentNotes}
                  onChange={(e) => setCurrentNotes(e.target.value)}
                  rows={8}
                  className="min-h-[200px]"
                />
                {isRecording && (
                  <div className="mt-2 flex items-center gap-2 text-red-600">
                    <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse" />
                    <span className="text-sm">Gravando...</span>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Prescription */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Pill className="h-5 w-5" />
                  Prescrição Médica
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Digite a prescrição médica..."
                  value={prescription}
                  onChange={(e) => setPrescription(e.target.value)}
                  rows={6}
                />
                <div className="mt-4 flex gap-2">
                  <Button variant="outline" size="sm">
                    Adicionar Medicamento
                  </Button>
                  <Button variant="outline" size="sm">
                    Modelo de Receita
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar Tools */}
          <div className="space-y-6">
            {/* AI Assistant */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bot className="h-5 w-5" />
                  Assistente IA
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={handleGenerateAISummary}
                >
                  Gerar Resumo da Consulta
                </Button>
                
                {aiSummary && (
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <h4 className="font-medium text-sm mb-2">Resumo Gerado por IA:</h4>
                    <p className="text-sm text-gray-700">{aiSummary}</p>
                  </div>
                )}

                <div className="space-y-2">
                  <Label>Consulta Rápida</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Ex: sintomas diabetes"
                      className="pl-10"
                    />
                  </div>
                  <Button variant="outline" size="sm" className="w-full">
                    Pesquisar
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Stethoscope className="h-5 w-5" />
                  Ações Rápidas
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Calendar className="h-4 w-4 mr-2" />
                  Agendar Retorno
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <FileText className="h-4 w-4 mr-2" />
                  Solicitar Exame
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <User className="h-4 w-4 mr-2" />
                  Encaminhar Especialista
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <History className="h-4 w-4 mr-2" />
                  Ver Consultas Anteriores
                </Button>
              </CardContent>
            </Card>

            {/* Alerts */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-orange-500" />
                  Alertas
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="p-2 bg-orange-50 border border-orange-200 rounded text-sm">
                  <strong>Alergia:</strong> Paciente alérgico à Penicilina
                </div>
                <div className="p-2 bg-blue-50 border border-blue-200 rounded text-sm">
                  <strong>Medicação:</strong> Toma Losartana 50mg
                </div>
              </CardContent>
            </Card>

            {/* Appointment Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Informações da Consulta
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="text-sm">
                  <strong>Data:</strong> {mockAppointment.date}
                </div>
                <div className="text-sm">
                  <strong>Horário:</strong> {mockAppointment.time}
                </div>
                <div className="text-sm">
                  <strong>Tipo:</strong> {mockAppointment.type}
                </div>
                <div className="text-sm">
                  <strong>Profissional:</strong> {mockAppointment.professional}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
