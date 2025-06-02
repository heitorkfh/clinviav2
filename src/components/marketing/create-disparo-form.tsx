
import React, { useState } from 'react';
import { MainLayout } from '../layout/main-layout';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Checkbox } from '../ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Badge } from '../ui/badge';
import { ArrowLeft, Send, Clock, Users } from 'lucide-react';

interface CreateDisparoFormProps {
  onClose: () => void;
}

const mockLeads = [
  { id: 1, name: 'Ana Silva', phone: '(11) 99999-1234', status: 'Novo' },
  { id: 2, name: 'Carlos Santos', phone: '(11) 98888-5678', status: 'Qualificado' },
  { id: 3, name: 'Maria Oliveira', phone: '(11) 97777-9012', status: 'Em contato' },
];

export function CreateDisparoForm({ onClose }: CreateDisparoFormProps) {
  const [formData, setFormData] = useState({
    title: '',
    message: '',
    channel: '',
    sendTo: 'selected', // 'all' or 'selected'
    scheduledFor: '',
    sendNow: true
  });
  
  const [selectedLeads, setSelectedLeads] = useState<number[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Criando disparo:', { ...formData, selectedLeads });
    // Aqui você implementaria a lógica de criação do disparo
    onClose();
  };

  const handleLeadToggle = (leadId: number) => {
    setSelectedLeads(prev => 
      prev.includes(leadId) 
        ? prev.filter(id => id !== leadId)
        : [...prev, leadId]
    );
  };

  const handleSelectAll = () => {
    setSelectedLeads(mockLeads.map(lead => lead.id));
  };

  const handleDeselectAll = () => {
    setSelectedLeads([]);
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
            <h1 className="text-3xl font-bold text-gray-900">Novo Disparo</h1>
            <p className="text-gray-600">Crie um novo disparo em massa</p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <Tabs defaultValue="mensagem" className="space-y-6">
            <TabsList>
              <TabsTrigger value="mensagem">Mensagem</TabsTrigger>
              <TabsTrigger value="destinatarios">Destinatários</TabsTrigger>
              <TabsTrigger value="envio">Configuração de Envio</TabsTrigger>
            </TabsList>

            <TabsContent value="mensagem">
              <Card>
                <CardHeader>
                  <CardTitle>Configuração da Mensagem</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="title">Título da Campanha *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="Ex: Promoção Limpeza Dental"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="message">Mensagem *</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                      placeholder="Digite sua mensagem aqui..."
                      rows={6}
                      required
                    />
                    <div className="text-sm text-gray-500 mt-1">
                      Caracteres: {formData.message.length}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="channel">Canal de Envio *</Label>
                    <Select value={formData.channel} onValueChange={(value) => setFormData(prev => ({ ...prev, channel: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o canal" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="whatsapp-oficial">WhatsApp API Oficial</SelectItem>
                        <SelectItem value="whatsapp-nao-oficial">WhatsApp Não Oficial</SelectItem>
                        <SelectItem value="sms">SMS</SelectItem>
                        <SelectItem value="email">Email</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="destinatarios">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Selecionar Destinatários</CardTitle>
                    <div className="flex gap-2">
                      <Button type="button" variant="outline" size="sm" onClick={handleSelectAll}>
                        Selecionar Todos
                      </Button>
                      <Button type="button" variant="outline" size="sm" onClick={handleDeselectAll}>
                        Desmarcar Todos
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-2 mb-4">
                    <Users className="h-4 w-4" />
                    <span className="font-medium">
                      {selectedLeads.length} de {mockLeads.length} leads selecionados
                    </span>
                  </div>

                  <div className="space-y-3">
                    {mockLeads.map((lead) => (
                      <div key={lead.id} className="flex items-center space-x-3 p-3 border rounded-lg">
                        <Checkbox
                          id={`lead-${lead.id}`}
                          checked={selectedLeads.includes(lead.id)}
                          onCheckedChange={() => handleLeadToggle(lead.id)}
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-3">
                            <span className="font-medium">{lead.name}</span>
                            <Badge variant="outline">{lead.status}</Badge>
                          </div>
                          <span className="text-sm text-gray-600">{lead.phone}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="envio">
              <Card>
                <CardHeader>
                  <CardTitle>Configurações de Envio</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="send-now"
                        checked={formData.sendNow}
                        onCheckedChange={(checked) => setFormData(prev => ({ ...prev, sendNow: checked as boolean }))}
                      />
                      <Label htmlFor="send-now">Enviar agora</Label>
                    </div>
                    
                    {!formData.sendNow && (
                      <div>
                        <Label htmlFor="scheduled">Agendar para</Label>
                        <Input
                          id="scheduled"
                          type="datetime-local"
                          value={formData.scheduledFor}
                          onChange={(e) => setFormData(prev => ({ ...prev, scheduledFor: e.target.value }))}
                        />
                      </div>
                    )}
                  </div>

                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <h4 className="font-medium text-yellow-800">Atenção</h4>
                    <p className="text-sm text-yellow-700 mt-1">
                      Certifique-se de que todas as informações estão corretas antes de enviar. 
                      Disparos não podem ser cancelados após o início do envio.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="flex gap-4 mt-6">
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              {formData.sendNow ? (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Enviar Agora
                </>
              ) : (
                <>
                  <Clock className="h-4 w-4 mr-2" />
                  Agendar Disparo
                </>
              )}
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
