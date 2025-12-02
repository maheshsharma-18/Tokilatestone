import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAuth } from '../../contexts/AuthContext';
import { 
  GraduationCap, 
  ClipboardCheck, 
  BookOpen,
  Award,
  TrendingUp,
  TrendingDown,
  Calendar,
  Clock,
  Users,
  CheckCircle2
} from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { StatsCard, GradientStatsCard } from '../StatsCard';
import { CircularProgress } from '../CircularProgress';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { getTeacherDashboardData } from '../../data/dashboardMock';

interface TeacherDashboardProps {
  onNavigate: (view: string) => void;
}

interface DashboardData {
  teacherInfo: {
    name: string;
    subjects: string[];
    classes: string[];
    averageScore: number;
    trend: string;
    trendValue: number;
  };
  subjectPerformance: any[];
  recentActivities: any[];
  recentHomework: any[];
  upcomingClasses: any[];
  attendanceMarked: number;
  gradesEntered: number;
}

export const TeacherDashboard = ({ onNavigate }: TeacherDashboardProps) => {
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
      const data = getTeacherDashboardData(user?.id || 'st1');
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

  const teacherName = user?.user_metadata?.name || dashboardData.teacherInfo.name || 'Teacher';

  return (
    <div className="space-y-8 pb-8">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 rounded-2xl p-8 text-white shadow-xl">
        <h1 className="text-4xl font-bold mb-2">
          {t('dashboard.welcome')}, {teacherName}
        </h1>
        <p className="text-lg text-white/90">
          {language === 'en' ? 'Teacher Dashboard - Your Performance & Activities' : 'ఉపాధ్యాయుడు డ్యాష్‌బోర్డ్ - మీ పనితీరు & కార్యకలాపాలు'}
        </p>
      </div>

      {/* Teacher Info Cards */}
      <div>
        <h2 className="text-2xl font-bold mb-4">
          {language === 'en' ? 'Your Teaching Profile' : 'మీ బోధనా ప్రొఫైల్'}
        </h2>
        <Card className="card-3d">
          <CardContent className="pt-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <div className="p-6 bg-gradient-to-br from-indigo-500 to-indigo-600 text-white rounded-2xl shadow-lg">
                <div className="flex items-center gap-3 mb-3">
                  <BookOpen className="w-8 h-8" />
                  <div>
                    <p className="text-white/80 text-sm">
                      {language === 'en' ? 'Subjects Teaching' : 'బోధిస్తున్న విషయాలు'}
                    </p>
                    <p className="text-3xl font-bold">{dashboardData.teacherInfo.subjects.length}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1 mt-3">
                  {dashboardData.teacherInfo.subjects.map((subject, idx) => (
                    <Badge key={idx} variant="secondary" className="bg-white/20 text-white border-0">
                      {subject}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="p-6 bg-gradient-to-br from-emerald-500 to-emerald-600 text-white rounded-2xl shadow-lg">
                <div className="flex items-center gap-3 mb-3">
                  <Users className="w-8 h-8" />
                  <div>
                    <p className="text-white/80 text-sm">
                      {language === 'en' ? 'Classes Teaching' : 'బోధిస్తున్న తరగతులు'}
                    </p>
                    <p className="text-3xl font-bold">{dashboardData.teacherInfo.classes.length}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1 mt-3">
                  {dashboardData.teacherInfo.classes.map((cls, idx) => (
                    <Badge key={idx} variant="secondary" className="bg-white/20 text-white border-0">
                      {cls}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="p-6 bg-gradient-to-br from-amber-500 to-amber-600 text-white rounded-2xl shadow-lg">
                <div className="flex items-center gap-3">
                  <Award className="w-8 h-8" />
                  <div>
                    <p className="text-white/80 text-sm">
                      {language === 'en' ? 'Average Score' : 'సగటు స్కోర్'}
                    </p>
                    <p className="text-3xl font-bold">{dashboardData.teacherInfo.averageScore}%</p>
                  </div>
                </div>
                <p className="text-sm text-white/70 mt-3">
                  {language === 'en' ? 'All subjects combined' : 'అన్ని విషయాలు కలిపి'}
                </p>
              </div>

              <div className="p-6 bg-gradient-to-br from-cyan-500 to-cyan-600 text-white rounded-2xl shadow-lg">
                <div className="flex items-center gap-3">
                  {dashboardData.teacherInfo.trend === 'up' ? (
                    <TrendingUp className="w-8 h-8" />
                  ) : (
                    <TrendingDown className="w-8 h-8" />
                  )}
                  <div>
                    <p className="text-white/80 text-sm">
                      {language === 'en' ? 'Performance Index' : 'పనితీరు సూచిక'}
                    </p>
                    <p className="text-3xl font-bold">
                      {dashboardData.teacherInfo.trend === 'up' ? '+' : ''}
                      {dashboardData.teacherInfo.trendValue}%
                    </p>
                  </div>
                </div>
                <p className="text-sm text-white/70 mt-3">
                  {language === 'en' ? 'vs previous exam' : 'మునుపటి పరీక్షతో పోల్చితే'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-2">
        <StatsCard
          title={language === 'en' ? 'Attendance Marked Today' : 'నేడు హాజరు గుర్తించబడింది'}
          value={dashboardData.attendanceMarked}
          subtitle={language === 'en' ? 'Classes marked' : 'తరగతులు గుర్తించబడ్డాయి'}
          icon={ClipboardCheck}
          color="success"
          onClick={() => onNavigate('attendance')}
        />
        <StatsCard
          title={language === 'en' ? 'Grades Entered This Week' : 'ఈ వారం నమోదు చేసిన గ్రేడ్‌లు'}
          value={dashboardData.gradesEntered}
          subtitle={language === 'en' ? 'Entries completed' : 'నమోదులు పూర్తయ్యాయి'}
          icon={GraduationCap}
          color="info"
          onClick={() => onNavigate('grades')}
        />
      </div>

      {/* Subject Performance */}
      <Card className="card-3d">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="w-6 h-6 text-primary" />
            {language === 'en' ? 'Subject-wise Performance' : 'విషయ వారీగా పనితీరు'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {dashboardData.subjectPerformance.map((subject, idx) => (
              <div key={idx} className="p-4 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex-1">
                    <h4 className="font-bold text-lg">{subject.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {language === 'en' ? 'Classes:' : 'తరగతులు:'} {subject.classes.join(', ')}
                    </p>
                  </div>
                  <div className="text-right">
                    <Badge variant={subject.average >= 75 ? 'default' : 'secondary'} className="text-lg px-4 py-2">
                      {subject.average}%
                    </Badge>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4 mt-4">
                  <div className="p-3 bg-white rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">
                      {language === 'en' ? 'Your Average' : 'మీ సగటు'}
                    </p>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span className="font-bold text-emerald-600">{subject.average}%</span>
                    </div>
                  </div>
                  
                  <div className="p-3 bg-white rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">
                      {language === 'en' ? 'School Average' : 'పాఠశాల సగటు'}
                    </p>
                    <div className="flex items-center gap-2">
                      <Award className="w-4 h-4 text-blue-600" />
                      <span className="font-bold text-blue-600">{subject.schoolAverage}%</span>
                    </div>
                  </div>
                  
                  <div className="p-3 bg-white rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">
                      {language === 'en' ? 'Difference' : 'తేడా'}
                    </p>
                    <div className="flex items-center gap-2">
                      {subject.average >= subject.schoolAverage ? (
                        <TrendingUp className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <TrendingDown className="w-4 h-4 text-red-600" />
                      )}
                      <span className={`font-bold ${subject.average >= subject.schoolAverage ? 'text-emerald-600' : 'text-red-600'}`}>
                        {subject.average >= subject.schoolAverage ? '+' : ''}
                        {subject.average - subject.schoolAverage}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activities and Homework */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="card-3d">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" />
              {language === 'en' ? 'Recent Activity' : 'ఇటీవలి కార్యకలాపాలు'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {dashboardData.recentActivities.map((activity, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
                  <div className={`p-2 rounded-lg ${
                    activity.type === 'grade' ? 'bg-emerald-100' :
                    activity.type === 'attendance' ? 'bg-blue-100' : 'bg-purple-100'
                  }`}>
                    {activity.type === 'grade' && <Award className="w-4 h-4 text-emerald-600" />}
                    {activity.type === 'attendance' && <ClipboardCheck className="w-4 h-4 text-blue-600" />}
                    {activity.type === 'homework' && <BookOpen className="w-4 h-4 text-purple-600" />}
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

        <Card className="card-3d">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-primary" />
              {language === 'en' ? 'Recent Homework Assigned' : 'ఇటీవల కేటాయించిన హోంవర్క్'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {dashboardData.recentHomework.map((hw, idx) => (
                <div key={idx} className="p-4 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">{hw.subject}</h4>
                    <Badge variant="secondary">{hw.class}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{hw.title}</p>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">
                      {language === 'en' ? 'Due:' : 'గడువు:'} {hw.dueDate}
                    </span>
                    <Badge variant="outline" className="text-xs">
                      {hw.submissions || 0} {language === 'en' ? 'submissions' : 'సమర్పణలు'}
                    </Badge>
                  </div>
                </div>
              ))}
              <Button
                variant="outline"
                className="w-full"
                onClick={() => onNavigate('homework')}
              >
                {language === 'en' ? 'View All Homework →' : 'అన్ని హోంవర్క్ చూడండి →'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Classes */}
      <Card className="card-3d">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-primary" />
            {language === 'en' ? 'Upcoming Classes Today' : 'నేడు రాబోయే తరగతులు'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-3">
            {dashboardData.upcomingClasses.map((cls, idx) => (
              <div key={idx} className="p-4 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl border border-indigo-100">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="secondary">{cls.time}</Badge>
                  <Badge variant="outline">{cls.period}</Badge>
                </div>
                <h4 className="font-bold text-lg">{cls.subject}</h4>
                <p className="text-sm text-muted-foreground">{cls.class}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {language === 'en' ? 'Room:' : 'గది:'} {cls.room}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="card-3d">
        <CardHeader>
          <CardTitle>{language === 'en' ? 'Quick Actions' : 'త్వరిత చర్యలు'}</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-4">
          <Button className="w-full justify-start gap-2 h-auto py-4" variant="outline" onClick={() => onNavigate('attendance')}>
            <ClipboardCheck className="h-5 w-5" />
            <div className="text-left">
              <p className="font-medium">{language === 'en' ? 'Mark Attendance' : 'హాజరును గుర్తించండి'}</p>
              <p className="text-xs text-muted-foreground">{language === 'en' ? 'For your classes' : 'మీ తరగతుల కోసం'}</p>
            </div>
          </Button>
          <Button className="w-full justify-start gap-2 h-auto py-4" variant="outline" onClick={() => onNavigate('grades')}>
            <GraduationCap className="h-5 w-5" />
            <div className="text-left">
              <p className="font-medium">{language === 'en' ? 'Enter Grades' : 'గ్రేడ్‌లను నమోదు చేయండి'}</p>
              <p className="text-xs text-muted-foreground">{language === 'en' ? 'Update student marks' : 'విద్యార్థి మార్కులను అప్‌డేట్ చేయండి'}</p>
            </div>
          </Button>
          <Button className="w-full justify-start gap-2 h-auto py-4" variant="outline" onClick={() => onNavigate('homework')}>
            <BookOpen className="h-5 w-5" />
            <div className="text-left">
              <p className="font-medium">{language === 'en' ? 'Assign Homework' : 'హోంవర్క్ కేటాయించండి'}</p>
              <p className="text-xs text-muted-foreground">{language === 'en' ? 'Create assignments' : 'అసైన్‌మెంట్‌లను సృష్టించండి'}</p>
            </div>
          </Button>
          <Button className="w-full justify-start gap-2 h-auto py-4" variant="outline" onClick={() => onNavigate('timetable')}>
            <Calendar className="h-5 w-5" />
            <div className="text-left">
              <p className="font-medium">{language === 'en' ? 'View Timetable' : 'టైమ్‌టేబుల్ చూడండి'}</p>
              <p className="text-xs text-muted-foreground">{language === 'en' ? 'Your schedule' : 'మీ షెడ్యూల్'}</p>
            </div>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};