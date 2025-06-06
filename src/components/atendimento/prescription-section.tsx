
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import { Pill } from 'lucide-react';
import { MedicationCommand } from './medication-command';
import { PrescriptionTable, PrescriptionItem } from './prescription-table';

interface Medication {
  id: string;
  name: string;
  activeIngredient: string;
  dosage: string;
  form: string;
}

export function PrescriptionSection() {
  const [prescriptionItems, setPrescriptionItems] = useState<PrescriptionItem[]>([]);
  const [additionalPrescription, setAdditionalPrescription] = useState('');

  const handleMedicationSelect = (medication: Medication) => {
    const newItem: PrescriptionItem = {
      id: Date.now().toString(),
      medication: medication.name,
      route: 'Oral',
      interval: '8/8h',
      duration: '7 dias',
      observation: ''
    };
    setPrescriptionItems(prev => [...prev, newItem]);
  };

  const handleUpdateItem = (id: string, field: keyof PrescriptionItem, value: string) => {
    setPrescriptionItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  const handleRemoveItem = (id: string) => {
    setPrescriptionItems(prev => prev.filter(item => item.id !== id));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Pill className="h-5 w-5" />
          Prescrição Médica
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Medication Command */}
        <div>
          <Label className="text-sm font-medium mb-2 block">Adicionar Medicamento:</Label>
          <MedicationCommand onSelect={handleMedicationSelect} />
        </div>

        {/* Prescription Table */}
        <div>
          <Label className="text-sm font-medium mb-3 block">Medicamentos Prescritos:</Label>
          <PrescriptionTable
            items={prescriptionItems}
            onUpdateItem={handleUpdateItem}
            onRemoveItem={handleRemoveItem}
          />
        </div>

        {/* Additional Prescription */}
        <div>
          <Label>Prescrição Adicional</Label>
          <Textarea
            placeholder="Digite prescrições adicionais..."
            value={additionalPrescription}
            onChange={(e) => setAdditionalPrescription(e.target.value)}
            rows={4}
          />
        </div>

        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            Modelo de Receita
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
