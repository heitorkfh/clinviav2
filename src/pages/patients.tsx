
import React, { useState } from 'react';
import { MainLayout } from '../components/layout/main-layout';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Search, Plus, Eye, Edit, Phone, Mail } from 'lucide-react';
import { PatientForm } from '../components/patients/patient-form';
import { PatientDetails } from '../components/patients/patient-details';

const mockPatients = [
  {
    id: 1,
    name: 'Luis Carlos da Silva',
    age: 35,
    phone: '(54) 92342-4242',
    email: 'antoniocarlos@gmail.com',
    gender: 'Masculino',
    birthDate: '1988-03-15',
    cpf: '123.456.789-00',
    address: 'Rua das Flores, 123',
    city: 'Porto Alegre',
    state: 'RS',
    zipCode: '91000-000',
    appointments: 6,
    revenue: 2250,
    lastVisit: '2024-01-15',
    status: 'Ativo'
  },
  {
    id: 2,
    name: 'Maria Santos',
    age: 42,
    phone: '(51) 98765-4321',
    email: 'maria.santos@email.com',
    gender: 'Feminino',
    birthDate: '1981-07-22',
    cpf: '987.654.321-00',
    address: 'Av. Principal, 456',
    city: 'Caxias do Sul',
    state: 'RS',
    zipCode: '95000-000',
    appointments: 12,
    revenue: 4500,
    lastVisit: '2024-01-10',
    status: 'Ativo'
  }
];

export default function Patients() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [editingPatient, setEditingPatient] = useState(null);

  const filteredPatients = mockPatients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.phone.includes(searchTerm) ||
    patient.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleNewPatient = () => {
    setEditingPatient(null);
    setShowForm(true);
    setSelectedPatient(null);
  };

  const handleEditPatient = (patient) => {
    setEditingPatient(patient);
    setShowForm(true);
    setSelectedPatient(null);
  };

  const handleViewPatient = (patient) => {
    setSelectedPatient(patient);
    setShowForm(false);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingPatient(null);
  };

  const handleCloseDetails = () => {
    setSelectedPatient(null);
  };

  if (selectedPatient) {
    return <PatientDetails patient={selectedPatient} onClose={handleCloseDetails} />;
  }

  if (showForm) {
    return <PatientForm patient={editingPatient} onClose={handleCloseForm} />;
  }

  return (
    <MainLayout>
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Pacientes</h1>
            <p className="text-gray-600">Gerencie o cadastro de pacientes</p>
          </div>
          <Button onClick={handleNewPatient} className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            Novo Paciente
          </Button>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Buscar pacientes por nome, telefone ou email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredPatients.map((patient) => (
                <div key={patient.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 font-semibold text-lg">
                          {patient.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{patient.name}</h3>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <span className="flex items-center gap-1">
                            <Phone className="h-3 w-3" />
                            {patient.phone}
                          </span>
                          <span className="flex items-center gap-1">
                            <Mail className="h-3 w-3" />
                            {patient.email}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-sm text-gray-500">
                            {patient.age} anos • {patient.gender}
                          </span>
                          <Badge variant={patient.status === 'Ativo' ? 'default' : 'secondary'}>
                            {patient.status}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-right text-sm">
                        <div className="font-semibold">{patient.appointments} consultas</div>
                        <div className="text-gray-600">R$ {patient.revenue.toLocaleString()}</div>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleViewPatient(patient)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditPatient(patient)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
