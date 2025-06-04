
import React, { useState } from 'react';
import { MainLayout } from '../components/layout/main-layout';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Save,
  Stethoscope,
  DollarSign,
  Clock,
  AlertTriangle,
  FileText
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

const mockProcedures = [
  {
    id: 1,
    name: 'Consulta Cardiológica',
    category: 'Consultas',
    duration: 30,
    price: 250.00,
    description: 'Consulta especializada em cardiologia',
    contraindications: 'Pacientes com marca-passo devem informar',
    instructions: 'Jejum de 8 horas não necessário',
    status: 'Ativo'
  },
  {
    id: 2,
    name: 'Eletrocardiograma',
    category: 'Exames',
    duration: 15,
    price: 80.00,
    description: 'Exame do coração através de eletrocardiograma',
    contraindications: 'Nenhuma contraindicação específica',
    instructions: 'Evitar exercícios físicos intensos 2h antes',
    status: 'Ativo'
  }
];

export default function Procedures() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isEditing, setIsEditing] = useState(!id || id === 'new');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProcedure, setSelectedProcedure] = useState(
    id && id !== 'new' ? mockProcedures.find(p => p.id === parseInt(id)) : null
  );

  const [procedureData, setProcedureData] = useState({
    name: selectedProcedure?.name || '',
    category: selectedProcedure?.category || '',
    duration: selectedProcedure?.duration || 30,
    price: selectedProcedure?.price || 0,
    description: selectedProcedure?.description || '',
    contraindications: selectedProcedure?.contraindications || '',
    instructions: selectedProcedure?.instructions || '',
    status: selectedProcedure?.status || 'Ativo',
    materials: [],
    preparationInstructions: '',
    followUpInstructions: '',
    complications: '',
    observations: ''
  });

  const filteredProcedures = mockProcedures.filter(procedure =>
    procedure.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    procedure.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSave = () => {
    console.log('Salvando procedimento:', procedureData);
    setIsEditing(false);
    if (id === 'new') {
      navigate('/procedures');
    }
  };

  const handleChange = (field: string, value: any) => {
    setProcedureData(prev => ({ ...prev, [field]: value }));
  };

  // If showing details/editing a specific procedure
  if (id) {
    return (
      <MainLayout>
        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {id === 'new' ? 'Novo Procedimento' : procedureData.name}
              </h1>
              <p className="text-gray-600">
                {id === 'new' ? 'Cadastre um novo procedimento' : 'Detalhes e configurações do procedimento'}
              </p>
            </div>
            
            <div className="flex gap-2">
              <Button 
                variant="outline"
                onClick={() => navigate('/procedures')}
              >
                Voltar
              </Button>
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
                    <Edit className="h-4 w-4 mr-2" />
                    Editar
                  </>
                )}
              </Button>
            </div>
          </div>

          <Tabs defaultValue="basic" className="space-y-4">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="basic">Informações Básicas</TabsTrigger>
              <TabsTrigger value="clinical">Informações Clínicas</TabsTrigger>
              <TabsTrigger value="instructions">Orientações</TabsTrigger>
              <TabsTrigger value="materials">Materiais</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Stethoscope className="h-5 w-5" />
                    Dados Básicos
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Nome do Procedimento</Label>
                      {isEditing ? (
                        <Input
                          value={procedureData.name}
                          onChange={(e) => handleChange('name', e.target.value)}
                          className="mt-1"
                        />
                      ) : (
                        <p className="mt-1 font-medium">{procedureData.name}</p>
                      )}
                    </div>
                    <div>
                      <Label>Categoria</Label>
                      {isEditing ? (
                        <Select
                          value={procedureData.category}
                          onValueChange={(value) => handleChange('category', value)}
                        >
                          <SelectTrigger className="mt-1">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Consultas">Consultas</SelectItem>
                            <SelectItem value="Exames">Exames</SelectItem>
                            <SelectItem value="Cirurgias">Cirurgias</SelectItem>
                            <SelectItem value="Procedimentos">Procedimentos</SelectItem>
                            <SelectItem value="Terapias">Terapias</SelectItem>
                          </SelectContent>
                        </Select>
                      ) : (
                        <p className="mt-1 font-medium">{procedureData.category}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label>Duração (minutos)</Label>
                      {isEditing ? (
                        <Input
                          type="number"
                          value={procedureData.duration}
                          onChange={(e) => handleChange('duration', parseInt(e.target.value))}
                          className="mt-1"
                        />
                      ) : (
                        <p className="mt-1 font-medium">{procedureData.duration} min</p>
                      )}
                    </div>
                    <div>
                      <Label>Valor (R$)</Label>
                      {isEditing ? (
                        <Input
                          type="number"
                          step="0.01"
                          value={procedureData.price}
                          onChange={(e) => handleChange('price', parseFloat(e.target.value))}
                          className="mt-1"
                        />
                      ) : (
                        <p className="mt-1 font-medium">R$ {procedureData.price?.toFixed(2)}</p>
                      )}
                    </div>
                    <div>
                      <Label>Status</Label>
                      {isEditing ? (
                        <Select
                          value={procedureData.status}
                          onValueChange={(value) => handleChange('status', value)}
                        >
                          <SelectTrigger className="mt-1">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Ativo">Ativo</SelectItem>
                            <SelectItem value="Inativo">Inativo</SelectItem>
                          </SelectContent>
                        </Select>
                      ) : (
                        <Badge variant={procedureData.status === 'Ativo' ? 'default' : 'secondary'}>
                          {procedureData.status}
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div>
                    <Label>Descrição</Label>
                    {isEditing ? (
                      <Textarea
                        value={procedureData.description}
                        onChange={(e) => handleChange('description', e.target.value)}
                        className="mt-1"
                        rows={3}
                      />
                    ) : (
                      <p className="mt-1">{procedureData.description}</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="clinical" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5" />
                    Informações Clínicas
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Contraindicações</Label>
                    {isEditing ? (
                      <Textarea
                        value={procedureData.contraindications}
                        onChange={(e) => handleChange('contraindications', e.target.value)}
                        className="mt-1"
                        rows={3}
                      />
                    ) : (
                      <p className="mt-1">{procedureData.contraindications}</p>
                    )}
                  </div>

                  <div>
                    <Label>Possíveis Complicações</Label>
                    {isEditing ? (
                      <Textarea
                        value={procedureData.complications}
                        onChange={(e) => handleChange('complications', e.target.value)}
                        className="mt-1"
                        rows={3}
                      />
                    ) : (
                      <p className="mt-1">{procedureData.complications}</p>
                    )}
                  </div>

                  <div>
                    <Label>Observações Clínicas</Label>
                    {isEditing ? (
                      <Textarea
                        value={procedureData.observations}
                        onChange={(e) => handleChange('observations', e.target.value)}
                        className="mt-1"
                        rows={3}
                      />
                    ) : (
                      <p className="mt-1">{procedureData.observations}</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="instructions" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Orientações ao Paciente
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Instruções de Preparação</Label>
                    {isEditing ? (
                      <Textarea
                        value={procedureData.preparationInstructions}
                        onChange={(e) => handleChange('preparationInstructions', e.target.value)}
                        className="mt-1"
                        rows={4}
                        placeholder="Ex: Jejum de 8 horas, suspender medicamentos..."
                      />
                    ) : (
                      <p className="mt-1">{procedureData.preparationInstructions}</p>
                    )}
                  </div>

                  <div>
                    <Label>Cuidados Pós-Procedimento</Label>
                    {isEditing ? (
                      <Textarea
                        value={procedureData.followUpInstructions}
                        onChange={(e) => handleChange('followUpInstructions', e.target.value)}
                        className="mt-1"
                        rows={4}
                        placeholder="Ex: Repouso por 24h, retorno em 7 dias..."
                      />
                    ) : (
                      <p className="mt-1">{procedureData.followUpInstructions}</p>
                    )}
                  </div>

                  <div>
                    <Label>Instruções Gerais</Label>
                    {isEditing ? (
                      <Textarea
                        value={procedureData.instructions}
                        onChange={(e) => handleChange('instructions', e.target.value)}
                        className="mt-1"
                        rows={3}
                      />
                    ) : (
                      <p className="mt-1">{procedureData.instructions}</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="materials" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Materiais e Equipamentos</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-500">Funcionalidade em desenvolvimento</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </MainLayout>
    );
  }

  // List view
  return (
    <MainLayout>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Procedimentos</h1>
            <p className="text-gray-600">Gerencie os procedimentos oferecidos pela clínica.</p>
          </div>
          
          <Button 
            onClick={() => navigate('/procedures/new')}
            className="bg-gradient-clinvia hover:opacity-90 text-white"
          >
            <Plus className="h-4 w-4 mr-2" />
            Novo Procedimento
          </Button>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Buscar procedimentos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProcedures.map((procedure) => (
            <Card key={procedure.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{procedure.name}</CardTitle>
                    <p className="text-sm text-gray-600">{procedure.category}</p>
                  </div>
                  <Badge variant="outline" className="text-green-600 border-green-600">
                    {procedure.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-gray-600">{procedure.description}</p>
                
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-1 text-gray-600">
                    <Clock className="h-4 w-4" />
                    <span>{procedure.duration} min</span>
                  </div>
                  <div className="flex items-center gap-1 text-green-600 font-medium">
                    <DollarSign className="h-4 w-4" />
                    <span>R$ {procedure.price.toFixed(2)}</span>
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => navigate(`/procedures/${procedure.id}`)}
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
