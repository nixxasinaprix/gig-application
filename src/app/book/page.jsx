// src/app/book/page.jsx
"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Star, Clock, Shield, Zap, ArrowLeft, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";

const workers = [
  { id: 1, name: "Rajesh Kumar", skill: "Plumber", rating: 4.8, reviews: 124, experience: "8 years", distance: "1.2 km", price: 500, verified: true, digiLockerVerified: true, federation: "Delhi Labour Coop", emergency: true, languages: ["Hindi", "English"] },
  { id: 2, name: "Suresh Yadav", skill: "Electrician", rating: 4.9, reviews: 203, experience: "12 years", distance: "0.8 km", price: 600, verified: true, digiLockerVerified: true, federation: "Delhi Labour Coop", emergency: true, languages: ["Hindi"] },
  { id: 3, name: "Priya Sharma", skill: "Cleaner", rating: 4.7, reviews: 89, experience: "5 years", distance: "2.1 km", price: 400, verified: true, digiLockerVerified: true, federation: "Mumbai Workers Coop", emergency: false, languages: ["Hindi", "Marathi"] },
  { id: 4, name: "Anil Verma", skill: "Carpenter", rating: 4.6, reviews: 67, experience: "15 years", distance: "3.5 km", price: 700, verified: true, digiLockerVerified: true, federation: "Delhi Labour Coop", emergency: false, languages: ["Hindi"] },
];

export default function BookPage() {
  const [selectedWorker, setSelectedWorker] = useState(null);
  const [booked, setBooked] = useState(false);
  const [filter, setFilter] = useState("all");
  const [emergency, setEmergency] = useState(false);

  const filtered = workers.filter((w) => {
    if (emergency && !w.emergency) return false;
    if (filter === "all") return true;
    return w.skill.toLowerCase() === filter;
  });

  const handleBook = (worker) => {
    const communityFund = worker.price * 0.15;
    toast.success(`Booked ${worker.name}! ₹${communityFund} goes to Community Fund! 🌍`);
    setBooked(true);
    setSelectedWorker(worker);
  };

  if (booked && selectedWorker) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardContent className="p-8 text-center">
            <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Booking Confirmed!</h2>
            <p className="text-gray-600 mb-6">{selectedWorker.name} will arrive at your location shortly.</p>
            <div className="bg-blue-50 rounded-lg p-4 mb-6 text-left space-y-2">
              <div className="flex justify-between"><span className="text-gray-600">Service</span><span className="font-bold">{selectedWorker.skill}</span></div>
              <div className="flex justify-between"><span className="text-gray-600">Worker</span><span className="font-bold">{selectedWorker.name}</span></div>
              <div className="flex justify-between"><span className="text-gray-600">Total</span><span className="font-bold">₹{selectedWorker.price}</span></div>
              <div className="flex justify-between"><span className="text-gray-600">Worker Gets</span><span className="font-bold text-green-600">₹{selectedWorker.price * 0.8}</span></div>
              <div className="flex justify-between"><span className="text-gray-600">Community Fund</span><span className="font-bold text-blue-600">₹{selectedWorker.price * 0.15}</span></div>
            </div>
            <Link href="/"><Button className="w-full">Back to Home</Button></Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
            <ArrowLeft className="w-5 h-5" /> Back
          </Link>
          <h1 className="font-bold text-lg">Book a Service</h1>
          <div />
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-wrap gap-3 mb-6">
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-48"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Services</SelectItem>
              <SelectItem value="plumber">Plumber</SelectItem>
              <SelectItem value="electrician">Electrician</SelectItem>
              <SelectItem value="cleaner">Cleaner</SelectItem>
              <SelectItem value="carpenter">Carpenter</SelectItem>
            </SelectContent>
          </Select>
          <Button variant={emergency ? "destructive" : "outline"} onClick={() => setEmergency(!emergency)}>
            <Zap className="w-4 h-4 mr-2" /> {emergency ? "Emergency Mode ON" : "Emergency?"}
          </Button>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {filtered.map((worker) => (
            <Card key={worker.id} className="hover:shadow-lg transition">
              <CardContent className="p-5">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-bold text-lg">{worker.name}</h3>
                      {worker.verified && <Shield className="w-4 h-4 text-blue-500" />}
                      {worker.digiLockerVerified && (
                        <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-300">
                          <Shield className="w-3 h-3 mr-1" />
                          DigiLocker
                        </Badge>
                      )}
                      {worker.emergency && <Badge variant="destructive" className="text-xs">Emergency</Badge>}
                    </div>
                    <p className="text-sm text-gray-500">{worker.skill} • {worker.experience}</p>
                    <p className="text-xs text-gray-400">{worker.federation}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-green-600">₹{worker.price}</p>
                    <p className="text-xs text-gray-500">per service</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3 text-sm text-gray-600 mb-4">
                  <span className="flex items-center gap-1"><Star className="w-4 h-4 text-yellow-500 fill-yellow-500" /> {worker.rating} ({worker.reviews})</span>
                  <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {worker.distance}</span>
                  <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> ~30 min</span>
                </div>

                <div className="flex flex-wrap gap-1 mb-4">
                  {worker.languages.map((l) => <Badge key={l} variant="outline" className="text-xs">{l}</Badge>)}
                </div>

                <div className="bg-gray-50 rounded-lg p-3 mb-4 text-xs space-y-1">
                  <div className="flex justify-between"><span>Worker earns:</span><span className="text-green-600 font-bold">₹{worker.price * 0.8}</span></div>
                  <div className="flex justify-between"><span>Community fund:</span><span className="text-blue-600 font-bold">₹{worker.price * 0.15}</span></div>
                  <div className="flex justify-between"><span>Platform fee:</span><span className="text-gray-600 font-bold">₹{worker.price * 0.05}</span></div>
                </div>

                <Button className="w-full" onClick={() => handleBook(worker)}>
                  Book Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}