"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/header";
import Footer from "@/components/footer";
import AdminEventsCoursesManager from "@/components/admin-events-courses-manager";
import AdminMembersManager from "@/components/admin-members-manager";
import AdminTasksManager from "@/components/admin-tasks-manager";
import AdminSocialCredentialsManager from "@/components/admin-social-credentials-manager";
import AdminLogoutButton from "@/components/admin-logout-button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ShieldCheck, Calendar, Users, Briefcase, Key } from "lucide-react";

export default function AdminPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col noise">
      <Header />

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
              Centralized management system for CrelyneX events, member permissions, work tasking, and sensitive social credentials.
            </p>
          </div>
          <AdminLogoutButton />
        </div>

        {/* Console / Tabs Section */}
        <section className="reveal delay-100">
          <Tabs defaultValue="events" className="w-full">
            <div className="glass rounded-[32px] p-2 border-white/5 mb-8 overflow-x-auto">
              <TabsList className="bg-transparent border-none w-full flex justify-start sm:justify-center h-auto p-0 gap-2">
                <TabsTrigger value="events" className="h-12 px-6 rounded-2xl flex-1 sm:flex-none data-[state=active]:bg-red-600 data-[state=active]:text-white data-[state=inactive]:text-zinc-500 data-[state=inactive]:hover:bg-white/5 transition-all gap-2 text-[10px] font-black uppercase tracking-widest">
                  <Calendar className="w-3.5 h-3.5" /> Events/Courses
                </TabsTrigger>
                <TabsTrigger value="members" className="h-12 px-6 rounded-2xl flex-1 sm:flex-none data-[state=active]:bg-red-600 data-[state=active]:text-white data-[state=inactive]:text-zinc-500 data-[state=inactive]:hover:bg-white/5 transition-all gap-2 text-[10px] font-black uppercase tracking-widest">
                  <Users className="w-3.5 h-3.5" /> Members
                </TabsTrigger>
                <TabsTrigger value="tasks" className="h-12 px-6 rounded-2xl flex-1 sm:flex-none data-[state=active]:bg-red-600 data-[state=active]:text-white data-[state=inactive]:text-zinc-500 data-[state=inactive]:hover:bg-white/5 transition-all gap-2 text-[10px] font-black uppercase tracking-widest">
                  <Briefcase className="w-3.5 h-3.5" /> Tasks
                </TabsTrigger>
                <TabsTrigger value="social" className="h-12 px-6 rounded-2xl flex-1 sm:flex-none data-[state=active]:bg-red-600 data-[state=active]:text-white data-[state=inactive]:text-zinc-500 data-[state=inactive]:hover:bg-white/5 transition-all gap-2 text-[10px] font-black uppercase tracking-widest">
                  <Key className="w-3.5 h-3.5" /> Social Creds
                </TabsTrigger>
              </TabsList>
            </div>

            <div className="space-y-8 min-h-[600px]">
              <TabsContent value="events" className="mt-0 focus-visible:outline-none">
                <AdminEventsCoursesManager />
              </TabsContent>
              <TabsContent value="members" className="mt-0 focus-visible:outline-none">
                <AdminMembersManager />
              </TabsContent>
              <TabsContent value="tasks" className="mt-0 focus-visible:outline-none">
                <AdminTasksManager />
              </TabsContent>
              <TabsContent value="social" className="mt-0 focus-visible:outline-none">
                <AdminSocialCredentialsManager />
              </TabsContent>
            </div>
          </Tabs>
        </section>
      </main>

      <Footer />
    </div>
  );
}
