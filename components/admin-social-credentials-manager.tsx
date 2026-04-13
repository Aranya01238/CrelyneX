"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Key, Instagram, Facebook, Linkedin, ShieldAlert, Save } from "lucide-react";
import type { Member } from "@/lib/members";
import type { SocialCredentials } from "@/lib/social";

export default function AdminSocialCredentialsManager() {
  const [members, setMembers] = useState<Member[]>([]);
  const [selectedId, setSelectedId] = useState("");
  const [creds, setCreds] = useState<SocialCredentials>({
    instagram: { username: "", password: "" },
    facebook: { username: "", password: "" },
    linkedin: { username: "", password: "" },
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  const loadData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/admin/members", { cache: "no-store" });
      if (!response.ok) throw new Error("Load error.");
      const mems = await response.json();
      // Only members with social portal access
      setMembers(mems.filter((m: Member) => m.portals.includes("social")));
    } catch (err) {
      setMessage({ text: "Failed to load members.", type: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { loadData(); }, []);

  const loadMemberCreds = async (id: string) => {
    if (!id) return;
    setIsLoading(true);
    try {
      const response = await fetch(`/api/social/credentials?memberId=${id}&t=${Date.now()}`, { cache: "no-store" });
      if (!response.ok) throw new Error("Load credentials failed.");
      const data = await response.json();
      setCreds({
        instagram: data.instagram || { username: "", password: "" },
        facebook: data.facebook || { username: "", password: "" },
        linkedin: data.linkedin || { username: "", password: "" },
      });
    } catch (err) {
      setMessage({ text: "Error loading credentials.", type: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    if (!selectedId) return;
    setIsSubmitting(true);
    setMessage({ text: "", type: "" });
    try {
      const response = await fetch("/api/social/credentials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ memberId: selectedId, ...creds }),
      });
      if (!response.ok) throw new Error("Save failed.");
      setMessage({ text: "Vault successfully synchronized.", type: "success" });
      await loadMemberCreds(selectedId);
    } catch (err) {
      setMessage({ text: "Failed to save secret data.", type: "error" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateField = (platform: keyof SocialCredentials, field: "username" | "password", value: string) => {
    setCreds(prev => ({
      ...prev,
      [platform]: { ...prev[platform], [field]: value }
    }));
  };

  return (
    <div className="space-y-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Selection Side */}
        <div className="lg:col-span-4 space-y-6">
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white flex items-center gap-3">
              <ShieldAlert className="w-5 h-5 text-purple-500" /> Identity Selection
            </h3>
            <p className="text-zinc-500 text-xs font-medium leading-relaxed">
              Select an authorized member to release sensitive social media credentials to their secure vault.
            </p>
          </div>

          <div className="space-y-4">
            <Select 
              value={selectedId} 
              onValueChange={val => {
                setSelectedId(val);
                loadMemberCreds(val);
              }}
            >
              <SelectTrigger className="h-14 bg-white/5 border-white/5 focus:border-purple-500 rounded-2xl">
                <SelectValue placeholder="Select Member" />
              </SelectTrigger>
              <SelectContent className="bg-[#0a0a0a] border-white/10">
                {members.map(m => (
                  <SelectItem key={m.id} value={m.id}>{m.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            {selectedId && (
              <div className="glass p-6 rounded-[32px] border-white/5 animate-fade-in-up">
                <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mb-4">Verification</p>
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-xl border border-purple-500/20 bg-purple-500/10 flex items-center justify-center text-purple-500 font-black">
                    {members.find(m => m.id === selectedId)?.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">{members.find(m => m.id === selectedId)?.name}</h4>
                    <span className="text-[10px] text-zinc-600 font-bold uppercase tracking-[0.2em]">{selectedId}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Credentials Form Side */}
        <Card className="lg:col-span-8 border-white/5 bg-background shadow-2xl rounded-[32px] overflow-hidden">
          <CardHeader className="p-8 border-b border-white/5">
            <CardTitle className="text-2xl font-black text-white flex items-center gap-3">
              <Key className="w-6 h-6 text-purple-500" /> Vault Synchronization
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8 space-y-8">
            
            {!selectedId ? (
              <div className="text-center py-24">
                <Key className="w-12 h-12 text-white/5 mx-auto mb-4" />
                <p className="text-zinc-600 font-bold uppercase tracking-widest text-[10px]">Await Identity Selection</p>
              </div>
            ) : (
              <div className="space-y-10 animate-fade-in-right">
                
                {/* Instagram */}
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-lg bg-pink-500/10 text-pink-500 flex items-center justify-center">
                      <Instagram className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-black uppercase tracking-widest text-white">Instagram Access</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input 
                      placeholder="Username / ID"
                      value={creds.instagram?.username}
                      onChange={e => updateField("instagram", "username", e.target.value)}
                      className="h-12 bg-white/5 border-white/5 focus:border-pink-500/50 rounded-xl"
                    />
                    <Input 
                      placeholder="Secret Key"
                      type="password"
                      value={creds.instagram?.password}
                      onChange={e => updateField("instagram", "password", e.target.value)}
                      className="h-12 bg-white/5 border-white/5 focus:border-pink-500/50 rounded-xl"
                    />
                  </div>
                </div>

                {/* Facebook */}
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-lg bg-blue-500/10 text-blue-500 flex items-center justify-center">
                      <Facebook className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-black uppercase tracking-widest text-white">Facebook Access</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input 
                      placeholder="Login ID"
                      value={creds.facebook?.username}
                      onChange={e => updateField("facebook", "username", e.target.value)}
                      className="h-12 bg-white/5 border-white/5 focus:border-blue-500/50 rounded-xl"
                    />
                    <Input 
                      placeholder="Secret Key"
                      type="password"
                      value={creds.facebook?.password}
                      onChange={e => updateField("facebook", "password", e.target.value)}
                      className="h-12 bg-white/5 border-white/5 focus:border-blue-500/50 rounded-xl"
                    />
                  </div>
                </div>

                {/* LinkedIn */}
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                      <Linkedin className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-black uppercase tracking-widest text-white">LinkedIn Access</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input 
                      placeholder="Professional ID"
                      value={creds.linkedin?.username}
                      onChange={e => updateField("linkedin", "username", e.target.value)}
                      className="h-12 bg-white/5 border-white/5 focus:border-emerald-500/50 rounded-xl"
                    />
                    <Input 
                      placeholder="Secret Key"
                      type="password"
                      value={creds.linkedin?.password}
                      onChange={e => updateField("linkedin", "password", e.target.value)}
                      className="h-12 bg-white/5 border-white/5 focus:border-emerald-500/50 rounded-xl"
                    />
                  </div>
                </div>

                {message.text && (
                  <div className={`rounded-2xl px-6 py-4 text-xs font-bold flex items-center gap-4 animate-fade-in-up ${
                    message.type === "error" ? "bg-red-500/10 text-red-500 border border-red-500/20" : "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20"
                  }`}>
                    <div className={`h-1.5 w-1.5 rounded-full ${message.type === "error" ? "bg-red-500" : "bg-emerald-500"}`} />
                    {message.text}
                  </div>
                )}

                <Button 
                  onClick={handleSave} 
                  disabled={isSubmitting || isLoading} 
                  className="w-full h-16 rounded-2xl bg-white text-black hover:bg-zinc-200 font-black text-lg shadow-[0_20px_40px_rgba(0,0,0,0.3)] flex gap-3 transition-all active:scale-95"
                >
                  {isSubmitting ? <Loader2 className="animate-spin" /> : <Save className="w-6 h-6" />}
                  Synchronize Data To Vault
                </Button>

              </div>
            )}
            
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
