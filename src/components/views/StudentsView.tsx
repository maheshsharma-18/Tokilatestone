import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { students, attendanceRecords } from '../../data/mockData';
import { Users, Search, Download, Plus, Eye, ArrowLeft, Phone, Calendar, MapPin, User } from 'lucide-react';

interface StudentsViewProps {
  onBack?: () => void;
  onNavigate?: (view: string) => void;
}

export const StudentsView = ({ onBack, onNavigate }: StudentsViewProps = {}) => {
  const { t, language } = useLanguage();
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStudent, setSelectedStudent] = useState<typeof students[0] | null>(null);

  const filteredStudents = students.filter(student => 
    student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.rollNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (student.nameInTelugu && student.nameInTelugu.includes(searchQuery))
  );

  const getStudentAttendanceRate = (studentId: string) => {
    const studentRecords = attendanceRecords.filter(r => r.studentId === studentId);
    if (studentRecords.length === 0) return 0;
    const presentCount = studentRecords.filter(r => r.status === 'present').length;
    return Math.round((presentCount / studentRecords.length) * 100);
  };

  // If a student is selected, show detail view
  if (selectedStudent) {
    const attendanceRate = getStudentAttendanceRate(selectedStudent.id);
    return (
      <div className="space-y-6 pb-8">
        {/* Header with Back Button */}
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => setSelectedStudent(null)}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            {language === 'en' ? 'Back to Students' : 'విద్యార్థులకు తిరిగి'}
          </Button>
        </div>

        {/* Student Profile Header */}
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 rounded-2xl p-8 text-white shadow-xl">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">
                {language === 'en' ? selectedStudent.name : selectedStudent.nameInTelugu || selectedStudent.name}
              </h1>
              <p className="text-lg text-white/90">
                {language === 'en' ? 'Student Profile' : 'విద్యార్థి ప్రొఫైల్'}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-white/80">{t('attendance.rollNumber')}</p>
              <p className="text-2xl font-bold">{selectedStudent.rollNumber}</p>
            </div>
          </div>
        </div>

        {/* Student Information Cards */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Personal Information */}
          <Card className="card-3d">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5 text-primary" />
                {language === 'en' ? 'Personal Information' : 'వ్యక్తిగత సమాచారం'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl">
                  <p className="text-sm text-muted-foreground mb-1">{t('common.name')}</p>
                  <p className="font-medium">{language === 'en' ? selectedStudent.name : selectedStudent.nameInTelugu || selectedStudent.name}</p>
                </div>
                <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl">
                  <p className="text-sm text-muted-foreground mb-1">{t('common.class')}</p>
                  <p className="font-medium">{selectedStudent.class}{selectedStudent.section}</p>
                </div>
                <div className="p-4 bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl">
                  <p className="text-sm text-muted-foreground mb-1">{t('attendance.rollNumber')}</p>
                  <p className="font-medium">{selectedStudent.rollNumber}</p>
                </div>
                <div className="p-4 bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl">
                  <p className="text-sm text-muted-foreground mb-1">
                    <Calendar className="w-4 h-4 inline mr-1" />
                    {language === 'en' ? 'Date of Birth' : 'పుట్టిన తేదీ'}
                  </p>
                  <p className="font-medium">{new Date(selectedStudent.dateOfBirth).toLocaleDateString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Parent/Guardian Information */}
          <Card className="card-3d">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                {language === 'en' ? 'Parent/Guardian Information' : 'తల్���ిదండ్రుల/సంరక్షకుల సమాచారం'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl">
                <p className="text-sm text-muted-foreground mb-1">{t('common.parent')}</p>
                <p className="font-medium text-lg">{selectedStudent.parentName}</p>
              </div>
              <div className="p-4 bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl">
                <p className="text-sm text-muted-foreground mb-1">
                  <Phone className="w-4 h-4 inline mr-1" />
                  {language === 'en' ? 'Parent Contact' : 'తల్లిదండ్రుల సంప్రదింపు'}
                </p>
                <p className="font-medium text-lg">{selectedStudent.parentContact}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Attendance & Transport */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Attendance Information */}
          <Card className="card-3d">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                {language === 'en' ? 'Attendance Record' : 'హాజరు రికార్డు'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center p-8">
                <div className="text-center">
                  <div className="relative inline-flex items-center justify-center w-32 h-32 mb-4">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle
                        cx="64"
                        cy="64"
                        r="56"
                        stroke="#e5e7eb"
                        strokeWidth="8"
                        fill="none"
                      />
                      <circle
                        cx="64"
                        cy="64"
                        r="56"
                        stroke={attendanceRate >= 90 ? '#10b981' : attendanceRate >= 75 ? '#f59e0b' : '#ef4444'}
                        strokeWidth="8"
                        fill="none"
                        strokeDasharray={`${2 * Math.PI * 56}`}
                        strokeDashoffset={`${2 * Math.PI * 56 * (1 - attendanceRate / 100)}`}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-3xl font-bold">{attendanceRate}%</span>
                    </div>
                  </div>
                  <Badge 
                    variant={attendanceRate >= 90 ? 'default' : attendanceRate >= 75 ? 'secondary' : 'destructive'}
                    className="text-lg px-4 py-2"
                  >
                    {attendanceRate >= 90 
                      ? (language === 'en' ? 'Excellent' : 'అద్భుతమైన')
                      : attendanceRate >= 75 
                        ? (language === 'en' ? 'Good' : 'మంచి')
                        : (language === 'en' ? 'Needs Attention' : 'శ్రద్ధ అవసరం')
                    }
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Transport Information */}
          {selectedStudent.busRoute && (
            <Card className="card-3d">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  {language === 'en' ? 'Transport Information' : 'రవాణా సమాచారం'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl text-center">
                  <p className="text-sm text-muted-foreground mb-2">
                    {language === 'en' ? 'Bus Route' : 'బస్ మార్గం'}
                  </p>
                  <p className="text-2xl font-bold text-blue-600">{selectedStudent.busRoute}</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <Button className="flex-1" size="lg">
            {language === 'en' ? 'Edit Student' : 'విద్యార్థిని సవరించు'}
          </Button>
          <Button variant="outline" className="flex-1" size="lg">
            {language === 'en' ? 'View Full Report' : 'పూర్తి నివేదికను చూడండి'}
          </Button>
        </div>
      </div>
    );
  }

  // Default list view
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl mb-2">{t('nav.students')}</h1>
          <p className="text-muted-foreground">
            {language === 'en' 
              ? 'Manage student profiles and information' 
              : 'విద్యార్థుల ప్రొఫైల్‌లు మరియు సమాచారాన్ని నిర్వహించండి'}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            {t('common.export')}
          </Button>
          {onNavigate && (user?.role === 'principal' || user?.role === 'vice_principal') && (
            <Button className="gap-2" onClick={() => onNavigate('onboard-student')}>
              <Plus className="h-4 w-4" />
              {language === 'en' ? 'Add Student' : 'విద్యార్థిని జోడించండి'}
            </Button>
          )}
        </div>
      </div>

      {/* Search Bar */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={language === 'en' ? 'Search by name or roll number...' : 'పేరు లేదా రోల్ నంబర్ ద్వారా వెతకండి...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Button variant="outline">
              {language === 'en' ? 'Filter' : 'ఫిల్టర్'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Students List */}
      <Card>
        <CardHeader>
          <CardTitle>
            {language === 'en' ? 'All Students' : 'అన్ని విద్యార్థులు'} ({filteredStudents.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t('attendance.rollNumber')}</TableHead>
                <TableHead>{t('common.name')}</TableHead>
                <TableHead>{t('common.class')}</TableHead>
                <TableHead>{t('common.parent')}</TableHead>
                <TableHead>{language === 'en' ? 'Contact' : 'సంప్రదింపు'}</TableHead>
                <TableHead className="text-center">{t('attendance.percentage')}</TableHead>
                <TableHead className="text-right">{language === 'en' ? 'Actions' : 'చర్యలు'}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.map(student => {
                const attendanceRate = getStudentAttendanceRate(student.id);
                return (
                  <TableRow key={student.id}>
                    <TableCell>{student.rollNumber}</TableCell>
                    <TableCell>
                      <div>
                        <p>{language === 'en' ? student.name : student.nameInTelugu || student.name}</p>
                        {student.busRoute && (
                          <Badge variant="outline" className="text-xs mt-1">{student.busRoute}</Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{student.class}{student.section}</TableCell>
                    <TableCell>{student.parentName}</TableCell>
                    <TableCell>{student.parentContact}</TableCell>
                    <TableCell className="text-center">
                      <Badge variant={attendanceRate >= 90 ? 'default' : attendanceRate >= 75 ? 'secondary' : 'destructive'}>
                        {attendanceRate}%
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => setSelectedStudent(student)}
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        {language === 'en' ? 'View' : 'చూడండి'}
                      </Button>
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
};