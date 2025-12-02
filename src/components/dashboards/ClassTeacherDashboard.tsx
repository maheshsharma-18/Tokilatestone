import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { useLanguage } from '../../contexts/LanguageContext';
import { Users, GraduationCap, ClipboardCheck, Ticket, BookOpen, Calendar } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { students, attendanceRecords, grades, tickets, homeworks, timetables } from '../../data/mockData';

interface ClassTeacherDashboardProps {
  onNavigate: (view: string) => void;
}

export const ClassTeacherDashboard = ({ onNavigate }: ClassTeacherDashboardProps) => {
  const { t, language } = useLanguage();

  const classStudents = students.filter(s => s.class === '10' && s.section === 'A');
  const todayAttendance = attendanceRecords.filter(r => r.date === '2025-10-19' && r.recordedBy === 'ct1');
  const presentCount = todayAttendance.filter(r => r.status === 'present').length;
  const attendanceRate = todayAttendance.length > 0 ? Math.round((presentCount / todayAttendance.length) * 100) : 0;

  const pendingGradeApprovals = grades.filter(g => !g.approvedByClassTeacher && g.enteredBy !== 'ct1').length;
  const myTickets = tickets.filter(t => t.assignedTo === 'ct1' && t.status !== 'resolved');
  const todayClasses = timetables.filter(t => t.class === '10' && t.section === 'A' && t.day === 'Monday');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl mb-2">
          {t('dashboard.welcome')}, {language === 'en' ? 'Mr. Suresh Reddy' : 'శ్రీ సురేష్ రెడ్డి'}
        </h1>
        <p className="text-muted-foreground">
          {language === 'en' ? 'Class Teacher - Class 10A' : 'క్లాస్ టీచర్ - తరగతి 10A'}
        </p>
      </div>

      {/* Overview Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">{t('nav.students')}</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{classStudents.length}</div>
            <p className="text-xs text-muted-foreground">
              {language === 'en' ? 'In your class' : 'మీ తరగతిలో'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">{t('attendance.title')}</CardTitle>
            <ClipboardCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{attendanceRate}%</div>
            <p className="text-xs text-muted-foreground">
              {language === 'en' ? 'Today\'s attendance' : 'నేటి హాజరు'}
            </p>
            <Button 
              variant="link" 
              className="p-0 h-auto text-xs mt-2"
              onClick={() => onNavigate('attendance')}
            >
              {language === 'en' ? 'Mark Attendance' : 'హాజరును గుర్తించండి'} →
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">{t('common.pending')} {t('nav.grades')}</CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{pendingGradeApprovals}</div>
            <p className="text-xs text-muted-foreground">
              {language === 'en' ? 'Approvals needed' : 'ఆమోదాలు అవసరం'}
            </p>
            <Button 
              variant="link" 
              className="p-0 h-auto text-xs mt-2"
              onClick={() => onNavigate('grades')}
            >
              {t('common.view')} →
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">{t('tickets.myTickets')}</CardTitle>
            <Ticket className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{myTickets.length}</div>
            <p className="text-xs text-muted-foreground">
              {language === 'en' ? 'Active tickets' : 'క్రియాశీల టికెట్లు'}
            </p>
            <Button 
              variant="link" 
              className="p-0 h-auto text-xs mt-2"
              onClick={() => onNavigate('tickets')}
            >
              {t('common.view')} →
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Today's Timetable */}
      <Card>
        <CardHeader>
          <CardTitle>{language === 'en' ? 'Today\'s Timetable - Class 10A' : 'నేటి టైమ్‌టేబుల్ - తరగతి 10A'}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {todayClasses.map((cls, idx) => (
              <div key={cls.id} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-600 text-white px-3 py-1 rounded">
                    {language === 'en' ? `Period ${cls.period}` : `పీరియడ్ ${cls.period}`}
                  </div>
                  <div>
                    <p>{cls.subject}</p>
                    <p className="text-sm text-muted-foreground">{language === 'en' ? cls.teacherName : cls.teacherName}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Button 
            variant="link" 
            className="p-0 h-auto text-sm mt-4"
            onClick={() => onNavigate('timetable')}
          >
            {language === 'en' ? 'View Full Timetable' : 'పూర్తి టైమ్‌టేబుల్ చూడండి'} →
          </Button>
        </CardContent>
      </Card>

      {/* Quick Actions and Active Tickets */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>{t('dashboard.quickActions')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button className="w-full justify-start gap-2" variant="outline" onClick={() => onNavigate('attendance')}>
              <ClipboardCheck className="h-4 w-4" />
              {language === 'en' ? 'Mark Attendance' : 'హాజరును గుర్తించండి'}
            </Button>
            <Button className="w-full justify-start gap-2" variant="outline" onClick={() => onNavigate('grades')}>
              <GraduationCap className="h-4 w-4" />
              {language === 'en' ? 'Enter Grades' : 'గ్రేడ్‌లు నమోదు చేయండి'}
            </Button>
            <Button className="w-full justify-start gap-2" variant="outline" onClick={() => onNavigate('homework')}>
              <BookOpen className="h-4 w-4" />
              {language === 'en' ? 'Upload Homework' : 'హోంవర్క్ అప్‌లోడ్ చేయండి'}
            </Button>
            <Button className="w-full justify-start gap-2" variant="outline" onClick={() => onNavigate('students')}>
              <Users className="h-4 w-4" />
              {language === 'en' ? 'Manage Students' : 'విద్యార్థులను నిర్వహించండి'}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{language === 'en' ? 'Active Tickets' : 'క్రియాశీల టికెట్లు'}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {myTickets.slice(0, 3).map(ticket => (
                <div key={ticket.id} className="p-3 bg-gray-50 rounded">
                  <div className="flex items-start justify-between mb-1">
                    <p className="text-sm">{ticket.title}</p>
                    <Badge variant={ticket.priority === 'high' ? 'destructive' : 'secondary'}>
                      {ticket.priority}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{ticket.raisedByName}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="outline" className="text-xs">{ticket.category}</Badge>
                    <Badge variant="outline" className="text-xs">{ticket.status}</Badge>
                  </div>
                </div>
              ))}
              {myTickets.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-4">
                  {language === 'en' ? 'No active tickets' : 'క్రియాశీల టికెట్లు లేవు'}
                </p>
              )}
              <Button 
                variant="link" 
                className="p-0 h-auto text-sm w-full text-left"
                onClick={() => onNavigate('tickets')}
              >
                {language === 'en' ? 'View All Tickets' : 'అన్ని టికెట్లను చూడండి'} →
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Homework */}
      <Card>
        <CardHeader>
          <CardTitle>{language === 'en' ? 'Recent Homework' : 'ఇటీవలి హోంవర్క్'}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {homeworks.filter(h => h.class === '10' && h.section === 'A').slice(0, 3).map(hw => (
              <div key={hw.id} className="flex items-start justify-between p-3 bg-gray-50 rounded">
                <div className="flex-1">
                  <p className="text-sm">{hw.title}</p>
                  <p className="text-xs text-muted-foreground mt-1">{hw.subject} - {hw.description}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {language === 'en' ? 'Due:' : 'గడువు:'} {new Date(hw.dueDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
            <Button 
              variant="link" 
              className="p-0 h-auto text-sm w-full text-left"
              onClick={() => onNavigate('homework')}
            >
              {language === 'en' ? 'View All Homework' : 'అన్ని హోంవర్క్ చూడండి'} →
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
