// src/app/page.jsx
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Users, DollarSign, Heart, TrendingUp, Shield, MapPin,
  Smartphone, Brain, Star, Zap, Building2, Globe, CheckCircle2, ArrowRight, Lock
} from "lucide-react";

export default function Home() {
  const features = [
    { icon: Shield, title: "Verified Workers", desc: "Skill profiling, certification & background verification for every worker", color: "text-blue-600 bg-blue-50" },
    { icon: MapPin, title: "Geo-Location Matching", desc: "AI-powered matching connects you with the nearest available skilled worker", color: "text-green-600 bg-green-50" },
    { icon: Smartphone, title: "Multilingual App", desc: "Available in Hindi, Tamil, Telugu, Bengali and 8 more Indian languages", color: "text-purple-600 bg-purple-50" },
    { icon: Brain, title: "AI Demand Forecasting", desc: "Smart workforce allocation predicts demand and optimizes worker availability", color: "text-orange-600 bg-orange-50" },
    { icon: Heart, title: "Worker Welfare", desc: "Built-in insurance, fair wages, and cooperative ownership for every worker", color: "text-red-600 bg-red-50" },
    { icon: Building2, title: "Federation Dashboard", desc: "Complete admin tools for Labour Cooperative Federations to manage operations", color: "text-indigo-600 bg-indigo-50" },
  ];

  const services = [
    "Electricians", "Plumbers", "Carpenters", "Painters",
    "Domestic Helpers", "Caregivers", "Drivers", "Gardeners",
    "Cleaners", "Technicians"
  ];

  return (
    <main className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold leading-tight">Sahakari Seva</h1>
              <p className="text-[10px] text-gray-500 leading-tight">Cooperative Gig Platform</p>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm">
            <a href="#features" className="hover:text-blue-600 transition">Features</a>
            <a href="#services" className="hover:text-blue-600 transition">Services</a>
            <a href="#how-it-works" className="hover:text-blue-600 transition">How It Works</a>
            <a href="#impact" className="hover:text-blue-600 transition">Impact</a>
            <Link href="/digilocker-info" className="hover:text-blue-600 transition">DigiLocker</Link>
          </div>
          <div className="flex gap-2">
            <Link href="/login"><Button variant="outline" size="sm">Login</Button></Link>
            <Link href="/demo"><Button size="sm">Live Demo</Button></Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="container mx-auto px-4 py-20 md:py-28">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 text-sm px-4 py-1" variant="secondary">
              SIH 2026 • Problem Statement 26089
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Cooperative-Owned
              </span>
              <br />
              Digital Service Marketplace
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Connecting Labour Cooperative Federations' skilled workers with households and institutions. 
              Fair wages. Worker ownership. Community impact.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/demo">
                <Button size="lg" className="px-8 text-base">
                  View Interactive Demo <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Link href="/register">
                <Button size="lg" variant="outline" className="px-8 text-base">
                  Register as Worker
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white border-y">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto text-center">
            <div>
              <p className="text-3xl md:text-4xl font-bold text-blue-600">10+</p>
              <p className="text-sm text-gray-500 mt-1">Service Categories</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-bold text-green-600">80%</p>
              <p className="text-sm text-gray-500 mt-1">Goes to Worker</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-bold text-purple-600">15%</p>
              <p className="text-sm text-gray-500 mt-1">Community Fund</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-bold text-orange-600">12+</p>
              <p className="text-sm text-gray-500 mt-1">Languages Supported</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">Skilled Worker Categories</h2>
          <p className="text-gray-600 text-center mb-10 max-w-2xl mx-auto">
            Labour Cooperative Federations possess a large pool of verified, skilled workers ready to serve your household and community needs.
          </p>
          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {services.map((service) => (
              <Badge key={service} variant="outline" className="px-4 py-2 text-sm hover:bg-blue-50 hover:border-blue-300 transition cursor-pointer">
                {service}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">Platform Features</h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Every feature designed to ensure fair wages, worker welfare, and consumer trust.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <Card key={i} className="hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${f.color}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-bold text-lg mb-2">{f.title}</h3>
                    <p className="text-gray-600 text-sm">{f.desc}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* DigiLocker Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-white/20 text-white border-white/30" variant="outline">
                Government Initiative
              </Badge>
              <h2 className="text-3xl font-bold mb-4">Powered by DigiLocker</h2>
              <p className="text-blue-100 max-w-2xl mx-auto">
                Instant, secure verification of worker credentials through Government of India's digital infrastructure
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4">
                    <Shield className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">Instant Verification</h3>
                  <p className="text-sm text-blue-100">
                    Aadhaar, PAN, and skill certificates verified in seconds through DigiLocker API. No manual document checking.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4">
                    <Lock className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">Secure & Private</h3>
                  <p className="text-sm text-blue-100">
                    Encrypted data transfer. We only receive verification status, not actual documents. GDPR compliant.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">Fraud Prevention</h3>
                  <p className="text-sm text-blue-100">
                    Cryptographically signed documents from government sources. Zero chance of fake certificates.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="mt-8 bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <h3 className="font-bold text-lg mb-4 text-center">How DigiLocker Verification Works</h3>
              <div className="grid md:grid-cols-4 gap-4">
                {[
                  { step: "1", title: "Worker Clicks", desc: "Worker clicks 'Verify with DigiLocker' on registration" },
                  { step: "2", title: "Redirects", desc: "Securely redirected to DigiLocker portal for authentication" },
                  { step: "3", title: "Consent", desc: "Worker grants consent to share verification status" },
                  { step: "4", title: "Verified", desc: "Platform receives instant verification confirmation" },
                ].map((item) => (
                  <div key={item.step} className="text-center">
                    <div className="w-10 h-10 bg-white text-blue-600 rounded-full flex items-center justify-center font-bold mx-auto mb-2">
                      {item.step}
                    </div>
                    <p className="font-semibold text-sm mb-1">{item.title}</p>
                    <p className="text-xs text-blue-100">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-16 bg-blue-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              { step: "1", title: "Register & Verify", desc: "Workers register through their Cooperative Federation. Skills are profiled and certified." },
              { step: "2", title: "Customer Books", desc: "Households search, compare, and book verified workers with geo-location matching." },
              { step: "3", title: "Service Delivered", desc: "Worker completes the job. Customer rates and provides feedback." },
              { step: "4", title: "Fair Payment", desc: "80% to worker, 15% to community fund, 5% platform fee. Transparent invoicing." },
            ].map((item) => (
              <Card key={item.step} className="text-center hover:shadow-lg transition">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                    {item.step}
                  </div>
                  <h3 className="font-bold mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Cooperative Model */}
      <section id="impact" className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">The Cooperative Difference</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <Card className="border-red-200 bg-red-50">
              <CardHeader>
                <CardTitle className="text-red-700">❌ Private Platforms</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {["20-30% commission taken", "No worker ownership", "No community reinvestment", "Workers are replaceable contractors", "Top-down governance"].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm text-red-800">
                    <span>•</span> {item}
                  </div>
                ))}
              </CardContent>
            </Card>
            <Card className="border-green-200 bg-green-50">
              <CardHeader>
                <CardTitle className="text-green-700">✅ Sahakari Seva</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {["Only 5% platform fee", "Workers earn cooperative shares", "15% goes to community fund", "Workers are owners with voting rights", "Democratic governance"].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm text-green-800">
                    <CheckCircle2 className="w-4 h-4 text-green-600" /> {item}
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Gig Work in India?</h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Join the cooperative movement. Fair wages, worker ownership, community impact.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/demo">
              <Button size="lg" variant="secondary" className="px-8">
                Launch Interactive Demo
              </Button>
            </Link>
            <Link href="/register">
              <Button size="lg" variant="outline" className="px-8 border-white text-white hover:bg-white hover:text-blue-600">
                Register Now
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8">
        <div className="container mx-auto px-4 text-center text-sm">
          <p>© 2026 Sahakari Seva • Cooperative Gig Platform • SIH 2026 - PS 26089</p>
          <p className="mt-2">Built for Labour Cooperative Federations & Societies of India</p>
        </div>
      </footer>
    </main>
  );
}