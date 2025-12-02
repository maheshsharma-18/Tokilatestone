import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { useLanguage } from '../../contexts/LanguageContext';
import { useSchools } from '../../contexts/SchoolContext';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';
import {
  TrendingUp,
  TrendingDown,
  Building2,
  Users,
  Award,
  Calendar,
  Target,
  BarChart3,
  ArrowLeft,
  CheckCircle,
  AlertTriangle,
  Activity,
  HardDrive,
  Zap,
  Clock,
  AlertCircle,
  Database
} from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { GradientStatsCard } from '../StatsCard';
import { CircularProgress } from '../CircularProgress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

interface SuperAdminAnalyticsProps {
  onBack?: () => void;
}

type TimePeriod = '7days' | '30days' | '3months' | '6months' | '1year' | 'all';

export function SuperAdminAnalytics({ onBack }: SuperAdminAnalyticsProps) {
  const { language } = useLanguage();
  const { schools } = useSchools();
  const [schoolGrowthPeriod, setSchoolGrowthPeriod] = useState<TimePeriod>('6months');
  const [userGrowthPeriod, setUserGrowthPeriod] = useState<TimePeriod>('6months');
  const [selectedSchoolFilter, setSelectedSchoolFilter] = useState<string>('all');

  // Comprehensive historical data for school growth
  const allSchoolGrowthData = [
    { month: 'Jan 2024', date: '2024-01', schools: 1, daysAgo: 300 },
    { month: 'Feb 2024', date: '2024-02', schools: 1, daysAgo: 270 },
    { month: 'Mar 2024', date: '2024-03', schools: 2, daysAgo: 240 },
    { month: 'Apr 2024', date: '2024-04', schools: 2, daysAgo: 210 },
    { month: 'May 2024', date: '2024-05', schools: 3, daysAgo: 180 },
    { month: 'Jun 2024', date: '2024-06', schools: 3, daysAgo: 150 },
    { month: 'Jul 2024', date: '2024-07', schools: 4, daysAgo: 120 },
    { month: 'Aug 2024', date: '2024-08', schools: 5, daysAgo: 90 },
    { month: 'Sep 2024', date: '2024-09', schools: 6, daysAgo: 60 },
    { month: 'Oct 2024', date: '2024-10', schools: 7, daysAgo: 30 },
    { month: 'Nov 2024', date: '2024-11', schools: 8, daysAgo: 15 },
    { month: 'Dec 2024', date: '2024-12', schools: 10, daysAgo: 0 },
  ];

  const allUserGrowthData = [
    { month: 'Jan 2024', date: '2024-01', users: 450, daysAgo: 300 },
    { month: 'Feb 2024', date: '2024-02', users: 650, daysAgo: 270 },
    { month: 'Mar 2024', date: '2024-03', users: 1200, daysAgo: 240 },
    { month: 'Apr 2024', date: '2024-04', users: 1450, daysAgo: 210 },
    { month: 'May 2024', date: '2024-05', users: 2100, daysAgo: 180 },
    { month: 'Jun 2024', date: '2024-06', users: 2750, daysAgo: 150 },
    { month: 'Jul 2024', date: '2024-07', users: 3200, daysAgo: 120 },
    { month: 'Aug 2024', date: '2024-08', users: 3800, daysAgo: 90 },
    { month: 'Sep 2024', date: '2024-09', users: 4500, daysAgo: 60 },
    { month: 'Oct 2024', date: '2024-10', users: 5200, daysAgo: 30 },
    { month: 'Nov 2024', date: '2024-11', users: 6000, daysAgo: 15 },
    { month: 'Dec 2024', date: '2024-12', users: 6800, daysAgo: 0 },
  ];

  // School performance metrics
  const allSchoolPerformance = schools.map((school, idx) => ({
    id: school.id,
    name: school.name,
    users: school.activeUsers || 120 + (idx * 50),
    compliance: school.complianceStatus === 'good' ? 95 : school.complianceStatus === 'warning' ? 75 : 55,
    engagement: 80 + (idx * 3),
    satisfaction: 85 + (idx * 2)
  }));

  // Filter school performance based on selection
  const schoolPerformance = selectedSchoolFilter === 'all' 
    ? allSchoolPerformance 
    : allSchoolPerformance.filter(school => school.id === selectedSchoolFilter);

  // Regional distribution
  const regionalData = [
    { region: 'North', schools: 3, users: 2400 },
    { region: 'South', schools: 2, users: 1800 },
    { region: 'East', schools: 2, users: 1600 },
    { region: 'West', schools: 3, users: 2200 },
  ];

  // School size distribution
  const schoolSizeDistribution = [
    { size: 'Small (0-500)', count: 3, percentage: 30 },
    { size: 'Medium (501-1000)', count: 4, percentage: 40 },
    { size: 'Large (1001+)', count: 3, percentage: 30 },
  ];

  // Platform health metrics
  const platformHealth = [
    { metric: 'Uptime', value: 99.8, target: 99.5 },
    { metric: 'Response Time', value: 95, target: 90 },
    { metric: 'User Satisfaction', value: 92, target: 85 },
    { metric: 'Feature Adoption', value: 88, target: 80 },
    { metric: 'Support Resolution', value: 94, target: 90 },
  ];

  // Support tickets data
  const supportTicketsData = [
    { month: 'Jul', tickets: 45, resolved: 42, pending: 3 },
    { month: 'Aug', tickets: 52, resolved: 49, pending: 3 },
    { month: 'Sep', tickets: 38, resolved: 36, pending: 2 },
    { month: 'Oct', tickets: 48, resolved: 45, pending: 3 },
    { month: 'Nov', tickets: 41, resolved: 39, pending: 2 },
    { month: 'Dec', tickets: 35, resolved: 33, pending: 2 },
  ];

  // System resource usage
  const systemResourcesData = [
    { month: 'Jul', storage: 42, apiCalls: 125000, activeUsers: 3200 },
    { month: 'Aug', storage: 48, apiCalls: 145000, activeUsers: 3800 },
    { month: 'Sep', storage: 54, apiCalls: 168000, activeUsers: 4500 },
    { month: 'Oct', storage: 61, apiCalls: 195000, activeUsers: 5200 },
    { month: 'Nov', storage: 68, apiCalls: 224000, activeUsers: 6000 },
    { month: 'Dec', storage: 75, apiCalls: 258000, activeUsers: 6800 },
  ];

  // Common issues by category
  const issueCategories = [
    { category: 'Login Issues', count: 12, percentage: 25 },
    { category: 'Data Sync', count: 8, percentage: 17 },
    { category: 'Performance', count: 6, percentage: 13 },
    { category: 'Feature Requests', count: 10, percentage: 21 },
    { category: 'Bug Reports', count: 7, percentage: 15 },
    { category: 'Other', count: 5, percentage: 9 },
  ];

  // School adoption features
  const featureAdoption = [
    { feature: 'Attendance', adoption: 98 },
    { feature: 'Grades', adoption: 95 },
    { feature: 'Homework', adoption: 88 },
    { feature: 'Events', adoption: 82 },
    { feature: 'Fleet', adoption: 65 },
    { feature: 'Tickets', adoption: 78 },
  ];

  const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

  // Filter data based on selected period
  const filterDataByPeriod = (data: any[], period: TimePeriod) => {
    const periodMap: Record<TimePeriod, number> = {
      '7days': 7,
      '30days': 30,
      '3months': 90,
      '6months': 180,
      '1year': 365,
      'all': 9999
    };
    
    const daysLimit = periodMap[period];
    return data.filter(item => item.daysAgo <= daysLimit);
  };

  const schoolGrowth = filterDataByPeriod(allSchoolGrowthData, schoolGrowthPeriod);
  const userGrowth = filterDataByPeriod(allUserGrowthData, userGrowthPeriod);

  const getPeriodLabel = (period: TimePeriod) => {
    const labels: Record<TimePeriod, { en: string; te: string }> = {
      '7days': { en: 'Last 7 days', te: 'గత 7 రోజులు' },
      '30days': { en: 'Last 30 days', te: 'గత 30 రోజులు' },
      '3months': { en: 'Last 3 months', te: 'గత 3 నెలలు' },
      '6months': { en: 'Last 6 months', te: 'గత 6 నెలలు' },
      '1year': { en: 'Last 1 year', te: 'గత 1 సంవత్సరం' },
      'all': { en: 'All time', te: 'అన్ని సమయాలు' }
    };
    return language === 'en' ? labels[period].en : labels[period].te;
  };

  const totalSchools = schools.length;
  const totalUsers = schools.reduce((sum, school) => sum + (school.activeUsers || 0), 0);
  const goodComplianceSchools = schools.filter(s => s.complianceStatus === 'good').length;

  return (
    <div className="space-y-6 pb-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        {onBack && (
          <Button variant="outline" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            {language === 'en' ? 'Back' : 'వెనుకకు'}
          </Button>
        )}
        <div>
          <h1 className="text-3xl font-bold">
            {language === 'en' ? 'Platform Analytics & Insights' : 'ప్లాట్‌ఫారమ్ విశ్లేషణ & అంతర్దృష్టులు'}
          </h1>
          <p className="text-muted-foreground">
            {language === 'en' ? 'Comprehensive platform-wide metrics and school performance' : 'సమగ్ర ప్లాట్‌ఫారమ్-వైడ్ మెట్రిక్స్ మరియు పాఠశాల పనితీరు'}
          </p>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-4">
        <GradientStatsCard
          title={language === 'en' ? 'Total Schools' : 'మొత్తం పాఠశాలలు'}
          value={totalSchools.toString()}
          subtitle={language === 'en' ? 'Active on platform' : 'ప్లాట్‌ఫారమ్‌లో క్రియాశీలం'}
          icon={Building2}
          color="primary"
        />
        <GradientStatsCard
          title={language === 'en' ? 'Total Users' : 'మొత్తం వినియోగదారులు'}
          value={totalUsers.toLocaleString()}
          subtitle={language === 'en' ? '+12% this month' : 'ఈ నెల +12%'}
          icon={Users}
          color="success"
        />
        <GradientStatsCard
          title={language === 'en' ? 'Platform Health' : 'ప్లాట్‌ఫారమ్ ఆరోగ్యం'}
          value="99.8%"
          subtitle={language === 'en' ? 'System uptime' : 'సిస్టమ్ అప్‌టైమ్'}
          icon={Activity}
          color="info"
        />
        <GradientStatsCard
          title={language === 'en' ? 'Good Compliance' : 'మంచి సమ్మతి'}
          value={`${goodComplianceSchools}/${totalSchools}`}
          subtitle={language === 'en' ? 'Schools meeting standards' : 'ప్రమాణాలకు అనుగుణంగా పాఠశాలలు'}
          icon={CheckCircle}
          color="purple"
        />
      </div>

      {/* Tabs for Different Analytics */}
      <Tabs defaultValue="growth" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 h-auto">
          <TabsTrigger value="growth" className="py-3">
            {language === 'en' ? 'Growth' : 'వృద్ధి'}
          </TabsTrigger>
          <TabsTrigger value="schools" className="py-3">
            {language === 'en' ? 'Schools' : 'పాఠశాలలు'}
          </TabsTrigger>
          <TabsTrigger value="platform" className="py-3">
            {language === 'en' ? 'Platform' : 'ప్లాట్‌ఫారమ్'}
          </TabsTrigger>
          <TabsTrigger value="operations" className="py-3">
            {language === 'en' ? 'Support & Operations' : 'మద్దతు & కార్యకలాపాలు'}
          </TabsTrigger>
        </TabsList>

        {/* Growth Analytics */}
        <TabsContent value="growth" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="card-3d">
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-primary" />
                    {language === 'en' ? 'School Onboarding Trend' : 'పాఠశాల ఆన్‌బోర్డింగ్ ధోరణి'}
                  </CardTitle>
                  <Select value={schoolGrowthPeriod} onValueChange={(value: TimePeriod) => setSchoolGrowthPeriod(value)}>
                    <SelectTrigger className="w-[180px]">
                      <Calendar className="h-4 w-4 mr-2" />
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="7days">{getPeriodLabel('7days')}</SelectItem>
                      <SelectItem value="30days">{getPeriodLabel('30days')}</SelectItem>
                      <SelectItem value="3months">{getPeriodLabel('3months')}</SelectItem>
                      <SelectItem value="6months">{getPeriodLabel('6months')}</SelectItem>
                      <SelectItem value="1year">{getPeriodLabel('1year')}</SelectItem>
                      <SelectItem value="all">{getPeriodLabel('all')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={schoolGrowth}>
                    <defs>
                      <linearGradient id="colorSchools" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Area 
                      type="monotone" 
                      dataKey="schools" 
                      stroke="#3b82f6" 
                      fillOpacity={1} 
                      fill="url(#colorSchools)"
                      name={language === 'en' ? 'Schools' : 'పాఠశాలలు'}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="card-3d">
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-primary" />
                    {language === 'en' ? 'User Growth Trend' : 'వినియోగదారు వృద్ధి ధోరణి'}
                  </CardTitle>
                  <Select value={userGrowthPeriod} onValueChange={(value: TimePeriod) => setUserGrowthPeriod(value)}>
                    <SelectTrigger className="w-[180px]">
                      <Calendar className="h-4 w-4 mr-2" />
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="7days">{getPeriodLabel('7days')}</SelectItem>
                      <SelectItem value="30days">{getPeriodLabel('30days')}</SelectItem>
                      <SelectItem value="3months">{getPeriodLabel('3months')}</SelectItem>
                      <SelectItem value="6months">{getPeriodLabel('6months')}</SelectItem>
                      <SelectItem value="1year">{getPeriodLabel('1year')}</SelectItem>
                      <SelectItem value="all">{getPeriodLabel('all')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={userGrowth}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar 
                      dataKey="users" 
                      fill="#10b981"
                      name={language === 'en' ? 'Users' : 'వినియోగదారులు'}
                      radius={[8, 8, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Regional Distribution */}
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="card-3d">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-primary" />
                  {language === 'en' ? 'Regional Distribution' : 'ప్రాంతీయ పంపిణీ'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={regionalData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="region" />
                    <YAxis yAxisId="left" orientation="left" stroke="#3b82f6" />
                    <YAxis yAxisId="right" orientation="right" stroke="#10b981" />
                    <Tooltip />
                    <Legend />
                    <Bar 
                      yAxisId="left"
                      dataKey="schools" 
                      fill="#3b82f6"
                      name={language === 'en' ? 'Schools' : 'పాఠశాలలు'}
                      radius={[8, 8, 0, 0]}
                    />
                    <Bar 
                      yAxisId="right"
                      dataKey="users" 
                      fill="#10b981"
                      name={language === 'en' ? 'Users' : 'వినియోగదారులు'}
                      radius={[8, 8, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="card-3d">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-primary" />
                  {language === 'en' ? 'School Size Distribution' : 'పాఠశాల పరిమాణ పంపిణీ'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={schoolSizeDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={(entry) => `${entry.size}: ${entry.count}`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="count"
                    >
                      {schoolSizeDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* School Performance */}
        <TabsContent value="schools" className="space-y-6">
          <Card className="card-3d">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-primary" />
                  {language === 'en' ? 'School Performance Comparison' : 'పాఠశాల పనితీరు పోలిక'}
                </CardTitle>
                <div className="w-64">
                  <Select value={selectedSchoolFilter} onValueChange={setSelectedSchoolFilter}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">
                        {language === 'en' ? 'All Schools' : 'అన్ని పాఠశాలలు'}
                      </SelectItem>
                      {schools.map(school => (
                        <SelectItem key={school.id} value={school.id}>
                          {school.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={schoolPerformance}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" angle={-20} textAnchor="end" height={100} />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar 
                    dataKey="users" 
                    fill="#3b82f6"
                    name={language === 'en' ? 'Active Users' : 'క్రియాశీల వినియోగదారులు'}
                    radius={[8, 8, 0, 0]}
                  />
                  <Bar 
                    dataKey="compliance" 
                    fill="#10b981"
                    name={language === 'en' ? 'Compliance %' : 'సమ్మతి %'}
                    radius={[8, 8, 0, 0]}
                  />
                  <Bar 
                    dataKey="engagement" 
                    fill="#f59e0b"
                    name={language === 'en' ? 'Engagement %' : 'నిశ్చితార్థం %'}
                    radius={[8, 8, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Top and Bottom Performers */}
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="card-3d">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-emerald-600">
                  <TrendingUp className="w-5 h-5" />
                  {language === 'en' ? 'Top Performing Schools' : 'అత్యుత్తమ పనితీరు పాఠశాలలు'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {schoolPerformance.slice().sort((a, b) => b.engagement - a.engagement).slice(0, 3).map((school, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-emerald-500 text-white font-bold">
                          #{idx + 1}
                        </div>
                        <div>
                          <p className="font-medium">{school.name}</p>
                          <p className="text-sm text-muted-foreground">{school.users} {language === 'en' ? 'users' : 'వినియోగదారులు'}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge className="bg-emerald-600">{school.engagement}%</Badge>
                        <p className="text-xs text-muted-foreground mt-1">
                          {language === 'en' ? 'Engagement' : 'నిశ్చితార్థం'}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="card-3d">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-amber-600">
                  <AlertTriangle className="w-5 h-5" />
                  {language === 'en' ? 'Need Attention' : 'దృష్టి అవసరం'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {schoolPerformance.slice().sort((a, b) => a.compliance - b.compliance).slice(0, 3).map((school, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-amber-500 text-white font-bold">
                          !
                        </div>
                        <div>
                          <p className="font-medium">{school.name}</p>
                          <p className="text-sm text-muted-foreground">{school.users} {language === 'en' ? 'users' : 'వినియోగదారులు'}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant="secondary">{school.compliance}%</Badge>
                        <p className="text-xs text-muted-foreground mt-1">
                          {language === 'en' ? 'Compliance' : 'సమ్మతి'}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Platform Health */}
        <TabsContent value="platform" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="card-3d">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5 text-primary" />
                  {language === 'en' ? 'Platform Health Metrics' : 'ప్లాట్‌ఫారమ్ ఆరోగ్య మెట్రిక్స్'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RadarChart data={platformHealth}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="metric" />
                    <PolarRadiusAxis angle={90} domain={[0, 100]} />
                    <Radar 
                      name={language === 'en' ? 'Current' : 'ప్రస్తుత'} 
                      dataKey="value" 
                      stroke="#3b82f6" 
                      fill="#3b82f6" 
                      fillOpacity={0.6} 
                    />
                    <Radar 
                      name={language === 'en' ? 'Target' : 'లక్ష్యం'} 
                      dataKey="target" 
                      stroke="#10b981" 
                      fill="#10b981" 
                      fillOpacity={0.3} 
                    />
                    <Legend />
                    <Tooltip />
                  </RadarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="card-3d">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-primary" />
                  {language === 'en' ? 'Feature Adoption' : 'ఫ���చర్ స్వీకరణ'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {featureAdoption.map((feature, idx) => (
                    <div key={idx} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{feature.feature}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full transition-all"
                            style={{ width: `${feature.adoption}%` }}
                          />
                        </div>
                        <span className="text-lg font-bold text-gray-900 min-w-[3rem] text-right">{feature.adoption}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Platform KPIs */}
          <div className="grid gap-4 md:grid-cols-4">
            <Card className="card-3d">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm">
                  {language === 'en' ? 'System Uptime' : 'సిస్టమ్ అప్‌టైమ్'}
                </CardTitle>
                <CheckCircle className="h-4 w-4 text-emerald-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl">99.8%</div>
                <p className="text-xs text-emerald-600">
                  {language === 'en' ? 'Above target' : 'లక్ష్యం కంటే ఎక్కువ'}
                </p>
              </CardContent>
            </Card>

            <Card className="card-3d">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm">
                  {language === 'en' ? 'Avg Response Time' : 'సగటు ప్రతిస్పందన సమయం'}
                </CardTitle>
                <Activity className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl">142ms</div>
                <p className="text-xs text-blue-600">
                  {language === 'en' ? 'Fast' : 'వేగంగా'}
                </p>
              </CardContent>
            </Card>

            <Card className="card-3d">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm">
                  {language === 'en' ? 'Support Tickets' : 'మద్దతు టిక్కెట్లు'}
                </CardTitle>
                <Target className="h-4 w-4 text-amber-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl">12</div>
                <p className="text-xs text-amber-600">
                  {language === 'en' ? 'Pending' : 'పెండింగ్'}
                </p>
              </CardContent>
            </Card>

            <Card className="card-3d">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm">
                  {language === 'en' ? 'User Satisfaction' : 'వినియోగదారు సంతృప్తి'}
                </CardTitle>
                <Award className="h-4 w-4 text-purple-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl">4.8/5</div>
                <p className="text-xs text-purple-600">
                  {language === 'en' ? 'Excellent' : 'అద్భుతమైన'}
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Support & Operations */}
        <TabsContent value="operations" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="card-3d">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-primary" />
                  {language === 'en' ? 'Support Tickets Trend' : 'మద్దతు టిక్కెట్ల ధోరణి'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={supportTicketsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar 
                      dataKey="resolved" 
                      fill="#10b981"
                      name={language === 'en' ? 'Resolved' : 'పరిష్కరించబడింది'}
                      radius={[8, 8, 0, 0]}
                      stackId="a"
                    />
                    <Bar 
                      dataKey="pending" 
                      fill="#f59e0b"
                      name={language === 'en' ? 'Pending' : 'పెండింగ్'}
                      radius={[8, 8, 0, 0]}
                      stackId="a"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="card-3d">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-primary" />
                  {language === 'en' ? 'Issues by Category' : 'వర్గం ద్వారా సమస్యలు'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={issueCategories}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={(entry) => `${entry.category}: ${entry.count}`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="count"
                    >
                      {issueCategories.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* System Resources */}
          <Card className="card-3d">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="w-5 h-5 text-primary" />
                {language === 'en' ? 'System Resource Usage Trends' : 'సిస్టమ్ వనరుల వినియోగ ధోరణులు'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <LineChart data={systemResourcesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Line 
                    yAxisId="left"
                    type="monotone" 
                    dataKey="storage" 
                    stroke="#8b5cf6" 
                    strokeWidth={2}
                    name={language === 'en' ? 'Storage (GB)' : 'నిల్వ (GB)'}
                  />
                  <Line 
                    yAxisId="right"
                    type="monotone" 
                    dataKey="apiCalls" 
                    stroke="#3b82f6" 
                    strokeWidth={2}
                    name={language === 'en' ? 'API Calls (K)' : 'API కాల్స్ (K)'}
                  />
                  <Line 
                    yAxisId="right"
                    type="monotone" 
                    dataKey="activeUsers" 
                    stroke="#10b981" 
                    strokeWidth={2}
                    name={language === 'en' ? 'Active Users' : 'క్రియాశీల వినియోగదారులు'}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Operational KPIs */}
          <div className="grid gap-4 md:grid-cols-4">
            <Card className="card-3d">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm">
                  {language === 'en' ? 'Open Tickets' : 'ఓపెన్ టిక్కెట్లు'}
                </CardTitle>
                <AlertCircle className="h-4 w-4 text-amber-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl">12</div>
                <p className="text-xs text-amber-600">
                  {language === 'en' ? 'Awaiting response' : 'ప్రతిస్పందన కోసం వేచి ఉంది'}
                </p>
              </CardContent>
            </Card>

            <Card className="card-3d">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm">
                  {language === 'en' ? 'Avg Resolution Time' : 'సగటు పరిష్కార సమయం'}
                </CardTitle>
                <Clock className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl">2.4h</div>
                <p className="text-xs text-blue-600">
                  {language === 'en' ? 'Fast response' : 'వేగవంతమైన ప్రతిస్పందన'}
                </p>
              </CardContent>
            </Card>

            <Card className="card-3d">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm">
                  {language === 'en' ? 'Storage Used' : 'ఉపయోగించిన నిల్వ'}
                </CardTitle>
                <HardDrive className="h-4 w-4 text-purple-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl">75GB</div>
                <p className="text-xs text-purple-600">
                  {language === 'en' ? 'of 500GB available' : '500GB అందుబాటులో ఉన్నది'}
                </p>
              </CardContent>
            </Card>

            <Card className="card-3d">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm">
                  {language === 'en' ? 'API Performance' : 'API పనితీరు'}
                </CardTitle>
                <Zap className="h-4 w-4 text-emerald-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl">142ms</div>
                <p className="text-xs text-emerald-600">
                  {language === 'en' ? 'Avg response time' : 'సగటు ప్రతిస్పందన సమయం'}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Recent Support Issues */}
          <Card className="card-3d">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-primary" />
                {language === 'en' ? 'Recent Support Issues' : 'ఇటీవలి మద్దతు సమస్యలు'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { school: 'Delhi Public School', issue: 'Login timeout issue', priority: 'high', time: '2h ago' },
                  { school: 'Greenwood High', issue: 'Data sync delay', priority: 'medium', time: '5h ago' },
                  { school: 'St. Mary\'s School', issue: 'Feature request: Bulk upload', priority: 'low', time: '1d ago' },
                  { school: 'Sunrise Academy', issue: 'Report generation error', priority: 'high', time: '1d ago' },
                ].map((issue, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{issue.school}</p>
                        <Badge variant={issue.priority === 'high' ? 'destructive' : issue.priority === 'medium' ? 'secondary' : 'outline'}>
                          {issue.priority}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{issue.issue}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">{issue.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
