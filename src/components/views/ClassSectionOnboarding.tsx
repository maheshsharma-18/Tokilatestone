import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Checkbox } from '../ui/checkbox';
import { useLanguage } from '../../contexts/LanguageContext';
import { ArrowLeft, BookOpen, Clock, Save, Plus, X } from 'lucide-react';
import { Badge } from '../ui/badge';

interface ClassSectionOnboardingProps {
  onBack: () => void;
}

export function ClassSectionOnboarding({ onBack }: ClassSectionOnboardingProps) {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    className: '',
    subjects: [] as string[],
    workingDays: {
      Monday: true,
      Tuesday: true,
      Wednesday: true,
      Thursday: true,
      Friday: true,
      Saturday: true,
    },
    periodsPerDay: 7,
    startTime: '08:00',
    endTime: '15:00',
    periodDuration: 40,
    lunchBreak: { start: '12:00', duration: 30 },
    break1: { start: '10:30', duration: 15 },
    break2: { start: '', duration: 0 },
    hasMultipleSections: false,
    numberOfSections: 0,
  });

  const [selectedSubject, setSelectedSubject] = useState('');
  const [customSubject, setCustomSubject] = useState('');

  const classOptions = ['LKG', 'UKG', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
  const subjectOptions = [
    'Mathematics', 'Science', 'English', 'Telugu', 'Hindi', 'Social Studies',
    'Physics', 'Chemistry', 'Biology', 'Computer Science', 'Physical Education',
    'Arts', 'Music', 'Environmental Science'
  ];

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleWorkingDayChange = (day: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      workingDays: { ...prev.workingDays, [day]: checked }
    }));
  };

  const handleBreakChange = (breakName: string, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [breakName]: { ...prev[breakName as keyof typeof prev] as any, [field]: value }
    }));
  };

  const addSubject = () => {
    const subject = customSubject || selectedSubject;
    if (subject && !formData.subjects.includes(subject)) {
      setFormData(prev => ({
        ...prev,
        subjects: [...prev.subjects, subject]
      }));
      setSelectedSubject('');
      setCustomSubject('');
    }
  };

  const removeSubject = (subject: string) => {
    setFormData(prev => ({
      ...prev,
      subjects: prev.subjects.filter(s => s !== subject)
    }));
  };

  const handleSubmit = () => {
    console.log('Class & Section data:', formData);
    // Generate section names
    const sections = [];
    if (formData.numberOfSections === 0) {
      sections.push(formData.className);
    } else if (formData.numberOfSections === 1) {
      sections.push(formData.className);
    } else {
      for (let i = 0; i < formData.numberOfSections; i++) {
        sections.push(`${formData.className}${String.fromCharCode(65 + i)}`); // A, B, C...
      }
    }
    console.log('Generated sections:', sections);
    alert(`Class(es) created successfully: ${sections.join(', ')}`);
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
            <h1 className="text-2xl">Add Class & Sections</h1>
            <p className="text-sm text-muted-foreground">Configure class, subjects, and timetable settings</p>
          </div>
        </div>
        <Badge variant="secondary">Principal Only</Badge>
      </div>

      {/* Basic Information */}
      <Card className="border-2 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50">
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-blue-600" />
            Class Information
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div className="space-y-2">
            <Label>Class *</Label>
            <Select value={formData.className} onValueChange={(val) => handleInputChange('className', val)}>
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
            <Label>Subjects (Multi-select)</Label>
            <div className="flex gap-2">
              <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder="Select subject from list" />
                </SelectTrigger>
                <SelectContent>
                  {subjectOptions.map(subject => (
                    <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input
                placeholder="Or type custom subject"
                value={customSubject}
                onChange={(e) => setCustomSubject(e.target.value)}
                className="flex-1"
              />
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

      {/* Timetable Settings */}
      <Card className="border-2 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-green-50 to-teal-50">
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-green-600" />
            Timetable Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div className="space-y-3">
            <Label>Working Days *</Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {Object.entries(formData.workingDays).map(([day, checked]) => (
                <div key={day} className="flex items-center space-x-2">
                  <Checkbox
                    id={day}
                    checked={checked}
                    onCheckedChange={(val) => handleWorkingDayChange(day, val as boolean)}
                  />
                  <label htmlFor={day} className="text-sm cursor-pointer">
                    {day}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Periods Per Day *</Label>
              <Input
                type="number"
                min="1"
                max="10"
                value={formData.periodsPerDay}
                onChange={(e) => handleInputChange('periodsPerDay', parseInt(e.target.value))}
              />
            </div>

            <div className="space-y-2">
              <Label>Period Duration (minutes) *</Label>
              <Input
                type="number"
                min="30"
                max="60"
                value={formData.periodDuration}
                onChange={(e) => handleInputChange('periodDuration', parseInt(e.target.value))}
              />
            </div>

            <div className="space-y-2">
              <Label>Start Time *</Label>
              <Input
                type="time"
                value={formData.startTime}
                onChange={(e) => handleInputChange('startTime', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>End Time *</Label>
              <Input
                type="time"
                value={formData.endTime}
                onChange={(e) => handleInputChange('endTime', e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t">
            <Label>Break Times</Label>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm text-muted-foreground">Lunch Break Start Time *</Label>
                <Input
                  type="time"
                  value={formData.lunchBreak.start}
                  onChange={(e) => handleBreakChange('lunchBreak', 'start', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm text-muted-foreground">Lunch Break Duration (min) *</Label>
                <Input
                  type="number"
                  min="15"
                  max="60"
                  value={formData.lunchBreak.duration}
                  onChange={(e) => handleBreakChange('lunchBreak', 'duration', parseInt(e.target.value))}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm text-muted-foreground">Break 1 Start Time (Optional)</Label>
                <Input
                  type="time"
                  value={formData.break1.start}
                  onChange={(e) => handleBreakChange('break1', 'start', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm text-muted-foreground">Break 1 Duration (min)</Label>
                <Input
                  type="number"
                  min="0"
                  max="30"
                  value={formData.break1.duration}
                  onChange={(e) => handleBreakChange('break1', 'duration', parseInt(e.target.value))}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm text-muted-foreground">Break 2 Start Time (Optional)</Label>
                <Input
                  type="time"
                  value={formData.break2.start}
                  onChange={(e) => handleBreakChange('break2', 'start', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm text-muted-foreground">Break 2 Duration (min)</Label>
                <Input
                  type="number"
                  min="0"
                  max="30"
                  value={formData.break2.duration}
                  onChange={(e) => handleBreakChange('break2', 'duration', parseInt(e.target.value))}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sections Configuration */}
      <Card className="border-2 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50">
          <CardTitle>Sections Configuration</CardTitle>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="multipleSections"
              checked={formData.hasMultipleSections}
              onCheckedChange={(checked) => {
                handleInputChange('hasMultipleSections', checked);
                if (!checked) handleInputChange('numberOfSections', 0);
              }}
            />
            <label htmlFor="multipleSections" className="text-sm cursor-pointer">
              Does class have multiple sections?
            </label>
          </div>

          {formData.hasMultipleSections && (
            <div className="space-y-2">
              <Label>Number of Sections *</Label>
              <Input
                type="number"
                min="0"
                max="10"
                value={formData.numberOfSections}
                onChange={(e) => handleInputChange('numberOfSections', parseInt(e.target.value))}
              />
              <p className="text-xs text-muted-foreground">
                0 = No sections | 1 = One class (no "A") | 2+ = A, B, C...
              </p>
              {formData.numberOfSections > 1 && formData.className && (
                <div className="mt-2">
                  <p className="text-sm">Preview: {
                    Array.from({ length: formData.numberOfSections }, (_, i) => 
                      `${formData.className}${String.fromCharCode(65 + i)}`
                    ).join(', ')
                  }</p>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex justify-end gap-3 pb-6">
        <Button variant="outline" onClick={onBack}>
          Cancel
        </Button>
        <Button onClick={handleSubmit} className="gap-2">
          <Save className="h-4 w-4" />
          Save Class
        </Button>
      </div>
    </div>
  );
}
