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
import DigiLockerVerification from "@/components/DigiLockerVerification";

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
    name: "", phone: "", email: "", aadhaar: "",
    category: "", experience: "", languages: [],
    certification: "", federation: "", bio: "",
    digiLockerVerified: false, verifiedDocs: []
  });

  const handleSubmit = () => {
    toast.success("Registration submitted! Verification in progress.");
    setStep(4);
  };

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

            {step === 1 && (
              <div className="space-y-4">
                <h3 className="font-bold text-lg">Personal Information</h3>
                <div>
                  <Label>Full Name</Label>
                  <Input placeholder="Enter your full name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Phone Number</Label>
                    <Input placeholder="+91 XXXXX XXXXX" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} />
                  </div>
                  <div>
                    <Label>Email (Optional)</Label>
                    <Input placeholder="email@example.com" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
                  </div>
                </div>
                <div>
                  <Label>Aadhaar Number (for verification)</Label>
                  <Input placeholder="XXXX XXXX XXXX" value={formData.aadhaar} onChange={(e) => setFormData({...formData, aadhaar: e.target.value})} />
                </div>
                
                <DigiLockerVerification 
                  onVerified={(data) => {
                    setFormData({...formData, digiLockerVerified: true, verifiedDocs: data.documents});
                  }} 
                />
                
                <Button className="w-full" onClick={() => setStep(2)}>Next: Skills & Certification</Button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <h3 className="font-bold text-lg">Skills & Certification</h3>
                <div>
                  <Label>Primary Skill Category</Label>
                  <Select value={formData.category} onValueChange={(v) => setFormData({...formData, category: v})}>
                    <SelectTrigger><SelectValue placeholder="Select your skill" /></SelectTrigger>
                    <SelectContent>
                      {skillCategories.map((s) => <SelectItem key={s} value={s.toLowerCase()}>{s}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Years of Experience</Label>
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
                  <div className="border-2 border-dashed rounded-lg p-6 text-center hover:bg-gray-50 cursor-pointer">
                    <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500">Click to upload PDF or image</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Button variant="outline" className="w-full" onClick={() => setStep(1)}>Back</Button>
                  <Button className="w-full" onClick={() => setStep(3)}>Next: Federation</Button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <h3 className="font-bold text-lg">Cooperative Federation Details</h3>
                <div>
                  <Label>Your Cooperative Federation / Society</Label>
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
                <div className="flex gap-4">
                  <Button variant="outline" className="w-full" onClick={() => setStep(2)}>Back</Button>
                  <Button className="w-full" onClick={handleSubmit}>Submit Registration</Button>
                </div>
              </div>
            )}

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