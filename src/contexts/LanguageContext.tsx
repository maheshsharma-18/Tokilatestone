import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Language } from '../types';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const translations: Record<string, Record<Language, string>> = {
  // Navigation
  'nav.dashboard': { en: 'Dashboard', te: 'డ్యాష్‌బోర్డ్' },
  'nav.attendance': { en: 'Attendance', te: 'హాజరు' },
  'nav.grades': { en: 'Grades', te: 'గ్రేడ్‌లు' },
  'nav.timetable': { en: 'Timetable', te: 'టైమ్‌టేబుల్' },
  'nav.homework': { en: 'Homework', te: 'హోంవర్క్' },
  'nav.events': { en: 'Events & Calendar', te: 'ఈవెంట్లు & క్యాలెండర్' },
  'nav.tickets': { en: 'Tickets', te: 'టికెట్లు' },
  'nav.fleet': { en: 'Fleet Management', te: 'ఫ్లీట్ మేనేజ్‌మెంట్' },
  'nav.students': { en: 'Students', te: 'విద్యార్థులు' },
  'nav.teachers': { en: 'Teachers', te: 'ఉపాధ్యాయులు' },
  'nav.schools': { en: 'Schools', te: 'పాఠశాలలు' },
  'nav.classes': { en: 'Classes & Sections', te: 'తరగతులు & విభాగాలు' },
  'nav.analytics': { en: 'Analytics', te: 'విశ్లేషణ' },
  'nav.settings': { en: 'Settings', te: 'సెట్టింగ్‌లు' },
  'nav.logout': { en: 'Logout', te: 'లాగ్అవుట్' },
  
  // Common
  'common.search': { en: 'Search', te: 'వెతకండి' },
  'common.filter': { en: 'Filter', te: 'ఫిల్టర్' },
  'common.export': { en: 'Export', te: 'ఎగుమతి' },
  'common.submit': { en: 'Submit', te: 'సమర్పించండి' },
  'common.cancel': { en: 'Cancel', te: 'రద్దు చేయండి' },
  'common.save': { en: 'Save', te: 'సేవ్ చేయండి' },
  'common.edit': { en: 'Edit', te: 'సవరించండి' },
  'common.delete': { en: 'Delete', te: 'తొలగించండి' },
  'common.approve': { en: 'Approve', te: 'ఆమోదించండి' },
  'common.reject': { en: 'Reject', te: 'తిరస్కరించండి' },
  'common.view': { en: 'View', te: 'చూడండి' },
  'common.download': { en: 'Download', te: 'డౌన్‌లోడ్' },
  'common.upload': { en: 'Upload', te: 'అప్‌లోడ్' },
  'common.add': { en: 'Add', te: 'జోడించండి' },
  'common.total': { en: 'Total', te: 'మొత్తం' },
  'common.status': { en: 'Status', te: 'స్థితి' },
  'common.date': { en: 'Date', te: 'తేదీ' },
  'common.name': { en: 'Name', te: 'పేరు' },
  'common.class': { en: 'Class', te: 'తరగతి' },
  'common.section': { en: 'Section', te: 'విభాగం' },
  'common.subject': { en: 'Subject', te: 'విషయం' },
  'common.teacher': { en: 'Teacher', te: 'ఉపాధ్యాయుడు' },
  'common.student': { en: 'Student', te: 'విద్యార్థి' },
  'common.parent': { en: 'Parent', te: 'తల్లిదండ్రి' },
  'common.present': { en: 'Present', te: 'హాజరు' },
  'common.absent': { en: 'Absent', te: 'గైర్హాజరు' },
  'common.pending': { en: 'Pending', te: 'పెండింగ్' },
  'common.approved': { en: 'Approved', te: 'ఆమోదించబడింది' },
  'common.rejected': { en: 'Rejected', te: 'తిరస్కరించబడింది' },
  
  // Dashboard
  'dashboard.welcome': { en: 'Welcome', te: 'స్వాగతం' },
  'dashboard.overview': { en: 'Overview', te: 'అవలోకనం' },
  'dashboard.quickActions': { en: 'Quick Actions', te: 'త్వరిత చర్యలు' },
  'dashboard.recentActivity': { en: 'Recent Activity', te: 'ఇటీవలి కార్యాచరణ' },
  'dashboard.notifications': { en: 'Notifications', te: 'నోటిఫికేషన్లు' },
  
  // Login
  'login.title': { en: 'Login to Toki Tech', te: 'టోకి టెక్‌లోకి లాగిన్ అవ్వండి' },
  'login.phoneNumber': { en: 'Phone Number', te: 'ఫోన్ నంబర్' },
  'login.otp': { en: 'Enter OTP', te: 'OTP నమోదు చేయండి' },
  'login.sendOtp': { en: 'Send OTP', te: 'OTP పంపండి' },
  'login.verify': { en: 'Verify & Login', te: 'ధృవీకరించండి & లాగిన్' },
  'login.poweredBy': { en: 'Powered by', te: 'ద్వారా శక్తివంతం' },
  
  // Attendance
  'attendance.title': { en: 'Attendance Management', te: 'హాజరు నిర్వహణ' },
  'attendance.markAttendance': { en: 'Mark Attendance', te: 'హాజరును గుర్తించండి' },
  'attendance.viewRecords': { en: 'View Records', te: 'రికార్డులను చూడండి' },
  'attendance.percentage': { en: 'Attendance %', te: 'హాజరు %' },
  'attendance.rollNumber': { en: 'Roll Number', te: 'రోల్ నంబర్' },
  
  // Grades
  'grades.title': { en: 'Grades Management', te: 'గ్రేడ్‌ల నిర్వహణ' },
  'grades.enterGrades': { en: 'Enter Grades', te: 'గ్రేడ్‌లు నమోదు చేయండి' },
  'grades.approveGrades': { en: 'Approve Grades', te: 'గ్రేడ్‌లను ఆమోదించండి' },
  'grades.examCycle': { en: 'Exam Cycle', te: 'పరీక్ష చక్రం' },
  'grades.marks': { en: 'Marks', te: 'మార్కులు' },
  'grades.maxMarks': { en: 'Max Marks', te: 'గరిష్ట మార్కులు' },
  
  // Events
  'events.title': { en: 'Events & Calendar', te: 'ఈవెంట్లు & క్యాలెండర్' },
  'events.addEvent': { en: 'Add Event', te: 'ఈవెంట్ జోడించండి' },
  'events.proposeEvent': { en: 'Propose Event', te: 'ఈవెంట్ ప్రతిపాదించండి' },
  'events.holiday': { en: 'Holiday', te: 'సెలవు' },
  'events.exam': { en: 'Exam', te: 'పరీక్ష' },
  'events.sports': { en: 'Sports', te: 'క్రీడలు' },
  'events.cultural': { en: 'Cultural', te: 'సాంస్కృతిక' },
  'events.meeting': { en: 'Meeting', te: 'సమావేశం' },
  
  // Tickets
  'tickets.title': { en: 'Tickets', te: 'టికెట్లు' },
  'tickets.raiseTicket': { en: 'Raise Ticket', te: 'టికెట్ పెంచండి' },
  'tickets.myTickets': { en: 'My Tickets', te: 'నా టికెట్లు' },
  'tickets.category': { en: 'Category', te: 'వర్గం' },
  'tickets.priority': { en: 'Priority', te: 'ప్రాధాన్యత' },
  'tickets.open': { en: 'Open', te: 'తెరిచింది' },
  'tickets.inProgress': { en: 'In Progress', te: 'పురోగతిలో ఉంది' },
  'tickets.resolved': { en: 'Resolved', te: 'పరిష్కరించబడింది' },
  
  // Fleet
  'fleet.title': { en: 'Fleet Management', te: 'ఫ్లీట్ నిర్వహణ' },
  'fleet.busNumber': { en: 'Bus Number', te: 'బస్ నంబర్' },
  'fleet.driver': { en: 'Driver', te: 'డ్రైవర్' },
  'fleet.route': { en: 'Route', te: 'మార్గం' },
  'fleet.tripType': { en: 'Trip Type', te: 'ట్రిప్ రకం' },
  'fleet.morning': { en: 'Morning', te: 'ఉదయం' },
  'fleet.evening': { en: 'Evening', te: 'సాయంత్రం' },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'te' : 'en');
  };

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};
