// src/app/register/page.jsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Upload, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";
import VerificationMethod from "@/components/VerificationMethod";

const skillCategories = [
  "Electrician", "Plumber", "Carpenter", "Painter",
  "Domestic Helper", "Caregiver", "Driver", "Gardener",
  "Cleaner", "Technician"
];

const languages = [
  "Hindi", "English", "Tamil", "Telugu", "Bengali",
  "Marathi", "Gujarati", "Kannada", "Malayalam", "Odia", "Punjabi", "Urdu"
];

export default function RegisterPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
    email: "",
    category: "",
    experience: "",
    languages: [],
    certification: "",
    federation: "",
    bio: "",
    isVerified: false
  });

  const handleSubmit = () => {
    toast.success("Registration submitted! Verification in progress.");
    setStep(4);
  };

  // Strict validation: All fields must be filled AND verified
  const isStep1Complete = 
    formData.name.trim().length >= 3 &&
    formData.address.trim().length >= 10 &&
    /^\d{10}$/.test(formData.phone) &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) &&
    formData.isVerified;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <Link href="/" className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6">
          <ArrowLeft className="w-5 h-5" /> Back to Home
        </Link>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Worker Registration</CardTitle>
            <p className="text-gray-500 text-sm">Register through your Labour Cooperative Federation</p>
          </CardHeader>
          <CardContent>
            {/* Progress Steps */}
            <div className="flex items-center justify-between mb-8">
              {["Personal Info", "Skills & Certification", "Federation", "Complete"].map((s, i) => (
                <div key={i} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    step > i + 1 ? "bg-green-500 text-white" : step === i + 1 ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-500"
                  }`}>
                    {step > i + 1 ? <CheckCircle2 className="w-5 h-5" /> : i + 1}
                  </div>
                  {i < 3 && <div className={`w-12 md:w-20 h-1 mx-1 ${step > i + 1 ? "bg-green-500" : "bg-gray-200"}`} />}
                </div>
              ))}
            </div>

            {/* STEP 1: Personal Info & Verification */}
            {step === 1 && (
              <div className="space-y-5">
                <h3 className="font-bold text-lg border-b pb-2">Personal Information</h3>
                
                <div>
                  <Label>Full Name *</Label>
                  <Input 
                    placeholder="Enter your full name" 
                    value={formData.name} 
                    onChange={(e) => setFormData({...formData, name: e.target.value, isVerified: false})} 
                  />
                </div>

                <div>
                  <Label>Full Address *</Label>
                  <Textarea 
                    placeholder="Enter your complete residential address" 
                    value={formData.address} 
                    onChange={(e) => setFormData({...formData, address: e.target.value, isVerified: false})} 
                    className="resize-none"
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Mobile Number *</Label>
                    <div className="flex">
                      <span className="flex items-center px-3 bg-gray-100 border border-r-0 rounded-l-md text-sm font-medium text-gray-600">+91</span>
                      <Input 
                        className="rounded-l-none"
                        placeholder="9876543210" 
                        value={formData.phone} 
                        onChange={(e) => {
                          const val = e.target.value.replace(/\D/g, "").slice(0, 10);
                          setFormData({...formData, phone: val, isVerified: false});
                        }} 
                        maxLength={10}
                      />
                    </div>
                  </div>
                  <div>
                    <Label>Email Address *</Label>
                    <Input 
                      type="email"
                      placeholder="your.email@example.com" 
                      value={formData.email} 
                      onChange={(e) => setFormData({...formData, email: e.target.value, isVerified: false})} 
                    />
                  </div>
                </div>

                {/* OTP Verification Component */}
                <VerificationMethod 
                  phone={formData.phone}
                  email={formData.email}
                  onVerified={(status) => setFormData({...formData, isVerified: status})} 
                />
                
                <Button 
                  className="w-full mt-4" 
                  size="lg"
                  onClick={() => setStep(2)}
                  disabled={!isStep1Complete}
                >
                  Next: Skills & Certification
                </Button>
                
                {!isStep1Complete && (
                  <p className="text-xs text-center text-orange-600 font-medium">
                    ⚠️ Please fill all fields correctly and complete OTP verification to continue
                  </p>
                )}
              </div>
            )}

            {/* STEP 2: Skills & Certification */}
            {step === 2 && (
              <div className="space-y-5">
                <h3 className="font-bold text-lg border-b pb-2">Skills & Certification</h3>
                <div>
                  <Label>Primary Skill Category *</Label>
                  <Select value={formData.category} onValueChange={(v) => setFormData({...formData, category: v})}>
                    <SelectTrigger><SelectValue placeholder="Select your skill" /></SelectTrigger>
                    <SelectContent>
                      {skillCategories.map((s) => <SelectItem key={s} value={s.toLowerCase()}>{s}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Years of Experience *</Label>
                  <Input type="number" placeholder="e.g. 5" value={formData.experience} onChange={(e) => setFormData({...formData, experience: e.target.value})} />
                </div>
                <div>
                  <Label>Languages Spoken</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {languages.map((lang) => (
                      <Badge
                        key={lang}
                        variant={formData.languages.includes(lang) ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() => {
                          const updated = formData.languages.includes(lang)
                            ? formData.languages.filter((l) => l !== lang)
                            : [...formData.languages, lang];
                          setFormData({...formData, languages: updated});
                        }}
                      >
                        {lang}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <Label>Certification / Training Details</Label>
                  <Textarea placeholder="Describe any certifications or training you have completed" value={formData.certification} onChange={(e) => setFormData({...formData, certification: e.target.value})} />
                </div>
                <div>
                  <Label>Upload Certification Document</Label>
                  <div className="border-2 border-dashed rounded-lg p-6 text-center hover:bg-gray-50 cursor-pointer transition">
                    <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500">Click to upload PDF or image</p>
                  </div>
                </div>
                <div className="flex gap-4 pt-4">
                  <Button variant="outline" className="w-full" onClick={() => setStep(1)}>Back</Button>
                  <Button className="w-full" onClick={() => setStep(3)}>Next: Federation</Button>
                </div>
              </div>
            )}

            {/* STEP 3: Federation Details */}
            {step === 3 && (
              <div className="space-y-5">
                <h3 className="font-bold text-lg border-b pb-2">Cooperative Federation Details</h3>
                <div>
                  <Label>Your Cooperative Federation / Society *</Label>
                  <Select value={formData.federation} onValueChange={(v) => setFormData({...formData, federation: v})}>
                    <SelectTrigger><SelectValue placeholder="Select your federation" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="delhi">Delhi Labour Cooperative Federation</SelectItem>
                      <SelectItem value="mumbai">Mumbai Workers Cooperative Society</SelectItem>
                      <SelectItem value="chennai">Chennai Labour Cooperative Union</SelectItem>
                      <SelectItem value="kolkata">Kolkata Workers Federation</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Short Bio</Label>
                  <Textarea placeholder="Tell customers about yourself and your expertise" value={formData.bio} onChange={(e) => setFormData({...formData, bio: e.target.value})} />
                </div>
                <div className="flex gap-4 pt-4">
                  <Button variant="outline" className="w-full" onClick={() => setStep(2)}>Back</Button>
                  <Button className="w-full" onClick={handleSubmit}>Submit Registration</Button>
                </div>
              </div>
            )}

            {/* STEP 4: Success */}
            {step === 4 && (
              <div className="text-center py-8">
                <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">Registration Submitted!</h3>
                <p className="text-gray-600 mb-6">Your application is being verified by your Cooperative Federation. You will receive a confirmation within 48 hours.</p>
                <Link href="/"><Button>Back to Home</Button></Link>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}