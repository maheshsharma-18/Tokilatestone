import React, { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { SchoolProvider } from './contexts/SchoolContext';
import { Login } from './components/Login';
import { Layout } from './components/Layout';
import { PrincipalDashboard } from './components/dashboards/PrincipalDashboard';
import { ClassTeacherDashboard } from './components/dashboards/ClassTeacherDashboard';
import { TeacherDashboard } from './components/dashboards/TeacherDashboard';
import { FleetManagerDashboard } from './components/dashboards/FleetManagerDashboard';
import { AttendanceView } from './components/views/AttendanceView';
import { GradesView } from './components/views/GradesView';
import { TicketsView } from './components/views/TicketsView';
import { EventsView } from './components/views/EventsView';
import { FleetView } from './components/views/FleetView';
import { StudentsView } from './components/views/StudentsView';
import { TeachersView } from './components/views/TeachersView';
import { ClassesView } from './components/views/ClassesView';
import { TimetableView } from './components/views/TimetableView';
import { HomeworkView } from './components/views/HomeworkView';
import { AnalyticsView } from './components/views/AnalyticsView';
import { SuperAdminAnalytics } from './components/views/SuperAdminAnalytics';
import { SchoolsView } from './components/views/SchoolsView';
import { SuperAdminDashboard } from './components/dashboards/SuperAdminDashboard';
import { TeacherOnboarding } from './components/views/TeacherOnboarding';
import { StudentOnboarding } from './components/views/StudentOnboarding';
import { ClassSectionOnboarding } from './components/views/ClassSectionOnboarding';
import { ManageOnboardings } from './components/views/ManageOnboardings';
import { FleetManagerOnboarding } from './components/views/FleetManagerOnboarding';
import { DriverOnboarding } from './components/views/DriverOnboarding';
import { Toaster } from './components/ui/sonner';

function AppContent() {
  const { user, isAuthenticated } = useAuth();
  const [currentView, setCurrentView] = useState('dashboard');
  const [selectedSchoolForOnboarding, setSelectedSchoolForOnboarding] = useState<string | undefined>(undefined);

  if (!isAuthenticated || !user) {
    return <Login />;
  }

  const renderDashboard = () => {
    switch (user.role) {
      case 'super_admin':
        return <SuperAdminDashboard onNavigate={setCurrentView} />;
      case 'principal':
        return <PrincipalDashboard onNavigate={setCurrentView} />;
      case 'vice_principal':
        return <PrincipalDashboard onNavigate={setCurrentView} />;
      case 'class_teacher':
        return <ClassTeacherDashboard onNavigate={setCurrentView} />;
      case 'subject_teacher':
        return <TeacherDashboard onNavigate={setCurrentView} />;
      case 'fleet_manager':
        return <FleetManagerDashboard onNavigate={setCurrentView} />;
      default:
        return <PrincipalDashboard onNavigate={setCurrentView} />;
    }
  };

  const handleNavigateWithSchool = (view: string, schoolId?: string) => {
    setSelectedSchoolForOnboarding(schoolId);
    setCurrentView(view);
  };

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return renderDashboard();
      case 'attendance':
        return <AttendanceView />;
      case 'grades':
        return <GradesView />;
      case 'teachers':
        return <TeachersView onBack={() => setCurrentView('dashboard')} onNavigate={setCurrentView} />;
      case 'classes':
        return <ClassesView onBack={() => setCurrentView('dashboard')} />;
      case 'tickets':
        return <TicketsView />;
      case 'events':
        return <EventsView />;
      case 'fleet':
        return <FleetView />;
      case 'students':
        return <StudentsView onNavigate={setCurrentView} />;
      case 'timetable':
        return <TimetableView />;
      case 'homework':
        return <HomeworkView />;
      case 'schools':
        return <SchoolsView onBack={() => setCurrentView('dashboard')} />;
      case 'manage-onboardings':
        return <ManageOnboardings onBack={() => setCurrentView('dashboard')} onNavigate={handleNavigateWithSchool} />;
      case 'analytics':
        // Use SuperAdminAnalytics for super admin, regular AnalyticsView for principal
        return user.role === 'super_admin' 
          ? <SuperAdminAnalytics onBack={() => setCurrentView('dashboard')} />
          : <AnalyticsView onBack={() => setCurrentView('dashboard')} />;
      case 'onboard-teacher':
        // Handle both Super Admin (from manage-onboardings) and Principal (from dashboard)
        return <TeacherOnboarding 
          onBack={() => setCurrentView(selectedSchoolForOnboarding ? 'manage-onboardings' : 'dashboard')} 
          userRole={user.role} 
          schoolId={selectedSchoolForOnboarding} 
        />;
      case 'onboard-student':
        // Handle both Super Admin (from manage-onboardings) and Principal (from dashboard)
        return <StudentOnboarding 
          onBack={() => setCurrentView(selectedSchoolForOnboarding ? 'manage-onboardings' : 'dashboard')} 
          schoolId={selectedSchoolForOnboarding} 
        />;
      case 'onboard-class':
        return <ClassSectionOnboarding onBack={() => setCurrentView('dashboard')} />;
      case 'onboard-fleet-manager':
        return <FleetManagerOnboarding 
          onBack={() => setCurrentView('manage-onboardings')} 
          schoolId={selectedSchoolForOnboarding} 
        />;
      case 'onboard-driver':
        return <DriverOnboarding 
          onBack={() => setCurrentView('manage-onboardings')} 
          schoolId={selectedSchoolForOnboarding} 
        />;
      default:
        return renderDashboard();
    }
  };

  return (
    <Layout currentView={currentView} onNavigate={setCurrentView}>
      {renderView()}
    </Layout>
  );
}

export default function App() {
  return (
    <SchoolProvider>
      <AuthProvider>
        <LanguageProvider>
          <AppContent />
          <Toaster />
        </LanguageProvider>
      </AuthProvider>
    </SchoolProvider>
  );
}