
import React, { useState } from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Check } from 'lucide-react';

interface Medication {
  id: string;
  name: string;
  activeIngredient: string;
  dosage: string;
  form: string;
}

const mockMedications: Medication[] = [
  { id: '1', name: 'Paracetamol 500mg', activeIngredient: 'Paracetamol', dosage: '500mg', form: 'Comprimido' },
  { id: '2', name: 'Ibuprofeno 600mg', activeIngredient: 'Ibuprofeno', dosage: '600mg', form: 'Comprimido' },
  { id: '3', name: 'Dipirona 500mg', activeIngredient: 'Dipirona', dosage: '500mg', form: 'Comprimido' },
  { id: '4', name: 'Amoxicilina 500mg', activeIngredient: 'Amoxicilina', dosage: '500mg', form: 'Cápsula' },
  { id: '5', name: 'Losartana 50mg', activeIngredient: 'Losartana', dosage: '50mg', form: 'Comprimido' },
  { id: '6', name: 'Metformina 850mg', activeIngredient: 'Metformina', dosage: '850mg', form: 'Comprimido' },
  { id: '7', name: 'Omeprazol 20mg', activeIngredient: 'Omeprazol', dosage: '20mg', form: 'Cápsula' },
  { id: '8', name: 'Sinvastatina 20mg', activeIngredient: 'Sinvastatina', dosage: '20mg', form: 'Comprimido' },
];

interface MedicationCommandProps {
  onSelect: (medication: Medication) => void;
}

export function MedicationCommand({ onSelect }: MedicationCommandProps) {
  const [searchValue, setSearchValue] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  const filteredMedications = mockMedications.filter(medication =>
    medication.name.toLowerCase().includes(searchValue.toLowerCase()) ||
    medication.activeIngredient.toLowerCase().includes(searchValue.toLowerCase())
  );

  const handleSelect = (medication: Medication) => {
    onSelect(medication);
    setSearchValue('');
    setShowSuggestions(false);
  };

  const handleInputFocus = () => {
    if (searchValue.length > 0) {
      setShowSuggestions(true);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    setShowSuggestions(value.length > 0);
  };

  return (
    <div className="relative">
      <Input
        placeholder="Digite o nome do medicamento..."
        value={searchValue}
        onChange={handleInputChange}
        onFocus={handleInputFocus}
        onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
      />
      
      {showSuggestions && filteredMedications.length > 0 && (
        <Card className="absolute top-full left-0 right-0 z-50 mt-1 max-h-60 overflow-y-auto">
          <CardContent className="p-2">
            {filteredMedications.map((medication) => (
              <Button
                key={medication.id}
                variant="ghost"
                className="w-full justify-start p-2 h-auto"
                onClick={() => handleSelect(medication)}
              >
                <div className="text-left">
                  <div className="font-medium">{medication.name}</div>
                  <div className="text-sm text-gray-500">{medication.activeIngredient}</div>
                </div>
              </Button>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
