
import React, { useState } from 'react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Edit2, Trash2, Pen } from 'lucide-react';

export interface PrescriptionItem {
  id: string;
  medication: string;
  route: string;
  interval: string;
  duration: string;
  observation: string;
}

interface PrescriptionTableProps {
  items: PrescriptionItem[];
  onUpdateItem: (id: string, field: keyof PrescriptionItem, value: string) => void;
  onRemoveItem: (id: string) => void;
}

const routes = ['Oral', 'Intravenosa', 'Intramuscular', 'Subcutânea', 'Tópica', 'Inalatória'];
const intervals = ['8/8h', '12/12h', '24/24h', '6/6h', 'SOS', '2/2h', '4/4h'];
const durations = ['3 dias', '5 dias', '7 dias', '10 dias', '14 dias', '21 dias', '30 dias', 'Uso contínuo'];

export function PrescriptionTable({ items, onUpdateItem, onRemoveItem }: PrescriptionTableProps) {
  const [editingField, setEditingField] = useState<{ id: string; field: string } | null>(null);
  const [editingObservation, setEditingObservation] = useState<string | null>(null);
  const [tempValue, setTempValue] = useState('');
  const [tempObservation, setTempObservation] = useState('');

  const handleFieldEdit = (id: string, field: string, currentValue: string) => {
    setEditingField({ id, field });
    setTempValue(currentValue);
  };

  const handleFieldSave = () => {
    if (editingField) {
      onUpdateItem(editingField.id, editingField.field as keyof PrescriptionItem, tempValue);
      setEditingField(null);
      setTempValue('');
    }
  };

  const handleObservationEdit = (id: string, currentObservation: string) => {
    setEditingObservation(id);
    setTempObservation(currentObservation);
  };

  const handleObservationSave = (id: string) => {
    onUpdateItem(id, 'observation', tempObservation);
    setEditingObservation(null);
    setTempObservation('');
  };

  if (items.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>Nenhum medicamento prescrito</p>
        <p className="text-sm">Use o campo acima para adicionar medicamentos</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="grid grid-cols-6 gap-4 px-4 py-2 bg-gray-50 rounded-lg font-medium text-sm text-gray-700">
        <div>Medicamento</div>
        <div>Via</div>
        <div>Intervalo</div>
        <div>Duração</div>
        <div>Observação</div>
        <div>Ações</div>
      </div>

      {/* Items */}
      {items.map((item) => (
        <Card key={item.id} className="shadow-sm">
          <CardContent className="p-4">
            <div className="grid grid-cols-6 gap-4 items-center">
              {/* Medicamento */}
              <div className="font-medium text-sm">{item.medication}</div>

              {/* Via */}
              <div className="flex items-center gap-2">
                <Select
                  value={item.route}
                  onValueChange={(value) => onUpdateItem(item.id, 'route', value)}
                >
                  <SelectTrigger className="h-8 text-xs flex-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {routes.map((route) => (
                      <SelectItem key={route} value={route}>
                        {route}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0"
                      onClick={() => handleFieldEdit(item.id, 'route', item.route)}
                    >
                      <Pen className="h-3 w-3" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Editar Via de Administração</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label>Via de Administração</Label>
                        <Input
                          value={editingField?.id === item.id && editingField?.field === 'route' ? tempValue : item.route}
                          onChange={(e) => setTempValue(e.target.value)}
                          placeholder="Digite a via de administração..."
                        />
                      </div>
                      <div className="flex justify-end gap-2">
                        <DialogTrigger asChild>
                          <Button variant="outline">Cancelar</Button>
                        </DialogTrigger>
                        <DialogTrigger asChild>
                          <Button onClick={handleFieldSave}>
                            Salvar
                          </Button>
                        </DialogTrigger>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              {/* Intervalo */}
              <div className="flex items-center gap-2">
                <Select
                  value={item.interval}
                  onValueChange={(value) => onUpdateItem(item.id, 'interval', value)}
                >
                  <SelectTrigger className="h-8 text-xs flex-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {intervals.map((interval) => (
                      <SelectItem key={interval} value={interval}>
                        {interval}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0"
                      onClick={() => handleFieldEdit(item.id, 'interval', item.interval)}
                    >
                      <Pen className="h-3 w-3" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Editar Intervalo</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label>Intervalo de Administração</Label>
                        <Input
                          value={editingField?.id === item.id && editingField?.field === 'interval' ? tempValue : item.interval}
                          onChange={(e) => setTempValue(e.target.value)}
                          placeholder="Digite o intervalo..."
                        />
                      </div>
                      <div className="flex justify-end gap-2">
                        <DialogTrigger asChild>
                          <Button variant="outline">Cancelar</Button>
                        </DialogTrigger>
                        <DialogTrigger asChild>
                          <Button onClick={handleFieldSave}>
                            Salvar
                          </Button>
                        </DialogTrigger>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              {/* Duração */}
              <div className="flex items-center gap-2">
                <Select
                  value={item.duration}
                  onValueChange={(value) => onUpdateItem(item.id, 'duration', value)}
                >
                  <SelectTrigger className="h-8 text-xs flex-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {durations.map((duration) => (
                      <SelectItem key={duration} value={duration}>
                        {duration}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0"
                      onClick={() => handleFieldEdit(item.id, 'duration', item.duration)}
                    >
                      <Pen className="h-3 w-3" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Editar Duração</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label>Duração do Tratamento</Label>
                        <Input
                          value={editingField?.id === item.id && editingField?.field === 'duration' ? tempValue : item.duration}
                          onChange={(e) => setTempValue(e.target.value)}
                          placeholder="Digite a duração..."
                        />
                      </div>
                      <div className="flex justify-end gap-2">
                        <DialogTrigger asChild>
                          <Button variant="outline">Cancelar</Button>
                        </DialogTrigger>
                        <DialogTrigger asChild>
                          <Button onClick={handleFieldSave}>
                            Salvar
                          </Button>
                        </DialogTrigger>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              {/* Observação */}
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleObservationEdit(item.id, item.observation)}
                  >
                    <Edit2 className="h-3 w-3" />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Observações - {item.medication}</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label>Observações</Label>
                      <Textarea
                        value={editingObservation === item.id ? tempObservation : item.observation}
                        onChange={(e) => setTempObservation(e.target.value)}
                        placeholder="Digite observações específicas para este medicamento..."
                        rows={4}
                      />
                    </div>
                    <div className="flex justify-end gap-2">
                      <DialogTrigger asChild>
                        <Button variant="outline">Cancelar</Button>
                      </DialogTrigger>
                      <DialogTrigger asChild>
                        <Button onClick={() => handleObservationSave(item.id)}>
                          Salvar
                        </Button>
                      </DialogTrigger>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>

              {/* Ações */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onRemoveItem(item.id)}
                className="text-red-600 hover:text-red-700"
              >
                <Trash2 className="h-3 w-3" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
