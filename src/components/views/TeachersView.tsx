import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAuth } from '../../contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import {
  Users,
  GraduationCap,
  TrendingUp,
  TrendingDown,
  Search,
  Plus,
  Edit,
  BookOpen,
  Award,
  ArrowLeft,
  Mail,
  Phone,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { GradientStatsCard, StatsCard } from '../StatsCard';
import { users } from '../../data/mockData';

interface TeachersViewProps {
  onBack: () => void;
  onNavigate: (view: string, data?: any) => void;
}

export function TeachersView({ onBack, onNavigate }: TeachersViewProps) {
  const { language } = useLanguage();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [teachers, setTeachers] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTeacher, setSelectedTeacher] = useState<any>(null);

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    try {
      // Use mock data instead of API call
      const teacherData = users.filter(u => 
        ['class_teacher', 'subject_teacher'].includes(u.role)
      ).map(teacher => ({
        id: teacher.id,
        name: teacher.name,
        nameInTelugu: teacher.nameInTelugu || teacher.name,
        email: teacher.email || `${teacher.id}@school.edu`,
        phone: teacher.phone,
        role: teacher.role,
        staffId: teacher.staffId,
        subjects: teacher.assignedSubjects || [],
        classes: teacher.assignedClasses || [],
        isClassTeacher: teacher.isClassTeacher || false,
        classTeacherFor: teacher.classTeacherFor,
        performance: Math.floor(Math.random() * 20) + 80, // 80-100
        attendanceRate: Math.floor(Math.random() * 10) + 90, // 90-100
        gradesPending: Math.floor(Math.random() * 5),
        studentsCount: (teacher.assignedClasses || []).length * 45
      }));
      setTeachers(teacherData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching teachers:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading teachers...</p>
        </div>
      </div>
    );
  }

  if (selectedTeacher) {
    return (
      <TeacherDetail
        teacher={selectedTeacher}
        onBack={() => setSelectedTeacher(null)}
      />
    );
  }

  const filteredTeachers = teachers.filter(teacher =>
    teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    teacher.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (teacher.subjects && teacher.subjects.some((s: string) => 
      s.toLowerCase().includes(searchTerm.toLowerCase())
    ))
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-3xl">{language === 'en' ? 'Teachers Management' : 'ఉపాధ్యాయుల నిర్వహణ'}</h1>
            <p className="text-muted-foreground">
              {language === 'en' ? 'Manage teaching staff and their assignments' : 'బోధనా సిబ్బందిని మరియు వారి అసైన్మెంట్లను నిర్వహించండి'}
            </p>
          </div>
        </div>
        {(user?.role === 'principal' || user?.role === 'vice_principal') && (
          <Button onClick={() => onNavigate('onboard-teacher')} className="gap-2">
            <Plus className="h-4 w-4" />
            {language === 'en' ? 'Add Teacher' : 'ఉపాధ్యాయుడిని జోడించండి'}
          </Button>
        )}
      </div>

      {/* Search */}
      <div className="relative w-full md:w-96">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder={language === 'en' ? 'Search teachers by name, email, or subject...' : 'పేరు, ఇమెయిల్ లేదా విషయం ద్వారా ఉపాధ్యాయులను వెతకండి...'}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Teachers Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredTeachers.map((teacher) => (
          <Card
            key={teacher.id}
            className="card-3d cursor-pointer hover:shadow-xl transition-all"
            onClick={() => setSelectedTeacher(teacher)}
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xl font-bold">
                    {teacher.name.charAt(0)}
                  </div>
                  <div>
                    <CardTitle className="text-lg">{teacher.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {teacher.isClassTeacher ? (
                        <Badge variant="secondary" className="mt-1">
                          {language === 'en' ? 'Class Teacher' : 'తరగతి ఉపాధ్యాయుడు'}
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="mt-1">
                          {language === 'en' ? 'Subject Teacher' : 'విషయ ఉపాధ్యాయుడు'}
                        </Badge>
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="w-4 h-4" />
                <span className="truncate">{teacher.email}</span>
              </div>
              {teacher.phone && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Phone className="w-4 h-4" />
                  <span>{teacher.phone}</span>
                </div>
              )}
              
              <div className="pt-2 border-t">
                <p className="text-xs text-muted-foreground mb-2">
                  {language === 'en' ? 'Subjects Teaching' : 'బోధిస్తున్న విషయాలు'}
                </p>
                <div className="flex flex-wrap gap-1">
                  {teacher.subjects?.map((subject: string, idx: number) => (
                    <Badge key={idx} variant="secondary" className="text-xs">
                      {subject}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="pt-2 border-t">
                <p className="text-xs text-muted-foreground mb-2">
                  {language === 'en' ? 'Classes Teaching' : 'బోధిస్తున్న తరగతులు'}
                </p>
                <div className="flex flex-wrap gap-1">
                  {teacher.classes?.map((cls: string, idx: number) => (
                    <Badge key={idx} variant="outline" className="text-xs">
                      {cls}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-3">
                <div className="p-3 bg-emerald-50 rounded-xl">
                  <p className="text-xs text-muted-foreground">
                    {language === 'en' ? 'Avg Score' : 'సగటు స్కోర్'}
                  </p>
                  <p className="text-xl font-bold text-emerald-600">
                    {teacher.averageScore || 0}%
                  </p>
                </div>
                <div className="p-3 bg-blue-50 rounded-xl">
                  <p className="text-xs text-muted-foreground">
                    {language === 'en' ? 'Performance' : 'పనితీరు'}
                  </p>
                  <div className="flex items-center gap-1">
                    {teacher.trend === 'up' ? (
                      <TrendingUp className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-red-600" />
                    )}
                    <span className={`text-sm font-bold ${teacher.trend === 'up' ? 'text-emerald-600' : 'text-red-600'}`}>
                      {teacher.trendValue || 0}%
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredTeachers.length === 0 && (
        <div className="text-center py-12">
          <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">
            {language === 'en' ? 'No teachers found' : 'ఉపాధ్యాయులు కనుగొనబడలేదు'}
          </p>
        </div>
      )}
    </div>
  );
}

interface TeacherDetailProps {
  teacher: any;
  onBack: () => void;
}

function TeacherDetail({ teacher, onBack }: TeacherDetailProps) {
  const { language } = useLanguage();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          {language === 'en' ? 'Back to Teachers' : 'ఉపాధ్యాయులకు తిరిగి'}
        </Button>
      </div>

      {/* Teacher Profile */}
      <Card className="card-3d">
        <CardContent className="pt-6">
          <div className="flex items-start gap-6">
            <div className="h-24 w-24 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-4xl font-bold">
              {teacher.name.charAt(0)}
            </div>
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-3xl font-bold">{teacher.name}</h2>
                  <p className="text-muted-foreground mt-1">{teacher.email}</p>
                  {teacher.phone && (
                    <p className="text-muted-foreground">{teacher.phone}</p>
                  )}
                </div>
                <Button>
                  <Edit className="w-4 h-4 mr-2" />
                  {language === 'en' ? 'Edit Profile' : 'ప్రొఫైల్‌ను సవరించండి'}
                </Button>
              </div>
              <div className="flex gap-2 mt-4">
                {teacher.isClassTeacher && (
                  <Badge className="bg-primary">
                    {language === 'en' ? `Class Teacher - ${teacher.assignedClass}` : `తరగతి ఉపాధ్యాయుడు - ${teacher.assignedClass}`}
                  </Badge>
                )}
                <Badge variant="secondary">
                  {teacher.employeeId}
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <GradientStatsCard
          title={language === 'en' ? 'Overall Average' : 'మొత్తం సగటు'}
          value={`${teacher.averageScore || 0}%`}
          subtitle={language === 'en' ? 'All subjects combined' : 'అన్ని విషయాలు కలిపి'}
          icon={Award}
          color="primary"
        />
        <GradientStatsCard
          title={language === 'en' ? 'Performance Index' : 'పనితీరు సూచిక'}
          value={`${teacher.trend === 'up' ? '+' : ''}${teacher.trendValue || 0}%`}
          subtitle={language === 'en' ? 'vs previous exam' : 'మునుపటి పరీక్షతో పోల్చితే'}
          icon={teacher.trend === 'up' ? TrendingUp : TrendingDown}
          color={teacher.trend === 'up' ? 'success' : 'danger'}
        />
        <GradientStatsCard
          title={language === 'en' ? 'Subjects Teaching' : 'బోధిస్తున్న విషయాలు'}
          value={teacher.subjects?.length || 0}
          subtitle={language === 'en' ? 'Active subjects' : 'క్రియాశీల విషయాలు'}
          icon={BookOpen}
          color="info"
        />
        <GradientStatsCard
          title={language === 'en' ? 'Classes Teaching' : 'బోధిస్తున్న తరగతులు'}
          value={teacher.classes?.length || 0}
          subtitle={language === 'en' ? 'Different classes' : 'వివిధ తరగతులు'}
          icon={GraduationCap}
          color="purple"
        />
      </div>

      {/* Subject Performance */}
      <Card className="card-3d">
        <CardHeader>
          <CardTitle>
            {language === 'en' ? 'Subject-wise Performance' : 'విషయ వారీగా పనితీరు'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {teacher.subjectPerformance?.map((subject: any, idx: number) => (
              <div key={idx} className="p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="font-medium">{subject.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {subject.classes.join(', ')}
                    </p>
                  </div>
                  <Badge variant={subject.average >= 75 ? 'default' : 'secondary'}>
                    {subject.average}% {language === 'en' ? 'Average' : 'సగటు'}
                  </Badge>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>
                      {language === 'en' ? 'Teacher Avg:' : 'ఉపాధ్యాయుడు సగటు:'} {subject.average}%
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-blue-600" />
                    <span>
                      {language === 'en' ? 'School Avg:' : 'పాఠశాల సగటు:'} {subject.schoolAverage}%
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {subject.average >= subject.schoolAverage ? (
                      <TrendingUp className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-red-600" />
                    )}
                    <span className={subject.average >= subject.schoolAverage ? 'text-emerald-600' : 'text-red-600'}>
                      {Math.abs(subject.average - subject.schoolAverage)}% 
                      {language === 'en' ? ' difference' : ' తేడా'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activities */}
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
              {teacher.recentActivities?.map((activity: any, idx: number) => (
                <div key={idx} className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
                  <div className={`p-2 rounded-lg ${
                    activity.type === 'grade' ? 'bg-emerald-100' :
                    activity.type === 'attendance' ? 'bg-blue-100' : 'bg-purple-100'
                  }`}>
                    {activity.type === 'grade' && <Award className="w-4 h-4 text-emerald-600" />}
                    {activity.type === 'attendance' && <CheckCircle2 className="w-4 h-4 text-blue-600" />}
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
              {teacher.recentHomework?.map((hw: any, idx: number) => (
                <div key={idx} className="p-3 bg-purple-50 rounded-xl">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-medium text-sm">{hw.subject}</p>
                    <Badge variant="secondary" className="text-xs">
                      {hw.class}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{hw.title}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {language === 'en' ? 'Due:' : 'గడువు:'} {hw.dueDate}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Exam-wise Marks */}
      {teacher.examMarks && (
        <Card className="card-3d">
          <CardHeader>
            <CardTitle>
              {language === 'en' ? 'Exam-wise Performance' : 'పరీక్ష వారీగా పనితీరు'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3">
                      {language === 'en' ? 'Exam Type' : 'పరీక్ష రకం'}
                    </th>
                    <th className="text-left p-3">
                      {language === 'en' ? 'Subject' : 'విషయం'}
                    </th>
                    <th className="text-left p-3">
                      {language === 'en' ? 'Class' : 'తరగతి'}
                    </th>
                    <th className="text-center p-3">
                      {language === 'en' ? 'Average Marks' : 'సగటు మార్కులు'}
                    </th>
                    <th className="text-center p-3">
                      {language === 'en' ? 'Pass Rate' : 'పాస్ రేటు'}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {teacher.examMarks.map((exam: any, idx: number) => (
                    <tr key={idx} className="border-b hover:bg-gray-50">
                      <td className="p-3">{exam.examType}</td>
                      <td className="p-3">{exam.subject}</td>
                      <td className="p-3">{exam.class}</td>
                      <td className="text-center p-3 font-medium">{exam.average}%</td>
                      <td className="text-center p-3">
                        <Badge variant={exam.passRate >= 80 ? 'default' : 'secondary'}>
                          {exam.passRate}%
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}