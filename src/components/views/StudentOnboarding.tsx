import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { useLanguage } from '../../contexts/LanguageContext';
import { useSchools } from '../../contexts/SchoolContext';
import { ArrowLeft, User, Users, BookOpen, MapPin, Save, School as SchoolIcon } from 'lucide-react';
import { Badge } from '../ui/badge';

interface StudentOnboardingProps {
  onBack: () => void;
  schoolId?: string;
}

export function StudentOnboarding({ onBack, schoolId }: StudentOnboardingProps) {
  const { t, language } = useLanguage();
  const { schools } = useSchools();
  const selectedSchool = schoolId ? schools.find(s => s.id === schoolId) : null;
  const [formData, setFormData] = useState({
    // Identity
    studentId: '',
    fullName: '',
    dateOfBirth: '',
    gender: '',
    address: '',
    status: 'Active',
    
    // Parent Details
    fatherName: '',
    motherName: '',
    primaryPhone: '',
    
    // Academic
    class: '',
    medium: 'English',
    academicYear: '2024-2025',
    
    // Communication
    defaultLanguage: 'English',
    
    // Enrollment
    joiningDate: '',
    admissionNumber: '',
  });

  const generateStudentId = () => {
    const id = 'STU' + Math.random().toString(36).substr(2, 6).toUpperCase();
    handleInputChange('studentId', id);
  };

  React.useEffect(() => {
    generateStudentId();
  }, []);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const classOptions = [
    'LKG', 'UKG', '1A', '1B', '2A', '2B', '3A', '3B', '4A', '4B', 
    '5A', '5B', '6A', '6B', '7A', '7B', '8A', '8B', '9A', '9B', '10A', '10B'
  ];

  const handleSubmit = () => {
    console.log('Student onboarding data:', formData);
    alert('Student onboarded successfully!');
    onBack();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl">{language === 'en' ? 'Add Student' : 'విద్యార్థిని జోడించండి'}</h1>
            <p className="text-sm text-muted-foreground">
              {selectedSchool 
                ? `${language === 'en' ? 'Onboard a new student to' : 'కొత్త విద్యార్థిని చేర్చండి'} ${selectedSchool.name}` 
                : (language === 'en' ? 'Onboard a new student to the school' : 'పాఠశాలకు కొత్త విద్యార్థిని చేర్చండి')}
            </p>
          </div>
        </div>
        <Badge variant="secondary">{selectedSchool ? 'Super Admin' : 'Principal Only'}</Badge>
      </div>

      {/* School Information (for Super Admin) */}
      {selectedSchool && (
        <Card className="card-3d bg-green-50 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <SchoolIcon className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-green-900">{selectedSchool.name}</h3>
                {selectedSchool.nameInTelugu && (
                  <p className="text-sm text-green-700">{selectedSchool.nameInTelugu}</p>
                )}
                <p className="text-sm text-green-600">
                  {language === 'en' ? 'Principal:' : 'ప్రధానోపాధ్యాయుడు:'} {selectedSchool.principalName}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Identity Section */}
      <Card className="border-2 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50">
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5 text-blue-600" />
            Student Identity
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Student ID *</Label>
              <div className="flex gap-2">
                <Input
                  value={formData.studentId}
                  readOnly
                  className="bg-gray-50"
                />
                <Button variant="outline" onClick={generateStudentId}>
                  Regenerate
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Full Name *</Label>
              <Input
                placeholder="Enter student full name"
                value={formData.fullName}
                onChange={(e) => handleInputChange('fullName', e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Date of Birth *</Label>
              <Input
                type="date"
                value={formData.dateOfBirth}
                onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Gender *</Label>
              <Select value={formData.gender} onValueChange={(val) => handleInputChange('gender', val)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label>Address *</Label>
              <Input
                placeholder="Enter full address"
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Status *</Label>
              <Select value={formData.status} onValueChange={(val) => handleInputChange('status', val)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Parent Details Section */}
      <Card className="border-2 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-green-50 to-teal-50">
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-green-600" />
            Parent Details
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Father Name *</Label>
              <Input
                placeholder="Enter father's name"
                value={formData.fatherName}
                onChange={(e) => handleInputChange('fatherName', e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Mother Name (Optional)</Label>
              <Input
                placeholder="Enter mother's name"
                value={formData.motherName}
                onChange={(e) => handleInputChange('motherName', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Primary Phone *</Label>
              <Input
                placeholder="+91 XXXXXXXXXX"
                value={formData.primaryPhone}
                onChange={(e) => handleInputChange('primaryPhone', e.target.value)}
                required
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Academic Baseline Section */}
      <Card className="border-2 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50">
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-purple-600" />
            Academic Baseline
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Class *</Label>
              <Select value={formData.class} onValueChange={(val) => handleInputChange('class', val)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select class" />
                </SelectTrigger>
                <SelectContent>
                  {classOptions.map(cls => (
                    <SelectItem key={cls} value={cls}>{cls}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Medium *</Label>
              <Select value={formData.medium} onValueChange={(val) => handleInputChange('medium', val)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="English">English</SelectItem>
                  <SelectItem value="Telugu">Telugu</SelectItem>
                  <SelectItem value="Tamil">Tamil</SelectItem>
                  <SelectItem value="Hindi">Hindi</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Academic Year *</Label>
              <Input
                value={formData.academicYear}
                readOnly
                className="bg-gray-50"
              />
              <p className="text-xs text-muted-foreground">
                Auto-generated from school settings
              </p>
            </div>

            <div className="space-y-2">
              <Label>Default Language *</Label>
              <Select value={formData.defaultLanguage} onValueChange={(val) => handleInputChange('defaultLanguage', val)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="English">English</SelectItem>
                  <SelectItem value="Telugu">Telugu</SelectItem>
                  <SelectItem value="Tamil">Tamil</SelectItem>
                  <SelectItem value="Hindi">Hindi</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Enrollment Section */}
      <Card className="border-2 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-orange-50 to-red-50">
          <CardTitle>Enrollment Details</CardTitle>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Joining Date (MM/YYYY) *</Label>
              <Input
                type="month"
                value={formData.joiningDate}
                onChange={(e) => handleInputChange('joiningDate', e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Admission Number (Optional)</Label>
              <Input
                placeholder="Enter admission number"
                value={formData.admissionNumber}
                onChange={(e) => handleInputChange('admissionNumber', e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex justify-end gap-3 pb-6">
        <Button variant="outline" onClick={onBack}>
          Cancel
        </Button>
        <Button onClick={handleSubmit} className="gap-2">
          <Save className="h-4 w-4" />
          Save Student
        </Button>
      </div>
    </div>
  );
}
