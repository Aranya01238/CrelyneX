"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Command } from "cmdk";
import { 
  Search, 
  LayoutDashboard, 
  Image as ImageIcon, 
  Share2, 
  Activity, 
  LogOut,
  User,
  ShieldCheck,
  History
} from "lucide-react";

export default function GlobalCommandMenu() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const runCommand = (command: () => void) => {
    setOpen(false);
    command();
  };

  if (!open) return null;

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-start justify-center pt-24 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300"
      onClick={() => setOpen(false)}
    >
      <div 
        className="w-full max-w-xl mx-4 bg-[#0a0a0a] border border-white/10 rounded-3xl overflow-hidden shadow-2xl shadow-purple-500/10 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <Command label="Global Command Menu">
          <div className="flex items-center border-b border-white/10 px-4">
            <Search className="w-5 h-5 text-zinc-500 mr-3" />
            <Command.Input 
              placeholder="System Search (Cmd+K)..." 
              className="flex-1 h-14 bg-transparent outline-none text-white text-sm placeholder:text-zinc-600"
            />
          </div>

          <Command.List className="max-h-[400px] overflow-y-auto p-2 space-y-2">
            <Command.Empty className="py-6 text-center text-zinc-500 text-xs font-bold uppercase tracking-widest">
              No results found.
            </Command.Empty>

            <Command.Group heading={<span className="px-3 py-2 text-[10px] font-black text-zinc-600 uppercase tracking-widest">Navigational Nodes</span>}>
              <Command.Item 
                onSelect={() => runCommand(() => router.push("/member"))}
                className="flex items-center gap-4 px-4 py-3 rounded-2xl cursor-pointer hover:bg-white/5 transition-colors group"
              >
                <LayoutDashboard className="w-4 h-4 text-purple-400" />
                <span className="text-sm font-bold text-zinc-300 group-hover:text-white transition-colors">Core Dashboard</span>
              </Command.Item>
              <Command.Item 
                onSelect={() => runCommand(() => router.push("/member/graphics"))}
                className="flex items-center gap-4 px-4 py-3 rounded-2xl cursor-pointer hover:bg-white/5 transition-colors group"
              >
                <ImageIcon className="w-4 h-4 text-purple-400" />
                <span className="text-sm font-bold text-zinc-300 group-hover:text-white transition-colors">Graphics Vault</span>
              </Command.Item>
              <Command.Item 
                onSelect={() => runCommand(() => router.push("/member/social"))}
                className="flex items-center gap-4 px-4 py-3 rounded-2xl cursor-pointer hover:bg-white/5 transition-colors group"
              >
                <Share2 className="w-4 h-4 text-purple-400" />
                <span className="text-sm font-bold text-zinc-300 group-hover:text-white transition-colors">Social Portal</span>
              </Command.Item>
              <Command.Item 
                onSelect={() => runCommand(() => router.push("/member/updates"))}
                className="flex items-center gap-4 px-4 py-3 rounded-2xl cursor-pointer hover:bg-white/5 transition-colors group"
              >
                <Activity className="w-4 h-4 text-purple-400" />
                <span className="text-sm font-bold text-zinc-300 group-hover:text-white transition-colors">Impact Feed</span>
              </Command.Item>
            </Command.Group>

            <Command.Group heading={<span className="px-3 py-2 text-[10px] font-black text-zinc-600 uppercase tracking-widest">System Protocols</span>}>
              <Command.Item 
                onSelect={() => runCommand(async () => {
                    await fetch("/api/auth/logout", { method: "POST" });
                    document.cookie = "crelynex-member-session=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
                    document.cookie = "crelynex-admin-session=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
                    document.cookie = "crelynex-hr-session=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
                    router.push("/login");
                    router.refresh();
                })}
                className="flex items-center gap-4 px-4 py-3 rounded-2xl cursor-pointer hover:bg-red-500/10 transition-colors group"
              >
                <LogOut className="w-4 h-4 text-red-500" />
                <span className="text-sm font-bold text-zinc-300 group-hover:text-red-400 transition-colors">Terminate Session</span>
              </Command.Item>
            </Command.Group>
          </Command.List>

          <div className="border-t border-white/5 bg-white/2 p-3 flex justify-between items-center text-[10px] font-black text-zinc-600 uppercase tracking-widest">
            <span>Select with &crarr;</span>
            <div className="flex gap-4">
              <span>&uarr;&darr; Navigate</span>
              <span>Esc Close</span>
            </div>
          </div>
        </Command>
      </div>
    </div>
  );
}
