import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { useLanguage } from '../../contexts/LanguageContext';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Calendar, Download, Clock, BookOpen, Users, Bell } from 'lucide-react';

interface Period {
  id: string;
  subject: string;
  teacher: string;
  room?: string;
}

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const DAYS_TELUGU = ['సోమవారం', 'మంగళవారం', 'బుధవారం', 'గురువారం', 'శుక్రవారం', 'శనివారం'];
const PERIODS = ['Period 1', 'Period 2', 'Period 3', 'Period 4', 'Period 5', 'Period 6', 'Period 7'];
const PERIOD_TIMES = ['8:30-9:15', '9:15-10:00', '10:00-10:45', '10:45-11:30', '12:00-12:45', '12:45-1:30', '1:30-2:15'];

const SUBJECT_COLORS: { [key: string]: string } = {
  'Mathematics': 'bg-gradient-to-br from-blue-100 to-blue-200 border-blue-400 text-blue-900',
  'Science': 'bg-gradient-to-br from-green-100 to-green-200 border-green-400 text-green-900',
  'English': 'bg-gradient-to-br from-purple-100 to-purple-200 border-purple-400 text-purple-900',
  'Social Studies': 'bg-gradient-to-br from-amber-100 to-amber-200 border-amber-400 text-amber-900',
  'Hindi': 'bg-gradient-to-br from-pink-100 to-pink-200 border-pink-400 text-pink-900',
  'Physical Education': 'bg-gradient-to-br from-orange-100 to-orange-200 border-orange-400 text-orange-900',
  'Computer Science': 'bg-gradient-to-br from-indigo-100 to-indigo-200 border-indigo-400 text-indigo-900',
  'Art': 'bg-gradient-to-br from-rose-100 to-rose-200 border-rose-400 text-rose-900',
  'Break': 'bg-gradient-to-br from-gray-100 to-gray-200 border-gray-400 text-gray-700'
};

export const ClassTeacherTimetableView = () => {
  const { t, language } = useLanguage();
  
  const myClass = '10';
  const mySection = 'A';
  const classTeacher = 'Mrs. Priya Sharma';

  // Mock timetable data for class 10A
  const timetable: { [day: string]: Period[] } = {
    Monday: [
      { id: '1', subject: 'Mathematics', teacher: 'Mrs. Priya Sharma', room: 'Room 101' },
      { id: '2', subject: 'Science', teacher: 'Mr. Anil Krishna', room: 'Lab 1' },
      { id: '3', subject: 'English', teacher: 'Mr. Suresh Reddy', room: 'Room 102' },
      { id: '4', subject: 'Break', teacher: '', room: '' },
      { id: '5', subject: 'Social Studies', teacher: 'Mrs. Kavita Nair', room: 'Room 103' },
      { id: '6', subject: 'Hindi', teacher: 'Mr. Rajesh Kumar', room: 'Room 104' },
      { id: '7', subject: 'Physical Education', teacher: 'Mrs. Lakshmi Devi', room: 'Ground' }
    ],
    Tuesday: [
      { id: '1', subject: 'English', teacher: 'Mr. Suresh Reddy', room: 'Room 102' },
      { id: '2', subject: 'Mathematics', teacher: 'Mrs. Priya Sharma', room: 'Room 101' },
      { id: '3', subject: 'Computer Science', teacher: 'Mr. Anil Krishna', room: 'Lab 2' },
      { id: '4', subject: 'Break', teacher: '', room: '' },
      { id: '5', subject: 'Science', teacher: 'Mr. Anil Krishna', room: 'Lab 1' },
      { id: '6', subject: 'Social Studies', teacher: 'Mrs. Kavita Nair', room: 'Room 103' },
      { id: '7', subject: 'Hindi', teacher: 'Mr. Rajesh Kumar', room: 'Room 104' }
    ],
    Wednesday: [
      { id: '1', subject: 'Science', teacher: 'Mr. Anil Krishna', room: 'Lab 1' },
      { id: '2', subject: 'Mathematics', teacher: 'Mrs. Priya Sharma', room: 'Room 101' },
      { id: '3', subject: 'Social Studies', teacher: 'Mrs. Kavita Nair', room: 'Room 103' },
      { id: '4', subject: 'Break', teacher: '', room: '' },
      { id: '5', subject: 'English', teacher: 'Mr. Suresh Reddy', room: 'Room 102' },
      { id: '6', subject: 'Computer Science', teacher: 'Mr. Anil Krishna', room: 'Lab 2' },
      { id: '7', subject: 'Art', teacher: 'Mrs. Lakshmi Devi', room: 'Art Room' }
    ],
    Thursday: [
      { id: '1', subject: 'Mathematics', teacher: 'Mrs. Priya Sharma', room: 'Room 101' },
      { id: '2', subject: 'English', teacher: 'Mr. Suresh Reddy', room: 'Room 102' },
      { id: '3', subject: 'Hindi', teacher: 'Mr. Rajesh Kumar', room: 'Room 104' },
      { id: '4', subject: 'Break', teacher: '', room: '' },
      { id: '5', subject: 'Science', teacher: 'Mr. Anil Krishna', room: 'Lab 1' },
      { id: '6', subject: 'Physical Education', teacher: 'Mrs. Lakshmi Devi', room: 'Ground' },
      { id: '7', subject: 'Social Studies', teacher: 'Mrs. Kavita Nair', room: 'Room 103' }
    ],
    Friday: [
      { id: '1', subject: 'English', teacher: 'Mr. Suresh Reddy', room: 'Room 102' },
      { id: '2', subject: 'Mathematics', teacher: 'Mrs. Priya Sharma', room: 'Room 101' },
      { id: '3', subject: 'Science', teacher: 'Mr. Anil Krishna', room: 'Lab 1' },
      { id: '4', subject: 'Break', teacher: '', room: '' },
      { id: '5', subject: 'Computer Science', teacher: 'Mr. Anil Krishna', room: 'Lab 2' },
      { id: '6', subject: 'Social Studies', teacher: 'Mrs. Kavita Nair', room: 'Room 103' },
      { id: '7', subject: 'Hindi', teacher: 'Mr. Rajesh Kumar', room: 'Room 104' }
    ],
    Saturday: [
      { id: '1', subject: 'Mathematics', teacher: 'Mrs. Priya Sharma', room: 'Room 101' },
      { id: '2', subject: 'Science', teacher: 'Mr. Anil Krishna', room: 'Lab 1' },
      { id: '3', subject: 'English', teacher: 'Mr. Suresh Reddy', room: 'Room 102' },
      { id: '4', subject: 'Break', teacher: '', room: '' },
      { id: '5', subject: 'Art', teacher: 'Mrs. Lakshmi Devi', room: 'Art Room' },
      { id: '6', subject: 'Physical Education', teacher: 'Mrs. Lakshmi Devi', room: 'Ground' },
      { id: '7', subject: 'Social Studies', teacher: 'Mrs. Kavita Nair', room: 'Room 103' }
    ]
  };

  // Calculate statistics
  const totalPeriods = DAYS.reduce((sum, day) => sum + timetable[day].filter(p => p.subject !== 'Break').length, 0);
  const uniqueTeachers = new Set(
    Object.values(timetable).flat().filter(p => p.teacher).map(p => p.teacher)
  ).size;
  const uniqueSubjects = new Set(
    Object.values(timetable).flat().filter(p => p.subject !== 'Break').map(p => p.subject)
  ).size;

  // Get today's day
  const today = new Date().getDay();
  const todayName = DAYS[today === 0 ? 6 : today - 1]; // Adjust for Sunday (0)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl mb-2">
            {language === 'en' ? `Class ${myClass}${mySection} Timetable` : `తరగతి ${myClass}${mySection} టైమ్‌టేబుల్`}
          </h1>
          <p className="text-muted-foreground">
            {language === 'en' ? `Class Teacher: ${classTeacher}` : `తరగతి ఉపాధ్యాయుడు: ${classTeacher}`}
          </p>
        </div>
        <Button variant="outline" className="gap-2">
          <Download className="h-4 w-4" />
          {language === 'en' ? 'Download PDF' : 'PDF డౌన్‌లోడ్ చేయండి'}
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="card-3d hover:shadow-xl transition-shadow">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <Clock className="h-8 w-8 text-blue-600" />
              <Badge variant="outline">{language === 'en' ? 'Weekly' : 'వారపు'}</Badge>
            </div>
            <p className="text-3xl font-bold">{totalPeriods}</p>
            <p className="text-sm text-muted-foreground">{language === 'en' ? 'Total Periods' : 'మొత్తం పీరియడ్‌లు'}</p>
          </CardContent>
        </Card>

        <Card className="card-3d hover:shadow-xl transition-shadow">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <BookOpen className="h-8 w-8 text-emerald-600" />
              <Badge variant="default">{language === 'en' ? 'Subjects' : 'విషయాలు'}</Badge>
            </div>
            <p className="text-3xl font-bold">{uniqueSubjects}</p>
            <p className="text-sm text-muted-foreground">{language === 'en' ? 'Different Subjects' : 'వివిధ విషయాలు'}</p>
          </CardContent>
        </Card>

        <Card className="card-3d hover:shadow-xl transition-shadow">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <Users className="h-8 w-8 text-purple-600" />
              <Badge variant="secondary">{language === 'en' ? 'Teachers' : 'ఉపాధ్యాయులు'}</Badge>
            </div>
            <p className="text-3xl font-bold">{uniqueTeachers}</p>
            <p className="text-sm text-muted-foreground">{language === 'en' ? 'Subject Teachers' : 'విషయ ఉపాధ్యాయులు'}</p>
          </CardContent>
        </Card>

        <Card className="card-3d hover:shadow-xl transition-shadow">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <Calendar className="h-8 w-8 text-amber-600" />
              <Badge variant="outline">{language === 'en' ? 'Days' : 'రోజులు'}</Badge>
            </div>
            <p className="text-3xl font-bold">6</p>
            <p className="text-sm text-muted-foreground">{language === 'en' ? 'Working Days' : 'పని రోజులు'}</p>
          </CardContent>
        </Card>
      </div>

      {/* Today's Schedule Highlight */}
      <Card className="card-3d border-2 border-blue-500 bg-gradient-to-br from-blue-50 to-indigo-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-6 w-6 text-blue-600" />
            {language === 'en' ? "Today's Schedule" : 'నేటి షెడ్యూల్'}
            <Badge className="ml-2">{todayName}</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-4">
            {timetable[todayName]?.filter(p => p.subject !== 'Break').map((period, idx) => {
              const colorClass = SUBJECT_COLORS[period.subject] || 'bg-gray-100';
              return (
                <div key={period.id} className={`p-4 rounded-xl border-2 ${colorClass} shadow-md`}>
                  <div className="flex items-start justify-between mb-2">
                    <Badge variant="outline" className="text-xs">
                      Period {idx + (idx >= 3 ? 2 : 1)}
                    </Badge>
                    <span className="text-xs font-medium">{PERIOD_TIMES[idx + (idx >= 3 ? 1 : 0)]}</span>
                  </div>
                  <h3 className="font-bold mb-1">{period.subject}</h3>
                  <p className="text-sm text-muted-foreground">{period.teacher}</p>
                  <p className="text-xs text-muted-foreground mt-1">{period.room}</p>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Full Week Timetable */}
      <Card className="card-3d">
        <CardHeader>
          <CardTitle>
            {language === 'en' ? 'Weekly Timetable' : 'వారపు టైమ్‌టేబుల్'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 text-white">
                  <th className="border border-gray-300 p-3 text-left rounded-tl-xl min-w-[120px]">
                    {language === 'en' ? 'Period / Day' : 'పీరియడ్ / రోజు'}
                  </th>
                  {(language === 'en' ? DAYS : DAYS_TELUGU).map((day, idx) => (
                    <th 
                      key={day} 
                      className={`border border-gray-300 p-3 text-center min-w-[180px] ${
                        idx === 5 ? 'rounded-tr-xl' : ''
                      } ${DAYS[idx] === todayName ? 'bg-blue-800' : ''}`}
                    >
                      {day}
                      {DAYS[idx] === todayName && (
                        <Badge className="ml-2 bg-yellow-400 text-yellow-900">
                          {language === 'en' ? 'Today' : 'నేడు'}
                        </Badge>
                      )}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {PERIODS.map((period, periodIdx) => (
                  <tr key={period} className="hover:bg-blue-50 transition-colors">
                    <td className="border border-gray-300 p-3 bg-gradient-to-r from-indigo-100 to-purple-100 font-medium">
                      <div className="font-bold">{period}</div>
                      <div className="text-xs text-muted-foreground mt-1">{PERIOD_TIMES[periodIdx]}</div>
                    </td>
                    {DAYS.map((day) => {
                      const periodData = timetable[day][periodIdx];
                      const colorClass = SUBJECT_COLORS[periodData.subject] || 'bg-gray-100';
                      const isToday = day === todayName;
                      
                      return (
                        <td 
                          key={day} 
                          className={`border border-gray-300 p-2 ${isToday ? 'bg-blue-50' : ''}`}
                        >
                          {periodData.subject === 'Break' ? (
                            <div className={`p-4 rounded-lg ${colorClass} text-center font-bold shadow-sm`}>
                              {language === 'en' ? '☕ BREAK' : '☕ విరామం'}
                            </div>
                          ) : (
                            <div className={`p-4 rounded-xl border-2 ${colorClass} shadow-md hover:shadow-lg transition-shadow`}>
                              <div className="font-bold mb-1">{periodData.subject}</div>
                              <div className="text-sm text-muted-foreground">{periodData.teacher}</div>
                              {periodData.room && (
                                <div className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                                  📍 {periodData.room}
                                </div>
                              )}
                            </div>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Subject-wise Distribution */}
      <Card className="card-3d">
        <CardHeader>
          <CardTitle>{language === 'en' ? 'Subject-wise Period Distribution' : 'విషయ వారీ పీరియడ్ పంపిణీ'}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-4">
            {Array.from(new Set(Object.values(timetable).flat().filter(p => p.subject !== 'Break').map(p => p.subject)))
              .map(subject => {
                const count = Object.values(timetable).flat().filter(p => p.subject === subject).length;
                const colorClass = SUBJECT_COLORS[subject] || 'bg-gray-100';
                return (
                  <div key={subject} className={`p-4 rounded-xl border-2 ${colorClass} shadow-md`}>
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold">{subject}</h3>
                      <Badge variant="secondary">{count}</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {language === 'en' ? 'periods per week' : 'వారానికి పీరియడ్‌లు'}
                    </p>
                  </div>
                );
              })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
