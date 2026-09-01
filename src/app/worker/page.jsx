// src/app/worker/page.jsx
"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DollarSign, Star, Clock, Shield, TrendingUp, CheckCircle2, Phone, MapPin } from "lucide-react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";

export default function WorkerPage() {
  const [activeJobs, setActiveJobs] = useState([
    { id: 1, customer: "Mrs. Gupta", service: "Plumbing Repair", location: "Sector 15, Noida", time: "Today, 2:00 PM", amount: 500, status: "accepted" },
    { id: 2, customer: "Mr. Singh", service: "Pipe Installation", location: "Sector 22, Noida", time: "Tomorrow, 10:00 AM", amount: 800, status: "pending" },
  ]);

  const handleAccept = (id) => {
    setActiveJobs(prev => prev.map(j => j.id === id ? {...j, status: "accepted"} : j));
    toast.success("Job accepted! 🎉");
  };

  const handleComplete = (id) => {
    setActiveJobs(prev => prev.filter(j => j.id !== id));
    toast.success("Job completed! ₹400 added to your wallet 💰");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Link href="/" className="text-gray-600"><ArrowLeft className="w-5 h-5" /></Link>
            <div>
              <h1 className="font-bold">Worker Dashboard</h1>
              <p className="text-xs text-gray-500">Ramesh Kumar • Plumber</p>
            </div>
          </div>
          <Badge className="bg-green-100 text-green-700">Online</Badge>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-6 max-w-2xl">
        {/* Earnings Card */}
        <Card className="mb-6 bg-gradient-to-r from-green-500 to-emerald-600 text-white border-0">
          <CardContent className="p-6">
            <p className="text-green-100 text-sm">This Month's Earnings</p>
            <p className="text-4xl font-bold">₹18,400</p>
            <div className="grid grid-cols-3 gap-4 mt-4">
              <div>
                <p className="text-green-100 text-xs">Jobs Done</p>
                <p className="font-bold text-lg">45</p>
              </div>
              <div>
                <p className="text-green-100 text-xs">Rating</p>
                <p className="font-bold text-lg">⭐ 4.8</p>
              </div>
              <div>
                <p className="text-green-100 text-xs">Coop Shares</p>
                <p className="font-bold text-lg">320</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Welfare & Insurance */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Card>
            <CardContent className="p-4 text-center">
              <Shield className="w-8 h-8 text-blue-500 mx-auto mb-2" />
              <p className="text-sm font-semibold">Insurance Active</p>
              <p className="text-xs text-gray-500">Covered up to ₹50,000</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <TrendingUp className="w-8 h-8 text-purple-500 mx-auto mb-2" />
              <p className="text-sm font-semibold">Shares: 320</p>
              <p className="text-xs text-gray-500">Value: ₹32,000</p>
            </CardContent>
          </Card>
        </div>

        {/* Active Jobs */}
        <h2 className="font-bold text-lg mb-3">Active Jobs</h2>
        <div className="space-y-3">
          {activeJobs.map((job) => (
            <Card key={job.id} className={job.status === "pending" ? "border-yellow-300 bg-yellow-50" : ""}>
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold">{job.service}</h3>
                    <p className="text-sm text-gray-500">{job.customer}</p>
                    <div className="flex gap-3 mt-1 text-xs text-gray-500">
                      <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {job.location}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {job.time}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-green-600">₹{job.amount * 0.8}</p>
                    <p className="text-xs text-gray-500">of ₹{job.amount}</p>
                    {job.status === "pending" ? (
                      <Button size="sm" className="mt-2" onClick={() => handleAccept(job.id)}>Accept</Button>
                    ) : (
                      <Button size="sm" variant="outline" className="mt-2" onClick={() => handleComplete(job.id)}>Complete</Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}