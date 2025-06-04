
import React, { useState } from 'react';
import { MainLayout } from '../components/layout/main-layout';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { 
  Building, 
  Save, 
  Edit, 
  Upload,
  MapPin,
  Phone,
  Mail,
  Users,
  FileText
} from 'lucide-react';

export default function CompanyProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [companyData, setCompanyData] = useState({
    // Basic Info
    companyName: 'Clínica Exemplo',
    tradeName: 'Clínica Exemplo LTDA',
    cnpj: '12.345.678/0001-90',
    cpf: '',
    personType: 'juridica', // juridica ou fisica
    
    // Contact
    phone: '(11) 3456-7890',
    whatsapp: '(11) 99999-9999',
    email: 'contato@clinica.com',
    website: 'www.clinica.com',
    
    // Address
    cep: '01234-567',
    street: 'Rua das Flores, 123',
    neighborhood: 'Centro',
    city: 'São Paulo',
    state: 'SP',
    complement: 'Sala 101',
    
    // Company Details
    employeeCount: '10-50',
    foundedYear: '2020',
    specialties: ['Cardiologia', 'Dermatologia', 'Clínica Geral'],
    description: 'Clínica especializada em atendimento médico de qualidade.',
    
    // Legal
    stateRegistration: '123.456.789.123',
    municipalRegistration: '987654321',
    logo: ''
  });

  const handleSave = () => {
    console.log('Salvando dados da empresa:', companyData);
    setIsEditing(false);
  };

  const handleChange = (field: string, value: any) => {
    setCompanyData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <MainLayout>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Perfil da Empresa</h1>
            <p className="text-gray-600">Gerencie os dados da sua empresa ou perfil profissional.</p>
          </div>
          
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Logo and Basic Info */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="h-5 w-5" />
                Logo e Informações Básicas
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col items-center space-y-4">
                <div className="relative">
                  <Avatar className="h-32 w-32">
                    <AvatarImage src={companyData.logo} />
                    <AvatarFallback className="text-2xl">
                      {companyData.companyName.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  {isEditing && (
                    <Button
                      size="sm"
                      className="absolute bottom-0 right-0 rounded-full h-8 w-8 p-0"
                      onClick={() => {/* Handle file upload */}}
                    >
                      <Upload className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                
                <div className="text-center">
                  <h3 className="font-semibold text-lg">{companyData.companyName}</h3>
                  <p className="text-gray-600">{companyData.tradeName}</p>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <Label>Tipo de Pessoa</Label>
                  {isEditing ? (
                    <Select
                      value={companyData.personType}
                      onValueChange={(value) => handleChange('personType', value)}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="juridica">Pessoa Jurídica</SelectItem>
                        <SelectItem value="fisica">Pessoa Física</SelectItem>
                      </SelectContent>
                    </Select>
                  ) : (
                    <p className="mt-1 font-medium">
                      {companyData.personType === 'juridica' ? 'Pessoa Jurídica' : 'Pessoa Física'}
                    </p>
                  )}
                </div>

                {companyData.personType === 'juridica' ? (
                  <div>
                    <Label>CNPJ</Label>
                    {isEditing ? (
                      <Input
                        value={companyData.cnpj}
                        onChange={(e) => handleChange('cnpj', e.target.value)}
                        className="mt-1"
                        placeholder="00.000.000/0000-00"
                      />
                    ) : (
                      <p className="mt-1 font-medium">{companyData.cnpj}</p>
                    )}
                  </div>
                ) : (
                  <div>
                    <Label>CPF</Label>
                    {isEditing ? (
                      <Input
                        value={companyData.cpf}
                        onChange={(e) => handleChange('cpf', e.target.value)}
                        className="mt-1"
                        placeholder="000.000.000-00"
                      />
                    ) : (
                      <p className="mt-1 font-medium">{companyData.cpf}</p>
                    )}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Company Details */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Dados da Empresa
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Nome da Empresa</Label>
                  {isEditing ? (
                    <Input
                      value={companyData.companyName}
                      onChange={(e) => handleChange('companyName', e.target.value)}
                      className="mt-1"
                    />
                  ) : (
                    <p className="mt-1 font-medium">{companyData.companyName}</p>
                  )}
                </div>
                <div>
                  <Label>Nome Fantasia</Label>
                  {isEditing ? (
                    <Input
                      value={companyData.tradeName}
                      onChange={(e) => handleChange('tradeName', e.target.value)}
                      className="mt-1"
                    />
                  ) : (
                    <p className="mt-1 font-medium">{companyData.tradeName}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Ano de Fundação</Label>
                  {isEditing ? (
                    <Input
                      value={companyData.foundedYear}
                      onChange={(e) => handleChange('foundedYear', e.target.value)}
                      className="mt-1"
                      type="number"
                    />
                  ) : (
                    <p className="mt-1 font-medium">{companyData.foundedYear}</p>
                  )}
                </div>
                <div>
                  <Label>Número de Funcionários</Label>
                  {isEditing ? (
                    <Select
                      value={companyData.employeeCount}
                      onValueChange={(value) => handleChange('employeeCount', value)}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1-10">1-10 funcionários</SelectItem>
                        <SelectItem value="10-50">10-50 funcionários</SelectItem>
                        <SelectItem value="50-100">50-100 funcionários</SelectItem>
                        <SelectItem value="100+">Mais de 100 funcionários</SelectItem>
                      </SelectContent>
                    </Select>
                  ) : (
                    <p className="mt-1 font-medium">{companyData.employeeCount} funcionários</p>
                  )}
                </div>
              </div>

              <div>
                <Label>Descrição</Label>
                {isEditing ? (
                  <Textarea
                    value={companyData.description}
                    onChange={(e) => handleChange('description', e.target.value)}
                    className="mt-1"
                    rows={3}
                  />
                ) : (
                  <p className="mt-1">{companyData.description}</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="h-5 w-5" />
                Informações de Contato
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <Label>Telefone</Label>
                  {isEditing ? (
                    <Input
                      value={companyData.phone}
                      onChange={(e) => handleChange('phone', e.target.value)}
                      className="mt-1"
                    />
                  ) : (
                    <p className="mt-1 font-medium">{companyData.phone}</p>
                  )}
                </div>
                <div>
                  <Label>WhatsApp</Label>
                  {isEditing ? (
                    <Input
                      value={companyData.whatsapp}
                      onChange={(e) => handleChange('whatsapp', e.target.value)}
                      className="mt-1"
                    />
                  ) : (
                    <p className="mt-1 font-medium">{companyData.whatsapp}</p>
                  )}
                </div>
                <div>
                  <Label>Email</Label>
                  {isEditing ? (
                    <Input
                      value={companyData.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      className="mt-1"
                      type="email"
                    />
                  ) : (
                    <p className="mt-1 font-medium">{companyData.email}</p>
                  )}
                </div>
                <div>
                  <Label>Website</Label>
                  {isEditing ? (
                    <Input
                      value={companyData.website}
                      onChange={(e) => handleChange('website', e.target.value)}
                      className="mt-1"
                    />
                  ) : (
                    <p className="mt-1 font-medium">{companyData.website}</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Address */}
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Endereço
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <Label>CEP</Label>
                  {isEditing ? (
                    <Input
                      value={companyData.cep}
                      onChange={(e) => handleChange('cep', e.target.value)}
                      className="mt-1"
                    />
                  ) : (
                    <p className="mt-1 font-medium">{companyData.cep}</p>
                  )}
                </div>
                <div className="md:col-span-2">
                  <Label>Endereço</Label>
                  {isEditing ? (
                    <Input
                      value={companyData.street}
                      onChange={(e) => handleChange('street', e.target.value)}
                      className="mt-1"
                    />
                  ) : (
                    <p className="mt-1 font-medium">{companyData.street}</p>
                  )}
                </div>
                <div>
                  <Label>Complemento</Label>
                  {isEditing ? (
                    <Input
                      value={companyData.complement}
                      onChange={(e) => handleChange('complement', e.target.value)}
                      className="mt-1"
                    />
                  ) : (
                    <p className="mt-1 font-medium">{companyData.complement}</p>
                  )}
                </div>
                <div>
                  <Label>Bairro</Label>
                  {isEditing ? (
                    <Input
                      value={companyData.neighborhood}
                      onChange={(e) => handleChange('neighborhood', e.target.value)}
                      className="mt-1"
                    />
                  ) : (
                    <p className="mt-1 font-medium">{companyData.neighborhood}</p>
                  )}
                </div>
                <div>
                  <Label>Cidade</Label>
                  {isEditing ? (
                    <Input
                      value={companyData.city}
                      onChange={(e) => handleChange('city', e.target.value)}
                      className="mt-1"
                    />
                  ) : (
                    <p className="mt-1 font-medium">{companyData.city}</p>
                  )}
                </div>
                <div>
                  <Label>Estado</Label>
                  {isEditing ? (
                    <Select
                      value={companyData.state}
                      onValueChange={(value) => handleChange('state', value)}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="SP">São Paulo</SelectItem>
                        <SelectItem value="RJ">Rio de Janeiro</SelectItem>
                        <SelectItem value="MG">Minas Gerais</SelectItem>
                        {/* Add more states as needed */}
                      </SelectContent>
                    </Select>
                  ) : (
                    <p className="mt-1 font-medium">{companyData.state}</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}
