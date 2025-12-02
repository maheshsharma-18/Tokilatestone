import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Textarea } from '../ui/textarea';
import { Badge } from '../ui/badge';
import { homeworks } from '../../data/mockData';
import { BookOpen, Plus, Upload, Download, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

type ViewMode = 'list' | 'add' | 'details';

export const HomeworkView = () => {
  const { t, language } = useLanguage();
  const { user } = useAuth();
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [selectedHomework, setSelectedHomework] = useState<typeof homeworks[0] | null>(null);
  const [newHomework, setNewHomework] = useState({
    class: '',
    section: '',
    subject: '',
    title: '',
    description: '',
    dueDate: ''
  });

  const handleAddHomework = () => {
    if (!newHomework.class || !newHomework.section || !newHomework.subject || !newHomework.title || !newHomework.description || !newHomework.dueDate) {
      toast.error(language === 'en' ? 'Please fill all required fields' : 'దయచేసి అన్ని అవసరమైన ఫీల్డ్‌లను పూరించండి');
      return;
    }
    toast.success(language === 'en' 
      ? 'Homework uploaded successfully!' 
      : 'హోంవర్క్ విజయవంతంగా అప్‌లోడ్ చేయబడింది!');
    setNewHomework({
      class: '',
      section: '',
      subject: '',
      title: '',
      description: '',
      dueDate: ''
    });
    setViewMode('list');
  };

  const isPastDue = (dueDate: string) => {
    return new Date(dueDate) < new Date();
  };

  // ADD HOMEWORK VIEW
  if (viewMode === 'add') {
    return (
      <div className="space-y-6 pb-8">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => setViewMode('list')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            {language === 'en' ? 'Back to Homework' : 'హోంవర్క్‌కు తిరిగి'}
          </Button>
        </div>

        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 rounded-2xl p-8 text-white shadow-xl">
          <h1 className="text-4xl font-bold mb-2">
            {language === 'en' ? 'Upload Homework' : 'హోంవర్క్ అప్‌లోడ్ చేయండి'}
          </h1>
          <p className="text-lg text-white/90">
            {language === 'en' 
              ? 'Create and assign homework to students' 
              : 'విద్యార్థులకు హోంవర్క్‌ను సృష్టించండి మరియు కేటాయించండి'}
          </p>
        </div>

        <Card className="card-3d">
          <CardContent className="pt-6">
            <div className="grid gap-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>{t('common.class')} *</Label>
                  <Select value={newHomework.class} onValueChange={(val) => setNewHomework({ ...newHomework, class: val })}>
                    <SelectTrigger>
                      <SelectValue placeholder={language === 'en' ? 'Select class' : 'తరగతిని ఎంచుకోండి'} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="10">Class 10</SelectItem>
                      <SelectItem value="9">Class 9</SelectItem>
                      <SelectItem value="8">Class 8</SelectItem>
                      <SelectItem value="7">Class 7</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>{t('common.section')} *</Label>
                  <Select value={newHomework.section} onValueChange={(val) => setNewHomework({ ...newHomework, section: val })}>
                    <SelectTrigger>
                      <SelectValue placeholder={language === 'en' ? 'Select section' : 'విభాగాన్ని ఎంచుకోండి'} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="A">Section A</SelectItem>
                      <SelectItem value="B">Section B</SelectItem>
                      <SelectItem value="C">Section C</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>{t('common.subject')} *</Label>
                <Select value={newHomework.subject} onValueChange={(val) => setNewHomework({ ...newHomework, subject: val })}>
                  <SelectTrigger>
                    <SelectValue placeholder={language === 'en' ? 'Select subject' : 'విషయాన్ని ఎంచుకోండి'} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Mathematics">Mathematics</SelectItem>
                    <SelectItem value="Science">Science</SelectItem>
                    <SelectItem value="English">English</SelectItem>
                    <SelectItem value="Hindi">Hindi</SelectItem>
                    <SelectItem value="Social Studies">Social Studies</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>{language === 'en' ? 'Title' : 'శీర్షిక'} *</Label>
                <Input 
                  placeholder={language === 'en' ? 'Homework title' : 'హోంవర్క్ శీర్షిక'}
                  value={newHomework.title}
                  onChange={(e) => setNewHomework({ ...newHomework, title: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label>{language === 'en' ? 'Description' : 'వివరణ'} *</Label>
                <Textarea 
                  placeholder={language === 'en' ? 'Homework description' : 'హోంవర్క్ వివరణ'} 
                  rows={5}
                  value={newHomework.description}
                  onChange={(e) => setNewHomework({ ...newHomework, description: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label>{language === 'en' ? 'Due Date' : 'గడువు తేదీ'} *</Label>
                <Input 
                  type="date"
                  value={newHomework.dueDate}
                  onChange={(e) => setNewHomework({ ...newHomework, dueDate: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label>{language === 'en' ? 'Attachments' : 'జోడింపులు'}</Label>
                <div className="border-2 border-dashed rounded-xl p-8 text-center hover:border-blue-500 transition-colors cursor-pointer bg-gradient-to-br from-gray-50 to-blue-50">
                  <Upload className="h-12 w-12 mx-auto mb-3 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    {language === 'en' 
                      ? 'Click to upload or drag and drop' 
                      : 'అప్‌లోడ్ చేయడానికి క్లిక్ చేయండి లేదా డ్రాగ్ అండ్ ��్రాప్ చేయండి'}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {language === 'en' ? 'PDF, DOC, DOCX (Max 10MB)' : 'PDF, DOC, DOCX (గరిష్టంగా 10MB)'}
                  </p>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <Button onClick={handleAddHomework} className="flex-1" size="lg">
                  {t('common.submit')}
                </Button>
                <Button onClick={() => setViewMode('list')} variant="outline" className="flex-1" size="lg">
                  {language === 'en' ? 'Cancel' : 'రద్దు చేయండి'}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // HOMEWORK DETAILS VIEW
  if (viewMode === 'details' && selectedHomework) {
    return (
      <div className="space-y-6 pb-8">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => setViewMode('list')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            {language === 'en' ? 'Back to Homework' : 'హోంవర్క్‌కు తిరిగి'}
          </Button>
        </div>

        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 rounded-2xl p-8 text-white shadow-xl">
          <h1 className="text-4xl font-bold mb-2">{selectedHomework.title}</h1>
          <p className="text-lg text-white/90">
            {selectedHomework.subject} • {selectedHomework.class}{selectedHomework.section}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="card-3d">
            <CardHeader>
              <CardTitle>{language === 'en' ? 'Homework Details' : 'హోంవర్క్ వివరాలు'}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl">
                <p className="text-sm text-muted-foreground mb-1">{t('common.subject')}</p>
                <Badge variant="outline" className="text-lg px-4 py-2">{selectedHomework.subject}</Badge>
              </div>

              <div className="p-4 bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl">
                <p className="text-sm text-muted-foreground mb-1">{language === 'en' ? 'Class & Section' : 'తరగతి & విభాగం'}</p>
                <p className="font-medium text-lg">{selectedHomework.class}{selectedHomework.section}</p>
              </div>

              <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl">
                <p className="text-sm text-muted-foreground mb-1">{language === 'en' ? 'Assigned By' : 'కేటాయించినవారు'}</p>
                <p className="font-medium">{selectedHomework.uploadedBy}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="card-3d">
            <CardHeader>
              <CardTitle>{language === 'en' ? 'Important Dates' : 'ముఖ్యమైన తేదీలు'}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl">
                <p className="text-sm text-muted-foreground mb-1">{language === 'en' ? 'Assigned On' : 'కేటాయించిన తేదీ'}</p>
                <p className="font-medium">{new Date(selectedHomework.uploadDate).toLocaleDateString()}</p>
              </div>

              <div className={`p-4 rounded-xl ${isPastDue(selectedHomework.dueDate) ? 'bg-gradient-to-br from-red-50 to-pink-50' : 'bg-gradient-to-br from-emerald-50 to-green-50'}`}>
                <p className="text-sm text-muted-foreground mb-1">{language === 'en' ? 'Due Date' : 'గడువు తేదీ'}</p>
                <p className="font-medium">{new Date(selectedHomework.dueDate).toLocaleDateString()}</p>
                {isPastDue(selectedHomework.dueDate) && (
                  <Badge variant="destructive" className="mt-2">
                    {language === 'en' ? 'Overdue' : 'గడువు ముగిసింది'}
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="card-3d">
          <CardHeader>
            <CardTitle>{language === 'en' ? 'Description' : 'వివరణ'}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="p-4 bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl whitespace-pre-wrap">
              {selectedHomework.description}
            </p>
          </CardContent>
        </Card>

        {selectedHomework.attachments && selectedHomework.attachments.length > 0 && (
          <Card className="card-3d">
            <CardHeader>
              <CardTitle>{language === 'en' ? 'Attachments' : 'జోడింపులు'}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3">
                {selectedHomework.attachments.map((attachment, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <Download className="h-5 w-5 text-blue-600" />
                      <span className="font-medium">{attachment}</span>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      {language === 'en' ? 'Download' : 'డౌన్‌లోడ్'}
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    );
  }

  // LIST VIEW
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl mb-2">{t('nav.homework')}</h1>
          <p className="text-muted-foreground">
            {language === 'en' 
              ? 'Manage homework and assignments' 
              : 'హోంవర్క్ మరియు అసైన్‌మెంట్‌లను నిర్వహించండి'}
          </p>
        </div>
        {(user?.role === 'class_teacher' || user?.role === 'subject_teacher') && (
          <Button className="gap-2" onClick={() => setViewMode('add')}>
            <Plus className="h-4 w-4" />
            {language === 'en' ? 'Upload Homework' : 'హోంవర్క్ అప్‌లోడ్ చేయండి'}
          </Button>
        )}
      </div>

      {/* Homework List */}
      <div className="grid gap-4">
        {homeworks.map(homework => (
          <Card 
            key={homework.id} 
            className="card-3d cursor-pointer hover:shadow-xl transition-shadow"
            onClick={() => {
              setSelectedHomework(homework);
              setViewMode('details');
            }}
          >
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2 flex-wrap">
                    <BookOpen className="h-5 w-5 text-blue-600" />
                    <h3 className="text-lg">{homework.title}</h3>
                    <Badge variant="outline">{homework.subject}</Badge>
                    <Badge variant="outline">
                      {homework.class}{homework.section}
                    </Badge>
                    {isPastDue(homework.dueDate) && (
                      <Badge variant="destructive">
                        {language === 'en' ? 'Overdue' : 'గడువు ముగిసింది'}
                      </Badge>
                    )}
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-3">{homework.description}</p>
                  
                  <div className="flex items-center gap-4 text-xs text-muted-foreground flex-wrap">
                    <span>
                      {language === 'en' ? 'Assigned:' : 'కేటాయించబడింది:'} {new Date(homework.uploadDate).toLocaleDateString()}
                    </span>
                    <span>•</span>
                    <span>
                      {language === 'en' ? 'Due:' : 'గడువు:'} {new Date(homework.dueDate).toLocaleDateString()}
                    </span>
                    {homework.attachments && homework.attachments.length > 0 && (
                      <>
                        <span>•</span>
                        <span>
                          {homework.attachments.length} {language === 'en' ? 'attachment(s)' : 'జోడింపు(లు)'}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {homeworks.length === 0 && (
          <Card>
            <CardContent className="py-12 text-center">
              <BookOpen className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground">
                {language === 'en' ? 'No homework assigned yet' : 'ఇంకా హోంవర్క్ కేటాయించబడలేదు'}
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};
