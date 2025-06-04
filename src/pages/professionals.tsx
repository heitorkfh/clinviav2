import React, { useState } from 'react';
import { MainLayout } from '../components/layout/main-layout';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Plus, Search, Edit, Trash2, Clock, Calendar } from 'lucide-react';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { useNavigate } from 'react-router-dom';

const mockProfessionals = [
  {
    id: 1,
    name: 'Dr. Eduardo Silva',
    specialty: 'Cardiologista',
    email: 'eduardo@clinvia.com',
    phone: '(11) 99999-9999',
    avatar: '',
    workingDays: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'],
    workingHours: '08:00 - 18:00',
    status: 'Ativo'
  },
  {
    id: 2,
    name: 'Dr. Luís Santos',
    specialty: 'Neurologista',
    email: 'luis@clinvia.com',
    phone: '(11) 88888-8888',
    avatar: '',
    workingDays: ['Segunda', 'Terça', 'Quinta', 'Sexta'],
    workingHours: '09:00 - 17:00',
    status: 'Ativo'
  },
  {
    id: 3,
    name: 'Dra. Carla Mendes',
    specialty: 'Dermatologista',
    email: 'carla@clinvia.com',
    phone: '(11) 77777-7777',
    avatar: '',
    workingDays: ['Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
    workingHours: '08:30 - 16:30',
    status: 'Ativo'
  }
];

export default function Professionals() {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const filteredProfessionals = mockProfessionals.filter(professional =>
    professional.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    professional.specialty.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <MainLayout>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Profissionais</h1>
            <p className="text-gray-600">Gerencie os profissionais e seus horários de atendimento.</p>
          </div>
          
          <Button 
            onClick={() => navigate('/professionals/new')}
            className="bg-gradient-clinvia hover:opacity-90 text-white"
          >
            <Plus className="h-4 w-4 mr-2" />
            Novo Profissional
          </Button>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Buscar por nome ou especialidade..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProfessionals.map((professional) => (
            <Card key={professional.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarImage src={professional.avatar} />
                      <AvatarFallback className="bg-blue-100 text-blue-600">
                        {professional.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg">{professional.name}</CardTitle>
                      <p className="text-sm text-gray-600">{professional.specialty}</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-green-600 border-green-600">
                    {professional.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">
                    <strong>Email:</strong> {professional.email}
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Telefone:</strong> {professional.phone}
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="h-4 w-4" />
                    <span>Dias de atendimento:</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {professional.workingDays.map((day) => (
                      <Badge key={day} variant="secondary" className="text-xs">
                        {day}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock className="h-4 w-4" />
                  <span>Horário: {professional.workingHours}</span>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => navigate(`/professionals/${professional.id}`)}
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Editar
                  </Button>
                  <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
