// src/app/demo/page.jsx
"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, MapPin, Star, Shield, Zap, Users, Heart, TrendingUp, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";

const mockServices = [
  { id: 1, title: "Plumbing Repair", category: "Household", description: "Fix leaks, pipes & fittings", basePrice: 500, icon: "🔧" },
  { id: 2, title: "Electrical Repair", category: "Household", description: "Wiring, switches & fans", basePrice: 600, icon: "⚡" },
  { id: 3, title: "House Cleaning", category: "Household", description: "Deep cleaning service", basePrice: 800, icon: "🧹" },
  { id: 4, title: "Carpentry", category: "Household", description: "Furniture repair & fitting", basePrice: 700, icon: "🪚" },
  { id: 5, title: "Math Tutoring", category: "Community", description: "1-hour tutoring session", basePrice: 300, icon: "📚" },
  { id: 6, title: "Elderly Care", category: "Community", description: "Companionship & assistance", basePrice: 450, icon: "💝" },
];

export default function DemoPage() {
  const [communityImpact, setCommunityImpact] = useState(0);
  const [bookingsCount, setBookingsCount] = useState(0);
  const [workerEarnings, setWorkerEarnings] = useState(0);
  const [recentBookings, setRecentBookings] = useState([]);

  const handleBook = (service) => {
    const community = service.basePrice * 0.15;
    const worker = service.basePrice * 0.8;
    setCommunityImpact((p) => p + community);
    setWorkerEarnings((p) => p + worker);
    setBookingsCount((p) => p + 1);
    setRecentBookings((p) => [{ ...service, time: new Date().toLocaleTimeString() }, ...p.slice(0, 4)]);
    toast.success(`Booked ${service.title}! ₹${community} added to Community Fund! 🌍`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
            <ArrowLeft className="w-5 h-5" /> Back
          </Link>
          <div className="flex gap-6">
            <div className="text-center"><p className="text-xs text-gray-500">Bookings</p><p className="text-xl font-bold text-blue-600">{bookingsCount}</p></div>
            <div className="text-center"><p className="text-xs text-gray-500">Community Fund</p><p className="text-xl font-bold text-green-600">₹{communityImpact.toFixed(0)}</p></div>
            <div className="text-center"><p className="text-xs text-gray-500">Worker Earnings</p><p className="text-xl font-bold text-purple-600">₹{workerEarnings.toFixed(0)}</p></div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <Card className="mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white border-0">
          <CardContent className="p-6">
            <h2 className="text-xl font-bold mb-4">Live Cooperative Impact</h2>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white/10 rounded-lg p-3 text-center">
                <Heart className="w-6 h-6 mx-auto mb-1" />
                <p className="text-2xl font-bold">₹{communityImpact.toFixed(0)}</p>
                <p className="text-xs text-blue-100">Community Fund</p>
              </div>
              <div className="bg-white/10 rounded-lg p-3 text-center">
                <Users className="w-6 h-6 mx-auto mb-1" />
                <p className="text-2xl font-bold">₹{workerEarnings.toFixed(0)}</p>
                <p className="text-xs text-blue-100">Worker Earnings</p>
              </div>
              <div className="bg-white/10 rounded-lg p-3 text-center">
                <TrendingUp className="w-6 h-6 mx-auto mb-1" />
                <p className="text-2xl font-bold">₹{(communityImpact * 0.33).toFixed(0)}</p>
                <p className="text-xs text-blue-100">Platform Fee (5%)</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-3 mb-6">
          <Link href="/book"><Button><MapPin className="w-4 h-4 mr-2" /> Book a Worker</Button></Link>
          <Link href="/register"><Button variant="outline"><Users className="w-4 h-4 mr-2" /> Register as Worker</Button></Link>
          <Link href="/admin"><Button variant="outline"><Shield className="w-4 h-4 mr-2" /> Admin Dashboard</Button></Link>
        </div>

        <h2 className="text-xl font-bold mb-4">Available Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockServices.map((s) => (
            <Card key={s.id} className="hover:shadow-lg transition">
              <CardContent className="p-5">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{s.icon}</span>
                    <div>
                      <h3 className="font-bold">{s.title}</h3>
                      <Badge variant={s.category === "Household" ? "default" : "secondary"} className="text-xs">{s.category}</Badge>
                    </div>
                  </div>
                  <p className="text-xl font-bold text-green-600">₹{s.basePrice}</p>
                </div>
                <p className="text-sm text-gray-600 mb-3">{s.description}</p>
                <div className="text-xs space-y-1 mb-4 bg-gray-50 rounded p-2">
                  <div className="flex justify-between"><span>Worker:</span><span className="text-green-600 font-bold">₹{s.basePrice * 0.8}</span></div>
                  <div className="flex justify-between"><span>Community:</span><span className="text-blue-600 font-bold">₹{s.basePrice * 0.15}</span></div>
                  <div className="flex justify-between"><span>Platform:</span><span className="text-gray-500 font-bold">₹{s.basePrice * 0.05}</span></div>
                </div>
                <Button className="w-full" onClick={() => handleBook(s)}>Book Now</Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {recentBookings.length > 0 && (
          <Card className="mt-6">
            <CardHeader><CardTitle>Recent Bookings</CardTitle></CardHeader>
            <CardContent className="space-y-2">
              {recentBookings.map((b, i) => (
                <div key={i} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div><p className="font-semibold">{b.icon} {b.title}</p><p className="text-xs text-gray-500">{b.time}</p></div>
                  <Badge variant="outline" className="text-green-600">+₹{(b.basePrice * 0.15).toFixed(0)} community</Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}