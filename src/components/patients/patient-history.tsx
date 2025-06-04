
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Calendar, Clock, User, FileText, Filter, Search } from 'lucide-react';

interface PatientHistoryProps {
  patient?: any;
}

const mockHistoryData = [
  {
    id: 1,
    date: '2024-01-15',
    time: '14:30',
    type: 'Consulta',
    professional: 'Dr. Eduardo Silva',
    description: 'Consulta de rotina - Paciente apresentou melhora nos sintomas',
    status: 'Concluído'
  },
  {
    id: 2,
    date: '2024-01-10',
    time: '10:00',
    type: 'Exame',
    professional: 'Dr. Eduardo Silva',
    description: 'Exames laboratoriais - Glicemia e hemoglobina glicada',
    status: 'Concluído'
  },
  {
    id: 3,
    date: '2024-01-05',
    time: '16:15',
    type: 'Prescrição',
    professional: 'Dr. Eduardo Silva',
    description: 'Ajuste na dosagem da insulina',
    status: 'Ativo'
  },
  {
    id: 4,
    date: '2023-12-20',
    time: '09:45',
    type: 'Consulta',
    professional: 'Dra. Maria Santos',
    description: 'Avaliação nutricional e orientações dietéticas',
    status: 'Concluído'
  }
];

export function PatientHistory({ patient }: PatientHistoryProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredHistory = mockHistoryData.filter(item => {
    const matchesSearch = item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.professional.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || item.type === typeFilter;
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Concluído':
        return 'bg-green-100 text-green-800';
      case 'Ativo':
        return 'bg-blue-100 text-blue-800';
      case 'Pendente':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Consulta':
        return 'bg-blue-100 text-blue-800';
      case 'Exame':
        return 'bg-purple-100 text-purple-800';
      case 'Prescrição':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Histórico Completo do Paciente
          </CardTitle>
          
          {/* Filtros */}
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Buscar no histórico..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os tipos</SelectItem>
                <SelectItem value="Consulta">Consulta</SelectItem>
                <SelectItem value="Exame">Exame</SelectItem>
                <SelectItem value="Prescrição">Prescrição</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os status</SelectItem>
                <SelectItem value="Concluído">Concluído</SelectItem>
                <SelectItem value="Ativo">Ativo</SelectItem>
                <SelectItem value="Pendente">Pendente</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="space-y-4">
            {filteredHistory.map((item) => (
              <div key={item.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <Badge className={getTypeColor(item.type)}>
                        {item.type}
                      </Badge>
                      <Badge className={getStatusColor(item.status)}>
                        {item.status}
                      </Badge>
                    </div>
                    
                    <p className="font-medium text-gray-900 mb-2">
                      {item.description}
                    </p>
                    
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(item.date).toLocaleDateString('pt-BR')}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {item.time}
                      </span>
                      <span className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        {item.professional}
                      </span>
                    </div>
                  </div>
                  
                  <Button variant="ghost" size="sm">
                    Ver detalhes
                  </Button>
                </div>
              </div>
            ))}
            
            {filteredHistory.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <FileText className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>Nenhum registro encontrado.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
