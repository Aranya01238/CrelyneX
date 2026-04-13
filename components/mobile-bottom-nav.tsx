"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Image as ImageIcon, 
  Share2, 
  Activity,
  User 
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function MobileBottomNav() {
  const pathname = usePathname();
  
  // Only show on member routes
  if (!pathname?.startsWith("/member")) return null;

  const navItems = [
    { href: "/member", icon: LayoutDashboard, label: "Home" },
    { href: "/member/graphics", icon: ImageIcon, label: "Vault" },
    { href: "/member/social", icon: Share2, label: "Social" },
    { href: "/member/updates", icon: Activity, label: "Impact" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden pb-safe">
      <div className="bg-[#050505]/80 backdrop-blur-2xl border-t border-white/10 px-6 py-4 flex justify-between items-center shadow-[0_-10px_30px_rgba(0,0,0,0.5)]">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          
          return (
            <Link 
              key={item.href} 
              href={item.href}
              className="flex flex-col items-center gap-1.5 group"
            >
              <div className={cn(
                "p-2 rounded-2xl transition-all duration-300",
                isActive ? "bg-purple-500/20 text-purple-400 scale-110 shadow-[0_0_15px_rgba(168,85,247,0.3)]" : "text-zinc-500 group-hover:text-zinc-300"
              )}>
                <Icon className="w-5 h-5" />
              </div>
              <span className={cn(
                "text-[8px] font-black uppercase tracking-widest transition-all duration-300",
                isActive ? "text-purple-400 opacity-100" : "text-zinc-600 opacity-60"
              )}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
