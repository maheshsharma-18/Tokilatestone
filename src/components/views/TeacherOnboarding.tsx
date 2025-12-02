import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Checkbox } from '../ui/checkbox';
import { useLanguage } from '../../contexts/LanguageContext';
import { useSchools } from '../../contexts/SchoolContext';
import { ArrowLeft, User, Phone, BookOpen, Briefcase, Save, Plus, X } from 'lucide-react';
import { Badge } from '../ui/badge';

interface TeacherOnboardingProps {
  onBack: () => void;
  userRole: string;
  schoolId?: string;
}

export function TeacherOnboarding({ onBack, userRole, schoolId }: TeacherOnboardingProps) {
  const { t } = useLanguage();
  const { schools } = useSchools();
  const selectedSchool = schoolId ? schools.find(s => s.id === schoolId) : null;
  const [formData, setFormData] = useState({
    // Identity
    employeeCode: '',
    fullName: '',
    designationRole: 'Teacher',
    isClassTeacher: false,
    assignedClass: '',
    primaryPhone: '',
    status: 'Active',
    
    // Academic
    academicYear: '2024-2025',
    subjects: [] as string[],
    
    // Communication
    defaultLanguage: 'English',
    
    // Employment
    joiningDate: '',
    employmentType: 'Permanent',
  });

  const [selectedSubject, setSelectedSubject] = useState('');

  const generateEmployeeCode = () => {
    const code = 'TCH' + Math.random().toString(36).substr(2, 6).toUpperCase();
    handleInputChange('employeeCode', code);
  };

  React.useEffect(() => {
    generateEmployeeCode();
  }, []);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const subjectOptions = [
    'Mathematics', 'Science', 'English', 'Telugu', 'Hindi', 'Social Studies',
    'Physics', 'Chemistry', 'Biology', 'Computer Science', 'Physical Education',
    'Arts', 'Music', 'Environmental Science'
  ];

  const classOptions = [
    '1A', '1B', '2A', '2B', '3A', '3B', '4A', '4B', 
    '5A', '5B', '6A', '6B', '7A', '7B', '8A', '8B', 
    '9A', '9B', '10A', '10B'
  ];

  const addSubject = () => {
    if (selectedSubject && !formData.subjects.includes(selectedSubject)) {
      setFormData(prev => ({
        ...prev,
        subjects: [...prev.subjects, selectedSubject]
      }));
      setSelectedSubject('');
    }
  };

  const removeSubject = (subject: string) => {
    setFormData(prev => ({
      ...prev,
      subjects: prev.subjects.filter(s => s !== subject)
    }));
  };

  const handleSubmit = () => {
    console.log('Teacher onboarding data:', formData);
    alert('Teacher onboarded successfully!');
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
            <h1 className="text-2xl">Add Teacher</h1>
            <p className="text-sm text-muted-foreground">
              {selectedSchool 
                ? `Onboard a new teacher to ${selectedSchool.name}` 
                : 'Onboard a new teacher to the school'}
            </p>
          </div>
        </div>
        <Badge variant="secondary">{userRole === 'super_admin' ? 'Super Admin' : 'Principal Only'}</Badge>
      </div>

      {/* School Information (for Super Admin) */}
      {selectedSchool && userRole === 'super_admin' && (
        <Card className="card-3d bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <BookOpen className="h-5 w-5 text-blue-600\" />
              </div>
              <div>
                <h3 className="font-semibold text-blue-900">{selectedSchool.name}</h3>
                {selectedSchool.nameInTelugu && (
                  <p className="text-sm text-blue-700">{selectedSchool.nameInTelugu}</p>
                )}
                <p className="text-sm text-blue-600">Principal: {selectedSchool.principalName}</p>
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
            Identity Information
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Employee Code *</Label>
              <div className="flex gap-2">
                <Input
                  value={formData.employeeCode}
                  readOnly
                  className="bg-gray-50"
                />
                <Button variant="outline" onClick={generateEmployeeCode}>
                  Regenerate
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Full Name *</Label>
              <Input
                placeholder="Enter full name"
                value={formData.fullName}
                onChange={(e) => handleInputChange('fullName', e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Designation Role *</Label>
              <Input
                value="Teacher"
                readOnly
                className="bg-gray-50"
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

          <div className="pt-4 border-t space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="isClassTeacher"
                checked={formData.isClassTeacher}
                onCheckedChange={(checked) => {
                  handleInputChange('isClassTeacher', checked);
                  if (!checked) handleInputChange('assignedClass', '');
                }}
              />
              <label htmlFor="isClassTeacher" className="text-sm cursor-pointer">
                Is Class Teacher?
              </label>
            </div>

            {formData.isClassTeacher && (
              <div className="space-y-2">
                <Label>Assigned Class/Section *</Label>
                <Select value={formData.assignedClass} onValueChange={(val) => handleInputChange('assignedClass', val)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select class" />
                  </SelectTrigger>
                  <SelectContent>
                    {classOptions.map(cls => (
                      <SelectItem key={cls} value={cls}>{cls}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  Only classes with no class teacher assigned are shown
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Academic Baseline Section */}
      <Card className="border-2 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-green-50 to-teal-50">
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-green-600" />
            Academic Baseline
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
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
            <Label>Subjects (Optional, Multi-select)</Label>
            <div className="flex gap-2">
              <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder="Select subjects" />
                </SelectTrigger>
                <SelectContent>
                  {subjectOptions.map(subject => (
                    <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button onClick={addSubject} variant="outline">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            {formData.subjects.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.subjects.map(subject => (
                  <Badge key={subject} variant="secondary" className="gap-2">
                    {subject}
                    <X
                      className="h-3 w-3 cursor-pointer"
                      onClick={() => removeSubject(subject)}
                    />
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Communication & Employment Section */}
      <Card className="border-2 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50">
          <CardTitle className="flex items-center gap-2">
            <Phone className="h-5 w-5 text-purple-600" />
            Communication & Employment
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
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

          <div className="pt-4 border-t">
            <h3 className="text-sm font-medium mb-4">Employment Details (Optional)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Joining Date</Label>
                <Input
                  type="month"
                  value={formData.joiningDate}
                  onChange={(e) => handleInputChange('joiningDate', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label>Employment Type</Label>
                <Select value={formData.employmentType} onValueChange={(val) => handleInputChange('employmentType', val)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Permanent">Permanent</SelectItem>
                    <SelectItem value="Contract">Contract</SelectItem>
                  </SelectContent>
                </Select>
              </div>
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
          Save Teacher
        </Button>
      </div>
    </div>
  );
}
