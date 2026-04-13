"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Activity, Calendar as CalendarIcon } from "lucide-react";
import type { DailyUpdateEntry, AllUpdatesData } from "@/lib/updates";
import type { Member } from "@/lib/members";

export default function AdminUpdatesManager({ theme = "amber" }: { theme?: "red" | "amber" }) {
  const accentColor = theme === "red" ? "red-500" : "amber-500";
  const iconColor = theme === "red" ? "text-red-500" : "text-amber-500";
  const badgeColor = theme === "red" ? "text-red-500 bg-red-500/10" : "text-amber-500 bg-amber-500/10";
  const ringColor = theme === "red" ? "hover:ring-red-500/30" : "hover:ring-amber-500/30";
  const textAccent = theme === "red" ? "text-red-400 bg-red-500/20" : "text-amber-400 bg-amber-500/20";
  const borderAccent = theme === "red" ? "border-red-500/10 bg-red-500/5 text-red-500" : "border-amber-500/10 bg-amber-500/5 text-amber-500";
  
  const [updates, setUpdates] = useState<AllUpdatesData>({});
  const [members, setMembers] = useState<Member[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const loadData = async () => {
    setIsLoading(true);
    setError("");
    try {
      const [updRes, memRes] = await Promise.all([
        fetch("/api/admin/updates"),
        fetch("/api/admin/members"),
      ]);

      if (!updRes.ok || !memRes.ok) throw new Error("Failed to load data.");
      
      const updData = await updRes.json();
      const memData = await memRes.json();
      
      setUpdates(updData);
      setMembers(memData);
    } catch (err) {
      setError("Failed to load updates.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { loadData(); }, []);

  const getMemberName = (id: string) => members.find(m => m.id === id)?.name || id;

  // Flatten and sort updates by date desc
  const allLogs: { memberId: string; entry: DailyUpdateEntry }[] = [];
  Object.entries(updates).forEach(([memberId, entries]) => {
    entries.forEach(entry => allLogs.push({ memberId, entry }));
  });
  allLogs.sort((a, b) => new Date(b.entry.date).getTime() - new Date(a.entry.date).getTime());

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-white flex items-center gap-3">
          <Activity className={`w-5 h-5 ${iconColor}`} /> Member Daily Updates
        </h3>
        <button onClick={loadData} className={`text-xs font-bold ${iconColor} uppercase tracking-widest hover:text-white transition-colors`}>
          Refresh Data
        </button>
      </div>

      {isLoading ? (
        <div className="py-20 flex justify-center">
          <Loader2 className="animate-spin text-zinc-500 w-8 h-8" />
        </div>
      ) : error ? (
        <p className="text-red-500 text-sm font-bold bg-red-500/10 p-4 rounded-2xl">{error}</p>
      ) : allLogs.length === 0 ? (
        <div className="text-center py-20 glass rounded-[32px] border-dashed border-white/10">
          <p className="text-zinc-500 text-sm font-medium">No updates found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allLogs.map(log => (
            <Card key={log.entry.id} className={`border-white/5 bg-[#0a0a0a] rounded-[24px] overflow-hidden group ${ringColor} transition-all`}>
              <CardHeader className="p-6 pb-2">
                <div className="flex justify-between items-start mb-2">
                  <div className="text-sm font-black text-white uppercase tracking-wider">{getMemberName(log.memberId)}</div>
                  <div className={`flex items-center gap-1 text-[10px] font-bold ${badgeColor} px-2 py-0.5 rounded-full`}>
                    <CalendarIcon className="w-3 h-3" /> {log.entry.date}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6 pt-2 space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white/5 p-3 rounded-2xl">
                    <div className="text-[10px] text-zinc-500 uppercase font-black tracking-widest mb-1">Instagram</div>
                    <div className="text-lg font-black text-white">{log.entry.instagramCount}</div>
                  </div>
                  <div className="bg-white/5 p-3 rounded-2xl">
                    <div className="text-[10px] text-zinc-500 uppercase font-black tracking-widest mb-1">Facebook</div>
                    <div className="text-lg font-black text-white">{log.entry.facebookCount}</div>
                  </div>
                </div>
                
                {log.entry.events.length > 0 && (
                  <div className={`${borderAccent.split(' ').slice(0, 2).join(' ')} p-4 rounded-2xl border space-y-3`}>
                    <div className={`text-[10px] ${iconColor} uppercase font-black tracking-widest`}>Event Performance</div>
                    {log.entry.events.map((ev, i) => (
                      <div key={i} className="flex justify-between items-center bg-black/40 p-2.5 rounded-xl">
                        <span className="text-xs text-zinc-300 font-bold truncate pr-3">{ev.eventName}</span>
                        <span className={`text-xs font-black ${textAccent} px-2 py-1 rounded-lg`}>{ev.count}</span>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
