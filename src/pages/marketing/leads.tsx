import React, { useState } from 'react';
import { MainLayout } from '../../components/layout/main-layout';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Search, Plus, Eye, Edit, Phone, Mail, Calendar, LayoutGrid, List } from 'lucide-react';
import { LeadForm } from '../../components/marketing/lead-form';
import { LeadDetails } from '../../components/marketing/lead-details';
import { LeadsKanban } from '../../components/marketing/leads-kanban';

const mockLeads = [
  {
    id: 1,
    name: 'Ana Silva',
    phone: '(11) 99999-1234',
    email: 'ana.silva@email.com',
    source: 'Instagram',
    status: 'Novo',
    interest: 'Limpeza',
    createdAt: '2024-01-15',
    lastContact: '2024-01-15',
    notes: 'Interessada em limpeza dental'
  },
  {
    id: 2,
    name: 'Carlos Santos',
    phone: '(11) 98888-5678',
    email: 'carlos.santos@email.com',
    source: 'Google Ads',
    status: 'Qualificado',
    interest: 'Implante',
    createdAt: '2024-01-10',
    lastContact: '2024-01-14',
    notes: 'Quer fazer orçamento para implante'
  }
];

export default function Leads() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);
  const [editingLead, setEditingLead] = useState(null);
  const [leads, setLeads] = useState(mockLeads);
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'kanban'

  const filteredLeads = leads.filter(lead =>
    lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.phone.includes(searchTerm) ||
    lead.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleNewLead = () => {
    setEditingLead(null);
    setShowForm(true);
    setSelectedLead(null);
  };

  const handleEditLead = (lead) => {
    setEditingLead(lead);
    setShowForm(true);
    setSelectedLead(null);
  };

  const handleViewLead = (lead) => {
    setSelectedLead(lead);
    setShowForm(false);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingLead(null);
  };

  const handleCloseDetails = () => {
    setSelectedLead(null);
  };

  const handleStatusChange = (leadId: number, newStatus: string) => {
    setLeads(prevLeads =>
      prevLeads.map(lead =>
        lead.id === leadId ? { ...lead, status: newStatus } : lead
      )
    );
  };

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

  if (selectedLead) {
    return <LeadDetails lead={selectedLead} onClose={handleCloseDetails} />;
  }

  if (showForm) {
    return <LeadForm lead={editingLead} onClose={handleCloseForm} />;
  }

  return (
    <MainLayout>
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Leads</h1>
            <p className="text-gray-600">Gerencie seus leads e oportunidades</p>
          </div>
          <Button onClick={handleNewLead} className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            Novo Lead
          </Button>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Buscar leads por nome, telefone ou email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                >
                  <List className="h-4 w-4 mr-2" />
                  Lista
                </Button>
                <Button
                  variant={viewMode === 'kanban' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('kanban')}
                >
                  <LayoutGrid className="h-4 w-4 mr-2" />
                  Kanban
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {viewMode === 'list' ? (
              <div className="space-y-4">
                {filteredLeads.map((lead) => (
                  <div key={lead.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                          <span className="text-orange-600 font-semibold text-lg">
                            {lead.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">{lead.name}</h3>
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <span className="flex items-center gap-1">
                              <Phone className="h-3 w-3" />
                              {lead.phone}
                            </span>
                            <span className="flex items-center gap-1">
                              <Mail className="h-3 w-3" />
                              {lead.email}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-sm text-gray-500">
                              {lead.source} • {lead.interest}
                            </span>
                            <Badge className={getStatusColor(lead.status)}>
                              {lead.status}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="text-right text-sm">
                          <div className="font-semibold">Criado: {lead.createdAt}</div>
                          <div className="text-gray-600 flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            Último contato: {lead.lastContact}
                          </div>
                        </div>
                        <div className="flex gap-2 ml-4">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleViewLead(lead)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEditLead(lead)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <LeadsKanban
                leads={filteredLeads}
                onEditLead={handleEditLead}
                onViewLead={handleViewLead}
                onStatusChange={handleStatusChange}
              />
            )}
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
