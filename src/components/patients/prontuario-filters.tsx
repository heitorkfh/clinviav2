
import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Calendar } from '../ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { CalendarIcon, Filter, X } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface ProntuarioFiltersProps {
  onFiltersChange: (filters: any) => void;
}

export function ProntuarioFilters({ onFiltersChange }: ProntuarioFiltersProps) {
  const [filters, setFilters] = useState({
    dateFrom: undefined as Date | undefined,
    dateTo: undefined as Date | undefined,
    type: '',
    diagnosis: '',
    doctor: '',
    search: ''
  });

  const [isOpen, setIsOpen] = useState(false);

  const handleFilterChange = (key: string, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const clearFilters = () => {
    const emptyFilters = {
      dateFrom: undefined,
      dateTo: undefined,
      type: '',
      diagnosis: '',
      doctor: '',
      search: ''
    };
    setFilters(emptyFilters);
    onFiltersChange(emptyFilters);
    setIsOpen(false);
  };

  const hasActiveFilters = filters.dateFrom || filters.dateTo || filters.type || filters.diagnosis || filters.doctor || filters.search;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Input
            placeholder="Buscar no histórico médico..."
            value={filters.search}
            onChange={(e) => handleFilterChange('search', e.target.value)}
          />
        </div>
        <Button
          variant="outline"
          onClick={() => setIsOpen(!isOpen)}
          className={cn(hasActiveFilters && "border-blue-500 text-blue-600")}
        >
          <Filter className="h-4 w-4 mr-2" />
          Filtros {hasActiveFilters && `(${Object.values(filters).filter(Boolean).length})`}
        </Button>
        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={clearFilters}>
            <X className="h-4 w-4 mr-2" />
            Limpar
          </Button>
        )}
      </div>

      {isOpen && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Filtros Avançados</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <Label>Data inicial</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !filters.dateFrom && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {filters.dateFrom ? format(filters.dateFrom, "dd/MM/yyyy") : "Selecionar"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={filters.dateFrom}
                      onSelect={(date) => handleFilterChange('dateFrom', date)}
                      initialFocus
                      className="p-3 pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div>
                <Label>Data final</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !filters.dateTo && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {filters.dateTo ? format(filters.dateTo, "dd/MM/yyyy") : "Selecionar"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={filters.dateTo}
                      onSelect={(date) => handleFilterChange('dateTo', date)}
                      initialFocus
                      className="p-3 pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div>
                <Label>Tipo de registro</Label>
                <Select value={filters.type} onValueChange={(value) => handleFilterChange('type', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Todos os tipos" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Todos os tipos</SelectItem>
                    <SelectItem value="consulta">Consulta</SelectItem>
                    <SelectItem value="prescription">Prescrição</SelectItem>
                    <SelectItem value="exam">Exame</SelectItem>
                    <SelectItem value="photos">Fotos</SelectItem>
                    <SelectItem value="videos">Vídeos</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Profissional</Label>
                <Select value={filters.doctor} onValueChange={(value) => handleFilterChange('doctor', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Todos os profissionais" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Todos os profissionais</SelectItem>
                    <SelectItem value="DR. EDUARDO">Dr. Eduardo</SelectItem>
                    <SelectItem value="DR. LUIS">Dr. Luís</SelectItem>
                    <SelectItem value="DR. JOEL">Dr. Joel</SelectItem>
                    <SelectItem value="DRA. CARLA">Dra. Carla</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Diagnóstico/Condição</Label>
                <Input
                  placeholder="Ex: cárie, gengivite..."
                  value={filters.diagnosis}
                  onChange={(e) => handleFilterChange('diagnosis', e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
