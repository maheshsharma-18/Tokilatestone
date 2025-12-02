import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { useLanguage } from '../../contexts/LanguageContext';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { busTrips } from '../../data/mockData';
import { Bus, MapPin, TrendingUp, Download, Navigation, Plus, ArrowLeft, Users, Phone, Calendar, Eye, Edit, Gauge, AlertTriangle, User } from 'lucide-react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Textarea } from '../ui/textarea';
import { toast } from 'sonner@2.0.3';

type ViewMode = 'list' | 'addBus' | 'busDetails' | 'addDriver' | 'driverDetails' | 'addRoute' | 'routeDetails';

interface Driver {
  id: string;
  name: string;
  phone: string;
  licenseNumber: string;
  experience: string;
  assignedBus?: string;
  status: 'active' | 'inactive' | 'on-leave';
  joiningDate: string;
}

export const FleetView = () => {
  const { t, language } = useLanguage();
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [selectedBus, setSelectedBus] = useState<string | null>(null);
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);
  const [selectedRoute, setSelectedRoute] = useState<string | null>(null);
  
  const [newBus, setNewBus] = useState({
    number: '',
    model: '',
    capacity: '',
    registrationDate: '',
    lastMaintenance: '',
    assignedRoute: ''
  });

  const [newDriver, setNewDriver] = useState({
    name: '',
    phone: '',
    licenseNumber: '',
    experience: '',
    joiningDate: '',
    assignedBus: ''
  });

  const [newRoute, setNewRoute] = useState({
    name: '',
    distance: '',
    stops: '',
    assignedBus: ''
  });

  const uniqueBuses = [...new Set(busTrips.map(t => t.busNumber))];

  // Mock drivers data
  const drivers: Driver[] = [
    {
      id: 'driver1',
      name: 'Mr. Ramesh Kumar',
      phone: '+91 98765 43210',
      licenseNumber: 'DL1234567890',
      experience: '15 years',
      assignedBus: 'TS09 AB 1234',
      status: 'active',
      joiningDate: '2010-05-15'
    },
    {
      id: 'driver2',
      name: 'Mr. Venkat Rao',
      phone: '+91 98765 43211',
      licenseNumber: 'DL0987654321',
      experience: '12 years',
      assignedBus: 'TS09 CD 5678',
      status: 'active',
      joiningDate: '2012-08-20'
    },
    {
      id: 'driver3',
      name: 'Mr. Suresh Reddy',
      phone: '+91 98765 43212',
      licenseNumber: 'DL1122334455',
      experience: '10 years',
      assignedBus: 'TS09 EF 9012',
      status: 'active',
      joiningDate: '2014-03-10'
    },
    {
      id: 'driver4',
      name: 'Mr. Krishna Murthy',
      phone: '+91 98765 43213',
      licenseNumber: 'DL5544332211',
      experience: '8 years',
      assignedBus: undefined,
      status: 'inactive',
      joiningDate: '2016-11-25'
    }
  ];

  const handleAddBus = () => {
    if (!newBus.number || !newBus.model || !newBus.capacity) {
      toast.error(language === 'en' ? 'Please fill all required fields' : 'దయచేసి అన్ని అవసరమైన ఫీల్డ్‌లను పూరించండి');
      return;
    }
    toast.success(language === 'en' ? 'Bus added successfully!' : 'బస్ విజయవంతంగా జోడించబడింది!');
    setNewBus({ number: '', model: '', capacity: '', registrationDate: '', lastMaintenance: '', assignedRoute: '' });
    setViewMode('list');
  };

  const handleAddDriver = () => {
    if (!newDriver.name || !newDriver.phone || !newDriver.licenseNumber) {
      toast.error(language === 'en' ? 'Please fill all required fields' : 'దయచేసి అన్ని అవసరమైన ఫీల్డ్‌లను పూరించండి');
      return;
    }
    toast.success(language === 'en' ? 'Driver added successfully!' : 'డ్రైవర్ విజయవంతంగా జోడించబడింది!');
    setNewDriver({ name: '', phone: '', licenseNumber: '', experience: '', joiningDate: '', assignedBus: '' });
    setViewMode('list');
  };

  const handleAddRoute = () => {
    if (!newRoute.name || !newRoute.distance || !newRoute.stops) {
      toast.error(language === 'en' ? 'Please fill all required fields' : 'దయచేసి అన్ని అవసరమైన ఫీల్డ్‌లను పూరించండి');
      return;
    }
    toast.success(language === 'en' ? 'Route added successfully!' : 'మార్గం విజయవంతంగా జోడించబడింది!');
    setNewRoute({ name: '', distance: '', stops: '', assignedBus: '' });
    setViewMode('list');
  };

  // ADD BUS VIEW
  if (viewMode === 'addBus') {
    return (
      <div className="space-y-6 pb-8">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => setViewMode('list')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            {language === 'en' ? 'Back to Fleet' : 'ఫ్లీట్‌కు తిరిగి'}
          </Button>
        </div>

        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 rounded-2xl p-8 text-white shadow-xl">
          <h1 className="text-4xl font-bold mb-2">
            {language === 'en' ? 'Add New Bus' : 'కొత్త బస్ జోడించండి'}
          </h1>
          <p className="text-lg text-white/90">
            {language === 'en' ? 'Register a new bus to your fleet' : 'మీ ఫ్లీట్‌కు కొత్త బస్‌ను నమోదు చేయండి'}
          </p>
        </div>

        <Card className="card-3d">
          <CardContent className="pt-6">
            <div className="grid gap-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>{language === 'en' ? 'Bus Number' : 'బస్ నంబర్'} *</Label>
                  <Input
                    placeholder="e.g., TS09 AB 1234"
                    value={newBus.number}
                    onChange={(e) => setNewBus({ ...newBus, number: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>{language === 'en' ? 'Bus Model' : 'బస్ మోడల్'} *</Label>
                  <Input
                    placeholder="e.g., Tata Starbus"
                    value={newBus.model}
                    onChange={(e) => setNewBus({ ...newBus, model: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>{language === 'en' ? 'Seating Capacity' : 'కూర్చోవడానికి సామర్థ్యం'} *</Label>
                  <Input
                    type="number"
                    placeholder="e.g., 50"
                    value={newBus.capacity}
                    onChange={(e) => setNewBus({ ...newBus, capacity: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>{language === 'en' ? 'Registration Date' : 'నమోదు తేదీ'}</Label>
                  <Input
                    type="date"
                    value={newBus.registrationDate}
                    onChange={(e) => setNewBus({ ...newBus, registrationDate: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>{language === 'en' ? 'Last Maintenance Date' : 'చివరి నిర్వహణ తేదీ'}</Label>
                  <Input
                    type="date"
                    value={newBus.lastMaintenance}
                    onChange={(e) => setNewBus({ ...newBus, lastMaintenance: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>{language === 'en' ? 'Assigned Route' : 'కేటాయించిన మార్గం'}</Label>
                  <Select value={newBus.assignedRoute} onValueChange={(val) => setNewBus({ ...newBus, assignedRoute: val })}>
                    <SelectTrigger>
                      <SelectValue placeholder={language === 'en' ? 'Select route' : 'మార్గాన్ని ఎంచుకోండి'} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="route1">Route 1 - Banjara Hills</SelectItem>
                      <SelectItem value="route2">Route 2 - Hitech City</SelectItem>
                      <SelectItem value="route3">Route 3 - Miyapur</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <Button onClick={handleAddBus} className="flex-1" size="lg">
                  {language === 'en' ? 'Add Bus' : 'బస్ జోడించండి'}
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

  // BUS DETAILS VIEW
  if (viewMode === 'busDetails' && selectedBus) {
    const busTripsData = busTrips.filter(t => t.busNumber === selectedBus);
    const totalKm = busTripsData.reduce((sum, t) => sum + (t.endKm - t.startKm), 0);
    const driver = busTripsData[0]?.driverName;

    return (
      <div className="space-y-6 pb-8">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => setViewMode('list')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            {language === 'en' ? 'Back to Fleet' : 'ఫ్లీట్‌కు తిరిగి'}
          </Button>
        </div>

        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 rounded-2xl p-8 text-white shadow-xl">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">{selectedBus}</h1>
              <p className="text-lg text-white/90">{language === 'en' ? 'Bus Details' : 'బస్ వివరాలు'}</p>
            </div>
            <Badge variant="secondary" className="text-lg px-4 py-2">
              {language === 'en' ? 'Active' : 'క్రియాశీలం'}
            </Badge>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="card-3d">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bus className="w-5 h-5 text-primary" />
                {language === 'en' ? 'Bus Information' : 'బస్ సమాచారం'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl">
                <p className="text-sm text-muted-foreground mb-1">{language === 'en' ? 'Bus Number' : 'బస్ నంబర్'}</p>
                <p className="font-medium text-lg">{selectedBus}</p>
              </div>
              <div className="p-4 bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl">
                <p className="text-sm text-muted-foreground mb-1">{language === 'en' ? 'Model' : 'మోడల్'}</p>
                <p className="font-medium">Tata Starbus</p>
              </div>
              <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl">
                <p className="text-sm text-muted-foreground mb-1">{language === 'en' ? 'Capacity' : 'సామర్థ్యం'}</p>
                <p className="font-medium">50 seats</p>
              </div>
            </CardContent>
          </Card>

          <Card className="card-3d">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5 text-primary" />
                {language === 'en' ? 'Driver & Route' : 'డ్రైవర్ & మార్గం'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl">
                <p className="text-sm text-muted-foreground mb-1">{language === 'en' ? 'Assigned Driver' : 'కేటాయించిన డ్రైవర్'}</p>
                <p className="font-medium text-lg">{driver}</p>
              </div>
              <div className="p-4 bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl">
                <p className="text-sm text-muted-foreground mb-1">{language === 'en' ? 'Assigned Route' : 'కేటాయించిన మార్గం'}</p>
                <p className="font-medium">{busTripsData[0]?.route}</p>
              </div>
              <div className="p-4 bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl">
                <p className="text-sm text-muted-foreground mb-1">{language === 'en' ? 'Total Distance Today' : 'నేటి మొత్తం దూరం'}</p>
                <p className="font-medium text-lg">{totalKm} km</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="card-3d">
          <CardHeader>
            <CardTitle>{language === 'en' ? 'Trip History (Today)' : 'ట్రిప్ చరిత్ర (నేడు)'}</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{language === 'en' ? 'Trip Type' : 'ట్రిప్ రకం'}</TableHead>
                  <TableHead>{language === 'en' ? 'Start KM' : 'ప్రారంభ కి.మీ'}</TableHead>
                  <TableHead>{language === 'en' ? 'End KM' : 'ముగింపు కి.మీ'}</TableHead>
                  <TableHead>{language === 'en' ? 'Distance' : 'దూరం'}</TableHead>
                  <TableHead>{t('common.status')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {busTripsData.map(trip => (
                  <TableRow key={trip.id}>
                    <TableCell>
                      <Badge variant="outline">
                        {language === 'en' 
                          ? trip.tripType === 'morning' ? 'Morning' : 'Evening'
                          : trip.tripType === 'morning' ? 'ఉదయం' : 'సాయంత్రం'}
                      </Badge>
                    </TableCell>
                    <TableCell>{trip.startKm}</TableCell>
                    <TableCell>{trip.endKm}</TableCell>
                    <TableCell className="font-medium">{trip.endKm - trip.startKm} km</TableCell>
                    <TableCell>
                      <Badge variant={trip.status === 'completed' ? 'default' : 'secondary'}>
                        {trip.status === 'completed' 
                          ? (language === 'en' ? 'Completed' : 'పూర్తయింది')
                          : trip.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    );
  }

  // ADD DRIVER VIEW
  if (viewMode === 'addDriver') {
    return (
      <div className="space-y-6 pb-8">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => setViewMode('list')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            {language === 'en' ? 'Back to Fleet' : 'ఫ్లీట్‌కు తిరిగి'}
          </Button>
        </div>

        <div className="bg-gradient-to-r from-emerald-600 via-green-600 to-teal-700 rounded-2xl p-8 text-white shadow-xl">
          <h1 className="text-4xl font-bold mb-2">
            {language === 'en' ? 'Add New Driver' : 'కొత్త డ్రైవర్‌ను జోడించండి'}
          </h1>
          <p className="text-lg text-white/90">
            {language === 'en' ? 'Register a new driver to your fleet' : 'మీ ఫ్లీట్‌కు కొత్త డ్రైవర్‌ను నమోదు చేయండి'}
          </p>
        </div>

        <Card className="card-3d">
          <CardContent className="pt-6">
            <div className="grid gap-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>{language === 'en' ? 'Driver Name' : 'డ్రైవర్ పేరు'} *</Label>
                  <Input
                    placeholder="e.g., Mr. Ramesh Kumar"
                    value={newDriver.name}
                    onChange={(e) => setNewDriver({ ...newDriver, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>{language === 'en' ? 'Phone Number' : 'ఫోన్ నంబర్'} *</Label>
                  <Input
                    placeholder="+91 98765 43210"
                    value={newDriver.phone}
                    onChange={(e) => setNewDriver({ ...newDriver, phone: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>{language === 'en' ? 'License Number' : 'లైసెన్స్ నంబర్'} *</Label>
                  <Input
                    placeholder="e.g., DL1234567890"
                    value={newDriver.licenseNumber}
                    onChange={(e) => setNewDriver({ ...newDriver, licenseNumber: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>{language === 'en' ? 'Experience (Years)' : 'అనుభవం (సంవత్సరాలు)'}</Label>
                  <Input
                    type="number"
                    placeholder="e.g., 10"
                    value={newDriver.experience}
                    onChange={(e) => setNewDriver({ ...newDriver, experience: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>{language === 'en' ? 'Joining Date' : 'చేరిన తేదీ'}</Label>
                  <Input
                    type="date"
                    value={newDriver.joiningDate}
                    onChange={(e) => setNewDriver({ ...newDriver, joiningDate: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>{language === 'en' ? 'Assign Bus' : 'బస్‌ను కేటాయించండి'}</Label>
                  <Select value={newDriver.assignedBus} onValueChange={(val) => setNewDriver({ ...newDriver, assignedBus: val })}>
                    <SelectTrigger>
                      <SelectValue placeholder={language === 'en' ? 'Select bus' : 'బస్‌ను ఎంచుకోండి'} />
                    </SelectTrigger>
                    <SelectContent>
                      {uniqueBuses.map(bus => (
                        <SelectItem key={bus} value={bus}>{bus}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <Button onClick={handleAddDriver} className="flex-1" size="lg">
                  {language === 'en' ? 'Add Driver' : 'డ్రైవర్‌ను జోడించండి'}
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

  // DRIVER DETAILS VIEW
  if (viewMode === 'driverDetails' && selectedDriver) {
    return (
      <div className="space-y-6 pb-8">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => setViewMode('list')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            {language === 'en' ? 'Back to Fleet' : 'ఫ్లీట్‌కు తిరిగి'}
          </Button>
        </div>

        <div className="bg-gradient-to-r from-emerald-600 via-green-600 to-teal-700 rounded-2xl p-8 text-white shadow-xl">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">{selectedDriver.name}</h1>
              <p className="text-lg text-white/90">{language === 'en' ? 'Driver Details' : 'డ్రైవర్ వివరాలు'}</p>
            </div>
            <Badge 
              variant={selectedDriver.status === 'active' ? 'default' : 'secondary'} 
              className="text-lg px-4 py-2"
            >
              {selectedDriver.status === 'active' 
                ? (language === 'en' ? 'Active' : 'క్రియాశీలం')
                : selectedDriver.status === 'on-leave'
                ? (language === 'en' ? 'On Leave' : 'సెలవులో')
                : (language === 'en' ? 'Inactive' : 'క్రియాశీలం కాదు')}
            </Badge>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="card-3d">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5 text-primary" />
                {language === 'en' ? 'Personal Information' : 'వ్యక్తిగత సమాచారం'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl">
                <p className="text-sm text-muted-foreground mb-1">{language === 'en' ? 'Full Name' : 'పూర్తి పేరు'}</p>
                <p className="font-medium text-lg">{selectedDriver.name}</p>
              </div>
              <div className="p-4 bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl">
                <p className="text-sm text-muted-foreground mb-1">
                  <Phone className="w-4 h-4 inline mr-1" />
                  {language === 'en' ? 'Phone Number' : 'ఫోన్ నంబర్'}
                </p>
                <p className="font-medium">{selectedDriver.phone}</p>
              </div>
              <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl">
                <p className="text-sm text-muted-foreground mb-1">{language === 'en' ? 'License Number' : 'లైసెన్స్ నంబర్'}</p>
                <p className="font-medium">{selectedDriver.licenseNumber}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="card-3d">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bus className="w-5 h-5 text-primary" />
                {language === 'en' ? 'Work Information' : 'పని సమాచారం'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl">
                <p className="text-sm text-muted-foreground mb-1">{language === 'en' ? 'Experience' : 'అనుభవం'}</p>
                <p className="font-medium text-lg">{selectedDriver.experience}</p>
              </div>
              <div className="p-4 bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl">
                <p className="text-sm text-muted-foreground mb-1">{language === 'en' ? 'Assigned Bus' : 'కేటాయించిన బస్'}</p>
                <p className="font-medium text-lg">{selectedDriver.assignedBus || (language === 'en' ? 'Not Assigned' : 'కేటాయించబడలేదు')}</p>
              </div>
              <div className="p-4 bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl">
                <p className="text-sm text-muted-foreground mb-1">
                  <Calendar className="w-4 h-4 inline mr-1" />
                  {language === 'en' ? 'Joining Date' : 'చేరిన తేదీ'}
                </p>
                <p className="font-medium">{new Date(selectedDriver.joiningDate).toLocaleDateString()}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {selectedDriver.assignedBus && (
          <Card className="card-3d">
            <CardHeader>
              <CardTitle>{language === 'en' ? 'Recent Trips' : 'ఇటీవలి ట్రిప్‌లు'}</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{language === 'en' ? 'Date' : 'తేదీ'}</TableHead>
                    <TableHead>{language === 'en' ? 'Route' : 'మార్గం'}</TableHead>
                    <TableHead>{language === 'en' ? 'Trip Type' : 'ట్రిప్ రకం'}</TableHead>
                    <TableHead>{language === 'en' ? 'Distance' : 'దూరం'}</TableHead>
                    <TableHead>{t('common.status')}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {busTrips
                    .filter(t => t.driverId === selectedDriver.id)
                    .slice(0, 5)
                    .map(trip => (
                      <TableRow key={trip.id}>
                        <TableCell>{new Date(trip.date).toLocaleDateString()}</TableCell>
                        <TableCell>{trip.route}</TableCell>
                        <TableCell>
                          <Badge variant="outline">
                            {language === 'en' 
                              ? trip.tripType === 'morning' ? 'Morning' : 'Evening'
                              : trip.tripType === 'morning' ? 'ఉదయం' : 'సాయంత్రం'}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-medium">{trip.endKm - trip.startKm} km</TableCell>
                        <TableCell>
                          <Badge variant={trip.status === 'completed' ? 'default' : 'secondary'}>
                            {trip.status === 'completed' 
                              ? (language === 'en' ? 'Completed' : 'పూర్తయింది')
                              : trip.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}
      </div>
    );
  }

  // MAIN LIST VIEW
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl mb-2">{t('fleet.title')}</h1>
          <p className="text-muted-foreground">
            {language === 'en' 
              ? 'Monitor and manage school fleet operations' 
              : 'పాఠశాల ఫ్లీట్ కార్యకలాపాలను పర్యవేక్షించండి మరియు నిర్వహించండి'}
          </p>
        </div>
        <Button variant="outline" className="gap-2">
          <Download className="h-4 w-4" />
          {t('common.export')}
        </Button>
      </div>

      <Tabs defaultValue="trips" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="trips">{language === 'en' ? 'All Trips' : 'అన్ని ట్రిప్‌లు'}</TabsTrigger>
          <TabsTrigger value="buses">{language === 'en' ? 'Buses' : 'బస్సులు'}</TabsTrigger>
          <TabsTrigger value="drivers">{language === 'en' ? 'Drivers' : 'డ్రైవర్లు'}</TabsTrigger>
          <TabsTrigger value="routes">{language === 'en' ? 'Routes' : 'మార్గాలు'}</TabsTrigger>
        </TabsList>

        {/* TRIPS TAB */}
        <TabsContent value="trips" className="space-y-6">
          <Card className="card-3d">
            <CardHeader>
              <CardTitle>{language === 'en' ? 'Today\'s Trips' : 'నేటి ట్రిప్‌లు'}</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t('fleet.busNumber')}</TableHead>
                    <TableHead>{t('fleet.driver')}</TableHead>
                    <TableHead>{t('fleet.route')}</TableHead>
                    <TableHead>{t('fleet.tripType')}</TableHead>
                    <TableHead>{language === 'en' ? 'Start KM' : 'ప్రారంభ కి.మీ'}</TableHead>
                    <TableHead>{language === 'en' ? 'End KM' : 'ముగింపు కి.మీ'}</TableHead>
                    <TableHead>{language === 'en' ? 'Distance' : 'దూరం'}</TableHead>
                    <TableHead>{t('common.status')}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {busTrips.map(trip => (
                    <TableRow key={trip.id} className="hover:bg-blue-50 transition-colors">
                      <TableCell className="font-medium">{trip.busNumber}</TableCell>
                      <TableCell>{trip.driverName}</TableCell>
                      <TableCell>{trip.route}</TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {language === 'en' 
                            ? trip.tripType === 'morning' ? 'Morning' : 'Evening'
                            : trip.tripType === 'morning' ? 'ఉదయం' : 'సాయంత్రం'}
                        </Badge>
                      </TableCell>
                      <TableCell>{trip.startKm}</TableCell>
                      <TableCell>{trip.endKm}</TableCell>
                      <TableCell className="font-medium">{trip.endKm - trip.startKm} km</TableCell>
                      <TableCell>
                        <Badge variant={trip.status === 'completed' ? 'default' : 'secondary'}>
                          {trip.status === 'completed' 
                            ? (language === 'en' ? 'Completed' : 'పూర్తయింది')
                            : trip.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* BUSES TAB */}
        <TabsContent value="buses" className="space-y-6">
          <div className="flex justify-end">
            <Button onClick={() => setViewMode('addBus')} className="gap-2">
              <Plus className="h-4 w-4" />
              {language === 'en' ? 'Add Bus' : 'బస్ జోడించండి'}
            </Button>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {uniqueBuses.map(busNumber => {
              const busTripsData = busTrips.filter(t => t.busNumber === busNumber);
              const totalKm = busTripsData.reduce((sum, t) => sum + (t.endKm - t.startKm), 0);
              const driver = busTripsData[0]?.driverName;

              return (
                <Card 
                  key={busNumber} 
                  className="card-3d cursor-pointer hover:shadow-xl transition-shadow"
                  onClick={() => {
                    setSelectedBus(busNumber);
                    setViewMode('busDetails');
                  }}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{busNumber}</CardTitle>
                      <Bus className="h-5 w-5 text-muted-foreground" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="p-3 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl">
                        <p className="text-sm text-muted-foreground">{t('fleet.driver')}</p>
                        <p className="text-sm font-medium">{driver}</p>
                      </div>
                      <div className="p-3 bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl">
                        <p className="text-sm text-muted-foreground">{language === 'en' ? 'Today\'s Distance' : 'నేటి దూరం'}</p>
                        <p className="text-xl font-bold">{totalKm} km</p>
                      </div>
                      <div className="p-3 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl">
                        <p className="text-sm text-muted-foreground">{language === 'en' ? 'Trips Today' : 'నేటి ట్రిప్‌లు'}</p>
                        <p className="text-sm font-medium">{busTripsData.length}</p>
                      </div>
                      <Badge variant="default" className="w-full justify-center">
                        {language === 'en' ? 'Active' : 'క్రియాశీలం'}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        {/* DRIVERS TAB */}
        <TabsContent value="drivers" className="space-y-6">
          <div className="flex justify-end">
            <Button onClick={() => setViewMode('addDriver')} className="gap-2">
              <Plus className="h-4 w-4" />
              {language === 'en' ? 'Add Driver' : 'డ్రైవర్‌ను జోడించండి'}
            </Button>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {drivers.map(driver => (
              <Card 
                key={driver.id} 
                className="card-3d cursor-pointer hover:shadow-xl transition-shadow"
                onClick={() => {
                  setSelectedDriver(driver);
                  setViewMode('driverDetails');
                }}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{driver.name}</CardTitle>
                    <Users className="h-5 w-5 text-muted-foreground" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-3 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl">
                      <p className="text-sm text-muted-foreground">{language === 'en' ? 'Phone' : 'ఫోన్'}</p>
                      <p className="text-sm font-medium">{driver.phone}</p>
                    </div>
                    <div className="p-3 bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl">
                      <p className="text-sm text-muted-foreground">{language === 'en' ? 'Experience' : 'అనుభవం'}</p>
                      <p className="text-sm font-medium">{driver.experience}</p>
                    </div>
                    <div className="p-3 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl">
                      <p className="text-sm text-muted-foreground">{language === 'en' ? 'Assigned Bus' : 'కేటాయించిన బస్'}</p>
                      <p className="text-sm font-medium">{driver.assignedBus || (language === 'en' ? 'Not Assigned' : 'కేటాయించబడలేదు')}</p>
                    </div>
                    <Badge 
                      variant={driver.status === 'active' ? 'default' : 'secondary'} 
                      className="w-full justify-center"
                    >
                      {driver.status === 'active' 
                        ? (language === 'en' ? 'Active' : 'క్రియాశీలం')
                        : driver.status === 'on-leave'
                        ? (language === 'en' ? 'On Leave' : 'సెలవులో')
                        : (language === 'en' ? 'Inactive' : 'క్రియాశీలం కాదు')}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* ROUTES TAB */}
        <TabsContent value="routes" className="space-y-6">
          <div className="grid gap-4">
            {['Route 1 - Banjara Hills', 'Route 2 - Hitech City', 'Route 3 - Miyapur'].map((route, idx) => {
              const routeTrips = busTrips.filter(t => t.route === route);
              const totalKm = routeTrips.reduce((sum, t) => sum + (t.endKm - t.startKm), 0);

              return (
                <Card key={route} className="card-3d">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>{route}</CardTitle>
                      <Navigation className="h-5 w-5 text-muted-foreground" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 md:grid-cols-4 mb-4">
                      <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl">
                        <p className="text-sm text-muted-foreground">{language === 'en' ? 'Pickup Points' : 'పికప్ పాయింట్లు'}</p>
                        <p className="text-lg font-bold">3</p>
                      </div>
                      <div className="p-4 bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl">
                        <p className="text-sm text-muted-foreground">{language === 'en' ? 'Distance' : 'దూరం'}</p>
                        <p className="text-lg font-bold">{totalKm} km</p>
                      </div>
                      <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl">
                        <p className="text-sm text-muted-foreground">{language === 'en' ? 'Assigned Bus' : 'కేటాయించిన బస్'}</p>
                        <p className="text-sm font-medium">{routeTrips[0]?.busNumber}</p>
                      </div>
                      <div className="p-4 bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl">
                        <p className="text-sm text-muted-foreground">{t('common.status')}</p>
                        <Badge variant="default">{language === 'en' ? 'Active' : 'క్రియాశీలం'}</Badge>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <p className="text-sm mb-3 font-medium">{language === 'en' ? 'Stops:' : 'స్టాప్‌లు:'}</p>
                      <div className="grid gap-2 md:grid-cols-3">
                        {routeTrips[0]?.pickupPoints.map((point, i) => (
                          <div key={i} className="flex items-center gap-2 p-3 bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl">
                            <MapPin className="h-4 w-4 text-primary" />
                            <span className="text-sm font-medium">{point}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
