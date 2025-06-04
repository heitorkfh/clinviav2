
import React, { useState } from 'react';
import { MainLayout } from '../components/layout/main-layout';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Switch } from '../components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Badge } from '../components/ui/badge';
import { 
  Settings, 
  Bot, 
  MessageSquare, 
  Webhook, 
  Globe, 
  Shield,
  Save,
  Eye,
  EyeOff
} from 'lucide-react';

export default function SettingsPage() {
  const [isEditing, setIsEditing] = useState(false);
  const [showTokens, setShowTokens] = useState(false);
  const [settings, setSettings] = useState({
    // AI Configuration
    openaiToken: '',
    claudeToken: '',
    assistantName: 'Assistente Virtual',
    assistantPersonality: 'Profissional e atencioso',
    
    // WhatsApp Configuration
    whatsappOfficialToken: '',
    whatsappUnofficialToken: '',
    whatsappPhoneNumber: '',
    whatsappEnabled: true,
    
    // Public Page Configuration
    publicPageEnabled: true,
    publicPageUrl: 'clinvia.com/agendar',
    publicPageTitle: 'Agendamento Online',
    publicPageDescription: 'Agende sua consulta de forma rápida e prática',
    
    // Webhooks
    appointmentWebhook: '',
    patientWebhook: '',
    paymentWebhook: '',
    
    // Status Configuration
    appointmentStatuses: [
      { id: 1, name: 'Agendado', color: 'blue', active: true },
      { id: 2, name: 'Confirmado', color: 'green', active: true },
      { id: 3, name: 'Em Atendimento', color: 'yellow', active: true },
      { id: 4, name: 'Finalizado', color: 'gray', active: true },
      { id: 5, name: 'Cancelado', color: 'red', active: true },
      { id: 6, name: 'Reagendado', color: 'orange', active: true }
    ]
  });

  const handleSave = () => {
    console.log('Salvando configurações:', settings);
    setIsEditing(false);
  };

  const handleChange = (field: string, value: any) => {
    setSettings(prev => ({ ...prev, [field]: value }));
  };

  return (
    <MainLayout>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Configurações do Sistema</h1>
            <p className="text-gray-600">Gerencie as configurações gerais da plataforma.</p>
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
                <Settings className="h-4 w-4 mr-2" />
                Editar
              </>
            )}
          </Button>
        </div>

        <Tabs defaultValue="ai" className="space-y-4">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="ai">IA & Assistente</TabsTrigger>
            <TabsTrigger value="whatsapp">WhatsApp</TabsTrigger>
            <TabsTrigger value="public">Página Pública</TabsTrigger>
            <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
            <TabsTrigger value="status">Status</TabsTrigger>
          </TabsList>

          <TabsContent value="ai" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bot className="h-5 w-5" />
                  Configurações de IA
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <Label>Mostrar Tokens</Label>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowTokens(!showTokens)}
                  >
                    {showTokens ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Token OpenAI</Label>
                    <Input
                      type={showTokens ? "text" : "password"}
                      value={settings.openaiToken}
                      onChange={(e) => handleChange('openaiToken', e.target.value)}
                      disabled={!isEditing}
                      placeholder="sk-..."
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label>Token Claude (Anthropic)</Label>
                    <Input
                      type={showTokens ? "text" : "password"}
                      value={settings.claudeToken}
                      onChange={(e) => handleChange('claudeToken', e.target.value)}
                      disabled={!isEditing}
                      placeholder="sk-ant-..."
                      className="mt-1"
                    />
                  </div>
                </div>

                <div>
                  <Label>Nome do Assistente Virtual</Label>
                  <Input
                    value={settings.assistantName}
                    onChange={(e) => handleChange('assistantName', e.target.value)}
                    disabled={!isEditing}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label>Personalidade do Assistente</Label>
                  <Textarea
                    value={settings.assistantPersonality}
                    onChange={(e) => handleChange('assistantPersonality', e.target.value)}
                    disabled={!isEditing}
                    className="mt-1"
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="whatsapp" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Configurações WhatsApp
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>WhatsApp Habilitado</Label>
                  <Switch
                    checked={settings.whatsappEnabled}
                    onCheckedChange={(checked) => handleChange('whatsappEnabled', checked)}
                    disabled={!isEditing}
                  />
                </div>

                <div>
                  <Label>Número do WhatsApp</Label>
                  <Input
                    value={settings.whatsappPhoneNumber}
                    onChange={(e) => handleChange('whatsappPhoneNumber', e.target.value)}
                    disabled={!isEditing}
                    placeholder="+55 11 99999-9999"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label>Token API Oficial</Label>
                  <Input
                    type={showTokens ? "text" : "password"}
                    value={settings.whatsappOfficialToken}
                    onChange={(e) => handleChange('whatsappOfficialToken', e.target.value)}
                    disabled={!isEditing}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label>Token API Não Oficial</Label>
                  <Input
                    type={showTokens ? "text" : "password"}
                    value={settings.whatsappUnofficialToken}
                    onChange={(e) => handleChange('whatsappUnofficialToken', e.target.value)}
                    disabled={!isEditing}
                    className="mt-1"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="public" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  Página Pública de Agendamento
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Página Pública Habilitada</Label>
                  <Switch
                    checked={settings.publicPageEnabled}
                    onCheckedChange={(checked) => handleChange('publicPageEnabled', checked)}
                    disabled={!isEditing}
                  />
                </div>

                <div>
                  <Label>URL da Página</Label>
                  <Input
                    value={settings.publicPageUrl}
                    onChange={(e) => handleChange('publicPageUrl', e.target.value)}
                    disabled={!isEditing}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label>Título da Página</Label>
                  <Input
                    value={settings.publicPageTitle}
                    onChange={(e) => handleChange('publicPageTitle', e.target.value)}
                    disabled={!isEditing}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label>Descrição da Página</Label>
                  <Textarea
                    value={settings.publicPageDescription}
                    onChange={(e) => handleChange('publicPageDescription', e.target.value)}
                    disabled={!isEditing}
                    className="mt-1"
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="webhooks" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Webhook className="h-5 w-5" />
                  Webhooks
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Webhook Agendamentos</Label>
                  <Input
                    value={settings.appointmentWebhook}
                    onChange={(e) => handleChange('appointmentWebhook', e.target.value)}
                    disabled={!isEditing}
                    placeholder="https://..."
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label>Webhook Pacientes</Label>
                  <Input
                    value={settings.patientWebhook}
                    onChange={(e) => handleChange('patientWebhook', e.target.value)}
                    disabled={!isEditing}
                    placeholder="https://..."
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label>Webhook Pagamentos</Label>
                  <Input
                    value={settings.paymentWebhook}
                    onChange={(e) => handleChange('paymentWebhook', e.target.value)}
                    disabled={!isEditing}
                    placeholder="https://..."
                    className="mt-1"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="status" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Status de Atendimento
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-3">
                  {settings.appointmentStatuses.map((status) => (
                    <div key={status.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full bg-${status.color}-500`} />
                        <span className="font-medium">{status.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={status.active ? "default" : "secondary"}>
                          {status.active ? "Ativo" : "Inativo"}
                        </Badge>
                        {isEditing && (
                          <Switch
                            checked={status.active}
                            onCheckedChange={(checked) => {
                              const newStatuses = settings.appointmentStatuses.map(s =>
                                s.id === status.id ? { ...s, active: checked } : s
                              );
                              handleChange('appointmentStatuses', newStatuses);
                            }}
                          />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}
