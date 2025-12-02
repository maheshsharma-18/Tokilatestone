// Mock data for the School Management System
import { School, User, Student, AttendanceRecord, Grade, Timetable, BusTrip, Homework, Event, Ticket, Notification } from '../types';

export const schools: School[] = [
  {
    id: 'school1',
    name: 'Delhi Public School',
    nameInTelugu: 'ఢిల్లీ పబ్లిక్ స్కూల్',
    principalId: 'principal1',
    principalName: 'Dr. Rajesh Kumar',
    principalPhone: '+91 98765 43210',
    address: 'Banjara Hills, Hyderabad',
    primaryColor: '#1e40af',
    activeUsers: 1250,
    complianceStatus: 'good',
    logo: 'https://images.unsplash.com/photo-1562774053-701939374585?w=200&h=200&fit=crop'
  },
  {
    id: 'school2',
    name: 'Vidya Mandir High School',
    nameInTelugu: 'విద్యా మందిర్ హై స్కూల్',
    principalId: 'principal2',
    principalName: 'Mrs. Lakshmi Devi',
    principalPhone: '+91 98765 12345',
    address: 'Kukatpally, Hyderabad',
    primaryColor: '#059669',
    activeUsers: 850,
    complianceStatus: 'good',
    logo: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=200&h=200&fit=crop'
  },
  {
    id: 'school3',
    name: 'St. Johns Academy',
    nameInTelugu: 'సెయింట్ జాన్స్ అకాడమీ',
    principalId: 'principal3',
    principalName: 'Fr. Thomas George',
    principalPhone: '+91 98765 67890',
    address: 'Secundarabad',
    primaryColor: '#7c3aed',
    activeUsers: 650,
    complianceStatus: 'warning',
    logo: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=200&h=200&fit=crop'
  }
];

export const users: User[] = [
  {
    id: 'superadmin1',
    name: 'Admin',
    role: 'super_admin',
    phone: '+919999999999',
    schoolId: 'all'
  },
  {
    id: 'principal1',
    name: 'Dr. Rajesh Kumar',
    nameInTelugu: 'డా. రాజేష్ కుమార్',
    role: 'principal',
    phone: '+919876543210',
    email: 'principal@dps.edu',
    schoolId: 'school1',
    staffId: 'DPS001'
  },
  {
    id: 'vp1',
    name: 'Mrs. Priya Sharma',
    nameInTelugu: 'శ్రీమతి ప్రియా శర్మ',
    role: 'vice_principal',
    phone: '+919876543211',
    schoolId: 'school1',
    staffId: 'DPS002'
  },
  {
    id: 'ct1',
    name: 'Mr. Suresh Reddy',
    nameInTelugu: 'శ్రీ సురేష్ రెడ్డి',
    role: 'class_teacher',
    phone: '+919876543212',
    schoolId: 'school1',
    staffId: 'DPS101',
    isClassTeacher: true,
    classTeacherFor: '10A',
    assignedClasses: ['10A'],
    assignedSubjects: ['Mathematics']
  },
  {
    id: 'ct2',
    name: 'Mrs. Kavita Nair',
    nameInTelugu: 'శ్రీమతి కవిత నాయర్',
    role: 'class_teacher',
    phone: '+919876543213',
    schoolId: 'school1',
    staffId: 'DPS102',
    isClassTeacher: true,
    classTeacherFor: '10B',
    assignedClasses: ['10B'],
    assignedSubjects: ['Science']
  },
  {
    id: 'st1',
    name: 'Ms. Priya Sharma',
    nameInTelugu: 'శ్రీమతి ప్రియా శర్మ',
    role: 'subject_teacher',
    phone: '+919876543214',
    email: 'priya.sharma@dps.edu',
    schoolId: 'school1',
    staffId: 'DPS103',
    assignedClasses: ['10A', '10B', '9A'],
    assignedSubjects: ['Mathematics', 'Physics']
  },
  {
    id: 'st2',
    name: 'Mr. Anil Krishna',
    nameInTelugu: 'శ్రీ అనిల్ కృష్ణ',
    role: 'subject_teacher',
    phone: '+919876543215',
    email: 'anil.krishna@dps.edu',
    schoolId: 'school1',
    staffId: 'DPS104',
    assignedClasses: ['10A', '10B', '10C'],
    assignedSubjects: ['English']
  },
  {
    id: 'st3',
    name: 'Mrs. Deepa Menon',
    nameInTelugu: 'శ్రీమతి దీపా మీనన్',
    role: 'subject_teacher',
    phone: '+919876543216',
    email: 'deepa.menon@dps.edu',
    schoolId: 'school1',
    staffId: 'DPS105',
    assignedClasses: ['10A', '10B'],
    assignedSubjects: ['Social Studies']
  },
  {
    id: 'fm1',
    name: 'Mr. Ravi Varma',
    nameInTelugu: 'శ్రీ రవి వర్మ',
    role: 'fleet_manager',
    phone: '+919876543217',
    schoolId: 'school1',
    staffId: 'DPS201'
  }
];

export const students: Student[] = [
  {
    id: 'std1',
    rollNumber: '10A001',
    name: 'Aarav Sharma',
    nameInTelugu: 'ఆరవ్ శర్మ',
    class: '10',
    section: 'A',
    dateOfBirth: '2009-03-15',
    parentId: 'parent1',
    parentName: 'Mr. Vikram Sharma',
    parentContact: '+919123456781',
    busRoute: 'Route 1'
  },
  {
    id: 'std2',
    rollNumber: '10A002',
    name: 'Ananya Reddy',
    nameInTelugu: 'అనన్య రెడ్డి',
    class: '10',
    section: 'A',
    dateOfBirth: '2009-05-22',
    parentId: 'parent2',
    parentName: 'Mrs. Lakshmi Reddy',
    parentContact: '+919123456782',
    busRoute: 'Route 2'
  },
  {
    id: 'std3',
    rollNumber: '10A003',
    name: 'Aditi Patel',
    nameInTelugu: 'ఆదితి పటేల్',
    class: '10',
    section: 'A',
    dateOfBirth: '2009-07-10',
    parentId: 'parent3',
    parentName: 'Mr. Ramesh Patel',
    parentContact: '+919123456783'
  },
  {
    id: 'std4',
    rollNumber: '10A004',
    name: 'Krishna Murthy',
    nameInTelugu: 'కృష్ణ మూర్తి',
    class: '10',
    section: 'A',
    dateOfBirth: '2009-02-28',
    parentId: 'parent4',
    parentName: 'Mr. Venkat Murthy',
    parentContact: '+919123456784',
    busRoute: 'Route 1'
  },
  {
    id: 'std5',
    rollNumber: '10A005',
    name: 'Priya Nair',
    nameInTelugu: 'ప్రియా నాయర్',
    class: '10',
    section: 'A',
    dateOfBirth: '2009-09-14',
    parentId: 'parent5',
    parentName: 'Mrs. Suma Nair',
    parentContact: '+919123456785',
    busRoute: 'Route 3'
  },
  {
    id: 'std6',
    rollNumber: '10B001',
    name: 'Rohan Gupta',
    nameInTelugu: 'రోహన్ గుప్తా',
    class: '10',
    section: 'B',
    dateOfBirth: '2009-04-18',
    parentId: 'parent6',
    parentName: 'Mr. Ajay Gupta',
    parentContact: '+919123456786',
    busRoute: 'Route 2'
  },
  {
    id: 'std7',
    rollNumber: '10B002',
    name: 'Sai Teja',
    nameInTelugu: 'సాయి తేజ',
    class: '10',
    section: 'B',
    dateOfBirth: '2009-06-25',
    parentId: 'parent7',
    parentName: 'Mr. Ravi Teja',
    parentContact: '+919123456787'
  },
  {
    id: 'std8',
    rollNumber: '10B003',
    name: 'Divya Rao',
    nameInTelugu: 'దివ్య రావు',
    class: '10',
    section: 'B',
    dateOfBirth: '2009-08-30',
    parentId: 'parent8',
    parentName: 'Mrs. Kavita Rao',
    parentContact: '+919123456788',
    busRoute: 'Route 1'
  }
];

export const attendanceRecords: AttendanceRecord[] = [
  {
    id: 'att1',
    studentId: 'std1',
    date: '2025-10-19',
    status: 'present',
    recordedBy: 'ct1',
    timestamp: '2025-10-19T09:15:00Z'
  },
  {
    id: 'att2',
    studentId: 'std2',
    date: '2025-10-19',
    status: 'present',
    recordedBy: 'ct1',
    timestamp: '2025-10-19T09:15:00Z'
  },
  {
    id: 'att3',
    studentId: 'std3',
    date: '2025-10-19',
    status: 'absent',
    recordedBy: 'ct1',
    timestamp: '2025-10-19T09:15:00Z'
  },
  {
    id: 'att4',
    studentId: 'std4',
    date: '2025-10-19',
    status: 'present',
    recordedBy: 'ct1',
    timestamp: '2025-10-19T09:15:00Z'
  },
  {
    id: 'att5',
    studentId: 'std5',
    date: '2025-10-19',
    status: 'present',
    recordedBy: 'ct1',
    timestamp: '2025-10-19T09:15:00Z'
  }
];

export const grades: Grade[] = [
  {
    id: 'gr1',
    studentId: 'std1',
    subject: 'Mathematics',
    examCycle: 'Mid-Term 2025',
    marks: 85,
    maxMarks: 100,
    enteredBy: 'ct1',
    approvedByClassTeacher: true,
    approvedByPrincipal: true,
    timestamp: '2025-09-15T10:00:00Z'
  },
  {
    id: 'gr2',
    studentId: 'std1',
    subject: 'Science',
    examCycle: 'Mid-Term 2025',
    marks: 92,
    maxMarks: 100,
    enteredBy: 'ct2',
    approvedByClassTeacher: true,
    approvedByPrincipal: true,
    timestamp: '2025-09-15T10:30:00Z'
  },
  {
    id: 'gr3',
    studentId: 'std2',
    subject: 'Mathematics',
    examCycle: 'Mid-Term 2025',
    marks: 78,
    maxMarks: 100,
    enteredBy: 'ct1',
    approvedByClassTeacher: true,
    approvedByPrincipal: false,
    timestamp: '2025-09-15T10:00:00Z'
  },
  {
    id: 'gr4',
    studentId: 'std2',
    subject: 'English',
    examCycle: 'Mid-Term 2025',
    marks: 88,
    maxMarks: 100,
    enteredBy: 'st1',
    approvedByClassTeacher: false,
    approvedByPrincipal: false,
    timestamp: '2025-09-16T11:00:00Z'
  }
];

export const timetables: Timetable[] = [
  {
    id: 'tt1',
    class: '10',
    section: 'A',
    day: 'Monday',
    period: 1,
    subject: 'Mathematics',
    teacherId: 'ct1',
    teacherName: 'Mr. Suresh Reddy'
  },
  {
    id: 'tt2',
    class: '10',
    section: 'A',
    day: 'Monday',
    period: 2,
    subject: 'English',
    teacherId: 'st1',
    teacherName: 'Mr. Anil Krishna'
  },
  {
    id: 'tt3',
    class: '10',
    section: 'A',
    day: 'Monday',
    period: 3,
    subject: 'Science',
    teacherId: 'ct2',
    teacherName: 'Mrs. Kavita Nair'
  },
  {
    id: 'tt4',
    class: '10',
    section: 'A',
    day: 'Monday',
    period: 4,
    subject: 'Social Studies',
    teacherId: 'st2',
    teacherName: 'Mrs. Deepa Menon'
  },
  {
    id: 'tt5',
    class: '10',
    section: 'A',
    day: 'Tuesday',
    period: 1,
    subject: 'Science',
    teacherId: 'ct2',
    teacherName: 'Mrs. Kavita Nair'
  },
  {
    id: 'tt6',
    class: '10',
    section: 'A',
    day: 'Tuesday',
    period: 2,
    subject: 'Mathematics',
    teacherId: 'ct1',
    teacherName: 'Mr. Suresh Reddy'
  }
];

export const busTrips: BusTrip[] = [
  {
    id: 'trip1',
    busNumber: 'TS09 AB 1234',
    driverId: 'driver1',
    driverName: 'Mr. Ramesh Kumar',
    route: 'Route 1 - Banjara Hills',
    tripType: 'morning',
    startKm: 12500,
    endKm: 12545,
    date: '2025-10-19',
    pickupPoints: ['Stop 1: JNTU', 'Stop 2: Kukatpally', 'Stop 3: KPHB'],
    status: 'completed'
  },
  {
    id: 'trip2',
    busNumber: 'TS09 CD 5678',
    driverId: 'driver2',
    driverName: 'Mr. Venkat Rao',
    route: 'Route 2 - Hitech City',
    tripType: 'morning',
    startKm: 8900,
    endKm: 8935,
    date: '2025-10-19',
    pickupPoints: ['Stop 1: Madhapur', 'Stop 2: Gachibowli', 'Stop 3: Kondapur'],
    status: 'completed'
  },
  {
    id: 'trip3',
    busNumber: 'TS09 EF 9012',
    driverId: 'driver3',
    driverName: 'Mr. Krishna Prasad',
    route: 'Route 3 - Miyapur',
    tripType: 'morning',
    startKm: 15600,
    endKm: 15640,
    date: '2025-10-19',
    pickupPoints: ['Stop 1: Miyapur', 'Stop 2: Bachupally', 'Stop 3: Nizampet'],
    status: 'completed'
  }
];

export const homeworks: Homework[] = [
  {
    id: 'hw1',
    class: '10',
    section: 'A',
    subject: 'Mathematics',
    title: 'Quadratic Equations Practice',
    description: 'Complete exercises 3.1 to 3.5 from the textbook',
    dueDate: '2025-10-25',
    uploadedBy: 'ct1',
    uploadDate: '2025-10-18',
    attachments: ['quadratic_equations.pdf']
  },
  {
    id: 'hw2',
    class: '10',
    section: 'A',
    subject: 'English',
    title: 'Essay Writing',
    description: 'Write an essay on "The Importance of Technology in Education" (300-400 words)',
    dueDate: '2025-10-22',
    uploadedBy: 'st1',
    uploadDate: '2025-10-17',
    attachments: []
  },
  {
    id: 'hw3',
    class: '10',
    section: 'B',
    subject: 'Science',
    title: 'Chemistry Lab Report',
    description: 'Submit lab report for Acid-Base Titration experiment',
    dueDate: '2025-10-23',
    uploadedBy: 'ct2',
    uploadDate: '2025-10-16',
    attachments: ['lab_format.pdf']
  }
];

export const events: Event[] = [
  {
    id: 'evt1',
    title: 'Diwali Holiday',
    titleInTelugu: 'దీపావళి సెలవు',
    description: 'School closed for Diwali celebrations',
    descriptionInTelugu: 'దీపావళి వేడుకల కోసం పాఠశాల మూసివేయబడింది',
    date: '2025-11-01',
    category: 'holiday',
    status: 'approved',
    approvedBy: 'principal1'
  },
  {
    id: 'evt2',
    title: 'Annual Sports Day',
    titleInTelugu: 'వార్షిక క్రీడా దినోత్సవం',
    description: 'Annual sports and athletics competition',
    descriptionInTelugu: 'వార్షిక క్రీడలు మరియు అథ్లెటిక్స్ పోటీ',
    date: '2025-11-15',
    category: 'sports',
    status: 'approved',
    approvedBy: 'principal1'
  },
  {
    id: 'evt3',
    title: 'Parent-Teacher Meeting',
    titleInTelugu: 'తల్లిదండ్రులు-ఉపాధ్యాయుల సమావేశం',
    description: 'Quarterly parent-teacher interaction session',
    descriptionInTelugu: 'త్రైమాసిక తల్లిదండ్రులు-ఉపాధ్యాయుల పరస్పర సమావేశం',
    date: '2025-10-28',
    category: 'meeting',
    status: 'pending',
    proposedBy: 'vp1'
  }
];

export const tickets: Ticket[] = [
  {
    id: 'tick1',
    category: 'attendance',
    title: 'Attendance Correction Request',
    description: 'My child was marked absent on Oct 15, but he was present. Please correct.',
    raisedBy: 'parent1',
    raisedByName: 'Mr. Vikram Sharma',
    assignedTo: 'ct1',
    assignedToName: 'Mr. Suresh Reddy',
    status: 'in_progress',
    priority: 'medium',
    createdAt: '2025-10-16T14:30:00Z',
    updatedAt: '2025-10-17T10:00:00Z',
    comments: [
      {
        id: 'comm1',
        ticketId: 'tick1',
        userId: 'ct1',
        userName: 'Mr. Suresh Reddy',
        comment: 'I will verify the attendance register and update accordingly.',
        timestamp: '2025-10-17T10:00:00Z'
      }
    ]
  },
  {
    id: 'tick2',
    category: 'transport',
    title: 'Bus Delay Issue',
    description: 'The morning bus (Route 1) has been delayed by 20 minutes for the past 3 days.',
    raisedBy: 'parent4',
    raisedByName: 'Mr. Venkat Murthy',
    assignedTo: 'ct1',
    assignedToName: 'Mr. Suresh Reddy',
    status: 'open',
    priority: 'high',
    createdAt: '2025-10-18T08:45:00Z',
    updatedAt: '2025-10-18T08:45:00Z'
  },
  {
    id: 'tick3',
    category: 'grades',
    title: 'Grade Query - Mathematics',
    description: 'I would like to discuss my child\'s mathematics mid-term results.',
    raisedBy: 'parent2',
    raisedByName: 'Mrs. Lakshmi Reddy',
    assignedTo: 'ct1',
    assignedToName: 'Mr. Suresh Reddy',
    status: 'resolved',
    priority: 'low',
    createdAt: '2025-10-10T16:20:00Z',
    updatedAt: '2025-10-12T11:30:00Z',
    comments: [
      {
        id: 'comm2',
        ticketId: 'tick3',
        userId: 'ct1',
        userName: 'Mr. Suresh Reddy',
        comment: 'Discussed the performance with parent. Student needs to focus on algebra concepts.',
        timestamp: '2025-10-12T11:30:00Z'
      }
    ]
  }
];

export const notifications: Notification[] = [
  {
    id: 'notif1',
    userId: 'principal1',
    type: 'grade',
    title: 'Grade Approval Pending',
    message: '5 grade submissions pending your approval for Class 10A',
    read: false,
    timestamp: '2025-10-19T08:00:00Z'
  },
  {
    id: 'notif2',
    userId: 'ct1',
    type: 'ticket',
    title: 'New Ticket Assigned',
    message: 'Attendance correction request assigned to you',
    read: false,
    timestamp: '2025-10-16T14:30:00Z'
  },
  {
    id: 'notif3',
    userId: 'principal1',
    type: 'event',
    title: 'Event Proposal',
    message: 'Parent-Teacher Meeting proposed by Vice Principal',
    read: true,
    timestamp: '2025-10-15T11:00:00Z'
  }
];
