import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { useLanguage } from '../../contexts/LanguageContext';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Calendar, Download, Clock, BookOpen, Users, Bell, MapPin } from 'lucide-react';

interface TeachingSlot {
  period: number;
  class: string;
  section: string;
  subject: string;
  room: string;
  periodTime: string;
}

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const DAYS_TELUGU = ['సోమవారం', 'మంగళవారం', 'బుధవారం', 'గురువారం', 'శుక్రవారం', 'శనివారం'];
const PERIODS = ['Period 1', 'Period 2', 'Period 3', 'Period 4', 'Period 5', 'Period 6', 'Period 7'];
const PERIOD_TIMES = ['8:30-9:15', '9:15-10:00', '10:00-10:45', '10:45-11:30', '12:00-12:45', '12:45-1:30', '1:30-2:15'];

const CLASS_COLORS: { [key: string]: string } = {
  '10A': 'bg-gradient-to-br from-blue-100 to-blue-200 border-blue-400 text-blue-900',
  '10B': 'bg-gradient-to-br from-indigo-100 to-indigo-200 border-indigo-400 text-indigo-900',
  '9A': 'bg-gradient-to-br from-purple-100 to-purple-200 border-purple-400 text-purple-900',
  '9B': 'bg-gradient-to-br from-pink-100 to-pink-200 border-pink-400 text-pink-900',
  '8A': 'bg-gradient-to-br from-emerald-100 to-emerald-200 border-emerald-400 text-emerald-900',
  '8B': 'bg-gradient-to-br from-teal-100 to-teal-200 border-teal-400 text-teal-900'
};

export const SubjectTeacherTimetableView = () => {
  const { t, language } = useLanguage();
  
  const teacherName = 'Mrs. Priya Sharma';
  const subject = 'Mathematics';

  // Mock unified timetable data showing all classes where this teacher teaches
  const teachingSchedule: { [day: string]: (TeachingSlot | null)[] } = {
    Monday: [
      { period: 1, class: '10', section: 'A', subject: 'Mathematics', room: 'Room 101', periodTime: '8:30-9:15' },
      null,
      null,
      null, // Break
      { period: 5, class: '9', section: 'A', subject: 'Mathematics', room: 'Room 101', periodTime: '12:00-12:45' },
      null,
      null
    ],
    Tuesday: [
      null,
      { period: 2, class: '10', section: 'A', subject: 'Mathematics', room: 'Room 101', periodTime: '9:15-10:00' },
      { period: 3, class: '9', section: 'B', subject: 'Mathematics', room: 'Room 101', periodTime: '10:00-10:45' },
      null, // Break
      null,
      { period: 6, class: '8', section: 'A', subject: 'Mathematics', room: 'Room 101', periodTime: '12:45-1:30' },
      null
    ],
    Wednesday: [
      null,
      { period: 2, class: '10', section: 'A', subject: 'Mathematics', room: 'Room 101', periodTime: '9:15-10:00' },
      null,
      null, // Break
      { period: 5, class: '10', section: 'B', subject: 'Mathematics', room: 'Room 101', periodTime: '12:00-12:45' },
      null,
      { period: 7, class: '9', section: 'A', subject: 'Mathematics', room: 'Room 101', periodTime: '1:30-2:15' }
    ],
    Thursday: [
      { period: 1, class: '10', section: 'A', subject: 'Mathematics', room: 'Room 101', periodTime: '8:30-9:15' },
      null,
      { period: 3, class: '8', section: 'B', subject: 'Mathematics', room: 'Room 101', periodTime: '10:00-10:45' },
      null, // Break
      null,
      { period: 6, class: '9', section: 'B', subject: 'Mathematics', room: 'Room 101', periodTime: '12:45-1:30' },
      null
    ],
    Friday: [
      null,
      { period: 2, class: '10', section: 'A', subject: 'Mathematics', room: 'Room 101', periodTime: '9:15-10:00' },
      null,
      null, // Break
      { period: 5, class: '9', section: 'A', subject: 'Mathematics', room: 'Room 101', periodTime: '12:00-12:45' },
      { period: 6, class: '10', section: 'B', subject: 'Mathematics', room: 'Room 101', periodTime: '12:45-1:30' },
      null
    ],
    Saturday: [
      { period: 1, class: '10', section: 'A', subject: 'Mathematics', room: 'Room 101', periodTime: '8:30-9:15' },
      { period: 2, class: '8', section: 'A', subject: 'Mathematics', room: 'Room 101', periodTime: '9:15-10:00' },
      null,
      null, // Break
      null,
      { period: 6, class: '9', section: 'B', subject: 'Mathematics', room: 'Room 101', periodTime: '12:45-1:30' },
      null
    ]
  };

  // Calculate statistics
  const totalPeriods = Object.values(teachingSchedule).flat().filter(slot => slot !== null).length;
  const uniqueClasses = new Set(
    Object.values(teachingSchedule).flat().filter(slot => slot !== null).map(slot => `${slot!.class}${slot!.section}`)
  );

  // Get today's day
  const today = new Date().getDay();
  const todayName = DAYS[today === 0 ? 6 : today - 1];

  // Get today's schedule
  const todaySchedule = teachingSchedule[todayName]?.filter(slot => slot !== null) || [];

  // Count periods by class
  const periodsByClass: { [key: string]: number } = {};
  Object.values(teachingSchedule).flat().filter(slot => slot !== null).forEach(slot => {
    const classKey = `${slot!.class}${slot!.section}`;
    periodsByClass[classKey] = (periodsByClass[classKey] || 0) + 1;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl mb-2">
            {language === 'en' ? 'My Teaching Schedule' : 'నా బోధనా షెడ్యూల్'}
          </h1>
          <p className="text-muted-foreground">
            {language === 'en' ? `${teacherName} - ${subject}` : `${teacherName} - ${subject}`}
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
            <p className="text-sm text-muted-foreground">{language === 'en' ? 'Teaching Periods' : 'బోధన పీరియడ్‌లు'}</p>
          </CardContent>
        </Card>

        <Card className="card-3d hover:shadow-xl transition-shadow">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <Users className="h-8 w-8 text-emerald-600" />
              <Badge variant="default">{language === 'en' ? 'Classes' : 'తరగతులు'}</Badge>
            </div>
            <p className="text-3xl font-bold">{uniqueClasses.size}</p>
            <p className="text-sm text-muted-foreground">{language === 'en' ? 'Different Classes' : 'వివిధ తరగతులు'}</p>
          </CardContent>
        </Card>

        <Card className="card-3d hover:shadow-xl transition-shadow">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <BookOpen className="h-8 w-8 text-purple-600" />
              <Badge variant="secondary">{language === 'en' ? 'Subject' : 'విషయం'}</Badge>
            </div>
            <p className="text-3xl font-bold">1</p>
            <p className="text-sm text-muted-foreground">{subject}</p>
          </CardContent>
        </Card>

        <Card className="card-3d hover:shadow-xl transition-shadow">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <Calendar className="h-8 w-8 text-amber-600" />
              <Badge variant="outline">{language === 'en' ? 'Today' : 'నేడు'}</Badge>
            </div>
            <p className="text-3xl font-bold">{todaySchedule.length}</p>
            <p className="text-sm text-muted-foreground">{language === 'en' ? 'Classes Today' : 'నేటి తరగతులు'}</p>
          </CardContent>
        </Card>
      </div>

      {/* Today's Schedule Highlight */}
      <Card className="card-3d border-2 border-blue-500 bg-gradient-to-br from-blue-50 to-indigo-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-6 w-6 text-blue-600" />
            {language === 'en' ? "Today's Classes" : 'నేటి తరగతులు'}
            <Badge className="ml-2">{todayName}</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {todaySchedule.length > 0 ? (
            <div className="grid gap-3 md:grid-cols-3">
              {todaySchedule.map((slot) => {
                const classKey = `${slot!.class}${slot!.section}`;
                const colorClass = CLASS_COLORS[classKey] || 'bg-gray-100';
                return (
                  <div key={`${slot!.period}-${classKey}`} className={`p-4 rounded-xl border-2 ${colorClass} shadow-md`}>
                    <div className="flex items-start justify-between mb-2">
                      <Badge variant="outline" className="text-xs">
                        Period {slot!.period}
                      </Badge>
                      <span className="text-xs font-medium">{slot!.periodTime}</span>
                    </div>
                    <h3 className="font-bold text-lg mb-1">Class {classKey}</h3>
                    <p className="text-sm text-muted-foreground mb-1">{slot!.subject}</p>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      {slot!.room}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              {language === 'en' ? 'No classes scheduled for today' : 'నేడు తరగతులు షెడ్యూల్ చేయబడలేదు'}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Unified Weekly Timetable */}
      <Card className="card-3d">
        <CardHeader>
          <CardTitle>
            {language === 'en' ? 'Unified Weekly Schedule' : 'ఏకీకృత వారపు షెడ్యూల్'}
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            {language === 'en' 
              ? 'All your teaching periods across different classes in one view' 
              : 'ఒకే వీక్షణలో వివిధ తరగతులలో మీ అన్ని బోధన పీరియడ్‌లు'}
          </p>
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
                      className={`border border-gray-300 p-3 text-center min-w-[200px] ${
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
                      const slot = teachingSchedule[day][periodIdx];
                      const isToday = day === todayName;
                      
                      if (periodIdx === 3) {
                        // Break period
                        return (
                          <td 
                            key={day} 
                            className={`border border-gray-300 p-2 ${isToday ? 'bg-blue-50' : ''}`}
                          >
                            <div className="p-4 rounded-lg bg-gradient-to-br from-gray-100 to-gray-200 border-2 border-gray-400 text-gray-700 text-center font-bold shadow-sm">
                              {language === 'en' ? '☕ BREAK' : '☕ విరామం'}
                            </div>
                          </td>
                        );
                      }
                      
                      return (
                        <td 
                          key={day} 
                          className={`border border-gray-300 p-2 ${isToday ? 'bg-blue-50' : ''}`}
                        >
                          {slot ? (
                            <div className={`p-4 rounded-xl border-2 ${CLASS_COLORS[`${slot.class}${slot.section}`]} shadow-md hover:shadow-lg transition-shadow`}>
                              <div className="flex items-center justify-between mb-2">
                                <Badge variant="secondary" className="font-bold">
                                  Class {slot.class}{slot.section}
                                </Badge>
                                {isToday && (
                                  <Badge className="bg-yellow-400 text-yellow-900 text-xs">
                                    {language === 'en' ? 'Now' : 'ఇప్పుడు'}
                                  </Badge>
                                )}
                              </div>
                              <div className="font-bold text-sm mb-1">{slot.subject}</div>
                              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                <MapPin className="h-3 w-3" />
                                {slot.room}
                              </div>
                            </div>
                          ) : (
                            <div className="p-4 rounded-lg bg-gray-50 border-2 border-dashed border-gray-300 text-center text-sm text-muted-foreground">
                              {language === 'en' ? 'Free Period' : 'ఖాళీ పీరియడ్'}
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

      {/* Class-wise Period Distribution */}
      <Card className="card-3d">
        <CardHeader>
          <CardTitle>{language === 'en' ? 'Class-wise Period Distribution' : 'తరగతి వారీ పీరియడ్ పంపిణీ'}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-3">
            {Object.entries(periodsByClass)
              .sort((a, b) => b[1] - a[1])
              .map(([classKey, count]) => {
                const colorClass = CLASS_COLORS[classKey] || 'bg-gray-100';
                return (
                  <div key={classKey} className={`p-4 rounded-xl border-2 ${colorClass} shadow-md`}>
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-lg">Class {classKey}</h3>
                      <Badge variant="secondary" className="text-lg px-3 py-1">{count}</Badge>
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

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="card-3d bg-gradient-to-br from-emerald-50 to-green-50 border-emerald-200">
          <CardHeader>
            <CardTitle className="text-emerald-900">
              {language === 'en' ? 'Peak Teaching Days' : 'గరిష్ట బోధన రోజులు'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {DAYS.map(day => {
                const dayPeriods = teachingSchedule[day].filter(slot => slot !== null).length;
                return (
                  <div key={day} className="flex items-center justify-between p-2 bg-white rounded-lg">
                    <span className="font-medium">{day}</span>
                    <div className="flex items-center gap-2">
                      <div className="h-2 bg-emerald-200 rounded-full" style={{ width: `${dayPeriods * 20}px` }}></div>
                      <Badge variant="outline">{dayPeriods}</Badge>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Card className="card-3d bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
          <CardHeader>
            <CardTitle className="text-blue-900">
              {language === 'en' ? 'Teaching Load Summary' : 'బోధన భారం సారాంశం'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                <span className="text-sm text-muted-foreground">{language === 'en' ? 'Average per day' : 'రోజుకు సగటు'}</span>
                <span className="text-2xl font-bold text-blue-600">{(totalPeriods / 6).toFixed(1)}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                <span className="text-sm text-muted-foreground">{language === 'en' ? 'Busiest day' : 'అత్యధిక రోజు'}</span>
                <span className="font-bold text-blue-600">
                  {DAYS.reduce((max, day) => {
                    const count = teachingSchedule[day].filter(slot => slot !== null).length;
                    const maxCount = teachingSchedule[max].filter(slot => slot !== null).length;
                    return count > maxCount ? day : max;
                  })}
                </span>
              </div>
              <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                <span className="text-sm text-muted-foreground">{language === 'en' ? 'Free periods' : 'ఖాళీ పీరియడ్‌లు'}</span>
                <span className="text-2xl font-bold text-blue-600">{(42 - totalPeriods - 6)}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
