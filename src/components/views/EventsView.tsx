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
import { Calendar } from '../ui/calendar';
import { events } from '../../data/mockData';
import { Calendar as CalendarIcon, Plus, Check, X, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

type ViewMode = 'list' | 'add';

export const EventsView = () => {
  const { t, language } = useLanguage();
  const { user } = useAuth();
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [newEvent, setNewEvent] = useState({
    title: '',
    titleInTelugu: '',
    category: '',
    date: '',
    description: '',
    descriptionInTelugu: ''
  });

  const handleApproveEvent = (eventId: string) => {
    toast.success(language === 'en' 
      ? 'Event approved successfully!' 
      : 'ఈవెంట్ విజయవంతంగా ఆమోదించబడింది!');
  };

  const handleRejectEvent = (eventId: string) => {
    toast.error(language === 'en' 
      ? 'Event rejected!' 
      : 'ఈవెంట్ తిరస్కరించబడింది!');
  };

  const handleAddEvent = () => {
    if (!newEvent.title || !newEvent.category || !newEvent.date || !newEvent.description) {
      toast.error(language === 'en' ? 'Please fill all required fields' : 'దయచేసి అన్ని అవసరమైన ఫీల్డ్‌లను పూరించండి');
      return;
    }
    toast.success(language === 'en' 
      ? 'Event created successfully!' 
      : 'ఈవెంట్ విజయవంతంగా సృష్టించబడింది!');
    setNewEvent({
      title: '',
      titleInTelugu: '',
      category: '',
      date: '',
      description: '',
      descriptionInTelugu: ''
    });
    setViewMode('list');
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'holiday': return 'destructive';
      case 'exam': return 'default';
      case 'sports': return 'secondary';
      case 'cultural': return 'outline';
      case 'meeting': return 'outline';
      default: return 'secondary';
    }
  };

  // ADD EVENT VIEW
  if (viewMode === 'add') {
    return (
      <div className="space-y-6 pb-8">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => setViewMode('list')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            {language === 'en' ? 'Back to Events' : 'ఈవెంట్‌లకు తిరిగి'}
          </Button>
        </div>

        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 rounded-2xl p-8 text-white shadow-xl">
          <h1 className="text-4xl font-bold mb-2">
            {user?.role === 'principal' ? t('events.addEvent') : t('events.proposeEvent')}
          </h1>
          <p className="text-lg text-white/90">
            {language === 'en' 
              ? 'Create a new event or announcement' 
              : 'కొత్త ఈవెంట్ లేదా ప్రకటనను సృష్టించండి'}
          </p>
        </div>

        <Card className="card-3d">
          <CardContent className="pt-6">
            <div className="grid gap-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>{language === 'en' ? 'Title' : 'శీర్షిక'} *</Label>
                  <Input 
                    placeholder={language === 'en' ? 'Event title' : 'ఈవెంట్ శీర్షిక'}
                    value={newEvent.title}
                    onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>{language === 'en' ? 'Title (Telugu)' : 'శీర్షిక (తెలుగు)'}</Label>
                  <Input 
                    placeholder={language === 'en' ? 'Event title in Telugu' : 'తెలుగులో ఈవెంట్ శీర్షిక'}
                    value={newEvent.titleInTelugu}
                    onChange={(e) => setNewEvent({ ...newEvent, titleInTelugu: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>{language === 'en' ? 'Category' : 'వర్గం'} *</Label>
                  <Select value={newEvent.category} onValueChange={(val) => setNewEvent({ ...newEvent, category: val })}>
                    <SelectTrigger>
                      <SelectValue placeholder={language === 'en' ? 'Select category' : 'వర్గాన్ని ఎంచుకోండి'} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="holiday">{t('events.holiday')}</SelectItem>
                      <SelectItem value="exam">{t('events.exam')}</SelectItem>
                      <SelectItem value="sports">{t('events.sports')}</SelectItem>
                      <SelectItem value="cultural">{t('events.cultural')}</SelectItem>
                      <SelectItem value="meeting">{t('events.meeting')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>{t('common.date')} *</Label>
                  <Input 
                    type="date"
                    value={newEvent.date}
                    onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>{language === 'en' ? 'Description' : 'వివరణ'} *</Label>
                <Textarea 
                  placeholder={language === 'en' ? 'Event description' : 'ఈవెంట్ వివరణ'} 
                  rows={4}
                  value={newEvent.description}
                  onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label>{language === 'en' ? 'Description (Telugu)' : 'వివరణ (తెలుగు)'}</Label>
                <Textarea 
                  placeholder={language === 'en' ? 'Event description in Telugu' : 'తెలుగులో ఈవెంట్ వివరణ'} 
                  rows={4}
                  value={newEvent.descriptionInTelugu}
                  onChange={(e) => setNewEvent({ ...newEvent, descriptionInTelugu: e.target.value })}
                />
              </div>

              <div className="flex gap-4 pt-4">
                <Button onClick={handleAddEvent} className="flex-1" size="lg">
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

  // LIST VIEW
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl mb-2">{t('events.title')}</h1>
          <p className="text-muted-foreground">
            {language === 'en' 
              ? 'Manage school events, holidays, and calendar' 
              : 'పాఠశాల ఈవెంట్లు, సెలవులు మరియు క్యాలెండర్‌ను నిర్వహించండి'}
          </p>
        </div>
        {(user?.role === 'principal' || user?.role === 'vice_principal') && (
          <Button className="gap-2" onClick={() => setViewMode('add')}>
            <Plus className="h-4 w-4" />
            {user.role === 'principal' ? t('events.addEvent') : t('events.proposeEvent')}
          </Button>
        )}
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Calendar */}
        <div className="md:col-span-1">
          <Card className="card-3d">
            <CardHeader>
              <CardTitle>{language === 'en' ? 'Calendar' : 'క్యాలెండర్'}</CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={selectedMonth}
                onSelect={(date) => date && setSelectedMonth(date)}
                className="rounded-md border"
              />
            </CardContent>
          </Card>
        </div>

        {/* Events List */}
        <div className="md:col-span-2 space-y-4">
          <Card className="card-3d">
            <CardHeader>
              <CardTitle>{language === 'en' ? 'Upcoming Events' : 'రాబోయే ఈవెంట్లు'}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {events
                .filter(e => new Date(e.date) >= new Date())
                .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                .map(event => (
                  <div key={event.id} className="p-4 bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl border border-gray-200">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2 flex-wrap">
                          <h3 className="text-lg">
                            {language === 'en' ? event.title : event.titleInTelugu || event.title}
                          </h3>
                          <Badge variant={getCategoryColor(event.category)}>
                            {event.category}
                          </Badge>
                          <Badge variant={event.status === 'approved' ? 'default' : event.status === 'pending' ? 'secondary' : 'destructive'}>
                            {event.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          {language === 'en' ? event.description : event.descriptionInTelugu || event.description}
                        </p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <CalendarIcon className="h-3 w-3" />
                          <span>{new Date(event.date).toLocaleDateString()}</span>
                          {event.proposedBy && (
                            <>
                              <span>•</span>
                              <span>
                                {language === 'en' ? 'Proposed by Vice Principal' : 'వైస్ ప్రిన్సిపాల్ చేత ప్రతిపాదించబడింది'}
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                      
                      {user?.role === 'principal' && event.status === 'pending' && (
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            variant="default" 
                            className="gap-1"
                            onClick={() => handleApproveEvent(event.id)}
                          >
                            <Check className="h-3 w-3" />
                            {t('common.approve')}
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="gap-1"
                            onClick={() => handleRejectEvent(event.id)}
                          >
                            <X className="h-3 w-3" />
                            {t('common.reject')}
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
            </CardContent>
          </Card>

          {/* Past Events */}
          <Card className="card-3d">
            <CardHeader>
              <CardTitle>{language === 'en' ? 'Past Events' : 'గత ఈవెంట్లు'}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {events
                .filter(e => new Date(e.date) < new Date())
                .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                .slice(0, 5)
                .map(event => (
                  <div key={event.id} className="p-3 bg-gradient-to-br from-gray-50 to-blue-50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="text-sm">
                            {language === 'en' ? event.title : event.titleInTelugu || event.title}
                          </p>
                          <Badge variant="outline" className="text-xs">
                            {event.category}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {new Date(event.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
