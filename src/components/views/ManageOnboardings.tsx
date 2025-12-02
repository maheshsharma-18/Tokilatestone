import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { useLanguage } from '../../contexts/LanguageContext';
import { useSchools } from '../../contexts/SchoolContext';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { ArrowLeft, Users, GraduationCap, Bus, UserPlus, School } from 'lucide-react';
import { Badge } from '../ui/badge';

interface ManageOnboardingsProps {
  onBack: () => void;
  onNavigate: (view: string, schoolId?: string) => void;
}

export function ManageOnboardings({ onBack, onNavigate }: ManageOnboardingsProps) {
  const { language } = useLanguage();
  const { schools } = useSchools();
  const [selectedSchoolId, setSelectedSchoolId] = useState<string>('');

  const selectedSchool = schools.find(s => s.id === selectedSchoolId);

  const onboardingOptions = [
    {
      id: 'teacher',
      title: language === 'en' ? 'Add Teacher' : 'ఉపాధ్యాయుడిని జోడించండి',
      description: language === 'en' ? 'Onboard a new teacher to the school' : 'పాఠశాలకు కొత్త ఉపాధ్యాయుడిని చేర్చండి',
      icon: Users,
      color: 'from-blue-500 to-indigo-600',
      view: 'onboard-teacher'
    },
    {
      id: 'student',
      title: language === 'en' ? 'Add Student' : 'విద్యార్థిని జోడించండి',
      description: language === 'en' ? 'Onboard a new student to the school' : 'పాఠశాలకు కొత్త విద్యార్థిని చేర్చండి',
      icon: GraduationCap,
      color: 'from-green-500 to-emerald-600',
      view: 'onboard-student'
    },
    {
      id: 'fleet',
      title: language === 'en' ? 'Add Fleet Manager' : 'ఫ్లీట్ మేనేజర్‌ను జోడించండి',
      description: language === 'en' ? 'Onboard a new fleet manager' : 'కొత్త ఫ్లీట్ మేనేజర్‌ను చేర్చండి',
      icon: Bus,
      color: 'from-orange-500 to-amber-600',
      view: 'onboard-fleet-manager'
    },
    {
      id: 'driver',
      title: language === 'en' ? 'Add Driver' : 'డ్రైవర్‌ను జోడించండి',
      description: language === 'en' ? 'Onboard a new driver' : 'కొత్త డ్రైవర్‌ను చేర్చండి',
      icon: UserPlus,
      color: 'from-purple-500 to-violet-600',
      view: 'onboard-driver'
    }
  ];

  const handleOnboardingClick = (view: string) => {
    if (!selectedSchoolId) {
      alert(language === 'en' ? 'Please select a school first' : 'దయచేసి ముందుగా పాఠశాలను ఎంచుకోండి');
      return;
    }
    onNavigate(view, selectedSchoolId);
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
            <h1 className="text-2xl">{language === 'en' ? 'Manage Onboardings' : 'ఆన్‌బోర్డింగ్‌లను నిర్వహించండి'}</h1>
            <p className="text-sm text-muted-foreground">
              {language === 'en' ? 'Onboard users on behalf of school principals' : 'పాఠశాల ప్రధానోపాధ్యాయుల తరపున వినియోగదారులను చేర్చండి'}
            </p>
          </div>
        </div>
        <Badge variant="secondary" className="text-lg px-4 py-2">
          {language === 'en' ? 'Super Admin Only' : 'సూపర్ అడ్మిన్ మాత్రమే'}
        </Badge>
      </div>

      {/* School Selection */}
      <Card className="card-3d">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <School className="w-5 h-5 text-primary" />
            {language === 'en' ? 'Select School' : 'పాఠశాలను ఎంచుకోండి'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="text-sm mb-2 block">
                {language === 'en' ? 'Choose a school to manage onboardings' : 'ఆన్‌బోర్డింగ్‌లను నిర్వహించడానికి పాఠశాలను ఎంచుకోండి'}
              </label>
              <Select value={selectedSchoolId} onValueChange={setSelectedSchoolId}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={language === 'en' ? 'Select a school...' : 'పాఠశాలను ఎంచుకోండి...'} />
                </SelectTrigger>
                <SelectContent>
                  {schools.map(school => (
                    <SelectItem key={school.id} value={school.id}>
                      {school.name}
                      {school.nameInTelugu && ` (${school.nameInTelugu})`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {selectedSchool && (
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h3 className="font-semibold text-blue-900">{selectedSchool.name}</h3>
                {selectedSchool.nameInTelugu && (
                  <p className="text-sm text-blue-700">{selectedSchool.nameInTelugu}</p>
                )}
                <p className="text-sm text-blue-600 mt-1">
                  {language === 'en' ? 'Principal:' : 'ప్రధానోపాధ్యాయుడు:'} {selectedSchool.principalName}
                </p>
                <p className="text-sm text-blue-600">
                  {language === 'en' ? 'Location:' : 'స్థానం:'} {selectedSchool.address}
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Onboarding Options */}
      {selectedSchoolId && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {onboardingOptions.map((option) => {
            const Icon = option.icon;
            return (
              <Card
                key={option.id}
                className="card-3d hover:shadow-2xl transition-all cursor-pointer group"
                onClick={() => handleOnboardingClick(option.view)}
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className={`p-4 rounded-xl bg-gradient-to-br ${option.color} shadow-lg group-hover:scale-110 transition-transform`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl mb-2">{option.title}</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        {option.description}
                      </p>
                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOnboardingClick(option.view);
                        }}
                      >
                        {language === 'en' ? 'Start Onboarding' : 'ఆన్‌బోర్డింగ్ ప్రారంభించండి'}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* Empty State */}
      {!selectedSchoolId && (
        <Card className="card-3d">
          <CardContent className="p-12 text-center">
            <School className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
            <h3 className="text-xl mb-2 text-muted-foreground">
              {language === 'en' ? 'No School Selected' : 'పాఠశాల ఎంపిక చేయబడలేదు'}
            </h3>
            <p className="text-sm text-muted-foreground">
              {language === 'en' 
                ? 'Please select a school from the dropdown above to start managing onboardings' 
                : 'ఆన్‌బోర్డింగ్‌లను నిర్వహించడం ప్రారంభించడానికి దయచేసి పై డ్రాప్‌డౌన్ నుండి పాఠశాలను ఎంచుకోండి'}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
