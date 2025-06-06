
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Checkbox } from '../ui/checkbox';
import { Activity } from 'lucide-react';

export function VitalSigns() {
  const [notMeasured, setNotMeasured] = useState(true);
  const [vitalSigns, setVitalSigns] = useState({
    systolicBP: '',
    diastolicBP: '',
    heartRate: '',
    temperature: '',
    respiratoryRate: '',
    oxygenSaturation: '',
    weight: '',
    height: ''
  });

  const handleVitalSignChange = (field: string, value: string) => {
    setVitalSigns(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5" />
          Sinais Vitais
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="notMeasured"
            checked={notMeasured}
            onCheckedChange={(checked) => setNotMeasured(checked === true)}
          />
          <Label htmlFor="notMeasured">Não aferido</Label>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Pressão Arterial (mmHg)</Label>
            <div className="flex gap-2">
              <Input
                placeholder="Sistólica"
                value={vitalSigns.systolicBP}
                onChange={(e) => handleVitalSignChange('systolicBP', e.target.value)}
                disabled={notMeasured}
              />
              <Input
                placeholder="Diastólica"
                value={vitalSigns.diastolicBP}
                onChange={(e) => handleVitalSignChange('diastolicBP', e.target.value)}
                disabled={notMeasured}
              />
            </div>
          </div>

          <div>
            <Label>Frequência Cardíaca (bpm)</Label>
            <Input
              placeholder="Ex: 72"
              value={vitalSigns.heartRate}
              onChange={(e) => handleVitalSignChange('heartRate', e.target.value)}
              disabled={notMeasured}
            />
          </div>

          <div>
            <Label>Temperatura (°C)</Label>
            <Input
              placeholder="Ex: 36.5"
              value={vitalSigns.temperature}
              onChange={(e) => handleVitalSignChange('temperature', e.target.value)}
              disabled={notMeasured}
            />
          </div>

          <div>
            <Label>Frequência Respiratória (irpm)</Label>
            <Input
              placeholder="Ex: 16"
              value={vitalSigns.respiratoryRate}
              onChange={(e) => handleVitalSignChange('respiratoryRate', e.target.value)}
              disabled={notMeasured}
            />
          </div>

          <div>
            <Label>Saturação O₂ (%)</Label>
            <Input
              placeholder="Ex: 98"
              value={vitalSigns.oxygenSaturation}
              onChange={(e) => handleVitalSignChange('oxygenSaturation', e.target.value)}
              disabled={notMeasured}
            />
          </div>

          <div>
            <Label>Peso (kg)</Label>
            <Input
              placeholder="Ex: 70"
              value={vitalSigns.weight}
              onChange={(e) => handleVitalSignChange('weight', e.target.value)}
              disabled={notMeasured}
            />
          </div>

          <div>
            <Label>Altura (cm)</Label>
            <Input
              placeholder="Ex: 170"
              value={vitalSigns.height}
              onChange={(e) => handleVitalSignChange('height', e.target.value)}
              disabled={notMeasured}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
