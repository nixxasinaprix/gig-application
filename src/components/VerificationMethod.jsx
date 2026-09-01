// src/components/VerificationMethod.jsx
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Smartphone, Mail, Loader2, CheckCircle2, AlertCircle, RefreshCw } from "lucide-react";
import toast from "react-hot-toast";

export default function VerificationMethod({ phone, email, onVerified }) {
  const [method, setMethod] = useState(null); // 'phone' | 'email' | null
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState("");
  const [demoEmailOtp, setDemoEmailOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  // Auto-send OTP when a valid method is selected
  useEffect(() => {
    if (method && !otpSent && !isVerified) {
      handleSendOTP();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [method]);

  const handleSendOTP = async () => {
    setError("");
    setLoading(true);
    setOtpSent(true);

    if (method === "phone") {
      if (!/^\d{10}$/.test(phone)) {
        setError("Please enter a valid 10-digit mobile number first.");
        setLoading(false);
        setOtpSent(false);
        return;
      }
      // Simulate SMS gateway (Demo Mode)
      setTimeout(() => {
        setLoading(false);
        toast.success(`Demo OTP sent to +91 ${phone}`);
      }, 1500);
    } 
    
    if (method === "email") {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        setError("Please enter a valid email address first.");
        setLoading(false);
        setOtpSent(false);
        return;
      }
      try {
        const response = await fetch("/api/otp/send", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || "Failed to send OTP");
        if (data.demo_otp) setDemoEmailOtp(data.demo_otp);
        setLoading(false);
        toast.success(`OTP sent to ${email}`);
      } catch (err) {
        setError(err.message);
        setLoading(false);
        setOtpSent(false);
        toast.error(err.message);
      }
    }
  };

  const handleVerifyOTP = async () => {
    setError("");
    setLoading(true);

    if (method === "phone") {
      setTimeout(() => {
        if (otp === "123456") {
          setIsVerified(true);
          setLoading(false);
          toast.success("Mobile number verified successfully!");
          onVerified(true);
        } else {
          setLoading(false);
          setError("Invalid OTP. For this demo, please use: 123456");
          toast.error("Invalid OTP");
        }
      }, 1000);
    }

    if (method === "email") {
      try {
        const response = await fetch("/api/otp/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, otp }),
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || "Verification failed");
        
        setIsVerified(true);
        setLoading(false);
        toast.success("Email verified successfully!");
        onVerified(true);
      } catch (err) {
        setError(err.message);
        setLoading(false);
        toast.error(err.message);
      }
    }
  };

  if (isVerified) {
    return (
      <Card className="border-green-200 bg-green-50">
        <CardContent className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {method === "phone" ? (
              <Smartphone className="w-6 h-6 text-green-600" />
            ) : (
              <Mail className="w-6 h-6 text-green-600" />
            )}
            <div>
              <p className="font-semibold text-green-800">
                {method === "phone" ? "Mobile Number Verified" : "Email Verified"}
              </p>
              <p className="text-sm text-green-700">
                {method === "phone" ? `+91 ${phone}` : email}
              </p>
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={() => { setIsVerified(false); setOtp(""); setMethod(null); setOtpSent(false); onVerified(false); }}>
            <RefreshCw className="w-4 h-4 mr-1" /> Change
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-blue-200 bg-blue-50">
      <CardContent className="p-5 space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-300">Identity Verification</Badge>
        </div>
        <p className="text-sm text-gray-600">
          Choose to verify your identity via Mobile OTP or Email OTP.
        </p>

        {/* Method Selection */}
        {!method && (
          <div className="grid grid-cols-2 gap-3">
            <Button 
              variant="outline" 
              className="h-20 flex flex-col gap-2 border-blue-300 hover:bg-blue-100 transition-all"
              onClick={() => setMethod("phone")}
              disabled={!phone || !/^\d{10}$/.test(phone)}
            >
              <Smartphone className="w-6 h-6 text-blue-600" />
              <span className="font-semibold">Verify via Mobile</span>
              <span className="text-xs text-gray-500">+91 {phone || "..."}</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-20 flex flex-col gap-2 border-blue-300 hover:bg-blue-100 transition-all"
              onClick={() => setMethod("email")}
              disabled={!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)}
            >
              <Mail className="w-6 h-6 text-blue-600" />
              <span className="font-semibold">Verify via Email</span>
              <span className="text-xs text-gray-500 truncate w-full text-center">{email || "..."}</span>
            </Button>
          </div>
        )}

        {/* OTP Input */}
        {method && (
          <div className="space-y-3 animate-in fade-in slide-in-from-top-2 duration-300">
            <div className="bg-green-50 border border-green-200 rounded-lg p-3 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
              <p className="text-sm text-green-800">
                OTP sent to <strong>{method === "phone" ? `+91 ${phone}` : email}</strong>
              </p>
            </div>

            {method === "phone" && (
              <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-3 text-center">
                <p className="text-xs text-yellow-800 mb-1">💡 <strong>Demo Mode:</strong> Use this code to verify</p>
                <p className="text-2xl font-mono font-bold text-yellow-900 tracking-widest">123456</p>
              </div>
            )}

            {method === "email" && demoEmailOtp && (
              <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-3 text-center">
                <p className="text-xs text-yellow-800 mb-1">💡 Your Live Email OTP is:</p>
                <p className="text-2xl font-mono font-bold text-yellow-900 tracking-widest">{demoEmailOtp}</p>
              </div>
            )}

            <div className="space-y-2">
              <Label>Enter 6-digit OTP</Label>
              <Input
                placeholder="123456"
                value={otp}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, "").slice(0, 6);
                  setOtp(val);
                  setError("");
                }}
                maxLength={6}
                className="font-mono text-center tracking-widest text-xl"
              />
              {error && <p className="text-red-600 text-sm font-medium flex items-center gap-1"><AlertCircle className="w-4 h-4" /> {error}</p>}
              
              <div className="flex gap-2">
                <Button className="flex-1" onClick={handleVerifyOTP} disabled={loading || otp.length !== 6}>
                  {loading ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Verifying...</> : "Verify OTP"}
                </Button>
                <Button variant="outline" onClick={() => { setMethod(null); setOtp(""); setError(""); setOtpSent(false); }}>
                  Back
                </Button>
              </div>
              
              <button 
                type="button" 
                onClick={handleSendOTP} 
                disabled={loading}
                className="text-xs text-blue-600 hover:underline w-full text-center disabled:opacity-50"
              >
                {loading ? "Sending..." : "Resend OTP"}
              </button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}