import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useAuth } from "../contexts/AuthContext";
import { useLanguage } from "../contexts/LanguageContext";
import { useSchools } from "../contexts/SchoolContext";
import { School as SchoolIcon, ArrowLeft, Building2 } from "lucide-react";
import { School } from "../types";
import { motion, AnimatePresence } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import tokiLogo from "figma:asset/542a27157e7f37147ee1c5ffd15096589b5daa9c.png";

export const Login = () => {
  const [selectedSchool, setSelectedSchool] = useState<School | null>(null);
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();
  const { t, language, toggleLanguage } = useLanguage();
  const { schools } = useSchools();

  const handleSchoolSelect = (schoolId: string) => {
    const school = schools.find((s) => s.id === schoolId);
    if (school) {
      setSelectedSchool(school);
      setError("");
      setPhone("");
      setOtp("");
      setOtpSent(false);
    }
  };

  const handleBackToSchoolSelection = () => {
    setSelectedSchool(null);
    setPhone("");
    setOtp("");
    setOtpSent(false);
    setError("");
  };

  const handleSendOtp = () => {
    if (phone.length >= 10) {
      setOtpSent(true);
      setError("");
    } else {
      setError("Please enter a valid phone number");
    }
  };

  const handleLogin = () => {
    const success = login(phone, otp, schools);
    if (!success) {
      setError("Invalid phone number or OTP");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
      <AnimatePresence mode="wait">
        {!selectedSchool ? (
          // Step 1: School Selection
          <motion.div
            key="school-selection"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="w-full max-w-lg">
              <CardHeader className="space-y-4 text-center">
                <div className="flex justify-center mb-4">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white p-4 rounded-2xl shadow-lg"
                  >
                    <img 
                      src={tokiLogo} 
                      alt="Toki Tech" 
                      className="h-20 w-auto"
                    />
                  </motion.div>
                </div>
                <CardTitle className="text-center">
                  {language === "en"
                    ? "Welcome to Toki Tech"
                    : "టోకీ టెక్‌కు స్వాగతం"}
                </CardTitle>
                <CardDescription className="text-center">
                  {language === "en"
                    ? "Select your school to get started"
                    : "ప్రారంభించడానికి మీ పాఠశాలను ఎంచుకోండి"}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <Label htmlFor="school-select">
                    {language === "en" ? "Choose School" : "పాఠశాల ఎంచుకోండి"}
                  </Label>
                  <Select onValueChange={handleSchoolSelect}>
                    <SelectTrigger id="school-select" className="h-12">
                      <SelectValue
                        placeholder={
                          language === "en"
                            ? "Select your school..."
                            : "మీ పా���శాలను ఎంచుకోండి..."
                        }
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {schools.map((school) => (
                        <SelectItem key={school.id} value={school.id}>
                          <div className="flex items-center gap-3 py-1">
                            <div className="flex-shrink-0">
                              {school.logo ? (
                                <ImageWithFallback
                                  src={school.logo}
                                  alt={school.name}
                                  className="w-8 h-8 rounded-full object-cover"
                                />
                              ) : (
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                                  <SchoolIcon className="h-4 w-4 text-white" />
                                </div>
                              )}
                            </div>
                            <div className="flex flex-col">
                              <span className="font-medium">
                                {language === "te" && school.nameInTelugu
                                  ? school.nameInTelugu
                                  : school.name}
                              </span>
                              <span className="text-xs text-muted-foreground">
                                {school.address}
                              </span>
                            </div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="pt-4 border-t">
                  <Button
                    onClick={toggleLanguage}
                    variant="ghost"
                    className="w-full"
                  >
                    {language === "en" ? "తెలుగు" : "English"}
                  </Button>
                </div>

                <div className="pt-2 text-xs text-center text-muted-foreground">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <img 
                      src={tokiLogo} 
                      alt="Toki Tech" 
                      className="h-6 w-auto"
                    />
                  </div>
                  <p>
                    {language === "en"
                      ? "School Management Platform"
                      : "పాఠశాల నిర్వహణ వేదిక"}
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          // Step 2: Login Form
          <motion.div
            key="login-form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="w-full max-w-5xl overflow-hidden">
              <div className="grid md:grid-cols-2">
                {/* Left Panel - School Branding */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4 }}
                  className="hidden md:flex flex-col justify-center items-center p-12 relative"
                  style={{
                    background: `linear-gradient(135deg, ${selectedSchool.primaryColor}15 0%, ${selectedSchool.primaryColor}05 100%)`,
                  }}
                >
                  <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%239C92AC\' fill-opacity=\'0.4\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}></div>
                  
                  <div className="relative z-10 text-center space-y-6">
                    {selectedSchool.logo ? (
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="w-32 h-32 mx-auto rounded-3xl overflow-hidden shadow-2xl ring-4 ring-white"
                      >
                        <ImageWithFallback
                          src={selectedSchool.logo}
                          alt={selectedSchool.name}
                          className="w-full h-full object-cover"
                        />
                      </motion.div>
                    ) : (
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="w-32 h-32 mx-auto p-8 rounded-3xl shadow-2xl"
                        style={{
                          backgroundColor: selectedSchool.primaryColor,
                        }}
                      >
                        <SchoolIcon className="w-full h-full text-white" />
                      </motion.div>
                    )}
                    
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="space-y-3"
                    >
                      <h2 className="text-3xl">
                        {language === "te" && selectedSchool.nameInTelugu
                          ? selectedSchool.nameInTelugu
                          : selectedSchool.name}
                      </h2>
                      <p className="text-muted-foreground text-lg">
                        {language === "en"
                          ? "School Management System"
                          : "పాఠశాల నిర్వహణ వ్యవస్థ"}
                      </p>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                      className="pt-8 space-y-4 text-sm text-muted-foreground"
                    >
                      <div className="flex items-center gap-3 justify-center">
                        <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: `${selectedSchool.primaryColor}20` }}>
                          <Building2 className="w-6 h-6" style={{ color: selectedSchool.primaryColor }} />
                        </div>
                        <div className="text-left">
                          <p className="font-medium text-foreground">
                            {language === "en" ? "Trusted by educators" : "విద్యావేత్తలచే విశ్వసనీయం"}
                          </p>
                          <p className="text-xs">
                            {language === "en" ? "Streamlined school operations" : "సరళీకృత పాఠశాల కార్యకలాపాలు"}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>

                {/* Right Panel - Login Form */}
                <div className="p-8 md:p-12">
                  <CardHeader className="space-y-4 px-0 pt-0">
                    {/* Mobile Logo - Only show on small screens */}
                    <div className="flex md:hidden justify-center mb-4">
                      {selectedSchool.logo ? (
                        <motion.div
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ duration: 0.3 }}
                          className="w-20 h-20 rounded-2xl overflow-hidden shadow-lg ring-4 ring-white"
                        >
                          <ImageWithFallback
                            src={selectedSchool.logo}
                            alt={selectedSchool.name}
                            className="w-full h-full object-cover"
                          />
                        </motion.div>
                      ) : (
                        <div
                          className="p-4 rounded-2xl shadow-lg"
                          style={{
                            backgroundColor: selectedSchool.primaryColor,
                          }}
                        >
                          <SchoolIcon className="h-12 w-12 text-white" />
                        </div>
                      )}
                    </div>
                    
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.1 }}
                    >
                      <CardTitle className="text-center md:text-left">
                        <span className="md:hidden">
                          {language === "te" && selectedSchool.nameInTelugu
                            ? selectedSchool.nameInTelugu
                            : selectedSchool.name}
                        </span>
                        <span className="hidden md:inline">
                          {language === "en" ? "Welcome Back" : "తిరిగి స్వాగతం"}
                        </span>
                      </CardTitle>
                      <CardDescription className="text-center md:text-left mt-2">
                        {language === "en"
                          ? "Login to access your account"
                          : "మీ ఖాతాను యాక్సెస్ చేయడానికి లాగిన్ చేయండి"}
                      </CardDescription>
                    </motion.div>
                  </CardHeader>
                  
                  <CardContent className="space-y-6 px-0 pb-0">
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="space-y-2"
                    >
                      <Label htmlFor="phone">{t("login.phoneNumber")}</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+91 XXXXX XXXXX"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        disabled={otpSent}
                        className="h-12"
                      />
                    </motion.div>

                    {!otpSent ? (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                      >
                        <Button onClick={handleSendOtp} className="w-full h-12">
                          {t("login.sendOtp")}
                        </Button>
                      </motion.div>
                    ) : (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-4"
                      >
                        <div className="space-y-2">
                          <Label htmlFor="otp">{t("login.otp")}</Label>
                          <Input
                            id="otp"
                            type="text"
                            placeholder="000000"
                            maxLength={6}
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            className="h-12 text-center tracking-widest"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <Button
                            onClick={() => setOtpSent(false)}
                            variant="outline"
                            className="h-12"
                          >
                            {t("common.cancel")}
                          </Button>
                          <Button onClick={handleLogin} className="h-12">
                            {t("login.verify")}
                          </Button>
                        </div>
                      </motion.div>
                    )}

                    {error && (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-sm text-red-600 text-center md:text-left"
                      >
                        {error}
                      </motion.p>
                    )}

                    <div className="pt-4 border-t space-y-3">
                      <Button
                        onClick={handleBackToSchoolSelection}
                        variant="ghost"
                        className="w-full h-11 flex items-center justify-center gap-2"
                      >
                        <ArrowLeft className="h-4 w-4" />
                        {language === "en"
                          ? "Change School"
                          : "పాఠశాల మార్చండి"}
                      </Button>
                      
                      <Button
                        onClick={toggleLanguage}
                        variant="ghost"
                        className="w-full h-11"
                      >
                        {language === "en" ? "తెలుగు" : "English"}
                      </Button>
                    </div>

                    <div className="pt-4 border-t text-xs text-center md:text-left text-muted-foreground space-y-2">
                      <p className="font-medium">
                        {language === "en"
                          ? "Test Credentials:"
                          : "పరీక్ష ప్రమాణాలు:"}
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-1 text-xs">
                        <p>Super Admin: +919999999999</p>
                        <p>Principal: +919876543210</p>
                        <p>Teacher: +919876543214</p>
                        <p>Class Teacher: +919876543212</p>
                        <p>Fleet Manager: +919876543217</p>
                      </div>
                      <p className="pt-2">
                        {language === "en"
                          ? "OTP: Any 6 digits"
                          : "OTP: ఏదైనా 6 అంకెలు"}
                      </p>
                    </div>

                    <div className="flex justify-center md:justify-start gap-2 items-center text-xs text-muted-foreground pt-4">
                      <span>{t("login.poweredBy")}</span>
                      <img 
                        src={tokiLogo} 
                        alt="Toki Tech" 
                        className="h-5 w-auto"
                      />
                    </div>
                  </CardContent>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
