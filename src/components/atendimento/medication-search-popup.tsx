
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Checkbox } from '../ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Badge } from '../ui/badge';
import { Search, Plus } from 'lucide-react';

interface MedicationSearchPopupProps {
  open: boolean;
  onClose: () => void;
  onAddMedication: (medication: any) => void;
}

const mockMedications = [
  {
    id: 1,
    genericName: 'Losartana Potássica',
    brandName: 'Cozaar',
    dosage: '50mg',
    form: 'Comprimido',
    boxQuantity: 30
  },
  {
    id: 2,
    genericName: 'Metformina',
    brandName: 'Glifage',
    dosage: '500mg',
    form: 'Comprimido',
    boxQuantity: 60
  },
  {
    id: 3,
    genericName: 'Ácido Acetilsalicílico',
    brandName: 'AAS',
    dosage: '100mg',
    form: 'Comprimido',
    boxQuantity: 30
  },
  {
    id: 4,
    genericName: 'Dipirona Sódica',
    brandName: 'Novalgina',
    dosage: '500mg/ml',
    form: 'Solução Oral',
    boxQuantity: 20
  }
];

export function MedicationSearchPopup({ open, onClose, onAddMedication }: MedicationSearchPopupProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [showOnlyBrandName, setShowOnlyBrandName] = useState(false);
  const [selectedMedication, setSelectedMedication] = useState<any>(null);
  const [administrationRoute, setAdministrationRoute] = useState('');
  const [dosageInterval, setDosageInterval] = useState('');
  const [totalQuantity, setTotalQuantity] = useState('');
  const [treatmentDuration, setTreatmentDuration] = useState('');

  const filteredMedications = mockMedications.filter(med =>
    med.genericName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    med.brandName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleMedicationSelect = (medication: any) => {
    setSelectedMedication(medication);
  };

  const handleAddMedication = () => {
    if (selectedMedication && administrationRoute && dosageInterval) {
      const prescription = {
        medication: selectedMedication,
        administrationRoute,
        dosageInterval,
        totalQuantity,
        treatmentDuration,
        instructions: `${selectedMedication.genericName} ${selectedMedication.dosage} - Via ${administrationRoute} - ${dosageInterval} - ${treatmentDuration}`
      };
      onAddMedication(prescription);
      onClose();
      // Reset form
      setSelectedMedication(null);
      setAdministrationRoute('');
      setDosageInterval('');
      setTotalQuantity('');
      setTreatmentDuration('');
      setSearchTerm('');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Adicionar Medicamento à Prescrição</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Busca de Medicamento */}
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Buscar por nome do fármaco ou marca..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox
                id="brandOnly"
                checked={showOnlyBrandName}
                onCheckedChange={setShowOnlyBrandName}
              />
              <Label htmlFor="brandOnly">Exibir apenas nome do medicamento (marca)</Label>
            </div>

            {/* Lista de Medicamentos */}
            <div className="border rounded-lg max-h-40 overflow-y-auto">
              {filteredMedications.map((medication) => (
                <div
                  key={medication.id}
                  className={`p-3 border-b cursor-pointer hover:bg-gray-50 ${
                    selectedMedication?.id === medication.id ? 'bg-blue-50 border-blue-200' : ''
                  }`}
                  onClick={() => handleMedicationSelect(medication)}
                >
                  <div className="font-medium">
                    {showOnlyBrandName ? medication.brandName : medication.genericName}
                  </div>
                  <div className="text-sm text-gray-600">
                    {showOnlyBrandName ? 
                      `${medication.genericName} - ${medication.dosage}` : 
                      `${medication.brandName} - ${medication.dosage}`
                    }
                  </div>
                  <div className="text-xs text-gray-500">
                    {medication.form} - {medication.boxQuantity} unidades
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Configurações da Prescrição */}
          {selectedMedication && (
            <div className="space-y-4 border-t pt-4">
              <h3 className="font-semibold">Configurações da Prescrição</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Via de Administração</Label>
                  <Select value={administrationRoute} onValueChange={setAdministrationRoute}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecionar via" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="oral">Via Oral (VO)</SelectItem>
                      <SelectItem value="intramuscular">Intramuscular (IM)</SelectItem>
                      <SelectItem value="intravenosa">Intravenosa (IV)</SelectItem>
                      <SelectItem value="subcutanea">Subcutânea (SC)</SelectItem>
                      <SelectItem value="topica">Tópica</SelectItem>
                      <SelectItem value="sublingual">Sublingual (SL)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Intervalo Posológico</Label>
                  <Select value={dosageInterval} onValueChange={setDosageInterval}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecionar intervalo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="6h">A cada 6 horas (QID)</SelectItem>
                      <SelectItem value="8h">A cada 8 horas (TID)</SelectItem>
                      <SelectItem value="12h">A cada 12 horas (BID)</SelectItem>
                      <SelectItem value="24h">A cada 24 horas (QD)</SelectItem>
                      <SelectItem value="48h">A cada 48 horas</SelectItem>
                      <SelectItem value="sn">Se necessário (SN)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Duração do Tratamento</Label>
                  <Select value={treatmentDuration} onValueChange={setTreatmentDuration}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecionar duração" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="3 dias">3 dias</SelectItem>
                      <SelectItem value="5 dias">5 dias</SelectItem>
                      <SelectItem value="7 dias">7 dias</SelectItem>
                      <SelectItem value="10 dias">10 dias</SelectItem>
                      <SelectItem value="14 dias">14 dias</SelectItem>
                      <SelectItem value="21 dias">21 dias</SelectItem>
                      <SelectItem value="30 dias">30 dias</SelectItem>
                      <SelectItem value="uso_continuo">Uso contínuo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Quantidade Total</Label>
                  <Input
                    placeholder="Ex: 30 comprimidos"
                    value={totalQuantity}
                    onChange={(e) => setTotalQuantity(e.target.value)}
                  />
                </div>
              </div>

              {/* Preview da Prescrição */}
              <div className="bg-gray-50 p-3 rounded border">
                <Label className="text-sm font-medium">Preview da Prescrição:</Label>
                <p className="text-sm mt-1">
                  {selectedMedication.genericName} {selectedMedication.dosage}
                  {administrationRoute && ` - ${administrationRoute.toUpperCase()}`}
                  {dosageInterval && ` - ${dosageInterval}`}
                  {treatmentDuration && ` - ${treatmentDuration}`}
                  {totalQuantity && ` - Total: ${totalQuantity}`}
                </p>
              </div>
            </div>
          )}

          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button 
              onClick={handleAddMedication}
              disabled={!selectedMedication || !administrationRoute || !dosageInterval}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              Adicionar à Prescrição
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
