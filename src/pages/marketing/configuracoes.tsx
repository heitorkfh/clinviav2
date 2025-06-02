
import React, { useState } from 'react';
import { MainLayout } from '../../components/layout/main-layout';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Badge } from '../../components/ui/badge';
import { Switch } from '../../components/ui/switch';
import { Save, Check, X, AlertCircle } from 'lucide-react';

export default function MarketingConfiguracoes() {
  const [metaConfig, setMetaConfig] = useState({
    accessToken: '',
    phoneNumberId: '',
    businessAccountId: '',
    connected: false
  });

  const [evolutionConfig, setEvolutionConfig] = useState({
    apiUrl: '',
    apiKey: '',
    instanceName: '',
    connected: false
  });

  const [instagramConfig, setInstagramConfig] = useState({
    accessToken: '',
    businessAccountId: '',
    connected: false
  });

  const handleMetaSave = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Salvando configuração Meta:', metaConfig);
    // Aqui você implementaria a lógica de teste e salvamento
    setMetaConfig(prev => ({ ...prev, connected: true }));
  };

  const handleEvolutionSave = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Salvando configuração Evolution:', evolutionConfig);
    // Aqui você implementaria a lógica de teste e salvamento
    setEvolutionConfig(prev => ({ ...prev, connected: true }));
  };

  const handleInstagramSave = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Salvando configuração Instagram:', instagramConfig);
    // Aqui você implementaria a lógica de teste e salvamento
    setInstagramConfig(prev => ({ ...prev, connected: true }));
  };

  const getConnectionStatus = (connected: boolean) => {
    return connected ? (
      <Badge className="bg-green-100 text-green-800">
        <Check className="h-3 w-3 mr-1" />
        Conectado
      </Badge>
    ) : (
      <Badge className="bg-red-100 text-red-800">
        <X className="h-3 w-3 mr-1" />
        Desconectado
      </Badge>
    );
  };

  return (
    <MainLayout>
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Configurações de Marketing</h1>
          <p className="text-gray-600">Configure as integrações para disparos em massa</p>
        </div>

        <Tabs defaultValue="meta" className="space-y-6">
          <TabsList>
            <TabsTrigger value="meta">Meta (WhatsApp)</TabsTrigger>
            <TabsTrigger value="evolution">Evolution API</TabsTrigger>
            <TabsTrigger value="instagram">Instagram</TabsTrigger>
          </TabsList>

          <TabsContent value="meta">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Meta Business API</CardTitle>
                    <p className="text-sm text-gray-600 mt-1">
                      Configure a API oficial do WhatsApp Business
                    </p>
                  </div>
                  {getConnectionStatus(metaConfig.connected)}
                </div>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleMetaSave} className="space-y-4">
                  <div>
                    <Label htmlFor="meta-access-token">Access Token *</Label>
                    <Input
                      id="meta-access-token"
                      type="password"
                      value={metaConfig.accessToken}
                      onChange={(e) => setMetaConfig(prev => ({ ...prev, accessToken: e.target.value }))}
                      placeholder="Digite o access token da Meta"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="meta-phone-id">Phone Number ID *</Label>
                    <Input
                      id="meta-phone-id"
                      value={metaConfig.phoneNumberId}
                      onChange={(e) => setMetaConfig(prev => ({ ...prev, phoneNumberId: e.target.value }))}
                      placeholder="ID do número de telefone"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="meta-business-id">Business Account ID *</Label>
                    <Input
                      id="meta-business-id"
                      value={metaConfig.businessAccountId}
                      onChange={(e) => setMetaConfig(prev => ({ ...prev, businessAccountId: e.target.value }))}
                      placeholder="ID da conta business"
                      required
                    />
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-start gap-2">
                      <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-blue-800">Como obter as credenciais</h4>
                        <p className="text-sm text-blue-700 mt-1">
                          1. Acesse o Facebook Developers<br/>
                          2. Crie um app Business<br/>
                          3. Configure o WhatsApp Business API<br/>
                          4. Copie as credenciais necessárias
                        </p>
                      </div>
                    </div>
                  </div>

                  <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                    <Save className="h-4 w-4 mr-2" />
                    Salvar e Testar Conexão
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="evolution">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Evolution API</CardTitle>
                    <p className="text-sm text-gray-600 mt-1">
                      Configure a Evolution API para WhatsApp não oficial
                    </p>
                  </div>
                  {getConnectionStatus(evolutionConfig.connected)}
                </div>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleEvolutionSave} className="space-y-4">
                  <div>
                    <Label htmlFor="evolution-url">URL da API *</Label>
                    <Input
                      id="evolution-url"
                      value={evolutionConfig.apiUrl}
                      onChange={(e) => setEvolutionConfig(prev => ({ ...prev, apiUrl: e.target.value }))}
                      placeholder="https://sua-evolution-api.com"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="evolution-key">API Key *</Label>
                    <Input
                      id="evolution-key"
                      type="password"
                      value={evolutionConfig.apiKey}
                      onChange={(e) => setEvolutionConfig(prev => ({ ...prev, apiKey: e.target.value }))}
                      placeholder="Digite a API key"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="evolution-instance">Nome da Instância *</Label>
                    <Input
                      id="evolution-instance"
                      value={evolutionConfig.instanceName}
                      onChange={(e) => setEvolutionConfig(prev => ({ ...prev, instanceName: e.target.value }))}
                      placeholder="Nome da instância do WhatsApp"
                      required
                    />
                  </div>

                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <div className="flex items-start gap-2">
                      <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-yellow-800">Atenção</h4>
                        <p className="text-sm text-yellow-700 mt-1">
                          O uso de APIs não oficiais pode resultar no banimento da conta do WhatsApp. 
                          Use por sua conta e risco.
                        </p>
                      </div>
                    </div>
                  </div>

                  <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                    <Save className="h-4 w-4 mr-2" />
                    Salvar e Testar Conexão
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="instagram">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Instagram Business API</CardTitle>
                    <p className="text-sm text-gray-600 mt-1">
                      Configure a integração com Instagram
                    </p>
                  </div>
                  {getConnectionStatus(instagramConfig.connected)}
                </div>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleInstagramSave} className="space-y-4">
                  <div>
                    <Label htmlFor="instagram-token">Access Token *</Label>
                    <Input
                      id="instagram-token"
                      type="password"
                      value={instagramConfig.accessToken}
                      onChange={(e) => setInstagramConfig(prev => ({ ...prev, accessToken: e.target.value }))}
                      placeholder="Digite o access token do Instagram"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="instagram-business-id">Business Account ID *</Label>
                    <Input
                      id="instagram-business-id"
                      value={instagramConfig.businessAccountId}
                      onChange={(e) => setInstagramConfig(prev => ({ ...prev, businessAccountId: e.target.value }))}
                      placeholder="ID da conta business do Instagram"
                      required
                    />
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-start gap-2">
                      <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-blue-800">Requisitos</h4>
                        <p className="text-sm text-blue-700 mt-1">
                          • Conta Instagram Business<br/>
                          • Página do Facebook vinculada<br/>
                          • App aprovado pela Meta
                        </p>
                      </div>
                    </div>
                  </div>

                  <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                    <Save className="h-4 w-4 mr-2" />
                    Salvar e Testar Conexão
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}
