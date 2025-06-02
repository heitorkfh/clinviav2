
import React from 'react';
import { MainLayout } from '../../components/layout/main-layout';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Wrench, Clock } from 'lucide-react';

export default function MarketingFerramentas() {
  return (
    <MainLayout>
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Ferramentas de Marketing</h1>
          <p className="text-gray-600">Ferramentas avançadas para suas campanhas</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="border-dashed border-2">
            <CardContent className="flex flex-col items-center justify-center p-8 text-center">
              <Wrench className="h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                Ferramentas em Desenvolvimento
              </h3>
              <p className="text-gray-500 mb-4">
                Estamos trabalhando em novas ferramentas para melhorar suas campanhas de marketing.
              </p>
              <Badge variant="outline" className="bg-yellow-50 text-yellow-700">
                <Clock className="h-3 w-3 mr-1" />
                Em breve
              </Badge>
            </CardContent>
          </Card>

          <Card className="opacity-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span>Automação de Respostas</span>
                <Badge variant="secondary">Em breve</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Configure respostas automáticas para diferentes tipos de mensagens.
              </p>
            </CardContent>
          </Card>

          <Card className="opacity-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span>Segmentação Avançada</span>
                <Badge variant="secondary">Em breve</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Crie segmentos personalizados baseados em comportamento e dados.
              </p>
            </CardContent>
          </Card>

          <Card className="opacity-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span>A/B Testing</span>
                <Badge variant="secondary">Em breve</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Teste diferentes versões de mensagens para otimizar resultados.
              </p>
            </CardContent>
          </Card>

          <Card className="opacity-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span>Analytics Avançado</span>
                <Badge variant="secondary">Em breve</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Relatórios detalhados sobre performance das campanhas.
              </p>
            </CardContent>
          </Card>

          <Card className="opacity-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span>Integração CRM</span>
                <Badge variant="secondary">Em breve</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Sincronização automática com sistemas de CRM externos.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}
