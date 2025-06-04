
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Badge } from '../ui/badge';
import { Plus, X, Edit, Save } from 'lucide-react';

interface PatientMedicalInfoProps {
  patient?: any;
}

export function PatientMedicalInfo({ patient }: PatientMedicalInfoProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [allergies, setAllergies] = useState(['Dipirona', 'Penicilina']);
  const [medications, setMedications] = useState(['Insulina', 'Metformina']);
  const [conditions, setConditions] = useState(['Diabetes', 'Hipertensão']);
  const [newAllergy, setNewAllergy] = useState('');
  const [newMedication, setNewMedication] = useState('');
  const [newCondition, setNewCondition] = useState('');
  const [medicalHistory, setMedicalHistory] = useState(
    'Paciente diabético tipo 2, diagnosticado há 5 anos. Faz uso regular de insulina e mantém dieta controlada.'
  );

  const addItem = (item: string, setter: React.Dispatch<React.SetStateAction<string[]>>, value: string, resetValue: React.Dispatch<React.SetStateAction<string>>) => {
    if (value.trim()) {
      setter(prev => [...prev, value.trim()]);
      resetValue('');
    }
  };

  const removeItem = (index: number, setter: React.Dispatch<React.SetStateAction<string[]>>) => {
    setter(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold">Informações Médicas</h3>
        {!isEditing ? (
          <Button onClick={() => setIsEditing(true)} variant="outline">
            <Edit className="h-4 w-4 mr-2" />
            Editar
          </Button>
        ) : (
          <Button onClick={() => setIsEditing(false)} className="bg-green-600 hover:bg-green-700">
            <Save className="h-4 w-4 mr-2" />
            Salvar
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Alergias */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Alergias</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex flex-wrap gap-2">
              {allergies.map((allergy, index) => (
                <Badge key={index} variant="destructive" className="flex items-center gap-1">
                  {allergy}
                  {isEditing && (
                    <X 
                      className="h-3 w-3 cursor-pointer" 
                      onClick={() => removeItem(index, setAllergies)}
                    />
                  )}
                </Badge>
              ))}
            </div>
            {isEditing && (
              <div className="flex gap-2">
                <Input
                  placeholder="Nova alergia"
                  value={newAllergy}
                  onChange={(e) => setNewAllergy(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addItem('allergy', setAllergies, newAllergy, setNewAllergy)}
                />
                <Button 
                  size="sm" 
                  onClick={() => addItem('allergy', setAllergies, newAllergy, setNewAllergy)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Medicamentos */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Medicamentos em Uso</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex flex-wrap gap-2">
              {medications.map((medication, index) => (
                <Badge key={index} variant="secondary" className="flex items-center gap-1">
                  {medication}
                  {isEditing && (
                    <X 
                      className="h-3 w-3 cursor-pointer" 
                      onClick={() => removeItem(index, setMedications)}
                    />
                  )}
                </Badge>
              ))}
            </div>
            {isEditing && (
              <div className="flex gap-2">
                <Input
                  placeholder="Novo medicamento"
                  value={newMedication}
                  onChange={(e) => setNewMedication(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addItem('medication', setMedications, newMedication, setNewMedication)}
                />
                <Button 
                  size="sm" 
                  onClick={() => addItem('medication', setMedications, newMedication, setNewMedication)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Condições Médicas */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Condições Médicas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex flex-wrap gap-2">
              {conditions.map((condition, index) => (
                <Badge key={index} variant="outline" className="flex items-center gap-1">
                  {condition}
                  {isEditing && (
                    <X 
                      className="h-3 w-3 cursor-pointer" 
                      onClick={() => removeItem(index, setConditions)}
                    />
                  )}
                </Badge>
              ))}
            </div>
            {isEditing && (
              <div className="flex gap-2">
                <Input
                  placeholder="Nova condição"
                  value={newCondition}
                  onChange={(e) => setNewCondition(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addItem('condition', setConditions, newCondition, setNewCondition)}
                />
                <Button 
                  size="sm" 
                  onClick={() => addItem('condition', setConditions, newCondition, setNewCondition)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Histórico Médico */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg">Histórico Médico</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              value={medicalHistory}
              onChange={(e) => setMedicalHistory(e.target.value)}
              disabled={!isEditing}
              placeholder="Descreva o histórico médico do paciente..."
              className="min-h-[120px]"
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
