// Type definitions for the School Management System

export type UserRole = 
  | 'super_admin' 
  | 'principal' 
  | 'vice_principal' 
  | 'class_teacher' 
  | 'subject_teacher' 
  | 'fleet_manager'
  | 'parent'
  | 'driver';

export type Language = 'en' | 'te';

export interface User {
  id: string;
  name: string;
  nameInTelugu?: string;
  role: UserRole;
  phone: string;
  email?: string;
  schoolId: string;
  staffId?: string;
  assignedClasses?: string[];
  assignedSubjects?: string[];
  isClassTeacher?: boolean;
  classTeacherFor?: string;
}

export interface School {
  id: string;
  name: string;
  nameInTelugu?: string;
  logo?: string;
  principalId: string;
  principalName: string;
  principalPhone?: string;
  address: string;
  primaryColor: string;
  activeUsers: number;
  complianceStatus: 'good' | 'warning' | 'critical';
}

export interface Student {
  id: string;
  rollNumber: string;
  name: string;
  nameInTelugu?: string;
  class: string;
  section: string;
  dateOfBirth: string;
  parentId: string;
  parentName: string;
  parentContact: string;
  busRoute?: string;
  medicalData?: string;
}

export interface AttendanceRecord {
  id: string;
  studentId: string;
  date: string;
  status: 'present' | 'absent';
  recordedBy: string;
  timestamp: string;
  correctedBy?: string;
  correctionTimestamp?: string;
}

export interface Grade {
  id: string;
  studentId: string;
  subject: string;
  examCycle: string;
  marks: number;
  maxMarks: number;
  enteredBy: string;
  approvedByClassTeacher?: boolean;
  approvedByPrincipal?: boolean;
  timestamp: string;
}

export interface Timetable {
  id: string;
  class: string;
  section: string;
  day: string;
  period: number;
  subject: string;
  teacherId: string;
  teacherName: string;
}

export interface BusTrip {
  id: string;
  busNumber: string;
  driverId: string;
  driverName: string;
  route: string;
  tripType: 'morning' | 'evening';
  startKm: number;
  endKm: number;
  date: string;
  pickupPoints: string[];
  status: 'completed' | 'in_progress' | 'pending';
}

export interface Homework {
  id: string;
  class: string;
  section: string;
  subject: string;
  title: string;
  description: string;
  dueDate: string;
  uploadedBy: string;
  uploadDate: string;
  attachments?: string[];
}

export interface Event {
  id: string;
  title: string;
  titleInTelugu?: string;
  description: string;
  descriptionInTelugu?: string;
  date: string;
  category: 'holiday' | 'exam' | 'sports' | 'cultural' | 'meeting';
  status: 'approved' | 'pending' | 'rejected';
  proposedBy?: string;
  approvedBy?: string;
}

export interface Ticket {
  id: string;
  category: 'attendance' | 'grades' | 'transport' | 'class' | 'subject' | 'other';
  title: string;
  description: string;
  raisedBy: string;
  raisedByName: string;
  assignedTo: string;
  assignedToName: string;
  status: 'open' | 'in_progress' | 'resolved';
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
  updatedAt: string;
  comments?: TicketComment[];
}

export interface TicketComment {
  id: string;
  ticketId: string;
  userId: string;
  userName: string;
  comment: string;
  timestamp: string;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'attendance' | 'grade' | 'ticket' | 'event' | 'timetable' | 'announcement';
  title: string;
  message: string;
  read: boolean;
  timestamp: string;
}
