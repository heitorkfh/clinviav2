
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { PatientDetails } from '../patients/patient-details';

interface PatientHistoryPopupProps {
  open: boolean;
  onClose: () => void;
  patient: any;
}

export function PatientHistoryPopup({ open, onClose, patient }: PatientHistoryPopupProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-[95vw] max-h-[90vh] overflow-hidden p-0">
        <div className="overflow-y-auto max-h-[90vh]">
          <PatientDetails 
            patient={patient} 
            onClose={onClose}
            isPopup={true}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
