
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Calendar, Gift } from 'lucide-react';

const birthdays = [
  { date: '02/07', name: 'Juliana Ferreira', status: 'active' },
  { date: '06/07', name: 'Camila Mendes', status: 'active' },
  { date: '10/07', name: 'Marcia Batista', status: 'active' }
];

export function WeekBirthdays() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Gift className="h-5 w-5" />
          Aniversariantes da Semana
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {birthdays.map((birthday) => (
          <div key={birthday.name} className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50">
            <div className="flex items-center gap-3">
              <Calendar className="h-4 w-4 text-gray-400" />
              <span className="text-sm">{birthday.date}</span>
              <span className="font-medium">{birthday.name}</span>
            </div>
            <Badge className="bg-green-100 text-green-800">
              Ativo
            </Badge>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
