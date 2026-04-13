"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, ArrowLeft, Activity, Plus, Trash2, Calendar } from "lucide-react";
import type { DailyUpdateEntry, EventUpdateData } from "@/lib/updates";
import type { EventItem } from "@/lib/events-courses";

export default function UpdatesPortalClient() {
  const router = useRouter();
  const [logs, setLogs] = useState<DailyUpdateEntry[]>([]);
  const [events, setEvents] = useState<EventItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  
  // Form State
  const [instagramCount, setInstagramCount] = useState<number>(0);
  const [facebookCount, setFacebookCount] = useState<number>(0);
  const [eventEntries, setEventEntries] = useState<{eventId: string, count: number}[]>([]);

  useEffect(() => {
    // Check auth
    if (!document.cookie.includes("crelynex-member-portals=updates") && !document.cookie.includes("updates")) {
      router.replace("/member");
      return;
    }

    const loadData = async () => {
      try {
        const [updRes, evRes] = await Promise.all([
          fetch("/api/member/updates"),
          fetch("/api/events-courses")
        ]);

        if (updRes.ok) {
          const data = await updRes.json();
          setLogs(data);
        }
        
        if (evRes.ok) {
          const evData = await evRes.json();
          // Filter to just events (or courses if they apply, but user said Events)
          setEvents(evData.events || []);
        }
      } catch (err) {
        setError("Failed to load initial data.");
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [router]);

  const addEventEntry = () => {
    setEventEntries([...eventEntries, { eventId: "", count: 0 }]);
  };

  const updateEventEntry = (index: number, field: "eventId" | "count", value: string | number) => {
    const newEntries = [...eventEntries];
    newEntries[index] = { ...newEntries[index], [field]: value };
    setEventEntries(newEntries);
  };

  const removeEventEntry = (index: number) => {
    setEventEntries(eventEntries.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    // Enrich events with names
    const enrichedEvents: EventUpdateData[] = eventEntries
      .filter(ev => ev.eventId !== "")
      .map(ev => ({
        eventId: ev.eventId,
        count: ev.count,
        eventName: events.find(e => e.id === ev.eventId)?.title || "Unknown Event"
      }));

    try {
      const res = await fetch("/api/member/updates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          instagramCount,
          facebookCount,
          events: enrichedEvents
        })
      });

      if (!res.ok) throw new Error("Failed to submit.");
      const newLog = await res.json();
      
      setLogs([newLog, ...logs]);
      
      // Reset form
      setInstagramCount(0);
      setFacebookCount(0);
      setEventEntries([]);
    } catch (err) {
      setError("Failed to submit daily update.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-purple-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white p-4 sm:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex items-center gap-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <Link href="/member">
            <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-white rounded-full">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-black text-white flex items-center gap-2">
              <Activity className="w-6 h-6 text-purple-500" /> Updates Feed
            </h1>
            <p className="text-xs text-zinc-500 font-bold uppercase tracking-widest mt-1">Submit Daily Performance & Impact Metrics</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-100 fill-mode-both">
          
          {/* Form */}
          <Card className="lg:col-span-5 border-white/5 bg-background shadow-2xl rounded-[32px] overflow-hidden">
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-8">
                
                <div className="space-y-4">
                  <h3 className="text-sm font-black text-purple-500 uppercase tracking-widest border-b border-purple-500/20 pb-2">Social Impact</h3>
                  
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Instagram Update</label>
                    <Input 
                      type="number"
                      min={0}
                      value={instagramCount || ""}
                      onChange={e => setInstagramCount(parseInt(e.target.value) || 0)}
                      placeholder="Add Daily Number"
                      className="h-12 bg-white/5 border-white/5 focus:border-purple-500 rounded-xl"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Facebook Update</label>
                    <Input 
                      type="number"
                      min={0}
                      value={facebookCount || ""}
                      onChange={e => setFacebookCount(parseInt(e.target.value) || 0)}
                      placeholder="Add Daily Number"
                      className="h-12 bg-white/5 border-white/5 focus:border-purple-500 rounded-xl"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-purple-500/20 pb-2">
                    <h3 className="text-sm font-black text-purple-500 uppercase tracking-widest">Events Impact</h3>
                    <Button type="button" onClick={addEventEntry} variant="ghost" size="sm" className="h-6 px-2 text-purple-500 hover:bg-purple-500/10 hover:text-purple-400 rounded-md">
                      <Plus className="w-4 h-4 mr-1" /> Add
                    </Button>
                  </div>
                  
                  {eventEntries.length === 0 && (
                    <p className="text-xs text-zinc-600 font-bold uppercase tracking-widest text-center py-4">No events added today.</p>
                  )}

                  {eventEntries.map((entry, idx) => (
                    <div key={idx} className="flex flex-col sm:flex-row gap-3 bg-white/5 p-3 rounded-xl relative group">
                      <div className="flex-1 space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Select Event</label>
                        <Select value={entry.eventId} onValueChange={v => updateEventEntry(idx, "eventId", v)}>
                          <SelectTrigger className="h-10 bg-black/40 border-white/5 rounded-lg text-xs">
                            <SelectValue placeholder="Select Event" />
                          </SelectTrigger>
                          <SelectContent className="bg-[#111] border-white/10 text-white rounded-xl">
                            {events.map(ev => (
                              <SelectItem key={ev.id} value={ev.id} className="focus:bg-white/10 cursor-pointer">{ev.title}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="w-full sm:w-24 space-y-2">
                        <div className="flex items-center justify-between">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Number</label>
                          <button type="button" onClick={() => removeEventEntry(idx)} className="text-red-500 hover:text-red-400 sm:hidden">
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                        <Input 
                          type="number"
                          min={0}
                          value={entry.count || ""}
                          onChange={e => updateEventEntry(idx, "count", parseInt(e.target.value) || 0)}
                          className="h-10 bg-black/40 border-white/5 focus:border-purple-500 rounded-lg text-xs"
                          required
                        />
                      </div>
                      <button type="button" onClick={() => removeEventEntry(idx)} className="absolute -right-2 -top-2 bg-red-500/10 text-red-500 p-1.5 rounded-full hidden sm:block opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500/20">
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>

                {error && <p className="text-xs text-red-500 font-bold bg-red-500/10 p-3 rounded-xl">{error}</p>}
                
                <Button type="submit" disabled={isSubmitting} className="w-full h-14 bg-purple-600 hover:bg-purple-500 text-white font-black text-lg rounded-2xl">
                  {isSubmitting ? <Loader2 className="animate-spin" /> : "File Daily Report"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Historical Logs */}
          <div className="lg:col-span-7 space-y-6">
            <h3 className="text-xl font-bold text-white flex items-center gap-3">
              <Calendar className="w-5 h-5 text-zinc-500" /> Historical Logs
            </h3>

            <div className="space-y-4">
              {logs.map(log => (
                <div key={log.id} className="glass p-6 rounded-[28px] border-white/5 space-y-4 transition-all hover:bg-white/5 group">
                  <div className="flex justify-between items-start">
                    <span className="text-xs font-black text-purple-500 uppercase tracking-widest bg-purple-500/10 px-3 py-1 rounded-full">
                      {log.date}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 border-b border-white/5 pb-4">
                    <div>
                      <div className="text-[10px] text-zinc-500 uppercase font-black tracking-widest mb-1">Instagram Update</div>
                      <div className="text-xl font-black text-white">{log.instagramCount}</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-zinc-500 uppercase font-black tracking-widest mb-1">Facebook Update</div>
                      <div className="text-xl font-black text-white">{log.facebookCount}</div>
                    </div>
                  </div>

                  {log.events.length > 0 && (
                    <div className="space-y-2">
                      <div className="text-[10px] text-purple-500 uppercase font-black tracking-widest">Events Updated</div>
                      <div className="grid gap-2">
                        {log.events.map((ev, i) => (
                          <div key={i} className="flex justify-between items-center bg-black/30 p-3 rounded-xl">
                            <span className="text-xs text-zinc-300 font-bold flex-1 truncate">{ev.eventName}</span>
                            <span className="text-xs font-black text-white bg-white/10 px-2 py-1 rounded-md">{ev.count}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {logs.length === 0 && (
                <div className="text-center py-20 glass rounded-[32px] border-dashed border-white/10">
                  <p className="text-zinc-500 text-sm font-medium">No performance logs filed yet.</p>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
