import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { useLanguage } from '../../contexts/LanguageContext';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Calendar, Download, Edit, Save, X, Plus, Search, Clock, BookOpen, Users, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

type ViewMode = 'overview' | 'edit';

interface Period {
  id: string;
  subject: string;
  teacher: string;
  room?: string;
}

interface ClassTimetable {
  class: string;
  section: string;
  timetable: {
    [day: string]: Period[];
  };
}

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const DAYS_TELUGU = ['సోమవారం', 'మంగళవారం', 'బుధవారం', 'గురువారం', 'శుక్రవారం', 'శనివారం'];
const PERIODS = ['Period 1', 'Period 2', 'Period 3', 'Period 4', 'Period 5', 'Period 6', 'Period 7'];
const PERIOD_TIMES = ['8:30-9:15', '9:15-10:00', '10:00-10:45', '10:45-11:30', '12:00-12:45', '12:45-1:30', '1:30-2:15'];

const SUBJECTS = ['Mathematics', 'Science', 'English', 'Social Studies', 'Hindi', 'Physical Education', 'Computer Science', 'Art'];
const TEACHERS = ['Mrs. Priya Sharma', 'Mr. Anil Krishna', 'Mr. Suresh Reddy', 'Mrs. Kavita Nair', 'Mr. Rajesh Kumar', 'Mrs. Lakshmi Devi'];

const SUBJECT_COLORS: { [key: string]: string } = {
  'Mathematics': 'bg-blue-100 border-blue-300 text-blue-800',
  'Science': 'bg-green-100 border-green-300 text-green-800',
  'English': 'bg-purple-100 border-purple-300 text-purple-800',
  'Social Studies': 'bg-amber-100 border-amber-300 text-amber-800',
  'Hindi': 'bg-pink-100 border-pink-300 text-pink-800',
  'Physical Education': 'bg-orange-100 border-orange-300 text-orange-800',
  'Computer Science': 'bg-indigo-100 border-indigo-300 text-indigo-800',
  'Art': 'bg-rose-100 border-rose-300 text-rose-800',
  'Break': 'bg-gray-100 border-gray-300 text-gray-600'
};

export const PrincipalTimetableView = () => {
  const { t, language } = useLanguage();
  const [viewMode, setViewMode] = useState<ViewMode>('overview');
  const [selectedClass, setSelectedClass] = useState('10');
  const [selectedSection, setSelectedSection] = useState('A');
  const [editingPeriod, setEditingPeriod] = useState<{ day: string; period: number } | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Mock timetable data
  const [timetables, setTimetables] = useState<ClassTimetable[]>([
    {
      class: '10',
      section: 'A',
      timetable: {
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
      }
    }
  ]);

  const currentTimetable = timetables.find(
    t => t.class === selectedClass && t.section === selectedSection
  );

  const handleSavePeriod = (day: string, periodIndex: number, subject: string, teacher: string, room: string) => {
    setTimetables(prev => prev.map(tt => {
      if (tt.class === selectedClass && tt.section === selectedSection) {
        return {
          ...tt,
          timetable: {
            ...tt.timetable,
            [day]: tt.timetable[day].map((p, idx) => 
              idx === periodIndex ? { ...p, subject, teacher, room } : p
            )
          }
        };
      }
      return tt;
    }));
    setEditingPeriod(null);
    toast.success(language === 'en' ? 'Period updated successfully!' : 'పీరియడ్ విజయవంతంగా నవీకరించబడింది!');
  };

  const classes = ['10', '9', '8'];
  const sections = ['A', 'B', 'C'];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl mb-2">
            {language === 'en' ? 'Timetable Management' : 'టైమ్‌టేబుల్ నిర్వహణ'}
          </h1>
          <p className="text-muted-foreground">
            {language === 'en' ? 'View and edit class timetables' : 'తరగతి టైమ్‌టేబుల్‌లను చూడండి మరియు సవరించండి'}
          </p>
        </div>
        <Button variant="outline" className="gap-2">
          <Download className="h-4 w-4" />
          {language === 'en' ? 'Export' : 'ఎగుమతి చేయండి'}
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card className="card-3d hover:shadow-xl transition-shadow">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <Calendar className="h-8 w-8 text-blue-600" />
              <Badge variant="outline">{language === 'en' ? 'Classes' : 'తరగతులు'}</Badge>
            </div>
            <p className="text-3xl font-bold">12</p>
            <p className="text-sm text-muted-foreground">{language === 'en' ? 'Total Timetables' : 'మొత్తం టైమ్‌టేబుల్‌లు'}</p>
          </CardContent>
        </Card>

        <Card className="card-3d hover:shadow-xl transition-shadow">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <Clock className="h-8 w-8 text-emerald-600" />
              <Badge variant="default">{language === 'en' ? 'Periods' : 'పీరియడ్‌లు'}</Badge>
            </div>
            <p className="text-3xl font-bold">7</p>
            <p className="text-sm text-muted-foreground">{language === 'en' ? 'Per Day' : 'రోజుకు'}</p>
          </CardContent>
        </Card>

        <Card className="card-3d hover:shadow-xl transition-shadow">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <BookOpen className="h-8 w-8 text-purple-600" />
              <Badge variant="secondary">{language === 'en' ? 'Subjects' : 'విషయాలు'}</Badge>
            </div>
            <p className="text-3xl font-bold">8</p>
            <p className="text-sm text-muted-foreground">{language === 'en' ? 'Total Subjects' : 'మొత్తం విషయాలు'}</p>
          </CardContent>
        </Card>

        <Card className="card-3d hover:shadow-xl transition-shadow">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <Users className="h-8 w-8 text-amber-600" />
              <Badge variant="outline">{language === 'en' ? 'Teachers' : 'ఉపాధ్యాయులు'}</Badge>
            </div>
            <p className="text-3xl font-bold">25</p>
            <p className="text-sm text-muted-foreground">{language === 'en' ? 'Teaching Staff' : 'బోధనా సిబ్బంది'}</p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={viewMode} onValueChange={(val) => setViewMode(val as ViewMode)} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="overview">
            {language === 'en' ? 'View Timetable' : 'టైమ్‌టేబుల్ చూడండి'}
          </TabsTrigger>
          <TabsTrigger value="edit">
            {language === 'en' ? 'Edit Timetable' : 'టైమ్‌టేబుల్ సవరించండి'}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <Card className="card-3d">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>{language === 'en' ? 'Select Class' : 'తరగతిని ఎంచుకోండి'}</CardTitle>
                <div className="flex gap-2">
                  <Select value={selectedClass} onValueChange={setSelectedClass}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {classes.map(c => (
                        <SelectItem key={c} value={c}>Class {c}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={selectedSection} onValueChange={setSelectedSection}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {sections.map(s => (
                        <SelectItem key={s} value={s}>Section {s}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {currentTimetable && (
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gradient-to-r from-blue-600 to-purple-700 text-white">
                        <th className="border border-gray-300 p-3 text-left rounded-tl-xl">
                          {language === 'en' ? 'Period / Day' : 'పీరియడ్ / రోజు'}
                        </th>
                        {(language === 'en' ? DAYS : DAYS_TELUGU).map((day, idx) => (
                          <th key={day} className={`border border-gray-300 p-3 text-center ${idx === 5 ? 'rounded-tr-xl' : ''}`}>
                            {day}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {PERIODS.map((period, periodIdx) => (
                        <tr key={period} className="hover:bg-blue-50 transition-colors">
                          <td className="border border-gray-300 p-3 bg-gradient-to-r from-indigo-100 to-purple-100 font-medium">
                            <div>{period}</div>
                            <div className="text-xs text-muted-foreground">{PERIOD_TIMES[periodIdx]}</div>
                          </td>
                          {DAYS.map((day) => {
                            const periodData = currentTimetable.timetable[day][periodIdx];
                            const colorClass = SUBJECT_COLORS[periodData.subject] || 'bg-gray-100';
                            
                            return (
                              <td key={day} className="border border-gray-300 p-2">
                                {periodData.subject === 'Break' ? (
                                  <div className={`p-3 rounded-lg ${colorClass} text-center font-medium`}>
                                    {language === 'en' ? 'BREAK' : 'విరామం'}
                                  </div>
                                ) : (
                                  <div className={`p-3 rounded-lg border-2 ${colorClass}`}>
                                    <div className="font-medium">{periodData.subject}</div>
                                    <div className="text-xs text-muted-foreground mt-1">{periodData.teacher}</div>
                                    {periodData.room && (
                                      <div className="text-xs text-muted-foreground">{periodData.room}</div>
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
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="edit" className="space-y-6">
          <Card className="card-3d">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>{language === 'en' ? 'Edit Timetable' : 'టైమ్‌టేబుల్ సవరించండి'}</CardTitle>
                <div className="flex gap-2">
                  <Select value={selectedClass} onValueChange={setSelectedClass}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {classes.map(c => (
                        <SelectItem key={c} value={c}>Class {c}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={selectedSection} onValueChange={setSelectedSection}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {sections.map(s => (
                        <SelectItem key={s} value={s}>Section {s}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {currentTimetable && (
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gradient-to-r from-blue-600 to-purple-700 text-white">
                        <th className="border border-gray-300 p-3 text-left rounded-tl-xl">
                          {language === 'en' ? 'Period / Day' : 'పీరియడ్ / రోజు'}
                        </th>
                        {(language === 'en' ? DAYS : DAYS_TELUGU).map((day, idx) => (
                          <th key={day} className={`border border-gray-300 p-3 text-center ${idx === 5 ? 'rounded-tr-xl' : ''}`}>
                            {day}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {PERIODS.map((period, periodIdx) => (
                        <tr key={period} className="hover:bg-blue-50 transition-colors">
                          <td className="border border-gray-300 p-3 bg-gradient-to-r from-indigo-100 to-purple-100 font-medium">
                            <div>{period}</div>
                            <div className="text-xs text-muted-foreground">{PERIOD_TIMES[periodIdx]}</div>
                          </td>
                          {DAYS.map((day) => {
                            const periodData = currentTimetable.timetable[day][periodIdx];
                            const isEditing = editingPeriod?.day === day && editingPeriod?.period === periodIdx;
                            const colorClass = SUBJECT_COLORS[periodData.subject] || 'bg-gray-100';
                            
                            return (
                              <td key={day} className="border border-gray-300 p-2">
                                {isEditing ? (
                                  <EditPeriodCell
                                    periodData={periodData}
                                    onSave={(subject, teacher, room) => 
                                      handleSavePeriod(day, periodIdx, subject, teacher, room)
                                    }
                                    onCancel={() => setEditingPeriod(null)}
                                    language={language}
                                  />
                                ) : (
                                  <div 
                                    className={`p-3 rounded-lg border-2 ${colorClass} cursor-pointer hover:shadow-lg transition-shadow group relative`}
                                    onClick={() => setEditingPeriod({ day, period: periodIdx })}
                                  >
                                    {periodData.subject === 'Break' ? (
                                      <div className="text-center font-medium">
                                        {language === 'en' ? 'BREAK' : 'విరామం'}
                                      </div>
                                    ) : (
                                      <>
                                        <div className="font-medium">{periodData.subject}</div>
                                        <div className="text-xs text-muted-foreground mt-1">{periodData.teacher}</div>
                                        {periodData.room && (
                                          <div className="text-xs text-muted-foreground">{periodData.room}</div>
                                        )}
                                        <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                          <Edit className="h-3 w-3" />
                                        </div>
                                      </>
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
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

interface EditPeriodCellProps {
  periodData: Period;
  onSave: (subject: string, teacher: string, room: string) => void;
  onCancel: () => void;
  language: string;
}

function EditPeriodCell({ periodData, onSave, onCancel, language }: EditPeriodCellProps) {
  const [subject, setSubject] = useState(periodData.subject);
  const [teacher, setTeacher] = useState(periodData.teacher);
  const [room, setRoom] = useState(periodData.room || '');

  return (
    <div className="p-2 bg-white border-2 border-blue-500 rounded-lg space-y-2">
      <Select value={subject} onValueChange={setSubject}>
        <SelectTrigger className="h-8 text-xs">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {SUBJECTS.map(s => (
            <SelectItem key={s} value={s}>{s}</SelectItem>
          ))}
          <SelectItem value="Break">Break</SelectItem>
        </SelectContent>
      </Select>
      
      {subject !== 'Break' && (
        <>
          <Select value={teacher} onValueChange={setTeacher}>
            <SelectTrigger className="h-8 text-xs">
              <SelectValue placeholder="Select teacher" />
            </SelectTrigger>
            <SelectContent>
              {TEACHERS.map(t => (
                <SelectItem key={t} value={t}>{t}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Input
            value={room}
            onChange={(e) => setRoom(e.target.value)}
            placeholder="Room"
            className="h-8 text-xs"
          />
        </>
      )}
      
      <div className="flex gap-1">
        <Button 
          size="sm" 
          className="h-7 text-xs flex-1" 
          onClick={() => onSave(subject, teacher, room)}
        >
          <Save className="h-3 w-3 mr-1" />
          {language === 'en' ? 'Save' : 'సేవ్'}
        </Button>
        <Button 
          size="sm" 
          variant="outline" 
          className="h-7 text-xs flex-1" 
          onClick={onCancel}
        >
          <X className="h-3 w-3 mr-1" />
          {language === 'en' ? 'Cancel' : 'రద్దు'}
        </Button>
      </div>
    </div>
  );
}
