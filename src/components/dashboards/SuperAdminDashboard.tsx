import React, { useState, useRef } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { useLanguage } from "../../contexts/LanguageContext";
import { useSchools } from "../../contexts/SchoolContext";
import {
  Building2,
  Users,
  TrendingUp,
  CheckCircle,
  Search,
  Edit,
  Upload,
  School as SchoolIcon,
  Phone,
  MapPin,
  Calendar,
  ArrowLeft,
  Eye,
  Plus,
} from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { toast } from "sonner@2.0.3";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface SuperAdminDashboardProps {
  onNavigate: (view: string) => void;
}

interface School {
  id: string;
  name: string;
  nameInTelugu?: string;
  principalName: string;
  address: string;
  activeUsers: number;
}

type TimePeriod =
  | "7days"
  | "30days"
  | "3months"
  | "6months"
  | "1year"
  | "all";
type ViewMode = "list" | "add" | "details" | "edit";

export const SuperAdminDashboard = ({
  onNavigate,
}: SuperAdminDashboardProps) => {
  const { t, language } = useLanguage();
  const { schools, addSchool, updateSchool } = useSchools();
  const [viewMode, setViewMode] = useState<ViewMode>("list");
  const [selectedSchool, setSelectedSchool] =
    useState<School | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [adminPhone, setAdminPhone] = useState(
    "+91 98765 43210",
  );
  const [schoolGrowthPeriod, setSchoolGrowthPeriod] =
    useState<TimePeriod>("6months");
  const [userGrowthPeriod, setUserGrowthPeriod] =
    useState<TimePeriod>("6months");
  const analyticsRef = useRef<HTMLDivElement>(null);

  const [newSchool, setNewSchool] = useState({
    name: "",
    nameInTelugu: "",
    principalName: "",
    principalPhone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    logo: "",
    primaryColor: "#1e40af",
  });

  const [editSchool, setEditSchool] = useState({
    name: "",
    nameInTelugu: "",
    principalName: "",
    principalPhone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    logo: "",
    primaryColor: "#1e40af",
  });

  const totalSchools = schools.length;
  const totalActiveUsers = schools.reduce(
    (sum, school) => sum + school.activeUsers,
    0,
  );
  const activeSchools = schools.filter(
    (s) => s.activeUsers > 0,
  ).length;

  // Mock analytics data - comprehensive historical data
  const allSchoolGrowthData = [
    {
      month: "Jan 2024",
      date: "2024-01",
      schools: 1,
      daysAgo: 300,
    },
    {
      month: "Feb 2024",
      date: "2024-02",
      schools: 1,
      daysAgo: 270,
    },
    {
      month: "Mar 2024",
      date: "2024-03",
      schools: 2,
      daysAgo: 240,
    },
    {
      month: "Apr 2024",
      date: "2024-04",
      schools: 2,
      daysAgo: 210,
    },
    {
      month: "May 2024",
      date: "2024-05",
      schools: 3,
      daysAgo: 180,
    },
    {
      month: "Jun 2024",
      date: "2024-06",
      schools: 3,
      daysAgo: 150,
    },
    {
      month: "Jul 2024",
      date: "2024-07",
      schools: 4,
      daysAgo: 120,
    },
    {
      month: "Aug 2024",
      date: "2024-08",
      schools: 5,
      daysAgo: 90,
    },
    {
      month: "Sep 2024",
      date: "2024-09",
      schools: 6,
      daysAgo: 60,
    },
    {
      month: "Oct 2024",
      date: "2024-10",
      schools: 7,
      daysAgo: 30,
    },
    {
      month: "Nov 2024",
      date: "2024-11",
      schools: 8,
      daysAgo: 15,
    },
    {
      month: "Dec 2024",
      date: "2024-12",
      schools: 10,
      daysAgo: 0,
    },
  ];

  const allUserGrowthData = [
    {
      month: "Jan 2024",
      date: "2024-01",
      users: 450,
      daysAgo: 300,
    },
    {
      month: "Feb 2024",
      date: "2024-02",
      users: 650,
      daysAgo: 270,
    },
    {
      month: "Mar 2024",
      date: "2024-03",
      users: 1200,
      daysAgo: 240,
    },
    {
      month: "Apr 2024",
      date: "2024-04",
      users: 1450,
      daysAgo: 210,
    },
    {
      month: "May 2024",
      date: "2024-05",
      users: 2100,
      daysAgo: 180,
    },
    {
      month: "Jun 2024",
      date: "2024-06",
      users: 2650,
      daysAgo: 150,
    },
    {
      month: "Jul 2024",
      date: "2024-07",
      users: 3200,
      daysAgo: 120,
    },
    {
      month: "Aug 2024",
      date: "2024-08",
      users: 3800,
      daysAgo: 90,
    },
    {
      month: "Sep 2024",
      date: "2024-09",
      users: 4500,
      daysAgo: 60,
    },
    {
      month: "Oct 2024",
      date: "2024-10",
      users: 5200,
      daysAgo: 30,
    },
    {
      month: "Nov 2024",
      date: "2024-11",
      users: 6000,
      daysAgo: 15,
    },
    {
      month: "Dec 2024",
      date: "2024-12",
      users: 6800,
      daysAgo: 0,
    },
  ];

  const filterDataByPeriod = (
    data: any[],
    period: TimePeriod,
  ) => {
    const now = new Date();
    const cutoffDays: Record<TimePeriod, number> = {
      "7days": 7,
      "30days": 30,
      "3months": 90,
      "6months": 180,
      "1year": 365,
      all: Infinity,
    };

    const days = cutoffDays[period];
    if (days === Infinity) return data;

    return data.filter((item) => item.daysAgo <= days);
  };

  const schoolGrowth = filterDataByPeriod(
    allSchoolGrowthData,
    schoolGrowthPeriod,
  );
  const userGrowth = filterDataByPeriod(
    allUserGrowthData,
    userGrowthPeriod,
  );

  const handleLogoUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    isEdit: boolean = false,
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        if (isEdit) {
          setEditSchool({ ...editSchool, logo: base64String });
        } else {
          setNewSchool({ ...newSchool, logo: base64String });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddSchool = () => {
    if (
      !newSchool.name ||
      !newSchool.principalName ||
      !newSchool.address ||
      !newSchool.city ||
      !newSchool.state ||
      !newSchool.pincode
    ) {
      toast.error(
        language === "en"
          ? "Please fill in all required fields"
          : "దయచేసి అన్ని అవసరమైన ఫీల్డ్‌లను పూరించండి",
      );
      return;
    }

    const school: School = {
      id: `school${Date.now()}`,
      name: newSchool.name,
      nameInTelugu: newSchool.nameInTelugu,
      principalId: `principal${Date.now()}`,
      principalName: newSchool.principalName,
      principalPhone: newSchool.principalPhone,
      address: `${newSchool.address}, ${newSchool.city}, ${newSchool.state} - ${newSchool.pincode}`,
      primaryColor: newSchool.primaryColor || "#1e40af",
      activeUsers: 0,
      logo: newSchool.logo || undefined,
    };

    addSchool(school);
    setViewMode("list");
    setNewSchool({
      name: "",
      nameInTelugu: "",
      principalName: "",
      principalPhone: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
      logo: "",
      primaryColor: "#1e40af",
    });

    toast.success(
      language === "en"
        ? "School added successfully!"
        : "పాఠశాల విజయవంతంగా జోడించబడింది!",
    );
  };

  const handleViewDetails = (school: School) => {
    setSelectedSchool(school);
    setViewMode("details");
  };

  const handleEditSchool = () => {
    if (!selectedSchool) return;

    setEditSchool({
      name: selectedSchool.name,
      nameInTelugu: selectedSchool.nameInTelugu || "",
      principalName: selectedSchool.principalName,
      principalPhone: selectedSchool.principalPhone || "",
      address: selectedSchool.address,
      city: "",
      state: "",
      pincode: "",
      logo: selectedSchool.logo || "",
      primaryColor: selectedSchool.primaryColor || "#1e40af",
    });
    setViewMode("edit");
  };

  const handleUpdateSchool = () => {
    if (!selectedSchool) return;

    const updatedSchool: School = {
      ...selectedSchool,
      name: editSchool.name,
      nameInTelugu: editSchool.nameInTelugu,
      principalName: editSchool.principalName,
      principalPhone: editSchool.principalPhone,
      primaryColor: editSchool.primaryColor,
      logo: editSchool.logo || undefined,
    };

    updateSchool(updatedSchool);
    setSelectedSchool(updatedSchool);
    setViewMode("details");
    toast.success(
      language === "en"
        ? "School updated successfully!"
        : "పాఠశాల విజయవంతంగా నవీకరించబడింది!",
    );
  };

  const filteredSchools = schools.filter(
    (school) =>
      school.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      school.principalName
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      (school.nameInTelugu &&
        school.nameInTelugu.includes(searchQuery)),
  );

  const scrollToAnalytics = () => {
    analyticsRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const getPeriodLabel = (period: TimePeriod) => {
    const labels: Record<
      TimePeriod,
      { en: string; te: string }
    > = {
      "7days": { en: "Last 7 days", te: "గత 7 రోజులు" },
      "30days": { en: "Last 30 days", te: "గత 30 రోజులు" },
      "3months": { en: "Last 3 months", te: "గత 3 నెలలు" },
      "6months": { en: "Last 6 months", te: "గత 6 నెలలు" },
      "1year": { en: "Last 1 year", te: "గత 1 సంవత్సరం" },
      all: { en: "All time", te: "అన్ని సమయాలు" },
    };
    return language === "en"
      ? labels[period].en
      : labels[period].te;
  };

  // ADD SCHOOL VIEW
  if (viewMode === "add") {
    return (
      <div className="space-y-6 pb-8">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            onClick={() => setViewMode("list")}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {language === "en"
              ? "Back to Schools"
              : "పాఠశాలలకు తిరిగి"}
          </Button>
        </div>

        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 rounded-2xl p-8 text-white shadow-xl">
          <h1 className="text-4xl font-bold mb-2">
            {language === "en"
              ? "Add New School"
              : "కొత్త పాఠశాల జోడించండి"}
          </h1>
          <p className="text-lg text-white/90">
            {language === "en"
              ? "Onboard a new school to the platform"
              : "ప్లాట్‌ఫారమ్‌కు కొత్త పాఠశాలను ఆన్‌బోర్డ్ చేయండి"}
          </p>
        </div>

        <Card className="card-3d">
          <CardContent className="pt-6">
            <div className="grid gap-6">
              {/* School Logo Upload */}
              <div className="flex flex-col items-center gap-4 p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl">
                {newSchool.logo ? (
                  <ImageWithFallback
                    src={newSchool.logo}
                    alt="School Logo"
                    className="w-32 h-32 object-contain rounded-lg"
                  />
                ) : (
                  <div className="w-32 h-32 bg-gray-200 rounded-lg flex items-center justify-center">
                    <SchoolIcon className="w-16 h-16 text-gray-400" />
                  </div>
                )}
                <div>
                  <Label
                    htmlFor="logo-upload"
                    className="cursor-pointer"
                  >
                    <Button
                      type="button"
                      variant="outline"
                      asChild
                    >
                      <span>
                        <Upload className="h-4 w-4 mr-2" />
                        {language === "en"
                          ? "Upload Logo"
                          : "లోగోను అప్‌లోడ్ చేయండి"}
                      </span>
                    </Button>
                  </Label>
                  <Input
                    id="logo-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleLogoUpload(e, false)}
                  />
                </div>
              </div>

              {/* School Information */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>
                    {language === "en"
                      ? "School Name (English)"
                      : "పాఠశాల పేరు (ఇంగ్లీష్)"}{" "}
                    *
                  </Label>
                  <Input
                    value={newSchool.name}
                    onChange={(e) =>
                      setNewSchool({
                        ...newSchool,
                        name: e.target.value,
                      })
                    }
                    placeholder="e.g., Delhi Public School"
                  />
                </div>
                <div className="space-y-2">
                  <Label>
                    {language === "en"
                      ? "School Name (Telugu)"
                      : "పాఠశాల పేరు (తెలుగు)"}
                  </Label>
                  <Input
                    value={newSchool.nameInTelugu}
                    onChange={(e) =>
                      setNewSchool({
                        ...newSchool,
                        nameInTelugu: e.target.value,
                      })
                    }
                    placeholder="e.g., ఢిల్లీ పబ్లిక్ స్కూల్"
                  />
                </div>
              </div>

              {/* Principal Information */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>
                    {language === "en"
                      ? "Principal Name"
                      : "ప్రిన్సిపాల్ పేరు"}{" "}
                    *
                  </Label>
                  <Input
                    value={newSchool.principalName}
                    onChange={(e) =>
                      setNewSchool({
                        ...newSchool,
                        principalName: e.target.value,
                      })
                    }
                    placeholder="e.g., Dr. Ramesh Kumar"
                  />
                </div>
                <div className="space-y-2">
                  <Label>
                    {language === "en"
                      ? "Principal Phone"
                      : "ప్రిన్సిపాల్ ఫోన్"}
                  </Label>
                  <Input
                    value={newSchool.principalPhone}
                    onChange={(e) =>
                      setNewSchool({
                        ...newSchool,
                        principalPhone: e.target.value,
                      })
                    }
                    placeholder="+91 98765 43210"
                  />
                </div>
              </div>

              {/* Address */}
              <div className="space-y-2">
                <Label>
                  {language === "en"
                    ? "Street Address"
                    : "వీధి చిరునామా"}{" "}
                  *
                </Label>
                <Textarea
                  value={newSchool.address}
                  onChange={(e) =>
                    setNewSchool({
                      ...newSchool,
                      address: e.target.value,
                    })
                  }
                  placeholder="e.g., 123, Main Road, Sector 5"
                  rows={2}
                />
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>
                    {language === "en" ? "City" : "నగరం"} *
                  </Label>
                  <Input
                    value={newSchool.city}
                    onChange={(e) =>
                      setNewSchool({
                        ...newSchool,
                        city: e.target.value,
                      })
                    }
                    placeholder="e.g., Hyderabad"
                  />
                </div>
                <div className="space-y-2">
                  <Label>
                    {language === "en" ? "State" : "రాష్ట్రం"} *
                  </Label>
                  <Input
                    value={newSchool.state}
                    onChange={(e) =>
                      setNewSchool({
                        ...newSchool,
                        state: e.target.value,
                      })
                    }
                    placeholder="e.g., Telangana"
                  />
                </div>
                <div className="space-y-2">
                  <Label>
                    {language === "en"
                      ? "Pincode"
                      : "పిన్‌కోడ్"}{" "}
                    *
                  </Label>
                  <Input
                    value={newSchool.pincode}
                    onChange={(e) =>
                      setNewSchool({
                        ...newSchool,
                        pincode: e.target.value,
                      })
                    }
                    placeholder="e.g., 500001"
                  />
                </div>
              </div>

              {/* Primary Color */}
              <div className="space-y-2">
                <Label>
                  {language === "en"
                    ? "Primary Brand Color"
                    : "ప్రాథమిక బ్రాండ్ రంగు"}
                </Label>
                <div className="flex gap-4 items-center">
                  <Input
                    type="color"
                    value={newSchool.primaryColor}
                    onChange={(e) =>
                      setNewSchool({
                        ...newSchool,
                        primaryColor: e.target.value,
                      })
                    }
                    className="w-20 h-12"
                  />
                  <span className="text-sm text-muted-foreground">
                    {newSchool.primaryColor}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-4">
                <Button
                  onClick={handleAddSchool}
                  className="flex-1"
                  size="lg"
                >
                  {language === "en"
                    ? "Add School"
                    : "పాఠశాల జోడించండి"}
                </Button>
                <Button
                  onClick={() => setViewMode("list")}
                  variant="outline"
                  className="flex-1"
                  size="lg"
                >
                  {language === "en"
                    ? "Cancel"
                    : "రద్దు చేయండి"}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // SCHOOL DETAILS VIEW
  if (viewMode === "details" && selectedSchool) {
    return (
      <div className="space-y-6 pb-8">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            onClick={() => setViewMode("list")}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {language === "en"
              ? "Back to Schools"
              : "పాఠశాలలకు తిరిగి"}
          </Button>
        </div>

        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 rounded-2xl p-8 text-white shadow-xl">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              {selectedSchool.logo && (
                <ImageWithFallback
                  src={selectedSchool.logo}
                  alt={selectedSchool.name}
                  className="w-20 h-20 object-contain bg-white rounded-lg p-2"
                />
              )}
              <div>
                <h1 className="text-4xl font-bold mb-2">
                  {language === "en"
                    ? selectedSchool.name
                    : selectedSchool.nameInTelugu ||
                      selectedSchool.name}
                </h1>
                <p className="text-lg text-white/90">
                  {language === "en"
                    ? "School Details"
                    : "పాఠశాల వివరాలు"}
                </p>
              </div>
            </div>
            <Button
              onClick={handleEditSchool}
              variant="secondary"
            >
              <Edit className="w-4 h-4 mr-2" />
              {language === "en" ? "Edit" : "సవరించు"}
            </Button>
          </div>
        </div>

        {/* School Information Cards */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Basic Information */}
          <Card className="card-3d">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <SchoolIcon className="w-5 h-5 text-primary" />
                {language === "en"
                  ? "Basic Information"
                  : "ప్రాథమిక సమాచారం"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl">
                <p className="text-sm text-muted-foreground mb-1">
                  {language === "en"
                    ? "School Name"
                    : "పాఠశాల పేరు"}
                </p>
                <p className="font-medium text-lg">
                  {selectedSchool.name}
                </p>
                {selectedSchool.nameInTelugu && (
                  <p className="text-sm text-muted-foreground mt-1">
                    {selectedSchool.nameInTelugu}
                  </p>
                )}
              </div>
              <div className="p-4 bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl">
                <p className="text-sm text-muted-foreground mb-1">
                  <MapPin className="w-4 h-4 inline mr-1" />
                  {language === "en" ? "Address" : "చిరునామా"}
                </p>
                <p className="font-medium">
                  {selectedSchool.address}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Principal Information */}
          <Card className="card-3d">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                {language === "en"
                  ? "Principal Information"
                  : "ప్రిన్సిపాల్ సమాచారం"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl">
                <p className="text-sm text-muted-foreground mb-1">
                  {language === "en"
                    ? "Principal Name"
                    : "ప్రిన్సిపాల్ పేరు"}
                </p>
                <p className="font-medium text-lg">
                  {selectedSchool.principalName}
                </p>
              </div>
              {selectedSchool.principalPhone && (
                <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl">
                  <p className="text-sm text-muted-foreground mb-1">
                    <Phone className="w-4 h-4 inline mr-1" />
                    {language === "en" ? "Phone" : "ఫోన్"}
                  </p>
                  <p className="font-medium text-lg">
                    {selectedSchool.principalPhone}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Platform Statistics */}
        <Card className="card-3d">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              {language === "en"
                ? "Platform Statistics"
                : "ప్లాట్‌ఫారమ్ గణాంకాలు"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl text-center">
                <p className="text-sm text-muted-foreground mb-2">
                  {language === "en"
                    ? "Active Users"
                    : "క్రియాశీల వినియోగదారులు"}
                </p>
                <p className="text-3xl font-bold text-blue-600">
                  {selectedSchool.activeUsers}
                </p>
              </div>
              <div className="p-6 bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl text-center">
                <p className="text-sm text-muted-foreground mb-2">
                  {language === "en" ? "Status" : "స్థితి"}
                </p>
                <Badge
                  variant={
                    selectedSchool.activeUsers > 0
                      ? "default"
                      : "secondary"
                  }
                  className="text-lg px-4 py-2"
                >
                  {selectedSchool.activeUsers > 0
                    ? language === "en"
                      ? "Active"
                      : "క్రియాశీల"
                    : language === "en"
                      ? "Inactive"
                      : "క్రియాశీల కాదు"}
                </Badge>
              </div>
              <div className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl text-center">
                <p className="text-sm text-muted-foreground mb-2">
                  {language === "en"
                    ? "Brand Color"
                    : "బ్రాండ్ రంగు"}
                </p>
                <div className="flex items-center justify-center gap-2 mt-2">
                  <div
                    className="w-12 h-12 rounded-lg border-2 border-gray-300"
                    style={{
                      backgroundColor:
                        selectedSchool.primaryColor,
                    }}
                  />
                  <span className="text-sm font-medium">
                    {selectedSchool.primaryColor}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // EDIT SCHOOL VIEW
  if (viewMode === "edit" && selectedSchool) {
    return (
      <div className="space-y-6 pb-8">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            onClick={() => setViewMode("details")}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {language === "en"
              ? "Back to Details"
              : "వివరాలకు తిరిగి"}
          </Button>
        </div>

        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 rounded-2xl p-8 text-white shadow-xl">
          <h1 className="text-4xl font-bold mb-2">
            {language === "en"
              ? "Edit School"
              : "పాఠశాలను సవరించు"}
          </h1>
          <p className="text-lg text-white/90">
            {language === "en"
              ? selectedSchool.name
              : selectedSchool.nameInTelugu ||
                selectedSchool.name}
          </p>
        </div>

        <Card className="card-3d">
          <CardContent className="pt-6">
            <div className="grid gap-6">
              {/* School Logo Upload */}
              <div className="flex flex-col items-center gap-4 p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl">
                {editSchool.logo ? (
                  <ImageWithFallback
                    src={editSchool.logo}
                    alt="School Logo"
                    className="w-32 h-32 object-contain rounded-lg"
                  />
                ) : (
                  <div className="w-32 h-32 bg-gray-200 rounded-lg flex items-center justify-center">
                    <SchoolIcon className="w-16 h-16 text-gray-400" />
                  </div>
                )}
                <div>
                  <Label
                    htmlFor="logo-upload-edit"
                    className="cursor-pointer"
                  >
                    <Button
                      type="button"
                      variant="outline"
                      asChild
                    >
                      <span>
                        <Upload className="h-4 w-4 mr-2" />
                        {language === "en"
                          ? "Upload Logo"
                          : "లోగోను అప్‌లోడ్ చేయండి"}
                      </span>
                    </Button>
                  </Label>
                  <Input
                    id="logo-upload-edit"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleLogoUpload(e, true)}
                  />
                </div>
              </div>

              {/* School Information */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>
                    {language === "en"
                      ? "School Name (English)"
                      : "పాఠశాల పేరు (ఇంగ్లీష్)"}
                  </Label>
                  <Input
                    value={editSchool.name}
                    onChange={(e) =>
                      setEditSchool({
                        ...editSchool,
                        name: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>
                    {language === "en"
                      ? "School Name (Telugu)"
                      : "పాఠశాల పేరు (తెలుగు)"}
                  </Label>
                  <Input
                    value={editSchool.nameInTelugu}
                    onChange={(e) =>
                      setEditSchool({
                        ...editSchool,
                        nameInTelugu: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              {/* Principal Information */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>
                    {language === "en"
                      ? "Principal Name"
                      : "ప్రిన్సిపాల్ పేరు"}
                  </Label>
                  <Input
                    value={editSchool.principalName}
                    onChange={(e) =>
                      setEditSchool({
                        ...editSchool,
                        principalName: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>
                    {language === "en"
                      ? "Principal Phone"
                      : "ప్రిన్సిపాల్ ఫోన్"}
                  </Label>
                  <Input
                    value={editSchool.principalPhone}
                    onChange={(e) =>
                      setEditSchool({
                        ...editSchool,
                        principalPhone: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              {/* Primary Color */}
              <div className="space-y-2">
                <Label>
                  {language === "en"
                    ? "Primary Brand Color"
                    : "ప్రాథమిక బ్రాండ్ రంగు"}
                </Label>
                <div className="flex gap-4 items-center">
                  <Input
                    type="color"
                    value={editSchool.primaryColor}
                    onChange={(e) =>
                      setEditSchool({
                        ...editSchool,
                        primaryColor: e.target.value,
                      })
                    }
                    className="w-20 h-12"
                  />
                  <span className="text-sm text-muted-foreground">
                    {editSchool.primaryColor}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-4">
                <Button
                  onClick={handleUpdateSchool}
                  className="flex-1"
                  size="lg"
                >
                  {language === "en"
                    ? "Save Changes"
                    : "మార్పులను సేవ్ చేయండి"}
                </Button>
                <Button
                  onClick={() => setViewMode("details")}
                  variant="outline"
                  className="flex-1"
                  size="lg"
                >
                  {language === "en"
                    ? "Cancel"
                    : "రద్దు చేయండి"}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // MAIN LIST VIEW
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl mb-2">
          {t("dashboard.welcome")},{" "}
          {language === "en" ? "Super Admin" : "సూపర్ అడ్మిన్"}
        </h1>
        <p className="text-muted-foreground">
          {language === "en"
            ? "Platform-wide overview and school management"
            : "ప్లాట్‌ఫారమ్-వైడ్ అవలోకనం మరియు పాఠశాల నిర్వహణ"}
        </p>
      </div>

      {/* Overview Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card
          className="card-3d hover:shadow-xl transition-shadow cursor-pointer"
          onClick={() => onNavigate("schools")}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">
              {language === "en"
                ? "Total Schools"
                : "మొత్తం పాఠశాలలు"}
            </CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{totalSchools}</div>
            <p className="text-xs text-muted-foreground">
              {language === "en"
                ? "Onboarded schools"
                : "ఆన్‌బోర్డ్ చేసిన పాఠశాలలు"}
            </p>
          </CardContent>
        </Card>

        <Card className="card-3d hover:shadow-xl transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">
              {language === "en"
                ? "Total Users"
                : "మొత్తం వినియోగదారులు"}
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{totalActiveUsers}</div>
            <p className="text-xs text-muted-foreground">
              {language === "en"
                ? "Across all schools"
                : "అన్ని పాఠశాలల్లో"}
            </p>
          </CardContent>
        </Card>

        <Card className="card-3d hover:shadow-xl transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">
              {language === "en"
                ? "Active Schools"
                : "క్రియాశీల పాఠశాలలు"}
            </CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{activeSchools}</div>
            <p className="text-xs text-muted-foreground">
              {language === "en" ? "Out of" : "మొత్తం"}{" "}
              {totalSchools}{" "}
              {language === "en" ? "schools" : "పాఠశాలలు"}
            </p>
          </CardContent>
        </Card>

        <Card className="card-3d hover:shadow-xl transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">
              {language === "en"
                ? "Platform Growth"
                : "ప్లాట్‌ఫారమ్ వృద్ధి"}
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">+45%</div>
            <p className="text-xs text-muted-foreground">
              {language === "en"
                ? "This quarter"
                : "ఈ త్రైమాసికం"}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div
        ref={analyticsRef}
        className="grid gap-4 md:grid-cols-2"
      >
        <Card className="card-3d">
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <CardTitle>
                {language === "en"
                  ? "School Onboarding Trend"
                  : "పాఠశాల ఆన్‌బోర్డింగ్ ధోరణి"}
              </CardTitle>
              <Select
                value={schoolGrowthPeriod}
                onValueChange={(value: TimePeriod) =>
                  setSchoolGrowthPeriod(value)
                }
              >
                <SelectTrigger className="w-[180px]">
                  <Calendar className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7days">
                    {getPeriodLabel("7days")}
                  </SelectItem>
                  <SelectItem value="30days">
                    {getPeriodLabel("30days")}
                  </SelectItem>
                  <SelectItem value="3months">
                    {getPeriodLabel("3months")}
                  </SelectItem>
                  <SelectItem value="6months">
                    {getPeriodLabel("6months")}
                  </SelectItem>
                  <SelectItem value="1year">
                    {getPeriodLabel("1year")}
                  </SelectItem>
                  <SelectItem value="all">
                    {getPeriodLabel("all")}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={schoolGrowth}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar
                  dataKey="schools"
                  fill="#4F46E5"
                  name={
                    language === "en" ? "Schools" : "పాఠశాలలు"
                  }
                  radius={[8, 8, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="card-3d">
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <CardTitle>
                {language === "en"
                  ? "User Growth Trend"
                  : "వినియోగదారు వృద్ధి ధోరణి"}
              </CardTitle>
              <Select
                value={userGrowthPeriod}
                onValueChange={(value: TimePeriod) =>
                  setUserGrowthPeriod(value)
                }
              >
                <SelectTrigger className="w-[180px]">
                  <Calendar className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7days">
                    {getPeriodLabel("7days")}
                  </SelectItem>
                  <SelectItem value="30days">
                    {getPeriodLabel("30days")}
                  </SelectItem>
                  <SelectItem value="3months">
                    {getPeriodLabel("3months")}
                  </SelectItem>
                  <SelectItem value="6months">
                    {getPeriodLabel("6months")}
                  </SelectItem>
                  <SelectItem value="1year">
                    {getPeriodLabel("1year")}
                  </SelectItem>
                  <SelectItem value="all">
                    {getPeriodLabel("all")}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={userGrowth}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="users"
                  stroke="#10B981"
                  strokeWidth={3}
                  name={
                    language === "en"
                      ? "Users"
                      : "వినియోగదారులు"
                  }
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Schools List */}
      <Card className="card-3d">
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle>
            {language === "en"
              ? "All Schools"
              : "అన్ని పాఠశాలలు"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Search Bar */}
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={
                  language === "en"
                    ? "Search schools..."
                    : "పాఠశాలలను వెతకండి..."
                }
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>

          {/* Table */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>
                  {language === "en"
                    ? "School Name"
                    : "పాఠశాల పేరు"}
                </TableHead>
                <TableHead>
                  {language === "en"
                    ? "Principal"
                    : "ప్రిన్సిపాల్"}
                </TableHead>
                <TableHead>
                  {language === "en" ? "Location" : "స్థానం"}
                </TableHead>
                <TableHead>
                  {language === "en"
                    ? "Active Users"
                    : "క్రియాశీల వినియోగదారులు"}
                </TableHead>
                <TableHead className="text-right">
                  {language === "en" ? "Actions" : "చర్యలు"}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSchools.map((school) => (
                <TableRow key={school.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      {school.logo && (
                        <ImageWithFallback
                          src={school.logo}
                          alt={school.name}
                          className="w-10 h-10 object-contain rounded"
                        />
                      )}
                      <div>
                        <p>
                          {language === "en"
                            ? school.name
                            : school.nameInTelugu ||
                              school.name}
                        </p>
                        {language === "en" &&
                          school.nameInTelugu && (
                            <p className="text-xs text-muted-foreground">
                              {school.nameInTelugu}
                            </p>
                          )}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{school.principalName}</TableCell>
                  <TableCell>{school.address}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        school.activeUsers > 0
                          ? "default"
                          : "secondary"
                      }
                    >
                      {school.activeUsers}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleViewDetails(school)}
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      {language === "en" ? "View" : "చూడండి"}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      
    </div>
  );
};