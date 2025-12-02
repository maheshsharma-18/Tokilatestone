import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAuth } from '../../contexts/AuthContext';
import {
  Users,
  ClipboardCheck,
  Calendar,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Search,
  Plus,
  Edit,
  ArrowLeft
} from 'lucide-react';
import { GradientStatsCard, StatsCard } from '../StatsCard';
import { CircularProgress } from '../CircularProgress';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { students, attendanceRecords } from '../../data/mockData';

interface AttendanceManagementProps {
  onBack: () => void;
  onNavigate: (view: string, data?: any) => void;
}

interface AttendanceData {
  totalStudents: number;
  totalClasses: number;
  totalDays: number;
  holidays: number;
  todayInfo: {
    totalPresent: number;
    totalAbsent: number;
    top3Highest: any[];
    top3Lowest: any[];
    missedCutoff: any[];
    consecutiveAbsent: any[];
  };
  allClasses: any[];
}

export function AttendanceManagement({ onBack, onNavigate }: AttendanceManagementProps) {
  const { t, language } = useLanguage();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<AttendanceData | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClass, setSelectedClass] = useState<any>(null);

  useEffect(() => {
    fetchAttendanceData();
  }, []);

  const fetchAttendanceData = async () => {
    try {
      // Use mock data instead of API call
      const uniqueClasses = [...new Set(students.map(s => `${s.class}${s.section}`))];
      
      const allClasses = uniqueClasses.map(cls => {
        const classStudents = students.filter(s => `${s.class}${s.section}` === cls);
        const classAttendance = attendanceRecords.filter(r => {
          const student = students.find(st => st.id === r.studentId);
          return student && `${student.class}${student.section}` === cls;
        });
        
        const presentCount = classAttendance.filter(a => a.status === 'present').length;
        const percentage = classAttendance.length > 0 
          ? Math.round((presentCount / classAttendance.length) * 100) 
          : 0;
        
        return {
          id: cls,
          className: `Class ${cls}`,
          totalStudents: classStudents.length,
          presentToday: presentCount,
          absentToday: classAttendance.length - presentCount,
          attendancePercentage: percentage,
          marked: classAttendance.length > 0,
          students: classStudents
        };
      });
      
      const todayRecords = attendanceRecords;
      const totalPresent = todayRecords.filter(r => r.status === 'present').length;
      const totalAbsent = todayRecords.filter(r => r.status === 'absent').length;
      
      // Sort by attendance percentage
      const sortedByAttendance = [...allClasses].sort((a, b) => 
        b.attendancePercentage - a.attendancePercentage
      );
      
      const attendanceData: AttendanceData = {
        totalStudents: students.length,
        totalClasses: uniqueClasses.length,
        totalDays: 200,
        holidays: 15,
        todayInfo: {
          totalPresent,
          totalAbsent,
          top3Highest: sortedByAttendance.slice(0, 3).map(c => ({
            class: c.className,
            percentage: c.attendancePercentage,
            present: c.presentToday,
            total: c.totalStudents
          })),
          top3Lowest: sortedByAttendance.slice(-3).reverse().map(c => ({
            class: c.className,
            percentage: c.attendancePercentage,
            present: c.presentToday,
            total: c.totalStudents
          })),
          missedCutoff: allClasses.filter(c => c.attendancePercentage < 90).map(c => ({
            class: c.className,
            percentage: c.attendancePercentage,
            teacher: 'Teacher Name'
          })),
          consecutiveAbsent: students.slice(0, 2).map(s => ({
            name: s.name,
            class: `${s.class}${s.section}`,
            days: Math.floor(Math.random() * 3) + 1
          }))
        },
        allClasses
      };
      
      setData(attendanceData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching attendance data:', error);
      setLoading(false);
    }
  };

  if (loading || !data) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading attendance data...</p>
        </div>
      </div>
    );
  }

  if (selectedClass) {
    return (
      <ClassAttendanceDetail
        classData={selectedClass}
        onBack={() => setSelectedClass(null)}
      />
    );
  }

  const filteredClasses = data.allClasses.filter(cls =>
    cls.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (cls.section && cls.section.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            {language === 'en' ? 'Back' : 'వెనుకకు'}
          </Button>
          <div>
            <h1 className="text-3xl font-bold">
              {t('attendance.title')}
            </h1>
            <p className="text-muted-foreground">
              {language === 'en' ? 'Complete attendance analytics and management' : 'పూర్తి హాజరు విశ్లేషణ మరియు నిర్వహణ'}
            </p>
          </div>
        </div>
        <Button 
          className="bg-primary hover:bg-primary/90"
          onClick={() => onNavigate('add-attendance')}
        >
          <Plus className="w-4 h-4 mr-2" />
          {language === 'en' ? 'Mark Attendance' : 'హాజరును గుర్తించండి'}
        </Button>
      </div>

      {/* Overview Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <GradientStatsCard
          title={language === 'en' ? 'Total Students' : 'మొత్తం విద్యార్థులు'}
          value={data.totalStudents}
          icon={Users}
          color="primary"
        />
        <GradientStatsCard
          title={language === 'en' ? 'Total Classes' : 'మొత్తం తరగతులు'}
          value={data.totalClasses}
          icon={ClipboardCheck}
          color="success"
        />
        <GradientStatsCard
          title={language === 'en' ? 'Total Days' : 'మొత్తం రోజులు'}
          value={data.totalDays}
          icon={Calendar}
          color="info"
        />
        <GradientStatsCard
          title={language === 'en' ? 'Holidays/Week Off' : 'సెలవులు/వారపు సెలవు'}
          value={data.holidays}
          icon={Calendar}
          color="warning"
        />
      </div>

      {/* Today's Info */}
      <Card className="card-3d">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ClipboardCheck className="w-6 h-6 text-primary" />
            {language === 'en' ? "Today's Information" : 'నేటి సమాచారం'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="p-6 bg-gradient-to-br from-emerald-500 to-emerald-600 text-white rounded-2xl shadow-lg">
              <p className="text-white/80 mb-2">
                {language === 'en' ? 'Total Present' : 'మొత్తం హాజరు'}
              </p>
              <p className="text-4xl font-bold">{data.todayInfo.totalPresent}</p>
            </div>
            
            <div className="p-6 bg-gradient-to-br from-red-500 to-red-600 text-white rounded-2xl shadow-lg">
              <p className="text-white/80 mb-2">
                {language === 'en' ? 'Total Absent' : 'మొత్తం లేరు'}
              </p>
              <p className="text-4xl font-bold">{data.todayInfo.totalAbsent}</p>
            </div>

            <div className="space-y-3">
              <div className="p-4 bg-emerald-50 rounded-xl">
                <p className="text-xs text-muted-foreground mb-2">
                  {language === 'en' ? 'Top 3 Highest Attendance' : 'టాప్ 3 అత్యధిక హాజరు'}
                </p>
                {data.todayInfo.top3Highest.map((cls, idx) => (
                  <div key={idx} className="flex justify-between items-center mb-1">
                    <span className="text-sm">{cls.name}</span>
                    <span className="text-sm font-bold text-emerald-600">{cls.percentage}%</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <div className="p-4 bg-red-50 rounded-xl">
                <p className="text-xs text-muted-foreground mb-2">
                  {language === 'en' ? 'Top 3 Lowest Attendance' : 'టాప్ 3 తక్కువ హాజరు'}
                </p>
                {data.todayInfo.top3Lowest.map((cls, idx) => (
                  <div key={idx} className="flex justify-between items-center mb-1">
                    <span className="text-sm">{cls.name}</span>
                    <span className="text-sm font-bold text-red-600">{cls.percentage}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Missed Cutoff Alert */}
          {data.todayInfo.missedCutoff.length > 0 && (
            <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-xl">
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle className="w-5 h-5 text-amber-600" />
                <p className="font-medium text-amber-900">
                  {language === 'en' ? 'Classes that missed cutoff time (10:30 AM)' : 'కట్‌ఆఫ్ సమయాన్ని (10:30 AM) మిస్ చేసిన తరగతులు'}
                </p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {data.todayInfo.missedCutoff.map((cls, idx) => (
                  <Badge key={idx} variant="destructive">
                    {cls.name}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Consecutive Absent Alert */}
          {data.todayInfo.consecutiveAbsent.length > 0 && (
            <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl">
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle className="w-5 h-5 text-red-600" />
                <p className="font-medium text-red-900">
                  {language === 'en' ? 'Students absent for 3+ consecutive days (including today)' : '3+ వరుస రోజులు లేని విద్యార్థులు (నేటితో సహా)'}
                </p>
              </div>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {data.todayInfo.consecutiveAbsent.map((student, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-white rounded-lg">
                    <div>
                      <p className="font-medium">{student.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {student.class} - {student.section} | Roll: {student.rollNo}
                      </p>
                    </div>
                    <Badge variant="destructive">
                      {student.consecutiveDays} {language === 'en' ? 'days' : 'రోజులు'}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* All Classes */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">
            {language === 'en' ? 'All Classes' : 'అన్ని తరగతులు'}
          </h2>
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder={language === 'en' ? 'Search classes...' : 'తరగతులను వెతకండి...'}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredClasses.map((cls) => (
            <Card
              key={cls.id}
              className="card-3d cursor-pointer hover:shadow-xl transition-shadow"
              onClick={() => setSelectedClass(cls)}
            >
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{cls.name} {cls.section}</span>
                  <Badge variant={cls.todayPercentage >= 90 ? 'default' : 'secondary'}>
                    {cls.todayPercentage}%
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      {language === 'en' ? "Today's Attendance" : 'నేటి హాజరు'}
                    </span>
                    <span className="font-bold">{cls.todayPercentage}%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      {language === 'en' ? 'Monthly Average' : 'నెలవారీ సగటు'}
                    </span>
                    <span className="font-medium">{cls.monthlyAverage}%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      {language === 'en' ? 'Yearly Average' : 'వార్షిక సగటు'}
                    </span>
                    <span className="font-medium">{cls.yearlyAverage}%</span>
                  </div>
                  <div className="flex items-center gap-2 pt-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span className="text-sm">{cls.presentToday} Present</span>
                    <XCircle className="w-4 h-4 text-red-600 ml-2" />
                    <span className="text-sm">{cls.absentToday} Absent</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

interface ClassAttendanceDetailProps {
  classData: any;
  onBack: () => void;
}

function ClassAttendanceDetail({ classData, onBack }: ClassAttendanceDetailProps) {
  const { language } = useLanguage();
  const [students, setStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchClassStudents();
  }, [classData.id]);

  const fetchClassStudents = async () => {
    try {
      // Use mock data instead of API call
      const classStudentsData = classData.students || [];
      
      // Add attendance data for each student
      const studentsWithAttendance = classStudentsData.map((student: any) => {
        // Generate mock week status (P=Present, A=Absent)
        const weekStatus = ['P', 'P', 'P', 'P', 'P', 'A']; // Monday to Saturday
        
        return {
          ...student,
          rollNo: student.rollNumber,
          weekStatus,
          weeklyPercentage: Math.floor(Math.random() * 20) + 80,
          monthlyPercentage: Math.floor(Math.random() * 20) + 80,
          yearlyPercentage: Math.floor(Math.random() * 20) + 80
        };
      });
      
      setStudents(studentsWithAttendance);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching class students:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Calculate week days (Mon-Sat)
  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          {language === 'en' ? 'Back to All Classes' : 'అన్ని తరగతులకు తిరిగి'}
        </Button>
        <div>
          <h1 className="text-3xl font-bold">{classData.name} {classData.section}</h1>
          <p className="text-muted-foreground">
            {language === 'en' ? 'Class Teacher:' : 'తరగతి ఉపాధ్యాయుడు:'} {classData.classTeacher}
          </p>
        </div>
      </div>

      {/* Class Stats */}
      <div className="grid gap-4 md:grid-cols-6">
        <StatsCard
          title={language === 'en' ? 'Total Students' : 'మొత్తం విద్యార్థులు'}
          value={classData.totalStudents}
          color="primary"
        />
        <StatsCard
          title={language === 'en' ? 'Present Today' : 'నేడు హాజరు'}
          value={classData.presentToday}
          color="success"
        />
        <StatsCard
          title={language === 'en' ? 'Absent Today' : 'నేడు లేరు'}
          value={classData.absentToday}
          color="danger"
        />
        <StatsCard
          title={language === 'en' ? 'Weekly Average' : 'వారపు సగటు'}
          value={`${classData.weeklyAverage}%`}
          color="info"
        />
        <StatsCard
          title={language === 'en' ? 'Monthly Average' : 'నెలవారీ సగటు'}
          value={`${classData.monthlyAverage}%`}
          color="purple"
        />
        <StatsCard
          title={language === 'en' ? 'Yearly Average' : 'వార్షిక సగటు'}
          value={`${classData.yearlyAverage}%`}
          color="warning"
        />
      </div>

      {/* Top & Bottom Students */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="card-3d">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-emerald-600">
              <TrendingUp className="w-5 h-5" />
              {language === 'en' ? 'Top 3 Students - Best Attendance' : 'టాప్ 3 విద్యార్థులు - ఉత్తమ హాజరు'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {students.slice(0, 3).map((student, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-emerald-50 rounded-xl">
                <div>
                  <p className="font-medium">{student.name}</p>
                  <p className="text-sm text-muted-foreground">Roll: {student.rollNo}</p>
                </div>
                <Badge className="bg-emerald-600">
                  {student.yearlyPercentage}%
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="card-3d">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-600">
              <TrendingDown className="w-5 h-5" />
              {language === 'en' ? 'Bottom 3 Students - Needs Attention' : 'బాటమ్ 3 విద్యార్థులు - శ్రద్ధ అవసరం'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {students.slice(-3).reverse().map((student, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-red-50 rounded-xl">
                <div>
                  <p className="font-medium">{student.name}</p>
                  <p className="text-sm text-muted-foreground">Roll: {student.rollNo}</p>
                </div>
                <Badge variant="destructive">
                  {student.yearlyPercentage}%
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Student Details Table */}
      <Card className="card-3d">
        <CardHeader>
          <CardTitle>
            {language === 'en' ? 'Student Attendance Details' : 'విద్యార్థి హాజరు వివరాలు'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3">
                    {language === 'en' ? 'Roll No' : 'రోల్ నం'}
                  </th>
                  <th className="text-left p-3">
                    {language === 'en' ? 'Student Name' : 'విద్యార్థి పేరు'}
                  </th>
                  {weekDays.map(day => (
                    <th key={day} className="text-center p-3">{day}</th>
                  ))}
                  <th className="text-center p-3">
                    {language === 'en' ? 'Weekly %' : 'వారపు %'}
                  </th>
                  <th className="text-center p-3">
                    {language === 'en' ? 'Monthly %' : 'నెలవారీ %'}
                  </th>
                  <th className="text-center p-3">
                    {language === 'en' ? 'Yearly %' : 'వార్షిక %'}
                  </th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student.id} className="border-b hover:bg-gray-50">
                    <td className="p-3">{student.rollNo}</td>
                    <td className="p-3 font-medium">{student.name}</td>
                    {student.weekStatus.map((status: string, idx: number) => (
                      <td key={idx} className="text-center p-3">
                        {status === 'P' ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-600 mx-auto" />
                        ) : status === 'A' ? (
                          <XCircle className="w-5 h-5 text-red-600 mx-auto" />
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </td>
                    ))}
                    <td className="text-center p-3 font-medium">{student.weeklyPercentage}%</td>
                    <td className="text-center p-3 font-medium">{student.monthlyPercentage}%</td>
                    <td className="text-center p-3 font-medium">{student.yearlyPercentage}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}