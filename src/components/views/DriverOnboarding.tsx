import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { useLanguage } from '../../contexts/LanguageContext';
import { useSchools } from '../../contexts/SchoolContext';
import { ArrowLeft, User, Phone, Calendar, Award, Save, School as SchoolIcon } from 'lucide-react';
import { Badge } from '../ui/badge';
import { toast } from 'sonner@2.0.3';

interface DriverOnboardingProps {
  onBack: () => void;
  schoolId?: string;
}

export function DriverOnboarding({ onBack, schoolId }: DriverOnboardingProps) {
  const { language } = useLanguage();
  const { schools } = useSchools();
  const selectedSchool = schoolId ? schools.find(s => s.id === schoolId) : null;

  const [formData, setFormData] = useState({
    driverId: '',
    name: '',
    phone: '',
    licenseNumber: '',
    experience: '',
    joiningDate: '',
    assignedBus: '',
    status: 'active' as 'active' | 'inactive' | 'on-leave'
  });

  const generateDriverId = () => {
    const id = 'DRV' + Math.random().toString(36).substr(2, 6).toUpperCase();
    handleInputChange('driverId', id);
  };

  React.useEffect(() => {
    generateDriverId();
  }, []);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.phone || !formData.licenseNumber) {
      toast.error(language === 'en' ? 'Please fill all required fields' : 'దయచేసి అన్ని అవసరమైన ఫీల్డ్‌లను పూరించండి');
      return;
    }
    console.log('Driver onboarding data:', formData, 'School:', selectedSchool?.name);
    toast.success(language === 'en' ? 'Driver onboarded successfully!' : 'డ్రైవర్ విజయవంతంగా చేర్చబడింది!');
    onBack();
  };

  const busOptions = ['TG12-AB-1234', 'TG12-CD-5678', 'TG12-EF-9012', 'TG12-GH-3456'];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl">{language === 'en' ? 'Add Driver' : 'డ్రైవర్‌ను జోడించండి'}</h1>
            <p className="text-sm text-muted-foreground">
              {selectedSchool 
                ? `${language === 'en' ? 'Onboard a new driver to' : 'కొత్త డ్రైవర్‌ను చేర్చండి'} ${selectedSchool.name}` 
                : (language === 'en' ? 'Onboard a new driver' : 'కొత్త డ్రైవర్‌ను చేర్చండి')}
            </p>
          </div>
        </div>
        <Badge variant="secondary">{selectedSchool ? 'Super Admin' : 'Fleet Manager'}</Badge>
      </div>

      {/* School Information */}
      {selectedSchool && (
        <Card className="card-3d bg-purple-50 border-purple-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <SchoolIcon className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-purple-900">{selectedSchool.name}</h3>
                {selectedSchool.nameInTelugu && (
                  <p className="text-sm text-purple-700">{selectedSchool.nameInTelugu}</p>
                )}
                <p className="text-sm text-purple-600">
                  {language === 'en' ? 'Principal:' : 'ప్రధానోపాధ్యాయుడు:'} {selectedSchool.principalName}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Driver Identity */}
      <Card className="border-2 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-purple-50 to-indigo-50">
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5 text-purple-600" />
            {language === 'en' ? 'Driver Identity' : 'డ్రైవర్ గుర్తింపు'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="driverId">{language === 'en' ? 'Driver ID' : 'డ్రైవర్ ID'} *</Label>
              <Input
                id="driverId"
                value={formData.driverId}
                disabled
                className="bg-gray-100"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="name">{language === 'en' ? 'Full Name' : 'పూర్తి పేరు'} *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder={language === 'en' ? 'Enter full name' : 'పూర్తి పేరు నమోదు చేయండి'}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">{language === 'en' ? 'Phone Number' : 'ఫోన్ నంబర్'} *</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder="+91 98765 43210"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">{language === 'en' ? 'Status' : 'స్థితి'}</Label>
              <Select value={formData.status} onValueChange={(value) => handleInputChange('status', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">{language === 'en' ? 'Active' : 'క్రియాశీలం'}</SelectItem>
                  <SelectItem value="inactive">{language === 'en' ? 'Inactive' : 'నిష్క్రియం'}</SelectItem>
                  <SelectItem value="on-leave">{language === 'en' ? 'On Leave' : 'సెలవులో'}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* License & Experience */}
      <Card className="border-2 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-amber-50 to-orange-50">
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5 text-amber-600" />
            {language === 'en' ? 'License & Experience' : 'లైసెన్స్ & అనుభవం'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="licenseNumber">{language === 'en' ? 'License Number' : 'లైసెన్స్ నంబర్'} *</Label>
              <Input
                id="licenseNumber"
                value={formData.licenseNumber}
                onChange={(e) => handleInputChange('licenseNumber', e.target.value)}
                placeholder={language === 'en' ? 'Enter license number' : 'లైసెన్స్ నంబర్ నమోదు చేయండి'}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="experience">{language === 'en' ? 'Years of Experience' : 'అనుభవ సంవత్సరాలు'}</Label>
              <Input
                id="experience"
                value={formData.experience}
                onChange={(e) => handleInputChange('experience', e.target.value)}
                placeholder={language === 'en' ? 'e.g., 5 years' : 'ఉదా., 5 సంవత్సరాలు'}
              />
            </div>

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
              <Label htmlFor="assignedBus">{language === 'en' ? 'Assigned Bus' : 'కేటాయించిన బస్'}</Label>
              <Select value={formData.assignedBus} onValueChange={(value) => handleInputChange('assignedBus', value)}>
                <SelectTrigger>
                  <SelectValue placeholder={language === 'en' ? 'Select bus...' : 'బస్ ఎంచుకోండి...'} />
                </SelectTrigger>
                <SelectContent>
                  {busOptions.map(bus => (
                    <SelectItem key={bus} value={bus}>{bus}</SelectItem>
                  ))}
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
          {language === 'en' ? 'Save Driver' : 'డ్రైవర్‌ను సేవ్ చేయండి'}
        </Button>
        <Button onClick={onBack} variant="outline" className="flex-1" size="lg">
          {language === 'en' ? 'Cancel' : 'రద్దు చేయండి'}
        </Button>
      </div>
    </div>
  );
}
