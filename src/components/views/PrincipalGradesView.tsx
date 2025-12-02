import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { useLanguage } from '../../contexts/LanguageContext';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Badge } from '../ui/badge';
import { students, grades } from '../../data/mockData';
import { GraduationCap, Download, TrendingUp, Check, X, Eye, ArrowLeft, Users, BookOpen, Award, AlertCircle, CheckCircle, Clock, Search } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Progress } from '../ui/progress';

type ViewMode = 'dashboard' | 'approvals' | 'analytics' | 'reviewDetails';

interface GradeSubmission {
  id: string;
  class: string;
  section: string;
  subject: string;
  teacher: string;
  examCycle: string;
  submittedOn: string;
  totalStudents: number;
  avgMarks: number;
  status: 'pending' | 'approved' | 'rejected';
}

export const PrincipalGradesView = () => {
  const { t, language } = useLanguage();
  const [viewMode, setViewMode] = useState<ViewMode>('dashboard');
  const [selectedSubmission, setSelectedSubmission] = useState<GradeSubmission | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Mock grade submissions
  const gradeSubmissions: GradeSubmission[] = [
    {
      id: '1',
      class: '10',
      section: 'A',
      subject: 'Mathematics',
      teacher: 'Mr. Suresh Reddy',
      examCycle: 'Mid-Term 2025',
      submittedOn: '2025-01-15',
      totalStudents: 45,
      avgMarks: 78.5,
      status: 'pending'
    },
    {
      id: '2',
      class: '10',
      section: 'B',
      subject: 'Science',
      teacher: 'Mrs. Kavita Nair',
      examCycle: 'Mid-Term 2025',
      submittedOn: '2025-01-14',
      totalStudents: 42,
      avgMarks: 82.3,
      status: 'pending'
    },
    {
      id: '3',
      class: '9',
      section: 'A',
      subject: 'English',
      teacher: 'Mr. Anil Krishna',
      examCycle: 'Mid-Term 2025',
      submittedOn: '2025-01-13',
      totalStudents: 48,
      avgMarks: 75.8,
      status: 'approved'
    }
  ];

  const pendingApprovals = gradeSubmissions.filter(g => g.status === 'pending');
  const approvedCount = gradeSubmissions.filter(g => g.status === 'approved').length;
  const rejectedCount = gradeSubmissions.filter(g => g.status === 'rejected').length;

  // Analytics data
  const classPerformance = [
    { class: '10A', avg: 78.5, passRate: 95, excellence: 65 },
    { class: '10B', avg: 82.3, passRate: 98, excellence: 70 },
    { class: '9A', avg: 75.8, passRate: 92, excellence: 58 },
    { class: '9B', avg: 80.1, passRate: 96, excellence: 68 }
  ];

  const subjectPerformance = [
    { subject: 'Math', avg: 78, trend: '+5%' },
    { subject: 'Science', avg: 82, trend: '+3%' },
    { subject: 'English', avg: 76, trend: '+2%' },
    { subject: 'Social', avg: 79, trend: '+4%' }
  ];

  const gradeDistribution = [
    { name: 'A+ (90-100)', value: 25, color: '#10b981' },
    { name: 'A (80-89)', value: 30, color: '#3b82f6' },
    { name: 'B (70-79)', value: 25, color: '#f59e0b' },
    { name: 'C (60-69)', value: 15, color: '#ef4444' },
    { name: 'Below 60', value: 5, color: '#dc2626' }
  ];

  const handleApprove = (submissionId: string) => {
    toast.success(language === 'en' ? 'Grades approved successfully!' : 'గ్రేడ్‌లు విజయవంతంగా ఆమోదించబడ్డాయి!');
    setViewMode('dashboard');
  };

  const handleReject = (submissionId: string) => {
    toast.success(language === 'en' ? 'Grades rejected. Teacher will be notified.' : 'గ్రేడ్‌లు తిరస్కరించబడ్డాయి. ఉపాధ్యాయుడికి తెలియజేయబడుతుంది.');
    setViewMode('dashboard');
  };

  // REVIEW DETAILS VIEW
  if (viewMode === 'reviewDetails' && selectedSubmission) {
    const classStudents = students.filter(s => s.class === selectedSubmission.class && s.section === selectedSubmission.section).slice(0, 10);

    return (
      <div className="space-y-6 pb-8">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => setViewMode('approvals')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            {language === 'en' ? 'Back to Approvals' : 'ఆమోదాలకు తిరిగి'}
          </Button>
        </div>

        <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-700 rounded-2xl p-8 text-white shadow-xl">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">
                {language === 'en' ? 'Grade Review' : 'గ్రేడ్ సమీక్ష'}
              </h1>
              <p className="text-lg text-white/90">
                {selectedSubmission.subject} - Class {selectedSubmission.class}{selectedSubmission.section}
              </p>
            </div>
            <Badge variant="secondary" className="text-lg px-4 py-2">
              {selectedSubmission.examCycle}
            </Badge>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-4">
          <Card className="card-3d">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <Users className="h-8 w-8 text-blue-600" />
                <Badge variant="outline">{language === 'en' ? 'Total' : 'మొత్తం'}</Badge>
              </div>
              <p className="text-3xl font-bold">{selectedSubmission.totalStudents}</p>
              <p className="text-sm text-muted-foreground">{language === 'en' ? 'Students' : 'విద్యార్థులు'}</p>
            </CardContent>
          </Card>

          <Card className="card-3d">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <TrendingUp className="h-8 w-8 text-emerald-600" />
                <Badge variant="default">{language === 'en' ? 'Average' : 'సగటు'}</Badge>
              </div>
              <p className="text-3xl font-bold">{selectedSubmission.avgMarks}%</p>
              <p className="text-sm text-muted-foreground">{language === 'en' ? 'Class Average' : 'తరగతి సగటు'}</p>
            </CardContent>
          </Card>

          <Card className="card-3d">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <BookOpen className="h-8 w-8 text-purple-600" />
                <Badge variant="secondary">{language === 'en' ? 'Teacher' : 'ఉపాధ్యాయుడు'}</Badge>
              </div>
              <p className="text-lg font-bold">{selectedSubmission.teacher}</p>
              <p className="text-sm text-muted-foreground">{selectedSubmission.subject}</p>
            </CardContent>
          </Card>

          <Card className="card-3d">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <Clock className="h-8 w-8 text-amber-600" />
                <Badge variant="outline">{language === 'en' ? 'Submitted' : 'సమర్పించబడింది'}</Badge>
              </div>
              <p className="text-lg font-bold">{new Date(selectedSubmission.submittedOn).toLocaleDateString()}</p>
              <p className="text-sm text-muted-foreground">{language === 'en' ? 'Submission Date' : 'సమర్పణ తేదీ'}</p>
            </CardContent>
          </Card>
        </div>

        <Card className="card-3d">
          <CardHeader>
            <CardTitle>{language === 'en' ? 'Student Grades' : 'విద్యార్థుల గ్రేడ్‌లు'}</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{language === 'en' ? 'Roll No' : 'రోల్ నం'}</TableHead>
                  <TableHead>{t('common.name')}</TableHead>
                  <TableHead className="text-center">{language === 'en' ? 'Marks Obtained' : 'పొందిన మార్కులు'}</TableHead>
                  <TableHead className="text-center">{language === 'en' ? 'Percentage' : 'శాతం'}</TableHead>
                  <TableHead className="text-center">{language === 'en' ? 'Grade' : 'గ్రేడ్'}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {classStudents.map((student, idx) => {
                  const marks = Math.floor(Math.random() * 30) + 70;
                  const grade = marks >= 90 ? 'A+' : marks >= 80 ? 'A' : marks >= 70 ? 'B' : 'C';
                  const variant = marks >= 90 ? 'default' : marks >= 80 ? 'secondary' : 'outline';
                  
                  return (
                    <TableRow key={student.id} className="hover:bg-blue-50 transition-colors">
                      <TableCell className="font-medium">{student.rollNumber}</TableCell>
                      <TableCell>{language === 'en' ? student.name : student.nameInTelugu || student.name}</TableCell>
                      <TableCell className="text-center font-bold">{marks}/100</TableCell>
                      <TableCell className="text-center">
                        <Progress value={marks} className="h-2" />
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge variant={variant}>{grade}</Badge>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="card-3d border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50">
          <CardHeader>
            <CardTitle className="text-blue-900">
              {language === 'en' ? 'Approval Decision' : 'ఆమోదం నిర్ణయం'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label>{language === 'en' ? 'Comments / Feedback (Optional)' : 'వ్యాఖ్యలు / అభిప్రాయం (ఐచ్ఛికం)'}</Label>
                <Input 
                  placeholder={language === 'en' ? 'Enter your comments...' : 'మీ వ్యాఖ్యలను నమోదు చేయండి...'} 
                  className="mt-2"
                />
              </div>
              <div className="flex gap-4">
                <Button 
                  onClick={() => handleApprove(selectedSubmission.id)} 
                  className="flex-1 gap-2" 
                  size="lg"
                >
                  <Check className="h-5 w-5" />
                  {language === 'en' ? 'Approve Grades' : 'గ్రేడ్‌లను ఆమోదించండి'}
                </Button>
                <Button 
                  onClick={() => handleReject(selectedSubmission.id)} 
                  variant="destructive" 
                  className="flex-1 gap-2" 
                  size="lg"
                >
                  <X className="h-5 w-5" />
                  {language === 'en' ? 'Reject & Send Back' : 'తిరస్కరించి తిరిగి పంపండి'}
                </Button>
              </div>
            </div>
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
          <h1 className="text-3xl mb-2">{language === 'en' ? 'Grade Management' : 'గ్రేడ్ నిర్వహణ'}</h1>
          <p className="text-muted-foreground">
            {language === 'en' ? 'Review, approve, and analyze student grades across all classes' : 'అన్ని తరగతులలో విద్యార్థుల గ్రేడ్‌లను సమీక్షించండి, ఆమోదించండి మరియు విశ్లేషించండి'}
          </p>
        </div>
        <Button variant="outline" className="gap-2">
          <Download className="h-4 w-4" />
          {language === 'en' ? 'Export Report' : 'నివేదికను ఎగుమతి చేయండి'}
        </Button>
      </div>

      <Tabs value={viewMode} onValueChange={(val) => setViewMode(val as ViewMode)} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="dashboard">
            {language === 'en' ? 'Dashboard' : 'డ్యాష్‌బోర్డ్'}
          </TabsTrigger>
          <TabsTrigger value="approvals">
            {language === 'en' ? 'Approvals' : 'ఆమోదాలు'}
            {pendingApprovals.length > 0 && (
              <Badge className="ml-2" variant="destructive">{pendingApprovals.length}</Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="analytics">
            {language === 'en' ? 'Analytics' : 'విశ్లేషణలు'}
          </TabsTrigger>
        </TabsList>

        {/* DASHBOARD TAB */}
        <TabsContent value="dashboard" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-4">
            <Card className="card-3d hover:shadow-xl transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-2">
                  <AlertCircle className="h-8 w-8 text-amber-600" />
                  <Badge variant="destructive">{language === 'en' ? 'Pending' : 'పెండింగ్'}</Badge>
                </div>
                <p className="text-3xl font-bold">{pendingApprovals.length}</p>
                <p className="text-sm text-muted-foreground">{language === 'en' ? 'Awaiting Approval' : 'ఆమోదం కోసం వేచి ఉంది'}</p>
                <Progress value={(pendingApprovals.length / gradeSubmissions.length) * 100} className="mt-2" />
              </CardContent>
            </Card>

            <Card className="card-3d hover:shadow-xl transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-2">
                  <CheckCircle className="h-8 w-8 text-emerald-600" />
                  <Badge variant="default">{language === 'en' ? 'Approved' : 'ఆమోదించబడింది'}</Badge>
                </div>
                <p className="text-3xl font-bold">{approvedCount}</p>
                <p className="text-sm text-muted-foreground">{language === 'en' ? 'Approved This Month' : 'ఈ నెలలో ఆమోదించబడింది'}</p>
                <Progress value={(approvedCount / gradeSubmissions.length) * 100} className="mt-2" />
              </CardContent>
            </Card>

            <Card className="card-3d hover:shadow-xl transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-2">
                  <TrendingUp className="h-8 w-8 text-blue-600" />
                  <Badge variant="secondary">{language === 'en' ? 'Average' : 'సగటు'}</Badge>
                </div>
                <p className="text-3xl font-bold">79.2%</p>
                <p className="text-sm text-muted-foreground">{language === 'en' ? 'School Average' : 'పాఠశాల సగటు'}</p>
                <Progress value={79.2} className="mt-2" />
              </CardContent>
            </Card>

            <Card className="card-3d hover:shadow-xl transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-2">
                  <Award className="h-8 w-8 text-purple-600" />
                  <Badge variant="outline">{language === 'en' ? 'Excellence' : 'శ్రేష్ఠత'}</Badge>
                </div>
                <p className="text-3xl font-bold">65.5%</p>
                <p className="text-sm text-muted-foreground">{language === 'en' ? 'Excellence Rate' : 'శ్రేష్ఠత రేటు'}</p>
                <Progress value={65.5} className="mt-2" />
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card className="card-3d">
              <CardHeader>
                <CardTitle>{language === 'en' ? 'Class-wise Performance' : 'తరగతి వారీ పనితీరు'}</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={classPerformance}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="class" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="avg" fill="#3b82f6" name={language === 'en' ? 'Average' : 'సగటు'} radius={[8, 8, 0, 0]} />
                    <Bar dataKey="passRate" fill="#10b981" name={language === 'en' ? 'Pass Rate' : 'పాస్ రేటు'} radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="card-3d">
              <CardHeader>
                <CardTitle>{language === 'en' ? 'Grade Distribution' : 'గ్రేడ్ పంపిణీ'}</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={gradeDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={(entry) => `${entry.name}`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {gradeDistribution.map((entry, index) => (
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
              <CardTitle>{language === 'en' ? 'Subject Performance Trends' : 'విషయ పనితీరు ధోరణులు'}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-4">
                {subjectPerformance.map((subject, idx) => (
                  <div 
                    key={idx} 
                    className="p-6 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <BookOpen className="h-6 w-6 text-blue-600" />
                      <Badge variant="default" className="gap-1">
                        {subject.trend}
                      </Badge>
                    </div>
                    <p className="text-2xl font-bold">{subject.avg}%</p>
                    <p className="text-sm text-muted-foreground">{subject.subject}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* APPROVALS TAB */}
        <TabsContent value="approvals" className="space-y-6">
          <Card className="card-3d">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>
                  {language === 'en' ? 'Pending Grade Approvals' : 'పెండింగ్ గ్రేడ్ ఆమోదాలు'}
                </CardTitle>
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
                    <TableHead>{t('common.class')}</TableHead>
                    <TableHead>{t('common.subject')}</TableHead>
                    <TableHead>{language === 'en' ? 'Exam' : 'పరీక్ష'}</TableHead>
                    <TableHead>{language === 'en' ? 'Teacher' : 'ఉపాధ్యాయుడు'}</TableHead>
                    <TableHead>{language === 'en' ? 'Students' : 'విద్యార్థులు'}</TableHead>
                    <TableHead>{language === 'en' ? 'Average' : 'సగటు'}</TableHead>
                    <TableHead>{language === 'en' ? 'Submitted' : 'సమర్పించబడింది'}</TableHead>
                    <TableHead className="text-right">{language === 'en' ? 'Actions' : 'చర్యలు'}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pendingApprovals.map(submission => (
                    <TableRow key={submission.id} className="hover:bg-blue-50 transition-colors">
                      <TableCell className="font-medium">
                        Class {submission.class}{submission.section}
                      </TableCell>
                      <TableCell>{submission.subject}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{submission.examCycle}</Badge>
                      </TableCell>
                      <TableCell>{submission.teacher}</TableCell>
                      <TableCell className="text-center">{submission.totalStudents}</TableCell>
                      <TableCell>
                        <Badge variant={submission.avgMarks >= 80 ? 'default' : 'secondary'}>
                          {submission.avgMarks}%
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {new Date(submission.submittedOn).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button 
                          size="sm" 
                          variant="default" 
                          className="gap-1"
                          onClick={() => {
                            setSelectedSubmission(submission);
                            setViewMode('reviewDetails');
                          }}
                        >
                          <Eye className="h-3 w-3" />
                          {language === 'en' ? 'Review' : 'సమీక్షించండి'}
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
          <Card className="card-3d">
            <CardHeader>
              <CardTitle>{language === 'en' ? 'Teacher Performance Comparison' : 'ఉపాధ్యాయుల పనితీరు పోలిక'}</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t('common.teacher')}</TableHead>
                    <TableHead>{t('common.subject')}</TableHead>
                    <TableHead>{language === 'en' ? 'Classes' : 'తరగతులు'}</TableHead>
                    <TableHead>{language === 'en' ? 'Avg Score' : 'సగటు మార్కులు'}</TableHead>
                    <TableHead>{language === 'en' ? 'Pass Rate' : 'ఉత్తీర్ణత రేటు'}</TableHead>
                    <TableHead>{language === 'en' ? 'Excellence' : 'శ్రేష్ఠత'}</TableHead>
                    <TableHead>{language === 'en' ? 'Performance' : 'పనితీరు'}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    { teacher: 'Mr. Suresh Reddy', subject: 'Mathematics', classes: '10A, 10B', avg: 78.5, passRate: 95, excellence: 70 },
                    { teacher: 'Mrs. Kavita Nair', subject: 'Science', classes: '10A, 10B', avg: 82.3, passRate: 98, excellence: 75 },
                    { teacher: 'Mr. Anil Krishna', subject: 'English', classes: '9A, 9B', avg: 75.8, passRate: 92, excellence: 65 }
                  ].map((row, idx) => (
                    <TableRow key={idx} className="hover:bg-blue-50 transition-colors">
                      <TableCell className="font-medium">{row.teacher}</TableCell>
                      <TableCell>{row.subject}</TableCell>
                      <TableCell>{row.classes}</TableCell>
                      <TableCell>
                        <Badge variant={row.avg >= 80 ? 'default' : 'secondary'}>{row.avg}%</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress value={row.passRate} className="h-2 w-20" />
                          <span className="text-sm">{row.passRate}%</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="default">{row.excellence}%</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={row.avg >= 80 ? 'default' : 'secondary'}>
                          {row.avg >= 80 ? (language === 'en' ? 'Excellent' : 'అద్భుతమైన') : (language === 'en' ? 'Good' : 'మంచి')}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
