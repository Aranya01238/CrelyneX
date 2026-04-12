"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2, UserPlus, Trash2, Shield, Settings, Clock } from "lucide-react";
import type { Member, MemberPortal } from "@/lib/members";

const initialMemberForm = {
  name: "",
  id: "",
  password: "",
  portals: [] as MemberPortal[],
};

export default function AdminMembersManager() {
  const [members, setMembers] = useState<Member[]>([]);
  const [form, setForm] = useState(initialMemberForm);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const loadMembers = async () => {
    setIsLoading(true);
    setError("");
    try {
      const response = await fetch("/api/admin/members");
      if (!response.ok) throw new Error("Failed to load members.");
      const data = await response.json();
      setMembers(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Load error.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { loadMembers(); }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    try {
      const response = await fetch("/api/admin/members", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Create failed.");
      setForm(initialMemberForm);
      await loadMembers();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Remove this member?")) return;
    try {
      const response = await fetch("/api/admin/members", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (!response.ok) throw new Error("Delete failed.");
      await loadMembers();
    } catch (err) {
      setError("Delete failed.");
    }
  };

  const togglePortal = (portal: MemberPortal) => {
    setForm(prev => {
      const current = prev.portals.includes(portal) 
        ? prev.portals.filter(p => p !== portal)
        : [...prev.portals, portal];
      return { ...prev, portals: current };
    });
  };

  return (
    <div className="space-y-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Create Form */}
        <Card className="lg:col-span-5 border-white/5 bg-background shadow-2xl rounded-[32px] overflow-hidden">
          <CardHeader className="p-8 pb-4">
            <CardTitle className="text-2xl font-black text-white flex items-center gap-3">
              <UserPlus className="w-6 h-6 text-red-500" /> Register Member
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8 pt-4">
            <form onSubmit={handleCreate} className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Legal Name</label>
                  <Input 
                    value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    placeholder="Full Business Name"
                    className="h-12 bg-white/5 border-white/5 focus:border-red-500 rounded-xl"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Identity ID</label>
                  <Input 
                    value={form.id}
                    onChange={e => setForm(f => ({ ...f, id: e.target.value }))}
                    placeholder="Unique alphanumeric ID"
                    className="h-12 bg-white/5 border-white/5 focus:border-red-500 rounded-xl"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Security Key</label>
                  <Input 
                    type="password"
                    value={form.password}
                    onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                    placeholder="Login Password"
                    className="h-12 bg-white/5 border-white/5 focus:border-red-500 rounded-xl"
                    required
                  />
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Portal Clearances</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {["graphics", "social", "updates"].map(portal => (
                    <label key={portal} className="flex items-center gap-3 p-4 rounded-2xl glass border-white/5 cursor-pointer">
                      <Checkbox 
                        checked={(form.portals || []).includes(portal as MemberPortal)} 
                        onCheckedChange={() => togglePortal(portal as MemberPortal)}
                      />
                      <span className="text-xs font-bold uppercase tracking-widest text-zinc-300">{portal}</span>
                    </label>
                  ))}
                </div>
              </div>

              {error && <p className="text-xs text-red-500 font-bold bg-red-500/10 p-3 rounded-xl">{error}</p>}
              
              <Button type="submit" disabled={isSubmitting} className="w-full h-14 bg-red-600 hover:bg-red-500 text-white font-black text-lg rounded-2xl">
                {isSubmitting ? <Loader2 className="animate-spin" /> : "Authorize New Member"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Members List */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xl font-bold text-white flex items-center gap-3">
              <Shield className="w-5 h-5 text-zinc-500" /> Authorized Entities
            </h3>
            {isLoading && <Loader2 className="animate-spin w-4 h-4 text-zinc-500" />}
          </div>

          <div className="grid grid-cols-1 gap-4">
            {members.map(member => (
              <div key={member.id} className="glass group p-6 rounded-[32px] border-white/5 flex flex-col sm:flex-row items-center justify-between gap-6 transition-all hover:bg-white/5">
                <div className="flex items-center gap-5 w-full">
                  <div className="h-16 w-16 rounded-2xl glass-red flex items-center justify-center text-red-500 text-xl font-black">
                    {member.name.charAt(0)}
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-lg font-bold text-white">{member.name}</h4>
                    <div className="flex flex-wrap gap-2">
                      <span className="text-[10px] font-bold tracking-widest text-zinc-500 uppercase">{member.id}</span>
                      <div className="h-4 w-px bg-white/10" />
                      {member.portals.map(p => (
                        <span key={p} className="text-[8px] font-black uppercase tracking-widest text-red-500 bg-red-500/10 px-2 py-0.5 rounded-full">{p}</span>
                      ))}
                      
                      {member.lastLoginAt ? (
                        <>
                          <div className="h-4 w-px bg-white/10" />
                          <div className="flex items-center gap-1 text-[9px] font-bold tracking-widest text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                            <Clock className="w-2.5 h-2.5" />
                            {new Date(member.lastLoginAt).toLocaleString()}
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="h-4 w-px bg-white/10" />
                          <div className="flex items-center gap-1 text-[9px] font-bold tracking-widest text-zinc-500 bg-zinc-500/10 px-2 py-0.5 rounded-full">
                            Never Logged In
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                  <Button variant="outline" size="icon" className="h-12 w-12 rounded-xl border-white/5 glass text-zinc-500 hover:text-white">
                    <Settings className="w-4 h-4" />
                  </Button>
                  <Button onClick={() => handleDelete(member.id)} variant="outline" size="icon" className="h-12 w-12 rounded-xl border-white/5 glass text-zinc-500 hover:text-red-500">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
            
            {!isLoading && members.length === 0 && (
              <div className="text-center py-20 glass rounded-[32px] border-dashed border-white/10">
                <p className="text-zinc-500 text-sm font-medium">No registered entities found.</p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
