import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAuth } from '../../contexts/AuthContext';
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
  Area
} from 'recharts';
import {
  TrendingUp,
  TrendingDown,
  Users,
  GraduationCap,
  Award,
  Calendar,
  BookOpen,
  Target,
  BarChart3,
  ArrowLeft
} from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { GradientStatsCard } from '../StatsCard';
import { CircularProgress } from '../CircularProgress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

interface AnalyticsViewProps {
  onBack?: () => void;
}

export function AnalyticsView({ onBack }: AnalyticsViewProps) {
  const { language } = useLanguage();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  // Mock data for analytics
  const monthlyAttendance = [
    { month: 'Apr', attendance: 92, target: 90 },
    { month: 'May', attendance: 94, target: 90 },
    { month: 'Jun', attendance: 91, target: 90 },
    { month: 'Jul', attendance: 95, target: 90 },
    { month: 'Aug', attendance: 93, target: 90 },
    { month: 'Sep', attendance: 96, target: 90 },
    { month: 'Oct', attendance: 94, target: 90 },
  ];

  const subjectPerformance = [
    { subject: 'Math', average: 85, passRate: 92, topScore: 98 },
    { subject: 'Science', average: 82, passRate: 88, topScore: 96 },
    { subject: 'English', average: 88, passRate: 95, topScore: 99 },
    { subject: 'Social', average: 80, passRate: 85, topScore: 94 },
    { subject: 'Hindi', average: 78, passRate: 82, topScore: 92 },
  ];

  const classComparison = [
    { class: '10A', attendance: 95, average: 85, students: 35 },
    { class: '10B', attendance: 93, average: 82, students: 38 },
    { class: '9A', attendance: 94, average: 83, students: 40 },
    { class: '9B', attendance: 92, average: 80, students: 42 },
    { class: '8A', attendance: 96, average: 86, students: 36 },
    { class: '8B', attendance: 91, average: 81, students: 39 },
  ];

  const gradeDistribution = [
    { grade: 'A+ (90-100)', count: 145, percentage: 24 },
    { grade: 'A (80-89)', count: 185, percentage: 31 },
    { grade: 'B (70-79)', count: 156, percentage: 26 },
    { grade: 'C (60-69)', count: 85, percentage: 14 },
    { grade: 'Below 60', count: 29, percentage: 5 },
  ];

  const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#6b7280'];

  const teacherPerformance = [
    { name: 'Ms. Priya Sharma', subject: 'Math', avgScore: 87, studentsPass: 95, trend: 'up' },
    { name: 'Mr. Amit Verma', subject: 'Science', avgScore: 82, studentsPass: 88, trend: 'up' },
    { name: 'Mrs. Sarah Johnson', subject: 'English', avgScore: 88, studentsPass: 96, trend: 'up' },
    { name: 'Mr. Rakesh Sharma', subject: 'Hindi', avgScore: 78, studentsPass: 82, trend: 'down' },
    { name: 'Dr. Meena Singh', subject: 'Biology', avgScore: 85, studentsPass: 90, trend: 'up' },
  ];

  const examTrends = [
    { exam: 'Unit Test 1', math: 82, science: 78, english: 85, social: 80 },
    { exam: 'Mid-term', math: 84, science: 80, english: 86, social: 81 },
    { exam: 'Unit Test 2', math: 86, science: 82, english: 88, social: 83 },
    { exam: 'Pre-final', math: 85, science: 84, english: 89, social: 82 },
  ];

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
            {language === 'en' ? 'School Analytics & Insights' : 'పాఠశాల విశ్లేషణ & అంతర్దృష్టులు'}
          </h1>
          <p className="text-muted-foreground">
            {language === 'en' ? 'Comprehensive performance metrics and trends' : 'సమగ్ర పనితీరు మెట్రిక్స్ మరియు ధోరణులు'}
          </p>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-4">
        <GradientStatsCard
          title={language === 'en' ? 'Overall Attendance' : 'మొత్తం హాజరు'}
          value="94.2%"
          subtitle={language === 'en' ? '+2.3% vs last month' : 'గత నెలతో పోల్చితే +2.3%'}
          icon={Users}
          color="success"
        />
        <GradientStatsCard
          title={language === 'en' ? 'Average Grade' : 'సగటు గ్రేడ్'}
          value="83.5%"
          subtitle={language === 'en' ? '+1.8% improvement' : '+1.8% మెరుగుదల'}
          icon={GraduationCap}
          color="info"
        />
        <GradientStatsCard
          title={language === 'en' ? 'Pass Rate' : 'పాస్ రేటు'}
          value="89.7%"
          subtitle={language === 'en' ? 'Above target 85%' : 'లక్ష్యం 85% కంటే ఎక్కువ'}
          icon={Award}
          color="primary"
        />
        <GradientStatsCard
          title={language === 'en' ? 'Active Students' : 'క్రియాశీల విద్యార్థులు'}
          value="600"
          subtitle={language === 'en' ? 'Across all classes' : 'అన్ని తరగతులలో'}
          icon={Target}
          color="purple"
        />
      </div>

      {/* Tabs for Different Analytics */}
      <Tabs defaultValue="attendance" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 h-auto">
          <TabsTrigger value="attendance" className="py-3">
            {language === 'en' ? 'Attendance' : 'హాజరు'}
          </TabsTrigger>
          <TabsTrigger value="academic" className="py-3">
            {language === 'en' ? 'Academic' : 'అకడమిక్'}
          </TabsTrigger>
          <TabsTrigger value="teachers" className="py-3">
            {language === 'en' ? 'Teachers' : 'ఉపాధ్యాయులు'}
          </TabsTrigger>
          <TabsTrigger value="comparison" className="py-3">
            {language === 'en' ? 'Comparison' : 'పోలిక'}
          </TabsTrigger>
        </TabsList>

        {/* Attendance Analytics */}
        <TabsContent value="attendance" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="card-3d">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-primary" />
                  {language === 'en' ? 'Monthly Attendance Trend' : 'నెలవారీ హాజరు ధోరణి'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={monthlyAttendance}>
                    <defs>
                      <linearGradient id="colorAttendance" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0.1}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis domain={[80, 100]} />
                    <Tooltip />
                    <Legend />
                    <Area 
                      type="monotone" 
                      dataKey="attendance" 
                      stroke="#10b981" 
                      fillOpacity={1} 
                      fill="url(#colorAttendance)"
                      name={language === 'en' ? 'Attendance %' : 'హాజరు %'}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="target" 
                      stroke="#ef4444" 
                      strokeDasharray="5 5"
                      name={language === 'en' ? 'Target' : 'లక్ష్యం'}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="card-3d">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-primary" />
                  {language === 'en' ? 'Class-wise Attendance' : 'తరగతి వారీగా హాజరు'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={classComparison}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="class" />
                    <YAxis domain={[80, 100]} />
                    <Tooltip />
                    <Legend />
                    <Bar 
                      dataKey="attendance" 
                      fill="#3b82f6"
                      name={language === 'en' ? 'Attendance %' : 'హాజరు %'}
                      radius={[8, 8, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Best and Worst Performing Classes */}
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="card-3d">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-emerald-600">
                  <TrendingUp className="w-5 h-5" />
                  {language === 'en' ? 'Top Attendance Classes' : 'అత్యుత్తమ హాజరు తరగతులు'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {classComparison.slice(0, 3).sort((a, b) => b.attendance - a.attendance).map((cls, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-emerald-500 text-white font-bold">
                          #{idx + 1}
                        </div>
                        <div>
                          <p className="font-medium">{cls.class}</p>
                          <p className="text-sm text-muted-foreground">{cls.students} students</p>
                        </div>
                      </div>
                      <Badge className="bg-emerald-600">{cls.attendance}%</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="card-3d">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-red-600">
                  <TrendingDown className="w-5 h-5" />
                  {language === 'en' ? 'Need Attention' : 'దృష్టి అవసరం'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {classComparison.slice().sort((a, b) => a.attendance - b.attendance).slice(0, 3).map((cls, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 bg-gradient-to-r from-red-50 to-orange-50 rounded-xl">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-red-500 text-white font-bold">
                          !
                        </div>
                        <div>
                          <p className="font-medium">{cls.class}</p>
                          <p className="text-sm text-muted-foreground">{cls.students} students</p>
                        </div>
                      </div>
                      <Badge variant="secondary">{cls.attendance}%</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Academic Analytics */}
        <TabsContent value="academic" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="card-3d">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-primary" />
                  {language === 'en' ? 'Subject-wise Performance' : 'విషయ వారీగా పనితీరు'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={subjectPerformance}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="subject" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Legend />
                    <Bar 
                      dataKey="average" 
                      fill="#3b82f6"
                      name={language === 'en' ? 'Average Score' : 'సగటు స్కోర్'}
                      radius={[8, 8, 0, 0]}
                    />
                    <Bar 
                      dataKey="passRate" 
                      fill="#10b981"
                      name={language === 'en' ? 'Pass Rate' : 'పాస్ రేటు'}
                      radius={[8, 8, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="card-3d">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-primary" />
                  {language === 'en' ? 'Grade Distribution' : 'గ్రేడ్ పంపిణీ'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={gradeDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={(entry) => `${entry.grade}: ${entry.percentage}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="count"
                    >
                      {gradeDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Exam Trends */}
          <Card className="card-3d">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                {language === 'en' ? 'Exam Performance Trends' : 'పరీక్ష పనితీరు ధోరణులు'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={examTrends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="exam" />
                  <YAxis domain={[70, 95]} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="math" stroke="#3b82f6" strokeWidth={2} name="Math" />
                  <Line type="monotone" dataKey="science" stroke="#10b981" strokeWidth={2} name="Science" />
                  <Line type="monotone" dataKey="english" stroke="#f59e0b" strokeWidth={2} name="English" />
                  <Line type="monotone" dataKey="social" stroke="#ef4444" strokeWidth={2} name="Social" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Subject Details */}
          <Card className="card-3d">
            <CardHeader>
              <CardTitle>
                {language === 'en' ? 'Detailed Subject Analysis' : 'వివరణాత్మక విషయ విశ్లేషణ'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {subjectPerformance.map((subject, idx) => (
                  <div key={idx} className="p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-bold text-lg">{subject.subject}</h4>
                      <Badge variant={subject.average >= 85 ? 'default' : 'secondary'}>
                        {language === 'en' ? 'Average:' : 'సగటు:'} {subject.average}%
                      </Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="p-3 bg-white rounded-lg">
                        <p className="text-xs text-muted-foreground mb-1">
                          {language === 'en' ? 'Pass Rate' : 'పాస్ రేటు'}
                        </p>
                        <p className="text-lg font-bold text-emerald-600">{subject.passRate}%</p>
                      </div>
                      <div className="p-3 bg-white rounded-lg">
                        <p className="text-xs text-muted-foreground mb-1">
                          {language === 'en' ? 'Top Score' : 'అత్యధిక స్కోర్'}
                        </p>
                        <p className="text-lg font-bold text-blue-600">{subject.topScore}%</p>
                      </div>
                      <div className="p-3 bg-white rounded-lg">
                        <p className="text-xs text-muted-foreground mb-1">
                          {language === 'en' ? 'Status' : 'స్థితి'}
                        </p>
                        <p className={`text-lg font-bold ${subject.average >= 85 ? 'text-emerald-600' : 'text-amber-600'}`}>
                          {subject.average >= 85 ? (language === 'en' ? 'Excellent' : 'అద్భుతమైన') : (language === 'en' ? 'Good' : 'మంచి')}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Teacher Performance */}
        <TabsContent value="teachers" className="space-y-6">
          <Card className="card-3d">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                {language === 'en' ? 'Teacher Performance Overview' : 'ఉపాధ్యాయుడు పనితీరు అవలోకనం'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {teacherPerformance.map((teacher, idx) => (
                  <div key={idx} className="p-4 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 flex-1">
                        <div className="h-12 w-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xl font-bold">
                          {teacher.name.charAt(0)}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium">{teacher.name}</h4>
                          <p className="text-sm text-muted-foreground">{teacher.subject}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="text-center">
                          <p className="text-xs text-muted-foreground">
                            {language === 'en' ? 'Avg Score' : 'సగటు స్కోర్'}
                          </p>
                          <p className="text-lg font-bold text-blue-600">{teacher.avgScore}%</p>
                        </div>
                        <div className="text-center">
                          <p className="text-xs text-muted-foreground">
                            {language === 'en' ? 'Pass Rate' : 'పాస్ రేటు'}
                          </p>
                          <p className="text-lg font-bold text-emerald-600">{teacher.studentsPass}%</p>
                        </div>
                        <div>
                          {teacher.trend === 'up' ? (
                            <TrendingUp className="w-6 h-6 text-emerald-600" />
                          ) : (
                            <TrendingDown className="w-6 h-6 text-red-600" />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Class Comparison */}
        <TabsContent value="comparison" className="space-y-6">
          <Card className="card-3d">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-primary" />
                {language === 'en' ? 'Class-wise Comparison' : 'తరగతి వారీగా పోలిక'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3">
                        {language === 'en' ? 'Class' : 'తరగతి'}
                      </th>
                      <th className="text-center p-3">
                        {language === 'en' ? 'Students' : 'విద్యార్థులు'}
                      </th>
                      <th className="text-center p-3">
                        {language === 'en' ? 'Attendance' : 'హాజరు'}
                      </th>
                      <th className="text-center p-3">
                        {language === 'en' ? 'Average Grade' : 'సగటు గ్రేడ్'}
                      </th>
                      <th className="text-center p-3">
                        {language === 'en' ? 'Performance' : 'పనితీరు'}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {classComparison.map((cls, idx) => (
                      <tr key={idx} className="border-b hover:bg-gray-50">
                        <td className="p-3 font-medium">{cls.class}</td>
                        <td className="text-center p-3">{cls.students}</td>
                        <td className="text-center p-3">
                          <Badge variant={cls.attendance >= 93 ? 'default' : 'secondary'}>
                            {cls.attendance}%
                          </Badge>
                        </td>
                        <td className="text-center p-3">
                          <Badge variant={cls.average >= 83 ? 'default' : 'secondary'}>
                            {cls.average}%
                          </Badge>
                        </td>
                        <td className="text-center p-3">
                          <div className="flex items-center justify-center gap-2">
                            <CircularProgress
                              value={cls.average}
                              size={40}
                              strokeWidth={4}
                            />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
