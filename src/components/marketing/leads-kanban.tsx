
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Phone, Mail, Eye, Edit, Calendar } from 'lucide-react';

interface Lead {
  id: number;
  name: string;
  phone: string;
  email: string;
  source: string;
  status: string;
  interest: string;
  createdAt: string;
  lastContact: string;
  notes: string;
}

interface LeadsKanbanProps {
  leads: Lead[];
  onEditLead: (lead: Lead) => void;
  onViewLead: (lead: Lead) => void;
  onStatusChange: (leadId: number, newStatus: string) => void;
}

const statusColumns = [
  { id: 'Novo', title: 'Novos', color: 'bg-blue-100 border-blue-200' },
  { id: 'Qualificado', title: 'Qualificados', color: 'bg-yellow-100 border-yellow-200' },
  { id: 'Em contato', title: 'Em Contato', color: 'bg-orange-100 border-orange-200' },
  { id: 'Convertido', title: 'Convertidos', color: 'bg-green-100 border-green-200' },
  { id: 'Perdido', title: 'Perdidos', color: 'bg-red-100 border-red-200' }
];

export function LeadsKanban({ leads, onEditLead, onViewLead, onStatusChange }: LeadsKanbanProps) {
  const [draggedLead, setDraggedLead] = useState<Lead | null>(null);

  const getLeadsByStatus = (status: string) => {
    return leads.filter(lead => lead.status === status);
  };

  const handleDragStart = (e: React.DragEvent, lead: Lead) => {
    setDraggedLead(lead);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, newStatus: string) => {
    e.preventDefault();
    if (draggedLead && draggedLead.status !== newStatus) {
      onStatusChange(draggedLead.id, newStatus);
    }
    setDraggedLead(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Novo':
        return 'bg-blue-100 text-blue-800';
      case 'Qualificado':
        return 'bg-yellow-100 text-yellow-800';
      case 'Em contato':
        return 'bg-orange-100 text-orange-800';
      case 'Convertido':
        return 'bg-green-100 text-green-800';
      case 'Perdido':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="flex gap-6 overflow-x-auto pb-4">
      {statusColumns.map((column) => {
        const columnLeads = getLeadsByStatus(column.id);
        
        return (
          <div
            key={column.id}
            className={`min-w-80 ${column.color} rounded-lg p-4`}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, column.id)}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-800">{column.title}</h3>
              <Badge variant="secondary" className="bg-white/70">
                {columnLeads.length}
              </Badge>
            </div>
            
            <div className="space-y-3">
              {columnLeads.map((lead) => (
                <Card
                  key={lead.id}
                  className="cursor-move hover:shadow-md transition-shadow bg-white"
                  draggable
                  onDragStart={(e) => handleDragStart(e, lead)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                          <span className="text-orange-600 font-semibold text-sm">
                            {lead.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <h4 className="font-semibold text-sm">{lead.name}</h4>
                          <Badge className={`${getStatusColor(lead.status)} text-xs`}>
                            {lead.status}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2 text-xs text-gray-600 mb-3">
                      <div className="flex items-center gap-1">
                        <Phone className="h-3 w-3" />
                        <span>{lead.phone}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Mail className="h-3 w-3" />
                        <span className="truncate">{lead.email}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span>Criado: {lead.createdAt}</span>
                      </div>
                    </div>

                    <div className="mb-3">
                      <span className="text-xs text-gray-500">
                        {lead.source} • {lead.interest}
                      </span>
                    </div>

                    {lead.notes && (
                      <div className="mb-3">
                        <p className="text-xs text-gray-600 truncate">
                          {lead.notes}
                        </p>
                      </div>
                    )}

                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 text-xs h-7"
                        onClick={() => onViewLead(lead)}
                      >
                        <Eye className="h-3 w-3 mr-1" />
                        Ver
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 text-xs h-7"
                        onClick={() => onEditLead(lead)}
                      >
                        <Edit className="h-3 w-3 mr-1" />
                        Editar
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              {columnLeads.length === 0 && (
                <div className="text-center py-8 text-gray-500 text-sm">
                  Nenhum lead nesta etapa
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
