import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { useLanguage } from '../../contexts/LanguageContext';
import { useSchools } from '../../contexts/SchoolContext';
import { ArrowLeft, User, Phone, Briefcase, Save, School as SchoolIcon, Bus } from 'lucide-react';
import { Badge } from '../ui/badge';
import { toast } from 'sonner@2.0.3';

interface FleetManagerOnboardingProps {
  onBack: () => void;
  schoolId?: string;
}

export function FleetManagerOnboarding({ onBack, schoolId }: FleetManagerOnboardingProps) {
  const { language } = useLanguage();
  const { schools } = useSchools();
  const selectedSchool = schoolId ? schools.find(s => s.id === schoolId) : null;

  const [formData, setFormData] = useState({
    employeeCode: '',
    fullName: '',
    designation: 'Fleet Manager',
    primaryPhone: '',
    email: '',
    status: 'Active',
    joiningDate: '',
    employmentType: 'Permanent',
    defaultLanguage: 'English',
    fleetSize: '',
    routesManaged: ''
  });

  const generateEmployeeCode = () => {
    const code = 'FLM' + Math.random().toString(36).substr(2, 6).toUpperCase();
    handleInputChange('employeeCode', code);
  };

  React.useEffect(() => {
    generateEmployeeCode();
  }, []);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (!formData.fullName || !formData.primaryPhone) {
      toast.error(language === 'en' ? 'Please fill all required fields' : 'దయచేసి అన్ని అవసరమైన ఫీల్డ్‌లను పూరించండి');
      return;
    }
    console.log('Fleet Manager onboarding data:', formData, 'School:', selectedSchool?.name);
    toast.success(language === 'en' ? 'Fleet Manager onboarded successfully!' : 'ఫ్లీట్ మేనేజర్ విజయవంతంగా చేర్చబడింది!');
    onBack();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl">{language === 'en' ? 'Add Fleet Manager' : 'ఫ్లీట్ మేనేజర్‌ను జోడి��చండి'}</h1>
            <p className="text-sm text-muted-foreground">
              {selectedSchool 
                ? `${language === 'en' ? 'Onboard a new fleet manager to' : 'కొత్త ఫ్లీట్ మేనేజర్‌ను చేర్చండి'} ${selectedSchool.name}` 
                : (language === 'en' ? 'Onboard a new fleet manager' : 'కొత్త ఫ్లీట్ మేనేజర్‌ను చేర్చండి')}
            </p>
          </div>
        </div>
        <Badge variant="secondary">{selectedSchool ? 'Super Admin' : 'Principal'}</Badge>
      </div>

      {/* School Information */}
      {selectedSchool && (
        <Card className="card-3d bg-orange-50 border-orange-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <SchoolIcon className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <h3 className="font-semibold text-orange-900">{selectedSchool.name}</h3>
                {selectedSchool.nameInTelugu && (
                  <p className="text-sm text-orange-700">{selectedSchool.nameInTelugu}</p>
                )}
                <p className="text-sm text-orange-600">
                  {language === 'en' ? 'Principal:' : 'ప్రధానోపాధ్యాయుడు:'} {selectedSchool.principalName}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Identity Section */}
      <Card className="border-2 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-orange-50 to-amber-50">
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5 text-orange-600" />
            {language === 'en' ? 'Fleet Manager Identity' : 'ఫ్లీట్ మేనేజర్ గుర్తింపు'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="employeeCode">{language === 'en' ? 'Employee Code' : 'ఉద్యోగి కోడ్'} *</Label>
              <Input
                id="employeeCode"
                value={formData.employeeCode}
                disabled
                className="bg-gray-100"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="fullName">{language === 'en' ? 'Full Name' : 'పూర్తి పేరు'} *</Label>
              <Input
                id="fullName"
                value={formData.fullName}
                onChange={(e) => handleInputChange('fullName', e.target.value)}
                placeholder={language === 'en' ? 'Enter full name' : 'పూర్తి పేరు నమోదు చేయండి'}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="designation">{language === 'en' ? 'Designation' : 'హోదా'}</Label>
              <Input
                id="designation"
                value={formData.designation}
                disabled
                className="bg-gray-100"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="primaryPhone">{language === 'en' ? 'Phone Number' : 'ఫోన్ నంబర్'} *</Label>
              <Input
                id="primaryPhone"
                type="tel"
                value={formData.primaryPhone}
                onChange={(e) => handleInputChange('primaryPhone', e.target.value)}
                placeholder="+91 98765 43210"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">{language === 'en' ? 'Email Address' : 'ఇమెయిల్ చిరునామా'}</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="manager@school.com"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">{language === 'en' ? 'Status' : 'స్థితి'}</Label>
              <Select value={formData.status} onValueChange={(value) => handleInputChange('status', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">{language === 'en' ? 'Active' : 'క్రియాశీలం'}</SelectItem>
                  <SelectItem value="Inactive">{language === 'en' ? 'Inactive' : 'నిష్క్రియం'}</SelectItem>
                  <SelectItem value="On Leave">{language === 'en' ? 'On Leave' : 'సెలవులో'}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Fleet Management Details */}
      <Card className="border-2 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50">
          <CardTitle className="flex items-center gap-2">
            <Bus className="h-5 w-5 text-blue-600" />
            {language === 'en' ? 'Fleet Management Details' : 'ఫ్లీట్ నిర్వహణ వివరాలు'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fleetSize">{language === 'en' ? 'Fleet Size (Vehicles)' : 'ఫ్లీట్ పరిమాణం (వాహనాలు)'}</Label>
              <Input
                id="fleetSize"
                type="number"
                value={formData.fleetSize}
                onChange={(e) => handleInputChange('fleetSize', e.target.value)}
                placeholder={language === 'en' ? 'Number of vehicles' : 'వాహనాల సంఖ్య'}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="routesManaged">{language === 'en' ? 'Routes Managed' : 'నిర్వహించే మార్గాలు'}</Label>
              <Input
                id="routesManaged"
                value={formData.routesManaged}
                onChange={(e) => handleInputChange('routesManaged', e.target.value)}
                placeholder={language === 'en' ? 'Number of routes' : 'మార్గాల సంఖ్య'}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Employment Details */}
      <Card className="border-2 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50">
          <CardTitle className="flex items-center gap-2">
            <Briefcase className="h-5 w-5 text-purple-600" />
            {language === 'en' ? 'Employment Details' : 'ఉద్యోగ వివరాలు'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="joiningDate">{language === 'en' ? 'Joining Date' : 'చేరిన తేదీ'}</Label>
              <Input
                id="joiningDate"
                type="date"
                value={formData.joiningDate}
                onChange={(e) => handleInputChange('joiningDate', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="employmentType">{language === 'en' ? 'Employment Type' : 'ఉద్యోగ రకం'}</Label>
              <Select value={formData.employmentType} onValueChange={(value) => handleInputChange('employmentType', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Permanent">{language === 'en' ? 'Permanent' : 'శాశ్వతం'}</SelectItem>
                  <SelectItem value="Contract">{language === 'en' ? 'Contract' : 'ఒప్పందం'}</SelectItem>
                  <SelectItem value="Temporary">{language === 'en' ? 'Temporary' : 'తాత్కాలికం'}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="defaultLanguage">{language === 'en' ? 'Preferred Language' : 'ప్రాధాన్య భాష'}</Label>
              <Select value={formData.defaultLanguage} onValueChange={(value) => handleInputChange('defaultLanguage', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="English">{language === 'en' ? 'English' : 'ఇంగ్లీష్'}</SelectItem>
                  <SelectItem value="Telugu">{language === 'en' ? 'Telugu' : 'తెలుగు'}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Submit Buttons */}
      <div className="flex gap-4">
        <Button onClick={handleSubmit} className="flex-1" size="lg">
          <Save className="w-4 h-4 mr-2" />
          {language === 'en' ? 'Save Fleet Manager' : 'ఫ్లీట్ మేనేజర్‌ను సేవ్ చేయండి'}
        </Button>
        <Button onClick={onBack} variant="outline" className="flex-1" size="lg">
          {language === 'en' ? 'Cancel' : 'రద్దు చేయండి'}
        </Button>
      </div>
    </div>
  );
}
