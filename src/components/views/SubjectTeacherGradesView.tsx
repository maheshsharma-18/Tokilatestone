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
import { GraduationCap, Download, TrendingUp, Save, Send, Edit, ArrowLeft, Users, BookOpen, FileText, AlertCircle, CheckCircle, Clock, Search } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Progress } from '../ui/progress';
import { Textarea } from '../ui/textarea';

type ViewMode = 'enter' | 'history' | 'analytics' | 'editGrades';

interface GradeEntry {
  id: string;
  class: string;
  section: string;
  examCycle: string;
  submittedOn: string;
  status: 'draft' | 'submitted' | 'approved' | 'rejected';
  avgMarks: number;
  comment?: string;
}

export const SubjectTeacherGradesView = () => {
  const { t, language } = useLanguage();
  const [viewMode, setViewMode] = useState<ViewMode>('enter');
  const [selectedClass, setSelectedClass] = useState('10');
  const [selectedSection, setSelectedSection] = useState('A');
  const [selectedExamCycle, setSelectedExamCycle] = useState('Mid-Term 2025');
  const [maxMarks, setMaxMarks] = useState('100');
  const [gradeData, setGradeData] = useState<Record<string, number>>({});
  const [selectedEntry, setSelectedEntry] = useState<GradeEntry | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const mySubject = 'Mathematics';

  // Mock grade entries
  const gradeEntries: GradeEntry[] = [
    {
      id: '1',
      class: '10',
      section: 'A',
      examCycle: 'Mid-Term 2025',
      submittedOn: '2025-01-15',
      status: 'submitted',
      avgMarks: 78.5
    },
    {
      id: '2',
      class: '10',
      section: 'B',
      examCycle: 'Mid-Term 2025',
      submittedOn: '2025-01-14',
      status: 'approved',
      avgMarks: 82.3
    },
    {
      id: '3',
      class: '9',
      section: 'A',
      examCycle: 'Unit Test 1',
      submittedOn: '2025-01-10',
      status: 'rejected',
      avgMarks: 65.2,
      comment: 'Please recheck marks for students with roll numbers 15-20'
    }
  ];

  const classStudents = students.filter(s => s.class === selectedClass && s.section === selectedSection).slice(0, 10);
  
  const draftCount = gradeEntries.filter(g => g.status === 'draft').length;
  const submittedCount = gradeEntries.filter(g => g.status === 'submitted').length;
  const approvedCount = gradeEntries.filter(g => g.status === 'approved').length;
  const rejectedCount = gradeEntries.filter(g => g.status === 'rejected').length;

  // Analytics data
  const classComparison = [
    { class: '10A', avg: 78.5, passRate: 95 },
    { class: '10B', avg: 82.3, passRate: 98 },
    { class: '9A', avg: 75.8, passRate: 92 },
    { class: '9B', avg: 80.1, passRate: 96 }
  ];

  const performanceTrend = [
    { month: 'Sep', avg: 72 },
    { month: 'Oct', avg: 75 },
    { month: 'Nov', avg: 76 },
    { month: 'Dec', avg: 78 },
    { month: 'Jan', avg: 79 }
  ];

  const handleGradeChange = (studentId: string, marks: number) => {
    setGradeData(prev => ({
      ...prev,
      [studentId]: marks
    }));
  };

  const handleSaveDraft = () => {
    toast.success(language === 'en' ? 'Grades saved as draft!' : 'గ్రేడ్‌లు డ్రాఫ్ట్‌గా సేవ్ చేయబడ్డాయి!');
  };

  const handleSubmitGrades = () => {
    const enteredCount = Object.keys(gradeData).length;
    if (enteredCount < classStudents.length) {
      toast.error(language === 'en' 
        ? 'Please enter grades for all students before submitting!' 
        : 'సమర్పించే ముందు అన్ని విద్యార్థులకు గ్రేడ్‌లను నమోదు చేయండి!');
      return;
    }
    toast.success(language === 'en' 
      ? 'Grades submitted successfully for Class Teacher approval!' 
      : 'క్లాస్ టీచర్ ఆమోదం కోసం గ్రేడ్‌లు విజయవంతంగా సమర్పించబడ్డాయి!');
    setGradeData({});
  };

  // EDIT GRADES VIEW
  if (viewMode === 'editGrades' && selectedEntry) {
    const editStudents = students.filter(s => s.class === selectedEntry.class && s.section === selectedEntry.section).slice(0, 10);
    
    return (
      <div className="space-y-6 pb-8">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => setViewMode('history')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            {language === 'en' ? 'Back to History' : 'చరిత్రకు తిరిగి'}
          </Button>
        </div>

        <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-rose-700 rounded-2xl p-8 text-white shadow-xl">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">
                {language === 'en' ? 'Edit Grades' : 'గ్రేడ్‌లను సవరించండి'}
              </h1>
              <p className="text-lg text-white/90">
                {mySubject} - Class {selectedEntry.class}{selectedEntry.section}
              </p>
            </div>
            <Badge variant="secondary" className="text-lg px-4 py-2">
              {selectedEntry.examCycle}
            </Badge>
          </div>
        </div>

        {selectedEntry.status === 'rejected' && selectedEntry.comment && (
          <Card className="card-3d border-red-200 bg-gradient-to-br from-red-50 to-rose-50">
            <CardHeader>
              <div className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-red-600" />
                <CardTitle className="text-red-900">
                  {language === 'en' ? 'Rejection Reason' : 'తిరస్కరణ కారణం'}
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-red-800">{selectedEntry.comment}</p>
            </CardContent>
          </Card>
        )}

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
                  <TableHead className="w-32">{language === 'en' ? 'Marks' : 'మార్కులు'}</TableHead>
                  <TableHead className="w-24">{language === 'en' ? 'Percentage' : 'శాతం'}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {editStudents.map((student) => {
                  const marks = gradeData[student.id] || Math.floor(Math.random() * 30) + 70;
                  
                  return (
                    <TableRow key={student.id} className="hover:bg-purple-50 transition-colors">
                      <TableCell className="font-medium">{student.rollNumber}</TableCell>
                      <TableCell>{language === 'en' ? student.name : student.nameInTelugu || student.name}</TableCell>
                      <TableCell>
                        <Input 
                          type="number" 
                          min="0" 
                          max={maxMarks}
                          value={marks || ''}
                          onChange={(e) => handleGradeChange(student.id, parseInt(e.target.value) || 0)}
                        />
                      </TableCell>
                      <TableCell>
                        <Badge variant={marks >= 90 ? 'default' : marks >= 75 ? 'secondary' : 'destructive'}>
                          {marks}%
                        </Badge>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="card-3d border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50">
          <CardContent className="pt-6">
            <div className="flex gap-4">
              <Button onClick={handleSaveDraft} variant="outline" className="flex-1 gap-2" size="lg">
                <Save className="h-5 w-5" />
                {language === 'en' ? 'Save Draft' : 'డ్రాఫ్ట్ సేవ్ చేయండి'}
              </Button>
              <Button onClick={handleSubmitGrades} className="flex-1 gap-2" size="lg">
                <Send className="h-5 w-5" />
                {language === 'en' ? 'Re-Submit' : 'మళ్లీ సమర్పించండి'}
              </Button>
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
            {language === 'en' ? `Grade Entry - ${mySubject}` : `గ్రేడ్ నమోదు - ${mySubject}`}
          </h1>
          <p className="text-muted-foreground">
            {language === 'en' ? 'Enter and manage grades for your subject across all classes' : 'అన్ని తరగతులలో మీ విషయం కోసం గ్రేడ్‌లను నమోదు చేయండి మరియు నిర్వహించండి'}
          </p>
        </div>
        <Button variant="outline" className="gap-2">
          <Download className="h-4 w-4" />
          {language === 'en' ? 'Export Report' : 'నివేదికను ఎగుమతి చేయండి'}
        </Button>
      </div>

      <Tabs value={viewMode} onValueChange={(val) => setViewMode(val as ViewMode)} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="enter">
            {language === 'en' ? 'Enter Grades' : 'గ్రేడ్‌లను నమోదు చేయండి'}
          </TabsTrigger>
          <TabsTrigger value="history">
            {language === 'en' ? 'Submission History' : 'సమర్పణ చరిత్ర'}
            {rejectedCount > 0 && (
              <Badge className="ml-2" variant="destructive">{rejectedCount}</Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="analytics">
            {language === 'en' ? 'Analytics' : 'విశ్లేషణలు'}
          </TabsTrigger>
        </TabsList>

        {/* ENTER GRADES TAB */}
        <TabsContent value="enter" className="space-y-6">
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
                  <Edit className="h-8 w-8 text-amber-600" />
                  <Badge variant="secondary">{language === 'en' ? 'Draft' : 'డ్రాఫ్ట్'}</Badge>
                </div>
                <p className="text-3xl font-bold">{draftCount}</p>
                <p className="text-sm text-muted-foreground">{language === 'en' ? 'Saved Drafts' : 'సేవ్ చేసిన డ్రాఫ్ట్‌లు'}</p>
              </CardContent>
            </Card>

            <Card className="card-3d hover:shadow-xl transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-2">
                  <Clock className="h-8 w-8 text-purple-600" />
                  <Badge variant="destructive">{language === 'en' ? 'Pending' : 'పెండింగ్'}</Badge>
                </div>
                <p className="text-3xl font-bold">{submittedCount}</p>
                <p className="text-sm text-muted-foreground">{language === 'en' ? 'Under Review' : 'సమీక్షలో'}</p>
              </CardContent>
            </Card>

            <Card className="card-3d hover:shadow-xl transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-2">
                  <CheckCircle className="h-8 w-8 text-emerald-600" />
                  <Badge variant="default">{language === 'en' ? 'Approved' : 'ఆమోదించబడింది'}</Badge>
                </div>
                <p className="text-3xl font-bold">{approvedCount}</p>
                <p className="text-sm text-muted-foreground">{language === 'en' ? 'This Month' : 'ఈ నెల'}</p>
              </CardContent>
            </Card>
          </div>

          <Card className="card-3d">
            <CardHeader>
              <CardTitle>{language === 'en' ? 'Enter Grades' : 'గ్రేడ్‌లను నమోదు చేయండి'}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-4">
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
                  <Label>{language === 'en' ? 'Exam Cycle' : 'పరీక్ష చక్రం'}</Label>
                  <Select value={selectedExamCycle} onValueChange={setSelectedExamCycle}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Mid-Term 2025">Mid-Term 2025</SelectItem>
                      <SelectItem value="Final-Term 2025">Final-Term 2025</SelectItem>
                      <SelectItem value="Unit Test 1">Unit Test 1</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>{language === 'en' ? 'Max Marks' : 'గరిష్ఠ మార్కులు'}</Label>
                  <Input 
                    type="number" 
                    value={maxMarks}
                    onChange={(e) => setMaxMarks(e.target.value)}
                  />
                </div>
              </div>

              <div className="border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-24">{language === 'en' ? 'Roll No' : 'రోల్ నం'}</TableHead>
                      <TableHead>{t('common.name')}</TableHead>
                      <TableHead className="w-32">{language === 'en' ? 'Marks Obtained' : 'పొందిన మార్కులు'}</TableHead>
                      <TableHead className="w-24">{language === 'en' ? 'Percentage' : 'శాతం'}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {classStudents.map(student => {
                      const marks = gradeData[student.id] || 0;
                      const percentage = maxMarks > 0 ? Math.round((marks / parseFloat(maxMarks)) * 100) : 0;
                      
                      return (
                        <TableRow key={student.id} className="hover:bg-blue-50 transition-colors">
                          <TableCell className="font-medium">{student.rollNumber}</TableCell>
                          <TableCell>{language === 'en' ? student.name : student.nameInTelugu || student.name}</TableCell>
                          <TableCell>
                            <Input 
                              type="number" 
                              min="0" 
                              max={maxMarks}
                              value={marks || ''}
                              onChange={(e) => handleGradeChange(student.id, parseInt(e.target.value) || 0)}
                              placeholder="0"
                            />
                          </TableCell>
                          <TableCell>
                            <Badge variant={percentage >= 90 ? 'default' : percentage >= 75 ? 'secondary' : percentage >= 60 ? 'outline' : 'destructive'}>
                              {percentage}%
                            </Badge>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>

              <div className="flex justify-between items-center pt-4 border-t">
                <div className="text-sm text-muted-foreground">
                  {language === 'en' 
                    ? `Entered: ${Object.keys(gradeData).length} / ${classStudents.length} students`
                    : `నమోదు చేయబడింది: ${Object.keys(gradeData).length} / ${classStudents.length} విద్యార్థులు`}
                </div>
                <div className="flex gap-2">
                  <Button onClick={handleSaveDraft} variant="outline" className="gap-2">
                    <Save className="h-4 w-4" />
                    {language === 'en' ? 'Save Draft' : 'డ్రాఫ్ట్ సేవ్ చేయండి'}
                  </Button>
                  <Button onClick={handleSubmitGrades} className="gap-2">
                    <Send className="h-4 w-4" />
                    {language === 'en' ? 'Submit for Approval' : 'ఆమోదం కోసం సమర్పించండి'}
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
                <CardTitle>
                  {language === 'en' ? 'Submission History' : 'సమర్పణ చరిత్ర'}
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
                    <TableHead>{language === 'en' ? 'Exam Cycle' : 'పరీక్ష చక్రం'}</TableHead>
                    <TableHead>{language === 'en' ? 'Average' : 'సగటు'}</TableHead>
                    <TableHead>{language === 'en' ? 'Submitted On' : 'సమర్పించిన తేదీ'}</TableHead>
                    <TableHead>{t('common.status')}</TableHead>
                    <TableHead className="text-right">{language === 'en' ? 'Actions' : 'చర్యలు'}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {gradeEntries.map(entry => (
                    <TableRow key={entry.id} className="hover:bg-blue-50 transition-colors">
                      <TableCell className="font-medium">
                        Class {entry.class}{entry.section}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{entry.examCycle}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={entry.avgMarks >= 80 ? 'default' : 'secondary'}>
                          {entry.avgMarks}%
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {new Date(entry.submittedOn).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant={
                            entry.status === 'approved' ? 'default' : 
                            entry.status === 'rejected' ? 'destructive' : 
                            entry.status === 'submitted' ? 'secondary' : 
                            'outline'
                          }
                        >
                          {entry.status === 'approved' 
                            ? (language === 'en' ? 'Approved' : 'ఆమోదించబడింది')
                            : entry.status === 'rejected'
                            ? (language === 'en' ? 'Rejected' : 'తిరస్కరించబడింది')
                            : entry.status === 'submitted'
                            ? (language === 'en' ? 'Under Review' : 'సమీక్షలో')
                            : (language === 'en' ? 'Draft' : 'డ్రాఫ్ట్')}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        {entry.status === 'rejected' && (
                          <Button 
                            size="sm" 
                            variant="default" 
                            className="gap-1"
                            onClick={() => {
                              setSelectedEntry(entry);
                              setViewMode('editGrades');
                            }}
                          >
                            <Edit className="h-3 w-3" />
                            {language === 'en' ? 'Edit & Resubmit' : 'సవరించి మళ్లీ సమర్పించండి'}
                          </Button>
                        )}
                        {entry.status !== 'rejected' && (
                          <Button size="sm" variant="outline" className="gap-1">
                            <FileText className="h-3 w-3" />
                            {language === 'en' ? 'View' : 'చూడండి'}
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {rejectedCount > 0 && (
            <Card className="card-3d border-red-200 bg-gradient-to-br from-red-50 to-rose-50">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-red-600" />
                  <CardTitle className="text-red-900">
                    {language === 'en' ? 'Action Required' : 'చర్య అవసరం'}
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-red-800">
                  {language === 'en' 
                    ? `You have ${rejectedCount} rejected submission(s) that need to be revised and resubmitted.`
                    : `మీరు సవరించి మళ్లీ సమర్పించాల్సిన ${rejectedCount} తిరస్కరించబడిన సమర్పణ(లు) ఉన్నాయి.`}
                </p>
              </CardContent>
            </Card>
          )}
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
                    <Bar dataKey="avg" fill="#3b82f6" name={language === 'en' ? 'Average' : 'సగటు'} radius={[8, 8, 0, 0]} />
                    <Bar dataKey="passRate" fill="#10b981" name={language === 'en' ? 'Pass Rate' : 'పాస్ రేటు'} radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="card-3d">
              <CardHeader>
                <CardTitle>{language === 'en' ? 'Performance Trend' : 'పనితీరు ధోరణి'}</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={performanceTrend}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="avg" 
                      stroke="#3b82f6" 
                      strokeWidth={3} 
                      name={language === 'en' ? 'Average Marks' : 'సగటు మార్కులు'}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card className="card-3d">
            <CardHeader>
              <CardTitle>{language === 'en' ? 'Student Performance Summary' : 'విద్యార్థి పనితీరు సారాంశం'}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-4">
                <div className="p-6 rounded-xl bg-gradient-to-br from-emerald-50 to-green-50 border border-emerald-200">
                  <div className="flex items-center justify-between mb-2">
                    <GraduationCap className="h-8 w-8 text-emerald-600" />
                    <Badge variant="default">A+</Badge>
                  </div>
                  <p className="text-3xl font-bold">25%</p>
                  <p className="text-sm text-muted-foreground">{language === 'en' ? 'Excellence (90+)' : 'శ్రేష్ఠత (90+)'}</p>
                </div>

                <div className="p-6 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200">
                  <div className="flex items-center justify-between mb-2">
                    <TrendingUp className="h-8 w-8 text-blue-600" />
                    <Badge variant="secondary">A</Badge>
                  </div>
                  <p className="text-3xl font-bold">40%</p>
                  <p className="text-sm text-muted-foreground">{language === 'en' ? 'Good (80-89)' : 'మంచి (80-89)'}</p>
                </div>

                <div className="p-6 rounded-xl bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200">
                  <div className="flex items-center justify-between mb-2">
                    <BookOpen className="h-8 w-8 text-amber-600" />
                    <Badge variant="outline">B</Badge>
                  </div>
                  <p className="text-3xl font-bold">30%</p>
                  <p className="text-sm text-muted-foreground">{language === 'en' ? 'Average (70-79)' : 'సగటు (70-79)'}</p>
                </div>

                <div className="p-6 rounded-xl bg-gradient-to-br from-red-50 to-rose-50 border border-red-200">
                  <div className="flex items-center justify-between mb-2">
                    <AlertCircle className="h-8 w-8 text-red-600" />
                    <Badge variant="destructive">C</Badge>
                  </div>
                  <p className="text-3xl font-bold">5%</p>
                  <p className="text-sm text-muted-foreground">{language === 'en' ? 'Need Support (<70)' : 'మద్దతు అవసరం (<70)'}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};