import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Checkbox } from '../ui/checkbox';
import { useLanguage } from '../../contexts/LanguageContext';
import { ArrowLeft, Building2, MapPin, Phone, BookOpen, Settings, Save } from 'lucide-react';
import { Badge } from '../ui/badge';

interface SchoolOnboardingProps {
  onBack: () => void;
}

export function SchoolOnboarding({ onBack }: SchoolOnboardingProps) {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    // Identity
    udiseCode: '',
    schoolName: '',
    schoolType: 'Private',
    schoolCode: '',
    status: 'Active',
    
    // Location
    address: '',
    city: '',
    district: '',
    state: '',
    pincode: '',
    country: 'India',
    
    // Contact
    primaryContactName: '',
    primaryContactMobile: '',
    secondaryContactName: '',
    secondaryContactMobile: '',
    email: '',
    
    // Academic Baseline
    board: '',
    academicYear: '2024-2025',
    academicYearStartMonth: 'June',
    academicYearEndMonth: 'April',
    primaryMedium: 'English',
    
    // Communication Preferences
    defaultLanguage: 'English',
    whatsappEnabled: true,
    smsEnabled: true,
    callEnabled: true,
    
    // Modules
    transportEnabled: false,
  });

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const generateSchoolCode = () => {
    const code = 'SCH' + Math.random().toString(36).substr(2, 6).toUpperCase();
    handleInputChange('schoolCode', code);
  };

  const handleSubmit = () => {
    console.log('School onboarding data:', formData);
    // In a real app, this would send data to backend
    alert('School onboarded successfully!');
    onBack();
  };

  React.useEffect(() => {
    generateSchoolCode();
  }, []);

  const indianStates = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
    'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
    'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
    'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
    'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl">School Onboarding</h1>
            <p className="text-sm text-muted-foreground">Add a new school to the system</p>
          </div>
        </div>
        <Badge variant="secondary">Super Admin Only</Badge>
      </div>

      {/* Identity Section */}
      <Card className="border-2 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50">
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5 text-blue-600" />
            Identity Information
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>UDISE+ Code (Optional)</Label>
              <Input
                placeholder="Enter UDISE+ code"
                value={formData.udiseCode}
                onChange={(e) => handleInputChange('udiseCode', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>School Name *</Label>
              <Input
                placeholder="Enter school name"
                value={formData.schoolName}
                onChange={(e) => handleInputChange('schoolName', e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label>School Type *</Label>
              <Select value={formData.schoolType} onValueChange={(val) => handleInputChange('schoolType', val)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Private">Private</SelectItem>
                  <SelectItem value="Government">Government</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>School Code *</Label>
              <div className="flex gap-2">
                <Input
                  value={formData.schoolCode}
                  readOnly
                  className="bg-gray-50"
                />
                <Button variant="outline" onClick={generateSchoolCode}>
                  Regenerate
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Status *</Label>
              <Select value={formData.status} onValueChange={(val) => handleInputChange('status', val)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Location Section */}
      <Card className="border-2 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-green-50 to-teal-50">
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-green-600" />
            Location Information
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <Label>Address *</Label>
              <Input
                placeholder="Enter full address"
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>City/Town/Village *</Label>
                <Input
                  placeholder="Enter city"
                  value={formData.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>District *</Label>
                <Input
                  placeholder="Enter district"
                  value={formData.district}
                  onChange={(e) => handleInputChange('district', e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Pincode *</Label>
                <Input
                  placeholder="Enter pincode"
                  value={formData.pincode}
                  onChange={(e) => handleInputChange('pincode', e.target.value)}
                  maxLength={6}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>State *</Label>
                <Select value={formData.state} onValueChange={(val) => handleInputChange('state', val)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select state" />
                  </SelectTrigger>
                  <SelectContent>
                    {indianStates.map(state => (
                      <SelectItem key={state} value={state}>{state}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Country *</Label>
                <Input
                  value={formData.country}
                  readOnly
                  className="bg-gray-50"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contact Section */}
      <Card className="border-2 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-orange-50 to-red-50">
          <CardTitle className="flex items-center gap-2">
            <Phone className="h-5 w-5 text-orange-600" />
            Contact Information
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Primary Contact Name (Principal) *</Label>
              <Input
                placeholder="Enter principal name"
                value={formData.primaryContactName}
                onChange={(e) => handleInputChange('primaryContactName', e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Primary Contact Mobile *</Label>
              <Input
                placeholder="+91 XXXXXXXXXX"
                value={formData.primaryContactMobile}
                onChange={(e) => handleInputChange('primaryContactMobile', e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Secondary Contact Name (Admin)</Label>
              <Input
                placeholder="Enter admin name"
                value={formData.secondaryContactName}
                onChange={(e) => handleInputChange('secondaryContactName', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Secondary Contact Mobile</Label>
              <Input
                placeholder="+91 XXXXXXXXXX"
                value={formData.secondaryContactMobile}
                onChange={(e) => handleInputChange('secondaryContactMobile', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Email *</Label>
              <Input
                type="email"
                placeholder="school@example.com"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                required
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Academic Baseline Section */}
      <Card className="border-2 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50">
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-purple-600" />
            Academic Baseline
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Board *</Label>
              <Select value={formData.board} onValueChange={(val) => handleInputChange('board', val)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select board" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="State">State Board</SelectItem>
                  <SelectItem value="CBSE">CBSE</SelectItem>
                  <SelectItem value="ICSE">ICSE</SelectItem>
                  <SelectItem value="IB">IB</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Academic Year *</Label>
              <Input
                placeholder="2024-2025"
                value={formData.academicYear}
                onChange={(e) => handleInputChange('academicYear', e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Academic Year Start Month *</Label>
              <Select value={formData.academicYearStartMonth} onValueChange={(val) => handleInputChange('academicYearStartMonth', val)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map(month => (
                    <SelectItem key={month} value={month}>{month}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Academic Year End Month *</Label>
              <Select value={formData.academicYearEndMonth} onValueChange={(val) => handleInputChange('academicYearEndMonth', val)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map(month => (
                    <SelectItem key={month} value={month}>{month}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Primary Medium *</Label>
              <Select value={formData.primaryMedium} onValueChange={(val) => handleInputChange('primaryMedium', val)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Telugu">Telugu</SelectItem>
                  <SelectItem value="Tamil">Tamil</SelectItem>
                  <SelectItem value="English">English</SelectItem>
                  <SelectItem value="Hindi">Hindi</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Communication & Modules Section */}
      <Card className="border-2 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-cyan-50 to-blue-50">
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5 text-cyan-600" />
            Communication Preferences & Modules
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Default Language for Messages *</Label>
              <Select value={formData.defaultLanguage} onValueChange={(val) => handleInputChange('defaultLanguage', val)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="English">English</SelectItem>
                  <SelectItem value="Telugu">Telugu</SelectItem>
                  <SelectItem value="Tamil">Tamil</SelectItem>
                  <SelectItem value="Hindi">Hindi</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label>Communication Channels</Label>
              <div className="flex flex-col gap-3">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="whatsapp"
                    checked={formData.whatsappEnabled}
                    onCheckedChange={(checked) => handleInputChange('whatsappEnabled', checked)}
                  />
                  <label htmlFor="whatsapp" className="text-sm cursor-pointer">
                    Enable WhatsApp notifications
                  </label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="sms"
                    checked={formData.smsEnabled}
                    onCheckedChange={(checked) => handleInputChange('smsEnabled', checked)}
                  />
                  <label htmlFor="sms" className="text-sm cursor-pointer">
                    Enable SMS notifications
                  </label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="call"
                    checked={formData.callEnabled}
                    onCheckedChange={(checked) => handleInputChange('callEnabled', checked)}
                  />
                  <label htmlFor="call" className="text-sm cursor-pointer">
                    Enable Call notifications
                  </label>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t">
              <Label>Modules & Permissions</Label>
              <div className="flex items-center space-x-2 mt-3">
                <Checkbox
                  id="transport"
                  checked={formData.transportEnabled}
                  onCheckedChange={(checked) => handleInputChange('transportEnabled', checked)}
                />
                <label htmlFor="transport" className="text-sm cursor-pointer">
                  Enable Transport/Fleet Management Module
                </label>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex justify-end gap-3 pb-6">
        <Button variant="outline" onClick={onBack}>
          Cancel
        </Button>
        <Button onClick={handleSubmit} className="gap-2">
          <Save className="h-4 w-4" />
          Save School
        </Button>
      </div>
    </div>
  );
}
