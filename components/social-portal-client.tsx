"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Loader2, 
  Share2, 
  Eye, 
  EyeOff, 
  TrendingUp, 
  Save, 
  Instagram, 
  Facebook, 
  Linkedin, 
  ShieldCheck,
  History,
  Lock
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import type { SocialCredentials, SocialPlatform, FollowerEntry } from "@/lib/social";

export default function SocialPortalClient() {
  const [creds, setCreds] = useState<SocialCredentials>({});
  const [followerData, setFollowerData] = useState<Record<SocialPlatform, FollowerEntry[]>>({
    instagram: [],
    facebook: [],
    linkedin: []
  });
  const [showPass, setShowPass] = useState<Record<string, boolean>>({});
  const [inputs, setInputs] = useState<Record<SocialPlatform, string>>({
    instagram: "",
    facebook: "",
    linkedin: ""
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [credsRes, followersRes] = await Promise.all([
        fetch("/api/social/credentials", { cache: "no-store" }),
        fetch("/api/social/followers", { cache: "no-store" })
      ]);
      if (credsRes.ok) setCreds(await credsRes.json());
      if (followersRes.ok) setFollowerData(await followersRes.json());
    } catch (err) {
      console.error("Data load error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { loadData(); }, []);

  const toggleShow = (platform: string) => {
    setShowPass(prev => ({ ...prev, [platform]: !prev[platform] }));
  };

  const handleLog = async (platform: SocialPlatform) => {
    const count = parseInt(inputs[platform]);
    if (isNaN(count)) return;

    setIsSubmitting(true);
    setMessage("");
    try {
      const res = await fetch("/api/social/followers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ platform, count }),
      });
      if (!res.ok) throw new Error("Sync failed.");
      setInputs(prev => ({ ...prev, [platform]: "" }));
      await loadData();
      setMessage("Followers synchronized.");
    } catch (err) {
      setMessage("Log error.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderPlatformSection = (platform: SocialPlatform, Icon: any, color: string) => {
    const data = followerData[platform] || [];
    const cred = creds[platform];

    return (
      <div className="space-y-10 animate-fade-in-up">
        
        {/* Credentials Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <Card className="lg:col-span-5 border-white/5 bg-background shadow-2xl rounded-[32px] overflow-hidden">
            <CardHeader className="p-8 pb-4">
              <CardTitle className="text-xl font-black text-white flex items-center gap-3">
                <Icon className={`w-5 h-5 ${color}`} /> Access Vault
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8 pt-4 space-y-6">
              {cred ? (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Identity ID</label>
                    <div className="h-12 px-5 rounded-xl glass border-white/5 flex items-center text-sm font-bold text-white tracking-wide">
                      {cred.username}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Secret Key</label>
                    <div className="relative group">
                      <div className="h-12 px-5 rounded-xl border border-purple-500/10 bg-purple-500/5 flex items-center text-sm font-mono font-bold text-purple-500 tracking-wider overflow-hidden">
                        {showPass[platform] ? cred.password : "••••••••••••••••"}
                      </div>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => toggleShow(platform)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 hover:bg-white/5 text-zinc-500"
                      >
                        {showPass[platform] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="py-12 text-center glass rounded-2xl border-dashed border-white/10 space-y-3">
                    <Lock className="w-8 h-8 text-white/5 mx-auto" />
                    <p className="text-zinc-600 text-[10px] font-bold uppercase tracking-[0.2em] px-4 leading-relaxed">Admin has not released credentials for this platform.</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Tracker Card */}
          <Card className="lg:col-span-7 border-white/5 bg-[#0a0a0a] shadow-2xl rounded-[32px] overflow-hidden">
            <CardHeader className="p-8 pb-4">
              <CardTitle className="text-xl font-black text-white flex items-center gap-3">
                <TrendingUp className="w-5 h-5 text-zinc-500" /> Digital Metrics
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8 space-y-8">
              <div className="space-y-4">
                <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Current Followers</label>
                <div className="flex gap-4">
                  <Input 
                    type="number"
                    value={inputs[platform]}
                    onChange={e => setInputs(prev => ({ ...prev, [platform]: e.target.value }))}
                    placeholder="Enter current count"
                    className="h-14 bg-white/5 border-white/5 focus:border-purple-500 rounded-2xl text-lg font-black"
                  />
                  <Button 
                    onClick={() => handleLog(platform)} 
                    disabled={isSubmitting}
                    className="h-14 px-8 bg-purple-600 hover:bg-purple-500 text-white rounded-2xl shadow-lg flex gap-2"
                  >
                    {isSubmitting ? <Loader2 className="animate-spin w-4 h-4" /> : <Save className="w-4 h-4" />}
                    Log
                  </Button>
                </div>
              </div>

              {/* Chart */}
              <div className="h-64 w-full glass rounded-[28px] border-white/5 p-6 shadow-inner relative">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" vertical={false} />
                    <XAxis 
                        dataKey="date" 
                        stroke="rgba(255,255,255,0.2)" 
                        fontSize={8} 
                        tickFormatter={(str) => str.split("-").slice(1).join("/")}
                    />
                    <YAxis stroke="rgba(255,255,255,0.2)" fontSize={8} width={25} />
                    <Tooltip 
                        contentStyle={{ background: "#0a0a0a", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px", fontSize: "10px" }}
                        itemStyle={{ fontWeight: "bold", fontSize: "12px", color: "#a855f7" }}
                    />
                    <Line 
                        type="monotone" 
                        dataKey="count" 
                        stroke="#a855f7" 
                        strokeWidth={3} 
                        dot={{ r: 4, fill: "#a855f7", stroke: "#050505", strokeWidth: 2 }}
                        activeDot={{ r: 6, fill: "#a855f7" }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Growth Log History */}
        <div className="space-y-6">
            <h4 className="text-sm font-black text-white uppercase tracking-[0.2em] flex items-center gap-3">
                <History className="w-4 h-4 text-zinc-500" /> Digital Growth Log
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {data.slice().reverse().map((entry, idx) => (
                    <div key={idx} className="glass p-4 rounded-2xl border-white/5 text-center space-y-1 transition-all hover:bg-white/5">
                        <div className="text-[8px] font-bold text-zinc-600 uppercase tracking-widest">{entry.date}</div>
                        <div className="text-sm font-black text-purple-500 tracking-tighter">{entry.count.toLocaleString()}</div>
                    </div>
                ))}
                {data.length === 0 && (
                    <div className="col-span-full py-8 text-center text-zinc-600 text-[10px] font-bold uppercase tracking-widest italic opacity-50">Empty log.</div>
                )}
            </div>
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto max-w-7xl px-4 py-16 sm:py-24 space-y-16">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 reveal">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 border border-purple-500/20 bg-purple-500/10 rounded-full px-4 py-1.5 text-[10px] font-bold tracking-[0.3em] text-purple-400 uppercase">
            <Share2 className="w-3 h-3" /> Growth Management System
          </div>
          <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tighter">
            Social <span className="text-gradient-purple">Metrics</span>
          </h1>
          <p className="text-zinc-500 text-sm sm:text-base font-medium max-w-2xl leading-relaxed">
            Authorized node for tracking digital expansion across CrelyneX social channels. Securely retrieve access identifiers and log expansion metrics.
          </p>
        </div>
      </div>

      <div className="reveal delay-100">
        <Tabs defaultValue="instagram" className="w-full">
          <div className="glass rounded-[32px] p-2 border-white/5 mb-12 max-w-md mx-auto sm:mx-0">
            <TabsList className="bg-transparent border-none w-full flex h-auto p-0 gap-2">
              <TabsTrigger value="instagram" className="h-12 px-6 rounded-2xl flex-1 data-[state=active]:bg-pink-600/10 data-[state=active]:text-pink-500 data-[state=inactive]:text-zinc-600 transition-all font-black uppercase tracking-widest text-[10px]">
                <Instagram className="w-4 h-4 mr-2" /> IG
              </TabsTrigger>
              <TabsTrigger value="facebook" className="h-12 px-6 rounded-2xl flex-1 data-[state=active]:bg-blue-600/10 data-[state=active]:text-blue-500 data-[state=inactive]:text-zinc-600 transition-all font-black uppercase tracking-widest text-[10px]">
                <Facebook className="w-4 h-4 mr-2" /> FB
              </TabsTrigger>
              <TabsTrigger value="linkedin" className="h-12 px-6 rounded-2xl flex-1 data-[state=active]:bg-emerald-600/10 data-[state=active]:text-emerald-500 data-[state=inactive]:text-zinc-600 transition-all font-black uppercase tracking-widest text-[10px]">
                <Linkedin className="w-4 h-4 mr-2" /> LI
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="min-h-[600px]">
            <TabsContent value="instagram" className="mt-0 outline-none">
              {renderPlatformSection("instagram", Instagram, "text-pink-500")}
            </TabsContent>
            <TabsContent value="facebook" className="mt-0 outline-none">
              {renderPlatformSection("facebook", Facebook, "text-blue-500")}
            </TabsContent>
            <TabsContent value="linkedin" className="mt-0 outline-none">
              {renderPlatformSection("linkedin", Linkedin, "text-emerald-500")}
            </TabsContent>
          </div>
        </Tabs>
      </div>

    </div>
  );
}
