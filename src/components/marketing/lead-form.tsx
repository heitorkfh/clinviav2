
import React, { useState } from 'react';
import { MainLayout } from '../layout/main-layout';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { ArrowLeft, Save } from 'lucide-react';

interface LeadFormProps {
  lead?: any;
  onClose: () => void;
}

export function LeadForm({ lead, onClose }: LeadFormProps) {
  const [formData, setFormData] = useState({
    name: lead?.name || '',
    phone: lead?.phone || '',
    email: lead?.email || '',
    source: lead?.source || '',
    status: lead?.status || 'Novo',
    interest: lead?.interest || '',
    notes: lead?.notes || ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Salvando lead:', formData);
    // Aqui você implementaria a lógica de salvamento
    onClose();
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <MainLayout>
      <div className="p-6 space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={onClose}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {lead ? 'Editar Lead' : 'Novo Lead'}
            </h1>
            <p className="text-gray-600">
              {lead ? 'Edite as informações do lead' : 'Cadastre um novo lead'}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Informações Básicas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Nome *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Telefone *</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="source">Origem</Label>
                  <Select value={formData.source} onValueChange={(value) => handleChange('source', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a origem" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Instagram">Instagram</SelectItem>
                      <SelectItem value="Facebook">Facebook</SelectItem>
                      <SelectItem value="Google Ads">Google Ads</SelectItem>
                      <SelectItem value="Site">Site</SelectItem>
                      <SelectItem value="Indicação">Indicação</SelectItem>
                      <SelectItem value="WhatsApp">WhatsApp</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select value={formData.status} onValueChange={(value) => handleChange('status', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Novo">Novo</SelectItem>
                      <SelectItem value="Qualificado">Qualificado</SelectItem>
                      <SelectItem value="Em contato">Em contato</SelectItem>
                      <SelectItem value="Convertido">Convertido</SelectItem>
                      <SelectItem value="Perdido">Perdido</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="interest">Interesse</Label>
                  <Select value={formData.interest} onValueChange={(value) => handleChange('interest', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o interesse" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Limpeza">Limpeza</SelectItem>
                      <SelectItem value="Restauração">Restauração</SelectItem>
                      <SelectItem value="Implante">Implante</SelectItem>
                      <SelectItem value="Ortodontia">Ortodontia</SelectItem>
                      <SelectItem value="Clareamento">Clareamento</SelectItem>
                      <SelectItem value="Prótese">Prótese</SelectItem>
                      <SelectItem value="Outro">Outro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="notes">Observações</Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => handleChange('notes', e.target.value)}
                  placeholder="Adicione observações sobre o lead..."
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-4">
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              <Save className="h-4 w-4 mr-2" />
              Salvar Lead
            </Button>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
          </div>
        </form>
      </div>
    </MainLayout>
  );
}
