"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Briefcase, Trash2, Send, CheckCircle2 } from "lucide-react";
import type { Task, Member } from "@/lib/members";

const initialTaskForm = {
  toMemberId: "",
  title: "",
  description: "",
  points: 1,
};

export default function AdminTasksManager() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [members, setMembers] = useState<Member[]>([]);
  const [form, setForm] = useState(initialTaskForm);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const loadData = async () => {
    setIsLoading(true);
    setError("");
    try {
      const [membersRes, tasksRes] = await Promise.all([
        fetch("/api/admin/members"),
        fetch("/api/admin/tasks"),
      ]);
      if (!membersRes.ok || !tasksRes.ok) throw new Error("Load error.");
      const [mems, tsks] = await Promise.all([membersRes.json(), tasksRes.json()]);
      setMembers(mems);
      setTasks(tsks);
    } catch (err) {
      setError("Failed to load data.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { loadData(); }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.toMemberId) return setError("Select a member.");
    setIsSubmitting(true);
    setError("");
    try {
      const member = members.find(m => m.id === form.toMemberId);
      const payload = { ...form, toMemberName: member?.name || "Member" };
      const response = await fetch("/api/admin/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, points: Number(payload.points) }),
      });
      if (!response.ok) throw new Error("Create failed.");
      setForm(initialTaskForm);
      await loadData();
    } catch (err) {
      setError("Failed to send task.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleApprove = async (id: string) => {
    try {
      const resp = await fetch("/api/admin/tasks", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, action: "approve" }),
      });
      if (resp.ok) await loadData();
    } catch (err) { setError("Approve failed."); }
  };

  const handleReject = async (id: string) => {
    try {
      const resp = await fetch("/api/admin/tasks", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, action: "reject" }),
      });
      if (resp.ok) await loadData();
    } catch (err) { setError("Reject failed."); }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch("/api/admin/tasks", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (!response.ok) throw new Error("Delete failed.");
      await loadData();
    } catch (err) {
      setError("Delete task failed.");
    }
  };

  return (
    <div className="space-y-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Create Form */}
        <Card className="lg:col-span-5 border-white/5 bg-background shadow-2xl rounded-[32px] overflow-hidden">
          <CardHeader className="p-8 pb-4">
            <CardTitle className="text-2xl font-black text-white flex items-center gap-3">
              <Send className="w-6 h-6 text-purple-500" /> Assign Mission
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8 pt-4">
            <form onSubmit={handleCreate} className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Target Member</label>
                  <Select 
                    value={form.toMemberId} 
                    onValueChange={val => setForm(f => ({ ...f, toMemberId: val }))}
                  >
                    <SelectTrigger className="h-12 bg-white/5 border-white/5 focus:border-purple-500 rounded-xl">
                      <SelectValue placeholder="Select Recipient" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#0a0a0a] border-white/10">
                      {members.map(m => (
                        <SelectItem key={m.id} value={m.id} className="focus:bg-purple-500/10 focus:text-white">{m.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Objective Label</label>
                  <Input 
                    value={form.title}
                    onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                    placeholder="Short task summary"
                    className="h-12 bg-white/5 border-white/5 focus:border-purple-500 rounded-xl"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Mission Complexity / Points</label>
                  <Select 
                    value={String(form.points)} 
                    onValueChange={val => setForm(f => ({ ...f, points: Number(val) }))}
                  >
                    <SelectTrigger className="h-12 bg-white/5 border-white/5 focus:border-purple-500 rounded-xl">
                      <SelectValue placeholder="Select Point Value" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#0a0a0a] border-white/10">
                      <SelectItem value="1" className="focus:bg-purple-500/10">1 Credit - Base Level</SelectItem>
                      <SelectItem value="2" className="focus:bg-purple-500/10">2 Credits - Advanced</SelectItem>
                      <SelectItem value="3" className="focus:bg-purple-500/10">3 Credits - Elite/Difficult</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Mission Parameters</label>
                  <Textarea ... />
                </div>
              </div>

              {error && <p className="text-xs text-purple-500 font-bold bg-purple-500/10 p-3 rounded-xl">{error}</p>}
              
              <Button type="submit" disabled={isSubmitting} className="w-full h-14 bg-purple-600 hover:bg-purple-500 text-white font-black text-lg rounded-2xl">
                {isSubmitting ? <Loader2 className="animate-spin" /> : "Deploy Task Command"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Task Log List */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xl font-bold text-white flex items-center gap-3">
              <Briefcase className="w-5 h-5 text-zinc-500" /> Objective Status Log
            </h3>
            {isLoading && <Loader2 className="animate-spin w-4 h-4 text-zinc-500" />}
          </div>

          <div className="grid grid-cols-1 gap-4">
            {tasks.map(task => (
              <div key={task.id} className="glass group p-6 rounded-[32px] border-white/5 transition-all hover:bg-white/5 space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="text-lg font-bold text-white">{task.title}</h4>
                      {task.status === "done" && <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
                      <span className="px-1.5 py-0.5 rounded-md bg-purple-500/10 text-purple-400 text-[10px] font-black">{task.points} PTS</span>
                    </div>
                    <div className="flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] text-zinc-500 uppercase">
                      To <span className="text-purple-500/80">{task.toMemberName}</span>
                      <div className="h-3 w-px bg-white/10" />
                      {new Date(task.assignedAt).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {task.status === "pending" && task.memberMarkedDone && (
                      <div className="flex gap-1">
                        <Button onClick={() => handleApprove(task.id)} size="sm" className="h-8 bg-purple-600 hover:bg-purple-500 text-white text-[10px] font-black rounded-lg">APPROVE</Button>
                        <Button onClick={() => handleReject(task.id)} size="sm" variant="outline" className="h-8 border-white/10 text-zinc-400 text-[10px] font-black rounded-lg">REJECT</Button>
                      </div>
                    )}
                    <div className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest ${
                      task.status === "done" ? "bg-emerald-500/10 text-emerald-500" : (task.memberMarkedDone ? "bg-purple-500/20 text-purple-300" : "bg-zinc-500/10 text-zinc-500")
                    }`}>
                      {task.status === "done" ? "Approved" : (task.memberMarkedDone ? "Awaiting Approval" : "InProgress")}
                    </div>
                    <Button onClick={() => handleDelete(task.id)} variant="outline" size="icon" className="h-8 w-8 rounded-lg border-white/5 glass text-zinc-500 hover:text-purple-500">
                      <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </div>
                <p className="text-zinc-400 text-sm leading-relaxed line-clamp-2 italic">{task.description}</p>
              </div>
            ))}
            
            {!isLoading && tasks.length === 0 && (
              <div className="text-center py-20 glass rounded-[32px] border-dashed border-white/10">
                <p className="text-zinc-500 text-sm font-medium">No active tasks deployed.</p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
