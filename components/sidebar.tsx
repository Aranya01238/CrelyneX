"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { 
  Home, 
  LayoutGrid, 
  Calendar, 
  Info, 
  MessageSquare, 
  ChevronLeft, 
  ChevronRight,
  LogIn,
  Users,
  MessageCircle,
  Menu,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home", icon: Home },
  { href: "/projects", label: "Projects", icon: LayoutGrid },
  { href: "/events-courses", label: "Events & Courses", icon: Calendar },
  { href: "/about", label: "About", icon: Info },
  { href: "/contact", label: "Contact", icon: MessageSquare },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname?.startsWith(href);
  };

  const navContent = (
    <div className="flex flex-col h-full overflow-y-auto bg-[#050505]/80 backdrop-blur-2xl border-r border-purple-500/10 p-4 transition-all duration-300 scrollbar-hide">
      {/* Brand */}
      <div className="flex items-center gap-3 px-2 mb-8">
        <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-purple-500/20 bg-black/50 shadow-[0_0_15px_rgba(168,85,247,0.15)]">
          <Image
            src="/logo.png"
            alt="CrelyneX Logo"
            width={28}
            height={28}
            className="object-contain"
          />
        </div>
        {!isCollapsed && (
          <span className="whitespace-nowrap bg-gradient-to-r from-white via-purple-200 to-purple-600 bg-clip-text text-xl font-black tracking-widest text-transparent drop-shadow-sm">
            CrelyneX
          </span>
        )}
      </div>

      {/* Nav Links */}
      <nav className="flex-1 space-y-2">
        {navLinks.map((link) => {
          const Active = isActive(link.href);
          const Icon = link.icon;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition-all duration-200 group relative",
                Active 
                  ? "bg-purple-500/10 text-white border border-purple-500/20 shadow-[0_0_15px_rgba(168,85,247,0.1)]" 
                  : "text-zinc-400 hover:text-purple-200 hover:bg-white/5"
              )}
            >
              <Icon className={cn("h-5 w-5 shrink-0", Active ? "text-purple-500" : "group-hover:text-purple-400")} />
              {!isCollapsed && <span>{link.label}</span>}
              {Active && (
                 <span className="absolute left-0 w-1 h-2/3 bg-purple-500 rounded-full" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Action Buttons */}
      <div className="mt-8 space-y-2 py-4 border-t border-purple-500/10 text-zinc-400">
        <Link href="/login" className="flex items-center gap-3 px-3 py-2 text-sm hover:text-white transition-colors group">
          <LogIn className="h-5 w-5 group-hover:text-purple-500" />
          {!isCollapsed && <span>Login</span>}
        </Link>
        <a 
          href="https://chat.whatsapp.com/KVzZksJWnJT0aJvm1fzK7W" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-3 px-3 py-2 text-sm hover:text-white transition-colors group"
        >
          <MessageCircle className="h-5 w-5 group-hover:text-purple-500" />
          {!isCollapsed && <span>WhatsApp</span>}
        </a>
        <a 
          href="https://chat.whatsapp.com/KVzZksJWnJT0aJvm1fzK7W" 
          target="_blank" 
          rel="noopener noreferrer"
          className={cn(
            "flex items-center gap-3 rounded-xl bg-purple-700/80 hover:bg-purple-600 px-3 py-2 text-sm text-white font-bold transition-all shadow-[0_0_15px_rgba(168,85,247,0.2)]",
            isCollapsed && "justify-center px-2"
          )}
        >
          <Users className="h-5 w-5" />
          {!isCollapsed && <span className="whitespace-nowrap">Join Community</span>}
        </a>
      </div>

      {/* Collapse Toggle */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="mt-4 hidden md:flex items-center gap-3 px-3 py-2 text-sm text-zinc-500 hover:text-white transition-colors border-t border-purple-500/10 pt-4"
      >
        {isCollapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
        {!isCollapsed && <span>Collapse</span>}
      </button>
    </div>
  );

  return (
    <>
      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-[#050505]/80 backdrop-blur-xl border-b border-purple-500/10 z-50 flex items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.png" alt="Logo" width={24} height={24} />
          <span className="font-black text-white tracking-widest text-sm">CRELYNEX</span>
        </Link>
        <button 
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="p-2 text-zinc-400 hover:text-white"
        >
          {isMobileOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {isMobileOpen && (
        <div className="md:hidden fixed inset-0 z-40">
          <div className="absolute inset-0 bg-black/60" onClick={() => setIsMobileOpen(false)} />
          <div className="absolute left-0 top-0 bottom-0 w-64 z-50">
            {navContent}
          </div>
        </div>
      )}

      {/* Desktop Sidebar Container */}
      <aside className={cn(
        "hidden md:block shrink-0 transition-all duration-300",
        isCollapsed ? "w-20" : "w-64"
      )}>
        <div className={cn(
          "fixed top-0 left-0 h-screen z-40 transition-all duration-300",
          isCollapsed ? "w-20" : "w-64"
        )}>
          {navContent}
        </div>
      </aside>
    </>
  );
}
