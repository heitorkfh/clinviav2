
import React, { useState } from 'react';
import { MainLayout } from '../components/layout/main-layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Button } from '../components/ui/button';
import { Plus, Search, Filter } from 'lucide-react';
import { Input } from '../components/ui/input';
import { AgendaList } from '../components/agenda/agenda-list';
import { AgendaSemanal } from '../components/agenda/agenda-semanal';
import { AgendaKanban } from '../components/agenda/agenda-kanban';
import { Dialog, DialogContent, DialogTrigger } from '../components/ui/dialog';
import { NovoAgendamento } from '../components/agenda/novo-agendamento';

export default function Agenda() {
  const [isNewAppointmentOpen, setIsNewAppointmentOpen] = useState(false);

  return (
    <MainLayout>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Agendamentos</h1>
            <p className="text-gray-600">Gerencie e organize as consultas de forma inteligente.</p>
          </div>
          
          <Dialog open={isNewAppointmentOpen} onOpenChange={setIsNewAppointmentOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-clinvia hover:opacity-90 text-white">
                <Plus className="h-4 w-4 mr-2" />
                Novo Agendamento
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <NovoAgendamento onClose={() => setIsNewAppointmentOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Buscar paciente, profissional..."
              className="pl-10"
            />
          </div>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filtros
          </Button>
        </div>

        <Tabs defaultValue="lista" className="w-full">
          <TabsList className="grid w-full grid-cols-3 lg:w-fit">
            <TabsTrigger value="lista">Lista</TabsTrigger>
            <TabsTrigger value="semanal">Semanal</TabsTrigger>
            <TabsTrigger value="kanban">Kanban</TabsTrigger>
          </TabsList>
          
          <TabsContent value="lista" className="mt-6">
            <AgendaList />
          </TabsContent>
          
          <TabsContent value="semanal" className="mt-6">
            <AgendaSemanal />
          </TabsContent>
          
          <TabsContent value="kanban" className="mt-6">
            <AgendaKanban />
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}
