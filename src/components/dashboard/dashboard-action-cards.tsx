
import React from 'react';
import { Card, CardContent } from '../ui/card';
import { Calendar, Stethoscope, UserPlus, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const actionCards = [
  {
    title: 'Ouvir agenda do dia',
    icon: Calendar,
    color: 'bg-blue-50 border-blue-200 hover:bg-blue-100',
    iconColor: 'text-blue-600',
    action: () => console.log('Ouvir agenda')
  },
  {
    title: 'Atender',
    icon: Stethoscope,
    color: 'bg-green-50 border-green-200 hover:bg-green-100',
    iconColor: 'text-green-600',
    action: () => console.log('Atender')
  },
  {
    title: 'Adicionar paciente',
    icon: UserPlus,
    color: 'bg-purple-50 border-purple-200 hover:bg-purple-100',
    iconColor: 'text-purple-600',
    action: () => console.log('Adicionar paciente')
  },
  {
    title: 'Novo agendamento',
    icon: Plus,
    color: 'bg-orange-50 border-orange-200 hover:bg-orange-100',
    iconColor: 'text-orange-600',
    route: '/agenda'
  }
];

export function DashboardActionCards() {
  const navigate = useNavigate();

  const handleCardClick = (card: typeof actionCards[0]) => {
    if (card.route) {
      navigate(card.route);
    } else if (card.action) {
      card.action();
    }
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {actionCards.map((card) => (
        <Card 
          key={card.title}
          className={`${card.color} cursor-pointer transition-colors`}
          onClick={() => handleCardClick(card)}
        >
          <CardContent className="p-6 text-center">
            <card.icon className={`h-8 w-8 mx-auto mb-3 ${card.iconColor}`} />
            <p className="text-sm font-medium text-gray-900">{card.title}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
