"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, 
  Image as ImageIcon, 
  Share2, 
  ChevronRight, 
  User, 
  ShieldCheck,
  CheckCircle2,
  Clock,
  Loader2,
  Activity,
  ShieldAlert
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import DashboardCore3D from "@/components/dashboard-core-3d";
import type { Task } from "@/lib/members";

export default function MemberPage() {
  const [name, setName] = useState("");
  const [portals, setPortals] = useState<string[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [creditPoints, setCreditPoints] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Read user info from cookies
    const getCookie = (name: string) => {
      const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
      return match ? decodeURIComponent(match[2]) : "";
    };

    setName(getCookie("crelynex-member-name") || "Member");
    const portalStr = getCookie("crelynex-member-portals");
    setPortals(portalStr ? portalStr.split(",") : []);

    const loadData = async () => {
      try {
        const [tasksRes, profileRes] = await Promise.all([
          fetch("/api/admin/tasks"),
          fetch("/api/member/profile")
        ]);
        if (tasksRes.ok) {
          const data = await tasksRes.json();
          setTasks(data);
        }
        if (profileRes.ok) {
          const data = await profileRes.json();
          setCreditPoints(data.creditPoints || 0);
        }
      } catch (err) {
        console.error("Data load error");
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const handleMarkFinished = async (id: string) => {
    try {
      const res = await fetch("/api/member/tasks", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (res.ok) {
        setTasks(prev => prev.map(t => t.id === id ? { ...t, memberMarkedDone: true } : t));
        toast.success("Mission declaration transmitted to Command Console.");
      }
    } catch (err) {
      console.error("Update error");
    }
  };

  const portalCards = [
    {
      id: "graphics",
      title: "Graphics Vault",
      desc: "Upload posters and videos to shared storage.",
      icon: <ImageIcon className="w-8 h-8" />,
      href: "/member/graphics",
      color: "from-purple-600/20 to-transparent",
      accent: "text-purple-400"
    },
    {
      id: "social",
      title: "Social Portal",
      desc: "Manage social media credentials and follower logs.",
      icon: <Share2 className="w-8 h-8" />,
      href: "/member/social",
      color: "from-purple-600/20 to-transparent",
      accent: "text-purple-400"
    },
    {
      id: "updates",
      title: "Impact Feed",
      desc: "File your daily performance numbers and event impact.",
      icon: <Activity className="w-8 h-8" />,
      href: "/member/updates",
      color: "from-purple-600/20 to-transparent",
      accent: "text-purple-400"
    }
  ];

  return (
    <div className="container mx-auto max-w-7xl px-4 py-16 sm:py-24 space-y-16">
      
      {/* Welcome Header */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center reveal">
        <div className="lg:col-span-12 xl:col-span-8 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 glass-red rounded-full px-4 py-1.5 text-[10px] font-bold tracking-[0.3em] text-red-500 uppercase">
              <LayoutDashboard className="w-3 h-3" /> Member Workspace
            </div>
            <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tighter">
              Welcome, <span className="text-gradient-red">{name}</span>
            </h1>
            <p className="text-zinc-500 text-sm sm:text-base font-medium max-w-xl italic leading-relaxed">
              Your centralized node for accessing CrelyneX resources, tracking mission objectives, and managing digital growth.
            </p>
          </div>
          <div className="flex items-center gap-6 glass p-4 rounded-[32px] border-white/5 h-fit">
            <div className="text-right">
              <div className="text-[10px] font-black text-purple-400 uppercase tracking-[0.3em] mb-1">Mission Credits</div>
              <div className="text-3xl font-black text-white">{creditPoints}</div>
            </div>
            <div className="h-12 w-px bg-white/10" />
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-2xl glass-purple flex items-center justify-center text-purple-400 font-black border border-purple-500/20">
                {name.charAt(0)}
              </div>
              <div className="pr-4">
                <div className="text-xs font-black text-white uppercase tracking-widest">{name}</div>
                <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Authorized Member</div>
              </div>
            </div>
          </div>
        </div>

        {/* 3D Dashboard Core Integration */}
        <div className="hidden xl:block xl:col-span-4 h-full relative group">
          <div className="absolute inset-0 bg-purple-500/20 blur-[100px] rounded-full opacity-50 group-hover:opacity-100 transition-opacity duration-1000" />
          <div className="h-[250px] w-full relative z-10">
            <DashboardCore3D />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Portal Access Grid */}
        <div className="lg:col-span-8 space-y-10 reveal-left delay-100">
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-purple-500" /> Authorized Nodes
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {portalCards.filter(p => portals.includes(p.id)).map(portal => (
                <Link 
                  key={portal.id} 
                  href={portal.href} 
                  className="group relative block rounded-[40px] p-px overflow-hidden transition-all duration-500 hover:scale-[1.02] active:scale-[0.98]"
                >
                  {/* Card Border Glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  <Card className="h-full border-white/5 bg-[#0a0a0a]/80 backdrop-blur-xl rounded-[40px] overflow-hidden shadow-2xl relative z-10">
                    <div className={`absolute inset-0 bg-gradient-to-br ${portal.color} opacity-40`} />
                    <CardHeader className="relative z-10 p-10 pb-4">
                      <div className="h-20 w-20 rounded-[28px] glass-purple flex items-center justify-center mb-8 border border-purple-500/10 group-hover:glow-purple group-hover:scale-110 transition-all duration-500">
                        <div className={cn("transition-transform duration-500 group-hover:scale-110", portal.accent)}>
                          {portal.icon}
                        </div>
                      </div>
                      <CardTitle className="text-3xl font-black text-white leading-tight">{portal.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="relative z-10 p-10 pt-0 space-y-8">
                      <p className="text-zinc-400 text-sm leading-relaxed font-medium">{portal.desc}</p>
                      <div className="flex items-center gap-3 text-[10px] font-black text-white/50 uppercase tracking-[0.3em] group-hover:text-purple-400 transition-colors">
                        Enter Workspace 
                        <div className="h-8 w-8 rounded-full border border-white/5 flex items-center justify-center group-hover:border-purple-500/50 group-hover:bg-purple-500/10 transition-all">
                          <ChevronRight className="w-4 h-4 translate-x-0 group-hover:translate-x-0.5 transition-transform" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
              {portals.length === 0 && (
                <div className="col-span-full py-24 glass rounded-[40px] border-dashed border-white/10 text-center space-y-4">
                  <ShieldCheck className="w-12 h-12 text-white/5 mx-auto" />
                  <p className="text-zinc-500 text-sm font-black uppercase tracking-widest leading-relaxed">No Authorized Portal Connections Found.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Tasks / Feed Side */}
        <div className="lg:col-span-4 space-y-10 reveal-right delay-200">
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white flex items-center gap-3">
              <Clock className="w-5 h-5 text-red-500" /> Active Missions
            </h3>
            <div className="space-y-4">
              {isLoading ? (
                <div className="flex items-center justify-center py-10">
                  <Loader2 className="animate-spin text-zinc-500" />
                </div>
              ) : (
                tasks.map(task => (
                  <div key={task.id} className="glass p-6 rounded-[32px] border-white/5 space-y-4 transition-all hover:bg-white/5 relative overflow-hidden group/task">
                    <div className="flex items-start justify-between relative z-10">
                      <div className="space-y-1">
                        <div className="flex items-center gap-3">
                          <h4 className="text-sm font-black text-white uppercase tracking-wide">{task.title}</h4>
                          <span className="text-[9px] font-black bg-purple-500/10 text-purple-400 px-1.5 py-0.5 rounded border border-purple-500/10">{task.points} CP</span>
                        </div>
                        <span className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest">
                          Assigned {new Date(task.assignedAt).toLocaleDateString()}
                        </span>
                      </div>
                      <div className={`px-2 py-1 rounded-full text-[8px] font-black uppercase tracking-widest ${
                        task.status === "done" ? "bg-emerald-500/10 text-emerald-500" : (task.memberMarkedDone ? "bg-purple-500/20 text-purple-300" : "bg-red-500/10 text-red-500")
                      }`}>
                        {task.status === "done" ? "Approved" : (task.memberMarkedDone ? "Awaiting Approval" : "Pending")}
                      </div>
                    </div>
                    <p className="text-xs text-zinc-500 italic leading-relaxed line-clamp-2 relative z-10">
                      "{task.description}"
                    </p>
                    
                    {task.status === "pending" && !task.memberMarkedDone && (
                      <Button 
                        onClick={() => handleMarkFinished(task.id)}
                        className="w-full h-10 bg-purple-600/10 hover:bg-purple-600 border border-purple-500/20 hover:border-purple-600 text-purple-400 hover:text-white text-[10px] font-black uppercase tracking-widest rounded-xl transition-all duration-300 relative z-10"
                      >
                        Declare Mission Finished
                      </Button>
                    )}
                  </div>
                ))
              )}
              {!isLoading && tasks.length === 0 && (
                <div className="py-12 glass rounded-2xl border-dashed border-white/10 text-center">
                  <p className="text-zinc-600 text-xs font-bold uppercase tracking-widest">No assigned missions.</p>
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
