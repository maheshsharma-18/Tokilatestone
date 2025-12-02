import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { useLanguage } from '../../contexts/LanguageContext';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Badge } from '../ui/badge';
import { students } from '../../data/mockData';
import { ClipboardCheck, Download, TrendingUp, AlertTriangle, Users, Eye, ArrowLeft, Search, CheckCircle2, XCircle } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Progress } from '../ui/progress';

type ViewMode = 'overview' | 'analytics' | 'classDetails';

interface ClassData {
  id: string;
  name: string;
  section: string;
  teacher: string;
  totalStudents: number;
  presentToday: number;
  absentToday: number;
  todayPercentage: number;
  weeklyAvg: number;
  monthlyAvg: number;
  yearlyAvg: number;
}

export const PrincipalAttendanceView = () => {
  const { t, language } = useLanguage();
  const [viewMode, setViewMode] = useState<ViewMode>('overview');
  const [selectedClass, setSelectedClass] = useState<ClassData | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [dateFilter, setDateFilter] = useState('today');

  // Mock class data
  const classesData: ClassData[] = [
    {
      id: '1',
      name: 'Class 10',
      section: 'A',
      teacher: 'Mrs. Priya Sharma',
      totalStudents: 45,
      presentToday: 43,
      absentToday: 2,
      todayPercentage: 95.6,
      weeklyAvg: 94.2,
      monthlyAvg: 93.8,
      yearlyAvg: 92.5
    },
    {
      id: '2',
      name: 'Class 10',
      section: 'B',
      teacher: 'Mr. Anil Krishna',
      totalStudents: 42,
      presentToday: 38,
      absentToday: 4,
      todayPercentage: 90.5,
      weeklyAvg: 89.8,
      monthlyAvg: 91.2,
      yearlyAvg: 90.8
    },
    {
      id: '3',
      name: 'Class 9',
      section: 'A',
      teacher: 'Mr. Suresh Reddy',
      totalStudents: 48,
      presentToday: 46,
      absentToday: 2,
      todayPercentage: 95.8,
      weeklyAvg: 95.1,
      monthlyAvg: 94.5,
      yearlyAvg: 93.8
    },
    {
      id: '4',
      name: 'Class 9',
      section: 'B',
      teacher: 'Mrs. Kavita Nair',
      totalStudents: 44,
      presentToday: 40,
      absentToday: 4,
      todayPercentage: 90.9,
      weeklyAvg: 91.5,
      monthlyAvg: 92.0,
      yearlyAvg: 91.2
    }
  ];

  const totalStudents = classesData.reduce((sum, c) => sum + c.totalStudents, 0);
  const totalPresent = classesData.reduce((sum, c) => sum + c.presentToday, 0);
  const totalAbsent = classesData.reduce((sum, c) => sum + c.absentToday, 0);
  const overallPercentage = ((totalPresent / totalStudents) * 100).toFixed(1);

  // Mock alerts
  const lowAttendanceClasses = classesData.filter(c => c.todayPercentage < 92);
  const consecutiveAbsentStudents = [
    { name: 'Ravi Kumar', class: '10A', rollNo: '015', days: 3 },
    { name: 'Sneha Reddy', class: '9B', rollNo: '028', days: 4 }
  ];

  // Analytics data
  const weeklyTrend = [
    { day: 'Mon', attendance: 94.5 },
    { day: 'Tue', attendance: 93.8 },
    { day: 'Wed', attendance: 95.2 },
    { day: 'Thu', attendance: 94.1 },
    { day: 'Fri', attendance: 92.7 },
    { day: 'Sat', attendance: 91.5 }
  ];

  const classComparison = classesData.map(c => ({
    class: `${c.name} ${c.section}`,
    today: c.todayPercentage,
    monthly: c.monthlyAvg
  }));

  const attendanceDistribution = [
    { name: 'Excellent (95-100%)', value: 35, color: '#10b981' },
    { name: 'Good (90-94%)', value: 40, color: '#3b82f6' },
    { name: 'Average (85-89%)', value: 20, color: '#f59e0b' },
    { name: 'Poor (<85%)', value: 5, color: '#ef4444' }
  ];

  const filteredClasses = classesData.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.section.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.teacher.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // CLASS DETAILS VIEW
  if (viewMode === 'classDetails' && selectedClass) {
    const classStudents = students.filter(s => s.class === selectedClass.name.split(' ')[1] && s.section === selectedClass.section).slice(0, 10);

    return (
      <div className="space-y-6 pb-8">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => setViewMode('overview')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            {language === 'en' ? 'Back to Overview' : 'అవలోకనానికి తిరిగి'}
          </Button>
        </div>

        <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-700 rounded-2xl p-8 text-white shadow-xl">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">
                {selectedClass.name} {selectedClass.section}
              </h1>
              <p className="text-lg text-white/90">
                {language === 'en' ? 'Class Teacher:' : 'తరగతి ఉపాధ్యాయుడు:'} {selectedClass.teacher}
              </p>
            </div>
            <Badge variant="secondary" className="text-lg px-4 py-2">
              {selectedClass.todayPercentage}%
            </Badge>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <Card className="card-3d">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <Users className="h-8 w-8 text-blue-600" />
                <Badge variant="outline">{language === 'en' ? 'Total' : 'మొత్తం'}</Badge>
              </div>
              <p className="text-3xl font-bold">{selectedClass.totalStudents}</p>
              <p className="text-sm text-muted-foreground">{language === 'en' ? 'Students' : 'విద్యార్థులు'}</p>
            </CardContent>
          </Card>

          <Card className="card-3d">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <CheckCircle2 className="h-8 w-8 text-emerald-600" />
                <Badge variant="default">{language === 'en' ? 'Present' : 'హాజరు'}</Badge>
              </div>
              <p className="text-3xl font-bold">{selectedClass.presentToday}</p>
              <p className="text-sm text-muted-foreground">{language === 'en' ? 'Today' : 'నేడు'}</p>
            </CardContent>
          </Card>

          <Card className="card-3d">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <XCircle className="h-8 w-8 text-red-600" />
                <Badge variant="destructive">{language === 'en' ? 'Absent' : 'లేరు'}</Badge>
              </div>
              <p className="text-3xl font-bold">{selectedClass.absentToday}</p>
              <p className="text-sm text-muted-foreground">{language === 'en' ? 'Today' : 'నేడు'}</p>
            </CardContent>
          </Card>

          <Card className="card-3d">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <TrendingUp className="h-8 w-8 text-purple-600" />
                <Badge variant="secondary">{language === 'en' ? 'Average' : 'సగటు'}</Badge>
              </div>
              <p className="text-3xl font-bold">{selectedClass.yearlyAvg}%</p>
              <p className="text-sm text-muted-foreground">{language === 'en' ? 'Yearly' : 'వార్షికం'}</p>
            </CardContent>
          </Card>
        </div>

        <Card className="card-3d">
          <CardHeader>
            <CardTitle>{language === 'en' ? 'Student Attendance Details' : 'విద్యార్థి హాజరు వివరాలు'}</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{language === 'en' ? 'Roll No' : 'రోల్ నం'}</TableHead>
                  <TableHead>{t('common.name')}</TableHead>
                  <TableHead>{language === 'en' ? 'Weekly %' : 'వారపు %'}</TableHead>
                  <TableHead>{language === 'en' ? 'Monthly %' : 'నెలవారీ %'}</TableHead>
                  <TableHead>{language === 'en' ? 'Yearly %' : 'వార్షిక %'}</TableHead>
                  <TableHead>{language === 'en' ? 'Last 7 Days' : 'చివరి 7 రోజులు'}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {classStudents.map((student) => {
                  const yearlyPct = Math.floor(Math.random() * 20) + 80;
                  const weekPattern = [1, 1, 1, 0, 1, 1, 1];
                  
                  return (
                    <TableRow key={student.id} className="hover:bg-blue-50 transition-colors">
                      <TableCell className="font-medium">{student.rollNumber}</TableCell>
                      <TableCell>{language === 'en' ? student.name : student.nameInTelugu || student.name}</TableCell>
                      <TableCell>
                        <Badge variant={yearlyPct >= 95 ? 'default' : 'secondary'}>
                          {yearlyPct}%
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={yearlyPct >= 90 ? 'default' : 'secondary'}>
                          {yearlyPct - 2}%
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress value={yearlyPct} className="h-2 w-20" />
                          <span className="text-sm font-medium">{yearlyPct}%</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          {weekPattern.map((val, idx) => (
                            <div 
                              key={idx}
                              className={`w-6 h-6 rounded ${val ? 'bg-emerald-500' : 'bg-red-500'}`}
                              title={val ? 'Present' : 'Absent'}
                            />
                          ))}
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    );
  }

  // MAIN VIEW
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl mb-2">{language === 'en' ? 'Attendance Management' : 'హాజరు నిర్వహణ'}</h1>
          <p className="text-muted-foreground">
            {language === 'en' ? 'Monitor and analyze attendance across all classes' : 'అన్ని తరగతులలో హాజరును పర్యవేక్షించండి మరియు విశ్లేషించండి'}
          </p>
        </div>
        <Button variant="outline" className="gap-2">
          <Download className="h-4 w-4" />
          {language === 'en' ? 'Export Report' : 'నివేదికను ఎగుమతి చేయండి'}
        </Button>
      </div>

      <Tabs value={viewMode} onValueChange={(val) => setViewMode(val as ViewMode)} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="overview">
            {language === 'en' ? 'Overview' : 'అవలోకనం'}
          </TabsTrigger>
          <TabsTrigger value="analytics">
            {language === 'en' ? 'Analytics' : 'విశ్లేషణలు'}
          </TabsTrigger>
        </TabsList>

        {/* OVERVIEW TAB */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-4">
            <Card className="card-3d hover:shadow-xl transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-2">
                  <Users className="h-8 w-8 text-blue-600" />
                  <Badge variant="outline">{language === 'en' ? 'Total' : 'మొత్తం'}</Badge>
                </div>
                <p className="text-3xl font-bold">{totalStudents}</p>
                <p className="text-sm text-muted-foreground">{language === 'en' ? 'Students' : 'విద్యార్థులు'}</p>
                <Progress value={95} className="mt-2" />
              </CardContent>
            </Card>

            <Card className="card-3d hover:shadow-xl transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-2">
                  <CheckCircle2 className="h-8 w-8 text-emerald-600" />
                  <Badge variant="default">{language === 'en' ? 'Present' : 'హాజరు'}</Badge>
                </div>
                <p className="text-3xl font-bold">{totalPresent}</p>
                <p className="text-sm text-muted-foreground">{language === 'en' ? 'Today' : 'నేడు'}</p>
                <Progress value={(totalPresent / totalStudents) * 100} className="mt-2" />
              </CardContent>
            </Card>

            <Card className="card-3d hover:shadow-xl transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-2">
                  <XCircle className="h-8 w-8 text-red-600" />
                  <Badge variant="destructive">{language === 'en' ? 'Absent' : 'లేరు'}</Badge>
                </div>
                <p className="text-3xl font-bold">{totalAbsent}</p>
                <p className="text-sm text-muted-foreground">{language === 'en' ? 'Today' : 'నేడు'}</p>
                <Progress value={(totalAbsent / totalStudents) * 100} className="mt-2" />
              </CardContent>
            </Card>

            <Card className="card-3d hover:shadow-xl transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-2">
                  <TrendingUp className="h-8 w-8 text-purple-600" />
                  <Badge variant="secondary">{language === 'en' ? 'Average' : 'సగటు'}</Badge>
                </div>
                <p className="text-3xl font-bold">{overallPercentage}%</p>
                <p className="text-sm text-muted-foreground">{language === 'en' ? 'Today' : 'నేడు'}</p>
                <Progress value={parseFloat(overallPercentage)} className="mt-2" />
              </CardContent>
            </Card>
          </div>

          {/* Alerts Section */}
          {(lowAttendanceClasses.length > 0 || consecutiveAbsentStudents.length > 0) && (
            <div className="grid gap-4 md:grid-cols-2">
              {lowAttendanceClasses.length > 0 && (
                <Card className="card-3d border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50">
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5 text-amber-600" />
                      <CardTitle className="text-amber-900">
                        {language === 'en' ? 'Low Attendance Classes' : 'తక్కువ హాజరు తరగతులు'}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {lowAttendanceClasses.map((cls) => (
                        <div key={cls.id} className="flex items-center justify-between p-3 bg-white rounded-xl">
                          <div>
                            <p className="font-medium">{cls.name} {cls.section}</p>
                            <p className="text-sm text-muted-foreground">class teacher{cls.teacher}</p>
                          </div>
                          <Badge variant="destructive">{cls.todayPercentage}%</Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {consecutiveAbsentStudents.length > 0 && (
                <Card className="card-3d border-red-200 bg-gradient-to-br from-red-50 to-rose-50">
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5 text-red-600" />
                      <CardTitle className="text-red-900">
                        {language === 'en' ? 'Consecutive Absences' : 'వరుస గైర్హాజరీలు'}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {consecutiveAbsentStudents.map((student, idx) => (
                        <div key={idx} className="flex items-center justify-between p-3 bg-white rounded-xl">
                          <div>
                            <p className="font-medium">{student.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {student.class} - Roll: {student.rollNo}
                            </p>
                          </div>
                          <Badge variant="destructive">
                            {student.days} {language === 'en' ? 'days' : 'రోజులు'}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          )}

          {/* All Classes */}
          <Card className="card-3d">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>{language === 'en' ? 'All Classes' : 'అన్ని తరగతులు'}</CardTitle>
                <div className="relative w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder={language === 'en' ? 'Search classes...' : 'తరగతులను వెతకండి...'}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t('common.class')}</TableHead>
                    <TableHead>{language === 'en' ? 'Class Teacher' : 'తరగతి ఉపాధ్యాయుడు'}</TableHead>
                    <TableHead className="text-center">{language === 'en' ? 'Total' : 'మొత్తం'}</TableHead>
                    <TableHead className="text-center">{language === 'en' ? 'Present' : 'హాజరు'}</TableHead>
                    <TableHead className="text-center">{language === 'en' ? 'Absent' : 'లేరు'}</TableHead>
                    <TableHead className="text-center">{language === 'en' ? "Today's %" : 'నేటి %'}</TableHead>
                    <TableHead className="text-center">{language === 'en' ? 'Monthly Avg' : 'నెలవారీ సగటు'}</TableHead>
                    <TableHead className="text-right">{language === 'en' ? 'Actions' : 'చర్యలు'}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredClasses.map((cls) => (
                    <TableRow key={cls.id} className="hover:bg-blue-50 transition-colors">
                      <TableCell className="font-medium">
                        {cls.name} {cls.section}
                      </TableCell>
                      <TableCell>{cls.teacher}</TableCell>
                      <TableCell className="text-center">{cls.totalStudents}</TableCell>
                      <TableCell className="text-center">
                        <Badge variant="default">{cls.presentToday}</Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge variant="destructive">{cls.absentToday}</Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge variant={cls.todayPercentage >= 95 ? 'default' : cls.todayPercentage >= 90 ? 'secondary' : 'destructive'}>
                          {cls.todayPercentage}%
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="flex items-center justify-center gap-2">
                          <Progress value={cls.monthlyAvg} className="h-2 w-16" />
                          <span className="text-sm">{cls.monthlyAvg}%</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="gap-1"
                          onClick={() => {
                            setSelectedClass(cls);
                            setViewMode('classDetails');
                          }}
                        >
                          <Eye className="h-3 w-3" />
                          {language === 'en' ? 'View' : 'చూడండి'}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ANALYTICS TAB */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="card-3d">
              <CardHeader>
                <CardTitle>{language === 'en' ? 'Weekly Attendance Trend' : 'వారపు హాజరు ధోరణి'}</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={weeklyTrend}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="attendance" 
                      stroke="#3b82f6" 
                      strokeWidth={3} 
                      name={language === 'en' ? 'Attendance %' : 'హాజరు %'}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="card-3d">
              <CardHeader>
                <CardTitle>{language === 'en' ? 'Student Distribution' : 'విద్యార్థుల పంపిణీ'}</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={attendanceDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={(entry) => `${entry.name}`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {attendanceDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card className="card-3d">
            <CardHeader>
              <CardTitle>{language === 'en' ? 'Class-wise Comparison' : 'తరగతి వారీ పోలిక'}</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={classComparison}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="class" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="today" fill="#3b82f6" name={language === 'en' ? "Today's %" : 'నేటి %'} radius={[8, 8, 0, 0]} />
                  <Bar dataKey="monthly" fill="#10b981" name={language === 'en' ? 'Monthly Avg' : 'నెలవారీ సగటు'} radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
