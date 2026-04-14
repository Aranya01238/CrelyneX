"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Footer from "@/components/footer";
import AdminEventsCoursesManager from "@/components/admin-events-courses-manager";
import AdminMembersManager from "@/components/admin-members-manager";
import AdminTasksManager from "@/components/admin-tasks-manager";
import AdminSocialCredentialsManager from "@/components/admin-social-credentials-manager";
import AdminUpdatesManager from "@/components/admin-updates-manager";
import AdminArchitectsManager from "@/components/admin-architects-manager";
import LogoutButton from "@/components/logout-button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ShieldCheck,
  Calendar,
  Users,
  Briefcase,
  Key,
  Activity,
  Clock,
  Building2,
  Image as ImageIcon,
  Video,
} from "lucide-react";

type GraphicsSyncItem = {
  id: string;
  title: string;
  type: "poster" | "video";
  url: string;
  uploadedBy: string;
  uploadedByName: string;
  uploadedAt: string;
};

export default function AdminPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col noise">
      <main className="flex-1 container mx-auto max-w-7xl px-4 py-16 sm:py-24 space-y-12">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 reveal">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 glass-red rounded-full px-4 py-1.5 text-[10px] font-bold tracking-[0.3em] text-red-500 uppercase">
              <ShieldCheck className="w-3 h-3" /> System Control Overview
            </div>
            <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tighter">
              Admin <span className="text-gradient-red">Portal</span>
            </h1>
            <p className="text-zinc-500 text-sm sm:text-base font-medium max-w-2xl">
              Centralized management system for CrelyneX events, member
              permissions, work tasking, and sensitive social credentials.
            </p>
          </div>
          <LogoutButton
            variant="outline"
            className="text-red-500 border-red-500/20 hover:bg-red-500/10"
          />
        </div>

        {/* Console / Tabs Section */}
        <section className="reveal delay-100">
          <Tabs defaultValue="events" className="w-full">
            <div className="glass rounded-4xl p-2 border-white/5 mb-8 overflow-x-auto">
              <TabsList className="bg-transparent border-none w-full flex justify-start sm:justify-center h-auto p-0 gap-2">
                <TabsTrigger
                  value="events"
                  className="h-12 px-6 rounded-2xl flex-1 sm:flex-none data-[state=active]:bg-red-600 data-[state=active]:text-white data-[state=inactive]:text-zinc-500 data-[state=inactive]:hover:bg-white/5 transition-all gap-2 text-[10px] font-black uppercase tracking-widest"
                >
                  <Calendar className="w-3.5 h-3.5" /> Events/Courses
                </TabsTrigger>
                <TabsTrigger
                  value="members"
                  className="h-12 px-6 rounded-2xl flex-1 sm:flex-none data-[state=active]:bg-red-600 data-[state=active]:text-white data-[state=inactive]:text-zinc-500 data-[state=inactive]:hover:bg-white/5 transition-all gap-2 text-[10px] font-black uppercase tracking-widest"
                >
                  <Users className="w-3.5 h-3.5" /> Members
                </TabsTrigger>
                <TabsTrigger
                  value="tasks"
                  className="h-12 px-6 rounded-2xl flex-1 sm:flex-none data-[state=active]:bg-red-600 data-[state=active]:text-white data-[state=inactive]:text-zinc-500 data-[state=inactive]:hover:bg-white/5 transition-all gap-2 text-[10px] font-black uppercase tracking-widest"
                >
                  <Briefcase className="w-3.5 h-3.5" /> Tasks
                </TabsTrigger>
                <TabsTrigger
                  value="social"
                  className="h-12 px-6 rounded-2xl flex-1 sm:flex-none data-[state=active]:bg-red-600 data-[state=active]:text-white data-[state=inactive]:text-zinc-500 data-[state=inactive]:hover:bg-white/5 transition-all gap-2 text-[10px] font-black uppercase tracking-widest"
                >
                  <Key className="w-3.5 h-3.5" /> Social Creds
                </TabsTrigger>
                <TabsTrigger
                  value="updates"
                  className="h-12 px-6 rounded-2xl flex-1 sm:flex-none data-[state=active]:bg-red-600 data-[state=active]:text-white data-[state=inactive]:text-zinc-500 data-[state=inactive]:hover:bg-white/5 transition-all gap-2 text-[10px] font-black uppercase tracking-widest"
                >
                  <Activity className="w-3.5 h-3.5" /> Updates Feed
                </TabsTrigger>
                <TabsTrigger
                  value="architects"
                  className="h-12 px-6 rounded-2xl flex-1 sm:flex-none data-[state=active]:bg-red-600 data-[state=active]:text-white data-[state=inactive]:text-zinc-500 data-[state=inactive]:hover:bg-white/5 transition-all gap-2 text-[10px] font-black uppercase tracking-widest"
                >
                  <Building2 className="w-3.5 h-3.5" /> Architects
                </TabsTrigger>
                <TabsTrigger
                  value="audit"
                  className="h-12 px-6 rounded-2xl flex-1 sm:flex-none data-[state=active]:bg-red-600 data-[state=active]:text-white data-[state=inactive]:text-zinc-500 data-[state=inactive]:hover:bg-white/5 transition-all gap-2 text-[10px] font-black uppercase tracking-widest"
                >
                  <Clock className="w-3.5 h-3.5" /> Systems Audit
                </TabsTrigger>
                <TabsTrigger
                  value="crelynex-sync"
                  className="h-12 px-6 rounded-2xl flex-1 sm:flex-none data-[state=active]:bg-red-600 data-[state=active]:text-white data-[state=inactive]:text-zinc-500 data-[state=inactive]:hover:bg-white/5 transition-all gap-2 text-[10px] font-black uppercase tracking-widest"
                >
                  <Activity className="w-3.5 h-3.5" /> CrelyneX Sync
                </TabsTrigger>
              </TabsList>
            </div>

            <div className="space-y-8 min-h-150">
              <TabsContent
                value="events"
                className="mt-0 focus-visible:outline-none"
              >
                <AdminEventsCoursesManager />
              </TabsContent>
              <TabsContent
                value="members"
                className="mt-0 focus-visible:outline-none"
              >
                <AdminMembersManager />
              </TabsContent>
              <TabsContent
                value="tasks"
                className="mt-0 focus-visible:outline-none"
              >
                <AdminTasksManager />
              </TabsContent>
              <TabsContent
                value="social"
                className="mt-0 focus-visible:outline-none"
              >
                <AdminSocialCredentialsManager />
              </TabsContent>
              <TabsContent
                value="updates"
                className="mt-0 focus-visible:outline-none"
              >
                <AdminUpdatesManager />
              </TabsContent>
              <TabsContent
                value="architects"
                className="mt-0 focus-visible:outline-none"
              >
                <AdminArchitectsManager />
              </TabsContent>
              <TabsContent
                value="audit"
                className="mt-0 focus-visible:outline-none"
              >
                <AdminAuditLogs />
              </TabsContent>
              <TabsContent
                value="crelynex-sync"
                className="mt-0 focus-visible:outline-none"
              >
                <AdminGraphicsSync />
              </TabsContent>
            </div>
          </Tabs>
        </section>
      </main>

      <Footer />
    </div>
  );
}

function AdminAuditLogs() {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/logs")
      .then((r) => r.json())
      .then((data) => setLogs(Array.isArray(data) ? data : []))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-white flex items-center gap-3">
          <Clock className="w-5 h-5 text-red-500" /> Operational Audit Logs
        </h3>
        <div className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">
          Real-time Logging Active
        </div>
      </div>

      <div className="glass rounded-4xl border-white/5 overflow-hidden">
        {loading ? (
          <div className="p-20 text-center italic text-zinc-500">
            Retrieving secure logs...
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white/5 border-b border-white/5">
                  <th className="px-6 py-4 text-[10px] font-black text-zinc-500 uppercase tracking-widest">
                    Target
                  </th>
                  <th className="px-6 py-4 text-[10px] font-black text-zinc-500 uppercase tracking-widest">
                    Access Protocol
                  </th>
                  <th className="px-6 py-4 text-[10px] font-black text-zinc-500 uppercase tracking-widest">
                    Timestamp
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {logs.map((log) => (
                  <tr
                    key={log.id}
                    className="hover:bg-white/2 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div
                          className={`h-1.5 w-1.5 rounded-full ${
                            log.role === "admin"
                              ? "bg-red-500"
                              : log.role === "hr"
                                ? "bg-amber-500"
                                : "bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.5)]"
                          }`}
                        />
                        <span
                          className={`text-sm font-bold ${
                            log.role === "admin"
                              ? "text-white"
                              : log.role === "hr"
                                ? "text-zinc-200"
                                : "text-zinc-300"
                          }`}
                        >
                          {log.userId}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-xs font-medium text-zinc-400">
                      {log.action}
                    </td>
                    <td className="px-6 py-4 text-xs font-mono text-zinc-500">
                      {new Date(log.timestamp).toLocaleString()}
                    </td>
                  </tr>
                ))}
                {logs.length === 0 && (
                  <tr>
                    <td
                      colSpan={3}
                      className="px-6 py-12 text-center text-zinc-600 italic"
                    >
                      No access logs found in the core buffer.
                    </td>
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

function AdminGraphicsSync() {
  const [items, setItems] = useState<GraphicsSyncItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadGraphicsSync = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/graphics");
      if (!res.ok) throw new Error("Failed to load sync status.");
      const data = await res.json();
      setItems(Array.isArray(data) ? data : []);
    } catch {
      setError(
        "Unable to retrieve synchronization data from Graphics workspace.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadGraphicsSync();
    const interval = setInterval(loadGraphicsSync, 30000);
    return () => clearInterval(interval);
  }, []);

  const posterCount = items.filter((item) => item.type === "poster").length;
  const videoCount = items.filter((item) => item.type === "video").length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="space-y-2">
          <h3 className="text-xl font-bold text-white">
            CrelyneX Graphics Synchronization
          </h3>
          <p className="text-xs text-zinc-500">
            Monitor synchronized assets from the Graphics workspace in
            real-time.
          </p>
        </div>
        <Badge className="w-fit border border-red-500/30 bg-red-500/10 text-red-300 text-[10px] font-black uppercase tracking-widest px-3 py-1.5">
          ID: CrelyneX
        </Badge>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="glass border-white/5 bg-white/2">
          <CardHeader className="pb-2">
            <CardTitle className="text-[10px] font-black uppercase tracking-widest text-zinc-500">
              Synchronized Total
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-3xl font-black text-white lining-nums">
              {items.length}
            </div>
          </CardContent>
        </Card>
        <Card className="glass border-white/5 bg-white/2">
          <CardHeader className="pb-2">
            <CardTitle className="text-[10px] font-black uppercase tracking-widest text-zinc-500 flex items-center gap-2">
              <ImageIcon className="w-3.5 h-3.5 text-red-400" /> Poster Assets
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-3xl font-black text-white lining-nums">
              {posterCount}
            </div>
          </CardContent>
        </Card>
        <Card className="glass border-white/5 bg-white/2">
          <CardHeader className="pb-2">
            <CardTitle className="text-[10px] font-black uppercase tracking-widest text-zinc-500 flex items-center gap-2">
              <Video className="w-3.5 h-3.5 text-red-400" /> Video Assets
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-3xl font-black text-white lining-nums">
              {videoCount}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="glass rounded-4xl border-white/5 overflow-hidden">
        {loading ? (
          <div className="p-16 text-center italic text-zinc-500">
            Syncing Graphics workspace records...
          </div>
        ) : error ? (
          <div className="p-16 text-center text-red-400">{error}</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white/5 border-b border-white/5">
                  <th className="px-6 py-4 text-[10px] font-black text-zinc-500 uppercase tracking-widest">
                    Asset
                  </th>
                  <th className="px-6 py-4 text-[10px] font-black text-zinc-500 uppercase tracking-widest">
                    Type
                  </th>
                  <th className="px-6 py-4 text-[10px] font-black text-zinc-500 uppercase tracking-widest">
                    Uploader
                  </th>
                  <th className="px-6 py-4 text-[10px] font-black text-zinc-500 uppercase tracking-widest">
                    URL
                  </th>
                  <th className="px-6 py-4 text-[10px] font-black text-zinc-500 uppercase tracking-widest">
                    Synchronized At
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {items.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-white/2 transition-colors"
                  >
                    <td className="px-6 py-4 text-sm font-bold text-zinc-300">
                      {item.title}
                    </td>
                    <td className="px-6 py-4 text-xs font-medium text-zinc-400 uppercase tracking-wide">
                      {item.type}
                    </td>
                    <td className="px-6 py-4 text-xs font-medium text-zinc-400">
                      {item.uploadedByName} ({item.uploadedBy})
                    </td>
                    <td className="px-6 py-4 text-xs font-medium text-zinc-400 max-w-70">
                      {item.url ? (
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-red-300 hover:text-red-200 underline underline-offset-4 break-all"
                        >
                          {item.url}
                        </a>
                      ) : (
                        <span className="text-zinc-600">N/A</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-xs font-mono text-zinc-500">
                      {new Date(item.uploadedAt).toLocaleString()}
                    </td>
                  </tr>
                ))}
                {items.length === 0 && (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-6 py-12 text-center text-zinc-600 italic"
                    >
                      No synchronized graphics records found.
                    </td>
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
