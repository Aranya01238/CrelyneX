"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/events-courses", label: "Events & Courses" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const navContainerRef = useRef<HTMLDivElement>(null);
  const navLinkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const [activeIndicator, setActiveIndicator] = useState({
    x: 0,
    width: 0,
    opacity: 0,
  });

  const isActiveLink = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  useEffect(() => {
    const updateIndicator = () => {
      const activeLink = navLinks.find((link) => isActiveLink(link.href));
      const container = navContainerRef.current;

      if (!activeLink || !container) {
        setActiveIndicator((prev) => ({ ...prev, opacity: 0 }));
        return;
      }

      const activeElement = navLinkRefs.current[activeLink.href];

      if (!activeElement) {
        setActiveIndicator((prev) => ({ ...prev, opacity: 0 }));
        return;
      }

      const containerRect = container.getBoundingClientRect();
      const activeRect = activeElement.getBoundingClientRect();

      setActiveIndicator({
        x: activeRect.left - containerRect.left,
        width: activeRect.width,
        opacity: 1,
      });
    };

    // Slight delay to ensure fonts/layout are loaded before calculating width
    const timeoutId = setTimeout(updateIndicator, 50);
    window.addEventListener("resize", updateIndicator);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("resize", updateIndicator);
    };
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 w-full overflow-x-hidden overflow-y-visible border-b border-red-500/10 bg-[#050505]/70 backdrop-blur-2xl supports-backdrop-filter:bg-[#050505]/50">
      {/* Tech Grid Background inside Header */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-size-[24px_24px]"
      />
      {/* Bottom Glowing Edge */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-red-600/30 to-transparent shadow-[0_0_15px_rgba(220,38,38,0.3)]"
      />

      <nav className="container mx-auto flex h-20 items-center justify-between gap-3 px-4 sm:px-6">
        {/* Brand Logo - Fixed Truncation */}
        <Link
          href="/"
          className="group relative z-10 flex shrink-0 items-center gap-3"
        >
          <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-red-500/20 bg-black/50 shadow-[0_0_15px_rgba(220,38,38,0.15)] transition-all duration-500 group-hover:border-red-500/50 group-hover:shadow-[0_0_25px_rgba(220,38,38,0.3)]">
            <Image
              src="/logo.png"
              alt="CrelyneX Logo"
              width={28}
              height={28}
              className="object-contain transition-transform duration-500 group-hover:scale-110"
            />
          </div>
          <span className="whitespace-nowrap bg-linear-to-r from-white via-red-200 to-red-600 bg-clip-text text-xl font-black tracking-widest text-transparent drop-shadow-sm">
            CrelyneX
          </span>
        </Link>

        {/* Desktop Navigation - Glassy Pill Dock */}
        <div className="relative z-10 hidden items-center rounded-full border border-white/5 bg-white/2 px-6 py-2 backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.5)] md:flex">
          <div
            ref={navContainerRef}
            className="relative flex items-center gap-2"
          >
            {/* The Glowing LED Sliding Indicator */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-2 left-0 h-0.5 rounded-full bg-red-500 shadow-[0_0_15px_rgba(220,38,38,0.8),0_0_5px_rgba(220,38,38,1)] transition-all duration-500 ease-out"
              style={{
                width: `${activeIndicator.width}px`,
                opacity: activeIndicator.opacity,
                transform: `translateX(${activeIndicator.x}px)`,
              }}
            />

            {navLinks.map((link) => {
              const isActive = isActiveLink(link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  ref={(el) => {
                    navLinkRefs.current[link.href] = el;
                  }}
                  className={`group relative flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold uppercase tracking-[0.15em] transition-all duration-300 ${
                    isActive
                      ? "text-white"
                      : "text-zinc-400 hover:bg-white/4 hover:text-red-200"
                  }`}
                >
                  {/* Techie hover prefix */}
                  <span
                    className={`font-mono text-red-500 transition-all duration-300 ${isActive ? "opacity-100" : "opacity-0 -translate-x-2 group-hover:translate-x-0 group-hover:opacity-100"}`}
                  >
                    //
                  </span>

                  {link.label}

                  {/* Techie hover suffix */}
                  <span
                    className={`font-mono text-red-500 transition-all duration-300 ${isActive ? "opacity-0" : "opacity-0 translate-x-2 group-hover:translate-x-0 group-hover:opacity-100"}`}
                  >
                    _
                  </span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Desktop CTA Buttons */}
        <div className="relative z-10 hidden shrink-0 items-center gap-4 md:flex">
          <Link href="/login">
            <Button
              variant="outline"
              size="sm"
              className="h-10 rounded-full border-red-500/20 bg-black/40 px-5 text-xs font-bold uppercase tracking-widest text-zinc-300 backdrop-blur-md transition-all hover:border-red-500/50 hover:bg-red-500/10 hover:text-white hover:shadow-[0_0_20px_rgba(220,38,38,0.2)]"
            >
              Login
            </Button>
          </Link>
          <a
            href="https://chat.whatsapp.com/KVzZksJWnJT0aJvm1fzK7W"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              variant="outline"
              size="sm"
              className="h-10 rounded-full border-red-500/20 bg-black/40 px-5 text-xs font-bold uppercase tracking-widest text-zinc-300 backdrop-blur-md transition-all hover:border-red-500/50 hover:bg-red-500/10 hover:text-white hover:shadow-[0_0_20px_rgba(220,38,38,0.2)]"
            >
              WhatsApp
            </Button>
          </a>
          <a
            href="https://chat.whatsapp.com/KVzZksJWnJT0aJvm1fzK7W"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              className="h-10 rounded-full border border-red-500/50 bg-red-700 px-6 text-xs font-bold uppercase tracking-widest text-white transition-all hover:scale-105 hover:bg-red-600 hover:shadow-[0_0_25px_rgba(220,38,38,0.4)]"
              size="sm"
            >
              Join Community
            </Button>
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-red-500/20 bg-black/50 text-zinc-300 backdrop-blur-md transition-all hover:border-red-500/50 hover:bg-red-500/10 hover:text-white md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mobile Navigation (Glassy Dropdown) */}
      {isOpen && (
        <div className="relative z-60 border-y border-red-500/20 bg-[#050505]/95 px-4 py-6 backdrop-blur-xl md:hidden">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-size-[20px_20px]"
          />
          <div className="relative z-10 flex flex-col gap-3">
            {navLinks.map((link) => {
              const isActive = isActiveLink(link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-xs font-bold uppercase tracking-[0.15em] transition-all ${
                    isActive
                      ? "border-red-500/40 bg-red-500/10 text-white shadow-[0_0_15px_rgba(220,38,38,0.2)]"
                      : "border-white/5 bg-black/40 text-zinc-400 hover:border-red-500/30 hover:bg-red-500/5 hover:text-red-200"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${isActive ? "bg-red-500 shadow-[0_0_8px_rgba(220,38,38,0.8)]" : "bg-zinc-700"}`}
                  />
                  {link.label}
                </Link>
              );
            })}
            <div className="mt-2 grid grid-cols-3 gap-3">
              <Link href="/login" onClick={() => setIsOpen(false)}>
                <Button
                  variant="outline"
                  className="w-full rounded-xl border-red-500/20 bg-black/40 text-xs font-bold uppercase tracking-widest text-zinc-300 hover:border-red-500/50 hover:bg-red-500/10"
                >
                  Login
                </Button>
              </Link>
              <a
                href="https://chat.whatsapp.com/KVzZksJWnJT0aJvm1fzK7W"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
              >
                <Button
                  variant="outline"
                  className="w-full rounded-xl border-red-500/20 bg-black/40 text-xs font-bold uppercase tracking-widest text-zinc-300 hover:border-red-500/50 hover:bg-red-500/10"
                >
                  WhatsApp
                </Button>
              </a>
              <a
                href="https://chat.whatsapp.com/KVzZksJWnJT0aJvm1fzK7W"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
              >
                <Button className="w-full rounded-xl border border-red-500/50 bg-red-700 text-xs font-bold uppercase tracking-widest text-white hover:bg-red-600 hover:shadow-[0_0_20px_rgba(220,38,38,0.4)]">
                  Join
                </Button>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
