import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { useLanguage } from '../../contexts/LanguageContext';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Checkbox } from '../ui/checkbox';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Badge } from '../ui/badge';
import { Label } from '../ui/label';
import { students } from '../../data/mockData';
import { ClipboardCheck, Download, Calendar, Users, Save, Send, BookOpen, TrendingUp, CheckCircle2, XCircle, Clock, Search } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Progress } from '../ui/progress';

type ViewMode = 'mark' | 'history' | 'analytics';

interface AttendanceSession {
  id: string;
  class: string;
  section: string;
  period: string;
  date: string;
  present: number;
  absent: number;
  percentage: number;
}

export const SubjectTeacherAttendanceView = () => {
  const { t, language } = useLanguage();
  const [viewMode, setViewMode] = useState<ViewMode>('mark');
  const [selectedClass, setSelectedClass] = useState('10');
  const [selectedSection, setSelectedSection] = useState('A');
  const [selectedPeriod, setSelectedPeriod] = useState('1');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [attendanceData, setAttendanceData] = useState<Record<string, boolean>>({});
  const [searchQuery, setSearchQuery] = useState('');

  const mySubject = 'Mathematics';

  // Mock attendance sessions
  const attendanceSessions: AttendanceSession[] = [
    {
      id: '1',
      class: '10',
      section: 'A',
      period: 'Period 2',
      date: '2025-01-15',
      present: 43,
      absent: 2,
      percentage: 95.6
    },
    {
      id: '2',
      class: '10',
      section: 'B',
      period: 'Period 3',
      date: '2025-01-15',
      present: 40,
      absent: 2,
      percentage: 95.2
    },
    {
      id: '3',
      class: '9',
      section: 'A',
      period: 'Period 4',
      date: '2025-01-14',
      present: 46,
      absent: 2,
      percentage: 95.8
    }
  ];

  const classStudents = students.filter(s => s.class === selectedClass && s.section === selectedSection).slice(0, 12);

  const markedCount = Object.keys(attendanceData).length;
  const presentCount = Object.values(attendanceData).filter(v => v).length;
  const absentCount = Object.values(attendanceData).filter(v => !v).length;

  // Analytics data
  const classComparison = [
    { class: '10A', avg: 95.6, sessions: 24 },
    { class: '10B', avg: 95.2, sessions: 24 },
    { class: '9A', avg: 95.8, sessions: 24 },
    { class: '9B', avg: 94.1, sessions: 24 }
  ];

  const weeklyTrend = [
    { day: 'Mon', attendance: 96.2 },
    { day: 'Tue', attendance: 94.8 },
    { day: 'Wed', attendance: 95.5 },
    { day: 'Thu', attendance: 93.9 },
    { day: 'Fri', attendance: 95.1 },
    { day: 'Sat', attendance: 94.3 }
  ];

  const periodComparison = [
    { period: 'P1', avg: 96.5 },
    { period: 'P2', avg: 95.2 },
    { period: 'P3', avg: 94.8 },
    { period: 'P4', avg: 93.5 },
    { period: 'P5', avg: 92.8 }
  ];

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

  const filteredSessions = attendanceSessions.filter(s =>
    s.class.includes(searchQuery) ||
    s.section.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.period.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl mb-2">
            {language === 'en' ? `Attendance - ${mySubject}` : `హాజరు - ${mySubject}`}
          </h1>
          <p className="text-muted-foreground">
            {language === 'en' ? 'Mark period-wise attendance for your subject classes' : 'మీ విషయ తరగతుల కోసం పీరియడ్ వారీ హాజరును గుర్తించండి'}
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
          <TabsTrigger value="history">
            {language === 'en' ? 'Session History' : 'సెషన్ చరిత్ర'}
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
                  <Badge variant="outline">{language === 'en' ? 'Students' : 'విద్యార్థులు'}</Badge>
                </div>
                <p className="text-3xl font-bold">{classStudents.length}</p>
                <p className="text-sm text-muted-foreground">{language === 'en' ? 'In Class' : 'తరగతిలో'}</p>
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
                  <Clock className="h-8 w-8 text-purple-600" />
                  <Badge variant="secondary">{language === 'en' ? 'Sessions' : 'సెషన్‌లు'}</Badge>
                </div>
                <p className="text-3xl font-bold">{attendanceSessions.length}</p>
                <p className="text-sm text-muted-foreground">{language === 'en' ? 'This Week' : 'ఈ వారం'}</p>
              </CardContent>
            </Card>
          </div>

          <Card className="card-3d">
            <CardHeader>
              <CardTitle>{language === 'en' ? 'Mark Period Attendance' : 'పీరియడ్ హాజరును గుర్తించండి'}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-5">
                <div className="space-y-2">
                  <Label>{t('common.class')}</Label>
                  <Select value={selectedClass} onValueChange={setSelectedClass}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="10">Class 10</SelectItem>
                      <SelectItem value="9">Class 9</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>{t('common.section')}</Label>
                  <Select value={selectedSection} onValueChange={setSelectedSection}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="A">Section A</SelectItem>
                      <SelectItem value="B">Section B</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>{language === 'en' ? 'Period' : 'పీరియడ్'}</Label>
                  <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Period 1</SelectItem>
                      <SelectItem value="2">Period 2</SelectItem>
                      <SelectItem value="3">Period 3</SelectItem>
                      <SelectItem value="4">Period 4</SelectItem>
                      <SelectItem value="5">Period 5</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>{t('common.date')}</Label>
                  <Input 
                    type="date" 
                    value={selectedDate} 
                    onChange={(e) => setSelectedDate(e.target.value)}
                  />
                </div>

                <div className="flex items-end">
                  <Button className="w-full gap-2" onClick={handleMarkAllPresent}>
                    <CheckCircle2 className="h-4 w-4" />
                    {language === 'en' ? 'All Present' : 'అందరూ హాజరు'}
                  </Button>
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
                    {classStudents.map(student => {
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

              <div className="flex justify-between items-center pt-4 border-t">
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
        </TabsContent>

        {/* HISTORY TAB */}
        <TabsContent value="history" className="space-y-6">
          <Card className="card-3d">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>{language === 'en' ? 'Attendance Session History' : 'హాజరు సెషన్ చరిత్ర'}</CardTitle>
                <div className="relative w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder={language === 'en' ? 'Search...' : 'వెతకండి...'}
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
                    <TableHead>{language === 'en' ? 'Date' : 'తేదీ'}</TableHead>
                    <TableHead>{t('common.class')}</TableHead>
                    <TableHead>{language === 'en' ? 'Period' : 'పీరియడ్'}</TableHead>
                    <TableHead className="text-center">{language === 'en' ? 'Present' : 'హాజరు'}</TableHead>
                    <TableHead className="text-center">{language === 'en' ? 'Absent' : 'లేరు'}</TableHead>
                    <TableHead className="text-center">{language === 'en' ? 'Percentage' : 'శాతం'}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSessions.map(session => (
                    <TableRow key={session.id} className="hover:bg-purple-50 transition-colors">
                      <TableCell>{new Date(session.date).toLocaleDateString()}</TableCell>
                      <TableCell className="font-medium">
                        Class {session.class}{session.section}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{session.period}</Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge variant="default">{session.present}</Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge variant="destructive">{session.absent}</Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="flex items-center justify-center gap-2">
                          <Progress value={session.percentage} className="h-2 w-16" />
                          <Badge variant={session.percentage >= 95 ? 'default' : 'secondary'}>
                            {session.percentage}%
                          </Badge>
                        </div>
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
                <CardTitle>{language === 'en' ? 'Class-wise Performance' : 'తరగతి వారీ పనితీరు'}</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={classComparison}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="class" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="avg" fill="#3b82f6" name={language === 'en' ? 'Avg %' : 'సగటు %'} radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="card-3d">
              <CardHeader>
                <CardTitle>{language === 'en' ? 'Weekly Trend' : 'వారపు ధోరణి'}</CardTitle>
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
                      stroke="#10b981" 
                      strokeWidth={3} 
                      name={language === 'en' ? 'Attendance %' : 'హాజరు %'}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card className="card-3d">
            <CardHeader>
              <CardTitle>{language === 'en' ? 'Period-wise Comparison' : 'పీరియడ్ వారీ పోలిక'}</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={periodComparison}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="period" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="avg" fill="#8b5cf6" name={language === 'en' ? 'Average %' : 'సగటు %'} radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-4">
            <div className="p-6 rounded-xl bg-gradient-to-br from-emerald-50 to-green-50 border border-emerald-200 card-3d">
              <div className="flex items-center justify-between mb-2">
                <BookOpen className="h-8 w-8 text-emerald-600" />
                <Badge variant="default">{language === 'en' ? 'Total' : 'మొత్తం'}</Badge>
              </div>
              <p className="text-3xl font-bold">96</p>
              <p className="text-sm text-muted-foreground">{language === 'en' ? 'Sessions Taken' : 'తీసుకున్న సెషన్‌లు'}</p>
            </div>

            <div className="p-6 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 card-3d">
              <div className="flex items-center justify-between mb-2">
                <TrendingUp className="h-8 w-8 text-blue-600" />
                <Badge variant="secondary">{language === 'en' ? 'Average' : 'సగటు'}</Badge>
              </div>
              <p className="text-3xl font-bold">95.2%</p>
              <p className="text-sm text-muted-foreground">{language === 'en' ? 'Overall Average' : 'మొత్తం సగటు'}</p>
            </div>

            <div className="p-6 rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 card-3d">
              <div className="flex items-center justify-between mb-2">
                <Users className="h-8 w-8 text-purple-600" />
                <Badge variant="outline">{language === 'en' ? 'Classes' : 'తరగతులు'}</Badge>
              </div>
              <p className="text-3xl font-bold">4</p>
              <p className="text-sm text-muted-foreground">{language === 'en' ? 'Classes Taught' : 'బోధించిన తరగతులు'}</p>
            </div>

            <div className="p-6 rounded-xl bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 card-3d">
              <div className="flex items-center justify-between mb-2">
                <Clock className="h-8 w-8 text-amber-600" />
                <Badge variant="outline">{language === 'en' ? 'Periods' : 'పీరియడ్‌లు'}</Badge>
              </div>
              <p className="text-3xl font-bold">24</p>
              <p className="text-sm text-muted-foreground">{language === 'en' ? 'Per Week' : 'వారానికి'}</p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
