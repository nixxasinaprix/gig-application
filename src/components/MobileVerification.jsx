// src/components/MobileVerification.jsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Smartphone, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import toast from "react-hot-toast";

export default function MobileVerification({ phone, onVerified }) {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  const handleSendOTP = () => {
    if (!/^\d{10}$/.test(phone.replace(/\s/g, ""))) {
      setError("Please enter a valid 10-digit mobile number first.");
      return;
    }
    setLoading(true);
    setError("");
    
    // Simulate API call to SMS gateway (MSG91/Twilio)
    setTimeout(() => {
      setLoading(false);
      setOtpSent(true);
      toast.success(`OTP sent to +91 ${phone}`);
    }, 1500);
  };

  const handleVerifyOTP = () => {
    setError("");
    setLoading(true);

    setTimeout(() => {
      // For hackathon demo, we accept "123456" as the valid OTP
      if (otp === "123456") {
        setIsVerified(true);
        setLoading(false);
        toast.success("Mobile number verified successfully!");
        if (onVerified) onVerified(true);
      } else {
        setLoading(false);
        setError("Invalid OTP. For this demo, please use: 123456");
        toast.error("Invalid OTP");
      }
    }, 1000);
    }

  if (isVerified) {
    return (
      <Card className="border-green-200 bg-green-50">
        <CardContent className="p-4 flex items-center gap-3">
          <CheckCircle2 className="w-6 h-6 text-green-600" />
          <div>
            <p className="font-semibold text-green-800">Mobile Number Verified</p>
            <p className="text-sm text-green-700">+91 {phone}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-blue-200 bg-blue-50">
      <CardContent className="p-5 space-y-4">
        <div className="flex items-center gap-2">
          <Smartphone className="w-5 h-5 text-blue-600" />
          <h3 className="font-bold text-lg">Mobile Verification</h3>
          <Badge variant="outline" className="text-xs bg-yellow-100 text-yellow-800 border-yellow-300">
            DEMO MODE
          </Badge>
        </div>

        {!otpSent ? (
          <div className="space-y-2">
            <p className="text-sm text-gray-600">
              We will send a 6-digit OTP to <strong>+91 {phone || "your mobile number"}</strong> to verify your identity.
            </p>
            {error && <p className="text-red-600 text-sm font-medium">{error}</p>}
            <Button className="w-full" onClick={handleSendOTP} disabled={loading || !phone}>
              {loading ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Sending...</> : "Send OTP"}
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="bg-green-50 border border-green-200 rounded-lg p-3 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
              <p className="text-sm text-green-800">OTP sent to <strong>+91 {phone}</strong></p>
            </div>

            <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-3 text-center">
              <p className="text-xs text-yellow-800 mb-1">💡 <strong>Demo OTP:</strong> Use this code to verify</p>
              <p className="text-2xl font-mono font-bold text-yellow-900 tracking-widest">123456</p>
            </div>

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
              {error && <p className="text-red-600 text-sm font-medium">{error}</p>}
              
              <Button className="w-full" onClick={handleVerifyOTP} disabled={loading || otp.length !== 6}>
                {loading ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Verifying...</> : "Verify OTP"}
              </Button>
              
              <button 
                type="button" 
                onClick={() => { setOtpSent(false); setOtp(""); setError(""); }} 
                className="text-xs text-blue-600 hover:underline w-full text-center"
              >
                Change Mobile Number
              </button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}