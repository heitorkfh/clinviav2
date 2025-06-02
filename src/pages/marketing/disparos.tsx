
import React, { useState } from 'react';
import { MainLayout } from '../../components/layout/main-layout';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Plus, Send, Clock, CheckCircle, XCircle, Eye } from 'lucide-react';
import { CreateDisparoForm } from '../../components/marketing/create-disparo-form';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';

const mockDisparos = [
  {
    id: 1,
    title: 'Campanha de Limpeza Dental',
    message: 'Olá! Que tal agendar sua limpeza dental? Temos horários disponíveis esta semana!',
    recipients: 25,
    sent: 25,
    delivered: 23,
    read: 18,
    status: 'Enviado',
    channel: 'WhatsApp Oficial',
    createdAt: '2024-01-15',
    sentAt: '2024-01-15 10:00'
  },
  {
    id: 2,
    title: 'Promoção Clareamento',
    message: 'Promoção especial: Clareamento dental com 30% de desconto! Válido até o final do mês.',
    recipients: 50,
    sent: 0,
    delivered: 0,
    read: 0,
    status: 'Programado',
    channel: 'WhatsApp Não Oficial',
    createdAt: '2024-01-14',
    scheduledFor: '2024-01-20 09:00'
  }
];

export default function Disparos() {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [selectedTab, setSelectedTab] = useState('todos');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Enviado':
        return 'bg-green-100 text-green-800';
      case 'Programado':
        return 'bg-blue-100 text-blue-800';
      case 'Enviando':
        return 'bg-yellow-100 text-yellow-800';
      case 'Erro':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Enviado':
        return <CheckCircle className="h-4 w-4" />;
      case 'Programado':
        return <Clock className="h-4 w-4" />;
      case 'Enviando':
        return <Send className="h-4 w-4" />;
      case 'Erro':
        return <XCircle className="h-4 w-4" />;
      default:
        return null;
    }
  };

  if (showCreateForm) {
    return <CreateDisparoForm onClose={() => setShowCreateForm(false)} />;
  }

  return (
    <MainLayout>
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Disparos</h1>
            <p className="text-gray-600">Gerencie seus disparos em massa</p>
          </div>
          <Button onClick={() => setShowCreateForm(true)} className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            Novo Disparo
          </Button>
        </div>

        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList>
            <TabsTrigger value="todos">Todos</TabsTrigger>
            <TabsTrigger value="enviados">Enviados</TabsTrigger>
            <TabsTrigger value="programados">Programados</TabsTrigger>
          </TabsList>

          <TabsContent value="todos" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Histórico de Disparos</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Título</TableHead>
                      <TableHead>Canal</TableHead>
                      <TableHead>Destinatários</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Data</TableHead>
                      <TableHead>Métricas</TableHead>
                      <TableHead>Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockDisparos.map((disparo) => (
                      <TableRow key={disparo.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{disparo.title}</p>
                            <p className="text-sm text-gray-500 truncate max-w-xs">
                              {disparo.message}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{disparo.channel}</Badge>
                        </TableCell>
                        <TableCell>{disparo.recipients}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(disparo.status)}>
                            <div className="flex items-center gap-1">
                              {getStatusIcon(disparo.status)}
                              {disparo.status}
                            </div>
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <p>Criado: {disparo.createdAt}</p>
                            {disparo.sentAt && <p>Enviado: {disparo.sentAt}</p>}
                            {disparo.scheduledFor && <p>Programado: {disparo.scheduledFor}</p>}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <p>Enviadas: {disparo.sent}</p>
                            <p>Entregues: {disparo.delivered}</p>
                            <p>Lidas: {disparo.read}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="enviados">
            <Card>
              <CardContent className="pt-6">
                <p className="text-center text-gray-500">
                  Filtro para disparos enviados será implementado aqui.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="programados">
            <Card>
              <CardContent className="pt-6">
                <p className="text-center text-gray-500">
                  Filtro para disparos programados será implementado aqui.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}
