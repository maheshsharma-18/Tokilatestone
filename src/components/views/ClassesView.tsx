import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { useLanguage } from '../../contexts/LanguageContext';
import {
  Building2,
  Users,
  GraduationCap,
  Plus,
  Edit,
  Trash2,
  Search,
  ArrowLeft,
  UserPlus,
  BookOpen
} from 'lucide-react';
import { GradientStatsCard } from '../StatsCard';
import { students, users } from '../../data/mockData';

interface ClassesViewProps {
  onBack: () => void;
}

export function ClassesView({ onBack }: ClassesViewProps) {
  const { language } = useLanguage();
  const [loading, setLoading] = useState(true);
  const [classes, setClasses] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClass, setSelectedClass] = useState<any>(null);

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    try {
      // Use mock data instead of API call
      // Get unique classes from students
      const uniqueClasses = [...new Set(students.map(s => `${s.class}${s.section}`))];
      
      const classData = uniqueClasses.map(cls => {
        const classStudents = students.filter(s => `${s.class}${s.section}` === cls);
        const classTeacher = users.find(u => u.classTeacherFor === cls);
        
        // Parse class and section
        const match = cls.match(/^(\d+)([A-Z])$/);
        const classNum = match ? match[1] : cls;
        const section = match ? match[2] : '';
        
        return {
          id: cls,
          name: classNum,
          section: section,
          fullName: `Class ${classNum} - Section ${section}`,
          classTeacher: classTeacher?.name || 'Not Assigned',
          classTeacherId: classTeacher?.id,
          studentCount: classStudents.length,
          averageAttendance: Math.floor(Math.random() * 10) + 90, // 90-100
          averageGrade: Math.floor(Math.random() * 15) + 80, // 80-95
          subjectsCount: 6,
          students: classStudents
        };
      });
      
      setClasses(classData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching classes:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading classes...</p>
        </div>
      </div>
    );
  }

  if (selectedClass) {
    return (
      <ClassDetail
        classData={selectedClass}
        onBack={() => setSelectedClass(null)}
      />
    );
  }

  const filteredClasses = classes.filter(cls =>
    cls.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (cls.section && cls.section.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (cls.classTeacher && cls.classTeacher.toLowerCase().includes(searchTerm.toLowerCase()))
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
              {language === 'en' ? 'Classes & Sections Management' : 'తరగతులు & విభాగాల నిర్వహణ'}
            </h1>
            <p className="text-muted-foreground">
              {language === 'en' ? 'Manage classes, sections, and assignments' : 'తరగతులు, విభాగాలు మరియు అసైన్‌మెంట్‌లను నిర్వహించండి'}
            </p>
          </div>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          <Plus className="w-4 h-4 mr-2" />
          {language === 'en' ? 'Add New Class' : 'కొత్త తరగతి జోడించండి'}
        </Button>
      </div>

      {/* Overview Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <GradientStatsCard
          title={language === 'en' ? 'Total Classes' : 'మొత్తం తరగతులు'}
          value={classes.length}
          icon={Building2}
          color="primary"
        />
        <GradientStatsCard
          title={language === 'en' ? 'Total Students' : 'మొత్తం విద్యార్థులు'}
          value={classes.reduce((sum, cls) => sum + (cls.studentCount || 0), 0)}
          icon={Users}
          color="success"
        />
        <GradientStatsCard
          title={language === 'en' ? 'Class Teachers' : 'తరగతి ఉపాధ్యాయులు'}
          value={classes.filter(cls => cls.classTeacher).length}
          icon={GraduationCap}
          color="info"
        />
        <GradientStatsCard
          title={language === 'en' ? 'Sections' : 'విభాగాలు'}
          value={classes.reduce((sum, cls) => sum + (cls.sections?.length || 1), 0)}
          icon={Building2}
          color="purple"
        />
      </div>

      {/* Search */}
      <div className="relative w-full md:w-96">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder={language === 'en' ? 'Search classes...' : 'తరగతులను వెతకండి...'}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Classes Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredClasses.map((cls) => (
          <Card
            key={cls.id}
            className="card-3d cursor-pointer hover:shadow-xl transition-all"
            onClick={() => setSelectedClass(cls)}
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-2xl">
                    {language === 'en' ? 'Class' : 'తరగతి'} {cls.name}
                  </CardTitle>
                  {cls.sections && cls.sections.length > 0 && (
                    <p className="text-sm text-muted-foreground mt-1">
                      {cls.sections.length} {language === 'en' ? 'Sections' : 'విభాగాలు'}: {cls.sections.join(', ')}
                    </p>
                  )}
                </div>
                <Badge variant="secondary">
                  {cls.studentCount || 0} {language === 'en' ? 'Students' : 'విద్యార్థులు'}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {cls.classTeacher && (
                <div className="p-3 bg-blue-50 rounded-xl">
                  <p className="text-xs text-muted-foreground mb-1">
                    {language === 'en' ? 'Class Teacher' : 'తరగతి ఉపాధ్యాయుడు'}
                  </p>
                  <p className="font-medium">{cls.classTeacher}</p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-emerald-50 rounded-xl">
                  <p className="text-xs text-muted-foreground mb-1">
                    {language === 'en' ? 'Attendance' : 'హాజరు'}
                  </p>
                  <p className="text-lg font-bold text-emerald-600">
                    {cls.attendanceRate || 0}%
                  </p>
                </div>
                <div className="p-3 bg-purple-50 rounded-xl">
                  <p className="text-xs text-muted-foreground mb-1">
                    {language === 'en' ? 'Avg Grade' : 'సగటు గ్రేడ్'}
                  </p>
                  <p className="text-lg font-bold text-purple-600">
                    {cls.averageGrade || 0}%
                  </p>
                </div>
              </div>

              {cls.subjects && cls.subjects.length > 0 && (
                <div className="pt-2 border-t">
                  <p className="text-xs text-muted-foreground mb-2">
                    {language === 'en' ? 'Subjects' : 'విషయాలు'} ({cls.subjects.length})
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {cls.subjects.slice(0, 4).map((subject: string, idx: number) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {subject}
                      </Badge>
                    ))}
                    {cls.subjects.length > 4 && (
                      <Badge variant="outline" className="text-xs">
                        +{cls.subjects.length - 4}
                      </Badge>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredClasses.length === 0 && (
        <div className="text-center py-12">
          <Building2 className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">
            {language === 'en' ? 'No classes found' : 'తరగతులు కనుగొనబడలేదు'}
          </p>
        </div>
      )}
    </div>
  );
}

interface ClassDetailProps {
  classData: any;
  onBack: () => void;
}

function ClassDetail({ classData, onBack }: ClassDetailProps) {
  const { language } = useLanguage();
  const [students, setStudents] = useState<any[]>([]);
  const [subjects, setSubjects] = useState<any[]>([]);

  useEffect(() => {
    // In real implementation, fetch students and subjects for this class
    setStudents(classData.students || []);
    setSubjects(classData.subjectDetails || []);
  }, [classData.id]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            {language === 'en' ? 'Back to Classes' : 'తరగతులకు తిరిగి'}
          </Button>
          <div>
            <h1 className="text-3xl font-bold">
              {language === 'en' ? 'Class' : 'తరగతి'} {classData.name}
            </h1>
            {classData.classTeacher && (
              <p className="text-muted-foreground">
                {language === 'en' ? 'Class Teacher:' : 'తరగతి ఉపాధ్యాయుడు:'} {classData.classTeacher}
              </p>
            )}
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Edit className="w-4 h-4 mr-2" />
            {language === 'en' ? 'Edit Class' : 'తరగతిని సవరించండి'}
          </Button>
          <Button className="bg-primary hover:bg-primary/90">
            <UserPlus className="w-4 h-4 mr-2" />
            {language === 'en' ? 'Add Student' : 'విద్యార్థిని జోడించండి'}
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <GradientStatsCard
          title={language === 'en' ? 'Total Students' : 'మొత్తం విద్యార్థులు'}
          value={classData.studentCount || 0}
          icon={Users}
          color="primary"
        />
        <GradientStatsCard
          title={language === 'en' ? 'Attendance Rate' : 'హాజరు రేటు'}
          value={`${classData.attendanceRate || 0}%`}
          icon={Building2}
          color="success"
        />
        <GradientStatsCard
          title={language === 'en' ? 'Average Grade' : 'సగటు గ్రేడ్'}
          value={`${classData.averageGrade || 0}%`}
          icon={GraduationCap}
          color="info"
        />
        <GradientStatsCard
          title={language === 'en' ? 'Subjects' : 'విషయాలు'}
          value={classData.subjects?.length || 0}
          icon={BookOpen}
          color="purple"
        />
      </div>

      {/* Subjects and Teachers */}
      <Card className="card-3d">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>
              {language === 'en' ? 'Subjects & Teachers' : 'విషయాలు & ఉపాధ్యాయులు'}
            </CardTitle>
            <Button variant="outline" size="sm">
              <Plus className="w-4 h-4 mr-2" />
              {language === 'en' ? 'Assign Subject' : 'విషయాన్ని కేటాయించండి'}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-2">
            {subjects.map((subject, idx) => (
              <div key={idx} className="p-4 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-medium text-lg">{subject.name}</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      {language === 'en' ? 'Teacher:' : 'ఉపాధ్యాయుడు:'} {subject.teacher || 'Not Assigned'}
                    </p>
                    {subject.averageScore && (
                      <div className="mt-2">
                        <Badge variant="secondary">
                          {language === 'en' ? 'Avg Score:' : 'సగటు స్కోర్:'} {subject.averageScore}%
                        </Badge>
                      </div>
                    )}
                  </div>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Students List */}
      <Card className="card-3d">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>
              {language === 'en' ? 'Students' : 'విద్యార్థులు'}
            </CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Plus className="w-4 h-4 mr-2" />
                {language === 'en' ? 'Add Student' : 'విద్యార్థిని జోడించండి'}
              </Button>
            </div>
          </div>
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
                    {language === 'en' ? 'Student Name' : 'విద్యార్థి పే��ు'}
                  </th>
                  <th className="text-center p-3">
                    {language === 'en' ? 'Attendance' : 'హాజరు'}
                  </th>
                  <th className="text-center p-3">
                    {language === 'en' ? 'Average Grade' : 'సగటు గ్రేడ్'}
                  </th>
                  <th className="text-center p-3">
                    {language === 'en' ? 'Actions' : 'చర్యలు'}
                  </th>
                </tr>
              </thead>
              <tbody>
                {students.map((student, idx) => (
                  <tr key={idx} className="border-b hover:bg-gray-50">
                    <td className="p-3">{student.rollNo}</td>
                    <td className="p-3">
                      <div>
                        <p className="font-medium">{student.name}</p>
                        <p className="text-sm text-muted-foreground">{student.email}</p>
                      </div>
                    </td>
                    <td className="text-center p-3">
                      <Badge variant={student.attendance >= 85 ? 'default' : 'secondary'}>
                        {student.attendance || 0}%
                      </Badge>
                    </td>
                    <td className="text-center p-3">
                      <Badge variant={student.averageGrade >= 75 ? 'default' : 'secondary'}>
                        {student.averageGrade || 0}%
                      </Badge>
                    </td>
                    <td className="text-center p-3">
                      <div className="flex items-center justify-center gap-1">
                        <Button variant="ghost" size="icon">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {students.length === 0 && (
              <div className="text-center py-12">
                <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">
                  {language === 'en' ? 'No students enrolled in this class' : 'ఈ తరగతిలో విద్యార్థులు లేరు'}
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}