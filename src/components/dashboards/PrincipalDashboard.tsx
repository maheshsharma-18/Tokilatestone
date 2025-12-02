import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAuth } from '../../contexts/AuthContext';
import { 
  Users, 
  GraduationCap, 
  ClipboardCheck, 
  Ticket, 
  Bus, 
  Calendar,
  TrendingUp,
  TrendingDown,
  AlertCircle,
  CheckCircle2,
  Clock,
  BookOpen,
  UserCheck,
  UserX,
  Award,
  AlertTriangle
} from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { StatsCard, GradientStatsCard } from '../StatsCard';
import { CircularProgress, GaugeChart } from '../CircularProgress';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { getPrincipalDashboardData } from '../../data/dashboardMock';

interface PrincipalDashboardProps {
  onNavigate: (view: string) => void;
}

interface DashboardData {
  totalStudents: number;
  totalTeachers: number;
  totalClasses: number;
  totalFleetVehicles: number;
  totalWorkDays: number;
  totalHolidays: number;
  pendingApprovals: number;
  activeTickets: number;
  todayAttendance: {
    present: number;
    absent: number;
    total: number;
    percentage: number;
  };
  classesMarkedAttendance: number;
  classesNotMarkedAttendance: number;
  fleetActive: number;
  fleetCompleted: number;
  upcomingEvents: any[];
  recentActivities: any[];
  overallAttendance: any[];
  overallGrades: any[];
  top3HighestAttendance: any[];
  top3LowestAttendance: any[];
  missedCutoffClasses: any[];
  consecutiveAbsent: any[];
}

const COLORS = ['#4F46E5', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4'];

export const PrincipalDashboard = ({ onNavigate }: PrincipalDashboardProps) => {
  const { t, language } = useLanguage();
  const { user } = useAuth();
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Use mock data instead of API call
      const data = getPrincipalDashboardData();
      setDashboardData(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setLoading(false);
    }
  };

  if (loading || !dashboardData) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const userName = user?.user_metadata?.name || 'Principal';

  return (
    <div className="space-y-8 pb-8">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 rounded-2xl p-8 text-white shadow-xl">
        <h1 className="text-4xl font-bold mb-2">
          {t('dashboard.welcome')}, {userName}
        </h1>
        <p className="text-lg text-white/90">
          {language === 'en' ? 'Principal Dashboard - Overview & Analytics' : 'ప్రిన్సిపాల్ డ్యాష్‌బోర్డ్ - అవలోకనం & విశ్లేషణ'}
        </p>
      </div>

      {/* Totals and Pending Section */}
      <div>
        <h2 className="text-2xl font-bold mb-4">
          {language === 'en' ? 'Overview & Totals' : 'అవలోకనం & మొత్తాలు'}
        </h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <GradientStatsCard
            title={language === 'en' ? 'Total Students' : 'మొత్తం విద్యార్థులు'}
            value={dashboardData.totalStudents}
            subtitle={language === 'en' ? 'Across all classes' : 'అన్ని తరగతులలో'}
            icon={Users}
            color="primary"
            onClick={() => onNavigate('students')}
          />
          <GradientStatsCard
            title={language === 'en' ? 'Total Teachers' : 'మొత్తం ఉపాధ్యాయులు'}
            value={dashboardData.totalTeachers}
            subtitle={language === 'en' ? 'Teaching staff' : 'బోధనా సిబ్బంది'}
            icon={UserCheck}
            color="success"
            onClick={() => onNavigate('teachers')}
          />
          <GradientStatsCard
            title={language === 'en' ? 'Fleet Vehicles' : 'ఫ్లీట్ వాహనాలు'}
            value={dashboardData.totalFleetVehicles}
            subtitle={language === 'en' ? 'Active buses' : 'క్రియాశీల బస్సులు'}
            icon={Bus}
            color="info"
            onClick={() => onNavigate('fleet')}
          />
          <GradientStatsCard
            title={language === 'en' ? 'Work Days' : 'పని దినాలు'}
            value={dashboardData.totalWorkDays}
            subtitle={`${dashboardData.totalHolidays} ${language === 'en' ? 'Holidays' : 'సెలవులు'}`}
            icon={Calendar}
            color="purple"
            onClick={() => onNavigate('events')}
          />
        </div>
      </div>

      {/* Pending Items */}
      <div className="grid gap-4 md:grid-cols-2">
        <StatsCard
          title={language === 'en' ? 'Pending Approvals' : 'పెండింగ్ ఆమోదాలు'}
          value={dashboardData.pendingApprovals}
          subtitle={language === 'en' ? 'Grades awaiting approval' : 'ఆమోదం కోసం వేచి ఉన్న గ్రేడ్‌లు'}
          icon={Award}
          color="warning"
          onClick={() => onNavigate('grades')}
        />
        <StatsCard
          title={language === 'en' ? 'Active Tickets' : 'క్రియాశీల టికెట్లు'}
          value={dashboardData.activeTickets}
          subtitle={language === 'en' ? 'Requires attention' : 'శ్రద్ధ అవసరం'}
          icon={Ticket}
          color="danger"
          onClick={() => onNavigate('tickets')}
        />
      </div>

      {/* Today's Info Section */}
      <div>
        <h2 className="text-2xl font-bold mb-4">
          {language === 'en' ? "Today's Information" : 'నేటి సమాచారం'}
        </h2>
        
        {/* Attendance Info */}
        <Card className="card-3d mb-4">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ClipboardCheck className="w-6 h-6 text-primary" />
              {language === 'en' ? "Today's Attendance" : 'నేటి హాజరు'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-4">
              <div className="flex flex-col items-center">
                <CircularProgress
                  value={dashboardData.todayAttendance.percentage}
                  color="#10B981"
                  label={language === 'en' ? 'Overall Attendance' : 'మొత్తం హాజరు'}
                />
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-4 bg-emerald-50 rounded-xl">
                  <CheckCircle2 className="w-8 h-8 text-emerald-600" />
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {language === 'en' ? 'Present' : 'హాజరు'}
                    </p>
                    <p className="text-2xl font-bold text-emerald-600">
                      {dashboardData.todayAttendance.present}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-red-50 rounded-xl">
                  <UserX className="w-8 h-8 text-red-600" />
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {language === 'en' ? 'Absent' : 'లేరు'}
                    </p>
                    <p className="text-2xl font-bold text-red-600">
                      {dashboardData.todayAttendance.absent}
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-xl">
                  <p className="text-sm text-muted-foreground mb-1">
                    {language === 'en' ? 'Classes Marked' : 'గుర్తించబడిన తరగతులు'}
                  </p>
                  <p className="text-2xl font-bold text-blue-600">
                    {dashboardData.classesMarkedAttendance}
                  </p>
                </div>
                <div className="p-4 bg-amber-50 rounded-xl">
                  <p className="text-sm text-muted-foreground mb-1">
                    {language === 'en' ? 'Not Marked' : 'గుర్తించబడలేదు'}
                  </p>
                  <p className="text-2xl font-bold text-amber-600">
                    {dashboardData.classesNotMarkedAttendance}
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                {dashboardData.missedCutoffClasses.length > 0 && (
                  <div className="p-4 bg-red-50 rounded-xl">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle className="w-5 h-5 text-red-600" />
                      <p className="text-sm text-muted-foreground">
                        {language === 'en' ? 'Missed Cutoff (10:30 AM)' : 'కట్‌ఆఫ్ మిస్ అయింది (10:30 AM)'}
                      </p>
                    </div>
                    <p className="text-xl font-bold text-red-600">
                      {dashboardData.missedCutoffClasses.length} {language === 'en' ? 'Classes' : 'తరగతులు'}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Fleet Status */}
        <Card className="card-3d">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bus className="w-6 h-6 text-primary" />
              {language === 'en' ? 'Fleet Status' : 'ఫ్లీట్ స్థితి'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="p-6 bg-gradient-to-br from-emerald-500 to-emerald-600 text-white rounded-xl shadow-lg">
                <p className="text-white/80 mb-2">
                  {language === 'en' ? 'Completed Trips' : 'పూర్తయిన ట్రిప్‌లు'}
                </p>
                <p className="text-4xl font-bold">{dashboardData.fleetCompleted}</p>
              </div>
              <div className="p-6 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl shadow-lg">
                <p className="text-white/80 mb-2">
                  {language === 'en' ? 'Active Trips' : 'క్రియాశీల ట్రిప్‌లు'}
                </p>
                <p className="text-4xl font-bold">{dashboardData.fleetActive}</p>
              </div>
              <div className="flex items-center justify-center">
                <Button
                  onClick={() => onNavigate('fleet')}
                  className="h-full w-full bg-primary hover:bg-primary/90"
                >
                  {language === 'en' ? 'View Fleet Details →' : 'ఫ్లీట్ వివరాలు చూడండి →'}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alerts Section - Consecutive Absences */}
      {dashboardData.consecutiveAbsent.length > 0 && (
        <Card className="card-3d border-red-200 bg-red-50/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-700">
              <AlertCircle className="w-6 h-6" />
              {language === 'en' ? 'Students Absent for 3+ Consecutive Days' : '3+ వరుస రోజులు లేని విద్యార్థులు'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3">
              {dashboardData.consecutiveAbsent.slice(0, 5).map((student: any, index: number) => (
                <div key={index} className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm">
                  <div>
                    <p className="font-medium">{student.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {student.class} - {student.section} | {language === 'en' ? 'Roll No:' : 'రోల్ నం:'} {student.rollNo}
                    </p>
                  </div>
                  <Badge variant="destructive">
                    {student.consecutiveDays} {language === 'en' ? 'days' : 'రోజులు'}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Analytics Section */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Overall Attendance Dashboard */}
        <Card className="card-3d">
          <CardHeader>
            <CardTitle>{language === 'en' ? 'Overall Attendance Analytics' : 'మొత్తం హాజరు విశ్లేషణ'}</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dashboardData.overallAttendance}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="percentage" fill="#4F46E5" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-4 mt-6">
              {dashboardData.top3HighestAttendance.slice(0, 3).map((cls: any, idx: number) => (
                <div key={idx} className="p-3 bg-emerald-50 rounded-lg">
                  <p className="text-xs text-emerald-700 mb-1">
                    {language === 'en' ? `Top ${idx + 1}` : `టాప్ ${idx + 1}`}
                  </p>
                  <p className="font-medium">{cls.name}</p>
                  <p className="text-sm text-emerald-600 font-bold">{cls.percentage}%</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Overall Grades Dashboard */}
        <Card className="card-3d">
          <CardHeader>
            <CardTitle>{language === 'en' ? 'Overall Grades Analytics' : 'మొత్తం గ్రేడ్‌ల విశ్లేషణ'}</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={dashboardData.overallGrades}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="subject" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="average" 
                  stroke="#10B981" 
                  strokeWidth={3}
                  name={language === 'en' ? 'Average Score' : 'సగటు స్కోర్'}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Events and Recent Activity */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="card-3d">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              {language === 'en' ? 'Upcoming Events' : 'రాబోయే ఈవెంట్లు'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {dashboardData.upcomingEvents.slice(0, 5).map((event: any, index: number) => (
                <div key={index} className="flex items-start gap-3 p-4 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Calendar className="w-5 h-5 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{event.title}</p>
                    <p className="text-sm text-muted-foreground">{event.date}</p>
                    {event.class && (
                      <Badge variant="secondary" className="mt-1">
                        {event.class}
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
              <Button
                variant="outline"
                className="w-full"
                onClick={() => onNavigate('events')}
              >
                {language === 'en' ? 'View All Events →' : 'అన్ని ఈవెంట్లను చూడండి →'}
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="card-3d">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" />
              {t('dashboard.recentActivity')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {dashboardData.recentActivities.slice(0, 5).map((activity: any, index: number) => (
                <div key={index} className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
                  <div className={`p-2 rounded-lg ${
                    activity.type === 'ticket' ? 'bg-blue-100' :
                    activity.type === 'grade' ? 'bg-emerald-100' :
                    activity.type === 'attendance' ? 'bg-amber-100' : 'bg-purple-100'
                  }`}>
                    {activity.type === 'ticket' && <Ticket className="w-5 h-5 text-blue-600" />}
                    {activity.type === 'grade' && <Award className="w-5 h-5 text-emerald-600" />}
                    {activity.type === 'attendance' && <ClipboardCheck className="w-5 h-5 text-amber-600" />}
                    {activity.type === 'event' && <Calendar className="w-5 h-5 text-purple-600" />}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{activity.title}</p>
                    <p className="text-xs text-muted-foreground">{activity.description}</p>
                  </div>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">
                    {activity.time}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};