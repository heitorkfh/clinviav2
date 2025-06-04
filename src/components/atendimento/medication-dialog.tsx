
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Checkbox } from '../ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Card, CardContent } from '../ui/card';
import { Search, Plus } from 'lucide-react';

interface MedicationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddMedication: (medication: any) => void;
}

const mockMedications = [
  {
    id: 1,
    genericName: 'Dipirona Sódica',
    brandName: 'Novalgina',
    concentration: '500mg',
    form: 'Comprimido',
    packSize: 20
  },
  {
    id: 2,
    genericName: 'Paracetamol',
    brandName: 'Tylenol',
    concentration: '750mg',
    form: 'Comprimido',
    packSize: 20
  },
  {
    id: 3,
    genericName: 'Ibuprofeno',
    brandName: 'Advil',
    concentration: '600mg',
    form: 'Comprimido',
    packSize: 30
  },
  {
    id: 4,
    genericName: 'Omeprazol',
    brandName: 'Losec',
    concentration: '20mg',
    form: 'Cápsula',
    packSize: 28
  },
  {
    id: 5,
    genericName: 'Amoxicilina',
    brandName: 'Amoxil',
    concentration: '500mg',
    form: 'Cápsula',
    packSize: 21
  }
];

const administrationRoutes = [
  { value: 'oral', label: 'Via Oral (VO)' },
  { value: 'im', label: 'Intramuscular (IM)' },
  { value: 'iv', label: 'Intravenosa (IV)' },
  { value: 'sc', label: 'Subcutânea (SC)' },
  { value: 'sl', label: 'Sublingual (SL)' },
  { value: 'topica', label: 'Tópica' }
];

const frequencies = [
  { value: '4h', label: 'A cada 4 horas' },
  { value: '6h', label: 'A cada 6 horas' },
  { value: '8h', label: 'A cada 8 horas' },
  { value: '12h', label: 'A cada 12 horas' },
  { value: '24h', label: 'A cada 24 horas (1x ao dia)' },
  { value: 'bid', label: '2x ao dia (BID)' },
  { value: 'tid', label: '3x ao dia (TID)' },
  { value: 'qid', label: '4x ao dia (QID)' },
  { value: 'sos', label: 'Se necessário (S.O.S)' }
];

export function MedicationDialog({ open, onOpenChange, onAddMedication }: MedicationDialogProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [showBrandOnly, setShowBrandOnly] = useState(false);
  const [selectedMedication, setSelectedMedication] = useState<any>(null);
  const [dosage, setDosage] = useState('');
  const [route, setRoute] = useState('');
  const [frequency, setFrequency] = useState('');
  const [duration, setDuration] = useState('');
  const [quantity, setQuantity] = useState('');

  const filteredMedications = mockMedications.filter(med =>
    med.genericName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    med.brandName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectMedication = (medication: any) => {
    setSelectedMedication(medication);
    setDosage(medication.concentration);
  };

  const calculateTotal = () => {
    if (!selectedMedication || !quantity || !frequency) return '';
    
    const days = parseInt(duration) || 0;
    const dailyDoses = frequency.includes('h') ? 
      24 / parseInt(frequency.replace('h', '')) : 
      parseInt(frequency.replace(/\D/g, '')) || 1;
    
    const totalPills = days * dailyDoses;
    const boxes = Math.ceil(totalPills / selectedMedication.packSize);
    
    return `${totalPills} ${selectedMedication.form.toLowerCase()}(s) - ${boxes} caixa(s)`;
  };

  const handleAddMedication = () => {
    if (!selectedMedication || !route || !frequency) return;

    const medication = {
      genericName: selectedMedication.genericName,
      brandName: selectedMedication.brandName,
      dosage: dosage,
      route: administrationRoutes.find(r => r.value === route)?.label,
      frequency: frequencies.find(f => f.value === frequency)?.label,
      duration: duration ? `${duration} dias` : '',
      total: calculateTotal()
    };

    onAddMedication(medication);
    
    // Reset form
    setSelectedMedication(null);
    setSearchTerm('');
    setDosage('');
    setRoute('');
    setFrequency('');
    setDuration('');
    setQuantity('');
  };

  const handleClose = () => {
    onOpenChange(false);
    // Reset form when closing
    setSelectedMedication(null);
    setSearchTerm('');
    setDosage('');
    setRoute('');
    setFrequency('');
    setDuration('');
    setQuantity('');
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>Adicionar Medicamento à Prescrição</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {/* Search Section */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Buscar Medicamento</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Digite o nome do fármaco ou marca do medicamento..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox 
                id="brandOnly" 
                checked={showBrandOnly}
                onCheckedChange={setShowBrandOnly}
              />
              <Label htmlFor="brandOnly">Exibir apenas nome do medicamento (marca)</Label>
            </div>

            {/* Medication Results */}
            {searchTerm && (
              <div className="max-h-48 overflow-y-auto border rounded-lg">
                {filteredMedications.map((medication) => (
                  <div
                    key={medication.id}
                    className={`p-3 border-b last:border-b-0 cursor-pointer hover:bg-gray-50 ${
                      selectedMedication?.id === medication.id ? 'bg-blue-50 border-blue-200' : ''
                    }`}
                    onClick={() => handleSelectMedication(medication)}
                  >
                    <div className="font-medium">
                      {showBrandOnly ? medication.brandName : `${medication.brandName} (${medication.genericName})`}
                    </div>
                    <div className="text-sm text-gray-600">
                      {medication.concentration} - {medication.form} - {medication.packSize} unidades por caixa
                    </div>
                  </div>
                ))}
                {filteredMedications.length === 0 && (
                  <div className="p-3 text-center text-gray-500">
                    Nenhum medicamento encontrado
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Selected Medication Details */}
          {selectedMedication && (
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-4">Medicamento Selecionado</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Medicamento</Label>
                    <p className="text-sm font-medium">
                      {showBrandOnly ? selectedMedication.brandName : `${selectedMedication.brandName} (${selectedMedication.genericName})`}
                    </p>
                  </div>
                  <div>
                    <Label htmlFor="dosage">Dosagem</Label>
                    <Input
                      id="dosage"
                      value={dosage}
                      onChange={(e) => setDosage(e.target.value)}
                      placeholder="Ex: 500mg"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Prescription Details */}
          {selectedMedication && (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Via de Administração</Label>
                <Select value={route} onValueChange={setRoute}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a via" />
                  </SelectTrigger>
                  <SelectContent>
                    {administrationRoutes.map((route) => (
                      <SelectItem key={route.value} value={route.value}>
                        {route.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Posologia (Intervalo)</Label>
                <Select value={frequency} onValueChange={setFrequency}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a frequência" />
                  </SelectTrigger>
                  <SelectContent>
                    {frequencies.map((freq) => (
                      <SelectItem key={freq.value} value={freq.value}>
                        {freq.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="duration">Duração do Tratamento (dias)</Label>
                <Input
                  id="duration"
                  type="number"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  placeholder="Ex: 7"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="quantity">Quantidade por Dose</Label>
                <Input
                  id="quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  placeholder="Ex: 1 comprimido"
                />
              </div>
            </div>
          )}

          {/* Calculation Result */}
          {selectedMedication && frequency && duration && (
            <Card className="bg-green-50 border-green-200">
              <CardContent className="p-4">
                <h4 className="font-medium text-green-800 mb-2">Cálculo de Dispensação</h4>
                <p className="text-green-700">{calculateTotal()}</p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button variant="outline" onClick={handleClose}>
            Cancelar
          </Button>
          <Button 
            onClick={handleAddMedication}
            disabled={!selectedMedication || !route || !frequency}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Adicionar à Prescrição
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
