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
  Loader2
} from "lucide-react";
import type { Task } from "@/lib/members";

export default function MemberPage() {
  const [name, setName] = useState("");
  const [portals, setPortals] = useState<string[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
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

    const loadTasks = async () => {
      try {
        const res = await fetch("/api/admin/tasks");
        if (res.ok) {
          const data = await res.json();
          setTasks(data);
        }
      } catch (err) {
        console.error("Task load error");
      } finally {
        setIsLoading(false);
      }
    };

    loadTasks();
  }, []);

  const portalCards = [
    {
      id: "graphics",
      title: "Graphics Portal",
      desc: "Upload posters and videos to shared storage.",
      icon: <ImageIcon className="w-8 h-8 text-red-500" />,
      href: "/member/graphics",
      color: "from-red-600/10 to-transparent"
    },
    {
      id: "social",
      title: "Social Portal",
      desc: "Manage social media credentials and growth logs.",
      icon: <Share2 className="w-8 h-8 text-emerald-500" />,
      href: "/member/social",
      color: "from-emerald-600/10 to-transparent"
    }
  ];

  return (
    <div className="container mx-auto max-w-7xl px-4 py-16 sm:py-24 space-y-16">
      
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 reveal">
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
        <div className="hidden lg:flex items-center gap-4 glass p-4 rounded-[28px] border-white/5">
          <div className="h-12 w-12 rounded-2xl glass-red flex items-center justify-center text-red-500 font-black">
            {name.charAt(0)}
          </div>
          <div className="pr-4">
            <div className="text-xs font-black text-white uppercase tracking-widest">{name}</div>
            <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Authorized Member</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Portal Access Grid */}
        <div className="lg:col-span-8 space-y-10 reveal-left delay-100">
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-red-500" /> Authorized Portals
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {portalCards.filter(p => portals.includes(p.id)).map(portal => (
                <Link key={portal.id} href={portal.href} className="group">
                  <Card className={`h-full border-white/5 bg-[#0a0a0a] rounded-[32px] overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:bg-white/5 shadow-2xl`}>
                    <div className={`absolute inset-0 bg-gradient-to-br ${portal.color} opacity-40`} />
                    <CardHeader className="relative z-10 p-8 pb-4">
                      <div className="h-16 w-16 rounded-2xl glass flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                        {portal.icon}
                      </div>
                      <CardTitle className="text-2xl font-black text-white">{portal.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="relative z-10 p-8 pt-0 space-y-6">
                      <p className="text-zinc-400 text-sm leading-relaxed">{portal.desc}</p>
                      <div className="flex items-center gap-2 text-xs font-black text-white uppercase tracking-widest group-hover:text-red-500 transition-colors">
                        Enter Workspace <ChevronRight className="w-4 h-4" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
              {portals.length === 0 && (
                <div className="col-span-2 py-20 glass rounded-[32px] border-dashed border-white/10 text-center">
                  <p className="text-zinc-500 text-sm font-medium">No portals currently authorized by Admin.</p>
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
                  <div key={task.id} className="glass p-6 rounded-[28px] border-white/5 space-y-4 transition-all hover:bg-white/5">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <h4 className="text-sm font-black text-white uppercase tracking-wide">{task.title}</h4>
                        <span className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest">
                          Assigned {new Date(task.assignedAt).toLocaleDateString()}
                        </span>
                      </div>
                      <div className={`px-2 py-1 rounded-full text-[8px] font-black uppercase tracking-widest ${
                        task.status === "done" ? "bg-emerald-500/10 text-emerald-500" : "bg-red-500/10 text-red-500"
                      }`}>
                        {task.status}
                      </div>
                    </div>
                    <p className="text-xs text-zinc-500 italic leading-relaxed line-clamp-2">
                      "{task.description}"
                    </p>
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
