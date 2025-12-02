import React, { ReactNode, useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { 
  LayoutDashboard, 
  Users, 
  GraduationCap, 
  Calendar, 
  Bus, 
  Ticket, 
  BookOpen, 
  ClipboardCheck, 
  Building2,
  BarChart3,
  Settings,
  LogOut,
  Bell,
  Menu,
  X,
  Languages,
  School,
  Clock
} from 'lucide-react';
import tokiLogo from 'figma:asset/542a27157e7f37147ee1c5ffd15096589b5daa9c.png';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { ScrollArea } from './ui/scroll-area';
import { notifications } from '../data/mockData';

interface LayoutProps {
  children: ReactNode;
  currentView: string;
  onNavigate: (view: string) => void;
}

export const Layout = ({ children, currentView, onNavigate }: LayoutProps) => {
  const { user, logout, selectedSchool } = useAuth();
  const { t, toggleLanguage, language } = useLanguage();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  
  const unreadNotifications = notifications.filter(n => !n.read).length;

  // Update date and time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'short', 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    };
    return date.toLocaleDateString(language === 'en' ? 'en-US' : 'te-IN', options);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString(language === 'en' ? 'en-US' : 'te-IN', { 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit',
      hour12: true 
    });
  };

  const getNavigationItems = () => {
    const items = [];
    
    items.push({ id: 'dashboard', label: t('nav.dashboard'), icon: LayoutDashboard });
    
    if (user?.role === 'super_admin') {
      items.push({ id: 'schools', label: t('nav.schools'), icon: Building2 });
      items.push({ id: 'manage-onboardings', label: language === 'en' ? 'Manage Onboardings' : 'ఆన్‌బోర్డింగ్‌లను నిర్వహించండి', icon: School });
      items.push({ id: 'analytics', label: t('nav.analytics'), icon: BarChart3 });
    }
    
    if (['principal', 'vice_principal', 'class_teacher', 'subject_teacher'].includes(user?.role || '')) {
      items.push({ id: 'attendance', label: t('nav.attendance'), icon: ClipboardCheck });
      items.push({ id: 'grades', label: t('nav.grades'), icon: GraduationCap });
      items.push({ id: 'timetable', label: t('nav.timetable'), icon: Calendar });
      items.push({ id: 'homework', label: t('nav.homework'), icon: BookOpen });
      items.push({ id: 'students', label: t('nav.students'), icon: Users });
    }
    
    if (['principal', 'vice_principal'].includes(user?.role || '')) {
      items.push({ id: 'teachers', label: t('nav.teachers'), icon: Users });
      items.push({ id: 'classes', label: t('nav.classes'), icon: Building2 });
    }
    
    if (['principal', 'vice_principal', 'class_teacher'].includes(user?.role || '')) {
      items.push({ id: 'events', label: t('nav.events'), icon: Calendar });
      items.push({ id: 'tickets', label: t('nav.tickets'), icon: Ticket });
    }
    
    if (user?.role === 'fleet_manager' || user?.role === 'principal') {
      items.push({ id: 'fleet', label: t('nav.fleet'), icon: Bus });
    }
    
    if (user?.role === 'principal') {
      items.push({ id: 'analytics', label: t('nav.analytics'), icon: BarChart3 });
    }
    
    return items;
  };

  const navigationItems = getNavigationItems();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation Bar */}
      <div className="bg-white border-b sticky top-0 z-50">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden"
            >
              {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
            <div className="flex items-center gap-3">
              <div className="bg-white p-2 rounded-lg shadow-sm border">
                <img 
                  src={tokiLogo} 
                  alt="Toki Tech" 
                  className="h-8 w-auto"
                />
              </div>
              <div>
                <h1 className="text-lg">{selectedSchool?.name || 'Toki Tech Platform'}</h1>
                {selectedSchool?.nameInTelugu && (
                  <p className="text-xs text-muted-foreground">
                    {language === 'en' ? selectedSchool.nameInTelugu : selectedSchool.name}
                  </p>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {/* Date and Time Display */}
            <div className="hidden md:flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200">
              <Clock className="h-4 w-4 text-blue-600" />
              <div className="flex flex-col">
                <span className="text-xs font-medium text-blue-900">{formatDate(currentDateTime)}</span>
                <span className="text-xs font-bold text-purple-900">{formatTime(currentDateTime)}</span>
              </div>
            </div>

            <Button variant="ghost" size="icon" onClick={toggleLanguage}>
              <Languages className="h-5 w-5" />
            </Button>
            
            {user?.role !== 'super_admin' && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
                    <Bell className="h-5 w-5" />
                    {unreadNotifications > 0 && (
                      <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
                        {unreadNotifications}
                      </Badge>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-80">
                  <DropdownMenuLabel>{t('dashboard.notifications')}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <ScrollArea className="h-72">
                    {notifications.slice(0, 5).map(notif => (
                      <div key={notif.id} className="p-3 hover:bg-gray-50 cursor-pointer border-b">
                        <p className="text-sm">{notif.title}</p>
                        <p className="text-xs text-muted-foreground mt-1">{notif.message}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {new Date(notif.timestamp).toLocaleString()}
                        </p>
                      </div>
                    ))}
                  </ScrollArea>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="gap-2">
                  <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white">
                    {user?.name.charAt(0)}
                  </div>
                  <div className="hidden md:block text-left">
                    <p className="text-sm">{language === 'en' ? user?.name : user?.nameInTelugu || user?.name}</p>
                    <p className="text-xs text-muted-foreground capitalize">{user?.role.replace('_', ' ')}</p>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={logout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  {t('nav.logout')}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } fixed lg:static lg:translate-x-0 left-0 top-14 h-[calc(100vh-3.5rem)] w-64 bg-white border-r transition-transform duration-200 ease-in-out z-40`}
        >
          <ScrollArea className="h-full py-4">
            <nav className="space-y-1 px-3">
              {navigationItems.map(item => {
                const Icon = item.icon;
                return (
                  <Button
                    key={item.id}
                    variant={currentView === item.id ? 'secondary' : 'ghost'}
                    className="w-full justify-start gap-3"
                    onClick={() => {
                      onNavigate(item.id);
                      if (window.innerWidth < 1024) setSidebarOpen(false);
                    }}
                  >
                    <Icon className="h-5 w-5" />
                    {item.label}
                  </Button>
                );
              })}
            </nav>
          </ScrollArea>
          
          <div className="absolute bottom-4 left-0 right-0 px-3 border-t pt-4">
            <div className="flex flex-col items-center text-xs text-muted-foreground gap-2">
              <p>{t('login.poweredBy')}</p>
              <img 
                src={tokiLogo} 
                alt="Toki Tech" 
                className="h-8 w-auto"
              />
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
      
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden top-14"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};