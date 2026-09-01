// src/components/IdentityVerification.jsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Mail, Smartphone, Loader2, CheckCircle2, AlertCircle, Shield } from "lucide-react";
import toast from "react-hot-toast";

export default function IdentityVerification({ onVerified }) {
  const [activeTab, setActiveTab] = useState("phone");
  
  // Phone State
  const [phone, setPhone] = useState("");
  const [phoneOtp, setPhoneOtp] = useState("");
  const [phoneLoading, setPhoneLoading] = useState(false);
  const [phoneVerified, setPhoneVerified] = useState(false);
  const [phoneError, setPhoneError] = useState("");

  // Email State
  const [email, setEmail] = useState("");
  const [emailOtp, setEmailOtp] = useState("");
  const [emailLoading, setEmailLoading] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [demoEmailOtp, setDemoEmailOtp] = useState("");
  const [emailCountdown, setEmailCountdown] = useState(0);

  // --- PHONE OTP LOGIC (Demo Mode for Hackathon) ---
  const handleSendPhoneOTP = () => {
    setPhoneError("");
    if (!/^\d{10}$/.test(phone.replace(/\s/g, ""))) {
      setPhoneError("Please enter a valid 10-digit mobile number");
      return;
    }
    setPhoneLoading(true);
    setTimeout(() => {
      setPhoneLoading(false);
      toast.success("Demo OTP sent to +91 " + phone);
    }, 1500);
  };

  const handleVerifyPhoneOTP = () => {
    setPhoneError("");
    if (phoneOtp === "123456") {
      setPhoneVerified(true);
      toast.success("Phone number verified!");
      checkOverallVerification();
    } else {
      setPhoneError("Invalid OTP. For demo, use: 123456");
    }
  };

  // --- EMAIL OTP LOGIC (Real API via Resend) ---
  const handleSendEmailOTP = async () => {
    setEmailError("");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError("Please enter a valid email address");
      return;
    }
    setEmailLoading(true);
    try {
      const response = await fetch("/api/otp/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to send OTP");
      
      if (data.demo_otp) setDemoEmailOtp(data.demo_otp);
      setEmailCountdown(60);
      const timer = setInterval(() => {
        setEmailCountdown((prev) => {
          if (prev <= 1) { clearInterval(timer); return 0; }
          return prev - 1;
        });
      }, 1000);
      toast.success(`OTP sent to ${email}`);
    } catch (err) {
      setEmailError(err.message);
      toast.error(err.message);
    } finally {
      setEmailLoading(false);
    }
  };

  const handleVerifyEmailOTP = async () => {
    setEmailError("");
    if (!/^\d{6}$/.test(emailOtp)) {
      setEmailError("OTP must be exactly 6 digits");
      return;
    }
    setEmailLoading(true);
    try {
      const response = await fetch("/api/otp/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp: emailOtp }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Verification failed");
      
      setEmailVerified(true);
      toast.success("Email verified successfully!");
      checkOverallVerification();
    } catch (err) {
      setEmailError(err.message);
      toast.error(err.message);
    } finally {
      setEmailLoading(false);
    }
  };

  const checkOverallVerification = () => {
    if (phoneVerified && emailVerified && onVerified) {
      onVerified({ phoneVerified: true, emailVerified: true, phone, email });
    }
  };

  return (
    <Card className="border-blue-200 bg-blue-50">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-lg mb-1">Identity Verification</h3>
            <p className="text-sm text-gray-600 mb-4">
              Verify both your mobile number and email address to register
            </p>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="phone" className="flex items-center gap-2">
                  <Smartphone className="w-4 h-4" /> Phone
                </TabsTrigger>
                <TabsTrigger value="email" className="flex items-center gap-2">
                  <Mail className="w-4 h-4" /> Email
                </TabsTrigger>
              </TabsList>

              {/* PHONE TAB */}
              <TabsContent value="phone" className="space-y-3">
                {!phoneVerified ? (
                  <>
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-xs text-yellow-800 flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <span><strong>Demo Mode:</strong> Real SMS gateways (MSG91/Twilio) require paid DLT registration. For this demo, use OTP: <strong>123456</strong></span>
                    </div>
                    {!phoneOtp ? (
                      <div className="space-y-2">
                        <Label>Mobile Number</Label>
                        <div className="flex gap-2">
                          <span className="flex items-center px-3 bg-gray-100 rounded-md text-sm font-medium text-gray-600">+91</span>
                          <Input
                            placeholder="9876543210"
                            value={phone}
                            onChange={(e) => {
                              const val = e.target.value.replace(/\D/g, "").slice(0, 10);
                              setPhone(val);
                              setPhoneError("");
                            }}
                            maxLength={10}
                          />
                        </div>
                        {phoneError && <p className="text-red-600 text-xs font-medium">{phoneError}</p>}
                        <Button className="w-full" onClick={handleSendPhoneOTP} disabled={phoneLoading}>
                          {phoneLoading ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Sending...</> : "Send Phone OTP"}
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <div className="bg-green-50 border border-green-200 rounded-lg p-2 flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-green-600" />
                          <p className="text-sm text-green-800">OTP sent to <strong>+91 {phone}</strong></p>
                        </div>
                        <Label>Enter 6-digit OTP</Label>
                        <Input
                          placeholder="123456"
                          value={phoneOtp}
                          onChange={(e) => {
                            const val = e.target.value.replace(/\D/g, "").slice(0, 6);
                            setPhoneOtp(val);
                            setPhoneError("");
                          }}
                          maxLength={6}
                          className="font-mono text-center tracking-widest text-xl"
                        />
                        {phoneError && <p className="text-red-600 text-xs font-medium">{phoneError}</p>}
                        <Button className="w-full" onClick={handleVerifyPhoneOTP}>Verify Phone OTP</Button>
                        <button type="button" onClick={() => setPhoneOtp("")} className="text-xs text-blue-600 hover:underline w-full text-center">Change Number</button>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="bg-green-100 rounded-lg p-3 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                    <span className="text-sm font-semibold text-green-800">Phone Verified: +91 {phone}</span>
                  </div>
                )}
              </TabsContent>

              {/* EMAIL TAB */}
              <TabsContent value="email" className="space-y-3">
                {!emailVerified ? (
                  <>
                    {!emailOtp ? (
                      <div className="space-y-2">
                        <Label>Email Address</Label>
                        <Input
                          type="email"
                          placeholder="your.email@example.com"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                            setEmailError("");
                          }}
                        />
                        {emailError && <p className="text-red-600 text-xs font-medium">{emailError}</p>}
                        <Button className="w-full" onClick={handleSendEmailOTP} disabled={emailLoading}>
                          {emailLoading ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Sending...</> : "Send Email OTP (Live)"}
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <div className="bg-green-50 border border-green-200 rounded-lg p-2 flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-green-600" />
                          <p className="text-sm text-green-800">OTP sent to <strong>{email}</strong></p>
                        </div>
                        
                        {demoEmailOtp && (
                          <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-2 text-center">
                            <p className="text-xs text-yellow-800">💡 Your Live OTP is:</p>
                            <p className="text-xl font-mono font-bold text-yellow-900 tracking-widest">{demoEmailOtp}</p>
                          </div>
                        )}

                        <Label>Enter 6-digit OTP</Label>
                        <Input
                          placeholder="______"
                          value={emailOtp}
                          onChange={(e) => {
                            const val = e.target.value.replace(/\D/g, "").slice(0, 6);
                            setEmailOtp(val);
                            setEmailError("");
                          }}
                          maxLength={6}
                          className="font-mono text-center tracking-widest text-xl"
                        />
                        {emailError && <p className="text-red-600 text-xs font-medium">{emailError}</p>}
                        <Button className="w-full" onClick={handleVerifyEmailOTP} disabled={emailLoading}>
                          {emailLoading ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Verifying...</> : "Verify Email OTP"}
                        </Button>
                        <div className="flex justify-between text-xs">
                          <button type="button" onClick={handleSendEmailOTP} disabled={emailCountdown > 0} className="text-blue-600 hover:underline disabled:opacity-50">
                            {emailCountdown > 0 ? `Resend in ${emailCountdown}s` : "Resend OTP"}
                          </button>
                          <button type="button" onClick={() => setEmailOtp("")} className="text-gray-600 hover:underline">Change Email</button>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="bg-green-100 rounded-lg p-3 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                    <span className="text-sm font-semibold text-green-800">Email Verified: {email}</span>
                  </div>
                )}
              </TabsContent>
            </Tabs>

            {/* Overall Status */}
            <div className="mt-4 pt-4 border-t border-blue-200">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Verification Status:</span>
                <div className="flex gap-2">
                  <Badge variant={phoneVerified ? "default" : "outline"} className={phoneVerified ? "bg-green-600" : ""}>
                    {phoneVerified ? "Phone ✓" : "Phone Pending"}
                  </Badge>
                  <Badge variant={emailVerified ? "default" : "outline"} className={emailVerified ? "bg-green-600" : ""}>
                    {emailVerified ? "Email ✓" : "Email Pending"}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}