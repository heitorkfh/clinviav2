import React, { useState } from 'react';
import { MainLayout } from '../components/layout/main-layout';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Textarea } from '../components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Badge } from '../components/ui/badge';
import { 
  User, 
  FileText, 
  History, 
  Stethoscope,
  Calendar,
  Save,
  AlertCircle,
  Camera,
  Mic,
  Pause,
  X,
  Clock
} from 'lucide-react';
import { PatientHistoryPopup } from '../components/atendimento/patient-history-popup';
import { ConsultationTimer } from '../components/atendimento/consultation-timer';
import { VitalSigns } from '../components/atendimento/vital-signs';
import { PrescriptionSection } from '../components/atendimento/prescription-section';

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
  const [patientHistoryOpen, setPatientHistoryOpen] = useState(false);

  const handleSaveConsultation = () => {
    console.log('Salvando consulta:', {
      patientId: mockPatient.id,
      appointmentId: mockAppointment.id,
      notes: currentNotes
    });
  };

  const handleCancelConsultation = () => {
    if (confirm('Tem certeza que deseja cancelar esta consulta? Todas as informações não salvas serão perdidas.')) {
      setCurrentNotes('');
      console.log('Consulta cancelada');
    }
  };

  const handleStartRecording = () => {
    setIsRecording(!isRecording);
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
          
          <div className="flex gap-2">
            <Button 
              onClick={handleCancelConsultation}
              variant="outline"
              className="text-red-600 border-red-600 hover:bg-red-50"
            >
              <X className="h-4 w-4 mr-2" />
              Cancelar Consulta
            </Button>
            <Button 
              onClick={handleSaveConsultation}
              className="bg-gradient-clinvia hover:opacity-90 text-white"
            >
              <Save className="h-4 w-4 mr-2" />
              Salvar Consulta
            </Button>
          </div>
        </div>

        {/* Timer */}
        <ConsultationTimer />

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
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setPatientHistoryOpen(true)}
                >
                  <User className="h-4 w-4 mr-2" />
                  Ver Histórico
                </Button>
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
            <PrescriptionSection />
          </div>

          {/* Sidebar Tools */}
          <div className="space-y-6">
            {/* Vital Signs */}
            <VitalSigns />

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

        {/* Popups */}
        <PatientHistoryPopup
          open={patientHistoryOpen}
          onClose={() => setPatientHistoryOpen(false)}
          patient={mockPatient}
        />
      </div>
    </MainLayout>
  );
}
