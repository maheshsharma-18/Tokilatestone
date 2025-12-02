import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAuth } from '../../contexts/AuthContext';
import { useSchools } from '../../contexts/SchoolContext';
import {
  Building2,
  Users,
  CheckCircle2,
  AlertCircle,
  Search,
  Plus,
  Edit,
  Eye,
  MapPin,
  Phone,
  Mail,
  ArrowLeft,
  TrendingUp,
  Calendar,
  UserPlus
} from 'lucide-react';
import { GradientStatsCard } from '../StatsCard';
import { CircularProgress } from '../CircularProgress';
import { SchoolOnboarding } from './SchoolOnboarding';

interface SchoolsViewProps {
  onBack?: () => void;
}

export function SchoolsView({ onBack }: SchoolsViewProps) {
  const { language } = useLanguage();
  const { user } = useAuth();
  const { schools } = useSchools();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSchool, setSelectedSchool] = useState<any>(null);
  const [showOnboarding, setShowOnboarding] = useState(false);

  const filteredSchools = schools.filter(school =>
    school.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    school.principalName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    school.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (showOnboarding) {
    return <SchoolOnboarding onBack={() => setShowOnboarding(false)} />;
  }

  if (selectedSchool) {
    return (
      <SchoolDetail
        school={selectedSchool}
        onBack={() => setSelectedSchool(null)}
      />
    );
  }

  const totalActiveUsers = schools.reduce((sum, school) => sum + school.activeUsers, 0);
  const goodComplianceCount = schools.filter(s => s.complianceStatus === 'good').length;
  const warningCount = schools.filter(s => s.complianceStatus === 'warning').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {onBack && (
            <Button variant="outline" onClick={onBack}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              {language === 'en' ? 'Back' : 'వెనుకకు'}
            </Button>
          )}
          <div>
            <h1 className="text-3xl font-bold">
              {language === 'en' ? 'Schools Management' : 'పాఠశాలల నిర్వహణ'}
            </h1>
            <p className="text-muted-foreground">
              {language === 'en' ? 'Manage all schools on the Toki Tech platform' : 'టోకీ టెక్ ప్లాట్‌ఫారమ్‌లో అన్ని పాఠశాలలను నిర్వహించండి'}
            </p>
          </div>
        </div>
        <Button className="bg-primary hover:bg-primary/90" onClick={() => setShowOnboarding(true)}>
          <Plus className="w-4 h-4 mr-2" />
          {language === 'en' ? 'Add New School' : 'కొత్త పాఠశాల జోడించండి'}
        </Button>
      </div>

      {/* Overview Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <GradientStatsCard
          title={language === 'en' ? 'Total Schools' : 'మొత్తం పాఠశాలలు'}
          value={schools.length}
          subtitle={language === 'en' ? 'Active on platform' : 'ప్లాట్‌ఫారమ్‌లో క్రియాశీలం'}
          icon={Building2}
          color="primary"
        />
        <GradientStatsCard
          title={language === 'en' ? 'Total Users' : 'మొత్తం వినియోగదారులు'}
          value={totalActiveUsers.toLocaleString()}
          subtitle={language === 'en' ? 'Across all schools' : 'అన్ని పాఠశాలల్లో'}
          icon={Users}
          color="success"
        />
        <GradientStatsCard
          title={language === 'en' ? 'Good Compliance' : 'మంచి సమ్మతి'}
          value={goodComplianceCount}
          subtitle={language === 'en' ? 'Schools performing well' : 'బాగా పనిచేస్తున్న పాఠశాలలు'}
          icon={CheckCircle2}
          color="info"
        />
        <GradientStatsCard
          title={language === 'en' ? 'Need Attention' : 'దృష్టి అవసరం'}
          value={warningCount}
          subtitle={language === 'en' ? 'Schools with warnings' : 'హెచ్చరికలతో పాఠశాలలు'}
          icon={AlertCircle}
          color="danger"
        />
      </div>

      {/* Search */}
      <div className="relative w-full md:w-96">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder={language === 'en' ? 'Search schools...' : 'పాఠశాలలను వెతకండి...'}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Schools Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredSchools.map((school) => (
          <Card
            key={school.id}
            className="card-3d cursor-pointer hover:shadow-xl transition-all"
            onClick={() => setSelectedSchool(school)}
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3 flex-1">
                  {school.logo ? (
                    <img 
                      src={school.logo} 
                      alt={school.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  ) : (
                    <div 
                      className="w-12 h-12 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: school.primaryColor }}
                    >
                      <Building2 className="w-6 h-6 text-white" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-lg truncate">{school.name}</CardTitle>
                    <p className="text-sm text-muted-foreground truncate">
                      {language === 'te' && school.nameInTelugu ? school.nameInTelugu : school.address}
                    </p>
                  </div>
                </div>
                <Badge 
                  variant={school.complianceStatus === 'good' ? 'default' : 'secondary'}
                  className={school.complianceStatus === 'good' ? 'bg-emerald-600' : 'bg-amber-600'}
                >
                  {school.complianceStatus === 'good' ? (
                    <CheckCircle2 className="w-3 h-3 mr-1" />
                  ) : (
                    <AlertCircle className="w-3 h-3 mr-1" />
                  )}
                  {school.complianceStatus === 'good' ? 'Good' : 'Warning'}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Users className="w-4 h-4 text-muted-foreground" />
                  <span>{school.activeUsers.toLocaleString()} {language === 'en' ? 'Active Users' : 'క్రియాశీల వినియోగదారులు'}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span className="truncate">{school.address}</span>
                </div>
              </div>

              <div className="p-3 bg-gray-50 rounded-xl">
                <p className="text-xs text-muted-foreground mb-1">
                  {language === 'en' ? 'Principal' : 'ప్రధానోపాధ్యాయుడు'}
                </p>
                <p className="font-medium">{school.principalName}</p>
                <p className="text-sm text-muted-foreground">{school.principalPhone}</p>
              </div>

              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedSchool(school);
                  }}
                >
                  <Eye className="w-4 h-4 mr-2" />
                  {language === 'en' ? 'View' : 'చూడండి'}
                </Button>
                <Button 
                  variant="outline"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Edit className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredSchools.length === 0 && (
        <div className="text-center py-12">
          <Building2 className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">
            {language === 'en' ? 'No schools found' : 'పాఠశాలలు కనుగొనబడలేదు'}
          </p>
        </div>
      )}
    </div>
  );
}

interface SchoolDetailProps {
  school: any;
  onBack: () => void;
}

function SchoolDetail({ school, onBack }: SchoolDetailProps) {
  const { language } = useLanguage();

  // Mock data for school details
  const mockStats = {
    totalStudents: 650,
    totalTeachers: 45,
    totalClasses: 24,
    avgAttendance: 94,
    avgGrade: 83,
    activeTickets: 8
  };

  const recentActivities = [
    { type: 'attendance', title: 'Attendance marked for Class 10A', time: '2h ago' },
    { type: 'grade', title: 'Grades submitted for Mid-term exam', time: '5h ago' },
    { type: 'user', title: 'New teacher added - Ms. Sarah Johnson', time: '1d ago' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            {language === 'en' ? 'Back to Schools' : 'పాఠశాలలకు తిరిగి'}
          </Button>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Edit className="w-4 h-4 mr-2" />
            {language === 'en' ? 'Edit School' : 'పాఠశాలను సవరించండి'}
          </Button>
        </div>
      </div>

      {/* School Info */}
      <Card className="card-3d">
        <CardContent className="pt-6">
          <div className="flex items-start gap-6">
            {school.logo ? (
              <img 
                src={school.logo} 
                alt={school.name}
                className="w-24 h-24 rounded-2xl object-cover shadow-lg"
              />
            ) : (
              <div 
                className="w-24 h-24 rounded-2xl flex items-center justify-center shadow-lg"
                style={{ backgroundColor: school.primaryColor }}
              >
                <Building2 className="w-12 h-12 text-white" />
              </div>
            )}
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-3xl font-bold">{school.name}</h2>
                  {school.nameInTelugu && (
                    <p className="text-lg text-muted-foreground mt-1">{school.nameInTelugu}</p>
                  )}
                  <div className="flex items-center gap-2 mt-3">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">{school.address}</span>
                  </div>
                </div>
                <Badge 
                  variant={school.complianceStatus === 'good' ? 'default' : 'secondary'}
                  className={`${school.complianceStatus === 'good' ? 'bg-emerald-600' : 'bg-amber-600'} text-lg px-4 py-2`}
                >
                  {school.complianceStatus === 'good' ? 'Good Compliance' : 'Needs Attention'}
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="p-4 bg-indigo-50 rounded-xl">
                  <p className="text-sm text-muted-foreground mb-1">
                    {language === 'en' ? 'Principal' : 'ప్రధానోపాధ్యాయుడు'}
                  </p>
                  <p className="font-medium text-lg">{school.principalName}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Phone className="w-3 h-3 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">{school.principalPhone}</span>
                  </div>
                </div>
                <div className="p-4 bg-purple-50 rounded-xl">
                  <p className="text-sm text-muted-foreground mb-1">
                    {language === 'en' ? 'Active Users' : 'క్రియాశీల వినియోగదారులు'}
                  </p>
                  <p className="font-medium text-lg">{school.activeUsers.toLocaleString()}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <TrendingUp className="w-3 h-3 text-emerald-600" />
                    <span className="text-sm text-emerald-600">+12% this month</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <GradientStatsCard
          title={language === 'en' ? 'Total Students' : 'మొత్తం విద్యార్థులు'}
          value={mockStats.totalStudents}
          subtitle={language === 'en' ? 'Enrolled students' : 'నమోదైన విద్యార్థులు'}
          icon={Users}
          color="primary"
        />
        <GradientStatsCard
          title={language === 'en' ? 'Teaching Staff' : 'బోధనా సిబ్బంది'}
          value={mockStats.totalTeachers}
          subtitle={language === 'en' ? 'Active teachers' : 'క్రియాశీల ఉపాధ్యాయులు'}
          icon={Users}
          color="success"
        />
        <GradientStatsCard
          title={language === 'en' ? 'Classes' : 'తరగతులు'}
          value={mockStats.totalClasses}
          subtitle={language === 'en' ? 'Total sections' : 'మొత్తం విభాగాలు'}
          icon={Building2}
          color="info"
        />
      </div>

      {/* Performance Metrics */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="card-3d">
          <CardHeader>
            <CardTitle className="text-center">
              {language === 'en' ? 'Attendance Rate' : 'హాజరు రేటు'}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center">
            <CircularProgress value={mockStats.avgAttendance} size={120} strokeWidth={8} />
          </CardContent>
        </Card>

        <Card className="card-3d">
          <CardHeader>
            <CardTitle className="text-center">
              {language === 'en' ? 'Average Grade' : 'సగటు గ్రే���్'}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center">
            <CircularProgress value={mockStats.avgGrade} size={120} strokeWidth={8} />
          </CardContent>
        </Card>

        <Card className="card-3d">
          <CardHeader>
            <CardTitle className="text-center">
              {language === 'en' ? 'Active Tickets' : 'క్రియాశీల టిక్కెట్లు'}
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-6xl font-bold text-primary">{mockStats.activeTickets}</p>
            <p className="text-muted-foreground mt-2">
              {language === 'en' ? 'Need resolution' : 'పరిష్కారం అవసరం'}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activities */}
      <Card className="card-3d">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-primary" />
            {language === 'en' ? 'Recent Activities' : 'ఇటీవలి కార్యకలాపాలు'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentActivities.map((activity, idx) => (
              <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                <div className={`p-2 rounded-lg ${
                  activity.type === 'attendance' ? 'bg-blue-100' :
                  activity.type === 'grade' ? 'bg-emerald-100' : 'bg-purple-100'
                }`}>
                  {activity.type === 'attendance' && <CheckCircle2 className="w-4 h-4 text-blue-600" />}
                  {activity.type === 'grade' && <TrendingUp className="w-4 h-4 text-emerald-600" />}
                  {activity.type === 'user' && <Users className="w-4 h-4 text-purple-600" />}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{activity.title}</p>
                </div>
                <span className="text-xs text-muted-foreground">{activity.time}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}