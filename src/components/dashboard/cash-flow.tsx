
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { TrendingUp, TrendingDown, DollarSign } from 'lucide-react';

const cashFlowData = [
  { status: 'Agendado', amount: 'R$ 1.650,00', color: 'bg-blue-100 text-blue-800', trend: 'up' },
  { status: 'Recebido', amount: '+R$ 1.250,00', color: 'bg-green-100 text-green-800', trend: 'up' },
  { status: 'Pendente', amount: '-R$ 650,00', color: 'bg-yellow-100 text-yellow-800', trend: 'down' },
  { status: 'Desconto', amount: '-R$ 250,00', color: 'bg-orange-100 text-orange-800', trend: 'down' }
];

export function CashFlow() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <DollarSign className="h-5 w-5" />
          Fluxo de Caixa
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {cashFlowData.map((item) => (
          <div key={item.status} className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50">
            <div className="flex items-center gap-3">
              <Badge className={item.color}>
                {item.status}
              </Badge>
              {item.trend === 'up' ? (
                <TrendingUp className="h-4 w-4 text-green-500" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-500" />
              )}
            </div>
            <span className="font-medium">{item.amount}</span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
