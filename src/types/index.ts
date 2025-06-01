
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'secretary' | 'professional';
  avatar?: string;
  phone?: string;
  specialty?: string;
}

export interface Patient {
  id: string;
  name: string;
  email: string;
  phone: string;
  birthDate: string;
  cpf: string;
  address: string;
  medicalHistory?: string;
  observations?: string;
  createdAt: string;
}

export interface Professional {
  id: string;
  name: string;
  email: string;
  phone: string;
  specialty: string;
  crm: string;
  available: boolean;
  workingHours: WorkingHours[];
}

export interface Service {
  id: string;
  name: string;
  description: string;
  duration: number; // in minutes
  price: number;
  professionalIds: string[];
}

export interface Appointment {
  id: string;
  patientId: string;
  professionalId: string;
  serviceId: string;
  date: string;
  time: string;
  status: 'scheduled' | 'confirmed' | 'in-progress' | 'completed' | 'cancelled' | 'no-show';
  observations?: string;
  createdAt: string;
}

export interface WorkingHours {
  dayOfWeek: number; // 0-6 (Sunday-Saturday)
  startTime: string;
  endTime: string;
  breakStart?: string;
  breakEnd?: string;
}

export interface MedicalRecord {
  id: string;
  patientId: string;
  professionalId: string;
  appointmentId: string;
  date: string;
  type: 'consultation' | 'exam' | 'prescription' | 'procedure';
  title: string;
  description: string;
  diagnosis?: string;
  prescription?: string;
  attachments?: string[];
}
