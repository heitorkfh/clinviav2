
import React from 'react';
import { MainLayout } from '../layout/main-layout';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { ArrowLeft, Edit, Phone, Mail, Calendar, MessageSquare } from 'lucide-react';

interface LeadDetailsProps {
  lead: any;
  onClose: () => void;
}

export function LeadDetails({ lead, onClose }: LeadDetailsProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Novo':
        return 'bg-blue-100 text-blue-800';
      case 'Qualificado':
        return 'bg-green-100 text-green-800';
      case 'Em contato':
        return 'bg-yellow-100 text-yellow-800';
      case 'Convertido':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <MainLayout>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={onClose}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{lead.name}</h1>
              <p className="text-gray-600">Detalhes do lead</p>
            </div>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Edit className="h-4 w-4 mr-2" />
            Editar Lead
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Tabs defaultValue="informacoes" className="space-y-4">
              <TabsList>
                <TabsTrigger value="informacoes">Informações</TabsTrigger>
                <TabsTrigger value="historico">Histórico</TabsTrigger>
                <TabsTrigger value="atividades">Atividades</TabsTrigger>
              </TabsList>

              <TabsContent value="informacoes">
                <Card>
                  <CardHeader>
                    <CardTitle>Informações do Lead</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-gray-500">Nome</label>
                        <p className="font-medium">{lead.name}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">Status</label>
                        <div className="mt-1">
                          <Badge className={getStatusColor(lead.status)}>
                            {lead.status}
                          </Badge>
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">Telefone</label>
                        <p className="font-medium flex items-center gap-2">
                          <Phone className="h-4 w-4" />
                          {lead.phone}
                        </p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">Email</label>
                        <p className="font-medium flex items-center gap-2">
                          <Mail className="h-4 w-4" />
                          {lead.email}
                        </p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">Origem</label>
                        <p className="font-medium">{lead.source}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">Interesse</label>
                        <p className="font-medium">{lead.interest}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">Data de Criação</label>
                        <p className="font-medium flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          {lead.createdAt}
                        </p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">Último Contato</label>
                        <p className="font-medium flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          {lead.lastContact}
                        </p>
                      </div>
                    </div>
                    {lead.notes && (
                      <div className="pt-4 border-t">
                        <label className="text-sm font-medium text-gray-500">Observações</label>
                        <p className="mt-1 text-gray-700">{lead.notes}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="historico">
                <Card>
                  <CardHeader>
                    <CardTitle>Histórico de Interações</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3 p-3 border rounded-lg">
                        <MessageSquare className="h-5 w-5 text-blue-600 mt-0.5" />
                        <div>
                          <p className="font-medium">Primeiro contato via WhatsApp</p>
                          <p className="text-sm text-gray-600">Interessado em limpeza dental</p>
                          <p className="text-xs text-gray-500 mt-1">15/01/2024 às 14:30</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="atividades">
                <Card>
                  <CardHeader>
                    <CardTitle>Atividades Programadas</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-500">Nenhuma atividade programada.</p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Ações Rápidas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  <Phone className="h-4 w-4 mr-2" />
                  Ligar
                </Button>
                <Button variant="outline" className="w-full">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  WhatsApp
                </Button>
                <Button variant="outline" className="w-full">
                  <Mail className="h-4 w-4 mr-2" />
                  Enviar Email
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
