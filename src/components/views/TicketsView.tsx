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
import { tickets } from '../../data/mockData';
import { Ticket, MessageCircle, Filter, Plus, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

type ViewMode = 'list' | 'create' | 'details';

export const TicketsView = () => {
  const { t, language } = useLanguage();
  const { user } = useAuth();
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedTicket, setSelectedTicket] = useState<typeof tickets[0] | null>(null);
  const [comment, setComment] = useState('');
  const [newTicket, setNewTicket] = useState({
    category: '',
    title: '',
    description: ''
  });

  const filteredTickets = tickets.filter(ticket => {
    const statusMatch = selectedStatus === 'all' || ticket.status === selectedStatus;
    const categoryMatch = selectedCategory === 'all' || ticket.category === selectedCategory;
    const userMatch = user?.role === 'class_teacher' 
      ? ticket.assignedTo === user.id 
      : true;
    return statusMatch && categoryMatch && userMatch;
  });

  const handleStatusUpdate = (ticketId: string, newStatus: string) => {
    toast.success(language === 'en' 
      ? `Ticket status updated to ${newStatus}!` 
      : `టికెట్ స్థితి ${newStatus}కి నవీకరించబడింది!`);
  };

  const handleAddComment = () => {
    if (comment.trim()) {
      toast.success(language === 'en' 
        ? 'Comment added successfully!' 
        : 'వ్యాఖ్య విజయవంతంగా జోడించబడింది!');
      setComment('');
    }
  };

  const handleCreateTicket = () => {
    if (!newTicket.category || !newTicket.title || !newTicket.description) {
      toast.error(language === 'en' ? 'Please fill all fields' : 'దయచేసి అన్ని ఫీల్డ్‌లను పూరించండి');
      return;
    }
    toast.success(language === 'en' ? 'Ticket created!' : 'టికెట్ సృష్టించబడింది!');
    setNewTicket({ category: '', title: '', description: '' });
    setViewMode('list');
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'destructive';
      case 'medium': return 'default';
      case 'low': return 'secondary';
      default: return 'secondary';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'destructive';
      case 'in_progress': return 'default';
      case 'resolved': return 'secondary';
      default: return 'secondary';
    }
  };

  // CREATE TICKET VIEW
  if (viewMode === 'create') {
    return (
      <div className="space-y-6 pb-8">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => setViewMode('list')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            {language === 'en' ? 'Back to Tickets' : 'టికెట్‌లకు తిరిగి'}
          </Button>
        </div>

        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 rounded-2xl p-8 text-white shadow-xl">
          <h1 className="text-4xl font-bold mb-2">{t('tickets.raiseTicket')}</h1>
          <p className="text-lg text-white/90">
            {language === 'en' ? 'Create a new ticket for your concern' : 'మీ ఆందోళన కోసం కొత్త టికెట్‌ను సృష్టించండి'}
          </p>
        </div>

        <Card className="card-3d">
          <CardContent className="pt-6">
            <div className="grid gap-6">
              <div className="space-y-2">
                <Label>{t('tickets.category')}</Label>
                <Select value={newTicket.category} onValueChange={(val) => setNewTicket({ ...newTicket, category: val })}>
                  <SelectTrigger>
                    <SelectValue placeholder={language === 'en' ? 'Select category' : 'వర్గాన్ని ఎంచుకోండి'} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="attendance">{t('nav.attendance')}</SelectItem>
                    <SelectItem value="grades">{t('nav.grades')}</SelectItem>
                    <SelectItem value="transport">Transport</SelectItem>
                    <SelectItem value="class">Class</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>{language === 'en' ? 'Title' : 'శీర్షిక'}</Label>
                <Input 
                  placeholder={language === 'en' ? 'Brief description' : 'సంక్షిప్త వివరణ'} 
                  value={newTicket.title}
                  onChange={(e) => setNewTicket({ ...newTicket, title: e.target.value })}
                />
              </div>
              
              <div className="space-y-2">
                <Label>{language === 'en' ? 'Description' : 'వివరణ'}</Label>
                <Textarea 
                  placeholder={language === 'en' ? 'Detailed description' : 'వివరణాత్మక వివరణ'} 
                  rows={6}
                  value={newTicket.description}
                  onChange={(e) => setNewTicket({ ...newTicket, description: e.target.value })}
                />
              </div>

              <div className="flex gap-4 pt-4">
                <Button onClick={handleCreateTicket} className="flex-1" size="lg">
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

  // TICKET DETAILS VIEW
  if (viewMode === 'details' && selectedTicket) {
    return (
      <div className="space-y-6 pb-8">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => setViewMode('list')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            {language === 'en' ? 'Back to Tickets' : 'టికెట్‌లకు తిరిగి'}
          </Button>
        </div>

        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 rounded-2xl p-8 text-white shadow-xl">
          <h1 className="text-4xl font-bold mb-2">{selectedTicket.title}</h1>
          <p className="text-lg text-white/90">Ticket ID: {selectedTicket.id}</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="card-3d">
            <CardHeader>
              <CardTitle>{language === 'en' ? 'Ticket Information' : 'టికెట్ సమాచారం'}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl">
                <p className="text-sm text-muted-foreground mb-1">{t('common.status')}</p>
                <Select 
                  defaultValue={selectedTicket.status}
                  onValueChange={(val) => handleStatusUpdate(selectedTicket.id, val)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="open">{t('tickets.open')}</SelectItem>
                    <SelectItem value="in_progress">{t('tickets.inProgress')}</SelectItem>
                    <SelectItem value="resolved">{t('tickets.resolved')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="p-4 bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl">
                <p className="text-sm text-muted-foreground mb-2">{t('tickets.priority')}</p>
                <Badge variant={getPriorityColor(selectedTicket.priority)} className="text-lg px-4 py-2">
                  {selectedTicket.priority}
                </Badge>
              </div>

              <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl">
                <p className="text-sm text-muted-foreground mb-1">{t('tickets.category')}</p>
                <Badge variant="outline" className="text-lg px-4 py-2">{selectedTicket.category}</Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="card-3d">
            <CardHeader>
              <CardTitle>{language === 'en' ? 'Details' : 'వివరాలు'}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl">
                <p className="text-sm text-muted-foreground mb-1">{language === 'en' ? 'Raised by' : 'రైజ్ చేసినవారు'}</p>
                <p className="font-medium">{selectedTicket.raisedByName}</p>
              </div>

              <div className="p-4 bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl">
                <p className="text-sm text-muted-foreground mb-1">{language === 'en' ? 'Assigned to' : 'కేటాయించబడింది'}</p>
                <p className="font-medium">{selectedTicket.assignedToName}</p>
              </div>

              <div className="p-4 bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl">
                <p className="text-sm text-muted-foreground mb-1">{language === 'en' ? 'Created on' : 'సృష్టించిన తేదీ'}</p>
                <p className="font-medium">{new Date(selectedTicket.createdAt).toLocaleString()}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="card-3d">
          <CardHeader>
            <CardTitle>{language === 'en' ? 'Description' : 'వివరణ'}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="p-4 bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl">{selectedTicket.description}</p>
          </CardContent>
        </Card>

        <Card className="card-3d">
          <CardHeader>
            <CardTitle>{language === 'en' ? 'Comments' : 'వ్యాఖ్యలు'}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 mb-6">
              {selectedTicket.comments?.map(comm => (
                <div key={comm.id} className="p-4 bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-medium">{comm.userName}</span>
                    <span className="text-xs text-muted-foreground">
                      {new Date(comm.timestamp).toLocaleString()}
                    </span>
                  </div>
                  <p className="text-sm">{comm.comment}</p>
                </div>
              ))}
              {(!selectedTicket.comments || selectedTicket.comments.length === 0) && (
                <p className="text-sm text-muted-foreground text-center py-8">
                  {language === 'en' ? 'No comments yet' : 'ఇంకా వ్యాఖ్యలు లేవు'}
                </p>
              )}
            </div>

            <div className="space-y-3">
              <Label>{language === 'en' ? 'Add a comment' : 'వ్యాఖ్యను జోడించండి'}</Label>
              <Textarea 
                placeholder={language === 'en' ? 'Add a comment...' : 'వ్యాఖ్యను జోడించండి...'}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={4}
              />
              <Button onClick={handleAddComment} size="lg" className="gap-2">
                <MessageCircle className="h-4 w-4" />
                {language === 'en' ? 'Add Comment' : 'వ్యాఖ్యను జోడించండి'}
              </Button>
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
          <h1 className="text-3xl mb-2">{t('tickets.title')}</h1>
          <p className="text-muted-foreground">
            {language === 'en' ? 'Manage and track parent tickets' : 'తల్లిదండ్రుల టికెట్లను నిర్వహించండి మరియు ట్రాక్ చేయండి'}
          </p>
        </div>
        {user?.role === 'parent' && (
          <Button className="gap-2" onClick={() => setViewMode('create')}>
            <Plus className="h-4 w-4" />
            {t('tickets.raiseTicket')}
          </Button>
        )}
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label>{t('common.status')}</Label>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{language === 'en' ? 'All' : 'అన్నీ'}</SelectItem>
                  <SelectItem value="open">{t('tickets.open')}</SelectItem>
                  <SelectItem value="in_progress">{t('tickets.inProgress')}</SelectItem>
                  <SelectItem value="resolved">{t('tickets.resolved')}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>{t('tickets.category')}</Label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{language === 'en' ? 'All' : 'అన్నీ'}</SelectItem>
                  <SelectItem value="attendance">{t('nav.attendance')}</SelectItem>
                  <SelectItem value="grades">{t('nav.grades')}</SelectItem>
                  <SelectItem value="transport">Transport</SelectItem>
                  <SelectItem value="class">Class</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end">
              <Button variant="outline" className="w-full gap-2">
                <Filter className="h-4 w-4" />
                {language === 'en' ? 'Apply Filters' : 'ఫిల్టర్‌లను వర్తింపజేయండి'}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tickets List */}
      <div className="grid gap-4">
        {filteredTickets.map(ticket => (
          <Card key={ticket.id} className="card-3d cursor-pointer hover:shadow-xl transition-shadow" onClick={() => {
            setSelectedTicket(ticket);
            setViewMode('details');
          }}>
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2 flex-wrap">
                    <h3 className="text-lg">{ticket.title}</h3>
                    <Badge variant={getPriorityColor(ticket.priority)}>
                      {ticket.priority}
                    </Badge>
                    <Badge variant={getStatusColor(ticket.status)}>
                      {ticket.status}
                    </Badge>
                    <Badge variant="outline">{ticket.category}</Badge>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-3">{ticket.description}</p>
                  
                  <div className="flex items-center gap-4 text-xs text-muted-foreground flex-wrap">
                    <span>
                      {language === 'en' ? 'Raised by:' : 'రైజ్ చేసినవారు:'} {ticket.raisedByName}
                    </span>
                    <span>•</span>
                    <span>
                      {language === 'en' ? 'Assigned to:' : 'కేటాయించబడింది:'} {ticket.assignedToName}
                    </span>
                    <span>•</span>
                    <span>{new Date(ticket.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {filteredTickets.length === 0 && (
          <Card>
            <CardContent className="py-12 text-center">
              <Ticket className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground">
                {language === 'en' ? 'No tickets found' : 'టికెట్లు కనుగొనబడలేదు'}
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};
