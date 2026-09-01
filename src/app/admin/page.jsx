// src/app/admin/page.jsx
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Users, DollarSign, TrendingUp, Shield, AlertTriangle, Heart, BarChart3 } from "lucide-react";

const pendingWorkers = [
  { id: 1, name: "Vikram Singh", skill: "Electrician", federation: "Delhi Labour Coop", submitted: "2 hours ago", documents: true },
  { id: 2, name: "Meena Devi", skill: "Domestic Helper", federation: "Mumbai Workers Coop", submitted: "5 hours ago", documents: true },
  { id: 3, name: "Arjun Patel", skill: "Plumber", federation: "Delhi Labour Coop", submitted: "1 day ago", documents: false },
];

const recentBookings = [
  { id: 1, customer: "Amit Sharma", worker: "Rajesh Kumar", service: "Plumbing", amount: 500, status: "Completed" },
  { id: 2, customer: "Priya Gupta", worker: "Suresh Yadav", service: "Electrical", amount: 600, status: "In Progress" },
  { id: 3, customer: "Ravi Tiwari", worker: "Priya Sharma", service: "Cleaning", amount: 400, status: "Pending" },
];

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-lg">Federation Dashboard</h1>
              <p className="text-xs text-gray-500">Delhi Labour Cooperative Federation</p>
            </div>
          </div>
          <Badge variant="secondary">Admin</Badge>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Card><CardContent className="p-4"><div className="flex items-center gap-3"><Users className="w-8 h-8 text-blue-500" /><div><p className="text-2xl font-bold">248</p><p className="text-xs text-gray-500">Active Workers</p></div></div></CardContent></Card>
          <Card><CardContent className="p-4"><div className="flex items-center gap-3"><DollarSign className="w-8 h-8 text-green-500" /><div><p className="text-2xl font-bold">₹4.2L</p><p className="text-xs text-gray-500">Revenue This Month</p></div></div></CardContent></Card>
          <Card><CardContent className="p-4"><div className="flex items-center gap-3"><TrendingUp className="w-8 h-8 text-purple-500" /><div><p className="text-2xl font-bold">1,204</p><p className="text-xs text-gray-500">Bookings This Month</p></div></div></CardContent></Card>
          <Card><CardContent className="p-4"><div className="flex items-center gap-3"><Heart className="w-8 h-8 text-red-500" /><div><p className="text-2xl font-bold">₹63K</p><p className="text-xs text-gray-500">Community Fund</p></div></div></CardContent></Card>
        </div>

        <Tabs defaultValue="workers">
          <TabsList className="mb-6">
            <TabsTrigger value="workers">Worker Verification</TabsTrigger>
            <TabsTrigger value="bookings">Recent Bookings</TabsTrigger>
            <TabsTrigger value="ai">AI Forecasting</TabsTrigger>
            <TabsTrigger value="welfare">Worker Welfare</TabsTrigger>
          </TabsList>

          <TabsContent value="workers">
            <Card>
              <CardHeader><CardTitle>Pending Verifications ({pendingWorkers.length})</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                {pendingWorkers.map((w) => (
                  <div key={w.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-bold">{w.name}</p>
                      <p className="text-sm text-gray-500">{w.skill} • {w.federation}</p>
                      <p className="text-xs text-gray-400">Submitted {w.submitted}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {w.documents ? <Badge variant="outline" className="text-green-600">Docs Uploaded</Badge> : <Badge variant="outline" className="text-red-600">Missing Docs</Badge>}
                      <Button size="sm" variant="outline">Reject</Button>
                      <Button size="sm">Approve</Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="bookings">
            <Card>
              <CardHeader><CardTitle>Recent Bookings</CardTitle></CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentBookings.map((b) => (
                    <div key={b.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-bold">{b.service}</p>
                        <p className="text-sm text-gray-500">{b.customer} → {b.worker}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-bold">₹{b.amount}</span>
                        <Badge variant={b.status === "Completed" ? "default" : b.status === "In Progress" ? "secondary" : "outline"}>{b.status}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="ai">
            <Card>
              <CardHeader><CardTitle>AI Demand Forecasting</CardTitle></CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2"><span className="text-sm font-medium">Plumbing Demand (Next 7 days)</span><span className="text-sm text-green-600">+23% ↑</span></div>
                  <Progress value={78} className="h-3" />
                </div>
                <div>
                  <div className="flex justify-between mb-2"><span className="text-sm font-medium">Electrical Demand (Next 7 days)</span><span className="text-sm text-green-600">+15% ↑</span></div>
                  <Progress value={65} className="h-3" />
                </div>
                <div>
                  <div className="flex justify-between mb-2"><span className="text-sm font-medium">Cleaning Demand (Next 7 days)</span><span className="text-sm text-red-600">-5% ↓</span></div>
                  <Progress value={42} className="h-3" />
                </div>
                <div className="bg-blue-50 rounded-lg p-4">
                  <p className="text-sm font-bold text-blue-800 mb-1">💡 AI Recommendation</p>
                  <p className="text-sm text-blue-700">Plumbing demand is expected to surge 23% next week due to monsoon season. Recommend activating 12 standby plumbers and sending push notifications to customers about preventive maintenance.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="welfare">
            <Card>
              <CardHeader><CardTitle>Worker Welfare & Insurance</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-green-50 p-4 rounded-lg text-center">
                    <Shield className="w-8 h-8 text-green-600 mx-auto mb-2" />
                    <p className="font-bold">₹2.4L</p>
                    <p className="text-xs text-gray-500">Insurance Pool Balance</p>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg text-center">
                    <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                    <p className="font-bold">248</p>
                    <p className="text-xs text-gray-500">Workers Insured</p>
                  </div>
                  <div className="bg-orange-50 p-4 rounded-lg text-center">
                    <AlertTriangle className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                    <p className="font-bold">3</p>
                    <p className="text-xs text-gray-500">Active Claims</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}