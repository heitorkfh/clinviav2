
import React, { useState } from 'react';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '../ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Button } from '../ui/button';
import { Check, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';

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
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value
            ? mockMedications.find((medication) => medication.id === value)?.name
            : "Selecione um medicamento..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Buscar medicamento..." />
          <CommandEmpty>Nenhum medicamento encontrado.</CommandEmpty>
          <CommandList>
            <CommandGroup>
              {mockMedications.map((medication) => (
                <CommandItem
                  key={medication.id}
                  value={medication.id}
                  onSelect={(currentValue) => {
                    const selectedMedication = mockMedications.find(med => med.id === currentValue);
                    if (selectedMedication) {
                      onSelect(selectedMedication);
                      setValue(currentValue === value ? "" : currentValue);
                      setOpen(false);
                    }
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === medication.id ? "opacity-100" : "opacity-0"
                    )}
                  />
                  <div>
                    <div className="font-medium">{medication.name}</div>
                    <div className="text-sm text-gray-500">{medication.activeIngredient}</div>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
