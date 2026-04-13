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
  Clock,
  Briefcase
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import AdminMembersManager from "@/components/admin-members-manager";
import AdminTasksManager from "@/components/admin-tasks-manager";
import AdminUpdatesManager from "@/components/admin-updates-manager";

function Admin2AuditLogs() {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/logs")
      .then(res => res.json())
      .then(data => {
        setLogs(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
         <h3 className="text-xl font-bold text-white flex items-center gap-3">
           <Clock className="w-5 h-5 text-indigo-500" /> Member Access Audit
         </h3>
         <div className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Governance Buffer [Admin2]</div>
      </div>
      
      <div className="glass rounded-[32px] border-white/5 overflow-hidden">
        {loading ? (
          <div className="p-20 text-center italic text-zinc-500">Retrieving system logs...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white/5 border-b border-white/5">
                  <th className="px-6 py-4 text-[10px] font-black text-zinc-500 uppercase tracking-widest">Entity</th>
                  <th className="px-6 py-4 text-[10px] font-black text-zinc-500 uppercase tracking-widest">Protocol</th>
                  <th className="px-6 py-4 text-[10px] font-black text-zinc-500 uppercase tracking-widest">Timestamp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {logs.map((log) => (
                  <tr key={log.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-6 py-4">
                       <div className="flex items-center gap-2">
                         <div className="h-1.5 w-1.5 rounded-full bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.5)]" />
                         <span className="text-sm font-bold text-zinc-300">{log.userId}</span>
                       </div>
                    </td>
                    <td className="px-6 py-4 text-xs font-medium text-zinc-400">{log.action}</td>
                    <td className="px-6 py-4 text-xs font-mono text-zinc-500">{new Date(log.timestamp).toLocaleString()}</td>
                  </tr>
                ))}
                {logs.length === 0 && (
                  <tr>
                    <td colSpan={3} className="px-6 py-12 text-center text-zinc-600 italic">No activity matching the governance criteria.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Admin2Page() {
  const [mounted, setMounted] = useState(false);
  const [stats, setStats] = useState({
    activeNodes: "...",
    missionCompletion: "...",
    operationalVelocity: "...",
    systemUptime: "..."
  });

  const loadStats = async () => {
    try {
      const res = await fetch("/api/admin/stats");
      if (res.ok) {
        const data = await res.json();
        setStats(data);
      }
    } catch {}
  };

  useEffect(() => {
    setMounted(true);
    loadStats();
    const interval = setInterval(loadStats, 30000);
    return () => clearInterval(interval);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col noise transition-all duration-500">
      <main className="flex-1 container mx-auto max-w-7xl px-4 py-16 sm:py-24 space-y-12">
        
        {/* Admin2 Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 reveal">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 glass-cobalt rounded-full px-4 py-1.5 text-[10px] font-bold tracking-[0.3em] text-indigo-500 uppercase border border-indigo-500/20">
              <ShieldCheck className="w-3 h-3" /> System Governance Core
            </div>
            <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tighter">
              Admin2 <span className="text-gradient-cobalt">Console</span>
            </h1>
            <p className="text-zinc-500 text-sm sm:text-base font-medium max-w-2xl italic">
              Distributed oversight of member nodes, mission throughput, and system-wide synchronization.
            </p>
          </div>
          <LogoutButton variant="outline" className="text-indigo-500 border-indigo-500/20 hover:bg-indigo-500/10" />
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 reveal delay-100">
          {[
            { label: "Active Nodes", val: stats.activeNodes, icon: Users, color: "text-indigo-500" },
            { label: "Mission Completion", val: stats.missionCompletion, icon: Target, color: "text-purple-400" },
            { label: "Operational Velocity", val: stats.operationalVelocity, icon: TrendingUp, color: "text-emerald-400" },
            { label: "System Uptime", val: stats.systemUptime, icon: Activity, color: "text-blue-400" },
          ].map((stat, i) => (
            <Card key={i} className="glass border-white/5 bg-white/2 hover:bg-white/5 transition-all duration-500 hover:scale-[1.02]">
              <CardContent className="p-6 flex items-center gap-4">
                <div className={`${stat.color} transition-transform duration-500 ${stats.activeNodes === "..." ? "animate-pulse" : ""}`}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">{stat.label}</div>
                  <div className="text-2xl font-black text-white lining-nums">{stat.val}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Console Section */}
        <section className="reveal delay-200">
          <Tabs defaultValue="roster" className="w-full">
            <div className="glass-cobalt rounded-[32px] p-2 border-indigo-500/5 mb-8">
              <TabsList className="bg-transparent border-none w-full flex h-auto p-0 gap-2">
                <TabsTrigger value="roster" className="h-12 px-8 rounded-2xl flex-1 data-[state=active]:bg-indigo-600 data-[state=active]:text-white data-[state=inactive]:text-zinc-500 data-[state=inactive]:hover:bg-white/5 transition-all gap-2 text-[10px] font-black uppercase tracking-widest">
                  <Users className="w-3.5 h-3.5" /> Team Roster
                </TabsTrigger>
                <TabsTrigger value="audit" className="h-12 px-8 rounded-2xl flex-1 data-[state=active]:bg-indigo-600 data-[state=active]:text-white data-[state=inactive]:text-zinc-500 data-[state=inactive]:hover:bg-white/5 transition-all gap-2 text-[10px] font-black uppercase tracking-widest">
                  <BarChart3 className="w-3.5 h-3.5" /> Performance Audit
                </TabsTrigger>
                <TabsTrigger value="tasks" className="h-12 px-8 rounded-2xl flex-1 data-[state=active]:bg-indigo-600 data-[state=active]:text-white data-[state=inactive]:text-zinc-500 data-[state=inactive]:hover:bg-white/5 transition-all gap-2 text-[10px] font-black uppercase tracking-widest">
                  <Briefcase className="w-3.5 h-3.5" /> Missions & Tasks
                </TabsTrigger>
                <TabsTrigger value="logs" className="h-12 px-8 rounded-2xl flex-1 data-[state=active]:bg-indigo-600 data-[state=active]:text-white data-[state=inactive]:text-zinc-500 data-[state=inactive]:hover:bg-white/5 transition-all gap-2 text-[10px] font-black uppercase tracking-widest">
                  <Clock className="w-3.5 h-3.5" /> Access Audit
                </TabsTrigger>
              </TabsList>
            </div>

            <div className="min-h-[400px]">
              <TabsContent value="roster" className="mt-0">
                <AdminMembersManager theme="blue" />
              </TabsContent>
              <TabsContent value="audit" className="mt-0">
                <AdminUpdatesManager theme="blue" />
              </TabsContent>
              <TabsContent value="tasks" className="mt-0">
                <AdminTasksManager theme="blue" />
              </TabsContent>
              <TabsContent value="logs" className="mt-0">
                <Admin2AuditLogs />
              </TabsContent>
            </div>
          </Tabs>
        </section>
      </main>
      <Footer />
      
      <style jsx global>{`
        .glass-cobalt {
          background: rgba(79, 70, 229, 0.05);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(79, 70, 229, 0.1);
          box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.8);
        }
        .text-gradient-cobalt {
          background: linear-gradient(to right, #6366f1, #3b82f6);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      `}</style>
    </div>
  );
}
