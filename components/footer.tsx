"use client";

import Link from "next/link";
import { Separator } from "@/components/ui/separator";

const serviceLinks = [
  { label: "IoT Consulting", href: "/projects" },
  { label: "Web Development", href: "/projects" },
  { label: "App Development", href: "/projects" },
  { label: "Event Updates", href: "/events-courses" },
  { label: "Online Courses", href: "/events-courses" },
];

const communityLinks = [
  { label: "Join Us", href: "https://chat.whatsapp.com/KVzZksJWnJT0aJvm1fzK7W" },
  { label: "Events", href: "/events-courses" },
  { label: "Resources", href: "/about" },
  { label: "Members", href: "/about" },
  { label: "Partnerships", href: "/contact" },
];

const socialLinks = [
  { icon: "", label: "Instagram", href: "https://instagram.com" },
  { icon: "", label: "Facebook", href: "https://facebook.com" },
  { icon: "", label: "LinkedIn", href: "https://linkedin.com" },
  { icon: "", label: "Telegram", href: "https://telegram.org" },
];

export default function Footer() {
  return (
    <footer id="contact" className="relative overflow-hidden border-t border-white/5 bg-[#050505] pt-24 pb-12 transition-all">
      {/* Background Decor */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />
      <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-purple-950/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 gap-16 md:grid-cols-12 mb-20">
          
          {/* Brand Column */}
          <div className="md:col-span-4 space-y-8">
            <div className="flex items-center gap-3 group cursor-pointer">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-600 to-purple-900 shadow-[0_0_20px_rgba(168,85,247,0.3)] transition-all group-hover:scale-110">
                <span className="text-xl font-black text-white">𝞓</span>
              </div>
              <span className="text-2xl font-black tracking-tighter text-white group-hover:text-purple-500 transition-colors">
                CrelyneX
              </span>
            </div>
            
            <p className="text-zinc-400 text-base leading-relaxed max-w-sm font-medium">
              Innovating tomorrow with cutting-edge technology solutions and community-driven development. Building the next generation of IoT and Web products.
            </p>

            <div className="flex gap-4">
              {socialLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-12 w-12 rounded-xl glass border-white/5 flex items-center justify-center text-zinc-400 hover:text-white hover:border-purple-500/50 hover:bg-purple-500/10 transition-all group"
                  title={item.label}
                >
                  <span className="text-xl font-mono group-hover:scale-120 transition-transform">
                    {item.icon === "" ? "IG" : item.icon === "" ? "FB" : item.icon === "" ? "LI" : "TG"}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div className="md:col-span-8 flex flex-col md:flex-row gap-12 md:gap-24">
            
            {/* Services */}
            <div className="space-y-6 flex-1">
              <h3 className="text-sm font-black text-white uppercase tracking-[0.2em]">Services</h3>
              <ul className="space-y-4">
                {serviceLinks.map((item) => (
                  <li key={item.label}>
                    <Link href={item.href} className="text-zinc-500 hover:text-purple-500 text-sm font-semibold transition-colors">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Community */}
            <div className="space-y-6 flex-1">
              <h3 className="text-sm font-black text-white uppercase tracking-[0.2em]">Community</h3>
              <ul className="space-y-4">
                {communityLinks.map((item) => (
                  <li key={item.label}>
                    <Link href={item.href} className="text-zinc-500 hover:text-purple-500 text-sm font-semibold transition-colors">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div className="space-y-6 flex-1">
              <h3 className="text-sm font-black text-white uppercase tracking-[0.2em]">Connect</h3>
              <div className="space-y-4">
                <div className="group">
                  <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest mb-1">Direct Email</p>
                  <a href="mailto:crelynex@gmail.com" className="text-white hover:text-purple-500 text-sm font-bold transition-all underline decoration-purple-500/30 underline-offset-4 decoration-2">
                    crelynex@gmail.com
                  </a>
                </div>
                <div className="group">
                  <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest mb-1">WhatsApp Support</p>
                  <a href="https://chat.whatsapp.com/KVzZksJWnJT0aJvm1fzK7W" target="_blank" rel="noopener noreferrer" className="text-white hover:text-emerald-500 text-sm font-bold transition-all underline decoration-emerald-500/30 underline-offset-4 decoration-2">
                    Join Live Group
                  </a>
                </div>
                <div className="group">
                  <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest mb-1">Base Location</p>
                  <p className="text-white text-sm font-bold flex items-center gap-2">
                    India <span className="text-base">🇮🇳</span>
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>

        <Separator className="bg-white/5 mb-12" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 py-4">
          <div className="text-zinc-600 text-[10px] font-bold uppercase tracking-[0.25em] text-center md:text-left">
            © 2024 <span className="text-white">CrelyneX</span>. All permissions Reserved.
          </div>
          
          <div className="flex flex-wrap justify-center gap-6 text-[10px] font-black uppercase tracking-widest">
            <Link href="/privacy-policy" className="text-zinc-500 hover:text-white transition-colors">Privacy</Link>
            <Link href="/terms-of-service" className="text-zinc-500 hover:text-white transition-colors">Terms</Link>
            <Link href="/cookie-policy" className="text-zinc-500 hover:text-white transition-colors">Cookies</Link>
          </div>

          <div className="flex items-center gap-6 glass rounded-2xl px-6 py-3 border-white/5">
            <div className="text-center">
              <p className="text-[8px] text-zinc-500 font-bold uppercase tracking-[0.2em] mb-1">Association</p>
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-black text-purple-500 tracking-tighter">HSS SERVICE</span>
                <div className="h-4 w-px bg-white/10" />
                <span className="text-[10px] font-black text-emerald-500 tracking-tighter">AI ZENERA</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
