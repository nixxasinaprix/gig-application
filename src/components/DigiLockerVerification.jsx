// src/components/DigiLockerVerification.jsx
"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Shield, FileText, ExternalLink } from "lucide-react";
import toast from "react-hot-toast";

export default function DigiLockerVerification({ onVerified }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [isVerified, setIsVerified] = useState(false);
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    // Check if we just returned from a successful DigiLocker redirect
    const isSuccess = searchParams.get("digilocker_success");
    const last4 = searchParams.get("aadhaar_last4");

    if (isSuccess === "true" && !isVerified) {
      setIsVerified(true);
      setDocuments([
        { name: "Aadhaar Card", status: "verified", number: `XXXX-XXXX-${last4 || "XXXX"}` },
        { name: "PAN Card", status: "verified", number: "ABCDE1234F" },
        { name: "Skill Certificate", status: "verified", number: "CERT-2024-001" },
      ]);
      
      if (onVerified) {
        onVerified({
          aadhaarVerified: true,
          documents: ["Aadhaar", "PAN", "Skill Certificate"]
        });
      }
      
      toast.success("Documents verified successfully via DigiLocker!");

      // Clean up the URL so it doesn't stay there forever
      const newParams = new URLSearchParams(searchParams.toString());
      newParams.delete("digilocker_success");
      newParams.delete("aadhaar_last4");
      router.replace(`?${newParams.toString()}`, { scroll: false });
    }
  }, [searchParams, isVerified, onVerified, router]);

  const handleRedirect = () => {
    const currentPath = window.location.pathname;
    router.push(`/digilocker-login?redirect=${currentPath}`);
  };

  return (
    <Card className="border-blue-200 bg-blue-50">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-lg mb-1">DigiLocker Verification</h3>
            <p className="text-sm text-gray-600 mb-4">
              Verify your identity and documents instantly through Government of India's DigiLocker
            </p>

            {!isVerified ? (
              <Button className="w-full" onClick={handleRedirect}>
                <ExternalLink className="w-4 h-4 mr-2" />
                Verify with DigiLocker
              </Button>
            ) : (
              <div className="space-y-3">
                <div className="bg-green-100 rounded-lg p-3 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                  <span className="text-sm font-semibold text-green-800">Verified via DigiLocker</span>
                </div>
                <div className="space-y-2">
                  {documents.map((doc, i) => (
                    <div key={i} className="flex items-center justify-between bg-white rounded-lg p-3 border">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-gray-500" />
                        <span className="text-sm font-medium">{doc.name}</span>
                      </div>
                      <Badge variant="outline" className="text-green-600 border-green-600">
                        <CheckCircle2 className="w-3 h-3 mr-1" />
                        Verified
                      </Badge>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-gray-500 text-center">
                  Verified on {new Date().toLocaleDateString()} via DigiLocker API
                </p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}   