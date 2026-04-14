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
import {
  ShieldCheck,
  Calendar,
  Users,
  Briefcase,
  Key,
  Activity,
  Clock,
  Building2,
} from "lucide-react";

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
