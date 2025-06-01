
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Progress } from '../ui/progress';

const procedures = [
  { name: 'Botox', count: 4, progress: 80 },
  { name: 'Silicone', count: 3, progress: 60 },
  { name: 'Harmonização', count: 2, progress: 40 },
];

const surgeries = [
  { name: 'Lipo lad', count: 3, progress: 75 },
  { name: 'Rinoplastia', count: 2, progress: 50 },
  { name: 'Abdominoplastia', count: 2, progress: 50 },
];

export function ProcedureStats() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Smart View</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="font-medium text-sm text-gray-600 mb-3">PROCEDIMENTOS AGENDADOS</h3>
          <div className="space-y-3">
            {procedures.map((procedure) => (
              <div key={procedure.name}>
                <div className="flex justify-between text-sm mb-1">
                  <span>{procedure.name}</span>
                  <span>{procedure.count}</span>
                </div>
                <Progress value={procedure.progress} className="h-2" />
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-medium text-sm text-gray-600 mb-3">CIRURGIAS AGENDADAS</h3>
          <div className="space-y-3">
            {surgeries.map((surgery) => (
              <div key={surgery.name}>
                <div className="flex justify-between text-sm mb-1">
                  <span>{surgery.name}</span>
                  <span>{surgery.count}</span>
                </div>
                <Progress value={surgery.progress} className="h-2" />
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
