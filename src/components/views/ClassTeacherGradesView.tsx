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
import { students } from '../../data/mockData';
import { GraduationCap, Download, TrendingUp, Check, X, Eye, ArrowLeft, Users, BookOpen, FileText, AlertCircle, CheckCircle, Search } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { BarChart, Bar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Progress } from '../ui/progress';

type ViewMode = 'overview' | 'review' | 'reportCards' | 'reviewDetails';

interface SubjectGrade {
  id: string;
  subject: string;
  teacher: string;
  examCycle: string;
  submittedOn: string;
  avgMarks: number;
  status: 'pending' | 'approved' | 'forwarded';
}

export const ClassTeacherGradesView = () => {
  const { t, language } = useLanguage();
  const [viewMode, setViewMode] = useState<ViewMode>('overview');
  const [selectedGrade, setSelectedGrade] = useState<SubjectGrade | null>(null);
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const myClass = '10';
  const mySection = 'A';

  // Mock subject grades for the class
  const subjectGrades: SubjectGrade[] = [
    {
      id: '1',
      subject: 'Mathematics',
      teacher: 'Mr. Suresh Reddy',
      examCycle: 'Mid-Term 2025',
      submittedOn: '2025-01-15',
      avgMarks: 78.5,
      status: 'pending'
    },
    {
      id: '2',
      subject: 'Science',
      teacher: 'Mrs. Kavita Nair',
      examCycle: 'Mid-Term 2025',
      submittedOn: '2025-01-14',
      avgMarks: 82.3,
      status: 'pending'
    },
    {
      id: '3',
      subject: 'English',
      teacher: 'Mr. Anil Krishna',
      examCycle: 'Mid-Term 2025',
      submittedOn: '2025-01-13',
      avgMarks: 75.8,
      status: 'approved'
    },
    {
      id: '4',
      subject: 'Social Studies',
      teacher: 'Mrs. Priya Sharma',
      examCycle: 'Mid-Term 2025',
      submittedOn: '2025-01-12',
      avgMarks: 79.2,
      status: 'forwarded'
    }
  ];

  const classStudents = students.filter(s => s.class === myClass && s.section === mySection).slice(0, 10);
  const pendingReviews = subjectGrades.filter(g => g.status === 'pending');
  const approvedCount = subjectGrades.filter(g => g.status === 'approved' || g.status === 'forwarded').length;

  // Class performance data
  const subjectPerformance = [
    { subject: 'Math', avg: 78.5, highest: 95, lowest: 45 },
    { subject: 'Science', avg: 82.3, highest: 98, lowest: 52 },
    { subject: 'English', avg: 75.8, highest: 92, lowest: 40 },
    { subject: 'Social', avg: 79.2, highest: 96, lowest: 48 }
  ];

  const studentPerformanceRadar = [
    { subject: 'Math', classAvg: 78.5, topStudent: 95 },
    { subject: 'Science', classAvg: 82.3, topStudent: 98 },
    { subject: 'English', classAvg: 75.8, topStudent: 92 },
    { subject: 'Social', classAvg: 79.2, topStudent: 96 }
  ];

  const handleApprove = (gradeId: string) => {
    toast.success(language === 'en' ? 'Grades approved and forwarded to Principal!' : 'గ్రేడ్‌లు ఆమోదించబడ్డాయి మరియు ప్రిన్సిపాల్‌కు పంపబడ్డాయి!');
    setViewMode('overview');
  };

  const handleReject = (gradeId: string) => {
    toast.success(language === 'en' ? 'Grades sent back to teacher for revision.' : 'సవరణ కోసం గ్రేడ్‌లు ఉపాధ్యాయుడికి తిరిగి పంపబడ్డాయి.');
    setViewMode('overview');
  };

  // REVIEW DETAILS VIEW
  if (viewMode === 'reviewDetails' && selectedGrade) {
    return (
      <div className="space-y-6 pb-8">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => setViewMode('review')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            {language === 'en' ? 'Back to Reviews' : 'సమీక్షలకు తిరిగి'}
          </Button>
        </div>

        <div className="bg-gradient-to-r from-emerald-600 via-green-600 to-teal-700 rounded-2xl p-8 text-white shadow-xl">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">
                {language === 'en' ? 'Review Grades' : 'గ్రేడ్‌లను సమీక్షించండి'}
              </h1>
              <p className="text-lg text-white/90">
                {selectedGrade.subject} - Class {myClass}{mySection}
              </p>
            </div>
            <Badge variant="secondary" className="text-lg px-4 py-2">
              {selectedGrade.examCycle}
            </Badge>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card className="card-3d">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <BookOpen className="h-8 w-8 text-emerald-600" />
                <Badge variant="outline">{language === 'en' ? 'Subject' : 'విషయం'}</Badge>
              </div>
              <p className="text-2xl font-bold">{selectedGrade.subject}</p>
              <p className="text-sm text-muted-foreground">{selectedGrade.teacher}</p>
            </CardContent>
          </Card>

          <Card className="card-3d">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <TrendingUp className="h-8 w-8 text-blue-600" />
                <Badge variant="default">{language === 'en' ? 'Average' : 'సగటు'}</Badge>
              </div>
              <p className="text-2xl font-bold">{selectedGrade.avgMarks}%</p>
              <p className="text-sm text-muted-foreground">{language === 'en' ? 'Class Average' : 'తరగతి సగటు'}</p>
            </CardContent>
          </Card>

          <Card className="card-3d">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <Users className="h-8 w-8 text-purple-600" />
                <Badge variant="secondary">{language === 'en' ? 'Total' : 'మొత్తం'}</Badge>
              </div>
              <p className="text-2xl font-bold">{classStudents.length}</p>
              <p className="text-sm text-muted-foreground">{language === 'en' ? 'Students' : 'విద్యార్థులు'}</p>
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
                  <TableHead className="text-center">{language === 'en' ? 'Marks' : 'మార్కులు'}</TableHead>
                  <TableHead className="text-center">{language === 'en' ? 'Percentage' : 'శాతం'}</TableHead>
                  <TableHead className="text-center">{language === 'en' ? 'Grade' : 'గ్రేడ్'}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {classStudents.map((student) => {
                  const marks = Math.floor(Math.random() * 30) + 70;
                  const grade = marks >= 90 ? 'A+' : marks >= 80 ? 'A' : marks >= 70 ? 'B' : 'C';
                  
                  return (
                    <TableRow key={student.id} className="hover:bg-emerald-50 transition-colors">
                      <TableCell className="font-medium">{student.rollNumber}</TableCell>
                      <TableCell>{language === 'en' ? student.name : student.nameInTelugu || student.name}</TableCell>
                      <TableCell className="text-center font-bold">{marks}/100</TableCell>
                      <TableCell className="text-center">
                        <Progress value={marks} className="h-2" />
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge variant={marks >= 90 ? 'default' : marks >= 80 ? 'secondary' : 'outline'}>
                          {grade}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="card-3d border-emerald-200 bg-gradient-to-br from-emerald-50 to-green-50">
          <CardHeader>
            <CardTitle className="text-emerald-900">
              {language === 'en' ? 'Review & Approval' : 'సమీక్ష & ఆమోదం'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label>{language === 'en' ? 'Comments for Principal (Optional)' : 'ప్రిన్సిపాల్ కోసం వ్యాఖ్యలు (ఐచ్ఛికం)'}</Label>
                <Input 
                  placeholder={language === 'en' ? 'Enter your comments...' : 'మీ వ్యాఖ్యలను నమోదు చేయండి...'} 
                  className="mt-2"
                />
              </div>
              <div className="flex gap-4">
                <Button 
                  onClick={() => handleApprove(selectedGrade.id)} 
                  className="flex-1 gap-2" 
                  size="lg"
                >
                  <Check className="h-5 w-5" />
                  {language === 'en' ? 'Approve & Forward' : 'ఆమోదించి పంపండి'}
                </Button>
                <Button 
                  onClick={() => handleReject(selectedGrade.id)} 
                  variant="destructive" 
                  className="flex-1 gap-2" 
                  size="lg"
                >
                  <X className="h-5 w-5" />
                  {language === 'en' ? 'Send Back for Revision' : 'సవరణ కోసం తిరిగి పంపండి'}
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
          <h1 className="text-3xl mb-2">
            {language === 'en' ? `Grade Management - Class ${myClass}${mySection}` : `గ్రేడ్ నిర్వహణ - తరగతి ${myClass}${mySection}`}
          </h1>
          <p className="text-muted-foreground">
            {language === 'en' ? 'Review subject grades and manage class report cards' : 'విషయ గ్రేడ్‌లను సమీక్షించండి మరియు తరగతి నివేదిక కార్డులను నిర్వహించండి'}
          </p>
        </div>
        <Button variant="outline" className="gap-2">
          <Download className="h-4 w-4" />
          {language === 'en' ? 'Export Report' : 'నివేదికను ఎగుమతి చేయండి'}
        </Button>
      </div>

      <Tabs value={viewMode} onValueChange={(val) => setViewMode(val as ViewMode)} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">
            {language === 'en' ? 'Overview' : 'అవలోకనం'}
          </TabsTrigger>
          <TabsTrigger value="review">
            {language === 'en' ? 'Review Grades' : 'గ్రేడ్‌లను సమీక్షించండి'}
            {pendingReviews.length > 0 && (
              <Badge className="ml-2" variant="destructive">{pendingReviews.length}</Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="reportCards">
            {language === 'en' ? 'Report Cards' : 'రిపోర్ట్ కార్డులు'}
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
                <p className="text-3xl font-bold">{classStudents.length}</p>
                <p className="text-sm text-muted-foreground">{language === 'en' ? 'Students' : 'విద్యార్థులు'}</p>
              </CardContent>
            </Card>

            <Card className="card-3d hover:shadow-xl transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-2">
                  <AlertCircle className="h-8 w-8 text-amber-600" />
                  <Badge variant="destructive">{language === 'en' ? 'Pending' : 'పెండింగ్'}</Badge>
                </div>
                <p className="text-3xl font-bold">{pendingReviews.length}</p>
                <p className="text-sm text-muted-foreground">{language === 'en' ? 'Pending Reviews' : 'పెండింగ్ సమీక్షలు'}</p>
              </CardContent>
            </Card>

            <Card className="card-3d hover:shadow-xl transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-2">
                  <CheckCircle className="h-8 w-8 text-emerald-600" />
                  <Badge variant="default">{language === 'en' ? 'Approved' : 'ఆమోదించబడింది'}</Badge>
                </div>
                <p className="text-3xl font-bold">{approvedCount}</p>
                <p className="text-sm text-muted-foreground">{language === 'en' ? 'Subjects Approved' : 'విషయాలు ఆమోదించబడ్డాయి'}</p>
              </CardContent>
            </Card>

            <Card className="card-3d hover:shadow-xl transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-2">
                  <TrendingUp className="h-8 w-8 text-purple-600" />
                  <Badge variant="secondary">{language === 'en' ? 'Average' : 'సగటు'}</Badge>
                </div>
                <p className="text-3xl font-bold">79.0%</p>
                <p className="text-sm text-muted-foreground">{language === 'en' ? 'Class Average' : 'తరగతి సగటు'}</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card className="card-3d">
              <CardHeader>
                <CardTitle>{language === 'en' ? 'Subject-wise Performance' : 'విషయ వారీ పనితీరు'}</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={subjectPerformance}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="subject" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="avg" fill="#10b981" name={language === 'en' ? 'Average' : 'సగటు'} radius={[8, 8, 0, 0]} />
                    <Bar dataKey="highest" fill="#3b82f6" name={language === 'en' ? 'Highest' : 'అత్యధిక'} radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="card-3d">
              <CardHeader>
                <CardTitle>{language === 'en' ? 'Class Performance Radar' : 'తరగతి పనితీరు రాడార్'}</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RadarChart data={studentPerformanceRadar}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="subject" />
                    <PolarRadiusAxis />
                    <Radar name={language === 'en' ? 'Class Avg' : 'తరగతి సగటు'} dataKey="classAvg" stroke="#10b981" fill="#10b981" fillOpacity={0.6} />
                    <Radar name={language === 'en' ? 'Top Student' : 'టాప్ విద్యార్థి'} dataKey="topStudent" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
                    <Legend />
                  </RadarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card className="card-3d">
            <CardHeader>
              <CardTitle>{language === 'en' ? 'Subject Grade Status' : 'విషయ గ్రేడ్ స్థితి'}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                {subjectGrades.map((grade) => (
                  <div 
                    key={grade.id} 
                    className="p-6 rounded-xl bg-gradient-to-br from-emerald-50 to-green-50 border border-emerald-200"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <BookOpen className="h-5 w-5 text-emerald-600" />
                        <span className="font-bold">{grade.subject}</span>
                      </div>
                      <Badge variant={grade.status === 'pending' ? 'destructive' : 'default'}>
                        {grade.status === 'pending' 
                          ? (language === 'en' ? 'Pending' : 'పెండింగ్')
                          : grade.status === 'approved'
                          ? (language === 'en' ? 'Approved' : 'ఆమోదించబడింది')
                          : (language === 'en' ? 'Forwarded' : 'పంపబడింది')}
                      </Badge>
                    </div>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <p>{language === 'en' ? 'Teacher:' : 'ఉపాధ్యాయుడు:'} {grade.teacher}</p>
                      <p>{language === 'en' ? 'Average:' : 'సగటు:'} <span className="font-bold text-foreground">{grade.avgMarks}%</span></p>
                      <p>{language === 'en' ? 'Submitted:' : 'సమర్పించబడింది:'} {new Date(grade.submittedOn).toLocaleDateString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* REVIEW TAB */}
        <TabsContent value="review" className="space-y-6">
          <Card className="card-3d">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>
                  {language === 'en' ? 'Pending Grade Reviews' : 'పెండింగ్ గ్రేడ్ సమీక్షలు'}
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
                    <TableHead>{t('common.subject')}</TableHead>
                    <TableHead>{language === 'en' ? 'Teacher' : 'ఉపాధ్యాయుడు'}</TableHead>
                    <TableHead>{language === 'en' ? 'Exam' : 'పరీక్ష'}</TableHead>
                    <TableHead>{language === 'en' ? 'Average' : 'సగటు'}</TableHead>
                    <TableHead>{language === 'en' ? 'Submitted On' : 'సమర్పించిన తేదీ'}</TableHead>
                    <TableHead className="text-right">{language === 'en' ? 'Actions' : 'చర్యలు'}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pendingReviews.map(grade => (
                    <TableRow key={grade.id} className="hover:bg-emerald-50 transition-colors">
                      <TableCell className="font-medium">{grade.subject}</TableCell>
                      <TableCell>{grade.teacher}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{grade.examCycle}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={grade.avgMarks >= 80 ? 'default' : 'secondary'}>
                          {grade.avgMarks}%
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {new Date(grade.submittedOn).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button 
                          size="sm" 
                          variant="default" 
                          className="gap-1"
                          onClick={() => {
                            setSelectedGrade(grade);
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

        {/* REPORT CARDS TAB */}
        <TabsContent value="reportCards" className="space-y-6">
          <Card className="card-3d">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>
                  {language === 'en' ? 'Student Report Cards' : 'విద్యార్థి రిపోర్ట్ కార్డులు'}
                </CardTitle>
                <div className="flex gap-2">
                  <Select defaultValue="Mid-Term 2025">
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Mid-Term 2025">Mid-Term 2025</SelectItem>
                      <SelectItem value="Final-Term 2025">Final-Term 2025</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" className="gap-2">
                    <FileText className="h-4 w-4" />
                    {language === 'en' ? 'Generate All' : 'అన్ని రూపొందించండి'}
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{language === 'en' ? 'Roll No' : 'రోల్ నం'}</TableHead>
                    <TableHead>{t('common.name')}</TableHead>
                    <TableHead>{language === 'en' ? 'Overall %' : 'మొత్తం %'}</TableHead>
                    <TableHead>{language === 'en' ? 'Grade' : 'గ్రేడ్'}</TableHead>
                    <TableHead>{language === 'en' ? 'Rank' : 'ర్యాంక్'}</TableHead>
                    <TableHead className="text-right">{language === 'en' ? 'Actions' : 'చర్యలు'}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {classStudents.map((student, idx) => {
                    const overall = Math.floor(Math.random() * 20) + 75;
                    const grade = overall >= 90 ? 'A+' : overall >= 80 ? 'A' : overall >= 70 ? 'B' : 'C';
                    
                    return (
                      <TableRow key={student.id} className="hover:bg-blue-50 transition-colors">
                        <TableCell className="font-medium">{student.rollNumber}</TableCell>
                        <TableCell>{language === 'en' ? student.name : student.nameInTelugu || student.name}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Progress value={overall} className="h-2 w-20" />
                            <span className="font-bold">{overall}%</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={overall >= 90 ? 'default' : overall >= 80 ? 'secondary' : 'outline'}>
                            {grade}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">#{idx + 1}</Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button size="sm" variant="outline" className="gap-1">
                            <Eye className="h-3 w-3" />
                            {language === 'en' ? 'View Card' : 'కార్డ్ చూడండి'}
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
