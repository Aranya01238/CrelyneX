"use client";

import { useEffect, useState } from "react";
import Footer from "@/components/footer";
import LogoutButton from "@/components/logout-button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Users, 
  Activity, 
  ShieldCheck, 
  Target, 
  BarChart3,
  TrendingUp,
  Clock
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function HRPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col noise transition-all duration-500">
      <main className="flex-1 container mx-auto max-w-7xl px-4 py-16 sm:py-24 space-y-12">
        
        {/* HR Operations Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 reveal">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 glass-gold rounded-full px-4 py-1.5 text-[10px] font-bold tracking-[0.3em] text-amber-500 uppercase border border-amber-500/20">
              <ShieldCheck className="w-3 h-3" /> Operations Intelligence Node
            </div>
            <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tighter">
              HR <span className="text-gradient-gold">Ops Center</span>
            </h1>
            <p className="text-zinc-500 text-sm sm:text-base font-medium max-w-2xl italic">
              Supervising member lifecycles, operational throughput, and mission efficiency benchmarks.
            </p>
          </div>
          <LogoutButton variant="outline" className="text-amber-500 border-amber-500/20 hover:bg-amber-500/10" />
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 reveal delay-100">
          {[
            { label: "Active Nodes", val: "12", icon: Users, color: "text-amber-500" },
            { label: "Mission Completion", val: "84%", icon: Target, color: "text-purple-400" },
            { label: "Operational Velocity", val: "High", icon: TrendingUp, color: "text-emerald-400" },
            { label: "System Uptime", val: "99.9%", icon: Activity, color: "text-blue-400" },
          ].map((stat, i) => (
            <Card key={i} className="glass border-white/5 bg-white/2 hover:bg-white/5 transition-colors">
              <CardContent className="p-6 flex items-center gap-4">
                <div className={stat.color}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">{stat.label}</div>
                  <div className="text-2xl font-black text-white">{stat.val}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Console Section */}
        <section className="reveal delay-200">
          <Tabs defaultValue="roster" className="w-full">
            <div className="glass-gold rounded-[32px] p-2 border-amber-500/5 mb-8">
              <TabsList className="bg-transparent border-none w-full flex h-auto p-0 gap-2">
                <TabsTrigger value="roster" className="h-12 px-8 rounded-2xl flex-1 data-[state=active]:bg-amber-600 data-[state=active]:text-white data-[state=inactive]:text-zinc-500 data-[state=inactive]:hover:bg-white/5 transition-all gap-2 text-[10px] font-black uppercase tracking-widest">
                  <Users className="w-3.5 h-3.5" /> Team Roster
                </TabsTrigger>
                <TabsTrigger value="audit" className="h-12 px-8 rounded-2xl flex-1 data-[state=active]:bg-amber-600 data-[state=active]:text-white data-[state=inactive]:text-zinc-500 data-[state=inactive]:hover:bg-white/5 transition-all gap-2 text-[10px] font-black uppercase tracking-widest">
                  <BarChart3 className="w-3.5 h-3.5" /> Performance Audit
                </TabsTrigger>
              </TabsList>
            </div>

            <div className="min-h-[400px]">
              <TabsContent value="roster" className="mt-0">
                <Card className="glass border-white/5">
                   <CardHeader>
                     <CardTitle className="text-xl font-black uppercase tracking-widest text-zinc-300">Member Lifecycle Oversight</CardTitle>
                   </CardHeader>
                   <CardContent>
                      <div className="text-center py-20 italic text-zinc-600">
                        Synchronizing real-time member metrics and authorized credentials...
                        <div className="mt-4 text-[10px] not-italic font-black text-amber-500 uppercase tracking-[0.3em]">Module Online</div>
                      </div>
                   </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="audit" className="mt-0">
                <Card className="glass border-white/5">
                   <CardHeader>
                     <CardTitle className="text-xl font-black uppercase tracking-widest text-zinc-300">Operational Throughput Audit</CardTitle>
                   </CardHeader>
                   <CardContent>
                      <div className="text-center py-20 italic text-zinc-600">
                        Aggregate impact analysis and collective goal tracking initialized...
                        <div className="mt-4 text-[10px] not-italic font-black text-amber-500 uppercase tracking-[0.3em]">Deep Processing Active</div>
                      </div>
                   </CardContent>
                </Card>
              </TabsContent>
            </div>
          </Tabs>
        </section>
      </main>
      <Footer />
      
      <style jsx global>{`
        .glass-gold {
          background: rgba(251, 191, 36, 0.05);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(251, 191, 36, 0.1);
          box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.8);
        }
        .text-gradient-gold {
          background: linear-gradient(to right, #fbbf24, #d97706);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      `}</style>
    </div>
  );
}
