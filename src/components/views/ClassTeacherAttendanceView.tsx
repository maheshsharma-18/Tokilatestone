import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { useLanguage } from '../../contexts/LanguageContext';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Checkbox } from '../ui/checkbox';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Badge } from '../ui/badge';
import { students } from '../../data/mockData';
import { ClipboardCheck, Download, TrendingUp, TrendingDown, AlertTriangle, Users, Save, Send, Calendar, CheckCircle2, XCircle, Search } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { BarChart, Bar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Progress } from '../ui/progress';

type ViewMode = 'mark' | 'records' | 'analytics';

export const ClassTeacherAttendanceView = () => {
  const { t, language } = useLanguage();
  const [viewMode, setViewMode] = useState<ViewMode>('mark');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [attendanceData, setAttendanceData] = useState<Record<string, boolean>>({});
  const [searchQuery, setSearchQuery] = useState('');

  const myClass = '10';
  const mySection = 'A';
  const classStudents = students.filter(s => s.class === myClass && s.section === mySection).slice(0, 15);

  // Calculate statistics
  const markedCount = Object.keys(attendanceData).length;
  const presentCount = Object.values(attendanceData).filter(v => v).length;
  const absentCount = Object.values(attendanceData).filter(v => !v).length;
  const presentPercentage = markedCount > 0 ? ((presentCount / markedCount) * 100).toFixed(1) : '0';

  // Mock weekly data
  const weeklyData = [
    { day: 'Mon', present: 44, absent: 1 },
    { day: 'Tue', present: 43, absent: 2 },
    { day: 'Wed', present: 45, absent: 0 },
    { day: 'Thu', present: 42, absent: 3 },
    { day: 'Fri', present: 44, absent: 1 },
    { day: 'Sat', present: 43, absent: 2 }
  ];

  const studentPerformance = [
    { name: 'Week 1', avg: 95.6 },
    { name: 'Week 2', avg: 94.2 },
    { name: 'Week 3', avg: 96.1 },
    { name: 'Week 4', avg: 93.8 }
  ];

  const subjectWiseAttendance = [
    { subject: 'Math', attendance: 94.5 },
    { subject: 'Science', attendance: 96.2 },
    { subject: 'English', attendance: 93.8 },
    { subject: 'Social', attendance: 95.1 },
    { subject: 'Hindi', attendance: 92.7 }
  ];

  // Low attendance students
  const lowAttendanceStudents = classStudents.filter((_, idx) => idx % 5 === 0).slice(0, 3);

  const handleAttendanceChange = (studentId: string, isPresent: boolean) => {
    setAttendanceData(prev => ({
      ...prev,
      [studentId]: isPresent
    }));
  };

  const handleMarkAllPresent = () => {
    const allPresent: Record<string, boolean> = {};
    classStudents.forEach(student => {
      allPresent[student.id] = true;
    });
    setAttendanceData(allPresent);
    toast.success(language === 'en' ? 'All students marked present!' : 'అన్ని విద్యార్థులు హాజరుగా గుర్తించబడ్డారు!');
  };

  const handleSaveDraft = () => {
    toast.success(language === 'en' ? 'Attendance saved as draft!' : 'హాజరు డ్రాఫ్ట్‌గా సేవ్ చేయబడింది!');
  };

  const handleSubmit = () => {
    if (markedCount < classStudents.length) {
      toast.error(language === 'en' 
        ? 'Please mark attendance for all students!' 
        : 'దయచేసి అన్ని విద్యార్థుల హాజరును గుర్తించండి!');
      return;
    }
    toast.success(language === 'en' 
      ? 'Attendance submitted successfully!' 
      : 'హాజరు విజయవంతంగా సమర్పించబడింది!');
    setAttendanceData({});
  };

  const getStudentAttendanceRate = (studentId: string) => {
    return Math.floor(Math.random() * 20) + 80;
  };

  const filteredStudents = classStudents.filter(s =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.rollNumber.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl mb-2">
            {language === 'en' ? `Attendance - Class ${myClass}${mySection}` : `హాజరు - తరగతి ${myClass}${mySection}`}
          </h1>
          <p className="text-muted-foreground">
            {language === 'en' ? 'Mark and track your class attendance' : 'మీ తరగతి హాజరును గుర్తించండి మరియు ట్రాక్ చేయండి'}
          </p>
        </div>
        <Button variant="outline" className="gap-2">
          <Download className="h-4 w-4" />
          {language === 'en' ? 'Export Report' : 'నివేదికను ఎగుమతి చేయండి'}
        </Button>
      </div>

      <Tabs value={viewMode} onValueChange={(val) => setViewMode(val as ViewMode)} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="mark">
            {language === 'en' ? 'Mark Attendance' : 'హాజరును గుర్తించండి'}
          </TabsTrigger>
          <TabsTrigger value="records">
            {language === 'en' ? 'Records' : 'రికార్డులు'}
          </TabsTrigger>
          <TabsTrigger value="analytics">
            {language === 'en' ? 'Analytics' : 'విశ్లేషణలు'}
          </TabsTrigger>
        </TabsList>

        {/* MARK ATTENDANCE TAB */}
        <TabsContent value="mark" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-4">
            <Card className="card-3d hover:shadow-xl transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-2">
                  <Users className="h-8 w-8 text-blue-600" />
                  <Badge variant="outline">{language === 'en' ? 'Total' : 'మొత్తం'}</Badge>
                </div>
                <p className="text-3xl font-bold">{classStudents.length}</p>
                <p className="text-sm text-muted-foreground">{language === 'en' ? 'Students' : 'విద్యార్థులు'}</p>
              </CardContent>
            </Card>

            <Card className="card-3d hover:shadow-xl transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-2">
                  <CheckCircle2 className="h-8 w-8 text-emerald-600" />
                  <Badge variant="default">{language === 'en' ? 'Present' : 'హాజరు'}</Badge>
                </div>
                <p className="text-3xl font-bold">{presentCount}</p>
                <p className="text-sm text-muted-foreground">{language === 'en' ? 'Marked' : 'గుర్తించబడింది'}</p>
              </CardContent>
            </Card>

            <Card className="card-3d hover:shadow-xl transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-2">
                  <XCircle className="h-8 w-8 text-red-600" />
                  <Badge variant="destructive">{language === 'en' ? 'Absent' : 'లేరు'}</Badge>
                </div>
                <p className="text-3xl font-bold">{absentCount}</p>
                <p className="text-sm text-muted-foreground">{language === 'en' ? 'Marked' : 'గుర్తించబడింది'}</p>
              </CardContent>
            </Card>

            <Card className="card-3d hover:shadow-xl transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-2">
                  <TrendingUp className="h-8 w-8 text-purple-600" />
                  <Badge variant="secondary">{language === 'en' ? 'Progress' : 'పురోగతి'}</Badge>
                </div>
                <p className="text-3xl font-bold">{markedCount}/{classStudents.length}</p>
                <p className="text-sm text-muted-foreground">{language === 'en' ? 'Completed' : 'పూర్తయింది'}</p>
              </CardContent>
            </Card>
          </div>

          <Card className="card-3d">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>{language === 'en' ? 'Mark Today\'s Attendance' : 'నేటి హాజరును గుర్తించండి'}</CardTitle>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <Input 
                    type="date" 
                    value={selectedDate} 
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-48"
                  />
                  <Button variant="outline" onClick={handleMarkAllPresent}>
                    {language === 'en' ? 'Mark All Present' : 'అందరూ హాజరు'}
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder={language === 'en' ? 'Search students...' : 'విద్యార్థులను వెతకండి...'}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>
              </div>

              <div className="border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-24">{language === 'en' ? 'Roll No' : 'రోల్ నం'}</TableHead>
                      <TableHead>{t('common.name')}</TableHead>
                      <TableHead className="text-center w-32">{t('common.present')}</TableHead>
                      <TableHead className="text-center w-32">{t('common.absent')}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredStudents.map(student => {
                      const isPresent = attendanceData[student.id] !== undefined 
                        ? attendanceData[student.id] 
                        : undefined;
                      
                      return (
                        <TableRow 
                          key={student.id}
                          className={`hover:bg-blue-50 transition-colors ${
                            isPresent === true ? 'bg-emerald-50' : 
                            isPresent === false ? 'bg-red-50' : ''
                          }`}
                        >
                          <TableCell className="font-medium">{student.rollNumber}</TableCell>
                          <TableCell>{language === 'en' ? student.name : student.nameInTelugu || student.name}</TableCell>
                          <TableCell className="text-center">
                            <div className="flex justify-center">
                              <Checkbox 
                                checked={isPresent === true}
                                onCheckedChange={() => handleAttendanceChange(student.id, true)}
                              />
                            </div>
                          </TableCell>
                          <TableCell className="text-center">
                            <div className="flex justify-center">
                              <Checkbox 
                                checked={isPresent === false}
                                onCheckedChange={() => handleAttendanceChange(student.id, false)}
                              />
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>

              <div className="flex justify-between items-center pt-6 border-t mt-6">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">
                    {language === 'en' 
                      ? `Marked: ${markedCount} / ${classStudents.length} students`
                      : `గుర్తించబడింది: ${markedCount} / ${classStudents.length} విద్యార్థులు`}
                  </p>
                  <p className="text-sm">
                    {language === 'en' ? 'Present:' : 'హాజరు:'} <span className="font-bold text-emerald-600">{presentCount}</span> | 
                    {language === 'en' ? ' Absent:' : ' లేరు:'} <span className="font-bold text-red-600">{absentCount}</span>
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button onClick={handleSaveDraft} variant="outline" className="gap-2">
                    <Save className="h-4 w-4" />
                    {language === 'en' ? 'Save Draft' : 'డ్రాఫ్ట్ సేవ్ చేయండి'}
                  </Button>
                  <Button onClick={handleSubmit} className="gap-2">
                    <Send className="h-4 w-4" />
                    {t('common.submit')}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {lowAttendanceStudents.length > 0 && (
            <Card className="card-3d border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-amber-600" />
                  <CardTitle className="text-amber-900">
                    {language === 'en' ? 'Students Requiring Attention' : 'శ్రద్ధ అవసరమైన విద్యార్థులు'}
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {lowAttendanceStudents.map((student) => {
                    const rate = getStudentAttendanceRate(student.id);
                    return (
                      <div key={student.id} className="flex items-center justify-between p-3 bg-white rounded-xl">
                        <div>
                          <p className="font-medium">{language === 'en' ? student.name : student.nameInTelugu || student.name}</p>
                          <p className="text-sm text-muted-foreground">Roll: {student.rollNumber}</p>
                        </div>
                        <Badge variant="destructive">{rate}%</Badge>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* RECORDS TAB */}
        <TabsContent value="records" className="space-y-6">
          <Card className="card-3d">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>{language === 'en' ? 'Student Attendance Records' : 'విద్యార్థి హాజరు రికార్డులు'}</CardTitle>
                <div className="relative w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder={language === 'en' ? 'Search students...' : 'విద్యార్థులను వెతకండి...'}
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
                    <TableHead>{language === 'en' ? 'Roll No' : 'రోల్ నం'}</TableHead>
                    <TableHead>{t('common.name')}</TableHead>
                    <TableHead>{language === 'en' ? 'Weekly %' : 'వారపు %'}</TableHead>
                    <TableHead>{language === 'en' ? 'Monthly %' : 'నెలవారీ %'}</TableHead>
                    <TableHead>{language === 'en' ? 'Yearly %' : 'వార్షిక %'}</TableHead>
                    <TableHead>{language === 'en' ? 'Last 7 Days' : 'చివరి 7 రోజులు'}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {classStudents.map(student => {
                    const attendanceRate = getStudentAttendanceRate(student.id);
                    const weekPattern = [1, 1, 0, 1, 1, 1, 1];
                    
                    return (
                      <TableRow key={student.id} className="hover:bg-emerald-50 transition-colors">
                        <TableCell className="font-medium">{student.rollNumber}</TableCell>
                        <TableCell>{language === 'en' ? student.name : student.nameInTelugu || student.name}</TableCell>
                        <TableCell>
                          <Badge variant={attendanceRate >= 95 ? 'default' : attendanceRate >= 85 ? 'secondary' : 'destructive'}>
                            {attendanceRate}%
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={attendanceRate >= 90 ? 'default' : 'secondary'}>
                            {attendanceRate - 2}%
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Progress value={attendanceRate} className="h-2 w-20" />
                            <span className="text-sm font-medium">{attendanceRate}%</span>
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
                  <BarChart data={weeklyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="present" fill="#10b981" name={language === 'en' ? 'Present' : 'హాజరు'} radius={[8, 8, 0, 0]} />
                    <Bar dataKey="absent" fill="#ef4444" name={language === 'en' ? 'Absent' : 'లేరు'} radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="card-3d">
              <CardHeader>
                <CardTitle>{language === 'en' ? 'Subject-wise Attendance' : 'విషయ వారీ హాజరు'}</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RadarChart data={subjectWiseAttendance}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="subject" />
                    <PolarRadiusAxis />
                    <Radar 
                      name={language === 'en' ? 'Attendance %' : 'హాజరు %'} 
                      dataKey="attendance" 
                      stroke="#3b82f6" 
                      fill="#3b82f6" 
                      fillOpacity={0.6} 
                    />
                    <Legend />
                  </RadarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card className="card-3d">
            <CardHeader>
              <CardTitle>{language === 'en' ? 'Monthly Performance' : 'నెలవారీ పనితీరు'}</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={studentPerformance}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="avg" fill="#3b82f6" name={language === 'en' ? 'Average %' : 'సగటు %'} radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card className="card-3d">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-emerald-600">
                  <TrendingUp className="w-5 h-5" />
                  {language === 'en' ? 'Top 3 Students' : 'టాప్ 3 విద్యార్థులు'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {classStudents.slice(0, 3).map((student, idx) => {
                  const rate = 95 + idx;
                  return (
                    <div key={idx} className="flex items-center justify-between p-4 bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl border border-emerald-200">
                      <div>
                        <p className="font-medium">{language === 'en' ? student.name : student.nameInTelugu || student.name}</p>
                        <p className="text-sm text-muted-foreground">Roll: {student.rollNumber}</p>
                      </div>
                      <Badge className="bg-emerald-600">{rate}%</Badge>
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            <Card className="card-3d">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-red-600">
                  <TrendingDown className="w-5 h-5" />
                  {language === 'en' ? 'Needs Attention' : 'శ్రద్ధ అవసరం'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {classStudents.slice(-3).reverse().map((student, idx) => {
                  const rate = 80 - idx * 3;
                  return (
                    <div key={idx} className="flex items-center justify-between p-4 bg-gradient-to-br from-red-50 to-rose-50 rounded-xl border border-red-200">
                      <div>
                        <p className="font-medium">{language === 'en' ? student.name : student.nameInTelugu || student.name}</p>
                        <p className="text-sm text-muted-foreground">Roll: {student.rollNumber}</p>
                      </div>
                      <Badge variant="destructive">{rate}%</Badge>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
