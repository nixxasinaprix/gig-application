// src/app/digilocker-login/page.jsx
"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Shield, Lock, Loader2, AlertCircle } from "lucide-react";
import toast from "react-hot-toast";

export default function DigiLockerLoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect") || "/register";
  
  const [aadhaar, setAadhaar] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleVerify = (e) => {
    e.preventDefault();
    setError("");

    // Validation: must be exactly 12 digits
    const cleanAadhaar = aadhaar.replace(/\s/g, "");
    if (cleanAadhaar.length !== 12 || !/^\d+$/.test(cleanAadhaar)) {
      setError("Please enter a valid 12-digit Aadhaar number.");
      toast.error("Invalid Aadhaar Number");
      return;
    }

    setIsLoading(true);

    // Simulate API call to DigiLocker/UIDAI
    setTimeout(() => {
      toast.success("Authentication Successful!");
      
      // Redirect back with success flags in the URL
      const last4 = cleanAadhaar.slice(-4);
      router.push(`${redirectUrl}?digilocker_success=true&aadhaar_last4=${last4}`);
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-xl border-t-4 border-t-blue-600">
        <CardHeader className="text-center space-y-2">
          <div className="flex justify-center mb-2">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
              <Shield className="w-8 h-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-gray-800">DigiLocker</CardTitle>
          <CardDescription className="text-gray-500">
            Government of India • Secure Digital Wallet
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleVerify} className="space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 flex items-start gap-2">
              <Lock className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-blue-800">
                Enter your 12-digit Aadhaar number to securely fetch and verify your documents.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="aadhaar">Aadhaar Number</Label>
              <Input
                id="aadhaar"
                placeholder="XXXX XXXX XXXX"
                value={aadhaar}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, "").slice(0, 12);
                  const formatted = val.replace(/(\d{4})(?=\d)/g, "$1 ");
                  setAadhaar(formatted);
                  setError("");
                }}
                maxLength={14}
                className="text-lg tracking-widest text-center font-mono"
                disabled={isLoading}
              />
              {error && (
                <div className="flex items-center gap-2 text-red-600 text-sm font-medium">
                  <AlertCircle className="w-4 h-4" />
                  {error}
                </div>
              )}
            </div>

            <Button 
              type="submit" 
              className="w-full bg-blue-600 hover:bg-blue-700 text-lg py-6"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Authenticating with UIDAI...
                </>
              ) : (
                <>
                  <Lock className="w-5 h-5 mr-2" />
                  Securely Verify
                </>
              )}
            </Button>

            <p className="text-xs text-center text-gray-500 mt-4">
              By proceeding, you consent to share your verification status with Sahakari Seva. 
              Your actual documents remain secure in your DigiLocker.
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}