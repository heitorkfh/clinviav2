
import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { X, Edit2, Check, Plus } from 'lucide-react';

interface PrescriptionItem {
  id: string;
  medication: any;
  instructions: string;
  observations: string;
}

interface PrescriptionListProps {
  medications: any[];
  onRemoveMedication: (index: number) => void;
  onAddMedication: () => void;
}

export function PrescriptionList({ medications, onRemoveMedication, onAddMedication }: PrescriptionListProps) {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [prescriptionItems, setPrescriptionItems] = useState<PrescriptionItem[]>(
    medications.map((med, index) => ({
      id: `${index}`,
      medication: med.medication,
      instructions: med.instructions,
      observations: ''
    }))
  );

  const handleEdit = (index: number) => {
    setEditingIndex(index);
  };

  const handleSave = (index: number) => {
    setEditingIndex(null);
  };

  const handleInstructionsChange = (index: number, value: string) => {
    setPrescriptionItems(prev => 
      prev.map((item, i) => 
        i === index ? { ...item, instructions: value } : item
      )
    );
  };

  const handleObservationsChange = (index: number, value: string) => {
    setPrescriptionItems(prev => 
      prev.map((item, i) => 
        i === index ? { ...item, observations: value } : item
      )
    );
  };

  const handleRemove = (index: number) => {
    setPrescriptionItems(prev => prev.filter((_, i) => i !== index));
    onRemoveMedication(index);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label className="text-sm font-medium">Medicamentos Prescritos:</Label>
        <Button
          variant="outline"
          size="sm"
          onClick={onAddMedication}
        >
          <Plus className="h-4 w-4 mr-2" />
          Adicionar Medicamento
        </Button>
      </div>

      {prescriptionItems.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <p>Nenhum medicamento prescrito</p>
          <p className="text-sm">Clique em "Adicionar Medicamento" para começar</p>
        </div>
      ) : (
        <div className="space-y-3">
          {prescriptionItems.map((item, index) => (
            <div key={item.id} className="bg-gray-50 p-4 rounded-lg border">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h4 className="font-medium text-sm mb-1">
                    {item.medication?.genericName} {item.medication?.dosage}
                  </h4>
                  <p className="text-xs text-gray-600">
                    {item.medication?.brandName} - {item.medication?.form}
                  </p>
                </div>
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => editingIndex === index ? handleSave(index) : handleEdit(index)}
                  >
                    {editingIndex === index ? (
                      <Check className="h-3 w-3" />
                    ) : (
                      <Edit2 className="h-3 w-3" />
                    )}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemove(index)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <div>
                  <Label className="text-xs">Instruções:</Label>
                  {editingIndex === index ? (
                    <Input
                      value={item.instructions}
                      onChange={(e) => handleInstructionsChange(index, e.target.value)}
                      className="text-sm"
                    />
                  ) : (
                    <p className="text-sm bg-white p-2 rounded border min-h-[32px]">
                      {item.instructions}
                    </p>
                  )}
                </div>

                <div>
                  <Label className="text-xs">Observações:</Label>
                  {editingIndex === index ? (
                    <Textarea
                      value={item.observations}
                      onChange={(e) => handleObservationsChange(index, e.target.value)}
                      placeholder="Adicione observações específicas..."
                      rows={2}
                      className="text-sm"
                    />
                  ) : (
                    <p className="text-sm bg-white p-2 rounded border min-h-[60px]">
                      {item.observations || 'Sem observações'}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
