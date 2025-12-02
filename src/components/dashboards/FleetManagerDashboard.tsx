import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { useLanguage } from '../../contexts/LanguageContext';
import { Bus, MapPin, TrendingUp, Users, Gauge, AlertTriangle, Calendar } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { busTrips } from '../../data/mockData';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Progress } from '../ui/progress';

interface FleetManagerDashboardProps {
  onNavigate: (view: string) => void;
}

export const FleetManagerDashboard = ({ onNavigate }: FleetManagerDashboardProps) => {
  const { t, language } = useLanguage();

  // Calculate statistics
  const totalBuses = [...new Set(busTrips.map(t => t.busNumber))].length;
  const totalDrivers = [...new Set(busTrips.map(t => t.driverId))].length;
  const completedTrips = busTrips.filter(t => t.status === 'completed').length;
  const totalKm = busTrips.reduce((sum, trip) => sum + (trip.endKm - trip.startKm), 0);
  const avgKmPerTrip = Math.round(totalKm / busTrips.length);
  const activeTrips = busTrips.filter(t => t.status === 'in-progress').length;

  // Mock maintenance alerts
  const maintenanceAlerts = [
    { busNumber: 'TS09 AB 1234', issue: 'Oil Change Due', dueDate: '2024-01-20', priority: 'medium' },
    { busNumber: 'TS09 CD 5678', issue: 'Tire Replacement', dueDate: '2024-01-18', priority: 'high' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl mb-2">
          {t('dashboard.welcome')}, {language === 'en' ? 'Mr. Ravi Varma' : 'శ్రీ రవి వర్మ'}
        </h1>
        <p className="text-muted-foreground">
          {language === 'en' ? 'Fleet Manager Dashboard - Monitor and manage your fleet operations' : 'ఫ్లీట్ మేనేజర్ డ్యాష్‌బోర్డ్ - మీ ఫ్లీట్ కార్యకలాపాలను పర్యవేక్షించండి'}
        </p>
      </div>

      {/* Overview Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="card-3d hover:shadow-xl transition-shadow cursor-pointer" onClick={() => onNavigate('fleet')}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">{language === 'en' ? 'Total Buses' : 'మొత్తం బస్సులు'}</CardTitle>
            <Bus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{totalBuses}</div>
            <p className="text-xs text-muted-foreground">
              {language === 'en' ? 'Active fleet' : 'క్రియాశీల ఫ్లీట్'}
            </p>
            <Progress value={85} className="mt-2" />
          </CardContent>
        </Card>

        <Card className="card-3d hover:shadow-xl transition-shadow cursor-pointer" onClick={() => onNavigate('fleet')}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">{language === 'en' ? 'Total Drivers' : 'మొత్తం డ్రైవర్లు'}</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{totalDrivers}</div>
            <p className="text-xs text-muted-foreground">
              {language === 'en' ? 'Registered drivers' : 'నమోదు చేసిన డ్రైవర్లు'}
            </p>
            <Progress value={90} className="mt-2" />
          </CardContent>
        </Card>

        <Card className="card-3d hover:shadow-xl transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">{language === 'en' ? 'Active Trips' : 'క్రియాశీల ట్రిప్‌లు'}</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{activeTrips}</div>
            <p className="text-xs text-muted-foreground">
              {language === 'en' ? 'In progress' : 'పురోగతిలో'} / {completedTrips} {language === 'en' ? 'completed' : 'పూర్తయింది'}
            </p>
            <Progress value={(completedTrips / busTrips.length) * 100} className="mt-2" />
          </CardContent>
        </Card>

        <Card className="card-3d hover:shadow-xl transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">{language === 'en' ? 'Total Distance' : 'మొత్తం దూరం'}</CardTitle>
            <Gauge className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{totalKm} km</div>
            <p className="text-xs text-muted-foreground">
              {language === 'en' ? 'Today' : 'ఈరోజు'} • {avgKmPerTrip} km {language === 'en' ? 'avg' : 'సగటు'}
            </p>
            <Progress value={65} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      {/* Maintenance Alerts */}
      {maintenanceAlerts.length > 0 && (
        <Card className="card-3d border-orange-200 bg-gradient-to-br from-orange-50 to-amber-50">
          <CardHeader>
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-orange-600" />
              <CardTitle className="text-orange-900">
                {language === 'en' ? 'Maintenance Alerts' : 'నిర్వహణ హెచ్చరికలు'}
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3">
              {maintenanceAlerts.map((alert, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 bg-white rounded-xl border border-orange-200">
                  <div className="flex items-center gap-4">
                    <Badge variant={alert.priority === 'high' ? 'destructive' : 'default'}>
                      {alert.priority === 'high' ? (language === 'en' ? 'High' : 'అత్యవసరం') : (language === 'en' ? 'Medium' : 'మధ్యస్థ')}
                    </Badge>
                    <div>
                      <p className="font-medium">{alert.busNumber}</p>
                      <p className="text-sm text-muted-foreground">{alert.issue}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{language === 'en' ? 'Due:' : 'గడువు:'} {new Date(alert.dueDate).toLocaleDateString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Today's Trips */}
      <Card className="card-3d">
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle>{language === 'en' ? 'Today\'s Trips' : 'నేటి ట్రిప్‌లు'}</CardTitle>
          <Button variant="outline" onClick={() => onNavigate('fleet')}>
            {language === 'en' ? 'View All' : 'అన్నీ చూడండి'}
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t('fleet.busNumber')}</TableHead>
                <TableHead>{t('fleet.driver')}</TableHead>
                <TableHead>{t('fleet.route')}</TableHead>
                <TableHead>{t('fleet.tripType')}</TableHead>
                <TableHead>{language === 'en' ? 'Distance' : 'దూరం'}</TableHead>
                <TableHead>{t('common.status')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {busTrips.slice(0, 5).map(trip => (
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
                  <TableCell className="font-medium">{trip.endKm - trip.startKm} km</TableCell>
                  <TableCell>
                    <Badge variant={trip.status === 'completed' ? 'default' : trip.status === 'in-progress' ? 'secondary' : 'outline'}>
                      {trip.status === 'completed' 
                        ? (language === 'en' ? 'Completed' : 'పూర్తయింది')
                        : trip.status === 'in-progress'
                        ? (language === 'en' ? 'In Progress' : 'పురోగతిలో')
                        : trip.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Quick Actions and Bus Routes */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="card-3d">
          <CardHeader>
            <CardTitle>{t('dashboard.quickActions')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button className="w-full justify-start gap-2" variant="outline" onClick={() => onNavigate('fleet')}>
              <Bus className="h-4 w-4" />
              {language === 'en' ? 'Manage Buses' : 'బస్సులను నిర్వహించండి'}
            </Button>
            <Button className="w-full justify-start gap-2" variant="outline" onClick={() => onNavigate('fleet')}>
              <Users className="h-4 w-4" />
              {language === 'en' ? 'Manage Drivers' : 'డ్రైవర్లను నిర్వహించండి'}
            </Button>
            <Button className="w-full justify-start gap-2" variant="outline" onClick={() => onNavigate('fleet')}>
              <MapPin className="h-4 w-4" />
              {language === 'en' ? 'Manage Routes' : 'మార్గాలను నిర్వహించండి'}
            </Button>
            <Button className="w-full justify-start gap-2" variant="outline">
              <TrendingUp className="h-4 w-4" />
              {language === 'en' ? 'Export Reports' : 'నివేదికలను ఎగుమతి చేయండి'}
            </Button>
          </CardContent>
        </Card>

        <Card className="card-3d">
          <CardHeader>
            <CardTitle>{language === 'en' ? 'Active Routes' : 'క్రియాశీల మార్గాలు'}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-medium">Route 1 - Banjara Hills</p>
                  <Badge variant="default">{language === 'en' ? 'Active' : 'క్రియాశీలం'}</Badge>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>3 {language === 'en' ? 'stops' : 'స్టాప్‌లు'}</span>
                  <span>•</span>
                  <span>45 km</span>
                  <span>•</span>
                  <span>TS09 AB 1234</span>
                </div>
              </div>
              
              <div className="p-4 bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl border border-emerald-200">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-medium">Route 2 - Hitech City</p>
                  <Badge variant="default">{language === 'en' ? 'Active' : 'క్రియాశీలం'}</Badge>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>3 {language === 'en' ? 'stops' : 'స్టాప్‌లు'}</span>
                  <span>•</span>
                  <span>35 km</span>
                  <span>•</span>
                  <span>TS09 CD 5678</span>
                </div>
              </div>
              
              <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-200">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-medium">Route 3 - Miyapur</p>
                  <Badge variant="default">{language === 'en' ? 'Active' : 'క్రియాశీలం'}</Badge>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>3 {language === 'en' ? 'stops' : 'స్టాప్‌లు'}</span>
                  <span>•</span>
                  <span>40 km</span>
                  <span>•</span>
                  <span>TS09 EF 9012</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
