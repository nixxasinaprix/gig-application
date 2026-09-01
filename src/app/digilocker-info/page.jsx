// src/app/digilocker-info/page.jsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Shield, Lock, CheckCircle2, FileText } from "lucide-react";
import Link from "next/link";

export default function DigiLockerInfoPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6">
          <ArrowLeft className="w-5 h-5" /> Back to Home
        </Link>

        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-2xl">DigiLocker Integration</CardTitle>
                <p className="text-gray-500 text-sm">Government-backed document verification</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="font-bold text-lg mb-2">What is DigiLocker?</h3>
              <p className="text-gray-600">
                DigiLocker is a flagship program under Digital India initiative by the Government of India. It provides 
                a secure digital wallet for citizens to store and verify documents like Aadhaar, PAN, driving license, 
                educational certificates, and more.
              </p>
            </div>

            <div className="bg-blue-50 rounded-lg p-4">
              <h4 className="font-bold text-blue-900 mb-2">Why We Use DigiLocker</h4>
              <ul className="space-y-2 text-sm text-blue-800">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span><strong>Instant Verification:</strong> No manual document checking. Verification happens in seconds.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span><strong>Fraud Prevention:</strong> Documents are cryptographically signed by government authorities.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span><strong>Privacy First:</strong> We only receive verification status, not actual documents.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span><strong>Government Trust:</strong> Backed by Ministry of Electronics & IT, Government of India.</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-3">Documents We Verify</h3>
              <div className="grid md:grid-cols-2 gap-3">
                {[
                  { name: "Aadhaar Card", desc: "Identity & address verification", icon: "🆔" },
                  { name: "PAN Card", desc: "Tax identity verification", icon: "💳" },
                  { name: "Skill Certificates", desc: "Trade & skill verification", icon: "🎓" },
                  { name: "Address Proof", desc: "Location verification", icon: "📍" },
                ].map((doc) => (
                  <div key={doc.name} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <span className="text-2xl">{doc.icon}</span>
                    <div>
                      <p className="font-semibold text-sm">{doc.name}</p>
                      <p className="text-xs text-gray-500">{doc.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-yellow-50 rounded-lg p-4">
              <h4 className="font-bold text-yellow-900 mb-2">For Production Deployment</h4>
              <p className="text-sm text-yellow-800 mb-3">
                To integrate with actual DigiLocker API, you need to:
              </p>
              <ol className="space-y-2 text-sm text-yellow-800 list-decimal list-inside">
                <li>Register at digilocker.gov.com</li>
                <li>Request API access from Ministry of Electronics & IT</li>
                <li>Get OAuth 2.0 credentials (Client ID & Secret)</li>
                <li>Implement OAuth flow with redirect URI</li>
                <li>Handle document consent and verification callbacks</li>
              </ol>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="font-bold text-lg mb-4">Benefits for Stakeholders</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <FileText className="w-6 h-6 text-green-600" />
                </div>
                <p className="font-semibold text-sm mb-1">For Workers</p>
                <p className="text-xs text-gray-600">Instant onboarding, no paperwork</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <Shield className="w-6 h-6 text-blue-600" />
                </div>
                <p className="font-semibold text-sm mb-1">For Customers</p>
                <p className="text-xs text-gray-600">Trust verified workers</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <Lock className="w-6 h-6 text-purple-600" />
                </div>
                <p className="font-semibold text-sm mb-1">For Platform</p>
                <p className="text-xs text-gray-600">Zero fraud, instant verification</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}